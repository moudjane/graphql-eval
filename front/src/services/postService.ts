import { posts } from '../mocks/posts'
import type { Post } from '../types/post'
import type { Comment } from '../types/comment'
import type { FilterType } from '../types/filter'

export const postService = {
  async getAllPosts(filter: FilterType = 'date'): Promise<Post[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const sortedPosts = [...posts].sort((a, b) => {
      if (filter === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return b.score - a.score
    })
    
    return sortedPosts
  },

  async getPostById(id: string): Promise<Post | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return posts.find(post => post.id === id)
  },

  async createPost(title: string, content: string): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newPost: Post = {
      id: `post${Date.now()}`,
      title,
      content,
      author: {
        id: 'current-user',
        username: 'Vous'
      },
      score: 0,
      createdAt: new Date().toISOString(),
      comments: []
    }
    
    posts.unshift(newPost)
    return newPost
  },

  async upvotePost(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const post = posts.find(p => p.id === id)
    if (post) {
      post.score += 1
    }
  },

  async upvoteComment(postId: string, commentId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const post = posts.find(p => p.id === postId)
    if (!post?.comments) return

    const comment = post.comments.find(c => c.id === commentId)
    if (comment && comment.score !== undefined) {
      comment.score += 1
    }
  },

  async addComment(postId: string, content: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const post = posts.find(p => p.id === postId)
    if (post) {
      const newComment: Comment = {
        id: `comment${Date.now()}`,
        content,
        author: {
          id: 'current-user',
          username: 'Vous'
        },
        createdAt: new Date().toISOString(),
        score: 0
      }
      
      if (!post.comments) {
        post.comments = []
      }
      
      post.comments.unshift(newComment)
    }
  }
}