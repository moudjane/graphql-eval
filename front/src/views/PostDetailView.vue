<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Post } from '../types/post'
import PostDetail from '../components/PostDetail.vue'
import { useRoute } from 'vue-router'
import { postService } from '../services/postService'

const route = useRoute()
const post = ref<Post | null>(null)

const loadPost = async () => {
  const postData = await postService.getPostById(route.params.id as string)
  if (postData) {
    post.value = postData
  }
}

const handleUpvote = async (postId: string) => {
  await postService.upvotePost(postId)
  await loadPost()
}

const handleCommentUpvote = async (commentId: string) => {
  if (post.value) {
    await postService.upvoteComment(post.value.id, commentId)
    await loadPost()
  }
}

const handleAddComment = async (content: string) => {
  if (post.value) {
    await postService.addComment(post.value.id, content)
    await loadPost()
  }
}

onMounted(loadPost)
</script>

<template>
  <main class="p-8">
    <div class="mx-auto max-w-3xl">
      <PostDetail
        v-if="post"
        :post="post"
        @upvote="handleUpvote"
        @upvote-comment="handleCommentUpvote"
        @add-comment="handleAddComment"
      />
    </div>
  </main>
</template>