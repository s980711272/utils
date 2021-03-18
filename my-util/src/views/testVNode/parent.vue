<!--
 * @Descripttion: 功能描述
 * @version: 1.0
 * @Author: sdh
 * @Date: 2021-03-18 14:07:51
 * @LastEditors: sdh
 * @LastEditTime: 2021-03-18 14:16:09
-->
<template>
  <div>
    张三
    <span>李四</span>
    <child></child>
  </div>
</template>

<script>
import child from './child'
export default {
  components:{child},
  data(){
    return{

    }
  },
  mounted(){
    console.log(this)
  }
}
</script>

<style>

</style>