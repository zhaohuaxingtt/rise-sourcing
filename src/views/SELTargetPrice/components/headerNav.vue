<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:14:14
 * @LastEditors: YoHo
 * @LastEditTime: 2022-02-11 16:47:29
 * @Description: 模具目标价顶部导航
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\components\headerNav.vue
-->

<template>
  <div class="headerNav">
    <headerNav type="financialmanage">
      <div class="control">
        <iLoger
          :config="{
            module_obj_ae: '', 
            menuName_obj_ae: '模具目标价-模具目标价详情页'
          }"
          isPage
          isUser
          credentials
          optionDicKey="LOG_OPERATION_TYPES"
          optionDicKey2="模具目标价详情页"
          class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </headerNav>
  </div>
</template>

<script>
import { iNavMvp, icon } from 'rise'
import headerNav from "@/components/headerNav"
import { MENU } from './data'
import iLoger from 'rise/web/components/iLoger'
import { TAB } from '@/views/financialTargetPrice/components/data'
export default {
  components: {headerNav, iNavMvp, icon, iLoger},
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