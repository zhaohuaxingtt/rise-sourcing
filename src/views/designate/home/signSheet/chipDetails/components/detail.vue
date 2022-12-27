<!--
 * @Author: youyuan
 * @Date: 2021-11-06 18:28:10
 * @LastEditTime: 2022-12-24 12:47:24
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: MTZ定点申请单详情
 * @FilePath: \front-web\src\views\designate\home\signSheet\mtzDetails\components\detail.vue
-->
<template>
  <div>
    <iDialog :title="language('芯片定点申请单', '芯片定点申请单')" :visible.sync="value" width="85%" @close="handleCloseModal">
      <div class="optionBox">
        <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
          <el-form-item style="marginRight:68px;" :label="language('SHENQINGDANHAO', '申请单号')">
            <iInput v-model="searchForm.mtzAppId" :placeholder="language('LK_QINGSHURU','请输入')"></iInput>
          </el-form-item>
          <el-form-item style="marginRight:68px;" :label="language('LINGJIANHAO', '零件号')">
            <input-custom 
              v-model="searchForm.assemblyPartnum"
              style="width:100%"
              :editPlaceholder="language('QINGSHURU','请输入')"
              :placeholder="language('QINGSHURU','请输入')"> </input-custom>
          </el-form-item>
          <el-form-item style="marginRight:68px;" :label="language('CAIGOUYUAN', '采购员')">
            <iInput v-model="searchForm.buyer" :placeholder="language('LK_QINGSHURU','请输入')"></iInput>
          </el-form-item>
        </el-form>
        <div class="searchButton">
          <iButton  v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_CHIP_SUBMIT|芯片签字单确认" @click="handleSubmitSearch">{{language('QR', '确认')}}</iButton>
          <iButton  v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_CHIP_RESET|芯片签字单重置"  @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
        </div>
      </div>
      <el-divider style="marginTop: 20px;"></el-divider>
      <div class="contentBox" >
        <div class="tableOptionBox">
          <p class="tableTitle">{{language('DINGDIANSHENQINGLIEBIAO', '定点申请列表')}}</p>
          <iButton v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_CHIP_CHOOSE|芯片签字单选择" @click="handleSubmitChoose">{{language('XUANZE', '选择')}}</iButton>
        </div>
        <tableList
          ref="addTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          @click="handleSubmitChoose"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_CHIP_TABLE|芯片签字表格" 
          >
          <template #appType="scope">
            {{scope.row.appType=='1'?$t('定点'):$t('变更')}}
          </template>
        </tableList>
      </div>
    </iDialog>
  </div>
</template>

<script>
import {iDialog, iInput,iSelect, iButton, iMessage} from 'rise'
import tableList from '@/components/ws3/commonTable';
import {detailTableTitle as tableTitle} from './data'
import inputCustom from '@/components/inputCustom'
import {  getChipNomiList } from "@/api/designate/nomination/signsheet";

export default {
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
    iButton,
    tableList,
    inputCustom,
    iSelect
  },
  data () {
    return {
      searchForm: {},
      tableTitle,
      tableListData: [],
      selection: [],
      loading: false,
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
      this.loading = true
      getChipNomiList({
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
      this.getTableData()
    },
    // 点击重置
    handleSearchReset() {
      this.initSearchData()
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