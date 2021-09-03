<!--
 * @Author: haojiang
 * @Date: 2021-08-05 10:36:11
 * @LastEditTime: 2021-09-03 15:33:00
 * @LastEditors: Hao,Jiang
 * @Description: 寻源概览
 * @FilePath: /front-web/src/views/dashboard/index.vue
-->
<template>
  <iPage class="dashboard">
    <headerNav v-permission="DASHBOARD_PARTSIGN" />
    <!-- 功能卡片 -->
    <div class="dashboard-card">
      <el-row :gutter="10">
        <!-- 零件签收 -->
        <el-col :span="4" v-permission="DASHBOARD_PARTSIGN">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_LINGJIANQIANSHOU','零件签收')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl><dt>{{language('LK_DAIQIANSHOU','待签收')}}</dt><dd><strong class="cursor" @click="toLink('/sourceinquirypoint/sourcing/partsign')">{{basicData.partSigningNum || 0}}</strong></dd></dl>
            </div>
          </iCard>
        </el-col>
        <!-- 采购项目建立 -->
        <el-col :span="4" v-permission="DASHBOARD_PARTSPROCURE">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_CAIGOUXIANGMUJIANLI','采购项目建立')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl>
                <dt>{{language('WEICHUANGJIANCAIGOUXIANGMU','未创建采购项目')}}</dt>
                <dd>
                <strong class="note">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notPurchaseItem || 0}}</strong>
                /<span class="cursor"  @click="toLink(unCrePartsprocureURL)">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notPurchaseItemSum || 0}}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{language('WEIJIARURFQ','未加入RFQ')}}</dt>
                <dd>
                  <strong class="note">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notJoinRfq || 0}}</strong>
                  /<span class="cursor" @click="toLink(unJoinRFQURL)">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notJoinRfqSum || 0}}</span>
                </dd>
              </dl>
            </div>
          </iCard>
        </el-col>
        <!-- RFQ管理 -->
        <el-col :span="8" v-permission="DASHBOARD_RFQMGMT">
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
        <el-col :span="4" v-permission="DASHBOARD_NOMINATEMGMT">
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
        <el-col :span="4" v-permission="DASHBOARD_NOMILETTERANDLOI">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_DINGDIANXINLOI','定点信/LOI')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl>
                <dt>{{language('LK_DAIQUERENDINGDIANXIN','待确认定点信')}}</dt>
                <dd>
                  <strong class="cursor" @click="toLink(letterURL)">{{basicData.rfqOverviewDTO && basicData.nomiLetterOverviewDTO.nomiLetterNum || 0}}</strong>
                </dd>
              </dl>
              <dl>
                <dt>{{language('LK_DAIQUERENLOI','待确认LOI')}}</dt>
                <dd>
                  <strong class="cursor" @click="toLink(loiURL)">{{basicData.rfqOverviewDTO && basicData.nomiLetterOverviewDTO.nomiLoiNum || 0}}</strong>
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
        <el-col :span="16" v-permission="DASHBOARD_MATERIALANDNOMIRATE">
          <nomicharts :data="materialGroupData" v-loading="loading" />
        </el-col>
        <el-col :span="8" v-permission="DASHBOARD_CIRCULATIONOVERVIEW">
          <pieCharts :data="circulationData" v-loading="loading" />
        </el-col>
      </el-row>
    </div>
  </iPage>
</template>

<script>
import Vuex from 'vuex'
import headerNav from './components/headerNav'
import nomicharts from './components/nomicharts'
import pieCharts from './components/pieCharts'
import {sourcingOverview} from '@/api/dashboard'
import {qianqicaigou, zhuanyecaigou} from '@/config/role'
import {iPage, iCard, icon, iMessage} from 'rise'
import _ from 'lodash'

export default {
  components: {
    iPage,
    iCard,
    icon,
    headerNav,
    nomicharts,
    pieCharts
  },
  computed: {
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
    roleList() {
      // 获取用户角色列表
      let roleList = (this.userInfo && this.userInfo.positionList) || []
      roleList = roleList.map(o => o.roleDTOList || [])
      roleList = Array.from(new Set(roleList.flat(Infinity)))
      return roleList.map(o => o.code) || []
    },
    // 是否是前期采购员
    isQQCG() {
      const qqArray = _.intersection(this.roleList,qianqicaigou)
      return Boolean(qqArray.length)
    },
    // 是否是专业采购员
    isZYCG() {
      const zyArray = _.intersection(this.roleList,zhuanyecaigou)
      return Boolean(zyArray.length)
    },
    // 前期采购员待确认定点信链接
    letterURL() {
      let status = ''
      // 前期采购员
      if (this.isQQCG) status = 'CSF_HANDLING'
      // 专业采购员
      if (this.isZYCG) status = 'LINIE_CONFIRING'
      // 前期采购员 && 专业采购员
      if (this.isZYCG && this.isQQCG) status = 'CSF_HANDLING'
      return `/sourceinquirypoint/sourcing/partsletter?status=${status}${this.userRoleParams(['csfCssName'])}`
    },
    // 前期采购员待确认定点信链接
    loiURL() {
      let status = ''
      // 前期采购员
      if (this.isQQCG) status = 'CSF_HANDLING'
      // 专业采购员
      if (this.isZYCG) status = 'LINIE_CONFIRING'
      // 前期采购员 && 专业采购员
      if (this.isZYCG && this.isQQCG) status = 'CSF_HANDLING'
      return `/sourceinquirypoint/sourcing/partsletter?cardType=LOI&loiStatus=${status}${this.userRoleParams(['csfName'])}`
    },
    // 未创建采购项目链接
    unCrePartsprocureURL() {
      return `/sourcing/partsprocure?status=10${this.userRoleParams()}`
    },
    // 未创建采购项目链接
    unJoinRFQURL() {
      return `/sourcing/partsprocure?status=11${this.userRoleParams()}`
    }

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
    // 专业采购员和前期采购员要传的参数
    userRoleParams(args = []) {
      let paramTxt = ''
      const argsName = ['buyerName','linieName',]
      if (args && args.length) {
        args.forEach((item, index) => {
          argsName[index] = item
        })
      }
      if (this.isQQCG) paramTxt += `&${argsName[0]}=${this.userInfo.nameZh}`
      if (this.isZYCG) paramTxt += `&${argsName[1]}=${this.userInfo.nameZh}`
      return paramTxt
    },
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
            freqData: materialGroupOverviewDTO.map(o => o.avgPeriodPercent || 0) || [],
            nomiData: materialGroupOverviewDTO.map(o => o.timeRatePercent) || [],
            fugroup: materialGroupOverviewDTO.map(o => `${o.materialGroupName} ${o.materialCode}`) || [],
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
  display: inline-block;
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
        font-size: 20px;
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