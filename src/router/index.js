import Vue from 'vue'
import Router from 'vue-router'
import Calculator from '@/components/Calculator'
import Landing from '@/components/Landing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/home',
      name: 'Home',
      component: Calculator,
    },
  ],
})
