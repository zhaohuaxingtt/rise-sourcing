<!--
 * @Author: your name
 * @Date: 2021-06-24 17:51:32
 * @LastEditTime: 2021-06-25 14:14:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseList\components\reportPreview.vue
-->
<template>
  <div>
    <iDialog :title="$t('LK_VP_PORT_NO')" :visible.sync="visible" width="90%">
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
