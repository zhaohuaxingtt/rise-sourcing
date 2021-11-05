<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 20:06:02
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-14 12:59:10
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
        <span class="font18 font-weight">{{language('CHANNENGJIHUA','产能计划')}}</span>
          <div class="floatright">
            <!--------------------保存按钮----------------------------------->
            <iButton @click="handleSave" :loading="saveLoading" >{{language('BAOCUN','保存')}}</iButton>
            <!--------------------添加按钮----------------------------------->
            <iButton @click="clearDialog" >{{language('JIESHUBIANJI','结束编辑')}}</iButton>
          </div>
      </div>
    </template>
    <tableList class="left-title-table" :selection="false" :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @tableValueChange="tableValueChange"></tableList>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { planTableTitle } from '../data'
import { getOutputPlan, updateOutputPlan } from '@/api/partsprocure/editordetail'
import moment from 'moment'
import { cloneDeep } from 'lodash'
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
    tableValueChange(val, row, item) {
      this.tableData = [{...this.tableData[0], [item.props]:val}]
      console.log(this.tableData)
    },
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
          return [...accum, {year: curr.name, output: this.tableData[0][curr.name]}]
        }
      },[])
      updateOutputPlan({
        partOutputPlanInsertList: outputPlanList,
        purchasingProjectId: this.detailInfo.purchasingProjectId,
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
        'purchaseProjectId': this.detailInfo.purchasingProjectId,
        'year': moment(this.detailInfo.timeToMarket).year() + 1
      })
        .then((res) => {
          this.tableTitle = cloneDeep(planTableTitle)
          this.tableData = [
            {a: this.language('CHANLIANG_PC','产量（PC）')}
          ]

          if (res.data && res.data) {
            if (Array.isArray(res.data.outputPlanList)) {
              res.data.outputPlanList.forEach((planData, index) => {
                this.tableTitle.push({props: planData.year, name: planData.year, key: planData.year, editable: true, type: 'input', isPC: true})
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
            {a: this.language('CHANLIANG_PC','产量（PC）')}
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