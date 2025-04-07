export interface User {
  id: string
  username: string
  email: string
  postsCount: number
  posts: {
    id: string
    title: string
    createdAt: string
  }[]
}