<!--
 * @Author: yuszhou
 * @Date: 2020-07-22 14:56:34
 * @LastEditTime: 2021-08-10 15:12:48
 * @LastEditors: Please set LastEditors
 * @Description: 项目默认layout
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
export default {
  components:{topLayout,menuLayout,LeftLayout},
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
    overflow: auto;
  }
}
</style>
