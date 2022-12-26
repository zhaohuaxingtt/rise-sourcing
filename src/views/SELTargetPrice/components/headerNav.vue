<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:14:14
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-26 15:44:43
 * @Description: 模具目标价顶部导航
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\components\headerNav.vue
-->

<template>
  <div class="headerNav">
    <headerNav type="financialmanage">
      <div class="control">
        <iLoger
          :config="config"
          isPage
          isUser
          credentials
          optionDicKey="LOG_OPERATION_TYPES"
          optionDicKey2="SEL目标价详情页"
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
import iLoger from 'rise/web/components/iLoger'
export default {
  components: {headerNav, iNavMvp, icon, iLoger},
  props:{
    config:{
      type: Object,
      default:()=>({
            module_obj_ae: '', 
            menuName_obj_ae: 'SEL目标价-SEL目标价详情页'
          })
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
}
</style>