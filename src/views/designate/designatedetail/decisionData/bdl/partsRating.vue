<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 20:57:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-23 11:21:11
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
    <iPagination v-update 
      @size-change="handleSizeChange($event, getTableData)" 
      @current-change="handleCurrentChange($event, getTableData)" 
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
import { iDialog, iMessage, iPagination } from 'rise'
import tableList from '../../components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { partsRatingTableTitle } from './data'
import { getRateByRfqIdAndSupplierPage } from '@/api/designate/decisiondata/bdl'
export default {
  mixins: [pageMixins],
  components: { iDialog, tableList, iPagination },
  props: {
    dialogVisible: { type: Boolean, default: false },
    // tableData: {type:Array},
    rfqId: {type: String},
    supplierId: {type: String}
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getTableData()
      }
    }
  },
  data() {
    return {
      tableTitle: partsRatingTableTitle,
      tableData: [],
      tableLoading: false
    }
  },
  methods: {
    getTableData() {
      if (!this.rfqId || !this.supplierId) {
        return
      }
      this.tableLoading = true
      const params = {
        rfqId: this.rfqId,
        supplierId: this.supplierId,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getRateByRfqIdAndSupplierPage(params).then(res => {
        if (res?.result) {
          this.tableData = res.data
          this.page.currPage = Number(res.pageNum)
          this.page.pageSize = Number(res.pageSize)
          this.page.totalCount = Number(res.total)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    clearDialog() {
      this.tableData = []
      this.page.currPage = 1
      this.page.totalCount = 0
      this.page.pageSize = 10
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
    // height: 90%;
    // .el-dialog__body {
    //   height: calc(100% - 70px);
    //   overflow: auto;
    // }
  }
}
</style>