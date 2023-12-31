s<!--
 * @Author: your name
 * @Date: 2021-05-27 17:29:13
 * @LastEditTime: 2021-06-07 11:20:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\partList\index.vue
-->
<template>
  <iCard class="table-card" :title="language('LK_LINGJIANQINGDAN','零件清单')">
    <template v-slot:header-control>
      <iButton @click="handleSave" :loading="saveLoading" v-permission.auto="COSTANALYSISMANAGE_RFQDETAIL_PARTLIST_BUTTON_SAVE|保存">{{ language("BAOCUN", "保存") }}</iButton>
      <iButton @click="handleDownloadTechnicalData" v-permission.auto="COSTANALYSISMANAGE_RFQDETAIL_PARTLIST_BUTTON_DOWNLOADTECHNICALDATA|下载技术资料">{{ language("XIAZAIJISHUZILIAO", "下载技术资料") }}</iButton>
      <iButton :loading="downloadLoading" @click="handleDownloadCbd" v-permission.auto="COSTANALYSISMANAGE_RFQDETAIL_PARTLIST_BUTTON_DOWNLOADCBD|下载CBD">{{ language("XIAZAICBD", "下载CBD") }}</iButton>
    </template>
      <tableList
        index
        fixed
        class="table table-box"
        height="100%"
        ref="table"
        :lang="true"
        :cellClassName="cellClass"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
        @handleRowClick="handleRowClick"
        @handleSelectAll="handleSelectAll"
      >
        <template #partNum="scope">
          <span v-if="scope.row.sendKmFlag == 1" class="link-underline" @click="jumpPartDetail(scope.row)">{{ scope.row.partNum }}</span>
          <span v-else-if="scope.row.partProjectStatus == getEnumValue('PURCHASE_PROJECT_STATE_ENUM.DESIGNATED')" class="link-underline" @click="jumpPartDetail(scope.row)">{{ scope.row.partNum }}</span>
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
        <template #greenFieldMeasure="scope">
          <iInput v-if="scope.row.sendKmFlag == 1" v-model="scope.row.greenFieldMeasure" @input="handleInputByGreenFieldMeasure($event, scope.row)" />
          <span v-else>{{ scope.row.greenFieldMeasure }}</span>
        </template>
        <template #openGap="scope">
          <iInput v-if="scope.row.sendKmFlag == 1" v-model="scope.row.openGap" @input="handleInputByOpenGap($event, scope.row)" />
          <span v-else>{{ scope.row.openGap }}</span>
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
    <downloadDialog :rfqNum="rfqId" :dialogVisible="downloadDialogVisible" @changeVisible="changeVisible"/>
  </iCard>
</template>

<script>
import { iCard, iButton, iInput, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { partListTableTitle } from "../data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { numberProcessor } from "@/utils"
import { getKmPartList, savePcaAndTia } from "@/api/costanalysismanage/rfqdetail"
import downloadDialog from "../../../home/components/downloadFiles"
import { partCbdKmFile } from "@/api/costanalysismanage/costanalysis"
import { getEnumValue } from "@/config"

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
  computed: {
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
    roleCodeList() {
      if (Array.isArray(this.userInfo.positionList)) {
        return this.userInfo.positionList.reduce((acc, cur) => {
          if (Array.isArray(cur.roleDTOList)) {
            return acc.concat(cur.roleDTOList.map(item => item.code))
          } else {
            return acc
          }
        }, [])
      } else {
        return []
      }
    },
    isPca() { // 零件成本分析员 临时
      return this.roleCodeList.some(item => item.indexOf("LJCBFXY") > -1)
    },
    isTia() { // 模具成本分析员 临时
      return this.roleCodeList.some(item => item.indexOf("MJCBFXY") > -1)
    },
    tableTitle() {
      if (this.isPca && !this.isTia) {
        return partListTableTitle.filter(item => item.props !== "tiaResult")
      }

      if (this.isTia && !this.isPca) {
        return partListTableTitle.filter(item => item.props !== "pcaResult" && item.props !== "greenFieldMeasure" && item.props !== "openGap" && item.props !== "openPotential")
      }

      if (this.isPca && this.isTia) return partListTableTitle

      return partListTableTitle.filter(item => item.props !== "tiaResult" && item.props !== "pcaResult" && item.props !== "greenFieldMeasure" && item.props !== "openGap" && item.props !== "openPotential")
    }
  },
  methods: {
    getEnumValue,
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
    handleRowClick(row) {
      if (row.sendKmFlag != 1) {
        this.$refs.table.$refs.table.toggleRowSelection(row, false)
        this.$set(row,'selectedBorder', false)
      }
    },
    // 保存
    handleSave() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOBAOCUNDESHUJU", "请选择需要保存的数据"))

      if (this.isPca && !this.isTia) {
        if (this.multipleSelection.some(item => item.sendKmFlag == 1 && !item.pcaResult)) return iMessage.warn(this.language("SAVEPCARESTIPS", "请填写完整PCA分析结果"))
      }

      if (this.isTia && !this.isPca) {
        if (this.multipleSelection.some(item => item.sendKmFlag == 1 && !item.tiaResult)) return iMessage.warn(this.language("SAVETIARESTIPS", "请填写完整TIA分析结果"))
      }

      if (this.isPca && this.isTia) {
        if (this.multipleSelection.some(item => item.sendKmFlag == 1 && (!item.pcaResult || !item.tiaResult))) return iMessage.warn(this.language("SAVEPCARESANDTIARESTIPS", "请填写完整PCA分析结果和TIA分析结果"))
      }

      this.saveLoading = true
      savePcaAndTia({
        savePcaTiaDTOS: this.multipleSelection.map(item => ({
          fsnrGsnrNum: item.fsnrGsnrNum,
          partNum: item.partNum,
          pcaResult: item.pcaResult,
          rfqId: this.rfqId,
          supplierId: item.supplierId,
          tiaResult: item.tiaResult,
          openGap: item.openGap,
          greenFieldMeasure: item.greenFieldMeasure
        }))
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.getKmPartList()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.saveLoading = false)
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
    handleInputByGreenFieldMeasure(value, row) {
      this.$set(row, "greenFieldMeasure", numberProcessor(value, 2))
    },
    handleInputByGreenFieldMeasure(value, row) {
      this.$set(row, "greenFieldMeasure", numberProcessor(value, 2))
    },
    handleInputByOpenGap(value, row) {
      this.$set(row, "openGap", numberProcessor(value, 2))
    },
    // 关闭弹窗
    changeVisible(type){
      this.downloadDialogVisible = type
    },
    cellClass(row) {
      if (row.row.sendKmFlag != 1) {
        return "hideCheckbox"
      }
    },
    handleSelectAll(selection) {
      // selection.forEach(row => {
      //   if (row.sendKmFlag != 1) {
      //     this.$refs.table.$refs.table.toggleRowSelection(row, false)
      //     this.$set(row,'selectedBorder', false)
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>