<!--
 * @Descripttion: hook
 * @version: 1.0
 * @Author: sdh
 * @Date: 2021-07-08 15:12:24
 * @LastEditors: sdh
 * @LastEditTime: 2021-07-08 15:26:55
-->
<template>
  <div>
    <child @hook:mounted="add"></child>
  </div>
</template>

<script>
import child from './child.vue'
export default {
  components: { child },
  data(){
    return{

    }
  },
  created(){
    console.log('this', this)
  },
  methods:{
    add(){
      console.log('parent')
    }
  }
  
}
</script>

<style>

</style>