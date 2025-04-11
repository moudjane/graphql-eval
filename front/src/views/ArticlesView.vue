<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import PostCard from '../components/PostCard.vue'
import FilterBar from '../components/FilterBar.vue'
import { useRouter } from 'vue-router'
import { graphql } from '../gql/gql'
import { useMutation, useQuery } from '@vue/apollo-composable'
import type { GetPostsQuery, GetPostsQueryVariables, OrderDirection, PostOrderField } from '@/gql/graphql'

type FilterType = 'CREATED_AT' | 'LIKES'

const router = useRouter()
const activeFilter = ref<FilterType>('CREATED_AT')

const GET_POSTS = graphql(`
  query GetPosts($filter: PostFilterInput) {
    getPosts(filter: $filter) {
      id
      title
      createdAt
      authorId
      authorName
      content
      likes
    }
  }
`)
const LIKE_POST = graphql(`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId)
  }
`)
const UNLIKE_POST = graphql(`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId)
  }
`)

const { result, refetch } = useQuery<GetPostsQuery, GetPostsQueryVariables>(
  GET_POSTS,
  {
    filter: {
      orderBy: {
        field: activeFilter.value as PostOrderField,
        direction: 'DESC' as OrderDirection
      }
    }
  }
)

const { mutate: likePost } = useMutation(LIKE_POST, {
  variables: {
    postId: ''
  }
})
const { mutate: unLikePost } = useMutation(UNLIKE_POST, {
  variables: {
    postId: ''
  }
})

const posts = ref<GetPostsQuery['getPosts']>([])
watchEffect(() => {
  if (result.value) {
    posts.value = result.value.getPosts ?? []
  }
})

const handleFilterChange = async (filter: FilterType) => {
  activeFilter.value = filter
  await refetch()
}

const handleUpvote = async (postId: string) => {
  await likePost({ postId })
  const likedPost = JSON.parse(localStorage.getItem('postLikedId') || '[]')
  console.log('likedPost', [...likedPost, postId])
  localStorage.setItem('postLikedId', JSON.stringify([...likedPost, postId]))
  await refetch()
}

const handleRemoveUpvote = async (postId: string) => {
  await unLikePost({ postId })
  const likedPost = JSON.parse(localStorage.getItem('postLikedId') || '[]')
  const updatedLikedPost = likedPost.filter((id: string) => id !== postId)
  localStorage.setItem('postLikedId', JSON.stringify(updatedLikedPost))
  await refetch()
}

const handleViewDetails = (postId: string) => {
  router.push({ name: 'post-detail', params: { id: postId } })
}

onMounted(refetch)
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
          v-for="(post, id) in posts"
          :key="id"
          :post="post"
          @upvote="handleUpvote"
          @remove-upvote="handleRemoveUpvote"
          @view-details="handleViewDetails"
        />
      </div>
    </div>
  </main>
</template>