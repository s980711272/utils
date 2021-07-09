/*
 * @Descripttion: 功能描述
 * @version: 1.0
 * @Author: sdh
 * @Date: 2020-10-20 15:54:55
 * @LastEditors: sdh
 * @LastEditTime: 2021-07-08 15:16:19
 */
import Vue from 'vue'
import Router from 'vue-router'
import testFrom from '@/views/testForm' //自动生成form表单
import test from '@/views/test'
import testMain from '@/views/testMain'
import StandardDemo from '@/views/demo/StandardDemo'
import testVNode from '@/views/testVNode/parent'
import testSelect from '@/views/testSelect'
import testNextTick from '@/views/testNextTick'
import testElementRule from '@/views/testElementRule'
import testFall from '@/views/testFall'
import testLifeCircle from '@/views/testLifeCircle'
import testHook from '@/views/testHook/parent'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: testHook
    },
  ]
})
