<!--
 * @Author: haojiang
 * @Date: 2021-07-01 14:30:59
 * @LastEditTime: 2022-12-02 18:46:02
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: M签字单预览导出 jira-1571
 * @FilePath: /front-web/src/views/designate/home/signSheet/signView.vue
-->
<template>
  <div class="nomination-wraper">
      <div class="signPreview">
        <div class="signPreview-body">
          <tablelist
            height="450"
            index
            lang
            border
            :selection="false"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            v-loading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
          >
            <template #rsRemark="scope">
              <span>
                <p v-if="scope.row.csfMeetMemo">{{scope.row.csfMeetMemo}}</p>
                <p v-if="scope.row.linieMeetMemo">{{scope.row.linieMeetMemo}}</p>
                <p v-if="scope.row.cs1MeetMemo">{{scope.row.cs1MeetMemo}}</p>
              </span>
            </template>
            <template #tto="scope">
              <span>{{ scope.row.tto | toFixed | toThousands }}</span>
            </template>
            <template #share="scope">
              <span>{{ (scope.row.share && +scope.row.share) + `${ scope.row.share ? '%' : '' }` }}</span>
            </template>
          </tablelist>
        </div>
        <div class="signPreview-footer">
          <div class="tit"><span class="label">Approver:</span><span class="line"></span></div>
          <div class="time">{{currentDate}}</div>
        </div>
      </div>
  </div>
</template>
<script>
import {signsheetViewTableTitle as tableTitle} from './components/data'
import tablelist from "@/views/designate/supplier/components/tableList";
import { toThousands } from "@/utils"

import {
  iCard,
  icon,
  iButton,
  iMessage
} from 'rise'
import { 
  signSheetApproveDetail
} from '@/api/designate/nomination/signsheet'
import filters from "@/utils/filters"

export default {
  mixins: [ filters ],
  components: {
    iCard,
    icon,
    iButton,
    tablelist
  },
  filters: {
    toThousands,
    toFixed(value, precision = 2) {
      if (value && math.hasNumericValue(value)) {
        return math.bignumber(value).toFixed(precision)
      }
      return ""
    },
  },
  props:{
    tableListData:{
      type: Array,
      default:()=>[]
    },
    ltcTitle:{
      type: Array,
      default:()=>[]
    }
  },
  data() {
    return {
      // tableListData: [],
      tableLoading: false,
      ltcTitle: [],
      selectTableData: [],
      startLoding: false,
      source: ""
    }
  },
  created() {
    // this.getFetchData()
    this.source = this.$route.query.source
  },
  computed: {
    tableTitle() {
      return [...tableTitle, ...this.ltcTitle]
    },
    currentDate() {
      return window.moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    // 获取定点管理列表
    // async getFetchData() {
    //   this.tableLoading = true
    //   const signId = this.$route.query.signId
    //   if (!signId) {
    //     iMessage.error(this.language('QIANZIDANHAOBUNENGWEIKONG','签字单号不能为空'))
    //     return
    //   }
    //   try {
    //     const res = await signSheetApproveDetail({
    //       signId,
    //     })
    //     this.tableLoading = false
    //       if (res.code === '200') {
    //         if (res.data) {
    //           this.tableListData = res.data.nomiList || []
    //           if (this.tableListData.length) this.$emit("haveData")
    //           else this.$emit("noData")

    //           // 按年份去取ltc表头
    //           const ltcYearObj = {}
    //           this.tableListData.forEach(item => {
    //             const itemLTC = item.ltcList || []
    //             itemLTC.forEach(ltcItem => {
    //               const ltcYear = window.moment(ltcItem.yearMonths).format('YYYY')
    //               ltcYearObj[ltcYear] = ltcYear
    //             })
    //           })
    //           // 根据年份做数据格式化
    //           this.tableListData.map((o) => {
    //             const ltcList = o.ltcList || []
    //             Object.keys(ltcYearObj).forEach((ltcYear) => {
    //               const ltcArray = ltcList.filter(ltc => window.moment(ltc.yearMonths).format('YYYY') === ltcYear)
    //               const ltcValue = ltcArray.map(p => Number(p.priceReduceRate).toFixed((Number(p.priceReduceRate)%1 === 0 ? 0 : 2))).join('/')
    //               o[`ltc_${ltcYear}`] = ltcValue
    //               o.rsRemark = [o.csfMeetMemo || '', o.linieMeetMemo || '',o.cs1MeetMemo || ''].join('\n')
    //               return o
    //             })
    //           })
    //           Object.keys(ltcYearObj).forEach((year, index) => {
    //             this.ltcTitle.push({
    //               props: `ltc_${year}`,
    //               name: `LTC ${year}`,
    //               key: `LTC ${year}`,
    //               width: 70,
    //               tooltip: false
    //             })
    //           })
    //           console.log(this.tableListData, ltcYearObj, this.tableTitle)
    //         } else {
    //           this.$emit("noData")
    //         }
            
    //       } else {
    //         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
    //       }
    //   } catch(e) {
    //     this.tableLoading = false
    //     iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
    //   }
    // },
  }
}
</script>
<style lang="scss" scoped>
.isPortal {
  padding-left: 0;
  padding-right: 0;
}

.signPreview {
  // min-height: 600px;
  .signPreview-header {
    // position: relative;
    display: flex;
    align-content: center;
    justify-content: space-between;
    .tab-icon{
      width: 20px;
      height: 20px;
      font-size: 18px;
      cursor: pointer;
      display: inline-block;
      margin-left: 10px;
    }
  }
  .signPreview-body {
    ::v-deep .el-table {
      min-height: 450px;
      &::before {
        background: #fff;
      }
      .el-table__body-wrapper {
        min-height: 90%;
        &::-webkit-scrollbar{
          /*width: 0;宽度为0隐藏*/
          // width: 0;

        }
        &::-webkit-scrollbar{
          /*width: 0;宽度为0隐藏*/
          // width: 0;
        }
        &::-webkit-scrollbar-thumb{
          // border-radius: 2px;
          // height: 50px;
          // background: #efefef;
          // background: #fff;
        }
        &::-webkit-scrollbar-track{
          // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          // border-radius: 2px;
          // background: #fff;
        }
      }
    }
  }
  .signPreview-footer {
    // position: relative;
    height: 60px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: flex-end;
    .tit {
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
    .time {
      color: #777777;
      display: inline-block;
    }
  }
}
</style>