/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-30 21:29:40
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 20:56:58
 */
import { ActionTree } from 'vuex';
import { MapState } from './types';
import { RootState } from '../types';
import { backendServerUrl } from '@/constant';
import api from '@/utils/api';

// 提供跟后台接口打交道的方法，并调用mutations提供的方法
export const actions: ActionTree<MapState, RootState> = {
  // 世界地图
  async fetchWorldMap({ commit }, params) {
    const result = await api.get(`${backendServerUrl}/trainRun/home/map`, params);
    if (result.success) {
      commit('worldMap', result.data);
    } else {
      commit('error', result.message);
    }
  },
};
