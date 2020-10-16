import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/views/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/',
      name: 'test',
      component: test
    },
  ]
})
