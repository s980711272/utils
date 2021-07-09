<!--
 * @Descripttion: 功能描述
 * @version: 1.0
 * @Author: sdh
 * @Date: 2021-05-24 17:14:13
 * @LastEditors: sdh
 * @LastEditTime: 2021-05-24 17:18:02
-->
<template>
  <div class="masonry"> 
    <div class="item"> 
      <div class="item_content content-lar"> 1 我最大 </div> 
    </div> 
    <div class="item"> 
      <div class="item_content content-sma"> 2 我最小 </div> 
    </div>
    <div class="item"> 
      <div class="item_content content-mid"> 3 我中等 </div> 
    </div>
    <div class="item"> 
      <div class="item_content content-sma"> 4 我最小 </div> 
    </div>
    <div class="item"> 
      <div class="item_content content-mid"> 5 我中等 </div> 
    </div>
    <div class="item"> 
      <div class="item_content content-lar"> 6 我最大 </div> 
    </div>
    <div class="item"> 
      <div class="item_content content-sma"> 7 我最小 </div> 
    </div>
    <div class="item"> 
      <div class="item_content content-lar"> 8 我最大 </div> 
    </div>
    <div class="item"> 
      <div class="item_content content-lar"> 9 我最大 </div> 
    </div>
    <div class="item"> 
      <div class="item_content content-sma"> 10 我最小 </div> 
    </div>
    <div class="item">
      <div class="item_content content-mid"> 11 我中等 </div> 
    </div>
    <div class="item"> 
      <div class="item_content content-mid"> 12 我中等 </div> 
    </div>
    <!-- more items --> 
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  }
}
</script>

<style>
.masonry { 
  height: 800px;
  display: flex; 
  flex-flow: column wrap;
  margin:2em auto;
}
.item { 
  padding: 2em;
  margin-bottom: 2em;
  break-inside: avoid;
  background: #f60;
  color: #fff;
  text-align: center;
  margin: 10px;
}
.item .content-lar {
  height: 200px;
}
.item .content-mid {
  height: 100px;
}
.item .content-sma {
  height: 50px;
}
</style>