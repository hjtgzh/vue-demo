/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-30 21:36:33
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 19:38:45
 */
import { MutationTree } from 'vuex';
import { HomeState } from './types';

// 提供存储设置state数据的方法
export const mutations: MutationTree<HomeState> = {
  // 路线分布
  routeDistribute(state, payload: any) {
    state.routeDistribute = payload;
    state.error = false;
  },
  // 各市开行情况
  runInfo(state, payload: any) {
    state.runInfo = payload;
    state.error = false;
  },
  // 货物品类TOP5
  goodsDistribution(state, payload: any) {
    state.goodsDistribution = payload;
    state.error = false;
  },
  error(state) {
    state.error = true;
  },
};
