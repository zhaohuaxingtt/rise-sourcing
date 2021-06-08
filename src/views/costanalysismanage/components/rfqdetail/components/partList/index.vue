s<!--
 * @Author: your name
 * @Date: 2021-05-27 17:29:13
 * @LastEditTime: 2021-06-07 11:20:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\partList\index.vue
-->
<template>
  <iCard :title="$t('costanalysismanage.LingJianQingDan')">
    <template v-slot:header-control>
      <iButton @click="handleSave" :loading="saveLoading">{{ $t("costanalysismanage.BaoCun") }}</iButton>
      <iButton @click="handleDownloadTechnicalData">{{ $t("costanalysismanage.XiaZaiJiShuZiLiao") }}</iButton>
      <!-- 涉及L3模板 -->
      <iButton @click="handleDownloadCbd" disabled>{{ $t("costanalysismanage.XiaZaiCbd") }}</iButton>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
      >
        <template #partNum="scope">
          <span class="link-underline" @click="jumpPartDetail(scope.row)">{{ scope.row.partNum }}</span>
        </template>
        <template #cbdStatus="scope">
          <span class="link-underline-disabled">{{ scope.row.cbdStatus | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #pcaResult="scope">
          <iInput v-if="scope.row.sendKmFlag == 1" v-model="scope.row.pcaResult" @input="handleInputByPcaResult($event, scope.row)" />
          <span v-else>{{ scope.row.pcaResult }}</span>
        </template>
        <template #tiaResult="scope">
          <iInput v-if="scope.row.sendKmFlag == 1" v-model="scope.row.tiaResult" @input="handleInputByTiaResult($event, scope.row)" />
          <span v-else>{{ scope.row.tiaResult }}</span>
        </template>
      </tableList>
      <iPagination 
        v-update
        class="margin-top30"
        @size-change="handleSizeChange($event, getKmPartList)"
        @current-change="handleCurrentChange($event, getKmPartList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
    <downloadDialog :rfqNum="rfqId" :dialogVisible="downloadDialogVisible" @changeVisible="changeVisible"/>
  </iCard>
</template>

<script>
import { iCard, iButton, iInput, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { partListTableTitle as tableTitle } from "../data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { numberProcessor } from "@/utils"
import { getKmPartList, savePcaAndTia } from "@/api/costanalysismanage/rfqdetail"
import downloadDialog from "../../../home/components/downloadFiles"

export default {
  components: {
    iCard,
    iButton,
    iInput,
    iPagination,
    tableList,
    downloadDialog
  },
  mixins: [ filters, pageMixins ],
  props: {
    rfqId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      saveLoading: false,
      downloadDialogVisible: false,
    }
  },
  mounted() {
    this.getKmPartList()
  },
  methods: {
    // 获取零件清单
    getKmPartList() {
      this.loading = true

      getKmPartList({
        rfqId: this.rfqId,
        currPage: this.page.currPage,
        pageSize: this.page.pageSize
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    // 保存
    handleSave() {
      this.saveLoading = true

      if (this.tableListData.some(item => item.sendKmFlag == 1 && (!item.pcaResult || !item.tiaResult))) return iMessage.warn(this.$t("costanalysismanage.SavePcaResAndTiaResTips"))

      savePcaAndTia({
        savePcaTiaDTOS: this.tableListData.map(item => ({
          fsnrGsnrNum: item.fsnrGsnrNum,
          partNum: item.partNum,
          pcaResult: item.pcaResult,
          rfqId: this.rfqId,
          supplierId: item.supplierId,
          tiaResult: item.tiaResult
        }))
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.getKmPartList()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.saveLoading = false
      })
      .catch(() => this.saveLoading = false)
    },
    // 下载技术资料
    handleDownloadTechnicalData() {
      this.downloadDialogVisible = true
    },
    // 下载CBD
    handleDownloadCbd() {},
    // 跳转零件详情
    jumpPartDetail(row) {
      window.open(`/#/supplier/quotationdetail?partNum=${ row.partNum }&rfqId=${ this.rfqId }&round=${ row.round }&fsNum=${ row.fsnrGsnrNum }`, "_blank")
    },
    handleInputByPcaResult(value, row) {
      this.$set(row, "pcaResult", numberProcessor(value, 2))
    },
    handleInputByTiaResult(value, row) {
      this.$set(row, "tiaResult", numberProcessor(value, 2))
    },
    // 关闭弹窗
    changeVisible(type){
      this.downloadDialogVisible = type
    }
  }
}
</script>

<style lang="scss" scoped>

</style>