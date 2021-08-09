<!--
 * @Author: haojiang
 * @Date: 2021-08-05 10:36:11
 * @LastEditTime: 2021-08-06 14:42:20
 * @LastEditors: Please set LastEditors
 * @Description: 寻源概览
 * @FilePath: /front-web/src/views/dashboard/index.vue
-->
<template>
  <iPage class="dashboard">
    <headerNav />
    <!-- 功能卡片 -->
    <div class="dashboard-card">
      <el-row :gutter="10">
        <!-- 零件签收 -->
        <el-col :span="4">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icondingdianguanlijiedian-yiwancheng" class="cardicon"></icon>
              <span>{{language('LK_LINGJIANQIANSHOU','零件签收')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl><dt>{{language('LK_DAIQIANSHOU','待签收')}}</dt><dd><strong>26</strong></dd></dl>
            </div>
          </iCard>
        </el-col>
        <!-- 采购项目建立 -->
        <el-col :span="4">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icondingdianguanlijiedian-yiwancheng" class="cardicon"></icon>
              <span>{{language('LK_CAIGOUXIANGMUJIANLI','采购项目建立')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl><dt>{{language('WEICHUANGJIANCAIGOUXIANGMU','未创建采购项目')}}</dt><dd><strong class="note">21</strong>/45</dd></dl>
              <dl><dt>{{language('WEIJIARURFQ','未加入RFQ')}}</dt><dd><strong class="note">11</strong>/22</dd></dl>
            </div>
          </iCard>
        </el-col>
        <!-- RFQ管理 -->
        <el-col :span="8">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icondingdianguanlijiedian-yiwancheng" class="cardicon"></icon>
              <span>{{language('LK_RFQGUANLI','RFQ管理')}}</span>
            </div>
            <div class="dashboard-card-content flexbox">
              <div>
                <dl><dt>{{language('WEIZHUANTANPAN','未转谈判')}}</dt><dd><strong class="note">7</strong>/15</dd></dl>
                <dl><dt>{{language('DAISHANGHUIORLIUZHUAN','待上会/流转')}}</dt><dd><strong class="note">2</strong>/8</dd></dl>
              </div>
              <div>
                <dl><dt>{{language('LK_CAIWUMUBIAOJIA','财务目标价')}}</dt><dd><strong class="note">7</strong>/15</dd></dl>
                <dl><dt>{{language('EPPINGFEN','EP评分')}}</dt><dd><strong class="note">2</strong>/8</dd></dl>
                <dl><dt>{{language('MQPINGFEN','MQ评分')}}</dt><dd><strong class="note">6</strong>/17</dd></dl>
              </div>
            </div>
          </iCard>
        </el-col>
        <!-- 定点管理 -->
        <el-col :span="4">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icondingdianguanlijiedian-yiwancheng" class="cardicon"></icon>
              <span>{{language('LK_DINGDIANGUANLI','定点管理')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl><dt>{{language('LK_DAIDINGDIAN','待定点')}}</dt><dd><strong class="note">12</strong></dd></dl>
            </div>
          </iCard>
        </el-col>
        <!-- 定点信/LOI -->
        <el-col :span="4">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icondingdianguanlijiedian-yiwancheng" class="cardicon"></icon>
              <span>{{language('LK_DINGDIANXINLOI','定点信/LOI')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl><dt>{{language('LK_DAIQUERENDINGDIANXIN','待确认定点信')}}</dt><dd><strong>8</strong></dd></dl>
              <dl><dt>{{language('LK_DAIQUERENLOI','待确认LOI')}}</dt><dd><strong>12</strong></dd></dl>
            </div>
          </iCard>
        </el-col>
      </el-row>
      
    </div>
    <div class="dashboard-charts">
      <el-row :gutter="10">
        <!-- 材料组定点时率及平均定点周期 -->
        <el-col :span="16">
          <nomicharts />
        </el-col>
        <el-col :span="8">
          <pieCharts />
        </el-col>
      </el-row>
    </div>
  </iPage>
</template>

<script>
import headerNav from './components/headerNav'
import nomicharts from './components/nomicharts'
import pieCharts from './components/pieCharts'
import {iPage, iCard, icon} from 'rise'
export default {
  components: {
    iPage,
    iCard,
    icon,
    headerNav,
    nomicharts,
    pieCharts
  }
  
}
</script>
<style lang="scss" scoped>
.dashboard-card {
  padding: 10px 0;
  ::v-deep.card {
    height: 148PX;
    background-image: url(~@/assets/images/bgCar.gif);
    background-repeat: no-repeat;
    background-position: bottom right;
    .cardHeader {
      padding: 15px;
      position: relative;
      &:before {
        position: absolute;
        content: '';
        width: calc(100% - 30px);
        height: 1PX;
        left: 15PX;
        bottom: 0px;
        background-image: url(~@/assets/images/border.gif);
      }
      span {
        color: #000000;
        font-weight: 600;
        display: inline-block;
        vertical-align: middle;
      }
      .cardicon {
        margin-right: 10px;
        font-size: 22PX;
        display: inline-block;
        vertical-align: middle;
        svg {
          font-size: 22PX;
        }
      }
    }
    .cardBody {
      padding: 15px;
    }
    .dashboard-card-header {
      line-height: 22px;
    }
    .dashboard-card-content {
      padding-top: 15px;
      &.flexbox {
        display: flex;
        align-content: space-between;
        position: relative;
        &:before {
          position: absolute;
          content: '';
          width: 1px;
          height: calc(100% - 30px);
          left: 50%;
          top: 20px;
          background-image: url(~@/assets/images/border_ver.gif);
        }
      }
      &>div {
        width: 50%;
        height: 100%;
        &:first-child {
          box-sizing: border-box;
          padding-right: 20px;
        }
        &:last-child {
          box-sizing: border-box;
          padding-left: 20px;
        }
      }
      dl {
        display: flex;
        align-content: space-between;
        dt {
          width: 70%;
          text-align: left;
          box-sizing: border-box;
          padding-left: 5px;
          line-height: 28PX;
        }
        dd {
          width: 30%;
          text-align: right;
          line-height: 28PX;
          strong {
            font-size: 14PX;
          }
          .note {
            color: #e11451;
            box-sizing: border-box;
            padding-right: 5px;
            font-weight: bold;
          }
        }
      }
    }
    .dashboard-charts {
      
    }
  }
}
.dashboard-charts {
  margin-top: 10px;
  min-height: 400px;
}
</style>
<style>
.dashboard-tooltip {
  color: #333;
  font-size: 12px;
}
.dashboard-tooltip .item-name {
  color: #333;
  font-size: 12px;
}
.dashboard-tooltip p {
  color: #333;
  font-size: 12px;
}
</style>