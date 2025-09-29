import 'server-only'
import prisma from './prisma'
import { withTryCatch } from './utils'

type CreateUser = {
  name: string
  location: string
  email: string
  description: string
}

export function createUser({ name, location, email, description }: CreateUser) {
  return withTryCatch(() => {
    return prisma.user.create({
      data: {
        email,
        name,
        location,
        description,
        role: 'AGENT',
      },
    })
  })
}

export function getUser(email: string) {
  return withTryCatch(() => {
    return prisma.user.findUnique({
      where: { email },
    })
  })
}

export function getUsers() {
  return withTryCatch(() => {
    return prisma.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
  })
}

export type Agent = Awaited<ReturnType<typeof getUsers>>

export function addUserDescription({
  id,
  description,
}: {
  id: string
  description: string
}) {
  return withTryCatch(() => {
    return prisma.user.update({
      where: { id },
      data: { description },
    })
  })
}

export function addUserReplicaUuid({
  id,
  replicaUuid,
}: {
  id: string
  replicaUuid: string
}) {
  return withTryCatch(() => {
    return prisma.user.update({
      where: { id },
      data: { replicaUuid },
    })
  })
}
