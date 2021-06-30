<!--
 * @Author: your name
 * @Date: 2021-06-29 17:02:51
 * @LastEditTime: 2021-06-30 10:13:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\steeldemandcreation\index.vue
-->
<template>
  <iPage>
    <div class="topMenu">
      <iNavMvp class="margin-bottom33" lang @change="change" :list='navListLeft' routerPage lev="1" @message="clickMessage" />
      <iNavMvp class="margin-bottom33" lang @change="change" right routerPage lev="2" :list="navList" @message="clickMessage" />
    </div>
    <iSearch class="margin-bottom20"></iSearch>
    <iCard>
      <div class="textalign-right">
      </div>
      <el-table>
        <el-table-column></el-table-column>
      </el-table>
    </iCard> 
  </iPage>
</template>
<script>
import {iPage,iSearch,iCard,iNavMvp} from 'rise'
// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")
export default{
  components:{iPage,iSearch,iCard,iNavMvp},
    created(){
      this.updateNavList()
    },
    data(){
      return {
      }
    },
    computed: {
    ...mapState(["navList","navListLeft"]),
    ...mapActions(["updateNavList"])
  },
}
</script>
<style lang='scss' scoped>
  .topMenu{
    display: flex;
    justify-content: space-between;
  }
</style>