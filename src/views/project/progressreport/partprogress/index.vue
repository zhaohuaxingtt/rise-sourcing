<!--
 * @Author: Luoshuang
 * @Date: 2021-10-11 15:04:32
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-13 11:09:19
 * @Description: 项目管理-项目进度报告-零件进度报告
 * @FilePath: \front-web\src\views\project\progressreport\partprogress\index.vue
-->

<template>
  <iPage class="partprogress">
    <!---------------------------------------------------------------------->
    <!----------                  车型项目部分                   ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="carProgress" >
      <div class="projectProgressCard" slot="header-control">
        <div class="titleSearch">
          <span class="margin-right20 titleSearch-label">{{language('CHEXINGXIANGMU','车型项目')}}</span>
          <carProjectSelect ref="carSelect" optionType="2" :multiple="false" :filterable="true" v-model="carProjectId" :cartypeProName="cartypeProName" @change="handleCarProjectChange" :disabled="disabled" @defaultCarModel="defaultCarModel" />
        </div>
      </div>
      <carProject v-if="carHasShow"  :carProjectId="carProjectId" @changeSopStatus="changeSopStatus" />
    </iCard>
    <!---------------------------------------------------------------------->
    <!----------                  Tooling cost              ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="toolingcost margin-top20">
      <div class="toolingcost-title">Tooling cost (RMB)</div>
      <div class="toolingcost-content-item lineClass"></div>
      <div class="toolingcost-content-item">Tooling budget:<span>{{tooling.generalBudget}}mio</span></div>
      <div class="toolingcost-content-item lineClass"></div>
      <div class="toolingcost-content-item">Tooling investment applied:<span>{{tooling.bmAmount}}mio</span></div>
      <div class="toolingcost-content-item lineClass"></div>
      <div class="toolingcost-content-item">Tooling nominated. / %:<span>{{tooling.fixedAmount}}mio / {{tooling.percentage}}</span></div>
    </iCard>
    <div class="margin-top20 tabPart">
      <iTabsList type="card" @tab-click="tabChange" :before-leave="tabLeaveBefore" v-model="currentTab">
        <el-tab-pane lazy label="Parts Progress Overview" :name="'overview'" >
          <!-- <searchPart /> -->
          <overviewChart v-if="carHasShow && currentTab=='overview'" ref="overviewChart" :cartypeId="cartypeId" />
        </el-tab-pane>
        <el-tab-pane lazy label="Parts Progress Detail" :name="'detail'" >
          <!-- <searchPart /> -->
          <detailChart v-if="carHasShow && currentTab=='detail'"  ref="detailChart"  :cartypeId="cartypeId"/>
        </el-tab-pane>
      </iTabsList>
      <span class="exportBtn">{{$t("以下报表统计维度为零件数量")}}</span>
      <!-- <iButton class="exportBtn">{{language('DAOCHUBAOGAO', '导出报告')}}</iButton> -->
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard, iTabsList, iButton } from 'rise'
import carProject from '@/views/project/components/carprojectprogress/components/progress'
import { findCartypePro } from "@/api/project/projectprogressreport";
import searchPart from './components/searchPart'
import overviewChart from './components/overviewChart'
import detailChart from './components/detailChart'
import carProjectSelect from '@/views/project/components/commonSelect/carProjectSelect'
export default {
  components: { iPage, iCard, carProject, iTabsList, iButton, searchPart, overviewChart, detailChart,carProjectSelect },
  props:{
    disabled: {type:Boolean, default:false},
  },
  data() {
    return { 
      carProjectId: '',
      cartypeId: '',
      toolinginvestment: '40',
      toolinginvestmentApplied: '80',
      currentTab: 'overview',
      carHasShow:false,
      tooling:{
        generalBudget:0,//总预算
        bmAmount:0,//已申请且审批通过金额
        fixedAmount:0,//定点金额
        percentage:0,//已定点金额/总预算 百分比
      }
    }
  },
  created(){
    // console.log(this.carProjectId)
  },
  methods:{
    defaultCarModel(data){
      if(this.$route.query.carProject){
        this.carProjectId = this.$route.query.carProject;
        this.$refs.carSelect.data = this.$route.query.carProject;
        this.cartypeId = data.list.find(item => item.value === this.$route.query.carProject).cartypeId;
        this.getFindCartypePro(this.$route.query.carProject);
        console.log(this.carProjectId)
        console.log(this.cartypeId)
      }else{
        this.carProjectId = data.data;
        // this.carProjectId = "50024008";
        this.$refs.carSelect.data = data.data;
        // this.$refs.carSelect.data = "50024008";
        this.cartypeId =  data.data;
        // this.cartypeId = '50024008';
        // this.cartypeId = data.list.find(item => item.value === data.data).cartypeId;
        this.getFindCartypePro(this.carProjectId);
        console.log(this.carProjectId)
        console.log(this.cartypeId)
      }
      this.carHasShow = true;
    },
    tabChange(val){
      console.log(val);
      if(this.currentTab=='overview'){
        this.$refs.overviewChart.changeRefresh(val);
      }else if(this.currentTab=='detail'){
        this.$refs.detailChart.changeRefresh(val);
      }
    },
    handleCarProjectChange(val, valLabel,cartypeId) {
      console.log(val,valLabel,cartypeId);
      this.cartypeId = val;
      this.getFindCartypePro(val);

      this.$emit('handleCarProjectChange', val, valLabel)

      if(this.currentTab=='overview'){
        this.$refs.overviewChart.changeRefresh(val);
      }else if(this.currentTab=='detail'){
        this.$refs.detailChart.changeRefresh(val);
      }
    },
    getFindCartypePro(val){//获取tooling cost数据
      findCartypePro({
        cartypeProId:[val],
        localFactoryName: "",
        showHistory: "0",
        showSelf: "Y",
        sopBegin: "",
        sopEnd: "",
      }).then(res=>{
        if(res?.result){
          if(res?.data.length>0){
            var percentage = "";
            if(res.data[0].fixedAmount && res.data[0].generalBudget){
              percentage = ((res.data[0].fixedAmount/res.data[0].generalBudget).toFixed(4))*100 + "%"
            }
            this.tooling = {
              generalBudget:this.getMioValue(res.data[0].generalBudget),//总预算
              bmAmount:this.getMioValue(res.data[0].bmAmount),//已申请且审批通过金额
              fixedAmount:this.getMioValue(res.data[0].fixedAmount),//定点金额
              percentage:percentage,//已定点金额/总预算 百分比
            }
          }else{
            this.tooling = {
              generalBudget:0,//总预算
              bmAmount:0,//已申请且审批通过金额
              fixedAmount:0,//定点金额
              percentage:"-",//已定点金额/总预算 百分比
            }
          }
        }
      })
    },
    getMioValue(val){
      if(val){
        return (Number(val)/1E6).toFixed(2);
      }else{
        return 0;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .cardHeader{
  justify-content: flex-start!important;
}
.projectProgressCard {
  float:left;
  &-content {
    margin-top: 20px;
    border-top: 1px dashed #BBC4D6;;
  }
  .titleSearch-label {
    width: auto !important;
  }
  .titleSearch {
    display: flex;
    align-items: center;
    float: left;
    &-label {
      display: block;
      width: 60px;
      font-size: 14px !important;
    }
    ::v-deep .el-select {
      width: 240px;
    }
  }
  ::v-deep .cardHeader {

    width: 100%;
    & > div {
      &:first-child {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  ::v-deep .cardBody {
    margin-top: -15px;
  }
}
.lineClass{
  border-right: 1px solid #cbcaca;
  height: 25px;
}
.partprogress {
  padding: 0;
  padding-top: 10px;
  height: unset;
  overflow: visible;
  .carProgress {
    .carProject {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  ::v-deep .toolingcost {
    & > div {
      width: 100%;
      .cardBody {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
      }
    }
    &-title {
      font-weight: bold;
    }
    &-content {
      display: flex;
      align-items: center;
      &-item {
        font-weight: 400;
        span {
          font-weight: bold;
          margin-left: 60px;
        }
        &:first-child {
        }
        &:last-child {
          // padding-left: 80px;
        }
      }
      

    }
  }
  .tabPart {
    position: relative;
    ::v-deep .exportBtn {
      font-size:14px;
      position: absolute;
      right: 0;
      top: 10px;
    }
  }
}
</style>