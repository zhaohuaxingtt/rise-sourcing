<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 20:57:31
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-26 20:32:30
 * @Description: 零件评分弹窗
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\partsRating.vue
-->

<template>
  <iDialog 
    title="零件评分"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="95%"
  >
    <tableList selection indexKey :tableTitle="tableTitle" :tableData="tableData" class="doubleHeader"></tableList>
    <iPagination v-update 
      @size-change="handleSizeChange($event, getRfqTableList)" 
      @current-change="handleCurrentChange($event, getRfqTableList)" 
      background 
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iPagination } from 'rise'
import tableList from '../../components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { partsRatingTableTitle } from './data'
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iSelect, iPagination, tableList },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      tableTitle: partsRatingTableTitle,
      tableData: [{}]
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.doubleHeader {
  border: none;
  &::before, &::after {
    background-color: transparent;
  }
  ::v-deep thead th:not(.is-leaf) {
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
  ::v-deep thead tr:nth-of-type(2) {
    th {
      border-left: 1px solid #fff;
    }
  }
  ::v-deep tbody td {
    border-right: none;
  }
}
</style>