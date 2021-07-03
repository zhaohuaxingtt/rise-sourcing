<!--
 * @Author: haojiang
 * @Date: 2021-07-01 14:30:59
 * @LastEditTime: 2021-07-03 16:30:32
 * @LastEditors: Please set LastEditors
 * @Description: M签字单预览导出 jira-1571
 * @FilePath: /front-web/src/views/designate/home/signSheet/signView.vue
-->
<template>
<iPage>
  <div class="nomination-wraper">
    <iCard>
      <div class="signPreview">
        <div class="signPreview-header">
          <div class="font18 font-weight">{{'Summary list for production purchasing'}}</div>
          <div class="control">
            <iButton @click="exportfile">
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
          </tablelist>
        </div>
        <div class="signPreview-footer">
          <div class="tit"><span class="label">Approver:</span><span class="line"></span></div>
          <div class="time">2021-06-30</div>
        </div>
      </div>
    </iCard>
  </div>
</iPage>
</template>
<script>
import {signsheetViewTableTitle as tableTitle} from './components/data'
import tablelist from "@/views/designate/supplier/components/tableList";
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
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      startLoding: false,
    }
  },
  created() {
    this.getFetchData()
  },
  methods: {
    close() {
      this.$router.back()
    },
    // 获取定点管理列表
    getFetchData(params = {}) {
      this.tableLoading = true
      const signId = this.$route.query.signId
      if (!signId) {
        iMessage.error(this.language('QIANZIDANHAOBUNENGWEIKONG','签字单号不能为空'))
        return
      }
      signSheetApproveDetail({
        ...params,
        signId,
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.tableListData = res.data.nomiList || []
          console.log(this.tableListData)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        console.log(res)
      }).catch(e => {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    exportfile() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
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