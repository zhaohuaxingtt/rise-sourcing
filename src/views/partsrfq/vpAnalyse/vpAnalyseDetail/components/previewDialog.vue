<template>
  <iDialog
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
  >
    <iButton class="downloadButton" @click="handleDownload" :loading="downloadButtonLoading">{{
        $t('LK_XIAZAI')
      }}
    </iButton>
    <div id="content">
      <div class="margin-bottom20 margin-top20 clearFloat" slot="title">
        <span class="font18 font-weight">Volume Pricing {{ this.$t('TPZS.BAOGAO') }}</span>
      </div>
      <baseInfo :dataInfo="dataInfo"/>
      <el-divider class="margin-top20 margin-bottom20"/>
      <totalUnitPriceTable :dataInfo="dataInfo" class="margin-bottom20" :showEditButton="false"/>
      <div class="chartContainer margin-top20">
        <div class="left">
          <div class="font18 font-weight margin-bottom20">Volume Pricing{{ this.$t('TPZS.QUXIAN') }}</div>
          <curveChart chartHeight="260px" :dataInfo="dataInfo"/>
        </div>
        <div class="right">
          <div class="font18 font-weight margin-bottom20">Volume Pricing{{ this.$t('TPZS.FENXI') }}</div>
          <analyzeChart :dataInfo="dataInfo"/>
        </div>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iButton, iDialog } from 'rise'
import baseInfo from './baseInfo'
import totalUnitPriceTable from './totalUnitPriceTable'
import curveChart from './curveChart'
import analyzeChart from './analyzeChart'
import { downloadPDF, dataURLtoFile } from '@/utils/pdf'
import { uploadFile } from '@/api/file/upload'
import { addVpReports } from '../../../../../api/partsrfq/vpAnalysis/vpAnalyseDetail'

export default {
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
    value: { type: Boolean },
  },
  components: {
    iButton,
    iDialog,
    baseInfo,
    totalUnitPriceTable,
    curveChart,
    analyzeChart,
  },
  data () {
    return {
      downloadButtonLoading: false,
    }
  },
  methods: {
    clearDiolog () {
      this.$emit('input', false)
    },
    handleDownload () {
      downloadPDF({
        idEle: 'content',
        pdfName: 'Volume Pricing Overview',
        callback: async (pdf, pdfName) => {
          try {
            this.downloadButtonLoading = true
            const time = new Date().getTime()
            const filename = pdfName + time + '.pdf'
            const pdfFile = pdf.output('datauristring')
            const blob = dataURLtoFile(pdfFile, filename)
            const formData = new FormData()
            formData.append('multipartFile', blob)
            formData.append('applicationName', 'rise')
            const res = await uploadFile(formData)
            const data = res.data[0]
            const req = {
              analysisSchemeId: 1,
              downloadName: data.fileName,
              downloadUrl: data.filePath,
            }
            await addVpReports(req)
            this.downloadButtonLoading = false
          } catch {
            this.downloadButtonLoading = false
          }
        },
      })
    },
  },
}
</script>

<style scoped lang="scss">
.downloadButton {
  position: absolute;
  right: 50px;
  top: 50px
}

#content {
  padding: 20px;
}

.chartContainer {
  display: flex;
  justify-content: space-between;
  height: 390px;

  .left {
    width: 42%;
    height: 100%
  }

  .right {
    width: 57%;
    height: 100%
  }
}

</style>
