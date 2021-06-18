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

    </div>
  </iDialog>
</template>

<script>
import {iDialog, iButton} from 'rise';

export default {
  components: {
    iDialog,
    iButton,
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
}


</style>
