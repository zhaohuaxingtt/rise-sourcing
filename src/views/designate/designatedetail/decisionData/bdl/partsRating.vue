<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 20:57:31
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-25 11:20:35
 * @Description: 零件评分弹窗
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\partsRating.vue
-->

<template>
  <iDialog 
    :title="language('LINGJIANPINGFEN','零件评分')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="95%"
    class="addPartsDialog"
  >
    <tableList selection indexKey :tableTitle="tableTitle" :tableData="tableData" class="doubleHeader"></tableList>
    <!-- <iPagination v-update 
      @size-change="handleSizeChange($event, getRfqTableList)" 
      @current-change="handleCurrentChange($event, getRfqTableList)" 
      background 
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    /> -->
  </iDialog>
</template>

<script>
import { iDialog } from 'rise'
import tableList from '../../components/tableList'
// import { pageMixins } from "@/utils/pageMixins"
import { partsRatingTableTitle } from './data'
export default {
  // mixins: [pageMixins],
  components: { iDialog, tableList },
  props: {
    dialogVisible: { type: Boolean, default: false },
    tableData: {type:Array}
  },
  data() {
    return {
      tableTitle: partsRatingTableTitle,
      // tableData: [{}]
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
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    height: 90%;
    .el-dialog__body {
      height: calc(100% - 70px);
      overflow: auto;
    }
  }
}
</style>