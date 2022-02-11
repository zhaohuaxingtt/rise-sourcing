<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:47:09
 * @LastEditors: YoHo
 * @LastEditTime: 2022-02-11 16:47:13
 * @Description: 目标价详情
 * @FilePath: \front-sourcing\src\views\financialTargetPrice\targetPriceDetail\index.vue
-->

<template>
  <iPage class="targetPriceDetail">
    <div class="font20 font-weight targetPriceDetail-title">
      <div>{{language('LINGJIANHAO','零件号')}}：{{detailData.partNum}}</div>
      <!-- 日志 -->
      <div>
        <iLoger
					:config="{
						module_obj_ae: '财务目标价', 
						bizId_obj_ae: 'partNum', 
						queryParams:['bizId_obj_ae']}"
          :partNum="detailData.partNum"
					credentials
					isPage
          isUser
					class="margin-left20"
					optionDicKey="LOG_OPERATION_TYPES"
					optionDicKey2="财务目标价详情页" />
      </div>
    </div>
    <!------------------------------------------------------------------------>
    <!--                 基础信息                                          --->
    <!------------------------------------------------------------------------>
    <basic :id="applyId" @basicSaving="basicSaving" />
    <!------------------------------------------------------------------------>
    <!--                 修改历史                                          --->
    <!------------------------------------------------------------------------>
    <history ref="history" :id="fsNum" />
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
import iLoger from 'rise/web/components/iLoger'
export default {
  components: {iPage,history,basic,designateInfo,iLoger},
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
    },
    fsNum() {
      return this.detailData.fsnrGsnrNum || ''
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
.targetPriceDetail-title {
  display: flex;
  justify-content: space-between;
}
</style>