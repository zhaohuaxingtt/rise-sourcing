<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:47:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-23 09:42:33
 * @Description: 目标价详情
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\index.vue
-->

<template>
  <iPage class="targetPriceDetail">
    <div>零件号：3df4324432</div>
    <iCard></iCard>
  </iPage>
</template>

<script>
import { iPage, iCard } from 'rise'
export default {
  components: {iPage,iCard},
  data() {
    return {
      basicIsEdit: false
    }
  },
  methods: {
    /**
     * @Description: 切换基础信息部分编辑状态
     * @Author: Luoshuang
     * @param {*} isEdit
     * @return {*}
     */    
    changeBasicIsEdit(isEdit) {
      this.basicIsEdit = isEdit
    }
  }
}
</script>

<style lang="scss" scoped>

</style>