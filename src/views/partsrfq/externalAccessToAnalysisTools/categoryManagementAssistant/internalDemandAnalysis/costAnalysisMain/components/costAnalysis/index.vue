<!--
 * @Author: youyuan
 * @Date: 2021-08-02 16:38:55
 * @LastEditTime: 2021-08-04 16:55:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalysisMain\components\costAnalysis\index.vue
-->
<template>
  <div>
    <iCard>
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language('CHENGBENJIEGOUFENXIKU', '成本结构分析库') }}</p>
        <span class="buttonBox">
          <iButton @click="clickBack">{{ language('FANHUI', '返回') }}</iButton>
        </span>
      </div>
      <div class="searchBox">
        <el-form :inline="true" :model="searchForm" :label-position="labelPosition" class="demo-form-inline">
          <el-form-item style="marginRight: 53px;" :label="language('CHAILIAOZU', '材料组')">
            <iSelect v-model="searchForm['categoryCode']" :placeholder="language('QINGXUANZECHAILIAOZU', '请选择材料组')">
               <el-option value='' label='全部'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="marginRight: 53px;" :label="language('WENJIANLEIXING', '文件类型')">
            <iSelect v-model="searchForm['fileType']" :placeholder="language('QINGXUANZEWENJIANLEIXING', '请选择文件类型')">
               <el-option value='' label='全部'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="marginRight: 53px;" :label="language('CHUANGJIANREN', '创建人')">
            <iInput v-model="searchForm['createBy']" :placeholder="language('QINGSHURUCHUANGJIANRENMINGCHENG', '请输入创建人名称')"></iInput>
          </el-form-item>
          <el-form-item class="searchButton">
            <el-button @click="handleSubmitSearch">{{language('QUEREN', '确认')}}</el-button>
            <el-button @click="handleSearchReset">{{language('CHONGZHI', '重置')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="mainContent">
        <div class="tableOptionBox">
          <p class="tableTitle">分析库列表</p>
          <iButton @click="clickDel">{{language('SHANCHU', '删除')}}</iButton>
          <iButton @click="clickAdd">{{language('XINZENG', '新增')}}</iButton>
          <iButton @click="clickEdit">{{language('BIANJI', '编辑')}}</iButton>
        </div>
        <tableList
          ref="multipleTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          openPageProps="analysis">
          <template #option="scope">
            <div class="openPage" @click="clickStick(scope.row)">
              {{scope.row.option}}
            </div>
          </template>
          <template #sort="scope">
            <div class="stickIcon" @click="clickStick(scope.row)">
              <icon v-if="scope.row.isStick"
                    style="{font-size:24px}"
                    symbol
                    name="iconliebiaoyizhiding"></icon>
              <icon v-else
                    style="{font-size:24px}"
                    symbol
                    name="iconliebiaoweizhiding"></icon>
            </div>
          </template>
        </tableList>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableData)"
          @current-change="handleCurrentChange($event, getTableData)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"/>
      </div>
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iInput, iSelect, iPagination, icon} from 'rise'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data'
import {pageMixins} from '@/utils/pageMixins';
export default {
  name: 'CostAnalysis',
  mixins: [pageMixins],
  components: {iCard, iButton, iInput, iSelect, iPagination, tableList, icon},
  data () {
    return {
      costAnalysisMainUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain',
      costAnalysisAddUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisAdd',
      searchForm: {},
      labelPosition: 'top',
      tableTitle,
      tableListData: [],
      loading: true,
    }
  },
  created() {
    this.initTestData()
  },
  methods: {
    // 初始化测试数据
    initTestData() {
      this.tableListData = [
        {id: 1, analysis: '材料组编号-名称-YYYY/MM/DD', materialGroup: '编号-名称', createBy: 'Name', createDate: 'YYYY-MM-DD', option: '预览', lastUpdateDate: 'YYYY-MM-DD', isStick: true},
        {id: 2, analysis: '材料组编号-名称-YYYY/MM/DD', materialGroup: '编号-名称', createBy: 'Name', createDate: 'YYYY-MM-DD', option: '预览', lastUpdateDate: 'YYYY-MM-DD', isStick: false},
        {id: 3, analysis: '材料组编号-名称-YYYY/MM/DD', materialGroup: '编号-名称', createBy: 'Name', createDate: 'YYYY-MM-DD', option: '预览', lastUpdateDate: 'YYYY-MM-DD', isStick: false},
      ]
      this.loading = false
    },
    // 获取表格数据
    getTableData() {
      
    },
    // 点击确认
    handleSubmitSearch() {

    },
    // 点击重置
    handleSearchReset() {

    },
    // 点击置顶
    clickStick(val) {
      
    },
    // 点击返回
    clickBack() {
      this.$router.push(this.costAnalysisMainUrl)
    },
    // 点击新增
    clickAdd() {
      this.$router.push(this.costAnalysisAddUrl)
    },
    // 点击编辑
    clickEdit() {

    },
    // 点击删除
    clickDel() {

    }
  }
}
</script>

<style lang='scss' scoped>
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
.searchBox {
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
      margin-right: -8px;
      margin-left: 30px;
    }
  }
}
.mainContent {
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
      margin-left: 30px;
      margin-bottom: 20px;
    }
  }
  .stickIcon:hover {
    cursor: pointer;
  }
  ::v-deep .openPage{
    position: relative;
    color: $color-blue;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
