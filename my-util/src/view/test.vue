<template>
  <div id="index">
    <div class="head-bg" @click="goNextPage('1')">主要经营指标<i class="van-icon van-icon-arrow van-cell__right-icon c-color" style="margin-right:30px"></i></div>
    <div class="content">
        <div id="depositMap"></div>
        <div class="mid-line"></div>
        <div id="loanMap"></div>
    </div>
    <div class="head-bg" style="margin-top:10px" @click="goNextPage('2')">存/贷款交易趋势<i class="van-icon van-icon-arrow van-cell__right-icon c-color" style="margin-right:30px"></i></div>
    <div class="content-bar">
      <div class="header-menu">
        <div class="header-menu-item" :style="{borderBottom:active == 'a' ? '#1890FF solid 1px' : '0px',color:active === 'a' ? '#1890FF' : '#333333'}" @click="changeTab('a')">存款交易趋势</div>
        <div class="header-menu-item" :style="{borderBottom:active == 'b' ? '#1890FF solid 1px' : '0px',color:active === 'b' ? '#1890FF' : '#333333'}" @click="changeTab('b')">贷款交易趋势</div>
      </div>
      <div id="depositBar" v-show="active === 'a'"></div>
      <div id="loanBar" v-show="active === 'b'"></div>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts');
export default {
  name: 'HelloWorld',
  data() {
    return {
      active:'a'
    }
  },
  beforeCreate(){

  },
  created() {
  },
  methods: {
    goNextPage(type){
      if(type === '1'){
        this.$router.push('analyse')
      }else{
        this.$router.push('loanAnalyse')
      }
    },
    changeTab(type){
      this.active = type;
      if(this.active === 'a'){
        this.initDepositBar()
      }else{
        this.initLoanBar()
      }
    },
    initDeopsitMap(){
      var myChart = echarts.init(document.getElementById('depositMap'));
      // 绘制图表
      myChart.setOption({
        title:{
          text:'存款分布',
          left:'center',
          top:'52%',
          textStyle:{
            fontSize:'10',
          }
        },
        graphic:[
          {
            type:'text',
            left:'5px',
            top:'15px',
            style:{
              fill:'#91CAFF',
              text:'存款余额',
              font: 'normal 10px Microsoft YaHei'
            }
          },
          {
            left:'10px',
            top:'45px',
            type:'group',
            children:[
              //存款余额
              {
                left:'5px',
                top: '45px',
                type:'group',
                children:[
                  {
                    type:'text',
                    left:'10px',
                    top: '45px',
                    style:{
                      fill:'#0429C4',
                      text:'127400',
                      font: 'bold 22px Microsoft YaHei'
                    }
                  },
                  {
                    type:'text',
                    left:'95px',
                    top:'55px',
                    style:{
                      fill:'#0429C4',
                      text:'万元',
                      font: 'normal 12px Microsoft YaHei'
                    }
                  }
                ]
              },
              //同比
              {
                left:'20px',
                top:'80px',
                type:'group',
                children:[
                  {
                    type:'text',
                    left:'60px',
                    top:'2px',
                    style:{
                      fill:'#8DCFD1',
                      text:'同比',
                      font: 'normal 12px Microsoft YaHei'
                    }
                  },
                  {
                    type:'text',
                    left:'90px',
                    style:{
                      fill:'#0429C4',
                      text:'15.87%',
                      font: 'bold 16px Microsoft YaHei'
                    }
                  }
                ]
              },
              //环比
              {
                left:'20px',
                top:'105px',
                type:'group',
                children:[
                  {
                    type:'text',
                    left:'60px',
                    top:'2px',
                    style:{
                      fill:'#D0BD6F',
                      text:'环比',
                      font: 'normal 12px Microsoft YaHei'
                    }
                  },
                  {
                    type:'text',
                    left:'100px',
                    style:{
                      fill:'#0429C4',
                      text:'1.32%',
                      font: 'bold 16px Microsoft YaHei'
                    }
                  }
                ]
              }
            ]
          }
        ],
        legend: {
            orient: 'vertical',
            top: '40px',
            right: '-6px',
            itemWidth:10, //图形宽度
            itemHeight:15, //图形高度
            itemGap:2,
            textStyle:{
              fontSize:8
            },
            data:[
                {value:23, name:'住户存款(27.21%)' },
                {value:55, name:'企业存款(41.34%)' },
                {value:19, name:'政府存款(17.75%)' },
                {value:135, name:'非银和其它(13.7%)'},
            ],
            formatter: function (name) {
              console.log(name.length)
                if(name.length > 12){
                  name = name.slice(0, 12) + '\n' + name.slice(10);
                }
              console.log(name)
              return name
            },
            textStyle: {
                color: 'black',
                fontSize: '10'                    // 图例文字颜色
            },
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['35%', '60%'],
                avoidLabelOverlap: true,
                hoverAnimation:false,
                legendHoverLink:false,
                center : ['50%', '60%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '9',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {
                      value:23,
                      name:'住户存款(27.21%)',
                      itemStyle:{
                        color:'#2D568A'
                      }
                    },
                    {
                      value:55,
                      name:'企业存款(41.34%)',
                      itemStyle:{
                        color:'#5C9448'
                      }
                    },
                    {
                      value:19,
                      name:'政府存款(17.75%)',
                      itemStyle:{
                        color:'#EF9F3C'
                      }
                    },
                    {
                      value:3,
                      name:'非银和其它(13.7%)',
                      itemStyle:{
                        color:'#BA2C2F'
                      }
                    },
                ]
            }
        ]
      });
    },
    initLoanMap(){
      var myChart = echarts.init(document.getElementById('loanMap'));
      // 绘制图表
      myChart.setOption({
        title:{
          text:'贷款分布',
          left:'center',
          top:'52%',
          textStyle:{
            fontSize:'10',
          }
        },
        graphic:[
          {
            type:'text',
            left:'5px',
            top:'15px',
            style:{
              fill:'#91CAFF',
              text:'贷款余额',
              font: 'normal 10px Microsoft YaHei'
            }
          },
          {
            left:'10px',
            top:'45px',
            type:'group',
            children:[
              //贷款余额
              {
                left:'0px',
                top: '45px',
                type:'group',
                children:[
                  {
                    type:'text',
                    left:'20px',
                    top: '45px',
                    style:{
                      fill:'#0429C4',
                      text:'68000',
                      font: 'bold 22px Microsoft YaHei'
                    }
                  },
                  {
                    type:'text',
                    left:'95px',
                    top:'55px',
                    style:{
                      fill:'#0429C4',
                      text:'万元',
                      font: 'normal 12px Microsoft YaHei'
                    }
                  }
                ]
              },
              //同比
              {
                left:'15px',
                top:'80px',
                type:'group',
                children:[
                  {
                    type:'text',
                    left:'60px',
                    top:'2px',
                    style:{
                      fill:'#8DCFD1',
                      text:'同比',
                      font: 'normal 12px Microsoft YaHei'
                    }
                  },
                  {
                    type:'text',
                    left:'90px',
                    style:{
                      fill:'#0429C4',
                      text:'10.01%',
                      font: 'bold 16px Microsoft YaHei'
                    }
                  }
                ]
              },
              //环比
              {
                left:'15px',
                top:'105px',
                type:'group',
                children:[
                  {
                    type:'text',
                    left:'60px',
                    top:'2px',
                    style:{
                      fill:'#D0BD6F',
                      text:'环比',
                      font: 'normal 12px Microsoft YaHei'
                    }
                  },
                  {
                    type:'text',
                    left:'100px',
                    style:{
                      fill:'#0429C4',
                      text:'1.85%',
                      font: 'bold 16px Microsoft YaHei'
                    }
                  }
                ]
              }
            ]
          }
        ],
        legend: {
            orient: 'vertical',
            top: '40px',
            right: '12px',
            itemWidth:10, //图形宽度
            itemHeight:15, //图形高度
            itemGap:2,
            textStyle:{
              fontSize:8
            },
            data:[
                {value:75, name:'公司贷款(75%)' },
                {value:21, name:'零售贷款(21%)' },
                {value:4, name:'贴现票据(4%)' },
            ],
            textStyle: {
                color: 'black',
                fontSize: '10'                    // 图例文字颜色
            },
        },
        series: [
            {
                name:'贷款分布',
                type:'pie',
                radius: ['35%', '60%'],
                avoidLabelOverlap: false,
                hoverAnimation:false,
                legendHoverLink:false,
                center : ['50%', '60%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: { //点击文本快的显示
                        show: false,
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {
                      value:75,
                      name:'公司贷款(75%)',
                      itemStyle:{
                        color:'#4BA9E7'
                      }
                    },
                    {
                      value:21,
                      name:'零售贷款(21%)',
                      itemStyle:{
                        color:'#6C61AF'
                      }
                    },
                    {
                      value:19,
                      name:'贴现票据(4%)',
                      itemStyle:{
                        color:'#B19DCC'
                      }
                    }
                ]
            }
        ]
      });
    },
    initDepositBar(){
      let arr = [
        [424.67,319.28,417.77,614.19,207.47,194.01,395.10,484.64,279.25,368.13,161.73,357.28],
        [-254.80,-280.45,-150.66,-348.51,-344.48,-236.40,-237.06,-230.79,-227.55,-320.88,-217.88,-217.04,-214.37],
        [169.87,38.63,267.11,265.68,-137.01,-42.40,158.04,253.86,51.70,47.25,-55.31,142.91]
      ]
      this.$nextTick(()=>{
        var myChart = echarts.init(document.getElementById('depositBar'));
        myChart.setOption({
          legend: {
              data: ['存款流入', '存款流出','存款净额'],
              right: 10,
              itemWidth:10, //图形宽度
              itemHeight:10, //图形高度
              itemGap:2,
              textStyle:{
                fontSize:8
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
                tip += '<div style="width:100px;display:inline-block;color:#333333;">2020.7' + params[0].name +'</div><div style="width:100px;display:inline-block;color:#999999">万元</div><div style="width:100px;display:inline-block;"></div><br/>'
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
                  tip +="<div style='width:100px;display:inline-block;color:#333333;'>" + params[i].marker + params[i].seriesName + "</div><div style='width:100px;display:inline-block;color:#333333;'>" +
                   params[i].value +'</div><div style="width:100px;display:inline-block;color:#333333;">'+process+'</div></div><br/></div>'
                }
              }
              return tip
            }
          },
          xAxis: {
              data: ['30','29','28','27','26','25','24','23','22','21','20','19'],
              name: '(日)',
              axisLine: {onZero: true},
              splitLine: {show: false},
              splitArea: {show: false}
          },
          yAxis: {
              name: ['单位(万元)'],
              nameTextStyle:{
                color:'#DDA8F4'
              }
          },
          grid:{
            left:'15%'
          },
          series: [{
              data: arr[0],
              type: 'bar',
              name: '存款流入',
              stack: 'one',
              showBackground: false,
              itemStyle:{
                color:'#4DB429',
              },
              barWidth: 10,
          },{
              name: '存款流出',
              type: 'bar',
              stack: 'one',
              showBackground: false,
              itemStyle:{
                color:'#4A56CF',
              },
              barWidth: 10,
              label: {
                  normal: {
                      show: false,
                      formatter: function (value) {
                          if(value.data<0){
                              return -value.data;
                          }
                      },
                  }
              },
              data: arr[1]
          },
          {
            type:'line',
            symbolSize:6,
            itemStyle: { //圆圈样式
                borderWidth: 1,
                color:'#E7A13D'
            },
            name:'存款净额',
            data: arr[2]
          }]
        })
      })
    },
    initLoanBar(){
      let arr = [
        [450,0,80,120,360,0,50,1100,487,300,0,98],
        [1200,48,120,70,90,80,450,300,0,320,84,0],
        [42,0,10,0,0,5,10,0,0,50,0,0]
      ]
      this.$nextTick(()=>{
        var myChart = echarts.init(document.getElementById('loanBar'));
        myChart.setOption({
          legend: {
              data: [{
                name:'贷款发放',
                textStye:{
                  width:'10px'
                }
              }, {
                name:'贷款归还'
              },{
                name:'贷款逾期'
              }],
              right: 10,
              itemWidth:10, //图形宽度
              itemHeight:10, //图形高度
              itemGap:2,
              textStyle:{
                fontSize:8
              }
          },
          grid:{
            left:'15%'
          },
          xAxis: {
              data: ['30','29','28','27','26','25','24','23','22','21','20','19'],
              name: '(月)',
              axisLine: {onZero: true},
              splitLine: {show: false},
              splitArea: {show: false}
          },
          yAxis: {
              name: ['单位(万元)'],
              nameTextStyle:{
                color:'#DDA8F4'
              },
              type:'value',
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
                  all = (all*100 + params[i].value*100)/100
                }
                tip += '<div style="font-size:10px;color:#666666;"><span style="width:100px;color:#666666;display:inline-block">贷款规模<span style="color:#333333;font-weight:bold;margin-left:5px;">'+
                all + '</span></span><span style="width:100px;color:#333333;display:inline-block">万元</span></div>'
                for(let i=0; i<params.length; i++){
                  let process = '0'
                  if(params[i].dataIndex != 0){
                    let temp1 = arr[i][params[i].dataIndex] - arr[i][params[i].dataIndex-1]
                    if(arr[i][params[i].dataIndex] != 0){
                      console.log((temp1 / arr[i][params[i].dataIndex]*100))
                      let temp2 = (temp1 / arr[i][params[i].dataIndex]*100).toFixed(2)
                      process = temp2 > 0 ? '上升了' + temp2 + '%' : '下降了' + Math.abs(temp2) +'%'
                    }else{
                      process = temp1 > 0 ? '上升了' + Math.abs(temp1) : '下降了' + Math.abs(temp1)
                    }
                  }
                  tip +='<div style="font-size:10px;color:#666666;"><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+
                  params[i].marker + params[i].seriesName +
                  '</span><span style="color:#333333;display:inline-block;min-width:60px;width:auto;font-weight:bold;">' + params[i].value +
                  '</span><span style="color:#333333;display:inline-block;width:100px;font-weight:bold;">'+process+'</span></div>'
                }
              }
              return tip
            }
          },
          series: [
            {
              type:'line',
              name:'贷款发放',
              symbol:'circle',
              symbolSize:6,
              itemStyle: { //圆圈样式
                  borderWidth: 19,
                  color:'#49CCD2'
              },
              data: arr[0]
            },
            {
              type:'line',
              symbol:'circle',
              symbolSize:6,
              itemStyle: { //圆圈样式
                  borderWidth: 19,
                  color:'#54E847'
              },
              name:'贷款归还',
              data: arr[1]
            },
            {
              type:'line',
              symbol:'circle',
              symbolSize:6,
              itemStyle: { //圆圈样式
                  borderWidth: 4,
                  color:'#FF8500'
              },
              name:'贷款逾期',
              data: arr[2]
            },
          ]
        })
      })
    }
  },
  mounted(){
    this.initDeopsitMap();
    this.initLoanMap();
    this.initDepositBar()
    // this.initLoanBar();
  }
}
</script>
<style scoped>
.content{
  width:100%;
  padding:0 15px;
  background: #ffffff;
}
.head-bg{
  background: #D9E9FF;
  padding-left:20px;
  color:#6b7AD2;
  font-weight: bold;
  height:30xspx;
  line-height: 30px;
}
.c-color {
    color: #6b7AD2;
    float: right;
    margin-right:15px;
}
#depositMap,#loanMap{
  width: 100%;
  height: 150px;
}
#depositBar,#loanBar{
  width: 100%;
  height: 250px;
}
.mid-line{
  height:2px;
  background: #B7D5FF;
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
  height: 32px;
}
</style>

