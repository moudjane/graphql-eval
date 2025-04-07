<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  (e: 'submit', text: string): void
}>()

const comment = ref('')

const handleSubmit = () => {
  if (!comment.value.trim()) return
  emits('submit', comment.value)
  comment.value = ''
}
</script>

<template>
  <form 
    @submit.prevent="handleSubmit"
    class="w-full border-2 border-gray-900 bg-white font-mono"
  >
    <div class="border-b-2 border-gray-900 p-4">
      <textarea
        v-model="comment"
        rows="4"
        placeholder="Écrivez votre commentaire..."
        class="w-full resize-none border-2 border-gray-900 bg-white p-3 font-mono text-gray-900 placeholder-gray-500 focus:border-hn-orange focus:outline-none"
      ></textarea>
    </div>
    
    <div class="bg-gray-50 p-4">
      <button
        type="submit"
        class="border-2 border-gray-900 bg-hn-orange px-6 py-2 font-bold text-white transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="!comment.trim()"
      >
        Envoyer
      </button>
    </div>
  </form>
</template>