<!--  -->
<template>
  <div id="loanAnalyse">
      <van-nav-bar
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
      />
      <div class="header-menu">
        <div class="header-menu-item" :style="{borderBottom:active === 'a' ? '#1890FF solid 1px' : '0px',color:active === 'a' ? '#1890FF' : '#333333'}" @click="changeTab('a')">存款交易趋势分析</div>
        <div class="header-menu-item" :style="{borderBottom:active === 'b' ? '#1890FF solid 1px' : '0px',color:active === 'b' ? '#1890FF' : '#333333'}" @click="changeTab('b')">贷款交易趋势分析</div>
      </div>
      <inflow-component v-if="active === 'a'"></inflow-component>
      <outflow-component v-if="active === 'b'"></outflow-component>
  </div>
</template>

<script>
import inflowComponent from './component/inflowComponent'
import outflowComponent from './component/outflowComponent'
const echarts = require('echarts');
export default {
  data () {
    return {
      active:'a'
    };
  },

  components: {
    inflowComponent,
    outflowComponent
  },

  computed: {},
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    changeTab(type){
      this.active = type;
    },
  },
  mounted(){
  },
}

</script>
<style scoped>
.van-nav-bar{
  /* margin-top:10px; */
  background: #D9E9FF;
  height:24px;
  line-height: 24px;
}

.header-menu{
  display: flex;
  width:60%;
}
.header-menu-item{
  font-size:12px;
  color:#333333;
  height: 32px;
  line-height: 32px;
  width: 50%;
  text-align: center;
}
.header-menu-item:hover{
  color:#8EC9FF;
}

#depositInflowBar,#depositoutflowBar{
  width: 100%;
  height: 300px;
}
#loanBar{
  margin-top:30px
}
.mid-line{
  height:2px;
  background: #B7D5FF;
  margin:0 15px
}
</style>