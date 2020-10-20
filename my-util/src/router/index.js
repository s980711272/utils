import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import HelloWorld from '@/components/HelloWorld'
import test from '@/views/test'
=======
import test from '@/view/test.vue'
import testFrom from '@/view/testForm' //自动生成form表单
>>>>>>> f2e23fec786cc2087847b17a5c8f476f2cd235f7
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
<<<<<<< HEAD
      path: '/',
=======
      path: 'test',
>>>>>>> f2e23fec786cc2087847b17a5c8f476f2cd235f7
      name: 'test',
      component: test
    },
  ]
})
