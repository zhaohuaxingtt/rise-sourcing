<!--
 * @Author: Haojiang
 * @Date: 2021-07-09 10:50:31
 * @LastEditTime: 2021-07-14 14:09:04
 * @LastEditors: Please set LastEditors
 * @Description: 决策资料 - rs 页签 普通 和扩产能分流
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rs/home.vue
-->
<template>
  <div>
    <rsCapacityExpan v-if="partProjType === partProjTypes.KUOCHANNENG" />
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