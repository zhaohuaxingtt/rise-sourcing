<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 15:59:13
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-28 17:29:28
 * @Description: 发送FS确认弹窗
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\fsconfirm\index.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
  >
    <template slot="title">
      <div class="chosseProGroup">
        <span class="chosseProGroup-title">{{language('CHANGZHOUQICHANPINZUJINDUQUEREN','长周期产品组进度确认')}}</span>
        <iButton @click="handleConfirm" :loading="saveLoading">{{language('FASONG','发送')}}</iButton>
      </div>
    </template>
    <tableList indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading"></tableList>
  </iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
import { tableTitle } from './data'
import tableList from '../tableList'
export default {
  components: { iDialog, iButton, tableList },
  props: {
    dialogVisible: { type: Boolean, default: false },
    allData: {type:Array, default: () => []},
    selectValue: {type:Array, default: () => [{}]}
  },
  watch:{
    dialogVisible(val) {
      if(val) {
        // this.reasonDescription = ''
      }
    }
  },
  data() {
    return {
      saveLoading: false,
      tableTitle: tableTitle,
      tableLoading: false,
      tableData: [{}]
    }
  },
  methods: {
    clearDialog() {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.saveLoading = true
      this.$emit('handleConfirm', this.reasonDescription)
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>
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