<script setup lang="ts">
interface FilterBarProps {
  activeFilter: 'CREATED_AT' | 'LIKES'
}

const props = defineProps<FilterBarProps>()

const emits = defineEmits<{
  (e: 'change', value: 'CREATED_AT' | 'LIKES'): void
}>()
</script>

<template>
  <div class="w-full border-2 border-gray-900 bg-white p-4 font-mono">
    <div class="flex items-center gap-4">
      <span class="font-bold text-gray-900">Trier par :</span>
      <div class="flex gap-2">
        <button 
          @click="emits('change', 'CREATED_AT')"
          :class="[
            'border-2 border-gray-900 px-4 py-2 font-bold transition-colors',
            activeFilter === 'CREATED_AT' 
              ? 'bg-hn-orange text-white' 
              : 'bg-white text-gray-900 hover:bg-gray-100'
          ]"
        >
          Par date
        </button>
        <button 
          @click="emits('change', 'LIKES')"
          :class="[
            'border-2 border-gray-900 px-4 py-2 font-bold transition-colors',
            activeFilter === 'LIKES' 
              ? 'bg-hn-orange text-white' 
              : 'bg-white text-gray-900 hover:bg-gray-100'
          ]"
        >
          Par popularité
        </button>
      </div>
    </div>
  </div>
</template>