import type { Post } from '../types/post'

export const posts: Post[] = [
  {
    id: '1',
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    author: {
      id: 'user1',
      username: 'DesignerPro'
    },
    score: 8,
    createdAt: '2024-03-15T10:00:00Z',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
    comments: [
      {
        id: 'comment1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        author: {
          id: 'user2',
          username: 'WebDesigner'
        },
        createdAt: '2024-03-15T11:00:00Z',
        score: 42
      }
    ]
  },
  {
    id: '2',
    title: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    author: {
      id: 'user3',
      username: 'TSExpert'
    },
    score: 95,
    createdAt: '2024-03-14T15:30:00Z',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...',
    comments: []
  }
]