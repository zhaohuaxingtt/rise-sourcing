<!--
 * @Author: Haojiang
 * @Date: 2021-07-09 10:50:31
 * @LastEditTime: 2023-02-12 21:29:30
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 决策资料 - rs 页签 普通 和扩产能分流
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rs/home.vue
-->
<template>
<div>
  <rsCapacityExpan style="height: 100%" v-if="partProjType === partProjTypes.KUOCHANNENG" v-permission.auto.array="['SOURCING_NOMINATION_ATTATCH_RS_CAPACITYEXPAN|决策资料-RS扩产能', 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_RECORD_RS_CAPACITYEXPAN|定点记录-RS扩产能']" >
    <template #tabTitle>
        <slot name="tabTitle"></slot>
      </template>
  </rsCapacityExpan>
  <RS v-else style="height: 100%">
    <template #tabTitle>
        <slot name="tabTitle"></slot>
      </template>
  </RS>
</div>
</template>
<script>
import RS from './index.vue'
import rsCapacityExpan from '../rsCapacityExpan/index'
import {partProjTypes} from '@/config'
export default {
  components: {
    RS,
    rsCapacityExpan
  },
  data() {
    return {
      // 零件项目类型
      partProjTypes,
      partProjType: ''
    }
  },
  created() {
    this.partProjType = this.$route.query.partProjType
  }
}
</script>