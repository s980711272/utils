<!--  -->
<template>
  <div id="loanAnalyse">
      <div id="depositInflowBar"></div>
      <div class="mid-line"></div>
      <div id="depositoutflowBar"></div>
  </div>
</template>

<script>
const echarts = require('echarts');
export default {
  data () {
    return {
      active:'a'
    };
  },

  components: {},

  computed: {},
  methods: {
    onClickLeft(){

    },
    changeTab(type){
      this.active = type;
      if(this.active === 'a'){
        this.initDepositInflowBar()
      }else{
        this.initDepositoutflowBar()
      }
    },
    initDepositInflowBar(){
      let arr = [
        [132.92, 99.87, 130.76, 192.24, 64.94, 60.72, 123.67, 151.69, 87.40, 115.22, 50.62, 111.83].reverse(),
        [181.76, 135.57, 178.80, 262.87,88.80, 83.03, 169.10, 207.43, 119.52, 157.56, 69.22, 152.92].reverse(),
        [76,44, 57.43, 75.20, 110.55, 37.35, 34.92, 71.12, 87.24, 50.26, 66.26, 29.11, 64.31].reverse(),
        [33.55, 25.21, 33.00, 48.52, 16.39, 15.33, 31.21, 38.29, 22.06, 29.08, 12.78, 28.23].reverse()
      ]
      var textStyle = {
        color:'#B9B7B7',
      }
      var myChart = echarts.init(document.getElementById('depositInflowBar'));
      myChart.setOption({
        title:{
          text:'存款流入分布',
          textStyle:{
            // color:'#91CAFF',
            fontSize:10
          }
        },
        legend: {
            data: ['住户存款', '企业存款','政府存款',"非银和其它存款"],
            right: 10,
            width:'200px',
            itemWidth:10, //图形宽度
            itemHeight:10, //图形高度
            itemGap:2,
            textStyle:{
              fontSize:10
            }
        },
        xAxis: {
            data: ['30','29','28','27','26','25','24','23','22','21','20','19'].reverse(),
            name: '(日)',
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            name: ['单位(万元)'],
            data:[
              {
                value:'40000',
                textStyle:textStyle
              },{
                value:'80000',
                textStyle:textStyle
              },{
                value:'120000',
                textStyle:textStyle
              },{
                value:'160000',
                textStyle:textStyle
              },
              {
                value:'200000',
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
              tip += '<div style="font-size:10px;color:#666666;"><span style="width:100px;color:#666666;display:inline-block">存款分布</span></div>'
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
        series: [
          {
            data: arr[0],
            type: 'bar',
            name: '住户存款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#3B8686',
            },
            barWidth: 10,
          },
          {
              data: arr[1],
              type: 'bar',
              name: '企业存款',
              stack: 'one',
              showBackground: false,
              itemStyle:{
                color:'#009C7C',
              },
              barWidth: 10,
          },
          {
              data: arr[2],
              type: 'bar',
              name: '政府存款',
              stack: 'one',
              showBackground: false,
              itemStyle:{
                color:'#79BD9A',
              },
              barWidth: 10,
          },
          {
              data: arr[3],
              type: 'bar',
              name: '非银和其它存款',
              stack: 'one',
              showBackground: false,
              itemStyle:{
                color:'#A8DBA8',
              },
              barWidth: 10,
          }
        ]
      })
    },
    initDepositoutflowBar(){
      let arr = [
        [101.16,111.34,59.81,138.36,136.76,93.85,94.11,91.62,90.34,127.39,86.16,85.10].reverse(),
        [109.56,120.59,64.78,149.86,148.13,101.65,101.94,99.24,97.85,137.98,93.33,92.18].reverse(),
        [30.58,33.63,18.08,41.82,41.34,28.37,28.45,27.69,27.31,38.51,26.04,25.72].reverse(),
        [13.50,14.86,7.99,18.47,18.26,12.53,12.56,12.23,12.06,17.01,11.50,11.36].reverse()
      ]
      var textStyle = {
        color:'#B9B7B7',
      }
      var myChart = echarts.init(document.getElementById('depositoutflowBar'));
      myChart.setOption({
        title:{
          text:'存款流出分布',
          textStyle:{
            // color:'#91CAFF',
            fontSize:10
          }
        },
        legend: {
            data: ['住户存款', '企业存款','政府存款',"非银和其它存款"],
            right: 10,
            width:'200px',
            itemWidth:10, //图形宽度
            itemHeight:10, //图形高度
            itemGap:2,
            textStyle:{
              fontSize:10
            }
        },
        xAxis: {
            data:['30','29','28','27','26','25','24','23','22','21','20','19'].reverse() ,
            name: '(日)',
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            name: ['单位(万元)'],
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
              tip += '<div style="font-size:10px;color:#666666;"><span style="width:100px;color:#666666;display:inline-block">存款分布</span></div>'
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
            name: '住户存款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#4A56CF',
            },
            barWidth: 10,
        },
        {
            data: arr[1],
            type: 'bar',
            name: '企业存款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#4E7FD9',
            },
            barWidth: 10,
        },
        {
            data: arr[2],
            type: 'bar',
            name: '政府存款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#4EC8D9',
            },
            barWidth: 10,
        },
        {
            data: arr[3],
            type: 'bar',
            name: '非银和其它存款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#4EC8D9',
            },
            barWidth: 10,
        }
        ]
      })
    }
  },
  mounted(){
    this.initDepositInflowBar();
    this.initDepositoutflowBar();
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
  color:#5BB0FF;
  font-weight: bold;
}

#depositInflowBar,#depositoutflowBar{
  width: 100%;
  height: 300px;
}
#depositoutflowBar{
  margin-top:10px
}
.mid-line{
  height:2px;
  background: #B7D5FF;
  margin:0 15px
}
</style>
