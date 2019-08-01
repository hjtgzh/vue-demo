<!--
 * @文件描述: 各市开行情况
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 20:04:38
 -->
<template>
  <div class="chart-wrap">
    <div class="routeDistribution" ref="dom1"></div>
    <div class="routeDistribution" ref="dom2"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action, Getter } from 'vuex-class';
import echarts from 'echarts';
import { HomeState } from '../../store/home/types';

const namespace: string = 'home';

@Component({})
export default class GoodsDistributionChart extends Vue {
  @State('home') stateHome!: HomeState;
  @Action('fetchGetGoodsDistribution', { namespace }) fetchGetGoodsDistribution: any;
  @Getter('goodsDistributionOption01', { namespace }) goodsDistributionOption01!: object;
  @Getter('goodsDistributionOption02', { namespace }) goodsDistributionOption02!: object;

  chart1: any = null;
  chart2: any = null;

  private async mounted() {
    this.chart1 = echarts.init(this.$refs.dom1 as HTMLCanvasElement);
    this.chart2 = echarts.init(this.$refs.dom2 as HTMLCanvasElement);
    await this.fetchGetGoodsDistribution();
    this.chart1.setOption(this.goodsDistributionOption01);
    this.chart2.setOption(this.goodsDistributionOption02);
  }
}
</script>
<style lang="less" scoped>
.chart-wrap {
  height: 100%;
  display: flex;
  .routeDistribution {
    width: 50%;
    height: calc(100% - 55px);
  }
}
</style>
