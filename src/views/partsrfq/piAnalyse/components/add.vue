<!--
 * @Author: youyuan
 * @Date: 2021-08-05 21:18:14
 * @LastEditTime: 2021-09-08 14:31:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\components\index.vue
-->
<template>
  <div class="contentBox">
    <iDialog :title="language('XINZENGFENXIFANGAN', '新增分析方案')" :visible.sync="value" width="80%" @close="handleClose">
      <div class="optionBox">
        <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
          <el-form-item style="marginRight:68px" :label="language('LINGJIANHAO', '零件号')">
            <iInput v-model="searchForm['partNo']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('RFQHAOMINGCHENG', 'RFQ号-名称')">
            <iInput v-model="searchForm['rfq']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item class="searchButton">
            <el-button @click="handleSubmitSearch">{{language('QR', '确认')}}</el-button>
            <el-button @click="handleSearchReset">{{language('CZ', '重置')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="targetTableBox" v-if="targetTableData.length > 0">
        <tableList
          ref="targetTable"
          :tableData="targetTableData"
          :tableTitle="addTableTitle"
          :tableLoading="loading"
          :index="true"
          @rowSelect="handleSelectTarget">
        </tableList>
      </div>
      <el-divider style="marginTop: 20px;"></el-divider>
      <div class="mainTableBox">
        <tableList
          :rowKey="null"
          :tableData="mainTableData"
          :tableTitle="addTableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectMainTable">
        </tableList>
      </div>
      <div class="flooterBox">
        <iButton @click="clickAdd">{{language('TIANJIA', '添加')}}</iButton>
        <iButton @click="clickAnalysis">{{language('JINRUFENXI', '进入分析')}}</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iInput, iButton, iMessage } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { addTableTitle } from './data'
import { getAllAddPart, savePartsInfo } from '@/api/partsrfq/piAnalysis/index'
export default {
  components: {
    iDialog,
    iInput,
    iButton,
    tableList
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      searchForm: {},
      addTableTitle,
      mainTableData: [],
      targetTableData: [],
      selectMainData: [],
      selectTargetData: [],
      loading: false,
    }
  },
  created() {
    // this.initTestData()
    this.$set(this.searchForm, 'rfq', this.$store.state.rfq.rfqId || null)
    this.getTableData()
  },
  methods: {
    // 初始化测试数据
    initTestData() {
      this.mainTableData = [
        {id: 1, fsNo: '21-12222', partNo: '20D 023 306 11A', rfq: '123231231-名称', supplierName: '上海AA汽车', factory: 'OD', cardTypeProject: 'SOP (Lavida A)', sopDate: '2021/09至2021/03'},
        {id: 2, fsNo: '21-13333', partNo: '20D 023 306 11A', rfq: '123231231-名称', supplierName: '上海AA汽车', factory: 'OD', cardTypeProject: 'SOP (Lavida A)', sopDate: '2021/09至2021/03'},
        {id: 3, fsNo: '21-14444', partNo: '20D 023 306 11A', rfq: '123231231-名称', supplierName: '上海AA汽车', factory: 'OD', cardTypeProject: 'SOP (Lavida A)', sopDate: '2021/09至2021/03'},
        {id: 4, fsNo: '21-15555', partNo: '20D 023 306 11A', rfq: '123231231-名称', supplierName: '上海AA汽车', factory: 'OD', cardTypeProject: 'SOP (Lavida A)', sopDate: '2021/09至2021/03'},
      ]
      this.loading = false
    },
    // 获取主表格数据
    getTableData() {
      this.loading = true
      const params = {
        partsId: this.searchForm.partNo || null,
        rfqId: this.searchForm.rfq || null
      }
      getAllAddPart(params).then(res => {
        if(res && res.code == 200) {
          this.mainTableData = res.data
          this.selectTargetData.map(targetObj => {
            const index = res.data.findIndex(item => item.fsId = targetObj.fsId)
            res.data.splice(index, index + 1)
          })
          this.loading = false
        } else iMessage.error(res.desZh)
      })
    },
    // 选中目标表格数据
    handleSelectTarget(val) {
      this.selectTargetData = val
    },
    // 选中主表格数据
    handleSelectMainTable(val) {
      this.selectMainData = val
    },
    // 点击添加按钮
    clickAdd() {
      this.targetTableData = this.targetTableData.concat(this.selectMainData)
      this.selectTargetData = this.selectTargetData.concat(this.selectMainData)
      this.selectMainData.forEach(item => {
        const index = this.mainTableData.findIndex(mainItem => mainItem == item)
        this.mainTableData.splice(index, index + 1)
      })
      this.selectMainData = []
      this.$nextTick(() => {
        this.renderTargetTable()
      })
    },
    // 默认选中target表格数据
    renderTargetTable() {
      this.selectTargetData.forEach(item => {
        this.$refs.targetTable.$refs.dataTable.toggleRowSelection(item, true)
      })
    },
    // 点击进入分析
    clickAnalysis() {
      if(this.selectTargetData && this.selectTargetData.length == 0) {
        iMessage.error(this.language('QINGXUANZHONGSHUJU','请选中数据'))
        return
      }
      savePartsInfo(this.selectTargetData).then(res => {
        if(res && res.code == 200) {
          this.$router.push({
            path: '/sourcing/partsrfq/piAnalyseDetail',
            query: {
              batchNumber: res.data
            }
          })
        } else iMessage.error(res.desZh)
      })
    },
    // 点击确定检索
    handleSubmitSearch() {
      this.getTableData()
    },
    // 点击重置检索
    handleSearchReset() {
      for(const key in this.searchForm) {
        this.searchForm[key] = null
      }
      this.$set(this.searchForm, 'rfq', this.$store.state.rfq.rfqId || null)
      this.getTableData()
    },
    // 关闭弹窗
    handleClose() {
      this.$emit('handleCloseAddModal')
    }
  }
}
</script>

<style lang='scss' scoped>
.contentBox {
  position: relative;
  .optionBox {
    .searchButton {
      margin-top: 50px;
      float: right;
      z-index: 100;
      button {
        width: 100px;
        height: 35px;
        border: none;
        background-color: #EEF2FB;
        font-weight: bold;
        color: #1660F1;
        font-size: 16px;
      }
    }
  }
  .contentBox {
    margin-top: 48px;
    padding-bottom: 30px;
    .tableOptionBox {
      .tableTitle {
        display: inline;
        font-weight: bold;
        font-size: 16px;
        color: #000;
      }
      button {
        float: right;
        z-index: 100;
        margin-bottom: 20px;
      }
    }
  }
  .targetTableBox {
    ::v-deep .el-table .el-table__body-wrapper {
      min-height: auto;
    }
  }
  .mainTableBox {
    padding-bottom: 80px;
  }
  .flooterBox {
    position: absolute;
    bottom: 10px;
    right: 40px;
  }
}
 
</style>
