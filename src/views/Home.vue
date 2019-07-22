<!--
 * @文件描述: 首页
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-18 22:05:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-07-22 17:23:47
 -->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
