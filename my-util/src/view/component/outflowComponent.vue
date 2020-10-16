<!--  -->
<template>
  <div id="loanAnalyse">
    <div class="scroll-container">
      <div id="loanProvide"></div>
      <div id="loanBack"></div>
      <div id="loanOverDue"></div> <!--贷款逾期-->
    </div>
  </div>
</template>

<script>
const echarts = require('echarts');
export default {
  data () {
    return {
      active:'a',
      data:['30','29','28','27','26','25','24','23','22','21','20','19'].reverse(),
    };
  },

  components: {},

  computed: {},
  methods: {
    onClickLeft(){

    },
    loanProvide(){
      let vm = this
      var textStyle = {
        color:'#B9B7B7',
      }
      let arr = [
        [266.4,0,0,74.4,213.12,0,29.6,651.2,288.304,177.6,0,58.016].reverse(),
        [171,0,80,45.6,136.8,0,19,418,185.06,114,0,37.24].reverse(),
        [12.6,0,0,0,10.08,0,1.4,30.8,13.636,8.4,0,2.744].reverse(),

      ]
      var myChart = echarts.init(document.getElementById('loanProvide'));
      myChart.setOption({
        title:{
          text:'贷款发放分布',
          textStyle:{
            fontSize:10
          }
        },
        legend: {
            data: ['公司贷款', '零售贷款','贴现票据'],
            right: 0,
            top:15,
            itemWidth:10, //图形宽度
            itemHeight:10, //图形高度
            itemGap:2,
            textStyle:{
              fontSize:8
            }
        },
        xAxis: {
            data: vm.data,
            name: '(日)',
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            name: ['单位（万元）'],
            type:'value',
            nameTextStyle:{
              color:'#B9B7B7',
              opacity:"0.5"
            }
        },
        tooltip:{
          backgroundColor:'rgba(255,255,255,0.8)',
          borderWidth:'1px',
          borderColor:'#9DCCF8',
          trigger:'axis', //4000,3500,1500
          confine:true,
          formatter:function(params){
            var tip = '';
            if(params != null && params.length > 0){
              tip += '<div style="width:auto;color:#333333;font-size:10px;">2020.' + params[0].name +'</div>'
              let all = 0;
              for(let i=0; i<params.length; i++){
                all = (all*100 + params[i].data*100)/100
              }
              tip += '<div style="font-size:10px;color:#666666;"><span style="width:100px;color:#666666;display:inline-block">贷款分布</span></div>'
              for(let i=0; i<params.length; i++){
                let process = '0'
                if(params[i].dataIndex != 0){
                  let temp1 = arr[i][params[i].dataIndex] - arr[i][params[i].dataIndex-1]
                  if(arr[i][params[i].dataIndex] != 0){
                    let temp2 =  (temp1 / arr[i][params[i].dataIndex]*100).toFixed(2)
                    process = temp2 > 0 ? '上升了' + temp2 + '%' : '下降了' + Math.abs(temp2) +'%'
                  }else{
                    process = temp1 > 0 ? '上升了' + Math.abs(temp1) : '下降了' + Math.abs(temp1)
                  }
                }
                tip +='<div style="font-size:10px;color:#666666;"><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+
                params[i].marker + params[i].seriesName +
                '</span><span style="color:#333333;display:inline-block;min-width:60px;width:auto;font-weight:bold;">' + params[i].data +
                '</span><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+process +'</span></div>'
              }
            }
            return tip
          }
        },
        grid:{
          left:"15%",
          right:"10%"
        },
        series: [{
            data: arr[0],
            type: 'bar',
            name: '公司贷款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#5CE9FF',
            },
            barWidth: 10,
        },
        {
            data: arr[1],
            type: 'bar',
            name: '零售贷款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#02BFF4',
            },
            barWidth: 10,
        },
        {
            data: arr[2],
            type: 'bar',
            name: '贴现票据',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#05A3D6',
            },
            barWidth: 10,
        }
        ]
      })
    },
    loanBack(){
      let vm = this
      let arr = [
        [813.6,32.544,81.36,47.46,61.02,54.24,305.1,203.4,0,216.96,56.952,0].reverse(),
        [256.4,10.456,25.68,14.98,19.26,17.12,96.3,64.2,0,68.48,17.976,0].reverse(),
        [130,5,13,7.56,9.72,8.64,48.6,32.4,0,34.56,9.072,0].reverse()
      ]
      var textStyle = {
        color:'#B9B7B7',
      }
      var myChart = echarts.init(document.getElementById('loanBack'));
      myChart.setOption({
        title:{
          text:'贷款归还分布',
          textStyle:{
            // color:'#91CAFF',
            fontSize:10
          }
        },
        legend: {
            data: ['公司贷款', '零售贷款','贴现票据'],
            right: 0,
            top:15,
            itemWidth:10, //图形宽度
            itemHeight:10, //图形高度
            itemGap:2,
            textStyle:{
              fontSize:8
            }
        },
        xAxis: {
            data:vm.data,
            name: '(日)',
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            name: ['单位（万元）'],
            data:[
              {
                value:'20000',
                textStyle:textStyle
              },{
                value:'40000',
                textStyle:textStyle
              },{
                value:'80000',
                textStyle:textStyle
              },{
                value:'120000',
                textStyle:textStyle
              },
              {
                value:'160000',
                textStyle:textStyle
              }
            ],
            type:'value',
            nameTextStyle:{
              color:'#B9B7B7',
              opacity:"0.5"
            }
        },
        tooltip:{
            backgroundColor:'rgba(255,255,255,0.8)',
            borderWidth:'1px',
            borderColor:'#9DCCF8',
            trigger:'axis', //4000,3500,1500
            confine:true,
            formatter:function(params){
              var tip = '';
              if(params != null && params.length > 0){
                tip += '<div style="width:auto;color:#333333;font-size:10px;">2020.' + params[0].name +'</div>'
                let all = 0;
                for(let i=0; i<params.length; i++){
                  all = (all*100 + params[i].data*100)/100
                }
                tip += '<div style="font-size:10px;color:#666666;"><span style="width:100px;color:#666666;display:inline-block">贷款分布</span></div>'
                for(let i=0; i<params.length; i++){
                  let process = '0'
                  if(params[i].dataIndex != 0){
                    let temp1 = arr[i][params[i].dataIndex] - arr[i][params[i].dataIndex-1]
                    if(arr[i][params[i].dataIndex] != 0){
                      let temp2 =  (temp1 / arr[i][params[i].dataIndex]*100).toFixed(2)
                      process = temp2 > 0 ? '上升了' + temp2 + '%' : '下降了' + Math.abs(temp2) +'%'
                    }else{
                      process = temp1 > 0 ? '上升了' + Math.abs(temp1): '下降了' + Math.abs(temp1)
                    }
                  }
                  tip +='<div style="font-size:10px;color:#666666;"><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+
                  params[i].marker + params[i].seriesName +
                  '</span><span style="color:#333333;display:inline-block;min-width:60px;width:auto;font-weight:bold;">' + params[i].data +
                  '</span><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+process +'</span></div>'
                }
              }
              return tip
            }
        },
        grid:{
          left:"15%",
          right:"10%"
        },
        series: [
          {
            data: arr[0],
            type: 'bar',
            name: '公司贷款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#A047FF',
            },
            barWidth: 10,
          },
          {
              data: arr[1],
              type: 'bar',
              name: '零售贷款',
              stack: 'one',
              showBackground: false,
              itemStyle:{
                color:'#D65595',
              },
              barWidth: 10,
          },
          {
              data: arr[2],
              type: 'bar',
              name: '贴现票据',
              stack: 'one',
              showBackground: false,
              itemStyle:{
                color:'#BC80FF',
              },
              barWidth: 10,
          }
        ]
      })
    },
    loanOverDue(){
      let vm = this
      let arr = [
        [24.864,0,5.92,0,0,3.1,6.2,0,0,29.6,0,0].reverse(),
        [17.136,0,4.08,0,0,1.9,3.8,0,0,20.4,0,0].reverse(),
        [0,0,0,0,0,0,0,0,0,0,0,0].reverse()
      ]
      var myChart = echarts.init(document.getElementById('loanOverDue'));
      myChart.setOption({
        title:{
          text:'贷款逾期分布',
          textStyle:{
            // color:'#91CAFF',
            fontSize:10
          }
        },
        legend: {
            data: ['公司贷款', '零售贷款','贴现票据'],
            right: 0,
            top:15,
            itemWidth:10, //图形宽度
            itemHeight:10, //图形高度
            itemGap:2,
            textStyle:{
              fontSize:8
            }
        },
        xAxis: {
            data: vm.data,
            name: '(日)',
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            name: ['单位（万元）'],
            type:'value',
            nameTextStyle:{
              color:'#B9B7B7',
              opacity:"0.5"
            }
        },
        tooltip:{
            trigger:'axis', //4000,3500,1500
            confine:true,
            backgroundColor:'rgba(255,255,255,0.8)',
            borderWidth:'1px',
            borderColor:'#9DCCF8',
            formatter:function(params){
              var tip = '';
              if(params != null && params.length > 0){
                tip += '<div style="width:auto;color:#333333;font-size:10px;">2020.' + params[0].name +'</div>'
                let all = 0;
                for(let i=0; i<params.length; i++){
                  all = (all*100 + params[i].data*100)/100
                }
                tip += '<div style="font-size:10px;color:#666666;"><span style="width:100px;color:#666666;display:inline-block">贷款分布</span></div>'
                for(let i=0; i<params.length; i++){
                  let process = '0'
                  if(params[i].dataIndex != 0){
                    let temp1 = arr[i][params[i].dataIndex] - arr[i][params[i].dataIndex-1]
                    if(arr[i][params[i].dataIndex] != 0){
                      let temp2 =  (temp1 / arr[i][params[i].dataIndex]*100).toFixed(2)
                      process = temp2 > 0 ? '上升了' + temp2 + '%' : '下降了' + Math.abs(temp2) +'%'
                    }else{
                      process = temp1 > 0 ? '上升了' + Math.abs(temp1): '下降了' + Math.abs(temp1)
                    }
                  }
                  tip +='<div style="font-size:10px;color:#666666;"><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+
                  params[i].marker + params[i].seriesName +
                  '</span><span style="color:#333333;display:inline-block;min-width:60px;width:auto;font-weight:bold;">' + params[i].data +
                  '</span><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+process +'</span></div>'
                }
              }
              return tip
            }
        },
        grid:{
          left:"15%",
          right:"10%"
        },
        series: [{
            data: arr[0],
            type: 'bar',
            name: '公司贷款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#FFF469',
            },
            barWidth: 10,
        },
        {
            data: arr[1],
            type: 'bar',
            name: '零售贷款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#FFC516',
            },
            barWidth: 10,
        },
        {
            data: arr[2],
            type: 'bar',
            name: '贴现票据',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#FF9900',
            },
            barWidth: 10,
        }
        ]
      })
    },
  },
  mounted(){
    this.loanProvide();
    this.loanBack();
    this.loanOverDue();
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
.scroll-container{
  padding:0 15px;
}
#loanProvide,#loanBack,#loanOverDue{
  width: 100%;
  height: 200px;
}
.mid-line{
  height:2px;
  background: #B7D5FF;
  margin:0 15px
}
</style>
