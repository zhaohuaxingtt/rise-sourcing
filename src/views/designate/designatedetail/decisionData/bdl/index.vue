<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 17:00:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-31 11:37:42
 * @Description: 定点管理-决策资料-BDL
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\index.vue
-->

<template>
  <iPage class="decision-bdl">
    <div class="margin-top20" style="text-align:right;" v-if="!isPreview">
      <iButton @click="gotoSupplier">跳转供应商维护</iButton>
    </div>
    <iCard v-for="(item, index) in rfqList" :key="index" :title="'RFQ NO.'+item.rfqNum+',RFQ Name:'+item.rfqName" class="margin-top20">
      <tableList :tableTitle="tableTitle" :selection="false" :tableData="item.tableData" class="doubleHeader" @openDialog="changeDialogVisible(true)"></tableList>
      <iPagination v-update 
        @size-change="handleSizeChange($event, getRfqTableList)" 
        @current-change="handleCurrentChange($event, getRfqTableList)" 
        background 
        :page-sizes="item.page.pageSizes"
        :page-size="item.page.pageSize"
        :layout="item.page.layout"
        :current-page="item.page.currPage"
        :total="item.page.totalCount"
      />
    </iCard>
    <partsRatingDialog :dialogVisible="dialogVisible" @changeVisible="changeDialogVisible" />
  </iPage>
</template>

<script>
import { iCard, iPage, iPagination, iButton } from 'rise'
import tableList from '../../components/tableList'
import { tableTitle, mockData } from './data'
import partsRatingDialog from './partsRating'
export default {
  components: { iCard, iPage, tableList, iPagination, partsRatingDialog, iButton },
  data() {
    return {
      rfqList: [
        {rfqNum: '123211', rfqName: 'RFQ1', tableData: mockData, page:{}}, 
        {rfqNum: '12434432', rfqName: 'RFQ2', tableData: [], page:{}}, 
        {rfqNum: '432432', rfqName: 'RFQ3', tableData: [], page:{}}
      ],
      tableTitle: tableTitle,
      dialogVisible: false
    }
  },
  computed: {
    isPreview() {
      return this.$store.getters.isPreview || this.otherPreview
    }
  },
  methods: {
    changeDialogVisible(visible) {
      this.dialogVisible = visible
    },
    gotoSupplier() {
      const router =  this.$router.resolve({path: '/designate/supplier', query: {  }})
      window.open(router.href,'_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.decision-bdl {
  padding: 0;
}
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