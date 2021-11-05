<!--
 * @Author: yuszhou
 * @Date: 2020-07-22 14:56:34
 * @LastEditTime: 2021-06-30 10:04:54
 * @LastEditors: Please set LastEditors
 * @Description: 运用于mvp阶段的所有layout
 * @FilePath: \test\src\layout\default.vue
-->
<template>
  <div class="content">
    <topLayout></topLayout>
    <leftLayout ref='pup'>
      <template slot="menu">
        <menuLayout :menuData="menuList" @activeMeun='activeMeun'></menuLayout>
      </template>
    </leftLayout>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import topLayout from './components/topLayout/'
import menuLayout from './components/menu'
import LeftLayout from './components/leftLayout'
import { iNavMvp } from 'rise'
export default {
  components:{topLayout,menuLayout,LeftLayout,iNavMvp},
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      menuList: (state) => state.permission.menuList,
    })
  },
  methods:{
    activeMeun(){
      this.$refs.pup.hideMeun()
    }
  }
};
</script>
<style lang="scss" scoped>
.content{
  height: 100%;
  width: 100%;
  .app-content{
    padding-left: 100px;
    padding-top: 60px;
    height: 100%;
    width: 100%;
  }
}
</style>
