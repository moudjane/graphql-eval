<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>