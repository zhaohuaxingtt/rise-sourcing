<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 15:59:13
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-30 14:27:08
 * @Description: 发送FS确认弹窗
 * @FilePath: \front-sourcing\src\views\project\schedulingassistant\progroup\components\fsconfirm\index.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="fsDialog"
  >
    <template slot="title">
      <div class="chosseProGroup">
        <span class="chosseProGroup-title">{{language('CHANGZHOUQICHANPINZUJINDUQUEREN','长周期产品组进度确认')}}</span>
        <iButton @click="handleConfirm" :loading="saveLoading">{{language('FASONG','发送')}}</iButton>
      </div>
    </template>
    <tableList height="400" border indexKey :tableTitle="tableTitle" :tableData="tableList" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @handleSelectChange="handleSelectChange"></tableList>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import { tableTitle } from './data'
import tableList from '../tableList'
export default {
  components: { iDialog, iButton, tableList },
  props: {
    dialogVisible: { type: Boolean, default: false },
    tableList: {type: Array, default: () => []},
    cartypeProId: {type:String},
    type: {type:String}
  },
  data() {
    return {
      saveLoading: false,
      tableTitle: tableTitle,
      tableLoading: false,
      buyer: '',
      fsOptions: {},
      selectData: [],
      tableData: tableList
    }
  },
  methods: {
    handleSelectChange(val, row) {
      this.$set(row, 'fs', row.selectOption.find(item => item.value === val).label)
    },
    handleSelectionChange(val) {
      this.selectData = val
    },
    clearDialog() {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      if (this.selectData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据'))
        return
      }
      if (this.selectData.some(item => !item.fsId)) {
        iMessage.warn(this.selectData.filter(item => !item.fsId).map(item => item.productGroupZh).join(',') + this.language('XUNJIACAIGOUYUANBUNENGWEIKONG', '询价采购员不能为空'))
        return
      }
      this.saveLoading = true
      this.$emit('handleConfirm', this.selectData)
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>
.fsDialog {
  ::v-deep .el-dialog {
    min-height: 80%;
    padding-bottom: 30px;
  }
}
.chosseProGroup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  &-title {
    font-size: 18px;
    font-weight: 600;
    color: #000
  }
}
</style>