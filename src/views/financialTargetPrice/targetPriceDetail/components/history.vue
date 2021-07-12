<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 14:08:28
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-01 15:48:27
 * @Description: 修改历史card
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\components\history.vue
-->

<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{language('XIUGAILISHI','修改历史')}}</span>
        <div class="floatright">
          <!--------------------分配询价科室按钮----------------------------------->
          <iButton @click="handleExport" >{{language('DAOCHU','导出')}}</iButton>
        </div>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList :activeItems='"spnrNum"' :selection="false" indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
  </iCard>
</template>

<script>
import {iCard,iPagination,iButton} from 'rise'
import tableList from '../../components/tableList'
import { historyTableTitle } from '../data'
import { pageMixins } from "@/utils/pageMixins"
import { getUpdateHistoryList } from "@/api/financialTargetPrice/index"
import { excelExport } from "@/utils/filedowLoad"
export default {
  mixins: [pageMixins],
  components: {iCard,iPagination,tableList,iButton},
  props: {
    id: {type:String}
  },
  watch: {
    id:{
      handler(val) {
        if(val) {
          this.getTableList()
        }
      },
      immediate: true
     }
  },
  data() {
    return {
      tableTitle: historyTableTitle,
      tableData: [],
      tableLoading: false,
    }
  },
  methods: {
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      if (!this.id) {
        return
      }
      this.tableLoading = true
      const params = {
        id: this.id,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      getUpdateHistoryList(params).then(res => {
        if(res?.result) {
          this.page = {
            ...this.page,
            totalCount: Number(res.total),
            currPage: Number(res.pageNum),
            pageSize: Number(res.pageSize)
          }
          this.tableData = res.data
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 导出
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleExport() {
      excelExport(this.tableData, this.tableTitle)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>