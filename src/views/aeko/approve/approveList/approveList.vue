<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-26 16:47:13
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-27 09:58:16
 * @Description: 审批列表 Commodity审批人/CSF审批人
-->
<template>
  <div class="aeko-assign">
    <!-- tab 待审批/已审批切换 -->
    <div class="headerNav-sub margin-top30">
      <iTabsList type="card" v-model="tab" @tab-click="handleTabClick">
        <el-tab-pane lazy v-for="(item,index) in navList" :key="index" :label="language(item.key, item.name)" :name="item.code"></el-tab-pane>
      </iTabsList>
    </div>
    <!-- 搜索 -->
    <search @search="getFetchData" ref="search" />
    <!-- 表格 -->
    <iCard class="aeko-assign-table">
      <span class="font18 font-weight">
        {{ language( 'LK_AEKOSHENPI', 'AEKO审批' ) }}
      </span>
      <div class="editControl floatright margin-bottom20">
        <iButton
          class=""
          @click="assign"
        >
          {{ language('LK_PILIANGSHENPI', '批量审批') }}
        </iButton>
        <iButton
          class=""
          @click="assign"
        >
          {{ language('SHENPI', '审批') }}
        </iButton>
      </div>
      <tablelist
        height="400"
        index
        :selection="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <template #isTop="scope">
        <div >
          <span class="icon"><icon v-if="scope.row.isTop" symbol class="icon" name="iconAEKO_TOP" /></span>
        </div>
      </template>
      <template #aekoNum="scope">
        <div style="text-align:left">
          <a class="link-underline" href="javascript:;">
            {{scope.row.aekoNum}}
          </a>
        </div>
      </template>
      <template #describe="">
        <a class="link-underline" href="javascript:;">
          {{language('CHAKAN', '查看')}}
        </a>
      </template>
      <template #assignsheet="">
        <a class="link-underline" href="javascript:;">
          {{language('CHAKAN', '查看')}}
        </a>
      </template>
      </tablelist>
      <div class="pagination">
        <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getFetchData)"
          @current-change="handleCurrentChange($event, getFetchData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </div>
</template>
<script>
import search from '../components/searchcsf'
import {tableCsfTitle as tableTitle,navList} from '../components/data'
import tablelist from 'rise/web/components/iFile/tableList'; 
import {iCard, iButton, iPagination, icon, iTabsList, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    // iSelect,
    iButton,
    iPagination,
    icon,
    iTabsList,
    search,
    tablelist
  },
  data() {
    return {
      tab: '1',
      navList,
      tableTitle,
      tableListData: [],
      tableSelecteData: [],
      tableLoading: false,
    }
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    handleSelectionChange(val) {
      this.tableSelecteData = val
    },
    onSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    getFetchData() {
      console.log(this.$refs.search.form)
      this.tableListData = [
        {
          aekoNum: '12313',
          isTop: true,
          describe: '23444',
        }
      ]
    },
    assign() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.aeko-assign {
  .aeko-assign-table {
    .cardBody {
      padding: 10px;
    }
  }
}
.icon {
  svg {
    font-size: 28px;
  }
}
</style>
