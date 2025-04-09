<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.token !== null && authStore.user !== null)

const user = computed(() => authStore.user)
  
// const handleLogout = async () => {
//   await authStore.logout();
//   router.push('/login');
// }
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
      
      <nav>
        <ul class="flex items-center gap-4">
          <template v-if="!isAuthenticated">
            <li>
              <router-link 
                to="/login" 
                class="font-bold text-gray-900 hover:text-hn-orange"
                :class="{ 'text-hn-orange': route.name === 'login' }"
              >
                Connexion
              </router-link>
            </li>
            <li>
              <router-link 
                to="/register" 
                class="border-2 border-gray-900 bg-hn-orange px-4 py-2 font-bold text-white hover:bg-orange-500"
              >
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
            <!-- <li>
              <button 
                @click="handleLogout"
                class="border-2 border-gray-900 bg-hn-orange px-4 py-2 font-bold text-white hover:bg-orange-500"
              >
                Déconnexion
              </button>
            </li> -->
          </template>
        </ul>
      </nav>
    </div>
  </header>
</template>
