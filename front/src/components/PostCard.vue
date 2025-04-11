<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { GetPostQuery } from '@/gql/graphql'

const router = useRouter()
const props = defineProps<{
  post: NonNullable<GetPostQuery['getPost']>
}>()

const emits = defineEmits<{
  (e: 'upvote', postId: string): void
  (e: 'removeUpvote', postId: string): void
  (e: 'viewDetails', postId: string): void
}>()

const formattedDate = computed(() => {
  return new Date(props.post.createdAt || '').toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const handleTitleClick = () => {
  router.push({ name: 'post-detail', params: { id: props.post.id } })
}

const isPostLiked = computed(() => {
  const likedPost = JSON.parse(localStorage.getItem('postLikedId') || '[]')
  return likedPost.includes(props.post.id)
})
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
        posté par {{ post.authorName }} le {{ formattedDate }}
      </div>
    </header>

    <div class="flex items-center justify-between border-b-2 border-gray-900 bg-gray-50 p-4">
      <div class="flex items-center gap-4">
        <span class="text-lg font-bold">{{ post.likes }}</span>
        <button 
          v-if="!isPostLiked"
          @click="post.id ? emits('upvote', post.id) : console.error('No post ID given')"
          class="border-2 border-gray-900 bg-hn-orange px-4 py-2 font-bold text-white hover:bg-orange-500"
        >
          Upvote
        </button>
        <button 
          v-else
          @click="post.id ? emits('removeUpvote', post.id) : console.error('No post ID given')"
          class="border-2 border-gray-900 bg-white px-4 py-2 font-bold hover:bg-gray-100"
        >
          Upvoted
        </button>
      </div>
      
      <button 
        @click="post.id ? emits('viewDetails', post.id) : console.error('No post ID given')"
        class="border-2 border-gray-900 bg-gray-900 px-6 py-2 font-bold text-white hover:bg-gray-800"
      >
        Voir plus →
      </button>
    </div>
  </article>
</template>