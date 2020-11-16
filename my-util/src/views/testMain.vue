<template>
  <div>
    <el-button @click="handleClick">点击</el-button>
  </div>
</template>

<script>
import Util from '@/util/util'
import axios from 'axios'
export default {
  data(){
    return{
      isLoding : false
    }
  },
  methods:{
    handleClick(){
      if(!this.isLoding){
        this.isLoding = true
        setTimeout(()=>this.test(),2000)
      }
    },
    test(){
      console.log('111')
    },
    sleep(){
      let sleep = Util.sleep()
      setTimeout(()=>{
        sleep.next()
        setTimeout(()=>{
          console.log('我在沉睡，10s后醒来')
          sleep.next()
        },10000)
      },10000)
    },
    init(){
      function add(a,b){
        return a+b
      }
      add.toString = function(){
        console.log('test')
        return num
      }
      console.log(add(1,2))
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style>

</style>