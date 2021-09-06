<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 15:59:13
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-06 15:42:55
 * @Description: 发送FS确认弹窗
 * @FilePath: \front-web\src\views\project\schedulingassistant\part\components\fsconfirm\index.vue
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
    <div class="tableWrapper" v-if="tableListNomi.length > 0"> 
      <span class="tableTitle">{{language('DAIDINGDIAN','待定点')}}</span> 
      <tableList indexKey :tableTitle="tableTitleNomi" :tableData="tableListNomi" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChangeNomi" @handleSelectChange="handleSelectChange"></tableList> 
    </div> 
    <div class="tableWrapper" v-if="tableListKickoff.length > 0"> 
      <span class="tableTitle">{{language('DAIKICKOFF','待Kickoff')}}</span> 
      <tableList indexKey :tableTitle="tableTitleKickoff" :tableData="tableListKickoff" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChangeKickoff" @handleSelectChange="handleSelectChange"></tableList> 
    </div> 
  </iDialog> 
</template> 

<script> 
import { iDialog, iButton, iMessage } from 'rise' 
import { tableTitleNomi, tableTitleKickoff } from './data' 
import tableList from '../../../progroup/components/tableList' 
export default { 
  components: { iDialog, iButton, tableList }, 
  props: { 
    dialogVisible: { type: Boolean, default: false }, 
    tableListNomi: {type: Array, default: () => []}, 
    tableListKickoff: {type: Array, default: () => []}, 
    cartypeProId: {type:String}, 
    type: {type:String} 
  }, 
  data() { 
    return { 
      saveLoading: false, 
      tableTitleNomi: tableTitleNomi, 
      tableTitleKickoff: tableTitleKickoff, 
      tableLoading: false, 
      buyer: '', 
      fsOptions: {}, 
      selectDataNomi: [], 
      selectDataKickoff: [], 
      tableData: tableList 
    } 
  }, 
  methods: { 
    handleSelectChange(val, row) { 
      this.$set(row, 'fs', row.selectOption.find(item => item.value === val).label) 
    }, 
    handleSelectionChangeNomi(val) { 
      this.selectDataNomi = val 
    }, 
    handleSelectionChangeKickoff(val) { 
      this.selectDataKickoff = val 
    }, 
    clearDialog() { 
      this.$emit('changeVisible', false) 
    }, 
    handleConfirm() { 
      const selectData = [...this.selectDataNomi, ...this.selectDataKickoff] 
      if (selectData.length < 1) { 
        iMessage.warn(this.language('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据')) 
        return 
      } 
      if (selectData.some(item => !item.fsId)) { 
        iMessage.warn(selectData.filter(item => !item.fsId).map(item => item.partName).join(',') + this.language('XUNJIACAIGOUYUANBUNENGWEIKONG', '询价采购员不能为空')) 
        return 
      } 
      this.saveLoading = true 
      this.$emit('handleConfirm', [...this.selectDataNomi, ...this.selectDataKickoff]) 
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
.tableWrapper { 
  padding-bottom: 20px; 
  .tableTitle { 
    display: block; 
    font-size: 18px; 
    font-weight: bold; 
    color: #000; 
    padding-bottom: 10px; 
  } 
} 

</style>