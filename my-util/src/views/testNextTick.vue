<!--
 * @Descripttion: 测试nextTick
 * @version: 1.0
 * @Author: sdh
 * @Date: 2021-04-07 20:02:09
 * @LastEditors: sdh
 * @LastEditTime: 2021-04-19 20:47:13
-->
<template>
  <div v-if="isShow" id="tag">
    {{msg}}
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShow: false,
      msg:'11'
    }
  },
  methods:{
    init(){
      this.isShow = true
      
      setTimeout(()=>{
        this.msg = 333
        console.log(document.getElementById('tag'))
        console.log('微任务')
      })
      Promise.then(()=>{
        console.log('宏任务')
      })
    },
  },
  mounted(){
    this.init()
  }
}
</script>

<style>

</style>