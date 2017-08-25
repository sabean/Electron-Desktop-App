import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/app/pages/Login.vue'
import LandingPage from '@/app/pages/LandingPage.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/LandingPage',
    name: 'landing',
    component: LandingPage
  },
  {
    path: '*',
    redirect: '/'
  }
  ]
})
