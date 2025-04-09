import { defineStore } from 'pinia';
import type { User } from '@/gql/graphql';

interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('authToken'),
    user: null,
  }),
  actions: {
    setAuth(authPayload: { token: string; user: User }): void {
      this.token = authPayload.token;
      this.user = authPayload.user;
      localStorage.setItem('authToken', authPayload.token);
    },
    clearAuth(): void {
      this.token = null;
      this.user = null;
      localStorage.removeItem('authToken');
    },
  },
});
