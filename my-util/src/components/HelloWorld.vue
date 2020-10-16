<template>
  <div class="hello">
    <a-button type="primary" @click="debounce_test2">防抖测试</a-button>
    <a-button type="primary" @click="generateRandom">生成随机密钥</a-button>
    <a-button type="primary" @click="formatData">格式化日期</a-button>
    <div>测试日期{{date | DateFormat('yyyy-MM')}}</div>
    <input type="text" v-all-number="type" />
    <div v-for="(item,index) in midArr" :key="index"></div>
  </div>
</template>

<script>
import timeUtil from "../util/calendar";
import Util from '@/util/util'
export default {
  name: "HelloWorld",
  data() {
    return {
      type:"money",
      submit_count: 0, //记载提交次数
      date:'',
      midArr:[{type:'2',key:'2'}],
      author:1,
    };
  },
  methods: {
    debounce_test2: Util.debounce(function(){this.submit("你好","我是大哥大")},300),
    submit: function(text,text2) {
      console.log(text,text2);
      this.submit_count++;
      console.log("我提交了" + this.submit_count + "次数");
      this.submit_count = 0;
    },
    generateRandom(){
      let key = Util.createKey();
      console.log(key);
    },
    formatData(){
      let date = new Date();
      console.log(timeUtil.formateDate(date,'/'));
    },
    init(){
      this.date=new Date();
    }
  },
  mounted(){
    this.init();
  }
};
</script>
<style scoped>
</style>
