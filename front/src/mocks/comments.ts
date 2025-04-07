import type { Comment } from '../types/comment'

export const comments: Comment[] = [
  {
    id: 'comment1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: {
      id: 'user2',
      username: 'WebDesigner'
    },
    createdAt: '2024-03-15T11:00:00Z',
    score: 42
  },
  {
    id: 'comment2',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: {
      id: 'user3',
      username: 'TSExpert'
    },
    createdAt: '2024-03-15T12:30:00Z',
    score: 28
  }
]