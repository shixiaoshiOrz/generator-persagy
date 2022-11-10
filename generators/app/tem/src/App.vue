<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: Arial, "Microsoft Yahei", sans-serif;
  color: #333;
  // 滚动条样式
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #d1d1d1;
    border: 1px solid #d1d1d1;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #d1d1d1;
    border: 1px solid #d1d1d1;
  }
}
</style>
