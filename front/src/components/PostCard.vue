<script setup lang="ts">
import { computed } from 'vue'
import type { PostCardProps } from '../types/post'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<PostCardProps>()

const emits = defineEmits<{
  (e: 'upvote', postId: string): void
  (e: 'viewDetails', postId: string): void
}>()

const formattedDate = computed(() => {
  return new Date(props.post.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const handleTitleClick = () => {
  router.push({ name: 'post-detail', params: { id: props.post.id } })
}
</script>

<template>
  <article class="w-full border-2 border-gray-900 bg-white font-mono">
    <header class="border-b-2 border-gray-900 p-4">
      <h2 
        class="mb-2 text-xl font-bold hover:text-hn-orange cursor-pointer"
        @click="handleTitleClick"
      >
        {{ post.title }}
      </h2>
      <div class="text-sm text-gray-600">
        posté par {{ post.author.username }} le {{ formattedDate }}
      </div>
    </header>

    <div class="flex items-center justify-between border-b-2 border-gray-900 bg-gray-50 p-4">
      <div class="flex items-center gap-4">
        <span class="text-lg font-bold">{{ post.score }}</span>
        <button 
          @click="emits('upvote', post.id)"
          class="border-2 border-gray-900 bg-hn-orange px-4 py-2 font-bold text-white hover:bg-orange-500"
        >
          Upvote
        </button>
      </div>
      
      <button 
        @click="emits('viewDetails', post.id)"
        class="border-2 border-gray-900 bg-gray-900 px-6 py-2 font-bold text-white hover:bg-gray-800"
      >
        Voir plus →
      </button>
    </div>
  </article>
</template>