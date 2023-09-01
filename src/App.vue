<script setup lang="ts">
import { RouterView } from 'vue-router'

// import { fetchTest } from "./api/test"

// fetchTest()
</script>

<template>
    <RouterView />
</template>

<style>
/* 确保不同浏览器的样式一样 */
@import 'normalize.css';

#app {
  /** 字体抗锯齿，让字体看起来更清晰 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;

  /* 全局定义背景色的变量 */
  --op-gray-bg-color: rgb(244,244,244)
}
</style>
