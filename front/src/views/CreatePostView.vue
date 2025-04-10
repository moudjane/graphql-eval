<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postService } from '../services/postService'

const router = useRouter()
const error = ref('')
const form = ref({
  title: '',
  content: ''
})

const handleSubmit = async () => {
  if (!form.value.title.trim() || !form.value.content.trim()) {
    error.value = 'Le titre et le contenu sont requis'
    return
  }

  try {
    error.value = ''
    const post = await postService.createPost(form.value.title, form.value.content)
    router.push({ name: 'post-detail', params: { id: post.id } })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Une erreur est survenue'
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