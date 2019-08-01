<!--
 * @文件描述: 
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-07-30 21:04:31
 -->
<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
    <!-- </div> -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view />
  </div>
</template>

<style lang="less">
body {
  margin: 0;
}
#app {
  height: 1080px;
  width: 3840px;
}
</style>
