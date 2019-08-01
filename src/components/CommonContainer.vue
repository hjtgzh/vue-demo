<!--
 * @文件描述: 通用容器
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-07-30 11:24:53
 -->
<template>
  <div class="container">
    <div class="leftTop" />
    <div class="leftBottom" />
    <div class="rightTop" />
    <div class="rightBottom" />
    <div class="title" onClick="{props.onClick}">
      <img src="../assets/arrow-right.png" />
      <div class="text">{{ title }}</div>
    </div>
    <slot class="chart"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class CommonContainer extends Vue {
  @Prop() private title!: string;
}
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  position: relative;
  border: 1px solid #0063a2;
  .title {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 55px;
    padding-left: 10px;
    background-color: rgba(18, 70, 137, 0.6);
    .text {
      color: #00bfff;
      font-size: 24px;
      font-weight: 500;
    }
  }
  .chart {
    height: calc(100% - 55px);
  }

  .leftTop {
    position: absolute;
    width: 12px;
    height: 12px;
    top: -2px;
    left: -2px;
    border-style: solid;
    border-color: #00b9fd;
    border-left-width: 3px;
    border-top-width: 3px;
    border-right: none;
    border-bottom: none;
  }
  .rightTop {
    position: absolute;
    width: 12px;
    height: 12px;
    top: -2px;
    right: -2px;
    border-style: solid;
    border-color: #00b9fd;
    border-top-width: 3px;
    border-right-width: 3px;
    border-bottom: none;
    border-left: none;
  }
  .leftBottom {
    position: absolute;
    width: 12px;
    height: 12px;
    bottom: -2px;
    left: -2px;
    border-style: solid;
    border-color: #00b9fd;
    border-bottom-width: 3px;
    border-left-width: 3px;
    border-top: none;
    border-right: none;
  }
  .rightBottom {
    position: absolute;
    width: 12px;
    height: 12px;
    bottom: -2px;
    right: -2px;
    border-style: solid;
    border-color: #00b9fd;
    border-bottom-width: 3px;
    border-right-width: 3px;
    border-top: none;
    border-left: none;
  }
}
</style>
