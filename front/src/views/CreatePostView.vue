<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { graphql } from '@/gql/gql'
import { useMutation } from '@vue/apollo-composable'

const router = useRouter()

const form = ref({
  title: '',
  content: ''
})
const error = ref<string | null>(null)

const CREATE_POST = graphql(`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
    }
  }
`)

const { mutate: createPost, onDone, onError } = useMutation(CREATE_POST)

const handleSubmit = async () => {
  error.value = null
  try {
    await createPost({
      input: {
        title: form.value.title,
        content: form.value.content
      }
    })
    router.push({ name: 'articles' })
  } catch (err) {
    error.value = 'Erreur lors de la création de l’article.'
    console.error(err)
  }
}
</script>

<template>
  <main class="p-8">
    <div class="mx-auto max-w-3xl">
      <div class="border-2 border-gray-900 bg-white p-6 font-mono">
        <h1 class="mb-6 text-2xl font-bold">Créer un article</h1>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="title" class="mb-2 block font-bold">Titre</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="w-full border-2 border-gray-900 p-3 font-mono"
              placeholder="Titre de votre article"
            />
          </div>
          
          <div>
            <label for="content" class="mb-2 block font-bold">Contenu</label>
            <textarea
              id="content"
              v-model="form.content"
              rows="10"
              required
              class="w-full resize-none border-2 border-gray-900 p-3 font-mono"
              placeholder="Contenu de votre article..."
            ></textarea>
          </div>
          
          <p v-if="error" class="text-red-500">{{ error }}</p>
          
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="border-2 border-gray-900 bg-hn-orange px-6 py-2 font-bold text-white hover:bg-orange-500"
            >
              Publier
            </button>
            
            <button
              type="button"
              @click="router.push({ name: 'articles' })"
              class="text-gray-600 hover:text-hn-orange"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>