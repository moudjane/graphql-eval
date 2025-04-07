import type { User } from '../types/user'

export const users: User[] = [
  {
    id: 'user1',
    username: 'DesignerPro',
    email: 'designer@example.com',
    postsCount: 1,
    posts: [
      {
        id: '1',
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        createdAt: '2024-03-15T10:00:00Z'
      }
    ]
  },
  {
    id: 'user2',
    username: 'WebDesigner',
    email: 'webdesigner@example.com',
    postsCount: 0,
    posts: []
  },
  {
    id: 'user3',
    username: 'TSExpert',
    email: 'tsexpert@example.com',
    postsCount: 1,
    posts: [
      {
        id: '2',
        title: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        createdAt: '2024-03-14T15:30:00Z'
      }
    ]
  }
]