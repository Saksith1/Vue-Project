import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Entertainment from '../views/Entertainment.vue'
import Sport from '../views/Sport.vue'
import Technology from '../views/Technology.vue'
import NewsDetail from '../views/NewsDetail.vue'
import LiveAndSociey from '../views/Liveandsociety.vue'
import NewsByCategory from '../views/NewsByCategory.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:id/Entertainment',
    name: 'entertainment',
    component: NewsByCategory,
    props:true
  },
  {
    path: '/:id/Sport',
    name: 'sport',
    component: NewsByCategory,
    props:true
  },
  {
    path: '/:id/Technology',
    name: 'technology',
    component: NewsByCategory,
    props:true
  },
  {
    path: '/:id/Live-and-society',
    name: 'liveandsociety',
    component: NewsByCategory,
    props:true
  },
  {
    path: '/news/:id',  
    name: 'news-detail',
    component: NewsDetail,
    props:true
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
