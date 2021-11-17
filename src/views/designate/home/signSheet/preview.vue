<!--
 * @Author: haojiang
 * @Date: 2021-07-01 14:30:59
 * @LastEditTime: 2021-11-08 10:28:47
 * @LastEditors: Please set LastEditors
 * @Description: M签字单预览导出 jira-1571
 * @FilePath: /front-web/src/views/designate/home/signSheet/signView.vue
-->
<template>
<iPage :class="{ isPortal: source === 'portal' }">
  <div class="nomination-wraper">
    <iCard>
      <div class="signPreview">
        <div class="signPreview-header">
          <div class="font18 font-weight">{{'Summary List For Production Purchasing'}}</div>
          <div class="control">
            <iButton @click="exportSignSheet">
              {{ language('LK_DAOCHU', '导出') }}
            </iButton>
            <span class="tab-icon" @click="close">
              <icon symbol name="iconguanbixiaoxiliebiaokapiannei"></icon>
            </span>
          </div>
        </div>
        <div class="signPreview-body padding-top30">
          <tablelist
            height="450"
            index
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
              <span>{{ scope.row.tto | toThousands }}</span>
            </template>
          </tablelist>
        </div>
        <div class="signPreview-footer">
          <div class="tit"><span class="label">Approver:</span><span class="line"></span></div>
          <div class="time">{{currentDate}}</div>
        </div>
      </div>
    </iCard>
  </div>
</iPage>
</template>
<script>
import {signsheetViewTableTitle as tableTitle} from './components/data'
import tablelist from "@/views/designate/supplier/components/tableList";
import { toThousands } from "@/utils"

import {
  iPage,
  iCard,
  icon,
  iButton,
  iMessage
} from 'rise'
import { 
  signSheetApproveDetail
} from '@/api/designate/nomination/signsheet'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"

export default {
  mixins: [ filters, pageMixins ],
  components: {
    iPage,
    iCard,
    icon,
    iButton,
    tablelist
  },
  filters: {
    toThousands
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      // tableTitle: tableTitle,
      ltcTitle: [],
      selectTableData: [],
      startLoding: false,
      source: ""
    }
  },
  created() {
    this.getFetchData()
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
    close() {
      this.$router.back()
    },
    exportSignSheet() {
      const signId = this.$route.query.signId
      if (!signId) {
        iMessage.error(this.language('QIANZIDANHAOBUNENGWEIKONG','签字单号不能为空'))
        return
      }
      const BASEURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
      const fileURL = `${BASEURL}${process.env.VUE_APP_SOURCING}/nominate/sign/export?signId=${signId}`
      console.log(fileURL)
      window.open(fileURL)
    },
    // 获取定点管理列表
    async getFetchData(params = {}) {
      this.tableLoading = true
      const signId = this.$route.query.signId
      if (!signId) {
        iMessage.error(this.language('QIANZIDANHAOBUNENGWEIKONG','签字单号不能为空'))
        return
      }
      try {
        const res = await signSheetApproveDetail({
          ...params,
          signId,
          current: this.page.currPage,
          size: this.page.pageSize
        })
        // const res = require('./components/moke.json')
        this.tableLoading = false
          if (res.code === '200') {
            // const ltcTitlt = res.data.ltcList || []
            this.tableListData = res.data.nomiList || []
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
                width: 200,
                tooltip: false
              })
            })
            console.log(this.tableListData, ltcYearObj, this.tableTitle)
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
      } catch(e) {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    exportfile() {
      
    }
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
          width: 0;

        }
        &::-webkit-scrollbar{
          /*width: 0;宽度为0隐藏*/
          width: 0;
        }
        &::-webkit-scrollbar-thumb{
          border-radius: 2px;
          height: 50px;
          // background: #efefef;
          background: #fff;
        }
        &::-webkit-scrollbar-track{
          // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          background: #fff;
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