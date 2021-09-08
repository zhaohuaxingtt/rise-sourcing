<!--
 * @Author: haojiang
 * @Date: 2021-08-06 15:21:13
 * @LastEditTime: 2021-09-08 09:41:27
 * @LastEditors: Hao,Jiang
 * @Description: 状态跟踪详情
 * @FilePath: /front-web/src/views/dashboard/report/index.vue
-->
<template>
  <iPage class="dashboard-report" v-permission.auto="REPORTMGMT_STATUSREPORT_PROCESSDETAILS_PAGE|报表管理-状态跟踪详情">
    <headerNav />
    <div class="dashboard-card margin-top10">
      <el-row :gutter="10">
        <!-- 零件签收 -->
        <el-col :span="16">
          <!-- 列表筛选 -->
          <search @search="search" ref="search" v-permission.auto="REPORTMGMT_STATUSREPORT_PROCESSDETAILS_SEARCH|报表管理-搜索" />
        </el-col>
        <el-col :span="8">
          <iCard class="report-countrfq" :style="`height:${sarchWindowHeight}px`">
            <ul>
              <li v-permission.auto="REPORTMGMT_STATUSREPORT_PROCESSDETAILS_PROCESSDETAILSINGRFQ|报表管理-进行中的RFQ"><div><strong>{{rfqInProgress}}</strong><p class="margin-top10">{{language('JINXINGZHONGDERFQ','进行中的RFQ')}}</p></div></li>
              <li v-permission.auto="REPORTMGMT_STATUSREPORT_PROCESSDETAILS_DELAYRFQ|报表管理-延误的RFQ"><div><strong class="note">{{rfqDelay}}</strong><p class="margin-top10">{{language('YANWUDERFQ','延误的RFQ')}}</p></div></li>
            </ul>
          </iCard>
        </el-col>
      </el-row>
    </div>
    <div class="margin-top10">
      <iCard class="report-rfqList" v-loading="loading" v-permission.auto="REPORTMGMT_STATUSREPORT_PROCESSDETAILS_TABLE|报表管理-表格">
        <rfqList :dataList="data" />
        <!-- <iPagination
          v-update
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="current"
          :page-sizes="[10,20,50,100,300]"
          :page-size="size"
          layout = "sizes, prev, pager, next, jumper"
          :total="total"
        /> -->
      </iCard>
    </div>
  </iPage>
</template>

<script>
import headerNav from './components/headerNav'
import search from './components/search'
import rfqList from './components/rfqList'
import {iPage, iCard, iMessage,iPagination} from 'rise'
import {rfqTimeOverview} from '@/api/dashboard'
import _ from 'lodash'

export default {
  components: {
    headerNav,
    iPage,
    iCard,
    search,
    rfqList,
    // iPagination
  },
  data() {
    return {
      data: [],
      loading: false,
      dataLoading: false,
      current: 1,
      size: 10,
      total: 0,
      pages: 0,
      rfqInProgress: 0,
      rfqDelay: 0,
      // 搜索框高度
      sarchWindowHeight: 131
    }
  },
  mounted() {
    this.data = []
    this.init()
    this.scrolLithener()
    const searchDom = document.querySelector('.dashboard-card')
    this.sarchWindowHeight = searchDom.offsetHeight || 131
  },
  methods: {
    handleSizeChange(size){
      this.data = []
      this.size = size
      this.init()
    },
    handleCurrentChange(current){
      this.data = []
      this.current = current
      this.init()
    },
    search() {
      this.data = []
      this.current = 1
      this.init()
    },
    async init(initState = true) {
      // 上次请求未结束
      if (this.dataLoading) return
      // 是否显示刷新状态
      this.loading = initState
      this.dataLoading = true
      console.log('新请求', this.$refs)
      const searchParams = this.$refs.search.form || {}
      const params = Object.assign(searchParams, {
        current: this.current,
        size: this.size
      })
      try {
        // const res = require('./moke.json')
        const res = await rfqTimeOverview(params)
        if (res.code === '200') {
          this.rfqInProgress = res.data.rfqInProgress || 0
          this.rfqDelay = res.data.rfqDelay || 0
          const data = res.data.pagers && res.data.pagers.records || []
          this.data = this.data.concat(data)
          // this.$refs.search.init(data)
          this.total = res.data.pagers && res.data.pagers.total || 0
          this.pages = res.data.pagers && res.data.pagers.pages || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
        this.dataLoading = false
      } catch(e) {
        this.loading = false
        this.dataLoading = false
        e && (iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn))
      }
    },
    scrolLithener() {
      this.$nextTick(() => {
        const el = document.querySelector('.rfq-list');
        const offsetHeight = el.offsetHeight;
          el.onscroll = () => {
          const scrollTop = el.scrollTop;
          const scrollHeight = el.scrollHeight;
          if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
            // 翻页
            if (this.current < this.pages && !this.dataLoading) {
              this.current = this.current + 1
              console.log('翻页', this.current)
              this.init()
            }
          }
        };
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.report-countrfq {
  background: #fff;
  height: 100%;
  overflow: hidden;
  position: relative;
  &:after {
    content: '';
    width: 1PX;
    height: 105px;
    display: block;
    background: rgba(197, 206, 229, 0.5);
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -53px;
  }
  .cardBody {
    height: 131PX;
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    li {
      text-align: center;
      display: flex;
      justify-content: center;
      align-content: center;
      width: 50%;
      padding-top: 25px;
      strong {
        font-size: 40px;
        color: #000000;
        &.note {
          color: #E30D0D
        }
      }
    }
  }
}
.report-rfqList {
  ::v-deep.cardBody {
    padding: 0px;
  }
}
</style>