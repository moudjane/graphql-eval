<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <header class="border-b-2 border-gray-900 bg-white font-mono">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
      <nav>
        <ul class="flex items-center gap-6">
          <li>
            <router-link 
              to="/" 
              class="font-bold text-gray-900 hover:text-hn-orange"
              :class="{ 'text-hn-orange': route.name === 'home' }"
            >
              Accueil
            </router-link>
          </li>
          <li>
            <router-link 
              to="/articles" 
              class="font-bold text-gray-900 hover:text-hn-orange"
              :class="{ 'text-hn-orange': route.name === 'articles' }"
            >
              Articles
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>