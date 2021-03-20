import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Авторизация',
    meta: {layout: 'auth'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Регистрация',
    meta: {layout: 'auth'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/getinfo',
    name: 'Получение информации',
    meta: {layout: 'auth'},
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/GetInfo.vue')
  },
  {
    path: '/',
    name: 'Клиенты',
    meta: {layout: 'main'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Clients.vue')
  },
  {
    path: '/object',
    name: 'Объекты',
    meta: {layout: 'main'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Object.vue')
  },
  {
    path: '/admin',
    name: 'Панель администратора',
    meta: {layout: 'main'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
