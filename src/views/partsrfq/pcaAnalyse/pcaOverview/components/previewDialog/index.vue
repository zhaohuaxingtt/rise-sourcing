<template>
  <!--预览-->
  <iDialog
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
  >
    <div slot="title">
      <span class="font18 font-weight">报告名称</span>
      <div class="floatright margin-right40">
        <iButton>{{ $t('LK_XIAZAI') }}</iButton>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <barChart chartHeight="700px"/>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iButton} from 'rise';
import barChart from './components/barChart';

export default {
  components: {
    iDialog,
    iButton,
    barChart,
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
  .left{
    width: 50%;
  }
}


</style>
