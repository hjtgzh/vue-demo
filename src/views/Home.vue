<!--
 * @文件描述: 首页
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 20:49:51
 -->
<template>
  <div class="home">
    <div class="left"><LeftPanel></LeftPanel></div>
    <div class="center"><Map /></div>
    <div class="right">右侧栏</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import { State, Action, Getter } from 'vuex-class';
import LeftPanel from './components/LeftPanel.vue';
import Map from './components/Map.vue';

const namespace: string = 'home';

@Component({
  components: {
    LeftPanel,
    Map,
  },
})
export default class Home extends Vue {
  // @State('home') stateHome!: CityState;
  // @Action('fetchData', { namespace }) fetchData: any;
  // @Getter('fullName', { namespace }) fullName!: string;
  private created() {
    // console.log('stateHome-home', this.stateHome);
  }
  // computed variable email
  // get email() {
  //   return '测试email';
  // }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  background: url('../assets/bg.png') no-repeat;
  .left {
    width: 960px;
    margin-left: 25px;
    margin-top: 50px;
    height: calc(100% - 65px);
  }
  .center {
    flex: 1;
    height: 98%;
    position: relative;
  }
  .right {
    width: 960px;
    height: 100%;
    margin-right: 30px;
  }
}
</style>
