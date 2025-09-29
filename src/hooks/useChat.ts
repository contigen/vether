import { useState, useEffect, useRef } from 'react'
import { Message, UploadedFile, UserRole } from '@/types'
import { useSession } from 'next-auth/react'
import { generateCompletion } from '@/actions'

export function useChat(replicaUuid: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const userRole: UserRole | null = session?.user?.role
    ? {
        type: session.user.role.toLowerCase() as 'buyer' | 'agent',
        displayName: session.user.name || 'User',
      }
    : null

  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'assistant',
      content:
        "Welcome to Vether! I'm your AI-powered Real Estate Risk & Legal Assistant. I can help you analyze properties, assess legal risks, review contracts, and provide compliance guidance. What would you like to explore today?",
      timestamp: new Date(),
      componentType: '',
    }
    setMessages([welcomeMessage])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }

  function handleQuickAction(message: string) {
    setInputValue(message)
  }

  function handleSuggestionClick(suggestion: string) {
    setInputValue(suggestion)
  }

  async function handleSendMessage(message?: string) {
    const messageToSend = typeof message === 'string' ? message : inputValue
    if (
      !messageToSend ||
      typeof messageToSend !== 'string' ||
      !messageToSend.trim()
    )
      return

    if (isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date(),
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
      componentType: '',
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setUploadedFiles([])
    setIsLoading(true)

    try {
      const response = await generateCompletion(replicaUuid, messageToSend)

      if (response.success) {
        const { toolResults } = response
        console.log('toolResults', toolResults)
        const aiResponse: Message[] | undefined = toolResults?.map(
          toolResult => {
            console.log(toolResult.toolName, toolResult.output)
            return {
              id: crypto.randomUUID(),
              type: 'assistant',
              content: '',
              componentData: toolResult.output,
              timestamp: new Date(),
              componentType: toolResult.toolName,
            }
          }
        )

        setMessages(prev => [...prev, ...(aiResponse || [])])
      } else {
        const errorResponse: Message = {
          id: crypto.randomUUID(),
          type: 'assistant',
          content:
            'I apologize, but I encountered an error while processing your request. Please try again.',
          timestamp: new Date(),
          componentType: '',
        }

        setMessages(prev => [...prev, errorResponse])
      }
    } catch {
      const errorResponse: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content:
          'I apologize, but I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
        componentType: '',
      }

      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    inputValue,
    setInputValue,
    uploadedFiles,
    setUploadedFiles,
    isDragOver,
    setIsDragOver,
    isLoading,

    userRole,
    messagesEndRef,
    handleQuickAction,
    handleSuggestionClick,
    handleSendMessage,
  }
}
