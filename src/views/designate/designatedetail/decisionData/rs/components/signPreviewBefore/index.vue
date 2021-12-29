<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2021-11-10 13:43:16
 * @LastEditors: Please set LastEditors
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
<div class="tabsBoxWrap">
  <div>
    <!-- <span class="download_btn" v-if="approve">
      <iButton @click="handleClickExport">{{language('DAOCHU', '导出')}}</iButton>
    </span> -->
    <div ref="qrCodeDiv" class="sign_swap">
      <iCard class="upload_hr">
        <div slot="header" class="headBox">
          <p class="headTitle">{{title}}</p>
          <div class="tabs_box_right" v-if="approve">
            <div class="big_text">
              <span class="samll_val">{{formData.mtzAppId}}-{{formData.appName}}</span>
            </div>
            <div class="small_text">
              <span>{{language("SHENQINGRIQI","申请日期")}}：</span>
              <span class="samll_val">{{formData.createDate}}</span>
            </div>
            <div class="small_text">
              <span>{{language("KESHI","科室")}}：</span>
              <span class="samll_val">{{formData.linieDeptName}}</span>
            </div>
            <div>
              <span>{{language("CAIGOUYUAN","采购员")}}：</span>
              <span class="samll_val">{{formData.linieName}}</span>
            </div>
          </div>
        </div>
        <el-divider class="hr_divider" />
        <div class="infor_futitle">
          <span class="big_font">Regulation:</span>
          <br />
          <span class="big_font">MTZ Payment=(Effective Price-Base Price)*Raw Material Weight*Settle accounts Quantity*Ratio</span>
          <span class="big_small">When:effective price > base price *(1+threshold)</span>
        </div>

        <p class="tableTitle">{{language('GUIZEQINGDAN', '规则清单')}}-Regulation</p>
          <tableList
            class="margin-top20"
            :tableData="mtzData.ruleTableListData"
            :tableTitle="ruleTableTitle1_1"
            :tableLoading="loadingRule"
            :index="true"
            :selection="false"
            @handleSelectionChange="handleSelectionChange">
            <template slot-scope="scope" slot="compensationPeriod">
              <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度": scope.row.compensationPeriod}}</span>
            </template>
            <template slot-scope="scope" slot="thresholdCompensationLogic">
              <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
            </template>
            <template slot-scope="scope"
                      slot="supplierId">
              <span>{{scope.row.supplierId}}</span><br/>
              <span>{{scope.row.supplierName}}</span>
            </template>
          </tableList>
        <el-divider class="margin-top20"/>
        <p class="tableTitle">{{language('LJQD', '零件清单')}}-Part List</p>
          <tableList
            class="margin-top20 over_flow_y_ture"
            :tableData="mtzData.partTableListData"
            :tableTitle="partTableTitle1_1"
            :tableLoading="loadingPart"
            :index="true"
            :selection="false"
            @handleSelectionChange="handleSelectionChange">
            <template slot-scope="scope" slot="compensationPeriod">
              <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度": scope.row.compensationPeriod}}</span>
            </template>
            <template slot-scope="scope" slot="thresholdCompensationLogic">
              <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
            </template>
            <template slot-scope="scope"
                      slot="supplierId">
              <span>{{scope.row.supplierId}}</span><br/>
              <span>{{scope.row.supplierName}}</span>
            </template>
          </tableList>
      </iCard>
      <!-- <iCard class="margin-top20">
        <div slot="header"
            class="headBox">
          <p class="headTitle">{{language('BEIZHU', '备注')}}-Remarks</p>
        </div>
        <iInput
                v-model="formData.linieMeetingMemo"
                class="margin-top10"
                :rows="8"
                :disabled="true"
                type="textarea" />
      </iCard> -->
      <iCard v-if="isMeeting && applayDateData.length>0" class="margin-top20">
          <p>{{language('SHENQINGRIQI','申请日期')}}:{{moment(new Date()).format('YYYY-MM-DD')}}</p>
          <div class="applayDateBox1">
            <div class="applayDateContent"
                v-for="(item, index) in applayDateData"
                :key="index">
              <img class="margin-left5 applayDateIcon"
               :src="item.taskStatus==='同意'?require('@/assets/images/icon/yes.png'):require('@/assets/images/icon/no.png')"
               :fit="fit" />
              <div class="applayDateContentItem">
                <span>部门：</span>
                <span class="applayDateDeptTitle">{{item.deptFullCode}}</span>
              </div>
              <div class="applayDateContentItem">
                <span>日期：</span>
                <span>{{item.endTime}}</span>
              </div>
            </div>
          </div>
        </iCard>
    </div>
  </div>
  
  <iDialog :title="language('DAOCHU', '导出')"
            :visible.sync="signPreviewType"
            v-if="signPreviewType"
            append-to-body
            width="99%"
            @close='closeRS'>
    <signPreview :mtzAppId="formData.mtzAppId" :m1="true"></signPreview>
  </iDialog>
</div>
</template>

<script>
import { iCard, icon, iInput, iButton, iMessage, iPagination,iDialog } from 'rise'
import { formList } from './data'
import tableList from '@/components/commonTable/index.vue'
import { ruleTableTitle1_1,partTableTitle1_1} from './data'
import { getAppFormInfo, pageAppRule,approvalList } from '@/api/designate/decisiondata/rs'
import { pageMixins } from '@/utils/pageMixins'
import signPreview from "./signPreview";
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    icon,
    iInput,
    iButton,
    iPagination,
    tableList,
    iDialog,
    signPreview
  },
  props:{
    RsType:{type:Boolean},
    mtzAppId: {
      type: String || Number,
      default: ""
    },
    mtzData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      formData: {},
      formList,
      ruleTableTitle1_1,
      partTableTitle1_1,
      ruleTableListData: [],
      rulePageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper',
      },
      partTableListData: [],
      partPageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper',
      },
      loadingRule:false,
      loadingPart:false,
      applayDateData: [],
      moment: window.moment,
      signPreviewType:false,
      approve:true,
      clickRulesNumber:0,
    }
  },
  watch: {
    mtzObject(newVlue,oldValue){
      
    }
  },
  created() {
    this.initApplayDateData()
    this.getAppFormInfo()
    // this.getPageAppRule()
    // this.getPagePartMasterData()
  },
  computed: {
    mtzObject(){
      return this.$store.state.location.mtzObject;
    },
    title() {
      let res = ''
      switch (this.formData.flowType) {
        case 'MEETING':
          // 上会
          res = 'CSC 定点推荐 - MTZ  CSC Nomination Recommendation - MTZ'
          break;
        case 'SIGN':
          // 流转
          res = '流转定点推荐 - MTZ Nomination Recommendation - MTZ'
          break;
        case 'FILING':
          // 备案
          res = '备案定点推荐 - MTZ Nomination Recommendation - MTZ'
          break;
        default:
          break;
      }
      return res 
    },
    isMeeting() {
      return this.formData.flowType == 'MEETING' || this.formData.flowType == 'SIGN'
    }
  },
  methods: {
    closeRS(){
      this.signPreviewType = false;
    },
    handleClickExport(){
      this.signPreviewType = true;
    },
    initApplayDateData () {
      approvalList({ mtzAppId: this.mtzObject.mtzAppId || this.mtzAppId }).then(res => {
        if (res?.code === '200') {
          let data = res.data
          this.applayDateData = data
        } else {
          iMessage.error(res.desZh)
        }
      })

    },
    // 获取申请单信息
    getAppFormInfo() {
      getAppFormInfo({
        mtzAppId:this.mtzAppId
      }).then(res => {
        if(res && res.code == 200) {
          this.formData = res.data

          if(Number(this.$route.query.approve) == 1){
            if(res.data.appStatus == "流转中" || res.data.appStatus == "复核中"){
              this.approve = false;
            }
          }
        } else iMessage.error(res.desZh)
      })
    },
  }
}
</script>

<style lang='scss' scoped>
$tabsInforHeight: 35px;

.tabsBoxWrap{
  // position:fixed!important;
  // left:0;
  // right:0;
  // top:0;
  // right:0;
  width:100%;
  height:100%;
  z-index:2000;
  overflow-y:auto;
  background:white!important;
}
.sign_swap{
  width:100%;
  height:100%;
}
.tableTitle {
  display: inline-block;
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  display: flex;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
.applayDateBox1 {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin-top: 20px;
}
.applayDateIcon {
  margin-top: 10px;
  width:33px;
  height:33px;
}
.applayDateContentItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 20px;
  font-size: 16px;
  .applayDateDeptTitle {
    font-weight: bold;
  }
}
.applayDateContent {
  display: inline-block;
  background-color: #cdd4e2;
  height: 178px;
  width: 16%;
  margin: 10px 0.3% 0;
  border-radius: 15px;
  text-align: center;
}
.tabsBoxInfor {
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .inforDiv {
    width: 29%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 20px;
    span {
      font-size: 15px;
    }
    .inforText {
      font-size: 14px;
      padding:10px 10px;
      width: 68%;
      min-height: $tabsInforHeight;
      height:auto;
      background: #f8f8fa;
      text-align: center;
    }
  }
}

.download_btn{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top:20px;
  padding-bottom:20px;
  padding-right:20px;
}

::v-deep .el-form{
  .el-table{
    .cell{
      padding:0!important;

      span{
        margin-right:0px!important;
      }
    }
  }
}



.tabs_box_right{
  .samll_title{
    width:80px;
  }
  .small_text{
    float:left;
  }
  div{
    display: flex;
    align-items: flex-start;
    margin-right:20px;
  }
  span{
    display: inline-block;
    font-size: 15px!important;
  }
}
.hr_divider{
  margin:0 1.5rem 0 0;
}
::v-deep .cardHeader{
  padding:1.875rem 1.5625rem 0 2.4rem!important;
}
.infor_futitle{
  padding:0.5rem 0;
  font-size:15px!important;
  line-height:25px;
  .big_font{
    font-weight: bold;
  }
  .big_small{
    padding-left:15px;
  }
}
.upload_hr{
  ::v-deep .cardBody{
    padding-top:0px!important;
  }
}
.over_flow_y_ture{
  ::v-deep .el-table__body-wrapper{
    max-height: 300px;
    overflow-y: auto;
  }
}

::v-deep .el-form-item__content{
  line-height: 20px!important;
}
</style>
