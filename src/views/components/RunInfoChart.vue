<!--
 * @文件描述: 各市开行情况
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 19:33:42
 -->
<template>
  <div class="routeDistribution" ref="dom"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action, Getter } from 'vuex-class';
import echarts from 'echarts';
import { HomeState } from '../../store/home/types';

const namespace: string = 'home';

@Component({})
export default class RunInfo extends Vue {
  @State('home') stateHome!: HomeState;
  @Action('fetchGetRunInfo', { namespace }) fetchGetRunInfo: any;
  @Getter('runInfoOption', { namespace }) runInfoOption!: object;

  chart: any = null;

  private async mounted() {
    this.chart = echarts.init(this.$refs.dom as HTMLCanvasElement);
    await this.fetchGetRunInfo();
    this.chart.setOption(this.runInfoOption);
  }
}
</script>
<style lang="less" scoped>
.routeDistribution {
  width: '100%';
  height: calc(100% - 55px);
}
</style>
