import process from 'node:process'
import { PrismaClient } from '@prisma/client'

import * as bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import { Resolvers } from './types'

const prisma = new PrismaClient()

interface Context {
  user?: {
    id: string
  }
}

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { user }: Context) => {
      if (!user)
        return null
      return prisma.user.findUnique({ where: { id: user.id } })
    },

    getPost: async (_, { id }) => {
      return prisma.post.findUnique({ where: { id } })
    },

    getPosts: async (_, { filter, pagination }) => {
      const where = filter?.author
        ? { author: { username: filter.author } }
        : undefined

      const orderBy = filter?.orderBy
        ? {
            [filter.orderBy.field === 'CREATED_AT' ? 'createdAt' : 'likes']:
              filter.orderBy.direction.toLowerCase(),
          }
        : undefined

      return prisma.post.findMany({
        where,
        orderBy,
        skip: pagination?.skip,
        take: pagination?.take,
      })
    },

    getUser: async (_, { username }) => {
      return prisma.user.findUnique({ where: { username } })
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email: input.email }, { username: input.email }],
        },
      })

      if (existingUser) {
        throw new GraphQLError('User already exists')
      }

      const hashedPassword = await bcrypt.hash(input.password, 10)

      const user = await prisma.user.create({
        data: {
          email: input.email,
          username: input.email.split('@')[0],
          password: hashedPassword,
        },
      })

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!)

      return { token, user }
    },

    login: async (_, { input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      })

      if (!user) {
        throw new GraphQLError('Invalid credentials')
      }

      const valid = await bcrypt.compare(input.password, user.password)

      if (!valid) {
        throw new GraphQLError('Invalid credentials')
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!)

      return { token, user }
    },

    logout: () => {
      return true
    },

    createPost: async (_, { input }, { user }: Context) => {
      if (!user)
        throw new GraphQLError('Not authenticated')

      return prisma.post.create({
        data: {
          ...input,
          authorId: user.id,
        },
      })
    },

    updatePost: async (_, { id, input }, { user }: Context) => {
      if (!user)
        throw new GraphQLError('Not authenticated')

      const post = await prisma.post.findUnique({ where: { id } })

      if (!post)
        throw new GraphQLError('Post not found')
      if (post.authorId !== user.id)
        throw new GraphQLError('Not authorized')

      return await prisma.post.update({
        where: { id },
        data: input,
      })
    },

    deletePost: async (_, { id }, { user }: Context) => {
      if (!user)
        throw new GraphQLError('Not authenticated')

      const post = await prisma.post.findUnique({ where: { id } })

      if (!post)
        throw new GraphQLError('Post not found')
      if (post.authorId !== user.id)
        throw new GraphQLError('Not authorized')

      await prisma.post.delete({ where: { id } })
      return true
    },

    addComment: async (_, { postId, content }, { user }: Context) => {
      if (!user)
        throw new GraphQLError('Not authenticated')

      return prisma.comment.create({
        data: {
          content,
          authorId: user.id,
          postId,
        },
      })
    },

    deleteComment: async (_, { id }, { user }: Context) => {
      if (!user)
        throw new GraphQLError('Not authenticated')

      const comment = await prisma.comment.findUnique({ where: { id } })

      if (!comment)
        throw new GraphQLError('Comment not found')
      if (comment.authorId !== user.id)
        throw new GraphQLError('Not authorized')

      await prisma.comment.delete({ where: { id } })
      return true
    },

    likePost: async (_, { postId }, { user }: Context) => {
      if (!user)
        throw new GraphQLError('Not authenticated')

      await prisma.post.update({
        where: { id: postId },
        data: { likes: { increment: 1 } },
      })

      return true
    },

    unlikePost: async (_, { postId }, { user }: Context) => {
      if (!user)
        throw new GraphQLError('Not authenticated')

      await prisma.post.update({
        where: { id: postId },
        data: { likes: { decrement: 1 } },
      })

      return true
    },
  },
}
