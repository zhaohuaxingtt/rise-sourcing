<!--
 * @Author: your name
 * @Date: 2021-08-11 14:17:10
 * @LastEditTime: 2021-08-11 16:16:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\modalDialog.vue
-->
<template>
  <iDialog :visible.sync="modalVisible"
           width="55%"
           @close="clearDiolog">
    <div slot="title"
         class="title">
      {{language('XUANZEJISUANCHEXING','选择计算车型')}}
    </div>
    <iTableList :tableData="confirmTableData"
                :tableTitle="confirmTableHead"
                class="table-footerStyle"
                radio
                @handleSelectionChange="handleSelectionChange">
    </iTableList>
    <div slot="footer"
         class="dialog-footer">
      <iButton @click="handleSearchReset">{{language('QUEDING','确定')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iButton, iDialog } from 'rise'
import iTableList from '@/components/iTableList'
import { confirmTableHead } from './data'
export default {
  components: {
    iButton, iDialog,
    iTableList
  },
  props: {
    modalVisible: { type: Boolean },
  },
  data () {
    return {
      confirmTableHead
    }
  },

  created () {
    console.log(this.confirmTableHead, "confirmTableHead")
  },
  methods: {
    clearDiolog () {
      this.$emit('input', false);
    },
    handleSelectionChange () {

    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  width: 220px;
}
::v-deep .el-col-8 .el-form-item {
  display: flex;
  justify-content: flex-end;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
::v-deep .el-form-item__content {
  width: 100%;
}
</style>