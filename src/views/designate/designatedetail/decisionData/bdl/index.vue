<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 17:00:48
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-07 16:04:23
 * @Description: 定点管理-决策资料-BDL
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\index.vue
-->

<template>
  <iPage class="decision-bdl" v-permission.auto="SOURCING_NOMINATION_ATTATCH_BDL|决策资料-bdl">
    <div class="margin-top20" style="text-align:right;" v-if="!isPreview">
      <iButton @click="gotoSupplier">{{language('TIAOZHUANGONGYINGSHANGWEIHU','跳转供应商维护')}}</iButton>
    </div>
    <iCard v-for="(item, index) in rfqList" :key="index" :title="'RFQ NO.'+item.rfqNum+',RFQ Name:'+item.rfqName" class="margin-top20">
      <tableList :tableTitle="item.tableTitle" :selection="false" :tableData="item.tableData" class="doubleHeader" @openDialog="openRateDialog($event, item.rfqNum)">
        <template #supplierName="scope">
          <div>
            <span class="factoryDesc">{{scope.row.supplierName }}</span>
            <el-tooltip effect="light" :content="`${language('LK_FRMPINGJI','FRM评级')}：${scope.row.frmRate}`" v-if="$route.query.isPreview != 1 && scope.row.isFRMRate === 1">
              <span>
                <icon symbol name="iconzhongyaoxinxitishi" />
              </span>
            </el-tooltip>
          </div>
        </template>
        <template #sapCode="scope">
          <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
        </template>
      </tableList>
      <iPagination v-update 
        @size-change="val => sizeChange(val, index)" 
        @current-change="val => currentChange(val, index)" 
        background 
        :page-sizes="item.page.pageSizes"
        :page-size="item.page.pageSize"
        :layout="item.page.layout"
        :current-page="item.page.currPage"
        :total="item.page.totalCount"
      />
    </iCard>
    <partsRatingDialog :dialogVisible="dialogVisible" @changeVisible="changeDialogVisible" :rfqId="rfqId" :supplierId="supplierId" />
  </iPage>
</template>

<script>
import { iCard, iPage, iPagination, iButton, iMessage, icon } from 'rise'
import tableList from '../../components/tableList'
import { tableTitle } from './data'
import partsRatingDialog from './partsRating'
import { readQuotation, findRfqSupplierQuotationPage} from '@/api/designate/decisiondata/bdl'
import { pageMixins } from "@/utils/pageMixins"
import { cloneDeep, uniq } from 'lodash'
export default {
  mixins: [pageMixins],
  components: { iCard, iPage, tableList, iPagination, partsRatingDialog, iButton, icon },
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
    sizeChange(val, index) {
      this.rfqList[index].page = {
        ...this.rfqList[index].page,
        currPage:1,
        pageSize: val
      }
      const element = {
        id: this.rfqList[index].rfqNum,
        rfq_name: this.rfqList[index].rfqName
      }
      this.getTableList(element, index)
    },
    currentChange(val, index) {
      this.rfqList[index].page = {
        ...this.rfqList[index].page,
        currPage: val
      }
      const element = {
        id: this.rfqList[index].rfqNum,
        rfq_name: this.rfqList[index].rfqName
      }
      this.getTableList(element, index)
    },
    openRateDialog(row, rfqId) {
      this.rfqId = rfqId
      this.supplierId = row.supplierNo
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
      const params = {
        nominateId:this.$route.query.desinateId,rfqId:element.id, current:this.rfqList[index].page.currPage || 1, size:this.rfqList[index].page.pageSize || 10
      }
      const res = await findRfqSupplierQuotationPage(params)
      if (res?.result) {
        this.rfqList = this.rfqList.map((item, rfqIndex) => {
          return rfqIndex === index ? {
          rfqNum: element.id,
          rfqName: element.rfq_name,
          tableData: res?.data,
          tableTitle: this.getTableTitle(res.data),
          page: {
            ...item.page,
            pageSize: Number(res?.pageSize),
            currPage: Number(res?.pageNum),
            totalCount: Number(res?.total)
          }
        } : item
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
      this.rfqList = []
      if (res?.result) {
        res.data.forEach((element, index) => {
          this.rfqList.push({
            page: this.page
          })
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
      const router =  this.$router.resolve({path: '/designate/supplier', 
      query: {
        ...this.$route.query,
        route:'force'
        }
      })
      window.open(router.href,'_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.factoryDesc {
  display: inline-block;
  padding-right: 3px;
}
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