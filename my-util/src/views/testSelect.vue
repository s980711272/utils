<!--
 * @Descripttion: 下拉列表虚拟滚动示例
 * @version: 1.0
 * @Author: sdh
 * @Date: 2021-03-30 13:45:16
 * @LastEditors: sdh
 * @LastEditTime: 2021-03-30 15:24:13
-->
<template>
  <el-select v-virtual-list="loadData" filterable :filter-method="fetchData" multiple v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
import $ from 'jquery'
export default {
  data(){
    return{
      value: "",
      options: [],
      list: [],
      startIndex: 0,
      endIndex: 0,
      maxLength: 8,
      allHeight: 0,
      itemHeight: 34 // select组件选项高度
    }
  },
  watch:{
    value(){
      console.log('value', this.value)
    }
  },
  mounted() {
    for (let i = 0; i < 10000; i++) {
      this.list.push({
        label: "测试数据" + i,
        value: Math.random()
      });
    }
    this.allHeight = this.itemHeight * this.list.length;
    this.options = this.list.slice(0, 100);
  },
   methods: {
    fetchData(value){
      if(!value){
        this.options = this.list.slice(0,20)
      }else{
        let arr = []
        for(let temp of this.list){
          if(temp.label.indexOf(value) !== -1){
            arr.push(temp)
          }
        }
        this.options = JSON.parse(JSON.stringify(arr))
      }
    },
    loadData(SCROLL_DOM) {
      if($('.el-select__input').val()) return
      /**
       * 计算当前显示的列表区域index
       * @params SCROLL_DOM 当前滑动容器
       * @params startIndex 开始节点
       * @params endIndex   结束节点
       * @params DOM_LIST   列表dom节点
       * @params allHeight  列表总高度
       * @params itemHeight 列表项高度
       */
      let DOM_LIST = SCROLL_DOM.querySelector(
        ".el-select-dropdown__wrap .el-select-dropdown__list"
      );
      const top = SCROLL_DOM.scrollTop;
      this.startIndex = Math.floor(top / this.itemHeight);
      this.endIndex = this.startIndex + this.maxLength;
      if (this.endIndex >= this.list.length) {
        DOM_LIST.style.paddingBottom = 0;
        this.options = this.list.slice(this.startIndex, this.endIndex);
        return;
      }
      DOM_LIST.style.paddingTop = top + "px";
      DOM_LIST.style.paddingBottom =
        this.allHeight - SCROLL_DOM.clientHeight - top + "px";
      this.options = this.list.slice(this.startIndex, this.endIndex);
    }
  },
}
</script>

<style>

</style>
