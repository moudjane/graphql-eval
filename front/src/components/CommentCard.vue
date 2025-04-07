<script setup lang="ts">
import { computed } from 'vue'
import type { CommentCardProps } from '../types/comment'

const props = defineProps<CommentCardProps>()

const emits = defineEmits<{
  (e: 'upvote', commentId: string): void
}>()

const formattedDate = computed(() => {
  return new Date(props.comment.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})
</script>

<template>
  <article class="w-full border-2 border-gray-900 bg-white font-mono mb-4">
    <header class="border-b-2 border-gray-900 bg-gray-50 p-3">
      <div class="flex items-center justify-between">
        <span class="font-bold text-gray-900">{{ comment.author.username }}</span>
        <time class="text-sm text-gray-600">{{ formattedDate }}</time>
      </div>
    </header>

    <div class="whitespace-pre-wrap p-4 text-gray-800">
      {{ comment.content }}
    </div>

    <footer v-if="comment.score !== undefined" class="border-t-2 border-gray-900 bg-gray-50 p-3">
      <div class="flex items-center gap-4">
        <span class="text-sm font-bold">{{ comment.score }}</span>
        <button 
          @click="emits('upvote', comment.id)"
          class="border-2 border-gray-900 bg-hn-orange px-3 py-1 text-sm font-bold text-white hover:bg-orange-500"
        >
          Upvote
        </button>
      </div>
    </footer>
  </article>
</template>