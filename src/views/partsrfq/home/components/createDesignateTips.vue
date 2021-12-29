<template>
  <iDialog
  :visible.sync="tipsVislble"
  class="createDesignateTips"
  @close="sure"
  :title="language('BIDDING_TISHI','提示')"
  :close-on-click-modal="false"
  >
    <div>
      <span class="fontStyle">
       {{language('YIXIALINGJIANCAIGOUXIANGMUWEIGUANLIANSTARTMONITORJILUQINGWANCHENGGUANLIANHOUYICHUGAILINGJIANCAIGOUXIANGMUHOUZAICHUANGIANDINGDIANSHENQING','以下零件采购项目未关联StartMonitor记录，请完成关联，或移除该零件采购项目后再创建定点申请')}}
     </span>
    </div>
    <tableList
      v-show="tipsVislble"
      class="dunsTable"
      :index="true"
      :selection="false"
      :tableData="tableData"
      :tableTitle="tableTitle"
      ></tableList>
    <footer class="footerBtn">
      <iButton @click="sure">{{language('QUEDING','确定')}}</iButton>
    </footer>
    <div style="height:20px"></div>
  </iDialog>
</template>
<script>
import tableList from "@/views/partsign/editordetail/components/tableList"
import {iDialog, iButton} from "rise"
import {noStarMonitorTable as tableTitle} from './data'
export default {
  components:{
    iDialog,
    tableList,
    iButton
  },
  props:{
    starMonitorTable:{
      type:Array,
      default:() =>[]
    }
  },
  data() {
    return {
      tipsTitle:"",
      tableTitle,
      tableData:[],
      tipsVislble:false
    }
  },
  watch: {
   tipsVislble(val) {
     if(val) {
       this.tableData = this.starMonitorTable
       
     }
   }
  },
  methods:{
    show() {
      this.tipsVislble = true
    },
    sure() {
      this.$emit('changeTipsDialog','starMonitor')
    },
    close() {
       this.tipsVislble = false
    }
  }
  
}
</script>
<style scoped lang="scss">
  .createDesignateTips{
    .fontStyle{
      font-size: 14px;
      font-weight: bold;
    }
    .dunsTable{
      margin: 10px 0 0 0 ;
    }
    .footerBtn{
      margin: 20px 0 0 0;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>