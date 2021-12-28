<template>
  <iDialog
  :visible.sync="tipsVislble"
  class="createDesignateTips"
  :title="language('BIDDING_TISHI','提示')"
  :close-on-click-modal="false"
  >
    <div>
      <span class="fontStyle">
       {{language('YIXIALINGJIANCAIGOUXIANGMUWEIGUANLIANSTARTMONITORJILUQINGWANCHENGGUANLIANHOUYICHUGAILINGJIANCAIGOUXIANGMUHOUZAICHUANGIANDINGDIANSHENQING','以下零件采购项目未关联StartMonitor记录，请完成关联，或移除该零件采购项目后再创建定点申请')}}
     </span>
    </div>
    <tableList
      class="dunsTable"
      :index="true"
      :selection="false"
      :tableData="tableData"
      :tableTitle="tableTitle"
      ></tableList>
  </iDialog>
</template>
<script>
import tableList from "@/views/partsign/editordetail/components/tableList"
import {iDialog} from "rise"
import {noStarMonitorTable as tableTitle} from './data'
export default {
  components:{
    iDialog,
    tableList
  },
  data() {
    return {
      tipsTitle:"",
      tableTitle,
      tableData:[],
      tipsVislble:false
    }
  },
  methods:{
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
  }
</style>