<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:47:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-27 09:39:09
 * @Description: 目标价详情
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\index.vue
-->

<template>
  <iPage class="targetPriceDetail">
    <div class="font20 font-weight">{{language('LINGJIANHAO','零件号')}}：{{detailData.partNum}}</div>
    <!------------------------------------------------------------------------>
    <!--                 基础信息                                          --->
    <!------------------------------------------------------------------------>
    <basic :id="applyId" @basicSaving="basicSaving" />
    <!------------------------------------------------------------------------>
    <!--                 修改历史                                          --->
    <!------------------------------------------------------------------------>
    <history ref="history" :id="applyId" />
    <!------------------------------------------------------------------------>
    <!--                 定点信息                                          --->
    <!------------------------------------------------------------------------>
    <designateInfo :partProjId="purchasingProjectId" :partNum="partNum" />
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
    },
    partNum() {
      return this.detailData.partNum || ''
    }
  },
  methods: {
    basicSaving() {
      this.$refs.history.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>