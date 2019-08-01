<!--
 * @文件描述: 路线分布
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 19:02:27
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

@Component({
  components: {},
})
export default class RouteDistributionChart extends Vue {
  @State('home') stateHome!: HomeState;
  @Action('fetchGetRouteDistribute', { namespace }) fetchGetRouteDistribute: any;
  @Getter('routeDistributeOption', { namespace }) routeDistributeOption!: object;

  chart: any = null;

  private async created() {
    // const chart = echarts.init(document.getElementById('routeDistribution'));
    // console.log('chart', chart.setOption);
    // console.log('RouteDistributionChart-store', this.stateHome);
    // await this.fetchGetRouteDistribute();
    // console.log('routeDistributeOption', this.routeDistributeOption);
    // chart.setOption(this.routeDistributeOption);
  }

  private async mounted() {
    this.chart = echarts.init(this.$refs.dom as HTMLCanvasElement);
    await this.fetchGetRouteDistribute();
    this.chart.setOption(this.routeDistributeOption);
  }
}
</script>
<style lang="less" scoped>
.routeDistribution {
  width: '100%';
  height: calc(100% - 55px);
}
</style>
