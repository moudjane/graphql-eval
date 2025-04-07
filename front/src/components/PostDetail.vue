<script setup lang="ts">
import { computed } from 'vue'
import type { PostDetailProps } from '../types/post'
import type { Comment } from '../types/comment'
import CommentCard from './CommentCard.vue'
import CommentForm from './CommentForm.vue'

const props = defineProps<PostDetailProps>()

const emits = defineEmits<{
  (e: 'upvote', postId: string): void
  (e: 'upvoteComment', commentId: string): void
  (e: 'addComment', content: string): void
}>()

const formattedDate = computed(() => {
  return new Date(props.post.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const handleCommentUpvote = (commentId: string) => {
  emits('upvoteComment', commentId)
}
</script>

<template>
  <article class="w-full space-y-6">
    <div class="border-2 border-gray-900 bg-white font-mono">
      <header class="border-b-2 border-gray-900 p-6">
        <h1 class="mb-4 text-2xl font-bold">{{ post.title }}</h1>
        <div class="flex items-center justify-between text-sm text-gray-600">
          <span>par {{ post.author.username }}</span>
          <time>{{ formattedDate }}</time>
        </div>
      </header>

      <div v-if="post.content" class="border-b-2 border-gray-900 p-6">
        <p class="whitespace-pre-wrap text-gray-800">{{ post.content }}</p>
      </div>

      <div class="flex items-center bg-gray-50 p-4">
        <div class="flex items-center gap-4">
          <span class="text-lg font-bold">{{ post.score }}</span>
          <button 
            @click="emits('upvote', post.id)"
            class="border-2 border-gray-900 bg-hn-orange px-4 py-2 font-bold text-white hover:bg-orange-500"
          >
            Upvote
          </button>
        </div>
      </div>
    </div>

    <CommentForm @submit="content => emits('addComment', content)" />

    <section v-if="post.comments?.length" class="space-y-4">
      <h2 class="font-mono text-xl font-bold text-gray-900">Commentaires</h2>
      <div class="space-y-4">
        <CommentCard
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
          @upvote="handleCommentUpvote"
        />
      </div>
    </section>
  </article>
</template>