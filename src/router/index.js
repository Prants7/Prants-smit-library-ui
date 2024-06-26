import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '../views/BookView.vue'
import ReaderView from '../views/ReaderView.vue'
import BorrowView from '@/views/BorrowView.vue'
import BookDetailsView from '@/views/BookDetailsView.vue'
import ReaderDetailView from '@/views/ReaderDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: BookView
    },
    {
      path: '/readers',
      name: 'readers',
      component: ReaderView
    },
    {
      path: '/borrow',
      name: 'borrow',
      component: BorrowView
    },
    {
      path: '/book/:id',
      name: 'bookDetails',
      component: BookDetailsView
    },
    {
      path: '/reader/:code',
      name: 'readerDetails',
      component: ReaderDetailView
    }
  ]
})

export default router
