import { defineStore } from 'pinia'
import type { User } from '@/gql/graphql'

interface AuthState {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('authToken'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  }),
  actions: {
    setAuth(authPayload: { token: string; user: User }): void {
      this.token = authPayload.token
      this.user = authPayload.user
      localStorage.setItem('authToken', authPayload.token)
      localStorage.setItem('user', JSON.stringify(authPayload.user))
    },
    clearAuth(): void {
      this.token = null
      this.user = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  }
})