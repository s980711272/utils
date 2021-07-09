<!--
 * @Descripttion: 功能描述
 * @version: 1.0
 * @Author: sdh
 * @Date: 2021-07-07 17:27:52
 * @LastEditors: sdh
 * @LastEditTime: 2021-07-08 10:42:49
-->
<template>
  <div id="test">{{message}}</div>
</template>

<script>
export default {
  data(){
    return{
      message: '1'
    }
  },
  beforeCreate(){
    console.log('this', this)
  },
  created(){
    console.log('message', this.message)
  },
  beforeMount(){
    console.log('test',document.getElementById('test'))
  },
  mounted(){
    console.log('test22',document.getElementById('test'))
  }
}
</script>

<style>

</style>