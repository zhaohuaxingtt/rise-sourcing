<!--
 * @Author: Luoshuang
 * @Date: 2021-05-27 21:20:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-31 15:17:46
 * @Description: 
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\designateInfo\components\rsEEdition.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="92%"
    class="addPartsDialog"
    :title="'CSC Nomination Recommendatio'"
  >
    <rsDetail :otherPreview="true" :otherNominationType="'1'" />
  </iDialog>
</template>

<script>
import { iDialog } from 'rise'
import { fileTableTitle } from '../data'
import { pageMixins } from "@/utils/pageMixins"
import rsDetail from '@/views/designate/designatedetail/decisionData/rs'
export default {
  mixins: [pageMixins],
  components: { iDialog, rsDetail },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      tableTitle: fileTableTitle,
      tableData: []
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    height: 93%;
    .el-dialog__body {
      height: calc(100% - 80px);
      overflow: auto;
      padding: 0;
    }
  }
}
</style>