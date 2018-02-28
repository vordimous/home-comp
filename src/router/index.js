import Vue from 'vue'
import Router from 'vue-router'
import HomeCost from '@/components/HomeCost'
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
      component: HomeCost,
    },
    {
      path: '/discuss',
      name: 'Discuss',
      component: Disqus,
    },
  ],
})
