import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/view/test'
import balanceAnalyse from '@/view/balanceAnalyse'
import loanAnalyse from '@/view/loanAnalyse'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: test
    },
    {
      path: '/analyse',
      name: 'analyse',
      component: balanceAnalyse
    },
    {
      path: '/loanAnalyse',
      name: 'loanAnalyse',
      component: loanAnalyse
    }
  ]
})
