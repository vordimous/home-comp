import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Calculator from '@/components/Calculator';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calc',
      component: Calculator,
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello,
    },
  ],
});
