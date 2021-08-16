<!--
 * @Author: youyuan
 * @Date: 2021-08-03 10:35:28
 * @LastEditTime: 2021-08-16 11:10:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalysisMain\components\costAnalysisAdd\index.vue
-->
<template>
  <div>
    <handleInput
    :key="modalParam.key"
    v-model="modalParam.visible"
    @handleCloseDialog="handleCancel"
    @handleSubmitDialog="handleSubmitDialog"
    />
    <iCard>
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language('CHENGBENJIEGOUFENXIKU', '分析名称') }}</p>
        <span class="buttonBox">
          <iButton @click="clickHandleInput">{{ language('SHOUGONGSHURU', '手工输入') }}</iButton>
          <iButton @click="clickBack">{{ language('FANHUIFENXIKU', '返回分析库') }}</iButton>
        </span>
      </div>
      <div class="searchBox">
        <el-form :inline="true" :model="searchForm" :label-position="labelPosition" class="demo-form-inline">
          <el-form-item style="width: 220px; marginRight: 53px;" :label="language('DINGDIANRIQI', '定点日期')">
            <iDatePicker v-model="searchForm['date']" valueFormat="yyyy-MM-dd" type="daterange"></iDatePicker>
          </el-form-item>
          <el-form-item style="width: 220px; marginRight: 53px;" :label="language('ZUIJINNCIDINGDIANSHU', '最近n次定点数（n≤50）')">
            <iInput v-positive="'num'" v-model="searchForm['nomiNum']" :placeholder="language('QINGSHURU', '请输入')"></iInput>
          </el-form-item>
          <el-form-item style="width: 220px; marginRight: 53px;" :label="language('LIUWEIHAO', '六位号')">
            <iInput v-positive="'num'" v-model="searchForm['sixNum']" :placeholder="language('QINGSHURU', '请输入')"></iInput>
          </el-form-item>
          <el-form-item class="searchButton">
            <el-button @click="handleSubmitSearch">{{language('QUEREN', '确认')}}</el-button>
            <el-button style="marginRight: -8px;" @click="handleSearchReset">{{language('CHONGZHI', '重置')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="mainContent">
        <div class="tableOptionBox">
          <p class="tableTitle">{{language('SHAIXUANJIEGUO', '筛选结果')}}</p>
          <iButton @click="clickCreate">{{language('SHENGCHENG', '生成')}}</iButton>
        </div>
        <tableList
          ref="multipleTable"
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
          :current-page='page.currPage'
          :total="page.totalCount"/>
      </div>
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iInput, iPagination, iDatePicker} from 'rise'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data'
import {pageMixins} from '@/utils/pageMixins';
import handleInput from './components/handleInput'
import { iMessage } from '@/components';
import { listNomiData } from '@/api/partsrfq/costAnalysis/index.js'
export default {
  name: 'CostAnalysis',
  mixins: [pageMixins],
  components: {iCard, iButton, iInput, iPagination, tableList, iDatePicker, handleInput},
  data () {
    return {
      costAnalysisMainUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain',
      costAnalysisUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysis',
      costAnalysisInputUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisHandleInput',
      searchForm: {
      },
      labelPosition: 'top',
      tableTitle,
      tableListData: [],
      loading: false,
      modalParam: {
        key: 0,
        visible: false,
      },
      selection: [],
    }
  },
  created() {
    // this.initTestData()
    this.getTableData()
  },
  methods: {
    // 初始化测试数据
    initTestData() {
      this.tableListData = [
        {id: 1, partsId: '123 456 789A', fsId: 'FS20-12345', supplierName: '上海汇众汽车有限公司', linie: 'XXXX', date: 'YYYY-MM-DD', carTypeProj: 'Tiguan L'},
        {id: 2, partsId: '123 456 789A', fsId: 'FS20-12345', supplierName: '上海汇众汽车有限公司', linie: 'XXXX', date: 'YYYY-MM-DD', carTypeProj: 'Tiguan L'},
        {id: 3, partsId: '123 456 789A', fsId: 'FS20-12345', supplierName: '上海汇众汽车有限公司', linie: 'XXXX', date: 'YYYY-MM-DD', carTypeProj: 'Tiguan L'},
        {id: 4, partsId: '123 456 789A', fsId: 'FS20-12345', supplierName: '上海汇众汽车有限公司', linie: 'XXXX', date: 'YYYY-MM-DD', carTypeProj: 'Tiguan L'},
      ]
      this.loading = false
    },
    // 获取表格数据
    getTableData() {
      return new Promise(resolve => {
        this.loading = true
        if(this.searchForm.nomiNum > 50) {
          iMessage.error(this.language('NOMINUMVERIFY',"输入数字不能大于50"))
          this.loading = false
          return
        }
        const params = {
          categoryCode: this.$store.state.rfq.categoryCode,
          startDate: this.searchForm.date && this.searchForm.date.length > 0 ? this.searchForm.date[0] : null,
          endDate: this.searchForm.date && this.searchForm.date.length > 0 ? this.searchForm.date[1] : null,
          nomiNum: this.searchForm.nomiNum,
          sixNum: this.searchForm.sixNum
        }
        listNomiData(params).then(res => {
          if(res && res.code == 200) {
            this.tableListData = res.data
            this.loading = false
            resolve(res.data)
          } else iMessage.error(res.desZh)
        })
      })
    },
    // 表格选中事件
    handleSelectionChange(val) {
      this.selection = val
    },
    // 点击手工输入
    clickHandleInput() {
      this.$set(this.modalParam, 'key', Math.random())
      this.$set(this.modalParam, 'visible', true)
    },
    // 点击返回分析库
    clickBack() {
      this.$router.push(this.costAnalysisUrl)
    },
    // 初始化检索条件数据
    initSearchData() {
      for(const key in this.searchForm) {
        this.searchForm[key] = null
      }
    },
    // 点击确定查询
    handleSubmitSearch() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData().then(res => {
        if (!res || res.length == 0) {
          iMessage.error(this.$t('TPZS.BQWFCXDJGSRCWHBCZQQRHCXSR'));
        }
      })
    },
    // 点击重置查询
    handleSearchReset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.initSearchData()
      this.getTableData()
    },
    // 点击生成
    clickCreate() {
      if(this.selection.length === 0) {
        iMessage.error(this.language('QINGXUANZHONGZHISHAOYITIAOSHUJU',"请选中至少一条数据"))
        return 
      }
      this.$router.push({
        path: this.costAnalysisMainUrl,
        query: {
          ...this.searchForm,
          schemeId: this.$route.query.schemeId || null,
          fsNumList: this.tableListData.map(item => item.fsNum),
        }
      })
    },
    // 取消手工输入弹窗
    handleCancel() {
      this.$set(this.modalParam, 'visible', false)
    },
    // 点击提交手工输入弹窗数据
    handleSubmitDialog(data) {
      this.$router.push({
        path: this.costAnalysisInputUrl,
        query: {
          operateLog: JSON.stringify(data)
        }
      })
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
    button {
      margin-left: 30px;
    }
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
      // margin-right: -8px;
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


