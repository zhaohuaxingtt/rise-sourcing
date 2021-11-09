<!--
 * @Author: youyuan
 * @Date: 2021-11-06 18:28:10
 * @LastEditTime: 2021-11-09 17:10:06
 * @LastEditors: Please set LastEditors
 * @Description: MTZ定点申请单详情
 * @FilePath: \front-web\src\views\designate\home\signSheet\mtzDetails\components\detail.vue
-->
<template>
  <div>
    <iDialog :title="language('MTZDINGDIANSHENQINGDAN', 'MTZ定点申请单')" :visible.sync="value" width="85%" @close="handleCloseModal">
      <div class="optionBox">
        <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
          <el-form-item style="marginRight:68px; width: 180px;" :label="language('SHENQINGDANHAO', '申请单号')">
            <iInput v-model="searchForm['mtzAppId']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px; width: 180px;" :label="language('SHENQINGLEIXING', '申请类型')">
            <iSelect v-model="searchForm['10']">
              <el-option :value="item.code"
                        :label="item.message"
                        v-for="item in applyTypeDropDownList"
                        :key="item.code">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="marginRight:68px; width: 180px;" :label="language('LIUCHENGLEIXING', '流程类型')">
            <iSelect v-model="searchForm['flowType']">
              <el-option :value="item.code"
                        :label="item.message"
                        v-for="item in LcTypeList"
                        :key="item.code">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="marginRight:68px; width: 180px;" :label="language('SHENQINGZHUANGTAI', '申请状态')">
            <iSelect v-model="searchForm['appStatus']">
              <el-option :value="item.code"
                        :label="item.message"
                        v-for="item in SqztTypeList"
                        :key="item.code">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="marginRight:68px; width: 180px;" :label="language('YUANCAILIAOPAIHAO', '原材料牌号')">
            <iInput v-model="searchForm['materialCode']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px; width: 180px;" :label="language('LINGJIANHAO', '零件号')">
            <iInput v-model="searchForm['assemblyPartnum']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px; width: 180px;" :label="language('CAIGOUYUAN', '采购员')">
            <iInput v-model="searchForm['7']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px; width: 180px;" :label="language('GUANLIANDANHAO', '关联单号')">
            <iInput v-model="searchForm['ttNominateAppId']" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px; width: 180px;" :label="language('RSDONGJIERIQI', 'RS冻结日期')">
            <!-- format="yyyy-MM-dd" -->
            <!-- value-format="yyyy-MM-dd" -->
            <iDatePicker value-format="yyyy-MM-dd" v-model="searchForm['9']"
                        type="daterange">
            </iDatePicker>
          </el-form-item>
        </el-form>
        <div class="searchButton">
          <iButton @click="handleSubmitSearch">{{language('QR', '确认')}}</iButton>
          <iButton @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
        </div>
      </div>
      <el-divider style="marginTop: 20px;"></el-divider>
      <div class="contentBox" >
        <div class="tableOptionBox">
          <p class="tableTitle">{{language('DINGDIANSHENQINGLIEBIAO', '定点申请列表')}}</p>
          <iButton @click="handleSubmitChoose">{{language('XUANZE', '选择')}}</iButton>
        </div>
        <tableList
          ref="addTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectionChange">
        </tableList>
        <!-- <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableData)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"/> -->
      </div>
    </iDialog>
  </div>
</template>

<script>
import {iDialog, iSelect, iInput, iPagination, iButton, iDatePicker, iMessage} from 'rise'
import tableList from '@/components/ws3/commonTable';
import {detailTableTitle} from './data'
import { pageMixins } from "@/utils/pageMixins";

import { getFlowTypeList, getLocationApplyStatus, getAppTypeTypeList, getTableData } from "@/api/designate/nomination/mtz"

export default {
  mixins: [pageMixins],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    params: {
      type: Array,
      default: () => []
    },
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
      selection: [],
      loading: false,

      SqTypeList:[],
      LcTypeList:[],
      SqztTypeList:[],
      applyTypeDropDownList: []
    }
  },
  created() {
    getFlowTypeList({}).then(res=>{
      this.LcTypeList = res.data;
    })
    getLocationApplyStatus({}).then(res=>{
      this.SqztTypeList = res.data;
    })
    getAppTypeTypeList({}).then(res=>{
      this.applyTypeDropDownList = res.data;
    })

    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
      this.loading = true
      getTableData({
        pageNo: 1,
        pageSize: 1000,
      }).then(res => {
        this.loading = false
        if (res && res.code == 200) {
          this.tableListData = res.data
          this.initHideTableData()
        } else iMessage.error(res.desZh)
      })
    },
    // 初始化表格数据，隐藏已被选择的数据
    initHideTableData() {
      const arr = window._.cloneDeep(this.tableListData)
      console.log('params', this.params);
      console.log('arr', arr);
      window._.remove(arr, (item) => {
        return this.params.find(selectId => selectId == item.id) 
      })
      this.$set(this, 'tableListData', arr)
      console.log('tableListData', this.tableListData);
    },
    // 选中数据
    handleSelectionChange(val) {
      this.selection = val
    },
    // 点击选择按钮，提交选中数据
    handleSubmitChoose() {
      this.$emit('handleSubmitAdd', this.selection)
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
  position: relative;
  ::v-deep .demo-form-inline {
    display: flex;
    flex-flow:wrap;
    margin-right:200px;
  }
  .searchButton {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 100;
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