<!--
 * @Author: Haojiang
 * @Date: 2021-07-09 10:50:31
 * @LastEditTime: 2021-09-07 16:23:12
 * @LastEditors: Hao,Jiang
 * @Description: 决策资料 - rs 页签 普通 和扩产能分流
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rs/home.vue
-->
<template>
  <div>
    <rsCapacityExpan v-if="partProjType === partProjTypes.KUOCHANNENG" v-permission.auto="SOURCING_NOMINATION_ATTATCH_RS_CAPACITYEXPAN|决策资料-RS扩产能" />
    <RS v-else />
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