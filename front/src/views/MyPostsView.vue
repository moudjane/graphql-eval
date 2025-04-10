<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { graphql } from '../gql/gql'
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import type { GetPostsQuery } from '@/gql/graphql'

const router = useRouter()

const GET_USER_POSTS = graphql(`
  query GetUserPosts ($authorId: String!) {
    getPosts(filter: { author: $authorId }) {
      id
      title
      createdAt
      authorId
      content
      likes
    }
  }
`)

const UPDATE_POST = graphql(`
  mutation UpdatePost($postId: ID!, $input: UpdatePostInput!) {
    updatePost(id: $postId, input: $input) {
      id
      title
      content
      createdAt
    }
  }
`)

const DELETE_POST = graphql(`
  mutation DeletePost($postId: ID!) {
    deletePost(id: $postId)
  }
`)

const posts = ref<GetPostsQuery['getPosts']>([])
const isEditing = ref<string | null>(null)
const editForm = ref({ title: '', content: '' })
const user = JSON.parse(localStorage.getItem('user') || '{}')

const { result, refetch } = useQuery(GET_USER_POSTS,
  { authorId: user.username }
)

onMounted(() => {
  if (result.value?.getPosts) {
    posts.value = result.value.getPosts
  }
})
watchEffect(() => {
  console.log('result', result.value)
  console.log('user', user.id)
  if (result.value?.getPosts) {
    posts.value = result.value.getPosts
  }
})

const { mutate: updatePostMutation } = useMutation(UPDATE_POST)
const { mutate: deletePostMutation } = useMutation(DELETE_POST)

const startEdit = (post: GetPostsQuery['getPosts'][0]) => {
  isEditing.value = post.id || ''
  editForm.value = {
    title: post.title || '',
    content: post.content || ''
  }
}

const cancelEdit = () => {
  isEditing.value = null
  editForm.value = { title: '', content: '' }
}

const handleUpdate = async (postId: string) => {
  if (!editForm.value.title.trim() || !editForm.value.content.trim()) return

  await updatePostMutation({
    postId,
    input: {
      title: editForm.value.title,
      content: editForm.value.content
    }
  })

  isEditing.value = null
  await refetch()
}

const handleDelete = async (postId: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
    await deletePostMutation({ postId })
    await refetch()
  }
}
</script>

<template>
  <main class="p-8">
    <div class="mx-auto max-w-3xl">
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-2xl font-bold">Mes Articles</h1>
        <button
          @click="router.push({ name: 'create-post' })"
          class="border-2 border-gray-900 bg-hn-orange px-4 py-2 font-bold text-white hover:bg-orange-500"
        >
          Nouvel Article
        </button>
      </div>

      <div class="space-y-6">
        <article
          v-for="(post, id) in posts"
          :key="id"
          class="border-2 border-gray-900 bg-white font-mono"
        >
          <div v-if="isEditing === post.id" class="p-6">
            <input
              v-model="editForm.title"
              type="text"
              class="mb-4 w-full border-2 border-gray-900 p-3"
              placeholder="Titre de l'article"
            />
            <textarea
              v-model="editForm.content"
              rows="4"
              class="mb-4 w-full resize-none border-2 border-gray-900 p-3"
              placeholder="Contenu de l'article"
            ></textarea>
            <div class="flex gap-2">
              <button
                @click="post.id ? handleUpdate(post.id): console.error('Post ID is missing')"
                class="border-2 border-gray-900 bg-hn-orange px-4 py-2 font-bold text-white hover:bg-orange-500"
              >
                Enregistrer
              </button>
              <button
                @click="cancelEdit"
                class="border-2 border-gray-900 bg-white px-4 py-2 font-bold hover:bg-gray-100"
              >
                Annuler
              </button>
            </div>
          </div>

          <div v-else>
            <div class="border-b-2 border-gray-900 p-6">
              <h2 class="mb-2 text-xl font-bold">{{ post.title }}</h2>
              <p class="text-sm text-gray-600">
                Créé le {{ new Date(post.createdAt || '').toLocaleDateString('fr-FR') }}
              </p>
            </div>

            <div v-if="post.content" class="border-b-2 border-gray-900 p-6">
              <p class="whitespace-pre-wrap">{{ post.content }}</p>
            </div>

            <div class="flex items-center justify-between bg-gray-50 p-4">
              <div class="flex items-center gap-2">
                <button
                  @click="startEdit(post)"
                  class="border-2 border-gray-900 bg-white px-4 py-2 font-bold hover:bg-gray-100"
                >
                  Modifier
                </button>
                <button
                  @click="post.id ? handleDelete(post.id) : console.error('Post ID is missing')"
                  class="border-2 border-gray-900 bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-bold">{{ post.likes }}</span>
                <span>votes</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>