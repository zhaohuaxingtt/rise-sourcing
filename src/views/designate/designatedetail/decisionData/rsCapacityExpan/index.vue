<!--
 * @Author: haojiang
 * @Date: 2021-07-06 22:11:41
 * @LastEditTime: 2021-10-15 15:09:52
 * @LastEditors: Hao,Jiang
 * @Description: 决策资料 - 扩产能
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rsCapacityExpan/index.vue
-->
<template>
  <iCard class="caexpan" title="Recommendation Nomination Application Investment for 2nd Tooling">
    <div class="caexpan-title"></div>
    <basicForm :form.sync="basicFormData" />
    <!-- 扩产能表格 -->
    <capacity :data="capacityExpPlanVOList" />
    <!-- BentchMark Investment -->
    <investment :data="InvestmentData" class="margin-top20" />
    <!-- Part infomation -->
    <partInfomation :data="PartTableData" class="margin-top20" />
    <!-- Economic Assessment -->
    <ecoAssessment :data="assesmentList" :timeList="yearList" class="margin-top20" />
    <!-- footer -->
    <div class="caexpan-footer">
      <span><strong>{{language('TOTALINVESTMENTVAT','Total investment(Excl VAT)不含税')}}：</strong>
      {{totalInvestment}}
        <!-- {{language('TOTALINVESTMENTVATINFO','小于100万，签到CS,大于100万，签到M')}} -->
      </span>
      <span><strong>Developing period：</strong>
      <span class="caexpan-content"></span>
        <!-- {{language('DEVELOPINGPERIODINFO','研发周期，系统不管，单位是周')}} -->
      </span>
    </div>
    <div class="caexpan-sign margin-top20">
      <el-row class="margin-top30" gutter="100" v-if="showMC">
        <el-col :span="8">
          <div class="signItem"><span class="label">M:</span><span class="line"></span></div>
        </el-col>
        <el-col :span="8">
          <div class="signItem" style="text-align: right"><span class="label">C:</span><span class="line"></span></div>
        </el-col>
      </el-row>
      <div class="signItem margin-top30"><span class="label">CS:</span><span class="line"></span></div>
      <el-row class="margin-top30" gutter="100">
        <el-col :span="8">
          <div class="signItem"><span class="label">Commodity:</span><span class="line"></span></div>
        </el-col>
        <el-col :span="8">
          <div class="signItem" style="text-align: right"><span class="label">CSS:</span><span class="line"></span></div>
        </el-col>
        <el-col :span="8" style="padding-right: 0px;">
          <div class="signItem" style="text-align: right"><span class="label">CFC:</span><span class="line"></span></div>
        </el-col>
      </el-row>
    </div>
    <div class="caexpan-approvedate margin-top20">
      <div class="signItem"><span class="label">Approve Date:</span><span class="line"></span></div>
    </div>
    
  </iCard>
</template>

<script>
import basicForm from './components/basicForm'
import capacity from './components/capacity'
import investment from './components/investment'
import partInfomation from './components/partInfomation'
import ecoAssessment from './components/ecoAssessment'
// import tablelist from "@/views/designate/supplier/components/tableList";
// import {
//   InvestmentTableTitle,
//   PartTableTitle
// } from './components/data'
import {iCard, iMessage} from 'rise'
import { 
  getCapacityExtPlan
} from '@/api/designate/nomination/capacityExt'

export default {
  components: {
    basicForm,
    capacity,
    partInfomation,
    investment,
    ecoAssessment,
    // tablelist,
    iCard
  },
  data() {
    return {
      basicFormData: {},
      // 扩产能计划
      capacityExpPlanVOList: [],
      tableLoading: false,
      InvestmentData: [],
      PartTableData: [],
      yearList: [],
      assesmentList: [],
      totalInvestment:''
    }
  },
  computed: {
    // 是否显示MC内容填写
    showMC() {
      const nomiSuggestionInvestmentFee = (this.InvestmentData || []).map(o => Number(o.nomiSuggestionInvestmentFee))
      return window._.sum(nomiSuggestionInvestmentFee) >= 1000000
    }
  },
  mounted(){
    this.getFetchData()
  },
  methods: {
    async getFetchData() {
      try {
        // const res = require('./components/moke.json')
        const res = await getCapacityExtPlan({
          nominateId: this.$store.getters.nomiAppId,
        })
        if (res.code === '200') {
          // 基础信息
          this.basicFormData = res.data.capacityExpHeaderVO || {}
          // 扩产能计划
          this.capacityExpPlanVOList = res.data.capacityExpPlanVOList || []
          // 投资计划
          this.InvestmentData = res.data.capacityExpInvestmentFeeVOList || []
          // 零件计划
          this.PartTableData = res.data.capacityExpPartInfoVOList || []
          // 
          this.assesmentList = res.data.capacityExpEconomicAssessmentVOList || []
          this.yearList = res.data.capacityExpCarTypeProPlanVOList || []
          this.totalInvestment = res.data.totalInvestment
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch(e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.caexpan {
  ::v-deep.el-table {
    .el-table__body-wrapper {
      height: auto !important;
      min-height: auto !important;
      &::-webkit-scrollbar {
        width: 0px !important;
      }
      &::-webkit-scrollbar-thumb {
        display: none;
      }
      &::-webkit-scrollbar-track {
        display: none;
      }
      ::-webkit-scrollbar-corner {
        background-color: #111;
      }
    }
  }
  .caexpan-card {
    .tit {
      padding: 15px 0;
    }
    .caexpan-card-body {
      padding-left: 20px;
    }
  }
  .caexpan-footer {
    padding: 34px 0 18px 0;
    border-bottom: 1px dashed #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .caexpan-content {
      display: inline-block;
      width: 250px;
    }
  }
  .caexpan-sign {
    overflow: hidden;
  }
  .signItem {
    span {
      font-weight: bold;
      color: #000;
    }
    .line {
      display: inline-block;
      width: 315px;
      height: 20px;
      border-bottom: 1px solid #d4d4d4;
      margin-left: 20px;
    }
  }
  .caexpan-approvedate {
    height: 80px;
    padding-top: 50px;
    text-align: right;
    .signItem {
      span {
        color: rgb(183, 183, 183);
      }
      .line {
        width: 150px
      }
    }
  }
}
</style>