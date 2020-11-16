<!--
datt:2020-10-16
author:sdh
-->
<template>
  <div>
    <el-button-group class="psc-com-group-btn" size="mini">
      <el-button size="mini" @click="handleClick">全部</el-button>
      <el-button v-for="item in buttonArray" :key="item.key" size="mini" @click="handleClick(item.key)">{{ item.value }}</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'GroupButton',
  props: {
    buttonArray: {
      type: Array,
      default: []
    },
    isNeedAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    };
  },
  methods: {
    handleClick(item) {
      this.$emit('input', item.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.psc-com-group-btn .el-button{
  margin: 0 5px
}
</style>
