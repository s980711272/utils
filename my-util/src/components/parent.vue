<template>
  <div id="test">
      <div class="content">
        <son :showSon="isShowSon" v-if="isShowSon"></son>
      </div>
  </div>
</template>

<script>
import son from './son'
export default {
  name: "HelloWorld",
  components:{
    son
  },
  data() {
    return {
        isShowSon:true
    };
  },
  methods: {
    getMsgByChild(msg){
      console.log(msg);
    }
  },
  mounted(){
  }
};
</script>