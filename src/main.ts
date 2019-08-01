/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-07-31 20:07:46
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
