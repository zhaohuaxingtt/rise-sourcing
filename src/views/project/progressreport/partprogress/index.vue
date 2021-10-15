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
      <carProject :carProjectId="carProjectId" />
    </iCard>
    <!---------------------------------------------------------------------->
    <!----------                  Tooling cost              ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="toolingcost margin-top20">
      <div class="toolingcost-title">Tooling cost (RMB)</div>
      <div class="toolingcost-content">
        <div class="toolingcost-content-item">Tooling budget:<span>{{tollingBudget}}mio</span></div>
        <div class="toolingcost-content-item">Tooling investment applied / %:<span>{{toolinginvestment}}mio / {{toolinginvestmentApplied}}%</span></div>
      </div>
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
      <iButton class="exportBtn">{{language('DAOCHUBAOGAO', '导出报告')}}</iButton>
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard, iTabsList, iButton } from 'rise'
import carProject from '@/views/project/components/carprojectprogress/components/progress'
import searchPart from './components/searchPart'
import overviewChart from './components/overviewChart'
import detailChart from './components/detailChart'
export default {
  components: { iPage, iCard, carProject, iTabsList, iButton, searchPart, overviewChart, detailChart },
  data() {
    return { 
      carProjectId: '3',
      tollingBudget: '50',
      toolinginvestment: '40',
      toolinginvestmentApplied: '80',
      currentTab: 'overview'
    }
  }
}
</script>

<style lang="scss" scoped>
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
          padding-right: 80px;
          border-right: 1px solid #eee;
        }
        &:last-child {
          padding-left: 80px;
        }
      }
      

    }
  }
  .tabPart {
    position: relative;
    ::v-deep .el-button.exportBtn {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>