<!--
 * @Descripttion: 功能描述
 * @version: 1.0
 * @Author: sdh
 * @Date: 2021-07-08 15:12:37
 * @LastEditors: sdh
 * @LastEditTime: 2021-07-08 15:28:40
-->
<template>
  <div>{{message}}</div>
</template>

<script>
export default {
  data(){
    return{
      message: '11',
    }
  },
  beforeCreate(){
    console.log('child', this)
  },
  mounted(){
    this.message = '222'
    console.log('child')
  }
}
</script>

<style>

</style>