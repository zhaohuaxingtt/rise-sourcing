<!--
 * @Author: your name
 * @Date: 2021-06-24 17:51:32
 * @LastEditTime: 2021-08-13 15:07:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseList\components\reportPreview.vue
-->
<template>
  <div>
    <iDialog :title="reportTitle" :visible.sync="visible" width="90%" @close="handleClose">
      <iframe :src="reportUrl" class="report"></iframe>
    </iDialog>
  </div>
</template>

<script>
import {iDialog} from 'rise'
export default {
  name: 'ReportPreview',
  components: {iDialog},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    reportUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    reportTitle() {
      return this.title 
    }
  },
  data () {
    return {

    }
  },
  created() {

  },
  methods: {
    handleClose() {
      this.$emit('handleCloseReport')
    }
  }
}
</script>

<style lang='scss' scoped>
.report {
  width: 100%;
  height: 700px;
}
 
</style>
