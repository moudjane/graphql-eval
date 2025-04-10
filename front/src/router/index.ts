import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('../views/ArticlesView.vue')
  },
  {
    path: '/articles/new',
    name: 'create-post',
    component: () => import('../views/CreatePostView.vue')
  },
  {
    path: '/post/:id',
    name: 'post-detail',
    component: () => import('../views/PostDetailView.vue'),
    props: true
  },
  {
    path: '/my-posts',
    name: 'my-posts',
    component: () => import('../views/MyPostsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router