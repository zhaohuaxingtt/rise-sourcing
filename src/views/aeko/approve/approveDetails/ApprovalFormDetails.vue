<!--审批单--->
<template>
  <div>
    <div class="aeko-wrap" v-if="$route.query.key =='rsAeko'">
      <div class="aeko-title" :class="item.value == numberKey?'aekoC':''" v-for="(item,index) in subNavListAeko" :key="index" @click="aekoClick(item)">
        <span>{{$t(item.key)}}</span>
      </div>
    </div>
    <div v-if="$route.query.key !=='rsAeko'" v-permission.auto="AEKO_APPROVAL_FORM_DETAILS_PAGE|AEKO审批单详情">
        <AEKOApprovalComponents v-if="[1,2].includes(transmitObj.option)" :audit-items="auditItems" :transmit-obj="transmitObj" @refreshForm="refreshForm($event)"/>
        <CoverStatementComponents class="margin-top20" :audit-cover-status="auditCoverStatus" :audit-cover="auditCover"/>
        <RecommendationTablePendingApprovalComponents v-permission.auto="AEKO_APPROVAL_RECOMMENDATION_Table|AEKO审批单推荐表" v-show="Array.isArray(auditContents)&&auditContents.length>0" :audit-contents="auditContents" :audit-content-status="auditContentStatus" :auditContentStatusDesc="auditContentStatusDesc" class="margin-top20"/>
    </div>
    <div v-else>
      <div v-show="numberKey == 1">
        <AEKOApprovalComponents v-if="[1,2].includes(transmitObj.option)" :audit-items="auditItems" :transmit-obj="transmitObj" @refreshForm="refreshForm($event)"/>
        <CoverStatementComponents class="margin-top20" :audit-cover-status="auditCoverStatus" :audit-cover="auditCover"/>
        <RecommendationTablePendingApprovalComponents v-show="Array.isArray(auditContents)&&auditContents.length>0" :audit-contents="auditContents" :audit-content-status="auditContentStatus" :auditContentStatusDesc="auditContentStatusDesc" class="margin-top20"/>
      </div>
      <div v-show="numberKey == 2" style="margin-top:20px;">
        <approvaRecord :aekoInfo="aekoInfo"></approvaRecord>
      </div>
    </div>
  </div>
</template>

<script>
import AEKOApprovalComponents from "./components/AEKOApprovalComponents";
import approvaRecord from "./components/approvaRecord";
import CoverStatementComponents from "./components/CoverStatementComponents";
import RecommendationTablePendingApprovalComponents from "./components/RecommendationTablePendingApprovalComponents";
import {queryAKEOApprovalForm, getAKEOApprovalForm,getAekoCheckAuditForm, getAekoCheckPreview} from "@/api/aeko/approve";
import  { iMessage } from "rise"

export default {
  name: "ApprovalFormDetails",
  components: {RecommendationTablePendingApprovalComponents, CoverStatementComponents, AEKOApprovalComponents,approvaRecord},
  data() {
    return {
      auditItems: [],//审批数据
      auditCoverStatus: '',//封面状态
      auditCover: [],//封面数据集合
      auditContents: [],//推荐表集合
      auditContentStatus: '',//推荐表状态
      auditContentStatusDesc: '',//推荐表状态
      transmitObj: {},
      aekoApprovalDetails: {},
      queryParams: {},

      numberKey:1,
      subNavListAeko: [
        {
          value: 1,
          name: "审批单",
          message: 0,
          // url: "/aeko/AEKOApprovalDetails/Approvalform",
          // activePath: "Approvalform",
          key: "审批单",
        },
        {
          value: 2,
          name: "审批记录",
          message: 0,
          key: "SHENPIJILU",
        },
      ],
      aekoInfo:{},
    }
  },

  created() {
    this.queryParams = this.$route.query
    let str_json = window.atob(this.queryParams.transmitObj)
    this.transmitObj = JSON.parse(decodeURIComponent(escape(str_json)))
    this.aekoInfo = this.transmitObj.aekoApprovalDetails
    this.aekoApprovalDetails = this.transmitObj.aekoApprovalDetails
    // option: 1:待审批, 2:已审批, 3: CSF分配人查看审批单, 4:Linie预览审批单, 5: AEKO查看-审批单查看
    if (this.transmitObj.option===1) {  // 查看待审批
      this.loadAKEOApprovalForm()
    } else if(this.transmitObj.option == 3){  // CSF分配人查看审批单
      this.getPreviewData(false);
    } else if (this.transmitObj.option == 4) {  // Linie 预览
      this.getPreviewData(true)
    } else if(this.transmitObj.option == 5){
      this.lookAKEOApprovalDetailFromCheck();
    } else {
      this.lookAKEOApprovalForm()
    }
  },
  methods: {
    aekoClick(data){
      if(data.value !== this.numberKey){
        this.numberKey = data.value;
      }
    },
    refreshForm(option) {
      this.transmitObj.option = option
      this.queryParams.transmitObj = window.btoa(JSON.stringify(this.transmitObj))

      this.$router.replace({
        path: '/aeko/AEKOApprovalDetails/Approvalform',
        query: this.queryParams
      })
      /*sessionStorage.setItem('AEKO-APPROVAL-DETAILS-ITEM', JSON.stringify(this.transmitObj))
      if (this.transmitObj.option == 1) {
        this.loadAKEOApprovalForm()
      } else {
        this.lookAKEOApprovalForm()
      }*/
    },

    loadAKEOApprovalForm() {
      let reqData = {
        aekoAuditType: this.aekoApprovalDetails.aekoAuditType,
        workFlowDTOS: this.aekoApprovalDetails.workFlowDTOS
      }
      queryAKEOApprovalForm(reqData).then(res => {
        if (res.code == 200) {
          this.auditItems = res.data.auditItems
          this.auditCoverStatus = res.data.auditCoverStatusDesc
          this.auditCover = res.data.auditCover
          this.auditContents = res.data.auditContents
          sessionStorage.removeItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContents`)
          sessionStorage.setItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContents`,JSON.stringify(res.data.auditContents))
          this.auditContentStatus = res.data.auditContentStatus
          this.auditContentStatusDesc = res.data.auditContentStatusDesc
          sessionStorage.removeItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContentStatusDesc`)
          sessionStorage.setItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContentStatusDesc`,res.data.auditContentStatusDesc || '')
          //获取到审批数据
          this.auditItems.forEach((item, index) => {
            item.approvalResult = 1
          })
          let fsName = res.data.auditCover.fsName.split('/').join(',')
          fsName = Array.from(new Set(fsName.split(','))).join(',')
          this.auditCover.fsName = fsName
        }
      })
    },

    lookAKEOApprovalForm() {
      let reqData = {
        aekoAuditType: this.aekoApprovalDetails.aekoAuditType,
        workFlowDTOS: this.aekoApprovalDetails.workFlowDTOS,
        approvalResult:this.aekoApprovalDetails.approvalResult
      }
      getAKEOApprovalForm(reqData).then(res => {
        if (res.code == 200) {
          this.auditItems = res.data.auditItems
          this.auditCoverStatus = res.data.auditCoverStatusDesc
          this.auditCover = res.data.auditCover
          this.auditContents = res.data.auditContents
          sessionStorage.removeItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContents`)
          sessionStorage.setItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContents`,JSON.stringify(res.data.auditContents))
          this.auditContentStatus = res.data.auditContentStatus
          this.auditContentStatusDesc = res.data.auditContentStatusDesc
          sessionStorage.removeItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContentStatusDesc`)
          sessionStorage.setItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContentStatusDesc`,res.data.auditContentStatusDesc || '')
        }
      })
    },
    // 从AEKO查看跳转过来调用的详情
    async lookAKEOApprovalDetailFromCheck(){
      const {aekoApprovalDetails={}} = this;
      const {requirementAekoId=''} = aekoApprovalDetails;
      await getAekoCheckAuditForm(requirementAekoId).then((res)=>{
        if (res.code == 200) {
          this.auditItems = res.data.auditItems
          this.auditCoverStatus = res.data.auditCoverStatusDesc
          this.auditCover = res.data.auditCover
          this.auditContents = res.data.auditContents
          sessionStorage.removeItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContents`)
          sessionStorage.setItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContents`,JSON.stringify(res.data.auditContents))
          this.auditContentStatus = res.data.auditContentStatus
          this.auditContentStatusDesc = res.data.auditContentStatusDesc
          sessionStorage.removeItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContentStatusDesc`)
          sessionStorage.setItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContentStatusDesc`,res.data.auditContentStatusDesc || '')
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    // Linie 审批单预览数据 flag: Linie 预览为true,分配人查看为false
    getPreviewData(flag){
      let params = {
        "aekoCode": this.transmitObj.aekoApprovalDetails.aekoNum,
        "isLinie": flag,
        "linieIds": this.transmitObj.aekoApprovalDetails.linieId?[this.transmitObj.aekoApprovalDetails.linieId]:[]
      }
      getAekoCheckPreview(params).then(res=>{
        if (res.code == 200) {
          this.auditItems = res.data.auditItems
          this.auditCoverStatus = res.data.auditCoverStatusDesc
          this.auditCover = res.data.auditCover || {}
          this.auditContents = res.data.auditContents
          sessionStorage.removeItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContents`)
          sessionStorage.setItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContents`,JSON.stringify(res.data.auditContents))
          this.auditContentStatus = res.data.auditContentStatus
          this.auditContentStatusDesc = res.data.auditContentStatusDesc
          sessionStorage.removeItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContentStatusDesc`)
          sessionStorage.setItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContentStatusDesc`,res.data.auditContentStatusDesc || '')
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    }
  },

}
</script>

<style scoped lang="scss">
.aeko-wrap{
  display: flex;
  justify-content: flex-end;
  margin-top: -45px;
  margin-right: 40px;

  .aeko-title{
    font-size: 19px;
    font-weight: bold;
    color:#909091;
    padding-left:20px;
    padding-right:20px;
    border-right: 1px solid #909091;
    cursor: pointer;
  }
  .aeko-title:last-child{
    border-right: none!important;
  }

  .aekoC{
    color: #1660f1!important;
  }

}
</style>