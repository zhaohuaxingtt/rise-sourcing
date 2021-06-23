<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-23 10:34:18
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <!--查找零件-->
  <iDialog :title="$t('TPZS.CZLJ')" :visible.sync="value" width="95%" @close="clearDiolog">
    <searchDialog />
    <el-divider></el-divider>
    <tableDialog />
    <div slot="footer" class="dialog-footer">
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise';
import searchDialog from './searchDialog.vue';
import tableDialog from './tableDialog.vue';


export default {
  components: {
    iDialog,
    searchDialog,
    tableDialog,
  },
  props: {
    value: { type: Boolean },
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
</style>
