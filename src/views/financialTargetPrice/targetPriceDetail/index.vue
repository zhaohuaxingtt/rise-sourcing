<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:47:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-30 14:41:42
 * @Description: 目标价详情
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\index.vue
-->

<template>
  <iPage class="targetPriceDetail">
    <div class="font20 font-weight">零件号：3df4324432</div>
    <!------------------------------------------------------------------------>
    <!--                 基础信息                                          --->
    <!------------------------------------------------------------------------>
    <basic :id="applyId" />
    <!------------------------------------------------------------------------>
    <!--                 修改历史                                          --->
    <!------------------------------------------------------------------------>
    <history :id="applyId" />
    <!------------------------------------------------------------------------>
    <!--                 定点信息                                          --->
    <!------------------------------------------------------------------------>
    <designateInfo :partProjId="purchasingProjectId" />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import history from './components/history'
import basic from './components/basic'
import designateInfo from './components/designateInfo'
export default {
  components: {iPage,history,basic,designateInfo},
  data() {
    return {
      detailData: {}
    }
  },
  created() {
    const params = JSON.parse(this.$route.query.item)
    if(params) {
      this.detailData = params
    }
  },
  computed: {
    applyId() {
      return this.detailData.applyId || ''
    },
    recordId() {
      return this.detailData.recordId || ''
    },
    purchasingProjectId() {
      return this.detailData.purchasingProjectId || ''
    }
  },
}
</script>

<style lang="scss" scoped>

</style>