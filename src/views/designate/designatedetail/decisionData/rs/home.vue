<!--
 * @Author: Haojiang
 * @Date: 2021-07-09 10:50:31
 * @LastEditTime: 2021-07-09 11:29:55
 * @LastEditors: Please set LastEditors
 * @Description: 决策资料 - rs 页签 普通 和扩产能分流
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rs/home.vue
-->
<template>
  <div>
    <rsCapacityExpan v-if="partProjType === 'PT15'" />
    <RS v-else />
  </div>
</template>
<script>
import RS from './index.vue'
import rsCapacityExpan from '../rsCapacityExpan/index'
export default {
  components: {
    RS,
    rsCapacityExpan
  },
  data() {
    return {
      partProjType: ''
    }
  },
  created() {
    this.partProjType = this.$route.query.partProjType
  }
}
</script>