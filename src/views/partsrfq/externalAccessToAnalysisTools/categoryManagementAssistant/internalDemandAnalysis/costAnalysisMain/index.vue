<!--
 * @Author: youyuan
 * @Date: 2021-08-02 15:24:14
 * @LastEditTime: 2021-08-04 15:35:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalysis\index.vue
-->
<template>
  <div>
    <iCard>
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language('CHENGBENJIEGOUFENXITUXITONGSHAIXUAN', '成本结构分析图-系统筛选') }}</p>
        <span class="buttonBox">
          <iButton @click="clickEdit">{{ language('BIANJI', '编辑') }}</iButton>
          <iButton @click="clickAnalysis">{{ language('FENXIKU', '分析库') }}</iButton>
          <iButton @click="clickSave">{{ language('BAOCUN', '保存') }}</iButton>
          <iButton @click="clickBack">{{ language('FANHUI', '返回') }}</iButton>
        </span>
      </div>
      <div class="mainContent">
        <el-row :gutter="20">
          <el-col :span="10">
            <costChar/>
          </el-col>
          <el-col :span="14">
            <tableList
              :tableData="tableListData"
              :tableTitle="tableTitle"
              :tableLoading="false"
              :index="true"
              :max-height="600"
            >
            </tableList>
          </el-col>
        </el-row>
      </div>
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton} from 'rise'
import costChar from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain/components/char'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data';
export default {
  name: 'CostAnalysisMain',
  components: {iCard, iButton, costChar, tableList},
  data () {
    return {
      tableTitle,
      tableListData: [],
    }
  },
  created() {
    this.initTestData()
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
    },
    // 点击编辑按钮
    clickEdit() {

    },
    // 点击分析库按钮
    clickAnalysis() {

    },
    // 点击保存按钮
    clickSave() {

    },
    // 点击返回按钮
    clickBack() {
      
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
.mainContent {
  margin: 20px 0;
}
</style>
