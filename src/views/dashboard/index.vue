<!--
 * @Author: haojiang
 * @Date: 2021-08-05 10:36:11
 * @LastEditTime: 2021-11-10 15:17:53
 * @LastEditors: Hao,Jiang
 * @Description: 寻源概览
 * @FilePath: /front-web/src/views/dashboard/index.vue
-->
<template>
  <iPage class="dashboard">
    <headerNav v-permission.auto="DASHBOARD_OVERVIEW_PAGE|寻源概览" />
    <!-- 功能卡片 -->
    <div class="dashboard-card">
      <el-row :gutter="10">
        <!-- 零件签收 -->
        <el-col :span="4" v-permission.auto="DASHBOARD_OVERVIEW_PARTSIGN|寻源概览-零件签收">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_LINGJIANQIANSHOU','零件签收')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl><dt>{{language('LK_DAIQIANSHOU','待签收')}}</dt><dd><strong class="cursor" @click="toLink('/sourceinquirypoint/sourcing/partsign?currentUser=true&showSelf=true')">{{basicData.partSigningNum || 0}}</strong></dd></dl>
            </div>
          </iCard>
        </el-col>
        <!-- 采购项目建立 -->
        <el-col :span="4" v-permission.auto="DASHBOARD_OVERVIEW_PARTSPROCURE|寻源概览-采购项目建立">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_CAIGOUXIANGMUJIANLI','采购项目建立')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl>
                <dt>{{language('WEICHUANGJIANCAIGOUXIANGMU','未创建采购项目')}}</dt>
                <dd>
                <strong class="note cursor" @click="toLink(unCrePartsprocureURL(true))">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notPurchaseItem || 0}}</strong>
                /<span class="cursor"  @click="toLink(unCrePartsprocureURL(false))">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notPurchaseItemSum || 0}}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{language('WEIJIARURFQ','未加入RFQ')}}</dt>
                <dd>
                  <strong class="note cursor" @click="toLink(unJoinRFQURL(true))">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notJoinRfq || 0}}</strong>
                  /<span class="cursor" @click="toLink(unJoinRFQURL(false))">{{basicData.purchaseItemOverviewDTO && basicData.purchaseItemOverviewDTO.notJoinRfqSum || 0}}</span>
                </dd>
              </dl>
            </div>
          </iCard>
        </el-col>
        <!-- RFQ管理 -->
        <el-col :span="8" v-permission.auto="DASHBOARD_OVERVIEW_RFQMGMT|寻源概览-RFQ管理">
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
                    <strong class="note cursor" @click="toLink(rfqURL('未转谈判', true, true))">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.notNego || 0}}</strong>
                    /<span class="cursor" @click="toLink(rfqURL('未转谈判', false, true))">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.notNegoSum || 0}}</span>
                  </dd>
                </dl>
                <dl>
                  <dt>{{language('DAISHANGHUIORLIUZHUAN','待上会/流转')}}</dt>
                  <dd>
                    <strong class="note cursor" @click="toLink(rfqURL('待上会/流转', true, true))">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.circulation || 0}}</strong>
                  </dd>
                </dl>
              </div>
              <div>
                <dl>
                  <dt>{{language('LK_CAIWUMUBIAOJIA','财务目标价')}}</dt>
                  <dd>
                    <strong class="note cursor" @click="toLink(rfqURL('财务目标价', true))">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.financialPrice || 0}}</strong>
                    /<span class="cursor" @click="toLink(rfqURL('财务目标价', false))">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.financialPriceSum || 0}}</span>
                  </dd>
                </dl>
                <dl>
                  <dt>{{language('EPPINGFEN','EP评分')}}</dt>
                  <dd>
                    <strong class="note cursor" @click="toLink(rfqURL('EP评分', true))">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.epScore || 0}}</strong>
                    /<span class="cursor" @click="toLink(rfqURL('EP评分', false))">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.epScoreSum || 0}}</span>
                  </dd>
                </dl>
                <dl>
                  <dt>{{language('MQPINGFEN','MQ评分')}}</dt>
                  <dd>
                    <strong class="note cursor" @click="toLink(rfqURL('MQ评分', true))">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.mqScore || 0}}</strong>
                    /<span class="cursor" @click="toLink(rfqURL('MQ评分', false))">{{basicData.rfqOverviewDTO && basicData.rfqOverviewDTO.mqScoreSum || 0}}</span>
                  </dd>
                </dl>
              </div>
            </div>
          </iCard>
        </el-col>
        <!-- 定点管理 -->
        <el-col :span="4" v-permission.auto="DASHBOARD_OVERVIEW_NOMINATEMGMT|寻源概览-定点管理">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_DINGDIANGUANLI','定点管理')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl>
                <dt>{{language('LK_SHANGHUIZHONG','上会中')}}</dt>
                <dd><strong class="note cursor" @click="toLink(nomiURL('上会'))">{{basicData.nomiManageDTO && basicData.nomiManageDTO.meetingNum || 0}}</strong>
                </dd>
              </dl>
              <dl>
                <dt>{{language('LK_LIUZHUANZHONG','流转中')}}</dt>
                <dd><strong class="note cursor" @click="toLink(nomiURL('流转'))">{{basicData.nomiManageDTO &&  basicData.nomiManageDTO.tranformNum || 0}}</strong>
                </dd>
              </dl>
            </div>
          </iCard>
        </el-col>
        <!-- 定点信/LOI -->
        <el-col :span="4" v-permission.auto="DASHBOARD_OVERVIEW_NOMILETTERANDLOI|寻源概览-定点信/LOI">
          <iCard :tabCard="false">
            <div class="dashboard-card-header" slot="header">
              <icon symbol name="icona-dingdianguanlijiedian-yiwancheng-fuben" class="cardicon"></icon>
              <span>{{language('LK_DINGDIANXINLOI','定点信/LOI')}}</span>
            </div>
            <div class="dashboard-card-content">
              <dl>
                <dt>{{language('LK_DAIQUERENDINGDIANXIN','待确认定点信')}}</dt>
                <dd>
                  <strong class="cursor" @click="toLink(letterAndLoiURL(1))">{{basicData.rfqOverviewDTO && basicData.nomiLetterOverviewDTO.nomiLetterNum || 0}}</strong>
                </dd>
              </dl>
              <dl>
                <dt>{{language('LK_DAIQUERENLOI','待确认LOI')}}</dt>
                <dd>
                  <strong class="cursor" @click="toLink(letterAndLoiURL(2))">{{basicData.rfqOverviewDTO && basicData.nomiLetterOverviewDTO.nomiLoiNum || 0}}</strong>
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
        <el-col :span="16" v-permission.auto="DASHBOARD_OVERVIEW_MATERIALANDNOMIRATE|寻源概览-材料组定点及时率及平均定点周期">
          <nomicharts :data="materialGroupData" v-loading="loading" />
        </el-col>
        <el-col :span="8" v-permission.auto="DASHBOARD_OVERVIEW_CIRCULATIONOVERVIEW|寻源概览-流转状态跟踪">
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
import {roleMixins} from '@/utils/roleMixins'
import {selectDictByKeyss} from '@/api/dictionary'
// 定点类型
import { applyType } from '@/layout/nomination/components/data'
import {
  nomiApplicationStatus
} from '@/views/designate/home/components/options'

export default {
  mixins: [roleMixins],
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
      loading: false,
      // 跳采购项目建立
      options: {}
    }
  },
  created() {
    this.init()
    this.getSearchOptions()
  },
  methods: {
    // 未创建采购项目链接
    unCrePartsprocureURL(isDelay=false) {
      const data = (this.options['RFQ_PART_STATUS_CODE_TYPE'] || []).find(o => o.name === '无采购项目编号')
      const code = data && data.code || 'NO_NR'
      return `/sourceinquirypoint/sourcing/partsprocure?showSelf=true&status=${code}&currentUser=true&isDelay=${isDelay}`
    },
    // 未加入RFQ
    unJoinRFQURL(isDelay=false) {
      const data = (this.options['RFQ_PART_STATUS_CODE_TYPE'] || []).find(o => o.name === '未加入RFQ')
      const code = data && data.code || 'NOT_IN_RFQ'
      return `/sourceinquirypoint/sourcing/partsprocure?showSelf=true&status=${code}&currentUser=true&isDelay=${isDelay}`
    },
    // rfq链接
    /**
     * @description: 
     * @param {*} name 名称
     * @param {*} isDelay 是否统计延误数据
     * @param {*} isRfq 是否跳转到rfq管理
     * @return {*}
     */    
    rfqURL(name, isDelay=false, isRfq = false) {
      const data = (this.options['RFQ_OVERVIEW_TYPE'] || []).find(o => o.name === name)
      const code = data && data.code || ''
      const URL = isRfq ? '/sourceinquirypoint/sourcing/partsrfq':'/sourceinquirypoint/sourcing/reportmgmt/details'
      return `${URL}?showSelf=true&type=${code}&currentUser=true&isDelay=${isDelay}`
    },
    // 前期采购员待确认定点信链接
    // type:1 定点信 2：LOI
    letterAndLoiURL(type) {
      // let status = ''
      // // 只查询 定点信 前期处理中状态
      // const letterData = (this.options['NOMINATION_LETTER_STATUS'] || []).find(o => o.name === '前期处理中')
      // const letterCode = letterData && letterData.code || 'CSF_HANDLING'
      // // 只查询 LOI 前期处理中状态
      // const loiData = (this.options['NOMINATION_LETTER_STATUS'] || []).find(o => o.name === '前期处理中')
      // const loiCode = loiData && loiData.code || 'LINIE_CONFIRING'
      // // 前期采购员
      // if (this.userRole.isQQCG) status = letterCode
      // // 专业采购员
      // if (this.userRole.isZYCG) status = loiCode
      // // 前期采购员 && 专业采购员
      // if (this.userRole.isZYCG && this.userRole.isQQCG) status = letterCode

      // const types = {
      //   1 : `/sourceinquirypoint/sourcing/partsletter?status=${status}&currentUser=true&isDelay=false`,
      //   2 : `/sourceinquirypoint/sourcing/partsletter?cardType=LOI&loiStatus=${status}&currentUser=true&isDelay=false`
      // }
      const types = {
        1 : `/sourceinquirypoint/sourcing/partsletter?showSelf=true&currentUser=true&isDelay=false`,
        2 : `/sourceinquirypoint/sourcing/partsletter?showSelf=true&cardType=LOI&currentUser=true&isDelay=false`
      }
      return types[type]
    },
    nomiURL(type){
      const data = applyType.find(o => o.name === type)
      const code = data && data.id || ''
      const applicationStatus = nomiApplicationStatus.find(o => o.name === '流转中')
      const applicationStatusCode = applicationStatus && applicationStatus.id || ''
      const nominateParams = type === '流转' ? `nominateProcessType=${code}&applicationStatus=${applicationStatusCode}&` : ''
      return `/sourcing/partsnomination?showSelf=true&${nominateParams}currentUser=true&isDelay=true`
    },
    // 获取下拉值
    getSearchOptions() {
      const types = [
        // 跳转采购项目建立，零件状态列表
        'RFQ_PART_STATUS_CODE_TYPE',
        // RFQ 时间轴状态列表
        'RFQ_OVERVIEW_TYPE',
        // 定点信状态
        'NOMINATION_LETTER_STATUS',
        // LOI 状态
        'NOMINATION_LOI_STATUS'
      ];
      selectDictByKeyss(types).then((res) => {
        types.forEach(optionKey => {
          const options = res.data && res.data[optionKey] || [];
          this.options[optionKey] = options.map(o => {
            o.value = o.value || o.name || o.nameEn
            if (this.lang) o.value = this.$i18n.locale === 'zh' ? o.value : o.nameEn
            return o
          })
        })
        
      });
    },
    // 专业采购员和前期采购员要传的参数
    userRoleParams(args = []) {
      let paramTxt = ''
      const argsName = ['buyerName','linieName']
      if (args && args.length) {
        args.forEach((item, index) => {
          argsName[index] = item
        })
      }
      if (this.userRole.isQQCG) paramTxt += `&${argsName[0]}=${this.userInfo.nameZh}`
      if (this.userRole.isZYCG) paramTxt += `&${argsName[1]}=${this.userInfo.nameZh}`
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
            partsProcureData: materialGroupOverviewDTO.map(o => o.timeRateSum || 0) || [],
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