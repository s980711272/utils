/*
 * @Descripttion: 功能描述
 * @version: 1.0
 * @Author: sdh
 * @Date: 2020-10-20 15:54:55
 * @LastEditors: sdh
 * @LastEditTime: 2021-03-30 13:47:48
 */
import Vue from 'vue'
import Router from 'vue-router'
import testFrom from '@/views/testForm' //自动生成form表单
import test from '@/views/test'
import testMain from '@/views/testMain'
import StandardDemo from '@/views/demo/StandardDemo'
import testVNode from '@/views/testVNode/parent'
import testSelect from '@/views/testSelect'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: testSelect
    },
  ]
})
