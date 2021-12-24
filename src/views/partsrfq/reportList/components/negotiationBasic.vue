<!--
 * @Date: 2021-11-16 11:06:02
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-24 14:09:23
 * @FilePath: \front-sourcing-new\src\views\partsrfq\reportList\components\negotiationBasic.vue
-->
<!--
 * @author: shujie
 * @createTime: 2021-6-16 4:08:35 
 * @Description:谈判助手-报告清单首页-谈判基本信息
 -->
<template>
  <iCard :title="$t('TPZS.TPJBXX')"
         collapse
         class="margin-top20">
    <tableList :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               :selection="false"
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
import { iCard, iPagination,iButton } from 'rise'
import tableList from './tableList'
import { negotiationBasicTitle } from './data'
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
      tableTitle: negotiationBasicTitle,
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

        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
         isBindingInstance:0
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
