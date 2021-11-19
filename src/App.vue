<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-08-26 15:24:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\App.vue
-->
<template>
  <div id="app" class="app">
    <router-view id="appRouterView"></router-view>
  </div>
</template>
<script>
export default {
  mounted(){
      //检测路由变化，为路由无法跳转做补救措施 
      window.addEventListener('hashchange', () => {
        let currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
  }
};
</script>
<style lang="scss" scopde>
.app {
  height: 100%;
  overflow: hidden;
  background-color: $color-background;
}
</style>
