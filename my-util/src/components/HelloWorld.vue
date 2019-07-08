<template>
  <div class="hello">
    <a-button type="primary" @click="debounce_test2">防抖测试</a-button>
  </div>
</template>

<script>
import Util from "../common/util";
export default {
  name: "HelloWorld",
  data() {
    return {
      submit_count: 0 //记载提交次数
    };
  },
  methods: {
    debounce_test2: Util.debounce(function(){this.submit("你好","我是大哥大")},300),
    submit: function(text,text2) {
      console.log(text,text2);
      this.submit_count++;
      console.log("我提交了" + this.submit_count + "次数");
      this.submit_count = 0;
    }
  }
};
</script>

<style scoped>
</style>
