<!--
 * @Descripttion: 功能描述
 * @version: 1.0
 * @Author: sdh
 * @Date: 2021-03-12 10:23:55
 * @LastEditors: sdh
 * @LastEditTime: 2021-03-12 10:34:07
-->
<template>
  <div>{{obj}}</div>
</template>

<script>
export default {
  data(){
    return{
      arr: [1,2,3],
      obj:{name:'3'}
    }
  },
  mounted(){
    this.$set(this.obj, 'id', 5),
    setTimeout(()=>{
      this.obj.id = 8
    },5000)
    // this.$set(this.obj, id, 5)
  }
}
</script>

<style>

</style>