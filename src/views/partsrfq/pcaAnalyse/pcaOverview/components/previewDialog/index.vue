<template>
  <!--预览-->
  <iDialog
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
  >
    <div slot="title">
      <span class="font18 font-weight">{{ fileName }}</span>
      <!--      <div class="floatright margin-right40">
              <iButton @click="handleDownload">{{ $t('LK_XIAZAI') }}</iButton>
            </div>-->
    </div>
    <div class="content" id="content">
      <iframe :src="fileUrl" width="100%" height="700px"/>
    </div>
  </iDialog>
</template>

<script>
import {iDialog} from 'rise';

export default {
  components: {
    iDialog,
  },
  props: {
    value: {type: Boolean},
    fileUrl: {
      type: String,
      default: '',
    },
    fileName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
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

  .left {
    width: 40%;
  }

  .right {
    width: 60%;
  }
}


</style>
