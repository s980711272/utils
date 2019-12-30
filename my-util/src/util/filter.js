/**
 * Created by sdh on 2019/09/25.
 */
import Vue from 'vue'

Date.prototype.format = function(fmt) {
  let o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(let k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
};
/**
 * 保留前4后4银行卡号
 */
Vue.filter("bankCardPeel",function (value) {
  if(!value || value.length === 0) return '-';
  let str1 = value.substr(0, 4);
  let str2 = value.substr(-4, 4);
  let idNo = str1 + "************" + str2;
  return idNo;
});

/**
 * 身份证  前3后3位
 */
Vue.filter("idNo",function (value) {
  if (value == '' || value == null) {
    return ''
  }
  let idNo=String(value);
  let str1 = idNo.substr(0, 3);
  let str2 = idNo.substr(-3, 3);
  if(idNo.length>15){
    idNo= str1 + "************" + str2;
  }
  else{
    idNo = str1 + "*********" + str2;
  }
  return idNo;
});

/**
 * 时间戳转化日月的形式
 * val:传入的数据
 * format传入的格式
 */
Vue.filter("DateFormat",(val,format)=>{
  return new Date(val).format(format);
})

/**
 * 手机号加* 脱敏
 */
Vue.filter("phonePeel",function (value) {
  if(!value){
    return;
  }
  let str1 = value.substr(0, 3);
  let str2 = value.substr(-4, 4);
  let phone = str1 + "****" + str2;
  return phone;
});

/**
 * 将人民币小写金额转换为大写
 */
Vue.filter("moneySmallToBig", n => {

  if(n === '') return '';
  let fraction = ['角', '分'];
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  let unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
  let head = n < 0? '欠': '';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++)
    {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');

})
