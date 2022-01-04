<template>
   <iDialog
    :visible.sync="tipsVislble"
    width='50%'
    :title="language('BIDDING_TISHI','提示')"
    append-to-body
    class="dunsTipsDiogog"
   >
   <div>
     <span class="fontStyle">
       以下供应商DUNS号⽆法匹配，请在BDL列表确认供应商信息后，进⾏⼿⼯询报价
     </span>
    <tableList
      class="dunsTable"
      :index="true"
      :selection="false"
      :tableData="tableData"
      :tableTitle="dunsTitle"
      ></tableList>
      <div  slot="footer"  class="dialog-footer btnClass">
        <iButton @click="closedunsshow">{{language('CHONGXINXUANZE','重新选择')}}</iButton>
        <iButton @click="closeAll">{{language('LK_QUEDING','确定')}}</iButton>
      </div>
      <div style="height:20px"></div>
   </div>
   </iDialog>
</template>
<script>
import {iDialog, iButton} from "rise"
import {dunsTipsTitle as dunsTitle} from '../data'
import tableList from "@/views/partsign/editordetail/components/tableList"
export default {
  props:{
    ...iDialog.props,
    applyTable:{
        type:Array,
        default:()=>[]
      }
  },
  data() {
    return{
      tipsVislble:false,
      dunsTitle,
      tableData:[],
    }
  },
  watch(){},
  components:{iDialog, tableList, iButton},
  methods:{
    dunsshow() {
      this.tipsVislble = true
      this.tableData = this.applyTable
    },
    closedunsshow() {
      this.tipsVislble = false
    },
    closeAll() {
      this.tipsVislble = false
      this.$emit('closeshowStarMo',false)
    }
  }
}
</script>
<style scoped lang="scss">
  .dunsTipsDiogog{
    .fontStyle{
      font-size: 14px;
      font-weight: bold;
    }
    .dunsTable{
      margin: 10px 0 0 0 ;
    }
    .btnClass{
      margin: 20px 0 0 0;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>