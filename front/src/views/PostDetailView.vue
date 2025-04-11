<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue'
import PostDetail from '../components/PostDetail.vue'
import { useRoute } from 'vue-router'
import { graphql } from '../gql/gql'
import { useMutation, useQuery } from '@vue/apollo-composable'
import type { GetPostQuery, GetPostQueryVariables } from '@/gql/graphql'

const route = useRoute()
const postId = route.params.id as string

const GET_POST = graphql(`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      createdAt
      authorId
      authorName
      content
      comments{
        content
        id
      }
      likes
    }
  }
`)
const LIKE_POST = graphql(`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId)
  }
`)
const ADD_COMMENT = graphql(`
  mutation AddComment($postId: ID!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      id
    }
  }
`)
const UNLIKE_POST = graphql(`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId)
  }
`)

const { result, loading, error, refetch } = useQuery<GetPostQuery, GetPostQueryVariables>(
  GET_POST,
  { id: postId }
)

const { mutate: likePost } = useMutation(LIKE_POST, {
  variables: {
    postId
  }
})
const { mutate: unlikePost } = useMutation(UNLIKE_POST, {
  variables: {
    postId
  }
})
const { mutate: addCommentMutation } = useMutation(ADD_COMMENT)

const post = ref<GetPostQuery['getPost'] | null>(null)
watchEffect(() => {
  if (result.value) {
    post.value = result.value.getPost ?? null
  }
})

const handleUpvote = async (postId: string) => {
  await likePost({ postId })
  const likedPost = JSON.parse(localStorage.getItem('postLikedId') || '[]')
  localStorage.setItem('postLikedId', JSON.stringify([...likedPost, postId]))
  await refetch()
}

const handleRemoveUpvote = async (postId: string) => {
  await unlikePost({ postId })
  const likedPost = JSON.parse(localStorage.getItem('postLikedId') || '[]')
  const updatedLikedPost = likedPost.filter((id: string) => id !== postId)
  localStorage.setItem('postLikedId', JSON.stringify(updatedLikedPost))
  await refetch()
}

const handleAddComment = async (content: string) => {
  if (!post.value || !post.value.id) return

  await addCommentMutation({
    postId: post.value.id,
    content
  })
  await refetch()
}

onMounted(refetch)
</script>

<template>
  <main class="p-8">
    <div class="mx-auto max-w-3xl">
      <PostDetail
        v-if="post"
        :post="post"
        @upvote="handleUpvote"
        @add-comment="handleAddComment"
        @remove-upvote="handleRemoveUpvote"
      />
    </div>
  </main>
</template>