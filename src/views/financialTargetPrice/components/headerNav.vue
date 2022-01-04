<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:14:14
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-25 16:31:29
 * @Description: 财务目标价顶部导航
 * @FilePath: \front-sourcing\src\views\financialTargetPrice\components\headerNav.vue
-->

<template>
  <div class="headerNav">
    <headerNav type="financialmanage">
      <div class="control">
        <iLoger
          :config="{
            module_obj_ae: '财务目标价', 
            menuName_obj_ae: ''
          }"
          isPage
          credentials
          optionDicKey="LOG_OPERATION_TYPES"
          optionDicKey2="财务目标价详情页"
          class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </headerNav>
  </div>
</template>

<script>
import { icon } from 'rise'
import { TAB, MENU } from './data'
import headerNav from "@/components/headerNav"
import iLoger from 'rise/web/components/iLoger'
export default {
  components: {headerNav,icon, iLoger},
  data() {
    return {
      list: TAB,
      navList: MENU
    }
  },
  methods: {
    change() {}
  }
}
</script>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ::v-deep .headerNav-wraper {
    width: 100%;
  }
  .nav div {
    margin-left: 0;
  }
  .right-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .control {
    // position: absolute;
    // top: 30px;
    // right: 50px;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
</style>