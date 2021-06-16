<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 17:00:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-16 18:04:06
 * @Description: 定点管理-决策资料-BDL
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\index.vue
-->

<template>
  <iPage class="decision-bdl">
    <div class="margin-top20" style="text-align:right;" v-if="!isPreview">
      <iButton @click="gotoSupplier">跳转供应商维护</iButton>
    </div>
    <iCard v-for="(item, index) in rfqList" :key="index" :title="'RFQ NO.'+item.rfqNum+',RFQ Name:'+item.rfqName" class="margin-top20">
      <tableList :tableTitle="item.tableTitle" :selection="false" :tableData="item.tableData" class="doubleHeader" @openDialog="openRateDialog"></tableList>
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
    <partsRatingDialog :dialogVisible="dialogVisible" @changeVisible="changeDialogVisible" :tableData="rateTableData" />
  </iPage>
</template>

<script>
import { iCard, iPage, iPagination, iButton, iMessage } from 'rise'
import tableList from '../../components/tableList'
import { tableTitle, mockData } from './data'
import partsRatingDialog from './partsRating'
import { readQuotation, findRfqSupplierQuotationPage} from '@/api/designate/decisiondata/bdl'
import { pageMixins } from "@/utils/pageMixins"
import { cloneDeep, uniq } from 'lodash'
export default {
  mixins: [pageMixins],
  components: { iCard, iPage, tableList, iPagination, partsRatingDialog, iButton },
  data() {
    return {
      rfqList: [],
      tableTitle: [],
      dialogVisible: false,
      rateTableData: []
    }
  },
  computed: {
    isPreview() {
      return this.$store.getters.isPreview || this.otherPreview
    }
  },
  created() {
    this.init()
  },
  methods: {
    openRateDialog(row) {
      this.rateTableData = row.partRatingList
      this.changeDialogVisible(true)
    },
    /**
     * @Description: 初始化页面
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    init() {
      this.getRfqAndTableList()
    },
    /**
     * @Description: 动态获取表格title
     * @Author: Luoshuang
     * @param {*} tableData
     * @return {*}
     */    
    getTableTitle(tableData) {
      const title = cloneDeep(tableTitle)
      const rates = uniq(tableData.reduce((accum, curr) => {
        return [...accum, ...((curr.departmentRate || []).map(item => item.rateDepart))]
      },[]))
      console.log(rates)
      title.push({
        props:'departmentRate',
        name:'RATING', 
        key: "", 
        tooltip: true, 
        children: rates.map(item => {
              return {
                props: item,
                name: item,
                key: '',
                type: 'rate'
              }
        })
      })
      return title
    },
    /**
     * @Description: 获取每个表格数据
     * @Author: Luoshuang
     * @param {*} element
     * @param {*} index
     * @return {*}
     */    
    async getTableList(element, index) {
      const page = {...this.page, pageSize: 10, currPage: 1, totalCount: 0} 
      const params = {
        rfqId:element.id, current:page.currPage, size:page.pageSize
      }
      const res = await findRfqSupplierQuotationPage(params)
      if (res?.result) {
        this.rfqList.push({
          rfqNum: element.id,
          rfqName: element.rfq_name,
          tableData: res?.data,
          tableTitle: this.getTableTitle(res.data),
          page: {
            ...page,
            pageSize: Number(res?.pageSize),
            currPage: Number(res?.pageNum),
            totalCount: Number(res?.total)
          }
        })
      } else {
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      }
    },
    /**
     * @Description: 获取rfq List和对应的表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getRfqAndTableList() {
      const res = await readQuotation(this.$route.query.desinateId)
      if (res?.result) {
        res.data.forEach((element, index) => {
          this.getTableList(element, index)
        });
      } else {
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      }
    },
    /**
     * @Description: 零件评分弹窗控制
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeDialogVisible(visible) {
      this.dialogVisible = visible
    },
    /**
     * @Description: 跳转单一供应商
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    gotoSupplier() {
      const router =  this.$router.resolve({path: '/designate/supplier', query: this.$route.query})
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