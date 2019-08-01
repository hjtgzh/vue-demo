/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-30 21:27:10
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 20:34:43
 */
import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { MapState } from './types';
import { RootState } from '../types';

// 类似存储全局变量的数据
export const state: MapState = {
  worldMap: [],
  error: false,
};

const namespaced: boolean = true;

export const map: Module<MapState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
