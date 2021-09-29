<!--
 * @Author: your name
 * @Date: 2021-08-11 14:17:10
 * @LastEditTime: 2021-09-29 10:13:57
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
    <iTableList :tableData="tableData"
                :tableTitle="confirmTableHead"
                class="table-footerStyle"
                radio
                @handleSelectionChange="handleSelectionChange"
                @handleSelect="handleSelect">
      <template slot='isCalculate'
                slot-scope="scope">
        <div v-if="scope.row.isCalculate==='Y'"
             style="color:#5993FF">
          {{scope.row.isCalculate}}
        </div>
        <div v-else>
          {{scope.row.isCalculate}}
        </div>
      </template>
    </iTableList>
    <div slot="footer"
         class="dialog-footer">
      <iButton @click="handleSearchSure">{{language('QUEDING','确定')}}</iButton>
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
  data () {
    return {
      tableData: [],
      confirmTableHead,
      selectData: []
    }
  },
  props: {
    modalVisible: { type: Boolean },
    computeModalData: {
      type: Array,
      default: () => {
        return []
      }
    },
    index: {
      type: Number
    }
  },
  watch: {
    computeModalData: {
      handler (val) {
        if (val) {
          val.forEach((value, index) => {
            value.index = index + 1
          })
          this.tableData = [...val]
        }
      },
    }
  },
  created () {
    console.log(this.confirmTableHead, "confirmTableHead")
  },
  methods: {
    clearDiolog () {
      this.$emit('input', false);
    },
    handleSelectionChange (val) {
      this.selectData = val
    },
    handleSelect(val){

    },
    handleSearchSure () {
      console.log(this.index)
      this.modalVisible = false
      this.$emit('selectData', this.selectData, this.index);
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