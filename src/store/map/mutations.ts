/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-30 21:36:33
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 20:33:23
 */
import { MutationTree } from 'vuex';
import { MapState } from './types';

// 提供存储设置state数据的方法
export const mutations: MutationTree<MapState> = {
  // 世界地图
  worldMap(state, payload: any) {
    state.worldMap = payload;
    state.error = false;
  },
};
