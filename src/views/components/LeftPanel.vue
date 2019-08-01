<!--
 * @文件描述: 左侧内容
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 19:49:16
 -->
<template>
  <div class="left-content">
    <div class="story">
      <CommonContainer title="路线分布">
        <RouteDistributionChart />
      </CommonContainer>
    </div>
    <div class="story">
      <CommonContainer title="开行情况"></CommonContainer>
    </div>
    <div class="story">
      <CommonContainer title="各市开行情况">
        <RunInfoChart />
      </CommonContainer>
    </div>
    <div class="story">
      <CommonContainer title="货物品类">
        <GoodsDistributionChart />
      </CommonContainer>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import Component from 'vue-class-component';
import CommonContainer from '@/components/CommonContainer.vue'; // @ is an alias to /src
import RouteDistributionChart from './RouteDistributionChart.vue';
import RunInfoChart from './RunInfoChart.vue';
import GoodsDistributionChart from './GoodsDistributionChart.vue';

const namespace: string = 'home';

@Component({
  components: {
    CommonContainer,
    RouteDistributionChart,
    RunInfoChart,
    GoodsDistributionChart,
  },
})
export default class LeftPanel extends Vue {
  private created() {
    // console.log('LeftPanel-store', this.stateHome);
    // console.log('LeftPanel-Component');
  }
}
</script>
<style lang="less" scoped>
.left-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .story {
    width: 474px;
    height: 324px;
    &:nth-child(3) {
      width: 100%;
    }
    &:nth-child(4) {
      width: 100%;
    }
  }
}
</style>
