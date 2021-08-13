<!--
 * @Author: moxuan
 * @Date: 2021-03-16 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="878px" @close='clearDiolog'>
    <div class="changeContent">
      <tablelist
          :tableData="drawingList"
          :tableTitle="drawingTitle"
          open-page-props="fileName"
          @openPage="downloadFile"
          :openPageGetRowData="true"
          :selection="false"
      ></tablelist>
    </div>
    <span slot="footer" class="dialog-footer">
       <iButton @click="clearDiolog">{{ language('LK_QUXIAO','取 消') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iButton, iDialog} from 'rise'
import {drawingTitle} from './data'
import {downloadFile, downloadUdFile} from "@/api/file";
import tablelist from "pages/partsrfq/components/tablelist";

export default {
  components: {
    iButton,
    iDialog,
    tablelist
  },
  props: {
    title: {type: String, default: 'LK_TUZHI'},
    value: {type: Boolean},
    repeatClick: Boolean,
    drawingList: {
      type: Array, default: () => {
        return []
      }
    }
  },
  data() {
    return {
      drawingTitle
    }
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    async downloadFile(row) {
      // const req = {
      //   applicationName: 'rise-procurereq-service',
      //   fileList: [row.fileName]
      // }
      // await downloadFile(req)
      await downloadUdFile(row.uploadId)
    }
  }
}
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0 10px 20px 10px;
}
</style>

