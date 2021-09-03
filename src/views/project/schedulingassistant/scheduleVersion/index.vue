<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:30:02
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-03 15:00:46
 * @Description: 排程版本查询
 * @FilePath: \front-web\src\views\project\schedulingassistant\scheduleVersion\index.vue
-->

<template>
  <div class="scheduleVersion">
    <!-- v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_SCHEDULEVERSION|排程版本查询" -->
    <search @search="handSearch" ref="searchForm" />
    <!-- v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_SCHEDULEVERSION_TABLE|排程版本表格" -->
    <iCard class="margin-top20">
      <tableList indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange">
        <template #versionName="scope">
         <span class="flexRow-link">
            <span class="openLinkText underline cursor"  @click="download(scope.row)"> {{ scope.row.versionName }}</span>
          </span>
      </template>
      </tableList> 
      <iPagination v-update @size-change="handleSizeChange($event, getFetchData)" @current-change="handleCurrentChange($event, getFetchData)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
        act
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iPagination, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import search from './components/search'
import {tableTitle} from './components/data'
import {
  getScheduleVersion
} from '@/api/project/scheduleVersion'

export default {
  mixins: [ filters, pageMixins ],
  components: { iCard, iPagination, search, tableList },
  data() {
    return {
      tableTitle,
      tableData: [],
      selectTableData: [],
      tableLoading: false
    }
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    /**
     * @description: 搜索
     * @param {*}
     * @return {*}
     */    
    handSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    /**
     * @description: 多选
     * @param {*} data
     * @return {*}
     */    
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    /**
     * @description: 获取排程版本
     * @param {*}
     * @return {*}
     */    
    getFetchData() {
      this.tableLoading = true
      getScheduleVersion({
        ...this.$refs.searchForm.form,
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          const tableData = res.data || []
          this.tableData = tableData.map(o => {
            o.createDate = o.createDate ? window.moment(o.createDate).format('YYYY-MM-DD HH:mm:ss') : ''
            return o
          })
          this.page.totalCount = res.total
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        this.tableLoading = false
      })
    },
    /**
     * @description: 下载排程版本
     * @param {*} row
     * @return {*}
     */    
    download(row) {

    }

  }
  
}
</script>