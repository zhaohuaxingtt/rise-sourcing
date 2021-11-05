<!--
 * @Author: youyuan
 * @Date: 2021-08-05 21:18:14
 * @LastEditTime: 2021-09-22 13:46:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\components\index.vue
-->
<template>
  <div class="contentBox">
    <iDialog :title="language('ZIDINGYI', '自定义')" :visible.sync="value" width="80%" @close="handleClose">
      <div class="optionBox">
        <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
          <el-form-item style="marginRight:68px" :label="language('LINGJIANHAO', '零件号')">
            <iInput v-model="searchForm['partsId']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('RFQHAOMINGCHENG', 'RFQ号-名称')">
            <iInput v-model="searchForm['rfqId']" :placeholder="language('QINGSHURU','请输入')"></iInput>
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
          :tableTitle="customTableTitle"
          :tableLoading="false"
          :index="true"
          :maxHeight="300"
          @rowSelect="handleSelectTarget">
          <template #isShow="scope">
            <div @click="changeStatus(scope.row)" class="statusBox">
              <icon symbol name="iconxianshi" class="statusIcon" v-if="scope.row.isShow" />
            </div>
            <div @click="changeStatus(scope.row)" class="statusBox">
              <icon symbol name="iconyincang" class="statusIcon" v-if="!scope.row.isShow" />
            </div>
          </template>
          <template #sort="scope">
            <span @click="clickMoveDown(scope.row)">
              <icon symbol name="iconpaixu-xiangxia" v-if="checkShowSortIcon(scope.row.index, 'ptdown')" class="sortIcon" />
            </span> 
              <icon symbol name="iconpaixu-xiangxiajinzhi" v-if="checkShowSortIcon(scope.row.index, 'jzdown')" class="sortIcon"/>
            <span @click="clickMoveUp(scope.row)">
              <icon symbol name="iconpaixu-xiangshang" v-if="checkShowSortIcon(scope.row.index, 'pttop')" class="sortIcon" />
            </span>
              <icon symbol name="iconpaixu-xiangshangjinzhi" v-if="checkShowSortIcon(scope.row.index, 'jztop')" class="sortIcon"/>
          </template>
        </tableList>
      </div>
      <el-divider style="marginTop: 20px;"></el-divider>
      <div class="mainTableBox">
        <tableList
          :rowKey="null"
          :tableData="mainTableData"
          :tableTitle="customTableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectMainTable">
        </tableList>
      </div>
      <div class="flooterBox">
        <iButton :disabled="!selectMainData || selectMainData.length == 0" @click="clickAdd">{{language('TIANJIA', '添加')}}</iButton>
        <iButton @click="clickSave">{{language('BAOCUN', '保存')}}</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iInput, iButton, icon, iMessage } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { customTableTitle } from './data'
import { getAllAddPart, getCustomParts, editCustomParts } from '@/api/partsrfq/piAnalysis/index'
export default {
  components: {
    iDialog,
    iInput,
    iButton,
    icon,
    tableList
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    batchNumber: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      searchForm: {},
      customTableTitle,
      mainTableData: [],
      targetTableData: [],
      selectMainData: [],
      selectTargetData: [],
      loading: false,
      // batchNumber: this.$route.query.batchNumber || null
    }
  },
  created() {
    // this.initTestData()
    this.getCustomPartData()
    
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
    // 获取全量零件数据
    getAllPartData() {
      this.loading = true
      const params = {
        partsId: this.searchForm.partsId || null,
        rfqId: this.searchForm.rfqId || null
      }
      getAllAddPart(params).then(res => {
        if(res && res.code == 200) {
          this.targetTableData.map(targetObj => {
            const index = res.data.findIndex(item => item.fsId == targetObj.fsId)
            if(index > -1) res.data.splice(index, 1)
          })
          this.mainTableData = res.data
          this.loading = false
        } else iMessage.error(res.desZh)
      })
    },
    // 获取已有零件数据
    getCustomPartData() {
      this.loading = true
      const params = {
        batchNumber: this.batchNumber || null
      }
      getCustomParts(params).then(res => {
        if(res && res.code == 200) {
          this.targetTableData = res.data
          this.selectTargetData = res.data
          this.loading = false
          this.getAllPartData()
          this.$nextTick(_ => {
            this.selectTargetData.map(item => {
              this.$refs.targetTable.$refs.dataTable.toggleRowSelection(item, true)
            })
          })
        } else iMessage.error(res.desZh)
      })
    },
    // 点击确定检索
    handleSubmitSearch() {
      this.getAllPartData()
    },
    // 点击重置检索
    handleSearchReset() {
      for(const key in this.searchForm) {
        this.searchForm[key] = null
      }
      this.getAllPartData()
    },
    // 点击添加按钮
    clickAdd() {
      this.selectMainData.map((item, index) => {
        item['isShow'] = true
        const maxSort = this.getCrrentMax(index)
        item['sort'] = maxSort + 1
        const i = this.mainTableData.findIndex(mainItem => mainItem == item)
        this.mainTableData.splice(i, 1)
      })
      this.targetTableData = this.targetTableData.concat(this.selectMainData)
      this.selectTargetData = this.selectTargetData.concat(this.selectMainData)
      this.renderTargetTable()
    },
    // 点击保存
    clickSave() {
      if(this.selectTargetData && this.selectTargetData.length == 0) {
        iMessage.error(this.language('QINGXUANZHONGSHUJU','请选中数据'))
        return
      }
      const params = {
        partsList: this.selectTargetData,
        batchNumber: this.batchNumber
      }
      editCustomParts(params).then(res => {
        if(res && res.code == 200) {
          this.$emit('handleSaveCustom')
        } else iMessage.error(res.desZh)
      })
    },
    // 获取当前最大排序号
    getCrrentMax(index) {
      let maxSortObj = window._.maxBy(this.targetTableData, function(o) { return o.sort });
      if(!maxSortObj) {
        maxSortObj = {sort: 0}
      }
      return maxSortObj.sort + index
    },
    // 选中目标表格事件
    handleSelectTarget(val) {
      this.selectTargetData = val
    },
    // 选中主表格数据
    handleSelectMainTable(val) {
      this.selectMainData = val
    },
    // 默认选中target表格数据
    renderTargetTable() {
      this.$nextTick(() => {
        this.selectTargetData.forEach(item => {
          this.$refs.targetTable.$refs.dataTable.toggleRowSelection(item, true)
        })
      })
    },
    // 改变是否显示状态
    changeStatus(row) {
      row.isShow = !row.isShow
      const dataIndex = this.targetTableData.findIndex(item => item.id == row.id)
      this.targetTableData.splice(dataIndex, 1, row)
    },
    // 判断排序图标显示
    checkShowSortIcon(index, code) {
      if(index == 0) {
        switch (code) {
          case 'ptdown':
            return true
          case 'jzdown':
            return false
          case 'pttop':
            return false
          case 'jztop':
            return true
        }
      } else if(index == this.targetTableData.length - 1) {
        switch (code) {
          case 'ptdown':
            return false
          case 'jzdown':
            return true
          case 'pttop':
            return true
          case 'jztop':
            return false
        }
      } else {
        switch (code) {
          case 'ptdown':
            return true
          case 'jzdown':
            return false
          case 'pttop':
            return true
          case 'jztop':
            return false
        }
      }
    },
    //向上移
    clickMoveUp(row) {
      const index1 = row.index
      const index2 = index1 - 1
      this.targetTableData.splice(index2,1,...this.targetTableData.splice(index1, 1 , this.targetTableData[index2]))
    },
    // 向下移
    clickMoveDown(row) {
      const index1 = row.index
      const index2 = index1 + 1
      this.targetTableData.splice(index2,1,...this.targetTableData.splice(index1, 1 , this.targetTableData[index2]))
    },
    // 点击关闭
    handleClose() {
      this.$emit('handleCloseCustom')
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
    .statusBox {
      &:hover {
        cursor: pointer;
      }
      .statusIcon {
        font-size: 20px;
      }
    }
    .sortIcon {
      font-size: 18px;
      margin: 0 8px;
      &:hover {
        cursor: pointer;
      }
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
