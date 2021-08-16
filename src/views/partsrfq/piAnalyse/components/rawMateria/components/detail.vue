<!--
 * @Author: youyuan
 * @Date: 2021-08-05 16:41:49
 * @LastEditTime: 2021-08-16 15:48:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\components\rawMateria\components\detail.vue
-->
<template>
  <div>
    <iDialog :title="language('YUANCAILIAOXIANGQING', '原材料价格总览-原材料名称')" :visible.sync="value" width="80%">
      <div class="optionBox">
        <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
          <el-form-item style="marginRight:68px" :label="language('LINGJIANHAO', '零件号')">
            <iInput v-model="searchForm['partNo']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('CAILIAOZU', '材料组')">
            <iInput v-model="searchForm['materialGroup']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('RFQHAO', 'RFQ号')">
            <iInput v-model="searchForm['rfqNo']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('CHEXINGXIANGMU', '车型项目')">
            <iInput v-model="searchForm['cartTypeProject']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('SHIFOUEOP', '是否EOP')">
            <iSelect v-model="searchForm['isEop']" :placeholder="language('QINGXUANZE','请选择')">
              <el-option value='' label='全部'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item class="searchButton">
            <el-button @click="handleSubmitSearch">{{language('QR', '确认')}}</el-button>
            <el-button @click="handleSearchReset">{{language('CZ', '重置')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider style="marginTop: 20px;"></el-divider>
      <div class="contentBox" >
        <tableList
          ref="addTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @select="rowSelect">
          <template #isEop="scope">
            {{scope.row.isEop ? language('SHI', '是') : language('FOU', '否') }}
          </template>
        </tableList>
        <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
      </div>
    </iDialog>
  </div>
</template>

<script>
import {iDialog, iSelect, iInput, iMessage, iPagination} from 'rise'
import tableList from '@/components/ws3/commonTable';
import {detailTableTitle} from './data'
import { pageMixins } from "@/utils/pageMixins";
import { getRawMateriaDetail } from '@/api/partsrfq/piAnalysis/index'
export default {
  mixins: [pageMixins],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    materiaName: {
      type: String,
      default: null
    }
  },
  components: {
    iDialog,
    iSelect,
    iInput,
    iPagination,
    tableList
  },
  data () {
    return {
      searchForm: {},
      tableTitle: detailTableTitle,
      tableListData: [],
      loading: false
    }
  },
  created() {
    this.initTestData()
    this.getTableList()
  },
  methods: {
    // 初始化测试数据
    initTestData() {
      this.tableListData = [
        {id: 1, partNo: '33D 333 333 11A', material: '副车架', rfqNo: '51332131', cardTypeProject: 'SOP (Lavida A)', sopDate: '2020/09至2021/03', isEop: 'true', supplierName: '上海AA汽车', factory: 'OD', quotationPrice: '00000'},
        {id: 2, partNo: '33D 333 333 11A', material: '副车架', rfqNo: '51332131', cardTypeProject: 'SOP (Lavida A)', sopDate: '2020/09至2021/03', isEop: 'true', supplierName: '上海AA汽车', factory: 'OD', quotationPrice: '00000'},
        {id: 3, partNo: '33D 333 333 11A', material: '副车架', rfqNo: '51332131', cardTypeProject: 'SOP (Lavida A)', sopDate: '2020/09至2021/03', isEop: 'true', supplierName: '上海AA汽车', factory: 'OD', quotationPrice: '00000'},
        {id: 4, partNo: '33D 333 333 11A', material: '副车架', rfqNo: '51332131', cardTypeProject: 'SOP (Lavida A)', sopDate: '2020/09至2021/03', isEop: 'true', supplierName: '上海AA汽车', factory: 'OD', quotationPrice: '00000'},
      ]
      this.loading = false
    },
    // 获取表格数据
    getTableList() {
      this.loading = true
      const params = {
        pratName: this.materiaName || null,
        carTypeName: this.searchForm.cartTypeProject || null,
        isEop: this.searchForm.isEop || null,
        materialGroupName: this.searchForm.materialGroup || null,
        partsNo: this.searchForm.partNo || null,
        rfqNo: this.searchForm.rfqNo || null,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
      }
      getRawMateriaDetail(params).then(res => {
        if(res && res.code == 200) {
          this.page.totalCount = res.total
          this.tableListData = res.data
          this.loading = false
        } else iMessage.error(res.desZh)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
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
 
</style>

