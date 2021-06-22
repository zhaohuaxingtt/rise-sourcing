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
     111
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iButton} from 'rise';
import {downloadPDF} from '../../../../../../utils/pdf';

export default {
  components: {
    iDialog,
    iButton
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
        pdfName: 'TIA Overview',
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

}


</style>
