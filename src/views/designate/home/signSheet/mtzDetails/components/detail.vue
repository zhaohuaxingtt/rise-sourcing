<!--
 * @Author: youyuan
 * @Date: 2021-11-06 18:28:10
 * @LastEditTime: 2021-11-06 19:02:21
 * @LastEditors: Please set LastEditors
 * @Description: MTZ定点申请单详情
 * @FilePath: \front-web\src\views\designate\home\signSheet\mtzDetails\components\detail.vue
-->
<template>
  <div>
    <iDialog :title="language('MTZDINGDIANSHENQINGDAN', 'MTZ定点申请单')" :visible.sync="value" width="80%" @close="handleCloseModal">
      <div class="optionBox">
        <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
          <el-form-item style="marginRight:68px" :label="language('SHENQINGDANHAO', '申请单号')">
            <iInput v-model="searchForm['1']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('SHENQINGLEIXING', '申请类型')">
            
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('LIUCHENGLEIXING', '流程类型')">
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('SHENQINGZHUANGTAI', '申请状态')">
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('YUANCAILIAOPAIHAO', '原材料牌号')">
            <iInput v-model="searchForm['5']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('LINGJIANHAO', '零件号')">
            <iInput v-model="searchForm['6']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('CAIGOUYUAN', '采购员')">
            <iInput v-model="searchForm['7']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('GUANLIANDANHAO', '关联单号')">
            <iInput v-model="searchForm['8']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px" :label="language('RSDONGJIERIQI', 'RS冻结日期')">
          </el-form-item>
          <el-form-item class="searchButton">
            <iButton @click="handleSubmitSearch">{{language('QR', '确认')}}</iButton>
            <iButton @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
          </el-form-item>
        </el-form>
      </div>
      <el-divider style="marginTop: 20px;"></el-divider>
      <div class="contentBox" >
        <div class="tableOptionBox">
          <p class="tableTitle">{{language('DINGDIANSHENQINGLIEBIAO', '定点申请列表')}}</p>
          <iButton @click="handleSubmitAdd">{{language('XUANZE', '选择')}}</iButton>
        </div>
        <tableList
          ref="addTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectionChange">
        </tableList>
        <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableData)"
        @current-change="handleCurrentChange($event, getTableData)"
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
import {iDialog, iSelect, iInput, iPagination, iButton, iDatePicker, iMessage} from 'rise'
import tableList from '@/components/ws3/commonTable';
import {detailTableTitle} from './data'
import { pageMixins } from "@/utils/pageMixins";
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
    iButton,
    iDatePicker,
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
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
    },
    // 点击确定
    handleSubmitSearch() {
    },
    // 点击重置
    handleSearchReset() {
    },
    // 初始化检索条件
    initSearchData() {
      for(const key in this.searchForm) {
        this.searchForm[key] = null
      }
    },
    // 关闭弹窗
    handleCloseModal() {
      this.$emit('handleCloseModal')
    }
  }
}
</script>

<style lang='scss' scoped>
.optionBox {
  ::v-deep .demo-form-inline {
    display: flex;
  }
  .searchButton {
    width: 250px;
    text-align: right;
    margin-top: 50px;
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