<template>
  <!--预览-->
  <iDialog
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
  >
    <div slot="title">
      <span class="font18 font-weight">{{ $t('TPZS.BAOGAOMINGCHENG') }}</span>
      <div class="floatright margin-right40">
        <iButton @click="handleDownload">{{ $t('LK_XIAZAI') }}</iButton>
      </div>
    </div>
    <div class="content" id="content">
      <div class="left">
        <barChart chartHeight="700px"/>
      </div>
      <div class="right">
        <theTable/>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iButton} from 'rise';
import barChart from './components/barChart';
import theTable from './components/theTable';
import {downloadPDF, dataURLtoFile} from '../../../../../../utils/pdf';
import {uploadFile} from '@/api/file/upload';

export default {
  components: {
    iDialog,
    iButton,
    barChart,
    theTable,
  },
  props: {
    value: {type: Boolean},
  },
  data() {
    return {
      form: {
        returnReason: '',
      },
      returnReasonList: [],
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    handleDownload() {
      downloadPDF({
        idEle: 'content',
        pdfName: 'PCA Overview',
        callback: async (pdf, pdfName) => {
          const filename = pdfName + '.pdf';
          const pdffile = pdf.output('datauristring');
          const blob = dataURLtoFile(pdffile, filename);
          const formData = new FormData();
          formData.append('multipartFile', blob);
          formData.append('applicationName', 'rise');
          await uploadFile(formData);
        },
      });
    },
  },
  watch: {
    value(val) {
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
  display: flex;

  .left {
    width: 40%;
  }

  .right {
    width: 60%;
  }
}


</style>
