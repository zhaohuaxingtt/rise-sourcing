<!--
 * @Author: haojiang
 * @Date: 2021-07-06 22:11:41
 * @LastEditTime: 2021-07-08 13:48:11
 * @LastEditors: Please set LastEditors
 * @Description: 决策资料 - 扩产能
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rsCapacityExpan/index.vue
-->
<template>
  <iCard class="caexpan" title="Recommendation Nomination Application Investment for 2nd Tooling">
    <div class="caexpan-title"></div>
    <basicForm :form.sync="basicFormData" />
    <!-- 扩产能表格 -->
    <capacity />
    <!-- BentchMark Investment -->
    <investment class="margin-top20" />
    <!-- Part infomation -->
    <partInfomation class="margin-top20" />
    <!-- Economic Assessment -->
    <ecoAssessment class="margin-top20" />
    <!-- footer -->
    <div class="caexpan-footer">
      <span><strong>{{language('TOTALINVESTMENTVAT','Total Investment(Excel VAT)不含税')}}：</strong>
        {{language('TOTALINVESTMENTVATINFO','小于100万，签到CS,大于100万，签到M')}}
      </span>
      <span><strong>Developing period：</strong>
        {{language('DEVELOPINGPERIODINFO','研发周期，系统不管，单位是周')}}
      </span>
    </div>
    <div class="caexpan-sign margin-top20">
      <div class="signItem"><span class="label">CS:</span><span class="line"></span></div>
      <el-row class="margin-top30" gutter="100">
        <el-col :span="8">
          <div class="signItem"><span class="label">Commodity:</span><span class="line"></span></div>
        </el-col>
        <el-col :span="8">
          <div class="signItem"><span class="label">CSS:</span><span class="line"></span></div>
        </el-col>
        <el-col :span="8">
          <div class="signItem"><span class="label">CFC:</span><span class="line"></span></div>
        </el-col>
      </el-row>
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
import {
  InvestmentTableTitle,
  PartTableTitle
} from './components/data'
import {iCard} from 'rise'

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
      tableLoading: false,
      InvestmentTableTitle,
      InvestmentData: [],
      PartTableTitle,
      PartTableData: []
    }
  }
}
</script>
<style lang="scss" scoped>
.caexpan {
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
  }
  .caexpan-sign {
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
  }
}
</style>