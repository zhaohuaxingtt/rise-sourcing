<!--
 * @Author: Luoshuang
 * @Date: 2021-05-27 21:20:41
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-29 16:36:15
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
import { iDialog, iButton, iSelect, iInput, iPagination } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { fileTableTitle } from '../data'
import { pageMixins } from "@/utils/pageMixins"
import rsDetail from '@/views/designate/designatedetail/decisionData/rs'
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iSelect, iInput, iPagination, tableList, rsDetail },
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