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
    <search />
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
      </tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableListFn)"
        @current-change="handleCurrentChange($event, getTableListFn)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
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
import tablelist from "../../partsign/home/components/tableList";

import {
  iPage,
  iCard,
  iButton,
  iPagination
} from "rise";

export default {
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      startLoding: false,
      page: {}
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
  methods: {
    handleSelectionChange() {

    },
    openPage() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>

<style lang="scss" scoped>
.designateSearch {
  margin-top: 20px;
}
</style>