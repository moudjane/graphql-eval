<script setup lang="ts">
const props = defineProps<{comment: string}>()
</script>

<template>
  <article class="w-full border-2 border-gray-900 bg-white font-mono mb-4">
    <div class="whitespace-pre-wrap p-4 text-gray-800">
      {{ props.comment }}
    </div>
  </article>
</template>