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
    <tableList :selection="false" indexKey :tableTitle="tableTitle" :tableData="tableData" class="doubleHeader"></tableList>
    <!-- <iPagination v-update 
      @size-change="handleSizeChange($event, getTableData)" 
      @current-change="handleCurrentChange($event, getTableData)" 
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
import { iDialog, iMessage } from 'rise'
import tableList from '../../components/tableList'
// import { pageMixins } from "@/utils/pageMixins"
import { partsRatingTableTitle } from './data'
import { getRateByRfqIdAndSupplierPage } from '@/api/designate/decisiondata/bdl'
import { cloneDeep } from "lodash"

export default {
  // mixins: [pageMixins],
  components: { iDialog, tableList },
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

      this.$emit("update:dialogVisible", val)
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
        // current: this.page.currPage,
        // size: this.page.pageSize
      }
      getRateByRfqIdAndSupplierPage(params).then(res => {
        if (res.code == 200) {
          this.tableTitle = cloneDeep(partsRatingTableTitle)
          
          if (Array.isArray(res.data) && res.data.length > 0) {
            const item = res.data[0]
            if (Array.isArray(item.deptList)) {
              item.deptList.forEach(dept => {
                this.tableTitle.push({
                  name: dept.deptNum,
                  tooltip: true,
                  children: [
                    { props: `grade_${ dept.deptNum }`, name: "评分", key: "PINGFEN", width: "80" },
                    { props: `externaFee_${ dept.deptNum }`, name: "外部开发费(元)", key: "WAIBUKAIFAFEI_YUAN", width: "120" },
                    { props: `addFee_${ dept.deptNum }`, name: "增加的认可费(元)", key: "ZENGJIARENKEFEI_YUAN", width: "130" },
                    { props: `confirmCycle_${ dept.deptNum }`, name: "认可周期(周)", key: "RENKEZHOUQI_ZHOU", width: "110" },
                    { props: `memo_${ dept.deptNum }`, name: '备注', key: "BEIZHU", width: "80" }
                  ]
                })
              })
            }

            this.tableData = res.data.map(item => {
              const result = { ...item }

              if (Array.isArray(item.deptList)) {
                item.deptList.forEach(dept => {
                  this.$set(result, `grade_${ dept.deptNum }`, dept.grade)
                  this.$set(result, `externaFee_${ dept.deptNum }`, dept.externaFee)
                  this.$set(result, `addFee_${ dept.deptNum }`, dept.addFee)
                  this.$set(result, `confirmCycle_${ dept.deptNum }`, dept.confirmCycle)
                  this.$set(result, `memo_${ dept.deptNum }`, dept.memo_)
                })
              }

              return result
            })
          }
          // this.page.currPage = Number(res.pageNum)
          // this.page.pageSize = Number(res.pageSize)
          // this.page.totalCount = Number(res.total)
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
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>