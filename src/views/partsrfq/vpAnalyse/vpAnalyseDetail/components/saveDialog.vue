<template>
  <iDialog
      :visible.sync="value"
      :title="$t('LK_BAOCUN')"
      width="380px"
      @close="clearDiolog"
  >
    <div>
      <div class="margin-bottom15 flex-between-center">
        <label for="">{{language('TPZS.BCZFXK','保存在分析库')}}</label>
        <el-checkbox v-model="analysisSave"></el-checkbox>
      </div>
      <iInput v-model="analysisName"
              :placeholder="language('TPZS.QSRWJMC','请输入文件名称')"/>
    </div>
    <div class="margin-top20">
      <div class="margin-bottom15 flex-between-center">
        <label for="">{{language('TPZS.BCWBK','保存为报告')}}</label>
        <el-checkbox v-model="reportSave"></el-checkbox>
      </div>
      <iInput v-model="reportName"
              :placeholder="language('TPZS.QSRWJMC','请输入文件名称')"/>
    </div>
    <div slot="footer"
         class="dialog-footer">
      <iButton type="primary" @click="save">{{$t('LK_QUEDING')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import {iButton, iDialog, iInput} from 'rise';

export default {
  props: {
    value: {type: Boolean},
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

    },
  },
};
</script>

<style scoped lang="scss">
#content {
}

</style>
