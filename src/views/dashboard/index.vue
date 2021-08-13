<!--
 * @Author: haojiang
 * @Date: 2021-08-05 10:36:11
 * @LastEditTime: 2021-08-11 17:41:09
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
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_LINGJIANQIANSHOU','零件签收')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl><dt>{{language('LK_DAIQIANSHOU','待签收')}}</dt><dd><strong class="cursor" @click="toLink('/sourcing/partsign')">{{basicData.partSigningNum || 0}}</strong></dd></dl>
            </div>
          </iCard>
        </el-col>
        <!-- 采购项目建立 -->
        <el-col :span="4">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_CAIGOUXIANGMUJIANLI','采购项目建立')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl>
                <dt>{{language('WEICHUANGJIANCAIGOUXIANGMU','未创建采购项目')}}</dt>
                <dd>
                <strong class="note cursor" @click="toLink('/sourcing/partsprocure?projectStatus=10')">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notPurchaseItem || 0}}</strong>
                /{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notPurchaseItemSum || 0}}
                </dd>
              </dl>
              <dl>
                <dt>{{language('WEIJIARURFQ','未加入RFQ')}}</dt>
                <dd>
                  <strong class="note cursor" @click="toLink('/sourcing/partsprocure?projectStatus=11')">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notJoinRfq || 0}}</strong>
                  /{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notJoinRfqSum || 0}}
                </dd>
              </dl>
            </div>
          </iCard>
        </el-col>
        <!-- RFQ管理 -->
        <el-col :span="8">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_RFQGUANLI','RFQ管理')}}</span>
            </div>
            <div class="dashboard-card-content flexbox">
              <div>
                <dl>
                  <dt>{{language('WEIZHUANTANPAN','未转谈判')}}</dt>
                  <dd>
                    <strong class="note">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.notNego || 0}}</strong>
                    /{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.notNegoSum || 0}}
                  </dd>
                </dl>
                <dl>
                  <dt>{{language('DAISHANGHUIORLIUZHUAN','待上会/流转')}}</dt>
                  <dd>
                    <strong class="note">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.circulation || 0}}</strong>
                  </dd>
                </dl>
              </div>
              <div>
                <dl>
                  <dt>{{language('LK_CAIWUMUBIAOJIA','财务目标价')}}</dt>
                  <dd>
                    <strong class="note">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.financialPrice || 0}}</strong>
                    /{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.financialPriceSum || 0}}
                  </dd>
                </dl>
                <dl>
                  <dt>{{language('EPPINGFEN','EP评分')}}</dt>
                  <dd>
                    <strong class="note">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.epScore || 0}}</strong>
                    /{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.epScoreSum || 0}}
                  </dd>
                </dl>
                <dl>
                  <dt>{{language('MQPINGFEN','MQ评分')}}</dt>
                  <dd>
                    <strong class="note">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.mqScore || 0}}</strong>
                    /{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.mqScoreSum || 0}}
                  </dd>
                </dl>
              </div>
            </div>
          </iCard>
        </el-col>
        <!-- 定点管理 -->
        <el-col :span="4">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_DINGDIANGUANLI','定点管理')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl>
                <dt>{{language('LK_DAIDINGDIAN','待定点')}}</dt>
                <dd><strong class="note">{{basicData.nomiManageNum || 0}}</strong>
                </dd>
              </dl>
            </div>
          </iCard>
        </el-col>
        <!-- 定点信/LOI -->
        <el-col :span="4">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_DINGDIANXINLOI','定点信/LOI')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl>
                <dt>{{language('LK_DAIQUERENDINGDIANXIN','待确认定点信')}}</dt>
                <dd>
                  <strong class="cursor" @click="toLink('/sourcing/partsletter?status=CSF_HANDLING')">{{basicData.rfqOverviewDTO && basicData.nomiLetterOverviewDTO.nomiLetterNum || 0}}</strong>
                </dd>
              </dl>
              <dl>
                <dt>{{language('LK_DAIQUERENLOI','待确认LOI')}}</dt>
                <dd>
                  <strong class="cursor" @click="toLink('/sourcing/partsletter?loiStatus=LINIE_CONFIRING&cardType=LOI')">{{basicData.rfqOverviewDTO && basicData.nomiLetterOverviewDTO.nomiLoiNum || 0}}</strong>
                </dd>
              </dl>
            </div>
          </iCard>
        </el-col>
      </el-row>
      
    </div>
    <div class="dashboard-charts">
      <el-row :gutter="10">
        <!-- 材料组定点时率及平均定点周期 -->
        <el-col :span="16">
          <nomicharts :data="materialGroupData" v-loading="loading" />
        </el-col>
        <el-col :span="8">
          <pieCharts :data="circulationData" v-loading="loading" />
        </el-col>
      </el-row>
    </div>
  </iPage>
</template>

<script>
import headerNav from './components/headerNav'
import nomicharts from './components/nomicharts'
import pieCharts from './components/pieCharts'
import {sourcingOverview} from '@/api/dashboard'
import {iPage, iCard, icon, iMessage} from 'rise'

export default {
  components: {
    iPage,
    iCard,
    icon,
    headerNav,
    nomicharts,
    pieCharts
  },
  data() {
    return {
      // 基本卡片统计信息
      basicData: {},
      materialGroupData: {},
      circulationData: {},
      loading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    toLink(path) {
      if (!path) return
      const routeData = this.$router.resolve({path})
      window.open(routeData.href, '_blank')
    },
    async init() {
      this.loading = true
      try {
        const res = await sourcingOverview()
        // const res = require('./components/moke.json')
        if (res.code === '200') {
          // 卡片统计信息区
          this.basicData = res.data.sourcingOverviewDTO || {}
          // 材料组定点及时率及平均定点周期
          const materialGroupOverviewDTO = res.data.materialGroupOverviewDTO || []
          this.materialGroupData = {
            freqData: materialGroupOverviewDTO.map(o => o.avgPeriod || 0) || [],
            nomiData: materialGroupOverviewDTO.map(o => o.timeRatePercent) || [],
            fugroup: materialGroupOverviewDTO.map(o => o.materialGroupName) || [],
          }
          // 流转状态跟踪
          const circulationData = res.data.circulationOverviewDTO || {}
          this.circulationData = circulationData

        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        e && (iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn))
      }
    }
  }
  
}
</script>
<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
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
        color: #5F6879;
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
          width: 60%;
          text-align: left;
          box-sizing: border-box;
          padding-left: 5px;
          line-height: 28PX;
        }
        dd {
          width: 40%;
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