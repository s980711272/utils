/*
 * @Descripttion: 功能描述
 * @version: 1.0
 * @Author: sdh
 * @Date: 2020-10-20 15:54:55
 * @LastEditors: sdh
 * @LastEditTime: 2021-03-18 14:10:20
 */
import Vue from 'vue'
import Router from 'vue-router'
import testFrom from '@/views/testForm' //自动生成form表单
import testSet from '@/views/testSet'
import testMain from '@/views/testMain'
import StandardDemo from '@/views/demo/StandardDemo'
import testVNode from '@/views/testVNode/parent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'testVNode',
      component: testVNode
    },
  ]
})
