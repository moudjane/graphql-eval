<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.token !== null && authStore.user !== null)
const user = computed(() => authStore.user)

const handleLogout = () => {
  authStore.clearAuth()
  router.push('/login')
}
</script>

<template>
  <header class="border-b-2 border-gray-900 bg-white font-mono">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
      <nav>
        <ul class="flex items-center gap-6">
          <li>
            <router-link to="/" class="font-bold text-gray-900 hover:text-hn-orange"
              :class="{ 'text-hn-orange': route.name === 'home' }">
              Accueil
            </router-link>
          </li>
          <li>
            <router-link to="/articles" class="font-bold text-gray-900 hover:text-hn-orange"
              :class="{ 'text-hn-orange': route.name === 'articles' }">
              Articles
            </router-link>
          </li>
          <li v-if="authStore.user">
            <router-link to="/articles/new" class="font-bold text-gray-900 hover:text-hn-orange"
              :class="{ 'text-hn-orange': route.name === 'new-article' }">
              Nouvel article
            </router-link>
          </li>
          <li v-if="authStore.user">
            <router-link 
              to="/my-posts" 
              class="font-bold text-gray-900 hover:text-hn-orange"
              :class="{ 'text-hn-orange': route.name === 'my-posts' }"
            >
              Mes Articles
            </router-link>
          </li>
        </ul>
      </nav>

      <nav>
        <ul class="flex items-center gap-4">
          <template v-if="!isAuthenticated">
            <li>
              <router-link to="/login" class="font-bold text-gray-900 hover:text-hn-orange"
                :class="{ 'text-hn-orange': route.name === 'login' }">
                Connexion
              </router-link>
            </li>
            <li>
              <router-link to="/register" class="font-bold text-gray-900 hover:text-hn-orange"
                :class="{ 'text-hn-orange': route.name === 'register' }">
                S'inscrire
              </router-link>
            </li>
          </template>
          <template v-else>
            <li>
              <span class="font-bold text-gray-900">
                Bonjour, {{ user!.username }}
              </span>
            </li>
            <li>
              <button 
                @click="handleLogout"
                class="font-bold text-gray-900 hover:text-hn-orange"
              >
                Déconnexion
              </button>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </header>
</template>
