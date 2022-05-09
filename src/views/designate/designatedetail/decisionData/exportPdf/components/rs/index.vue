<template>
<div class="pageCard-main rsPdfCard">
  <slot name="tabTitle"></slot>
  <div class="rs">
    <cRsPdf v-if="isCirculation" />
    <mRsPdf
      v-else
      :cardTitle="cardTitle"
      :cardTitleEn="cardTitleEn"
      :isSingle="isSingle"
      :leftTitle="leftTitle"
      :rightTitle="rightTitle"
      :basicData="basicData"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :remarkItem="remarkItem"
      :projectType="projectType"
      :exchangeRageCurrency="exchangeRageCurrency"
      :exchangeRates="exchangeRates"
      :showSignatureForm="showSignatureForm"
      :isAuth="isAuth"
      :checkList="checkList"
      :processApplyDate="processApplyDate"
      :prototypeList="PrototypeList"
      :prototypeTitleList="prototypeTitleList"/>
  </div>
</div>
</template>

<script>
import mRsPdf from "@/views/designate/designatedetail/decisionData/rs/components/meeting/rsPdf"
import cRsPdf from "@/views/designate/designatedetail/decisionData/rs/components/circulation/rsPdf"
import {
  getDepartApproval,
  getList,
  getPrototypeList,
  getRemark,
  searchRsPageExchangeRate
} from "@/api/designate/decisiondata/rs"
import {findFrontPageSeat} from "@/api/designate"
import { nomalDetailTitle,nomalDetailTitleGS,nomalDetailTitlePF, nomalDetailTitleBlue, nomalTableTitle, meetingRemark, checkList, gsDetailTitleBlue, gsTableTitle,sparePartTableTitle,accessoryTableTitle,prototypeTitleList,dbTableTitle } from "@/views/designate/designatedetail/decisionData/rs/components/meeting/data"
import {partProjTypes} from "@/config"

export default {
  components: {mRsPdf, cRsPdf},
  props: {
    nomiData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      projectType: "",
      isSingle: false,
      basicData: {},
      tableData: [],
      remarkItem: [],
      exchangeRates: [],
      showSignatureForm: false,
      isAuth: false,
      checkList,
      processApplyDate: "",
      PrototypeList: [],
      prototypeTitleList
    }
  },
  computed: {
    cardTitle: function () {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return '配件采购'
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return '附件采购'
      }
      return '生产采购'
    },
    cardTitleEn: function () {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return 'CSC Nomination Recommendation - Spare Part Purchasing'
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return 'CSC Nomination Recommendation – Accessory Purchasing'
      }
      return 'CSC Nomination Recommendation - Production Purchasing'
    },
    leftTitle: function () {
      // GS
      if ([partProjTypes.GSLINGJIAN, partProjTypes.GSCOMMONSOURCING].includes(this.projectType)) {
        return nomalDetailTitleGS
      }
      // 配附件
      if ([partProjTypes.PEIJIAN, partProjTypes.FUJIAN].includes(this.projectType)) {
        return nomalDetailTitlePF
      }
      // 其他
      return nomalDetailTitle
    },
    rightTitle: function () {
      // GS
      if ([partProjTypes.GSLINGJIAN, partProjTypes.GSCOMMONSOURCING].includes(this.projectType)) {
        return nomalDetailTitleBlue
      }
      // 其他
      return gsDetailTitleBlue
    },
    tableTitle: function () {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return sparePartTableTitle
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return accessoryTableTitle
      } else if (this.projectType === partProjTypes.GSLINGJIAN || this.projectType === partProjTypes.GSCOMMONSOURCING) { //GS零件
        return gsTableTitle
      } else if (this.projectType === partProjTypes.DBLINGJIAN || this.projectType === partProjTypes.DBYICHIXINGCAIGOU) { //DB零件,DB一次性采购
        return dbTableTitle
      }
      return nomalTableTitle
    },
    exchangeRageCurrency: function () {
      if (this.basicData.currencyRateMap) {
        const exchangeRageCurrency = []
        for (var key in this.basicData.currencyRateMap) {
          if (key) {
            exchangeRageCurrency.push(key)
          }
        }
        return exchangeRageCurrency
      }
      return []
    },
    isCirculation() {
      return this.nomiData.nominateProcessType === "TRANFORM"
    },
  },
  created() {
    this.findFrontPageSeat()
    this.getList()
    this.getRemark()
    this.getDepartApproval()
    this.getPrototypeList()
  },
  methods: {
    findFrontPageSeat: function () {
      findFrontPageSeat({
        nominateId: this.$route.query.desinateId
      })
          .then(res => {
            if (res.code == 200) {
              this.isSingle = res.data.isSingle
            } else {
              this.isSingle = false
            }
          })
    },
    getList: function () {
      getList(this.$route.query.desinateId).then(res => {
        if (res.code == 200) {
          let temdata = res.data || {}
          temdata.suppliersNow = temdata.supplierVoList
          if (temdata.partNameDe) {
            temdata.partName = `${temdata.partName}/${temdata.partNameDe}`
          }
          this.basicData = temdata
          let data = res.data?.lines
          data.forEach((val, index) => {
            let suppliersNowCn = []
            let suppliersNowEn = []
            val.supplierVoList.forEach(val => {
              suppliersNowCn.push(val.shortNameZh)
              suppliersNowEn.push(val.shortNameEn)
            })
            let supplierData = []
            for (let i = 0; i < suppliersNowCn.length; i++) {
              let dataSuper = `${suppliersNowCn[i]}/${suppliersNowEn[i]}`
              supplierData.push(dataSuper)
            }
            supplierData = supplierData.length ? supplierData.join('\n') : '-'
            val.suppliersNow = supplierData.replace(/\n/g, "<br/>");
            if (val.supplierNameEn)
              val.supplierName = `${val.supplierName}/${val.supplierNameEn}`
            if (val.partNameDe)
                // val.partName = `${val.partName}/${val.partNameDe}`
              val.partName = val.partNameDe
          })
          this.tableData = data
          this.projectType = res.data.partProjectType || ''

          this.searchRsPageExchangeRate()
        } else {
          this.basicData = {}
          this.tableData = []
          this.projectType = ''
        }
      })
    },
    getRemark: function () {
      getRemark(this.$route.query.desinateId).then(res => {
        if (res.code == 200) {
          const remarks = {}
          res.data.forEach(element => {
            remarks[element.remarkType] = element.remark || ''
            this.remarkItem = meetingRemark.map(item => {
              return {...item, value: remarks[item.remarkType]}
            })
          })
        }
      })
    },
    searchRsPageExchangeRate: function () {
      searchRsPageExchangeRate(this.$route.query.desinateId)
          .then(res => {
            if (res.code == 200) {
              if (this.basicData.currency) {
                const sourceData = Array.isArray(res.data) ? res.data : []

                this.exchangeRates = sourceData
                  .filter(item => !item.isCurrentVersion)
                  .filter(item => Array.isArray(item.exchangeRateVos) && item.exchangeRateVos.length)
                  
                this.exchangeRates = this.exchangeRates.map(item => {
                  const result = { version: item.exchangeRateVos[0].version }
                  
                  result.str = item.exchangeRateVos.map(item => this.exchangeRateProcess(item)).join(",")

                  if (this.exchangeRates.length > 1) {
                    result.fsNumsStr = Array.isArray(item.fsNums) ? item.fsNums.join("、") : ''
                  } else {
                    result.fsNumsStr = ""
                  }

                  return result
                })
              }
            }
          })
    },
    // 汇率显示处理
    exchangeRateProcess: function (row) {
      return `100${row.currencyCode} = ${math.multiply(math.bignumber(row.exchangeRate || 0), 100).toString()}${row.originCurrencyCode}`
    },
    getDepartApproval: function () {
      getDepartApproval(this.$route.query.desinateId).then(res => {
        if (res.code == 200) {
          this.checkList = res.data.nomiApprovalProcessNodeVOList
          this.processApplyDate = res.data.processApplyDate || ''
        }
      })
    },
    getPrototypeList: function () {
      getPrototypeList(this.$route.query.desinateId).then(res => {
        this.PrototypeList = res.data.list || res.data.getQuotationSampleVOList || []
        // 获取上会备注
        if (res.data && res.code == 200) {
          this.remarkItem = meetingRemark.map(item => {
            this.remarks[item.type] = res.data[item.remarkType] || ''
            return {...item, value: res.data[item.remarkType] || ''}
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.rs {
}
</style>
