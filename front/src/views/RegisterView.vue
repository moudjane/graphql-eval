<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { graphql } from '../gql/gql'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const successMessage = ref('')

const isValid = computed(() => {
  return email.value.trim() !== '' &&
         password.value === confirmPassword.value &&
         password.value.length >= 6
})

const REGISTER = graphql(`
  mutation Register($input: AuthInput!) {
    register(input: $input) {
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

const { mutate: registerMutate } = useMutation(REGISTER)

const handleSubmit = async () => {
  if (!isValid.value) {
    error.value = 'L\'email doit être renseigné et les mots de passe doivent correspondre et être d’au moins 6 caractères.'
    return;
  }
  try {
    error.value = '';

    const response = await registerMutate({
      input: {
        email: email.value,
        password: password.value
      }
    });

    if (!response || !response.data || !response.data.register.token) {
      error.value = 'La réponse du serveur est invalide'
      return;
    }

    authStore.$patch({
      token: response.data.register.token,
      user: response.data.register.user
    });

    successMessage.value = 'Utilisateur créé avec succès. Vous pouvez maintenant vous connecter.'

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Une erreur est survenue lors de l’inscription';
    console.error("Erreur dans handleSubmit :", e);
  }
};
</script>

<template>
  <main class="p-8">
    <div class="mx-auto max-w-md">
      <div class="border-2 border-gray-900 bg-white p-6 font-mono">
        <h1 class="mb-6 text-2xl font-bold">Créer un compte</h1>
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
          <div>
            <label for="confirmPassword" class="block font-bold">Confirmer le mot de passe</label>
            <input 
              id="confirmPassword" 
              type="password" 
              v-model="confirmPassword" 
              required 
              class="w-full border-2 border-gray-900 p-2 font-mono" 
            />
          </div>
          <p v-if="error" class="text-red-500">{{ error }}</p>
          <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
          <button 
            :disabled="!isValid" 
            type="submit" 
            class="border-2 border-gray-900 bg-hn-orange px-6 py-2 font-bold text-white hover:bg-orange-500"
          >
            S'inscrire
          </button>
          <router-link 
            to="/login" 
            class="text-gray-600 hover:text-hn-orange hover:underline"
          >
            Déjà un compte ?
          </router-link>
        </form>
      </div>
    </div>
  </main>
</template>
