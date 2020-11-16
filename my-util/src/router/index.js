import Vue from 'vue'
import Router from 'vue-router'
import testFrom from '@/views/testForm' //自动生成form表单
import testMain from '@/views/testMain'
import StandardDemo from '@/views/demo/StandardDemo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: testFrom
    },
  ]
})
