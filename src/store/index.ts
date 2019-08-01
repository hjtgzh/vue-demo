/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-30 15:37:48
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 20:34:36
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { RootState } from './types';
import { home } from './home';
import { map } from './map';

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store<RootState>({
  modules: {
    home,
    map,
  },
});
