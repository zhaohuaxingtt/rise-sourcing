<!--
 * @Author: youyuan
 * @Date: 2021-08-02 15:24:14
 * @LastEditTime: 2021-08-11 11:18:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalysis\index.vue
-->
<template>
  <div id="content">
    <iCard>
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language('CHENGBENJIEGOUFENXITUXITONGSHAIXUAN', '成本结构分析图-系统筛选') }}</p>
        <span class="buttonBox">
          <iButton @click="clickEdit">{{ language('BIANJI', '编辑') }}</iButton>
          <iButton @click="clickAnalysis">{{ language('FENXIKU', '分析库') }}</iButton>
          <iButton @click="clickSave" :loading="downloadButtonLoading">{{ language('BAOCUN', '保存') }}</iButton>
          <iButton @click="clickBack">{{ language('FANHUI', '返回') }}</iButton>
        </span>
      </div>
      <div class="mainContent">
        <el-row :gutter="20">
          <el-col :span="10">
            <costChar left="20%" :width="700" :chartData="pieData"/>
          </el-col>
          <el-col :span="14">
            <tableList
              :tableData="tableListData"
              :tableTitle="tableTitle"
              :tableLoading="false"
              :index="true"
              :max-height="600"
              @handleSelectionChange="handleSelectionChange"
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
import { iMessage } from '@/components';
import {downloadPdfMixins} from '@/utils/pdf';
import { getTotalCbdData, listNomiData, fetchSave} from '@/api/partsrfq/costAnalysis/index.js'
export default {
  name: 'CostAnalysisMain',
  components: {iCard, iButton, costChar, tableList},
  mixins: [downloadPdfMixins],
  data () {
    return {
      overViewUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/overView',
      costAnalysisUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysis',
      costAnalysisAddUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisAdd',
      tableTitle,
      tableListData: [],
      pieData: [],
      selection: [],
      downloadButtonLoading: false,
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
    },
    // 获取表格数据
    getTableData() {
      const params = {
        categoryCode: this.$store.state.rfq.categoryCode,
        partNumList: this.$route.query.fsNumList || [],
      }
      listNomiData(params).then(res => {
        if(res && res.code == 200) {
          this.tableListData = res.data
          this.getPieData()
        } else iMessage.error(res.desZh)
      })
    },
    // 获取pie数据（cbd）
    getPieData() {
      const params = {
        categoryCode: this.$store.state.rfq.categoryCode,
        fsList: this.tableListData.map(item => item.fsNum)
      }
      getTotalCbdData(params).then(res => {
        if(res && res.code == 200) {
          for(const key in res.data)
          this.pieData.push({
            name: key,
            value: res.data[key]
          })
        } else iMessage.error(res.desZh)
      })
    },
    // 选中表格事件
    handleSelectionChange(val) {
      this.selection = val
    },
    // 点击编辑按钮
    clickEdit() {
      if(this.selection.length != 1) {
        iMessage.error('请选中一条数据')
        return
      }
      this.$router.push({
        path: this.costAnalysisAddUrl,
        query: this.selection[0]})
    },
    // 点击分析库按钮
    clickAnalysis() {
      this.$router.push(this.costAnalysisUrl)
    },
    // 点击保存按钮
    clickSave() {
      const pdf = this.createPdf()
      if(!pdf) {
        iMessage.error(this.language('CHUANGJIANPDFSHIBAI', '创建PDF失败'))
        return
      }
      const params = {
        analysisType: 1,//系统
        categoryCode: this.$store.state.rfq.categoryCode,
        reportFileName: pdf.downloadName,
        reportName: pdf.downloadName,
        reportUrl: pdf.downloadUrl,
        
      }
      fetchSave().then(res => {
        
      })
    },
    // 点击返回按钮
    clickBack() {
      this.$router.push(this.overViewUrl)
    },
    // 生成PDF
    createPdf() {
      this.downloadButtonLoading = true
      const pdfParam = {
        domId: 'content',
        pdfName: 'costAnalysis',
      }
      this.getDownloadFileAndExportPdf(pdfParam).then(res => {
        this.downloadButtonLoading = false
        return res
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
.mainContent {
  margin: 20px 0;
}
</style>
