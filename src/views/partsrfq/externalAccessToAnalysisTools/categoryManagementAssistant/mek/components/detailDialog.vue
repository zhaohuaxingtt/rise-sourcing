<!--
 * @Author: your name
 * @Date: 2021-08-25 16:06:28
 * @LastEditTime: 2021-08-26 17:14:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\detailDialog.vue
-->
<template>
  <iDialog :visible.sync="detailVisible"
           width="55%"
           @close="clearDiolog">
    <div slot="title"
         class="title">
      {{language('XUANZEJISUANCHEXING','选择计算车型')}}
    </div>
    <iTableList :tableData="detailsData"
                :tableTitle="confirmTableHead"
                :selection="false"
                class="table-footerStyle">
    </iTableList>
  </iDialog>
</template>

<script>
import { iButton, iDialog } from 'rise'
import iTableList from '@/components/iTableList'
import { confirmTableHead } from './data1'
export default {
  components: {
    iButton, iDialog,
    iTableList
  },
  props: {
    detailVisible: { type: Boolean },
    detailsData: {
      type: Array,
      default: () => {
        return []
      }
    }
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