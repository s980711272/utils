<!--
 * @Descripttion: 功能描述
 * @version: 1.0
 * @Author: sdh
 * @Date: 2020-10-21 14:47:16
 * @LastEditors: sdh
 * @LastEditTime: 2021-02-20 16:15:29
-->
<template>
  <div>
    <el-select v-model="value">
      <el-option v-for="item in items" :key="item.id" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value:1,
      items: [],
    }
  },
  methods:{
    init(){
      setTimeout(()=>{
        this.items = [
          {id:1,value:11},
          {id:2,value:33}
        ]
      },10000)
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style>

</style>