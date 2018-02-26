import Vue from 'vue'
import Router from 'vue-router'
import Calculator from '@/components/Calculator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Calculator,
    },
  ],
})
