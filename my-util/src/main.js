// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./util/directive"
import "./util/filter"
import 'ant-design-vue/dist/antd.css';
import {Button} from 'ant-design-vue';
import Vant from 'vant';
import 'vant/lib/index.css';
<<<<<<< HEAD
import ElementUI from 'element-ui';
=======
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
>>>>>>> f2e23fec786cc2087847b17a5c8f476f2cd235f7

Vue.use(ElementUI)
Vue.use(Vant)
<<<<<<< HEAD
=======
Vue.use(ElementUI);

>>>>>>> f2e23fec786cc2087847b17a5c8f476f2cd235f7
Vue.use(Button);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
