<!--
 * @文件描述: 左侧内容
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 20:55:16
 -->
<template>
  <div class="map-content" ref="dom"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action, Getter } from 'vuex-class';
import echarts from 'echarts';
import 'echarts/map/js/world';
import { MapState } from '@/store/map/types';

const namespace: string = 'map';

@Component({
  components: {},
})
export default class LeftPanel extends Vue {
  @State('map') stateHome!: MapState;
  @Action('fetchWorldMap', { namespace }) fetchWorldMap: any;
  @Getter('worldMapOption', { namespace }) worldMapOption!: object;

  chart: any = null;

  private async mounted() {
    this.chart = echarts.init(this.$refs.dom as HTMLCanvasElement);
    await this.fetchWorldMap({
      type: 'homeMap',
      name: '中亚',
    });
    this.chart.setOption(this.worldMapOption);
  }
}
</script>
<style lang="less" scoped>
.map-content {
  width: 100%;
  height: 100%;
}
</style>
