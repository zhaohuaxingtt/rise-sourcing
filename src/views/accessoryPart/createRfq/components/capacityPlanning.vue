<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 20:06:02
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-07 14:28:11
 * @Description: 产能计划弹窗
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\components\capacityPlanning.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
    :show-close="false"
  >
    <template slot="title">
      <div class="clearFloat">
        <span class="font18 font-weight">产能计划</span>
          <div class="floatright">
            <!--------------------保存按钮----------------------------------->
            <iButton @click="handleSave" :loading="saveLoading" >保存</iButton>
            <!--------------------添加按钮----------------------------------->
            <iButton @click="clearDialog" >结束编辑</iButton>
          </div>
      </div>
    </template>
    <tableList class="left-title-table" :selection="false" :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" ></tableList>
  </iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { planTableTitle } from '../data'
import { getOutputPlan, updateOutputPlan } from '@/api/partsprocure/editordetail'
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, tableList },
  props: {
    dialogVisible: { type: Boolean, default: false },
    detailInfo: {type: Object}
  },
  data() {
    return {
      backType: '',
      backReason: '',
      tableData: [],
      tableTitle: [],
      searchParams: {},
      tableLoading: false,
      saveLoading: false
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getData()
      }
    }
  },
  methods: {
    /**
     * @Description: 保存修改的产量
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.saveLoading = true
      const outputPlanList = this.tableTitle.reduce((accum, curr, index) => {
        if (index === 0) {
          return accum
        } else {
          return [...accum, {year: curr.name, output: this.tableData[0][index]}]
        }
      },[])
      updateOutputPlan({
        partOutputPlanInsertFacadeDTOS: {
          partOutputPlanInsertList: outputPlanList,
          purchasingProjectId: this.$route.query.purchaseProjectId,
        }
      })
        .then(res => {
          if (res?.result) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.getData()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
          
          this.saveLoading = false
        })
        .catch(() => this.saveLoading = false)
    },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getData() {
      this.tableLoading = true
      getOutputPlan({
        'partOutputPlanReqDTO.purchaseProjectId': this.detailInfo.purchaseProjectId,
        'partOutputPlanReqDTO.year': this.detailInfo.timeToMarket
      })
        .then((res) => {
          this.tableTitle = cloneDeep(planTableTitle)
          this.tableData = [
            {a: '产量（PC）'}
          ]

          if (res.data && res.data.partRecordsResDTO) {
            if (Array.isArray(res.data.partRecordsResDTO.outputPlanList)) {
              res.data.partRecordsResDTO.outputPlanList.forEach((planData, index) => {
                this.tableTitle.push({props: planData.year, name: planData.year, key: planData.year})
                this.tableData[0][planData.year] = planData.output
              })
            }
          }
          this.tableLoading = false
        })
        .catch(() => this.tableLoading = false)
    },
    /**
     * @Description: 关闭弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    clearDialog() {
      this.tableTitle = cloneDeep(planTableTitle)
      this.tableData = [
            {a: '产量（PC）'}
          ]
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    height: 90%;
    .el-dialog__body {
      height: calc(100% - 70px);
      overflow: auto;
    }
  }
  .left-title-table {
    ::v-deep thead th:not(th:first-of-type) {
      background-color: #F7FAFF;
      font-weight: 400;
    }
    ::v-deep thead th:first-of-type {
      border-right: 1px solid #fff;
    }
    ::v-deep tbody td {
      background-color: #F7FAFF;
      border-top: 1px solid #fff;
      
    }
    ::v-deep tbody td:first-of-type {
      background-color: rgba(22, 99, 246, 0.17);
      border-top: 1px solid #fff;
      border-right: 1px solid #fff;
      font-weight: bold;
    }
  }
}
</style>