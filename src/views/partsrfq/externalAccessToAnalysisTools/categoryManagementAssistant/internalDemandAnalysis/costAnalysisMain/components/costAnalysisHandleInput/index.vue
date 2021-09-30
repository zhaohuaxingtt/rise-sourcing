<!--
 * @Author: youyuan
 * @Date: 2021-07-30 15:59:20
 * @LastEditTime: 2021-09-30 10:40:51
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalyHandleInput.vue
-->
<template>
  <div id="content">
    <iCard style="height: 850px;">
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language('CHENGBENJIEGOUFENXITUSHOUGONG', '成本结构分析图-手工输入') }}</p>
        <span class="buttonBox">
          <iButton @click="clickEdit">{{ language('BIANJI', '编辑') }}</iButton>
          <iButton @click="clickAnalysis">{{ language('FENXIKU', '分析库') }}</iButton>
          <iButton @click="clickSave" :loading="downloadButtonLoading">{{ language('BAOCUN', '保存') }}</iButton>
          <iButton @click="clickBack">{{ language('FANHUI', '返回') }}</iButton>
        </span>
      </div>
      <div class="mainContent">
        <el-row :gutter="20">
          <el-col :span="16">
            <costChar :pieWidth="['40%','70%']" left="5%" :width="800" :height="500" :chartData="pieData" />
          </el-col>
          <el-col :span="8">
            <p class="formTitle">{{language('SHUZHI', '数值')}}</p>
            <el-form ref="form" :model="form" label-position="left" label-width="200px">
              <el-form-item :label="language('YUANCAILIAOSANJIANCHENGBEN', '原材料/散件成本')">
                <iInput class="form-item" v-model="form.material + '%'" disabled></iInput>
              </el-form-item>
              <el-form-item :label="language('ZHIZAOCHENGBEN', '制造成本')">
                <iInput class="form-item" v-model="form.production + '%'" disabled></iInput>
              </el-form-item>
              <el-form-item :label="language('BAOFEICHENGBEN', '报废成本')">
                <iInput class="form-item" v-model="form.scrap + '%'" disabled></iInput>
              </el-form-item>
              <el-form-item :label="language('GUANLIFEI', '管理费')">
                <iInput class="form-item" v-model="form.manage + '%'" disabled></iInput>
              </el-form-item>
              <el-form-item :label="language('QITAFEIYONG', '其他费用')">
                <iInput class="form-item" v-model="form.other + '%'" disabled></iInput>
              </el-form-item>
              <el-form-item :label="language('LIRUN', '利润')">
                <iInput class="form-item" v-model="form.profit + '%'" disabled></iInput>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </iCard>
    <handleInput :key="modalParam.key" :data="operateLog" v-model="modalParam.visible" @handleCloseDialog="handleCancel" @handleSubmitDialog="handleSubmitDialog" />
    <saveModal :key="saveModalParams.key" v-model="saveModalParams.visible" @checkSchemeName="checkSchemeName" />
  </div>
</template>

<script>
import { iCard, iButton, iInput, iMessage, iMessageBox } from 'rise'
import { downloadPdfMixins } from '@/utils/pdf';
import handleInput from '../costAnalysisAdd/components/handleInput'
import saveModal from '../save'
import costChar from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain/components/char'
import { getCostStructureAnalysisByName, fetchSave } from '@/api/partsrfq/costAnalysis/index.js'
export default {
  name: 'CostAnalysisHandleInput',
  components: { iCard, iButton, iInput, handleInput, costChar, saveModal, iMessageBox },
  mixins: [downloadPdfMixins],
  data() {
    return {
      overViewUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/overView',
      costAnalysisUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysis',
      costAnalysisInputUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisHandleInput',
      form: {},
      operateLog: this.$route.query.operateLog || null,
      pieData: [],
      downloadButtonLoading: false,
      oldSchemeId: this.$route.query.schemeId || null,
      targetSchemeId: null,
      schemeName: null,
      modalParam: {
        key: 0,
        visible: false
      },
      saveModalParams: {
        key: 0,
        visible: false
      },
    }
  },
  created() {
    if (this.operateLog) {
      this.initData()
    }
  },
  methods: {
    // 初始化数据
    initData() {
      const operateLogData = JSON.parse(this.operateLog)
      this.form = operateLogData
      for (const key in operateLogData) {
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
          value: operateLogData[key]
        })
      }
    },
    // 点击编辑按钮
    clickEdit() {
      this.modalParam = {
        ...this.modalParam,
        key: Math.random(),
        visible: true
      }
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
    },
    // 校验方案名称
    async checkSchemeName(schemeName) {
      this.schemeName = schemeName
      this.targetSchemeId = null
      this.$set(this.saveModalParams, 'visible', false)
      setTimeout(() => {
        getCostStructureAnalysisByName({ name: schemeName }).then(res => {
          if (res && res.code == 200) {
            if (res.data) {
              //名称校验重复
              this.targetSchemeId = res.data.id
              iMessageBox(this.language('COVERCONFIRM', '此分析方案/报告名称已存在，是否覆盖？'), this.language('TISHI', '提示'), { cancelButtonText: this.language('LK_QUXIAO', '取 消'), confirmButtonText: this.language('LK_QUEDING', '确定') }).then(_ => {
                this.createPdfAndSave()
              })
            } else {
              //名称校验不重复
              this.createPdfAndSave()
            }
          } else iMessage.error(res.desZh)
        })
      }, 500);
    },
    // 创建pdf并保存数据
    createPdfAndSave() {
      this.createPdf().then(pdf => {
        if (!pdf) {
          iMessage.error(this.language('CHUANGJIANPDFSHIBAI', '创建PDF失败'))
          return
        }
        const operateLog = {
          ...this.form
        }
        const params = {
          id: this.targetSchemeId,
          oldId: this.oldSchemeId,
          schemeName: this.schemeName,
          analysisType: "2",//手工
          categoryCode: this.$store.state.rfq.categoryCode,
          fileType: "2",
          operateLog: JSON.stringify(operateLog),
          reportFileName: pdf.downloadName,
          reportName: this.schemeName,
          reportUrl: pdf.downloadUrl,
        }
        fetchSave(params).then(res => {
          if (res && res.code == 200) iMessage.success(res.desZh)
          else iMessage.error(res.desZh)
        })
      })
    },
    // 生成PDF
    createPdf() {
      return new Promise(resolve => {
        this.downloadButtonLoading = true
        const pdfParam = {
          domId: 'content',
          pdfName: this.schemeName,
        }
        this.getDownloadFileAndExportPdf(pdfParam).then(res => {
          this.downloadButtonLoading = false
          resolve(res)
        })
      })
    },
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
.mainContent {
  margin: 50px 50px;
  .formTitle {
    font-weight: bold;
    font-size: 20px;
    line-height: 100px;
  }
  .form-item {
    width: 80%;
  }
  ::v-deep .el-input .el-input__inner {
    text-align: center;
  }
}
</style>

