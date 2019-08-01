/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-30 21:29:40
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 19:37:56
 */
import { ActionTree } from 'vuex';
import { HomeState } from './types';
import { RootState } from '../types';
import { backendServerUrl } from '@/constant';
import api from '@/utils/api';

// 提供跟后台接口打交道的方法，并调用mutations提供的方法
export const actions: ActionTree<HomeState, RootState> = {
  // 路线分布
  async fetchGetRouteDistribute({ commit }) {
    const result = await api.get(`${backendServerUrl}/home/route/distribute`);
    if (result.success) {
      commit('routeDistribute', result.data);
    } else {
      commit('error', result.message);
    }
  },
  // 各市开行情况
  async fetchGetRunInfo({ commit }) {
    const result = await api.get(`${backendServerUrl}/home/source/distribute`);
    if (result.success) {
      commit('runInfo', result.data);
    } else {
      commit('error', result.message);
    }
  },
  // 货物品类TOP5
  async fetchGetGoodsDistribution({ commit }) {
    const result = await api.get(`${backendServerUrl}/home/industry/distribute`);
    if (result.success) {
      commit('goodsDistribution', result.data);
    } else {
      commit('error', result.message);
    }
  },
};
