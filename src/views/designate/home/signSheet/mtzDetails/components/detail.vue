<!--
 * @Author: youyuan
 * @Date: 2021-11-06 18:28:10
 * @LastEditTime: 2021-12-05 15:17:12
 * @LastEditors:  
 * @Description: MTZ定点申请单详情
 * @FilePath: \front-web\src\views\designate\home\signSheet\mtzDetails\components\detail.vue
-->
<template>
  <div>
    <iDialog :title="language('MTZDINGDIANSHENQINGDAN', 'MTZ定点申请单')" :visible.sync="value" width="85%" @close="handleCloseModal">
      <div class="optionBox">
        <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
          <el-form-item style="marginRight:50px;" :label="language('SHENQINGDANHAO', '申请单号')">
            <i-select v-model="searchForm['mtzAppId']"
                      clearable
                      filterable
                      :placeholder="language('XUANZE', '选择')"
                    >
                <el-option
                    v-for="item in getMtzGenericAppId"
                    :key="item.code"
                    :label="item.codeMessage"
                    :value="item.code">
                </el-option>
            </i-select>
          </el-form-item>
          <el-form-item style="marginRight:50px;" :label="language('YUANCAILIAOPAIHAO', '原材料牌号')">
            <i-select v-model="searchForm['materialCode']"
                      clearable
                      filterable
                      :placeholder="language('XUANZE', '选择')"
                    >
                <el-option
                    v-for="item in getRawMaterial"
                    :key="item.code"
                    :label="item.codeMessage"
                    :value="item.code">
                </el-option>
            </i-select>
          </el-form-item>
          <el-form-item style="marginRight:50px;" :label="language('LINGJIANHAO', '零件号')">
            
            <!-- <iInput v-model="searchForm['assemblyPartnum']" :placeholder="language('QINGSHURU','请输入')"></iInput> -->
            <input-custom 
              v-model="searchForm.assemblyPartnum"
              style="width:100%"
              :editPlaceholder="language('QINGSHURU','请输入')"
              :placeholder="language('QINGSHURU','请输入')"> </input-custom>
          </el-form-item>
          <el-form-item style="marginRight:50px;" :label="language('CAIGOUYUAN', '采购员')">
            <i-select v-model="searchForm['buyer']"
                      clearable
                      filterable
                      :placeholder="language('XUANZE', '选择')"
                    >
                <el-option
                    v-for="item in getCurrentUser"
                    :key="item.code"
                    :label="item.message"
                    :value="item.code">
                </el-option>
            </i-select>
          </el-form-item>
          <el-form-item style="marginRight:50px;" :label="language('GUANLIANDANHAO', '关联单号')">
            <i-select v-model="searchForm['ttNominateAppId']"
                      clearable
                      filterable
                      :placeholder="language('XUANZE', '选择')"
                    >
                <el-option
                    v-for="item in getNominateAppIdList"
                    :key="item.code"
                    :label="item.message"
                    :value="item.code">
                </el-option>
            </i-select>
          </el-form-item>
        </el-form>
        <div class="searchButton">
          <!-- <iButton @click="handleSubmitSearch">{{language('QR', '确认')}}</iButton> -->
          <iButton  v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_MTZ_SUBMIT|MTZ签字单确认" @click="handleSubmitSearch">{{language('QR', '确认')}}</iButton>
          <!-- <iButton @click="handleSearchReset">{{language('CZ', '重置')}}</iButton> -->
          <iButton  v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_MTZ_RESET|MTZ签字单重置"  @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
        </div>
      </div>
      <el-divider style="marginTop: 20px;"></el-divider>
      <div class="contentBox" >
        <div class="tableOptionBox margin-bottom20">
          <p class="tableTitle">{{language('DINGDIANSHENQINGLIEBIAO', '定点申请列表')}}</p>
          <iButton v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_MTZ_CHOOSE|MTZ签字单选择" @click="handleSubmitChoose">{{language('XUANZE', '选择')}}</iButton>
          <!-- <iButton  @click="handleSubmitChoose">{{language('XUANZE', '选择')}}</iButton> -->
        </div>
        <tableList
          ref="addTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          @click="handleSubmitChoose"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_MTZ_TABLE|MTZ签字表格" 
          >
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
import {iDialog, iInput,iSelect, iPagination, iButton, iMessage} from 'rise'
import tableList from '@/components/ws3/commonTable';
import {detailTableTitle} from './data'
import { pageMixins } from "@/utils/pageMixins";
import inputCustom from '@/components/inputCustom'
import { getTableData,
    getMtzGenericAppId,
    getRawMaterial,
    getCurrentUser,
    getNominateAppIdList
} from "@/api/designate/nomination/mtz"

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
    iInput,
    iPagination,
    iButton,
    tableList,
    inputCustom,
    iSelect
  },
  data () {
    return {
      searchForm: {},
      tableTitle: detailTableTitle,
      tableListData: [],
      selection: [],
      loading: false,

      getMtzGenericAppId:[],//申请单号
      getRawMaterial:[],
      getCurrentUser:[],
      getNominateAppIdList:[],//关联申请单
    }
  },
  created() {
    getMtzGenericAppId({}).then(res=>{
      this.getMtzGenericAppId = res.data;
    })
    getRawMaterial({}).then(res=>{
      this.getRawMaterial = res.data;
    })
    getCurrentUser({}).then(res=>{
      this.getCurrentUser = res.data;
    })
    getNominateAppIdList({}).then(res=>{
      this.getNominateAppIdList = res.data;
    })
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
      this.loading = true
      getTableData({
        // pageNo: 1,
        // pageSize: 1000,
        ...this.searchForm,
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
      window._.remove(arr, (item) => {
        return this.params.find(selectId => selectId == item.id) 
      })
      this.$set(this, 'tableListData', arr)
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
      // this.page.currPage = 1
      this.getTableData()
    },
    // 点击重置
    handleSearchReset() {
      this.initSearchData()
      // this.page.currPage = 1
      // this.page.pageSize = 10
      this.getTableData()
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