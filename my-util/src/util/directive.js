/**
 自定义指令
 */
import Vue from 'vue'

/**
 * input-禁止输入空格
 */
Vue.directive('filterSpace', {
  inserted:function(el){
    el = el.querySelectorAll("input")[0] ? el.querySelectorAll("input")[0] : el;
    el.addEventListener('keypress', function(e){
      e = e || window.event;
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      if(/\s+/.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    })
  }
});

/**
 * input-只能输入正整数
 * tip: 使用该指令时，type不能指定为number或者tel
 */
Vue.directive('positiveInteger', {
  inserted: function (el) {
    el = el.querySelectorAll("input")[0] ? el.querySelectorAll("input")[0] : el;
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    });
  }
});

/**
 * input-身份证输入框控制
 */
Vue.directive('identifyInput', {
  inserted: function (el) {
    el = el.querySelectorAll("input")[0] ? el.querySelectorAll("input")[0] : el;
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      if(el.value.length > 17) {
        e.preventDefault();
        return
      }
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(charcode == 88){
        if(el.value.includes('X')){
          e.preventDefault();
        }
      }else if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    });
  }
});

/**
 * input-输入手机号码
 */
Vue.directive('phoneNumber', {
  inserted: function (el) {
    el = el.querySelectorAll("input")[0] ? el.querySelectorAll("input")[0] : el;
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      if(el.value.length > 10) {
        e.preventDefault();
        return
      }
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    });
  }
});


/**
 * input-输入纯数字
 * 正整数(phone),验证码(checkCode),金钱(money)
 */
Vue.directive('allNumber', {
  bind(el, binding, vnode) {
    let input = vnode.elm;
    input.addEventListener('compositionstart', () => {
      vnode.inputLocking = true
    })
    input.addEventListener('compositionend', () => {
      vnode.inputLocking = false
      input.dispatchEvent(new Event('input'))
    })
    input.addEventListener('input', () => {
      if(vnode.inputLocking) {
        return;
      }
      let type = binding.value; //传进来的type值
      let length = binding.arg ? Number(binding.arg) : 2;
      let oldValue = input.value;
      let newValue = '';
      if(type=='phone'){
        newValue = input.value.replace(/[^\d]/g, '');
        if(newValue && binding.value !== 'zeroBefore') {
          newValue = newValue.replace(/^\b(0+)/gi, '') // 不指定可以以0开头的时候 去掉开头多余的0
        }
      }else if(type=='checkCode'){
        newValue = input.value.replace(/[^\d]/g, '');
      }else if(type == 'money'){
        newValue = input.value.replace(/[^[.]\d]/g, '');
        if(newValue) {
          newValue = newValue.replace(/^[.]/g, '') // 不指定可以以0开头的时候 去掉开头多余的0
          newValue = newValue.replace(/[.]+/g,'.'); //去除多余的小数点
          if(newValue.indexOf('.') != -1){
            newValue = newValue.substring(0,newValue.indexOf('.')+length+1)
          }
        }
      }
      // 判断是否需要更新，避免进入死循环
      if(newValue !== oldValue) {
        input.value = newValue
        // 通知v-model更新 vue底层双向绑定实现的原理是基于监听input事件
        input.dispatchEvent(new Event('input')) 
      }
    })
  }
});

