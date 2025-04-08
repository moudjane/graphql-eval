import { env } from 'node:process'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../generated/prisma'

export type AuthenticatedUser = Pick<User, 'id' | 'username'>

export function createJWT(user: User) {
  const token = jwt.sign(
    { id: user.id, username: user.username } satisfies AuthenticatedUser,
    env.JWT_SECRET!,
  )
  return token
}

export function getUser(token: string): AuthenticatedUser | null {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET!) as AuthenticatedUser
    return payload
  }
  catch {
    return null
  }
}

export function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 5)
}
