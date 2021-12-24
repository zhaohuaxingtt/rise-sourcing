<!--
 * @Date: 2021-11-16 11:06:02
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-24 14:49:20
 * @FilePath: \front-sourcing-new\src\views\partsrfq\reportList\components\quotationAnalysis.vue
-->
<!--
 * @author: shujie
 * @createTime: 2021-6-16 4:08:35 
 * @Description:谈判助手-报告清单首页-报价分析
 -->
<template>
  <iCard :title="$t('TPZS.BJFX')"
         collapse
         class="margin-top20">
    <tableList :tableData="tableListData"
               :tableTitle="tableTitle"
               :selection="false"
               :tableLoading="tableLoading"
               index>
      <template #version="scope">
        <span class="openPage">{{scope.row.version}}</span>
      </template>
      <template #btnList="scope">
        <iButton type="text" @click="join(scope.row)">{{language('JIARU','加入')}}</iButton>
        <iButton type="text" @click="del(scope.row)">{{language('SHANCHU','删除')}}</iButton>
      </template>
    </tableList>
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page='page.currPage'
                 :total="page.totalCount" />
  </iCard>
</template>

<script>
import { iCard, iButton,iPagination } from 'rise'
import tableList from './tableList'
import { quotationAnalysisTitle } from './data'
import { pageMixins } from '@/utils/pageMixins'
import { reportList } from '@/api/partsrfq/reportList'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    tableList,
    iPagination,
    iButton
  },
  props: {
    searchCriteria: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableListData: [],
      tableTitle: quotationAnalysisTitle,
      tableLoading: false,
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      this.tableLoading = true
      let data = {
        ...this.searchCriteria,
        instanceId: -1,
         isBindingInstance:0,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
      }
      reportList(data).then((res) => {
        if (res.data) {
          this.page.currPage = res.pageNum
          this.page.totalCount = res.total
          this.tableLoading = false
          this.tableListData = res.data
        }
      })
    },
      join(row) {
      const req = {
        ids: [row.id],
      }
      this.$emit('joinTable', req)
    },
    del(row) {
      const req = {
        ids: [row.id],
      }
      this.$emit('delTable', req)
    },
  },
}
</script>

<style lang="scss">
</style>
