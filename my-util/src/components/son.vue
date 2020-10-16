<template>
  <div id="test">
      <div class="content" >
          我开始是显示的
          <button @click="returnMsg">{{showSon ? '隐藏' : '显示'}}</button>
      </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props:{
      showSon:{
          type:Boolean
      }
  },
  data() {
    return {
        
    };
  },
  methods: {
      returnMsg(){
          this.$emit('update:showSon',!this.showSon);
      }
  },
  mounted(){
      console.log(this.obj);
  }
};
</script>
