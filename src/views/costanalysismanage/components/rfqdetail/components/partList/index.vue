s<!--
 * @Author: your name
 * @Date: 2021-05-27 17:29:13
 * @LastEditTime: 2021-06-07 11:20:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\partList\index.vue
-->
<template>
  <iCard :title="language('LK_LINGJIANQINGDAN','零件清单')">
    <template v-slot:header-control>
      <iButton @click="handleSave" :loading="saveLoading">{{ language("BAOCUN", "保存") }}</iButton>
      <iButton @click="handleDownloadTechnicalData">{{ language("XIAZAIJISHUZILIAO", "下载技术资料") }}</iButton>
      <iButton :loading="downloadLoading" @click="handleDownloadCbd">{{ language("XIAZAICBD", "下载CBD") }}</iButton>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        :lang="true"
        :cellClassName="cellClass"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #partNum="scope">
          <span v-if="scope.row.sendKmFlag == 1" class="link-underline" @click="jumpPartDetail(scope.row)">{{ scope.row.partNum }}</span>
          <span v-else>{{ scope.row.partNum }}</span>
        </template>
        <template #round="scope">
          <span v-if="scope.row.sendKmFlag == 1">{{ scope.row.round }}</span>
        </template>
        <template #cbdStatus="scope">
          <span v-if="scope.row.sendKmFlag == 1" class="link-underline" @click="donwloadCbd(scope.row)">{{ scope.row.cbdStatus | dateFilter("YYYY-MM-DD") }}</span>
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
import { partCbdKmFile } from "@/api/costanalysismanage/costanalysis"

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
      multipleSelection: [],
      downloadLoading: false
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
    handleSelectionChange(list) {
      this.multipleSelection = list.filter(item => item.sendKmFlag == 1)
    },
    // 保存
    handleSave() {
      this.saveLoading = true

      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOBAOCUNDESHUJU", "请选择需要保存的数据"))
      if (this.multipleSelection.some(item => item.sendKmFlag == 1 && (!item.pcaResult || !item.tiaResult))) return iMessage.warn(this.language("SAVEPCARESANDTIARESTIPS", "请填写完整PCA分析结果和TIA分析结果"))

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
    async handleDownloadCbd() {
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.language("QINGXUANZEYITIAOSHUJU", "请选择一条数据"))
      console.log("this.multipleSelection.length", this.multipleSelection.length)

      this.downloadLoading = true

      try {
        await partCbdKmFile({
          quotationId: this.multipleSelection[0].quotationId
        })
      } catch(e) {
        iMessage.error(this.language("XIAZAISHIBAI", "下载失败"))
      } finally {
        this.downloadLoading = false
      }
    },
    donwloadCbd(row) {
      partCbdKmFile({
        quotationId: row.quotationId
      })
    },
    // 跳转零件详情
    jumpPartDetail(row) {
      const route = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/supplier/quotationdetail",
        query: { 
          partNum: row.partNum,
          fix: true,
          rfqId: this.rfqId,
          round: row.round,
          fsNum: row.fsnrGsnrNum,
          supplierId: row.supplierId,
          sourcing: true
        }
      })
      window.open(route.href, "_blank")
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
    },
    cellClass(row) {
      if (row.row.sendKmFlag != 1) {
        return "hideCheckbox"
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>