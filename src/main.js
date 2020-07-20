// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from '../src/store/index';
import 'lib-flexible/flexible';
// import 'postcss-px2rem-exclude/lib/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios';
import Vuex from 'vuex';

Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

require('es6-promise').polyfill();

Vue.use(Vuex);
Vue.use(Vant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    transitionName: "slide-left"
  },
  router,
  store,
  components: {App},
  watch: {//使用watch 监听$router的变化
    "$route": function (to, from) {
      // if (to.meta.title) {//判断是否有标题
      //   document.title = to.meta.title
      // }
      //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // if (to.meta.index > 0) {
      //   if (to.meta.index < from.meta.index) {
      //     this.transitionName = 'slide-right';
      //   } else {
      //     this.transitionName = 'slide-left';
      //   }
      // } else if (to.meta.index == 0 && from.meta.index > 0) {
      //   this.transitionName = 'slide-right';
      // } else if (!to.meta.index) {
      //   //返回到上个页面
      //   global.history.back();
      // }
    }
  },
  created: function () {
    // this.$router.push({name: 'Login'});
  },
  template: '<App/>'
})
