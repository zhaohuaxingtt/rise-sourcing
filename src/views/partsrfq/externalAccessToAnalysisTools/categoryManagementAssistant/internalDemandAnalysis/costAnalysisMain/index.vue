<!--
 * @Author: youyuan
 * @Date: 2021-08-02 15:24:14
 * @LastEditTime: 2021-08-19 16:12:45
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
            <costChar left="20%" :width="750" :chartData="pieData"/>
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
      <saveModal :key="saveModalParams.key" v-model="saveModalParams.visible" @checkSchemeName="checkSchemeName"/>
      <coverConfirm :key="coverConfirmParams.key" v-model="coverConfirmParams.visible" @handleCover="handleCover" @handleCancelCover="handleCancelCover"/>
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iMessage} from 'rise'
import costChar from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain/components/char'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data';
import { downloadPdfMixins } from '@/utils/pdf';
import { getTotalCbdData, listNomiData, getCostStructureAnalysisByName, fetchSave} from '@/api/partsrfq/costAnalysis/index.js'
import saveModal from './components/save'
import coverConfirm from './components/coverConfirm'
export default {
  name: 'CostAnalysisMain',
  components: {iCard, iButton, costChar, saveModal, coverConfirm, tableList},
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
      saveModalParams: {
        key: 0,
        visible: false
      },
      coverConfirmParams: {
        key: 0,
        visible: false
      },
      oldSchemeId: this.$route.query.schemeId || null,
      targetSchemeId: null,
      schemeName: null
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
        fsList: this.$route.query.fsNumList || [],
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
          for(const key in res.data) {
            let name = null
            switch (key) {
              case 'manage':
                name = '管理费'
                break;
              case 'material':
                name = '原材料/散件'
                break;
              case 'other':
                name = '其他费用'
                break;
              case 'production':
                name = '制造成本'
                break;
              case 'profit':
                name = '利润'
                break;
              case 'scrap':
                name = '报废成本'
                break;
            }
            this.pieData.push({
              name: name,
              value: res.data[key]
            })
          }
        } else iMessage.error(res.desZh)
      })
    },
    // 选中表格事件
    handleSelectionChange(val) {
      this.selection = val
    },
    // 点击编辑按钮
    clickEdit() {
      this.$router.push({
        path: this.costAnalysisAddUrl,
        query: {
          schemeId: this.oldSchemeId,
          operateLog: this.$route.query.operateLog || null
        }
      })
    },
    // 点击分析库按钮
    clickAnalysis() {
      this.$router.push(this.costAnalysisUrl)
    },
    // 点击保存按钮
    clickSave() {
      this.$set(this.saveModalParams, 'key', Math.random())
      this.$set(this.saveModalParams, 'visible', true)
    },
    // 点击返回按钮
    clickBack() {
      this.$router.push(this.overViewUrl)
    },
    // 生成PDF
    createPdf() {
      return new Promise(resolve => {
        this.downloadButtonLoading = true
        const pdfParam = {
          domId: 'content',
          pdfName: 'costAnalysis',
        }
        this.getDownloadFileAndExportPdf(pdfParam).then(res => {
          this.downloadButtonLoading = false
          resolve(res) 
        })
      })
    },
    // 校验方案名称
    checkSchemeName(schemeName) {
      this.schemeName = schemeName
      this.targetSchemeId = null
      getCostStructureAnalysisByName({name: schemeName}).then(res => {
        this.$set(this.saveModalParams, 'visible', false)
        if(res && res.code == 200) {
          if(res.data) {
            //名称校验重复
            this.targetSchemeId = res.data.id
            this.$set(this.coverConfirmParams, 'key', Math.random())
            this.$set(this.coverConfirmParams, 'visible', true)
          } else {
            //名称校验不重复
            this.createPdfAndSave()
          }
        } else iMessage.error(res.desZh)
      })
    },
    // 覆盖
    handleCover() {
      this.coverConfirmParams.visible = false
      this.createPdfAndSave()
    },
    // 取消覆盖
    handleCancelCover() {
      this.coverConfirmParams.visible = false
    },
    // 创建pdf并保存数据
    createPdfAndSave() {
      this.createPdf().then(pdf => {
        console.log('pdf', pdf);
        if(!pdf) {
          iMessage.error(this.language('CHUANGJIANPDFSHIBAI', '创建PDF失败'))
          return
        }
        const operateLog = {
          analysisType: "1",
          fsList: this.tableListData.map(item => item.fsNum),
          startDate: this.$route.query.startDate || null,
          endDate: this.$route.query.endDate || null,
          nomiNum: this.$route.query.nomiNum || null,
          sixNum: this.$route.query.sixNum || null,
        }
        const params = {
          id: this.targetSchemeId,
          oldId: this.oldSchemeId,
          schemeName: this.schemeName,
          analysisType: "1",//系统
          categoryCode: this.$store.state.rfq.categoryCode,
          fileType: "1",
          operateLog: JSON.stringify(operateLog),
          reportFileName: pdf.downloadName,
          reportName: pdf.downloadName,
          reportUrl: pdf.downloadUrl,
        }
        fetchSave(params).then(res => {
          if(res && res.code == 200) iMessage.success(res.desZh)
          else iMessage.error(res.desZh)
        })
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
