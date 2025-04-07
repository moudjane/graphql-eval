export interface Comment {
  id: string
  content: string
  author: {
    id: string
    username: string
  }
  createdAt: string
  score?: number
}

export interface CommentCardProps {
  comment: Comment
}