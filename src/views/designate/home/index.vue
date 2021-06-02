<!--
 * @Author: wentliao
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <iPage class="designateHome">
    <!-- 头部 -->
    <headerNav class="margin-bottom30" />
    <!-- 筛选框 -->
    <div style="clear: both"></div>
    <!-- 搜索区 -->
    <search @search="getDataList" />
    <!-- 表格 -->
    <iCard class="designateTable">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ $t("nominationLanguage.DingDianShenQingZongHeGuanLi") }}</span
        >
        <div class="floatright">
          <iButton
            @click="openPage"
            v-permission="PARTSPROCURE_TRANSFER"
          >
            {{ $t("nominationLanguage.XinJianLingJIanDingDianShengQIng") }}
          </iButton>
          <!--  <iButton @click="creatFs" v-permission="PARTSPROCURE_GENERATEFSBUTTON">
            {{ $t('partsprocure.PARTSPROCUREGENERATEFSGSNR') }}
          </iButton> -->
          <iButton
            @click="openPage"
            v-permission="PARTSPROCURE_CANCELPROCUREMENTITEMS"
          >
            {{ $t("nominationLanguage.CheHui") }}
          </iButton>
          <iButton
            @click="openPage"
            v-permission="PARTSPROCURE_BATCHMAINTENANCE"
          >
            {{ $t("nominationLanguage.ShanChu") }}
          </iButton>
          <iButton
            @click="openPage"
            :loading="startLoding"
            v-permission="PARTSPROCURE_STARTINQUIRY"
          >
            {{ $t("nominationLanguage.TiJiaoYiZhiXingJiaoYan") }}
          </iButton>
        </div>
      </div>
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @openPage="openPage"
        :activeItems="'partNum'"
      >
      <template #LK_CAOZUO="scope">
        <span><a href="javascript:;" @click="detail(scope.row)">{{'定点详情'}}</a></span>
      </template>
      <!-- re冻结日期 -->
      <template #rsFreezeDate="scope">
        <span>{{scope.row.rsFreezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      
      <!-- 一致性校验 -->
      <template #isPriceConsistent="scope">
        <span>{{scope.row.isPriceConsistent ? '通过' : '不通过'}}</span>
      </template>

      <!-- 定点日期 -->
      <template #nominateDate="scope">
        <span>{{scope.row.nominateDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      
      </tablelist>
      <iPagination
        v-update
        @current-change="handleCurrentChange"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSizes"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </iCard>
    
  </iPage>
</template>

<script>
import { tableTitle } from './components/data'
import headerNav from './components/headerNav'
import search from './components/search'
import tablelist from "@/views/designate/supplier/components/tableList";
import { getNominationList } from '@/api/designate/nomination'
import filters from "@/utils/filters"

import {
  iPage,
  iCard,
  iButton,
  iPagination,
  iMessage
} from "rise";

export default {
  mixins: [ filters ],
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      startLoding: false,
      page: {
        currPage: 1,
        pageSizes: 10,
        totalCount: 0
      }
    }
  },
  components: {
    iPage,
    iCard,
    iButton,
    iPagination,
    headerNav,
    search,
    tablelist
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    getDataList(params = {}) {
      this.tableLoading = true
      getNominationList({
        ...params,
        current: this.page.currPage,
        size: this.page.pageSizes
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.tableListData = res.data.records || []
          this.page.totalCount = res.data.total
          console.log(this.selectTableData)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        console.log(res)
      }).catch(e => {
        console.log(e)
        this.tableLoading = false
      })
    },
    detail(item) {

    },
    handleSelectionChange() {

    },
    openPage() {

    },
    handleCurrentChange(page) {
      this.page.currPage = page
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped>
.designateSearch {
  margin-top: 20px;
}
</style>