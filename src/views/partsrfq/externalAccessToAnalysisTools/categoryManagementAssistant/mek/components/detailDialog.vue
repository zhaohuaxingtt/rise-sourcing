<!--
 * @Author: your name
 * @Date: 2021-08-25 16:06:28
 * @LastEditTime: 2021-09-28 15:41:34
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
      {{detailMotorName+'-'+detailFactory}}
    </div>
    <iTableList :tableData="detailsData"
                :tableTitle="confirmTableHead"
                :selection="false"
                class="table-footerStyle">
    </iTableList>
    <div slot="footer"
         class="dialog-footer">
      <!-- <iButton @click="handleSearchSure">{{language('QUEDING','确定')}}</iButton> -->
    </div>
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
    },
    detailMotorName: {
      type: String
    },
    detailFactory: {
      type: String
    }
  },
  watch: {
    detailsData: {
      handler (val) {
        console.log(val)
      }
    },
    detailMotorName (val) {
      console.log(val)
    },
    detailFactory (val) {
      console.log(val)
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