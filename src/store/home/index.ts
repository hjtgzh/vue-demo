/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-30 21:27:10
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 19:38:07
 */
import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { HomeState } from './types';
import { RootState } from '../types';

// 类似存储全局变量的数据
export const state: HomeState = {
  routeDistribute: [],
  runInfo: [],
  goodsDistribution: [],
  error: false,
};

const namespaced: boolean = true;

export const home: Module<HomeState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
