import type { Comment } from './comment'

export interface Post {
  id: string
  title: string
  author: {
    id: string
    username: string
  }
  score: number
  createdAt: string
  content?: string
  comments?: Comment[]
}

export interface PostCardProps {
  post: Post
}

export interface PostDetailProps {
  post: Post
}