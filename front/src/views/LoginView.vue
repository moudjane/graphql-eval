<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { graphql } from '../gql/gql'
import type { LoginMutation, LoginMutationVariables } from '@/gql/graphql'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const LOGIN = graphql(`
  mutation Login($input: AuthInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
        posts
        comments
        createdAt
      }
    }
  }
`)

const { mutate: loginMutate } = useMutation<LoginMutation, LoginMutationVariables>(LOGIN)

const handleSubmit = async () => {
  try {
    error.value = ''
    const response = await loginMutate({
      input: {
        email: email.value,
        password: password.value
      }
    })

    if (!response || !response.data || !response.data.login.token) {
      error.value = 'La réponse du serveur est invalide'
      return
    }

    authStore.setAuth({
      token: response.data.login.token,
      user: response.data.login.user
    })

    router.push('/')
  } catch (e) {
    console.error("Erreur dans handleSubmit :", e)
    error.value = e instanceof Error ? e.message : 'Une erreur est survenue lors de la connexion'
  }
}
</script>

<template>
  <main class="p-8">
    <div class="mx-auto max-w-md">
      <div class="border-2 border-gray-900 bg-white p-6 font-mono">
        <h1 class="mb-6 text-2xl font-bold">Se connecter</h1>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="email" class="block font-bold">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              class="w-full border-2 border-gray-900 p-2 font-mono"
            />
          </div>
          <div>
            <label for="password" class="block font-bold">Mot de passe</label>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="w-full border-2 border-gray-900 p-2 font-mono"
            />
          </div>
          <p v-if="error" class="text-red-500">{{ error }}</p>
          <button
            type="submit"
            class="border-2 border-gray-900 bg-hn-orange px-6 py-2 font-bold text-white hover:bg-orange-500"
          >
            Se connecter
          </button>
          <router-link
            to="/register"
            class="text-gray-600 hover:text-hn-orange hover:underline"
          >
            Pas de compte ? Inscrivez-vous
          </router-link>
        </form>
      </div>
    </div>
  </main>
</template>
