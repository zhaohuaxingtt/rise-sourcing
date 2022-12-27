<template>
  <iCard  ref="signPreview" class="signPreview">
    <template #header>
      <iTabsList v-if="tabs.length>1" class="tabs" type="card" v-model="tab">
        <el-tab-pane lazy v-for="tab in tabs" :key="tab.name" :label="tab.key ? language(tab.key, tab.label) : tab.label" :name="tab.name">
        </el-tab-pane>
      </iTabsList>
      <p class="title" v-if="(!showMtz && showNomi && !showChip)">Production Purchasing</p>
      <p class="title" v-if="(showMtz && !showNomi && !showChip)">MTZ Rules&Parts</p>
      <p class="title" v-if="(showChip && !showMtz && !showNomi)">Chip Rules</p>
      <div>
        <iButton @click="handleExport">{{ language("DAOCHU", "导出") }}</iButton>
        <i @click="handleCollapse" class="el-icon-arrow-up collapse margin-left20 cursor" :class="{ rotate: !collapseValue }"></i>
      </div>
    </template>
    <div>
      <template v-if="(tabs.length>1)">
        <nomi v-show="tab === 'nomi'" :tableListData="tableListData" :ltcTitle="ltcTitle"/>
        <mtz v-show="tab === 'mtz'" :mtzData="mtzData" />
        <Chip v-show="tab === 'chip'" />
      </template>
      <template v-else>
        <nomi v-if="showNomi" :tableListData="tableListData" :ltcTitle="ltcTitle"/>
        <mtz v-else-if="showMtz" :mtzData="mtzData" />
        <Chip v-else-if="showChip" :chipTableData="chipTableData" />
      </template>
    </div>
  </iCard>
</template>

<script>
import { iCard, iTabsList, iButton } from "rise"
import nomi from "./preview"
import mtz from "./components/mtzRulesAndParts"
import Chip from "./chipDetails/chipPreview"
import { getApproveSignMtzDetail, getApproveSignChipDetail } from "@/api/designate/decisiondata/rs"
import { 
  signSheetApproveDetail
} from '@/api/designate/nomination/signsheet'

export default {
  components: { iCard, iTabsList, iButton, nomi, mtz, Chip },
  data() {
    return {
      tab: "nomi",
      collapseValue: true,
      showMtz: false,
      showNomi: false,
      showChip:false,
      ltcTitle:[],
      tableListData:[],
      chipTableData:[]
    }
  },
  created() {
    this.getApproveSignMtzDetail()
    this.getFetchData()
    this.getApproveSignChipDetail()
  },
  computed:{
    tabs(){
      let result = []
        if(this.showChip){
          this.tab = 'chip'
          result.unshift({
          label: "Chip Rules",
          name: "chip",
          components: [ "Chip" ]
          },)
        }
        if(this.showMtz){
          this.tab = 'mtz'
          result.unshift({
          label: "MTZ Rules&Parts",
          name: "mtz",
          components: [ "mtz" ]
          },)
        }
        if(this.showNomi){
          this.tab = 'nomi'
          result.unshift({
            label: "Production Purchasing",
            name: "nomi",
            components: [ "nomi" ]
          },)
        }
      return result
    }
  },
  methods: {
    handleCollapse() {
      this.$refs.signPreview.handleCollapse()
      this.collapseValue = !this.collapseValue
    },
    // 零件定点
    async getFetchData() {
      this.tableLoading = true
      const signId = this.$route.query.signId
      if (!signId) {
        iMessage.error(this.language('QIANZIDANHAOBUNENGWEIKONG','签字单号不能为空'))
        return
      }
      try {
        const res = await signSheetApproveDetail({
          signId,
        })
        this.tableLoading = false
          if (res.code === '200') {
            if (res.data) {
              this.tableListData = res.data.nomiList || []
              if (this.tableListData.length) 
              this.showNomi = true
              else this.showNomi = false

              // 按年份去取ltc表头
              const ltcYearObj = {}
              this.tableListData.forEach(item => {
                const itemLTC = item.ltcList || []
                itemLTC.forEach(ltcItem => {
                  const ltcYear = window.moment(ltcItem.yearMonths).format('YYYY')
                  ltcYearObj[ltcYear] = ltcYear
                })
              })
              // 根据年份做数据格式化
              this.tableListData.map((o) => {
                const ltcList = o.ltcList || []
                Object.keys(ltcYearObj).forEach((ltcYear) => {
                  const ltcArray = ltcList.filter(ltc => window.moment(ltc.yearMonths).format('YYYY') === ltcYear)
                  const ltcValue = ltcArray.map(p => Number(p.priceReduceRate).toFixed((Number(p.priceReduceRate)%1 === 0 ? 0 : 2))).join('/')
                  o[`ltc_${ltcYear}`] = ltcValue
                  o.rsRemark = [o.csfMeetMemo || '', o.linieMeetMemo || '',o.cs1MeetMemo || ''].join('\n')
                  return o
                })
              })
              Object.keys(ltcYearObj).forEach((year, index) => {
                this.ltcTitle.push({
                  props: `ltc_${year}`,
                  name: `LTC ${year}`,
                  key: `LTC ${year}`,
                  width: 70,
                  tooltip: false
                })
              })
              console.log(this.tableListData, ltcYearObj, this.tableTitle)
            } else {
              this.showNomi = false
            }
            
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
      } catch(e) {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // MTZ
    getApproveSignMtzDetail() {
      return getApproveSignMtzDetail({
        signId: this.$route.query.signId
      })
      .then(res => {
        if (res.code == 200) {
          if (res.data) {
            this.showMtz = true

            this.mtzData = {
              ruleTableListData: Array.isArray(res.data.ruleList) ? res.data.ruleList : [],
              partTableListData: Array.isArray(res.data.partsList) ? res.data.partsList : []
            }
          } else {
            this.showMtz = false

            this.mtzData = {}
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => this.showMtz = false)
    },
    // 芯片
    getApproveSignChipDetail() {
      getApproveSignChipDetail({
        signId: this.$route.query.signId
      }).then((res) => {
        this.chipTableData = res.data || []
        if (this.chipTableData.length) {
          this.showChip = true
        } else {
          this.showChip = false
        }
      }).catch(() => this.showChip = false)
    },
    handleExport() {
      // this.$refs.nomi.exportSignSheet()
      const BASEURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
      const fileURL = `${BASEURL}${process.env.VUE_APP_SOURCING}/nominate/sign/export-sign-single?signId=${ this.$route.query.signId }`
      window.open(fileURL)
    }
  }
}
</script>

<style lang="scss" scoped>
.signPreview {
  .tabs {
    ::v-deep .el-tabs__header {
      margin-bottom: 0;
    }

    ::v-deep .el-tabs__nav {
      background: #fff;
    }
  }

  .rotate {
    transform: rotate(180deg);
    color: $color-blue;
  }
}
</style>