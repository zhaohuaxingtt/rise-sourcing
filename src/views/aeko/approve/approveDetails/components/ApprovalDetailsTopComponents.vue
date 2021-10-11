<template>
 <div class="margin-bottom25" style="display: flex;justify-content: space-between;align-items: center" >
   <span class="akeoTitle">Aeko号:AE19221</span>
   <div style="display: flex;justify-content: space-between;align-items: center" >
     <iNavMvp  :lev="2" :list="subNavList" :lang="true" routerPage class="nav-sub" />
     <i-button class="margin-left25">查看已审批</i-button>
     <i-button class="margin-left25">AEKO详情</i-button>
     <log-button class="margin-left25"/>
     <icon @click.native="gotoDBhistory"  symbol name="icondatabaseweixuanzhong" class="log-icon margin-left20 cursor myLogIcon"></icon>
   </div>
 </div>
</template>

<script>
import { iNavMvp, icon,iButton } from "rise"
import LogButton from "./LogButton";
export default {
  name: "ApprovalDetailsComponents",
  components:{
    LogButton,
    iNavMvp,
    icon,
    iButton
  },
  data(){
    return {
      subNavList: [
        {
          value: 1,
          name: "审批单",
          message: 0,
          url: "/aeko/AEKOApprovalDetails/Approvalform",
          activePath: "/aeko/AEKOApprovalDetails/Approvalform",
          key: "审批单",
        },
        {
          value: 2,
          name: "CBD汇总",
          message: 0,
          url: "/aeko/AEKOApprovalDetails/CBDSummary",
          activePath: "/aeko/AEKOApprovalDetails/CBDSummary",
          key: "CBD汇总",
        },
        {
          value: 3,
          name: "审批附件",
          message: 0,
          url: "#",
          activePath: "#",
          key: "审批附件",
        },
      ],
    }
  },
  methods:{
    gotoDBhistory(){}
  }
}
</script>

<style scoped lang="scss">
 .akeoTitle{
   font-size: 20px;
   font-family: Arial;
   font-weight: bold;
   align-items: center;
   color: #000000;

 }
.myLogIcon{
  width: 21px;
  height: 21px;
}
.margin-left25{
  margin-left: 25px !important;
}
</style>