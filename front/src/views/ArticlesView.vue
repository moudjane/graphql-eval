<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Post } from '../types/post'
import type { FilterType } from '../types/filter'
import PostCard from '../components/PostCard.vue'
import FilterBar from '../components/FilterBar.vue'
import { useRouter } from 'vue-router'
import { postService } from '../services/postService'

const router = useRouter()
const activeFilter = ref<FilterType>('date')
const posts = ref<Post[]>([])

const loadPosts = async () => {
  posts.value = await postService.getAllPosts(activeFilter.value)
}

const handleFilterChange = async (filter: FilterType) => {
  activeFilter.value = filter
  await loadPosts()
}

const handleUpvote = async (postId: string) => {
  await postService.upvotePost(postId)
  await loadPosts()
}

const handleViewDetails = (postId: string) => {
  router.push({ name: 'post-detail', params: { id: postId } })
}

onMounted(loadPosts)
</script>

<template>
  <main class="p-8">
    <div class="mx-auto max-w-3xl space-y-6">
      <FilterBar
        :active-filter="activeFilter"
        @change="handleFilterChange"
      />
      
      <div class="space-y-6">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @upvote="handleUpvote"
          @view-details="handleViewDetails"
        />
      </div>
    </div>
  </main>
</template>