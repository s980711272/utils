<!--  -->
<template>
  <div id="analyse">
        <van-nav-bar
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
        <div id="depositBar"></div>
        <div class="mid-line"></div>
        <div id="loanBar"></div>
  </div>
</template>

<script>
const echarts = require('echarts');
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    initDepositBar(){
      var arr = [
        [34323.3,34254.7,34220.4,32167.2,29593.8,30777.6,29854.2,29555.7,29260.1,28674.9,28101.4,34670],
        [52083.9,51979.7,50940.1,49921.3,49422.1,48927.9,45992.2,45072.4,42818.8,42390.6,42178.6,52610],
        [22157.8,21936.2,21936.2,21278.1,21065.4,21065.4,20012.1,19611.8,18435.1,18324.5,18159.6,22610],
        [17159.8,17159.8,17159.8,18875.8,18120.7,17758.3,19534.2,19534.2,19924.9,19127.9,18745.3,17510]
      ]
      var textStyle = {
        color:'#B9B7B7',
      }
      var myChart = echarts.init(document.getElementById('depositBar'));
      myChart.setOption({
        title:{
          text:'存款余额分布',
          textStyle:{
            color:'#91CAFF',
            fontSize:10
          }
        },
        legend: {
            data: ['住户存款', '企业存款','政府存款',"非银和其它存款"],
            right: 10,
            top:20,
            itemWidth:10, //图形宽度
            itemHeight:10, //图形高度
            itemGap:0,
            textStyle:{
              fontSize:10
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
                let year = '2020.'
                if(params[0].name >= 8){
                  year  = '2019.'
                }
                tip += '<div style="position:relative;color:#666666">' +  year + params[0].name +'<span style="position:absolute;right:0px;top:0px;">万元</span></div>'
                let all = 0;
                for(let i=0; i<params.length; i++){
                  all = (all*100 + params[i].data*100)/100
                }
                tip += '<div style="font-size:10px;color:#666666;"><span>各项存款</span><span style="color:#333333;font-weight:bold;margin-left:5px;">'+all + '</span></div>'
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
                  '</span><span style="color:#333333;display:inline-block;min-width:60px;width:auto;font-weight:bold;">' +
                  params[i].data +
                  '</span><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+process+'<span></div>'
                }
              }
              return tip
            }
          },
        xAxis: {
            data: [
              {
                value:'8',
                textStyle:textStyle
              },
              {
                value:'9',
                textStyle:textStyle
              },
              {
                value:'10',
                textStyle:textStyle
              },
              {
                value:'11',
                textStyle:textStyle
              },
              {
                value:'12',
                textStyle:textStyle
              },
              {
                value:'1',
                textStyle:textStyle
              },
              {
                value:'2',
                textStyle:textStyle
              },
              {
                value:'3',
                textStyle:textStyle
              },
              {
                value:'4',
                textStyle:textStyle
              },
              {
                value:'5',
                textStyle:textStyle
              },
              {
                value:'6',
                textStyle:textStyle
              },
              {
                value:'7',
                textStyle:textStyle
              }
            ],
            name: '(月)',
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            name: ['单位(万元)'],
            // max:200000,
            // min:0,
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
        grid:{
          left:"15%",
          right:"10%"
        },
        series: [{
            data: [28101.43,28674.92,29260.13,29555.68,29854.23,30777.55,29593.80,32167.17,34220.40,34254.65,34323.30,34670.00],
          type: 'bar',
            name: '住户存款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#BC2D30',
            },
            barWidth: 10,
        },
        {
            data: [42178.62 ,42390.57 ,42818.76 ,45072.38 ,45992.23 ,48927.90 ,49422.12 ,49921.33 ,50940.14 ,51979.73 ,52083.90 ,52610.00],
            type: 'bar',
            name: '企业存款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#E7A13D',
            },
            barWidth: 10,
        },
        {
            data: [18159.60 ,18324.52 ,18435.13 ,19611.84 ,20012.09 ,21065.35 ,21065.35 ,21278.14 ,21936.22 ,21936.22 ,22157.80 ,22610.00],
            type: 'bar',
            name: '政府存款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#5D9649',
            },
            barWidth: 10,
        },
        {
            data: [18745.30 ,19127.86 ,19924.85 ,19534.17 ,19534.17 ,17758.33 ,18120.75 ,18875.78 ,17159.80 ,17159.80 ,17159.80 ,17510.00],
            type: 'bar',
            name: '非银和其它存款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#2E578C',
            },
            barWidth: 10,
        }
        ]
      })
    },
    initLoanBar(){
      let arr = [
        [37699.2,36945.2,35836.9,36195.2,35833.3,34758.3,34410.7,37163.6,36240.3,36056.1,34613.8,38080],
        [27043.6,26773.2,28111.8,27549.6,26723.1,26188.6,25403,25911,25651.9,24882.4,24633.5,27880],
        [1999.2,1999.2,1959.22,1920.03,1881.63,1862.81,1825.56,1789.05,1842.72,1990.14,1950.33,2040]
      ]
      var textStyle = {
        color:'#B9B7B7',
      }
      var myChart = echarts.init(document.getElementById('loanBar'));
      myChart.setOption({
        title:{
          text:'贷款余额分布',
          textStyle:{
            color:'#91CAFF',
            fontSize:10
          }
        },
        legend: {
            data: ['公司贷款', '零售贷款','贴现票据'],
            right: 10,
            itemWidth:10, //图形宽度
            itemHeight:10, //图形高度
            itemGap:0,
            textStyle:{
              fontSize:10
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
                let year = '2020.'
                if(params[0].name >= 8){
                  year  = '2019.'
                }
                tip += '<div style="position:relative;color:#666666">' + year + params[0].name +'<span style="position:absolute;right:0px;top:0px;">万元</span></div>'
                let all = 0;
                for(let i=0; i<params.length; i++){
                  all = (all*100 + params[i].data*100)/100
                }
                tip += '<div style="font-size:10px;color:#666666;">贷款规模<span style="color:#333333;font-weight:bold;margin-left:5px;">'+
                all + '</span></div>'
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
                  '</span><span style="color:#333333;display:inline-block;min-width:60px;width:auto;font-weight:bold;">'
                  + params[i].data +'</span><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+process+'<span></div>'
                }
              }
              return tip
            }
          },
        xAxis: {
            data: [
              {
                value:'8',
                textStyle:textStyle
              },
              {
                value:'9',
                textStyle:textStyle
              },
              {
                value:'10',
                textStyle:textStyle
              },
              {
                value:'11',
                textStyle:textStyle
              },
              {
                value:'12',
                textStyle:textStyle
              },
              {
                value:'1',
                textStyle:textStyle
              },
              {
                value:'2',
                textStyle:textStyle
              },
              {
                value:'3',
                textStyle:textStyle
              },
              {
                value:'4',
                textStyle:textStyle
              },
              {
                value:'5',
                textStyle:textStyle
              },
              {
                value:'6',
                textStyle:textStyle
              },
              {
                value:'7',
                textStyle:textStyle
              }
            ],
            name: '(月)',
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            name: ['单位(万元)'],
            max:100000,
            min:0,
            nameTextStyle:{
              color:'#B9B7B7',
              opacity:"0.5"
            }
        },
        grid:{
          left:"15%",
          right:"10%"
        },
        series: [{
            data: [34613.83 ,36056.08 ,36420.28 ,37163.55 ,34410.69 ,34758.28 ,35833.28 ,36195.23 ,35836.86 ,36945.22 ,37699.20 ,38080.00],
            type: 'bar',
            name: '公司贷款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#4CAAE8',
            },
            barWidth: 10,
        },
        {
            data: [24633.54 ,24882.37 ,25651.93 ,25911.04 ,25402.98 ,26188.64 ,26723.10 ,27549.59 ,28111.82 ,26773.16 ,27043.60 ,27880.00 ],
            type: 'bar',
            name: '零售贷款',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#6D62B0',
            },
            barWidth: 10,
        },
        {
            data: [1950.33 ,1990.14 ,1842.72 ,1789.05 ,1825.56 ,1862.81 ,1881.63 ,1920.03 ,1959.22 ,1999.20 ,1999.20 ,2040.00 ],
            type: 'bar',
            name: '贴现票据',
            stack: 'one',
            showBackground: false,
            itemStyle:{
              color:'#769ECD',
            },
            barWidth: 10,
        }
        ]
      })
    }
  },
  mounted(){
    this.initDepositBar();
    this.initLoanBar();
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

#depositBar,#loanBar{
  width: 100%;
  height: 300px;
}
#loanBar{
  margin-top:10px
}
.mid-line{
  height:2px;
  background: #B7D5FF;
  margin:0 15px
}
</style>
