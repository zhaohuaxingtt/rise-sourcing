<template>
  <div>
    <iDialog title="Volume Pricing报告-零件号" :visible.sync="visible" width="90%">
      <iframe :src="reportUrl" class="report"></iframe>
    </iDialog>
  </div>
</template>

<script>
import {iDialog, iButton} from 'rise'
export default {
  name: 'ReportPreview',
  components: {iDialog, iButton},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    reportUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.report {
  width: 100%;
  height: 700px;
}
 
</style>
