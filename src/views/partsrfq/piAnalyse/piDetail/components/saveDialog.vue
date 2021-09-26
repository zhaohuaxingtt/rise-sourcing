<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-09-24 14:31:53
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iDialog :visible.sync="value" :title="$t('LK_BAOCUN')" width="380px" @close="clearDiolog">
    <div>
      <div class="margin-bottom15 flex-between-center">
        <label for="">{{ language('TPZS.BCZFXK', '保存在分析库') }}</label>
        <el-checkbox v-model="analysisSave"></el-checkbox>
      </div>
      <iInput v-model="analysisName" :placeholder="language('TPZS.QSRWJMC','请输入文件名称')" />
    </div>
    <div class="margin-top20">
      <div class="margin-bottom15 flex-between-center">
        <label for="">{{ language('TPZS.BCWBK', '保存为报告') }}</label>
        <el-checkbox v-model="reportSave"></el-checkbox>
      </div>
      <iInput v-model="reportName" :placeholder="language('TPZS.QSRWJMC','请输入文件名称')" />
    </div>
    <div slot="footer" class="dialog-footer">
      <iButton type="primary" @click="save">{{ $t('LK_QUEDING') }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iButton, iDialog, iInput, iMessage } from 'rise';

export default {
  props: {
    value: { type: Boolean },
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    iButton,
    iDialog,
    iInput,
  },
  data() {
    return {
      analysisSave: true,
      reportSave: false,
      analysisName: '',
      reportName: '',
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    save() {
      if (this.$route.query.type === 'add' && !this.analysisSave) {
        iMessage.warn(this.language('TPZS.MYFXFAQGXBCZFXK', '没有分析方案，请勾选保存在分析库'));
        return false
      }
      const req = {
        analysisSave: this.analysisSave,
        reportSave: this.reportSave,
        analysisName: this.analysisName,
        reportName: this.reportName,
      };
      this.$emit('handleSaveDialog', req);
    },
    initData() {
      //1 内部 0外部
      const rfqId = this.dataInfo.rfqId ? this.dataInfo.rfqId : '';
      const rfqName = this.dataInfo.rfqName ? this.dataInfo.rfqName : '';
      const partsId = this.dataInfo.partsId ? this.dataInfo.partsId : '';
      const partsNameZh = this.dataInfo.partsNameZh ? this.dataInfo.partsNameZh : '';
      if (this.$store.state.rfq.entryStatus === 1) {
        this.analysisName = this.dataInfo.analysisSchemeName ? this.dataInfo.analysisSchemeName : `${rfqId}_${rfqName}`;
        this.reportName = `${rfqId}_${rfqName}_${window.moment(new Date()).
          format('YYYYMMDD')}`;
      } else {
        this.analysisName = this.dataInfo.analysisSchemeName ? this.dataInfo.analysisSchemeName : `${partsId}_${partsNameZh}`;
        this.reportName = `${partsId}_${partsNameZh}_${window.moment(new Date()).
          format('YYYYMMDD')}`;
      }
    },
  },
  watch: {
    value(val) {
      val && this.initData();
    },
  },
};
</script>

<style scoped lang="scss">
</style>
