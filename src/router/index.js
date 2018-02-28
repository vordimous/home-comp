import Vue from 'vue'
import Router from 'vue-router'
import Calculator from '@/components/Calculator'
import Landing from '@/components/Landing'
import Disqus from '@/components/Disqus'

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
    {
      path: '/discuss',
      name: 'Discuss',
      component: Disqus,
    },
  ],
})
