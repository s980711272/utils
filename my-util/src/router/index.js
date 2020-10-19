import Vue from 'vue'
import Router from 'vue-router'
import test from '@/view/test.vue'
import testFrom from '@/view/testForm' //自动生成form表单
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: test
    },
    {
      path: 'test',
      name: 'test',
      component: test
    },
  ]
})
