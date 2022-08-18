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
          <carProjectSelect optionType="2" :multiple="false" :filterable="true" v-model="carProjectId" :cartypeProName="cartypeProName" @change="handleCarProjectChange" :disabled="disabled" />
        </div>
      </div>
      <carProject :carProjectId="carProjectId" @changeSopStatus="changeSopStatus" />
    </iCard>
    <!---------------------------------------------------------------------->
    <!----------                  Tooling cost              ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="toolingcost margin-top20">
      <div class="toolingcost-title">Tooling cost (RMB)</div>
      <div class="toolingcost-content-item lineClass"></div>
      <div class="toolingcost-content-item">Tooling budget:<span>{{tollingBudget}}mio</span></div>
      <div class="toolingcost-content-item lineClass"></div>
      <div class="toolingcost-content-item">Tooling investment applied:<span>{{toolinginvestment}}mio</span></div>
      <div class="toolingcost-content-item lineClass"></div>
      <div class="toolingcost-content-item">ooling nominated. / %:<span>{{toolinginvestment}}mio / {{toolinginvestmentApplied}}%</span></div>
    </iCard>
    <div class="margin-top20 tabPart">
      <iTabsList type="card" @tab-click="tabChange" :before-leave="tabLeaveBefore" v-model="currentTab">
        <el-tab-pane lazy label="Parts Progress Overview" :name="'overview'" >
          <searchPart />
          <overviewChart ref="overviewChart"  />
        </el-tab-pane>
        <el-tab-pane lazy label="Parts Progress Detail" :name="'detail'" >
          <searchPart />
          <detailChart ref="detailChart" />
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
    carProjectId: {type:String, default:""},
  },
  data() {
    return { 
      // carProjectId: '3',
      tollingBudget: '50',
      toolinginvestment: '40',
      toolinginvestmentApplied: '80',
      currentTab: 'overview'
    }
  },
  created(){
    console.log(this.carProjectId)
  },
  methods:{
    handleCarProjectChange(val, valLabel) {
      this.getFindCartypePro(val);

      this.$emit('handleCarProjectChange', val, valLabel)
    },
    getFindCartypePro(val){
      findCartypePro({
        cartypeProId:[val],
        localFactoryName: "",
        showHistory: "0",
        showSelf: "Y",
        sopBegin: "",
        sopEnd: "",
      }).then(res=>{
        console.log(res)
      })
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