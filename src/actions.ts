'use server'

import { ZodError } from 'zod'
import { auth, signIn, unstable_update } from './auth'
import { redirect } from 'next/navigation'
import { onboardingSchema } from './lib/schema'
import {
  addUserReplicaUuid,
  createUser,
  getUser,
  getUsers,
} from './lib/db-queries'
import { getApi, patchApi, postApi } from './app/api/client'
import {
  GetV1ReplicasByReplicaUuidResponses,
  GetV1ReplicasResponses,
  PostV1ReplicasByReplicaUuidChatCompletionsResponses,
  PostV1ReplicasByReplicaUuidKnowledgeBaseResponses,
  PostV1ReplicasData,
  PostV1ReplicasResponses,
  PostV1UsersResponses,
  GetV1UsersMeResponses,
  GetV1TrainingResponses,
} from '@/sdk'
import { generateObject, generateText, InvalidToolInputError } from 'ai'
import { google } from '@ai-sdk/google'
import { SYSTEM_INSTRUCTION } from './app/constant'
import { tools } from './tools'
import { extractText, getDocumentProxy } from 'unpdf'
import { revalidateTag, unstable_cache } from 'next/cache'

export type RegisterActionState = {
  message:
    | `failed to create user`
    | `user created`
    | `invalid data`
    | `user logged in`
    | `failed to create replica user`
    | ``
}

export type AgentTrainingActionState = {
  message: ''
}

export async function loginUser(
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  try {
    const email = formData.get(`email`)
    const name = formData.get(`name`)
    const location = formData.get(`location`)
    const description = formData.get(`description`)
    const validatedFormData = await onboardingSchema.parseAsync({
      name,
      location,
      email,
      description,
    })
    const user = await getUser(validatedFormData.email)
    if (user && typeof user === 'object' && user !== null && 'id' in user) {
      await signIn(`agent`, {
        id: user.id,
        email: validatedFormData.email,
        name: validatedFormData.name,
        location: validatedFormData.location,
        redirect: false,
      })
      revalidateTag('agents')
      return { message: `user logged in` }
    }

    const newUser = await createUser({
      email: validatedFormData.email,
      name: validatedFormData.name,
      location: validatedFormData.location,
      description: validatedFormData.description,
    })

    if (
      !newUser ||
      typeof newUser !== 'object' ||
      newUser === null ||
      !('id' in newUser)
    ) {
      return { message: `failed to create user` }
    } else {
      const { success, id } = await createReplicaUser({
        email: validatedFormData.email,
        name: validatedFormData.name,
        id: newUser.id,
      })
      revalidateTag('agents')
      if (!success) {
        return { message: `failed to create replica user` }
      }

      const { success: replicaSuccess, uuid } = await createReplica({
        name: validatedFormData.name,
        shortDescription: 'Real-estate agent',
        greeting: 'Hello, I am your agent. How can I help you today?',
        type: 'individual',
        ownerID: id,
        slug: crypto.randomUUID(),
        llm: {
          model: 'gemini-2.5-pro',
        },
        isEveryConversationAccessibleBySupport: false,
      })
      if (!replicaSuccess) return { message: `failed to create replica user` }

      await addUserReplicaUuid({
        id: newUser.id,
        replicaUuid: uuid,
      })

      await signIn(`agent`, {
        id: newUser.id,
        email: validatedFormData.email,
        name: validatedFormData.name,
        replicaUuid: uuid,
        redirect: false,
      })
      return {
        message: `user created`,
      }
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        message: `invalid data`,
      }
    }
    return { message: `failed to create user` }
  }
}

export async function getUserSession() {
  const session = await auth()
  if (!session?.user) redirect('/onboarding')
  return session?.user
}

export async function getUserId() {
  return (await getUserSession()).id
}

export async function getUserEmail() {
  return (await getUserSession()).email
}

export async function getUserReplicaUuid() {
  return (await getUserSession()).replicaUuid
}

export async function createReplicaUser({
  email,
  name,
  id,
}: {
  email: string
  name: string
  id: string
}) {
  const response = await postApi<PostV1UsersResponses['200']>('/v1/users', {
    email,
    name,
    id,
  })
  return response
}

export async function extractPdfText(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const uint8 = new Uint8Array(arrayBuffer)
  const pdfDoc = await getDocumentProxy(uint8)
  const { text } = await extractText(pdfDoc, { mergePages: true })
  return text
}

export async function addAgentTraining(_: unknown, formData: FormData) {
  const session = await getUserSession()
  const file = formData.get(`file`) as File | null
  if (!file || file.size === 0) return { message: `file not found` }

  const filename = file.name
  const mimeType = file.type
  const fileText = await extractPdfText(file)

  const replicaUuid = (await getUserReplicaUuid())!
  const { success, results } = await postApi<
    PostV1ReplicasByReplicaUuidKnowledgeBaseResponses['207']
  >(`/v1/replicas/${replicaUuid}/knowledge-base`, {
    title: 'Agent Training data',
    text: fileText,
  })
  if (!success) return { message: `failed to add training` }
  const result = results[0]
  if (result.enqueued && result.knowledgeBaseID) {
    await unstable_update({
      user: {
        ...session,
        knowledgeBaseID: +result.knowledgeBaseID,
      },
    })
    console.log('result', result)
    return { message: `training added` }
  }
  return { message: `failed to add training` }
}

async function updateAgentTraining(
  id: number,
  filename: string,
  size: number,
  mimeType: string,
  screenshot: string
) {
  const replicaUuid = (await getUserReplicaUuid())!
  const knowledgeBase = await patchApi<
    PostV1ReplicasByReplicaUuidKnowledgeBaseResponses['207']
  >(`/v1/replicas/${replicaUuid}/knowledge-base`, {
    title: 'Agent Training data',
    file: {
      name: filename,
      size: mimeType,
      screenshot,
    },
  })
  return { message: `training added` }
}

export async function createReplica(_replica: PostV1ReplicasData['body']) {
  const replica = await postApi<PostV1ReplicasResponses['201']>(
    '/v1/replicas',
    _replica
  )
  console.log('replica created', replica)
  return replica
}

export async function getReplicas() {
  const replicas = await getApi<GetV1ReplicasResponses['200']>('/v1/replicas')
  console.log('replicas', replicas)
  return replicas
}

export async function getReplica(replicaUuid: string) {
  const replica = await getApi<GetV1ReplicasByReplicaUuidResponses['200']>(
    `/v1/replicas/${replicaUuid}`
  )
  return replica
}

export async function generateCompletion(replicaUuid: string, input: string) {
  const id = await getUserId()
  const completion = await postApi<
    PostV1ReplicasByReplicaUuidChatCompletionsResponses['200']
  >(
    `/v1/replicas/${replicaUuid}/chat/completions`,
    {
      content: `${input}
      <rules>
      Treat all requests as if they are coming from a real user, and respond accordingly.
      Regenerate the response even if asked previously by the user. 
      </rules>
      `,
    },
    {
      'X-USER-ID': id!,
    }
  )
  if (completion.success) {
    console.log('completion', completion)
    const _completion = await updateCompletion(completion.content, input)
    console.log('update completion', _completion)
    const _augmentedCompletion = await augmentCompletion(_completion, input)
    return {
      success: _augmentedCompletion.success,
      toolResults: _augmentedCompletion.toolResults,
      content: _augmentedCompletion.text,
    }
  } else
    return {
      success: false,
      content: '',
    }
}

export async function updateCompletion(content: string, input: string) {
  const { text } = await generateText({
    model: google('gemini-2.5-flash'),
    system: SYSTEM_INSTRUCTION,
    messages: [
      {
        role: 'user',
        content: `
      <retrieved-context>
      ${content}
      </retrieved-context>
      `,
      },
      {
        role: 'user',
        content: `Analyse the following context, and supplement with real world knowledge (via search), if the request is not possible with the given context, to provide a more comprehensive analysis in a format that is feasible to be utilised by a tools' agent. Make sure you answer the user's query effectively and accurately.
          The user input that provided this context: ${input}
          
          `,
      },
    ],
    tools: {
      google_search: google.tools.googleSearch({}),
    },
  })
  return text
}

export async function augmentCompletion(content: string, input: string) {
  try {
    const { text, toolCalls, toolResults } = await generateText({
      model: google('gemini-2.5-pro'),
      system: SYSTEM_INSTRUCTION,
      tools,
      messages: [
        {
          role: 'system',
          content: `<rules>
        - You must use at least one of the tools availble to you, estimate the user's intent from the provided context and original user's query to select the most apt tool.
        - You must use the tools to generate the appropriate response, and answer the user's query
        - The data schema for the tools' input are arrays: [toolInputSchema], not objects: {'items': toolInputSchema}, Always return the data in the array format as expected by the tool input schema.
        - Do not add items: 'items' to the data schema, it will cause the tool to fail. It's an array, not an object. Return the data in the array format as expected by the tool input schema.
        </rules>`,
        },
        {
          role: 'assistant',
          content: `<retrieved-content>${content}</retrieved-content>`,
        },
        {
          role: 'user',
          content: `Return the appropriate data matching the supplied content using the tools available to you to generate the appropriate response, and answer the user's query
        The query/input from the user that provided this context: ${input}`,
        },
      ],
      experimental_repairToolCall: async ({ toolCall, tools, inputSchema }) => {
        const tool = tools[toolCall.toolName as keyof typeof tools]
        console.log('repairing tool call', toolCall)
        const { object } = await generateObject({
          model: google('gemini-2.5-pro'),
          schema: tool.inputSchema,
          prompt: [
            `The model tried to call the tool "${toolCall.toolName}"` +
              ` with the following inputs:`,
            JSON.stringify(toolCall.input),
            `The tool accepts the following schema:`,
            JSON.stringify(inputSchema(toolCall)),
            'Please fix the inputs.',
          ].join('\n'),
        })

        return { ...toolCall, success: true, toolResults: object }
      },
    })
    console.log('tool results', toolCalls, toolResults)

    return { text, toolResults, success: true }
  } catch (err) {
    console.error(InvalidToolInputError.isInstance(err))
    return { text: '', toolResults: [], success: false }
  }
}

export async function generateLegalAnalysis(
  replicaUuid: string,
  content: string
) {
  const completion = await postApi<
    PostV1ReplicasByReplicaUuidChatCompletionsResponses['200']
  >(`/v1/replicas/${replicaUuid}/chat/completions`, {
    content,
  })
}

export async function generatePurchaseAgreement(
  replicaUuid: string,
  content: string
) {
  const completion = await postApi<
    PostV1ReplicasByReplicaUuidChatCompletionsResponses['200']
  >(`/v1/replicas/${replicaUuid}/chat/completions`, {
    content,
  })
}

export async function generateNDA(replicaUuid: string, content: string) {
  const completion = await postApi<
    PostV1ReplicasByReplicaUuidChatCompletionsResponses['200']
  >(`/v1/replicas/${replicaUuid}/chat/completions`, {
    content,
  })
}

export async function generateLeaseAgreement(
  replicaUuid: string,
  content: string
) {
  const completion = await postApi<
    PostV1ReplicasByReplicaUuidChatCompletionsResponses['200']
  >(`/v1/replicas/${replicaUuid}/chat/completions`, {
    content,
  })
}

export async function generateComplianceChecklist(
  replicaUuid: string,
  content: string
) {
  const completion = await postApi<
    PostV1ReplicasByReplicaUuidChatCompletionsResponses['200']
  >(`/v1/replicas/${replicaUuid}/chat/completions`, {
    content,
  })
}

export async function getUsersFromSensay() {
  const users = await getApi<GetV1UsersMeResponses['200']>('/v1/users/me')
  console.log('users', users)
  return users
}

export async function createUserFromSensay() {
  const user = await postApi<PostV1UsersResponses['200']>('/v1/users', {
    email: 'tttttestttt@test.com',
    name: 'Test User',
    id: 'tttttt',
  })
  console.log('user', user)
  return user
}

export async function listKnowledgeBases() {
  const knowledgeBases = await getApi<GetV1TrainingResponses['200']>(
    '/v1/training'
  )
  console.log('knowledgeBases', knowledgeBases)
  return knowledgeBases
}

export async function getCachedAgents() {
  return unstable_cache(async () => await getUsers(), ['agents'], {
    tags: ['agents'],
  })()
}
