<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 17:00:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-10 16:17:25
 * @Description: 定点管理-决策资料-BDL
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\index.vue
-->

<template>
<div ref="bdl">
  <div class="margin-top20" style="text-align:right;" v-if="!isExportPdf && isPreview!='1'">
    <!-- 流转中、被冻结的申请单不可编辑 -->
    <iButton v-if="applicationStatus!=='ONFLOW' && applicationStatus!=='FREEZE'" v-permission.auto="SOURCING_NOMINATION_ATTATCH_BDL_GOTOSUPPLIERMAINTENANCE|跳转供应商维护"  @click="gotoSupplier">{{language('TIAOZHUANGONGYINGSHANGWEIHU','跳转供应商维护')}}</iButton>
  </div>
  <div ref="rsPdfCard">
  <iCard v-for="(item, index) in rfqList" :key="index" :title="'RFQ NO.'+item.rfqNum+',RFQ Name:'+item.rfqName" class="margin-top20">
    <tableList :tableRowClassName="'table-row'+index" :tableTitle="item.tableTitle" :selection="false" :tableData="item.tableData" class="doubleHeader" @openDialog="openRateDialog($event, item.rfqNum)" v-permission.auto="SOURCING_NOMINATION_ATTATCH_BDL_TABLE|决策资料-bdl-表格">
      <template #supplierName="scope">
        <div>
          <span class="factoryDesc">{{scope.row.supplierName }}</span>
          <el-tooltip effect="light" :content="`${language('LK_FRMPINGJI','FRM评级')}：${scope.row.frmRate}`" v-if="$route.query.isPreview != 1 && scope.row.isFRMRate === 1">
            <span>
              <icon symbol name="iconzhongyaoxinxitishi" />
            </span>
          </el-tooltip>
          <supplierBlackIcon
            :isShowStatus="typeof(scope.row.isComplete) ==='boolean' ? !scope.row.isComplete : false"
            :BlackList="scope.row.blackStuffs || []"
          />
          <div>{{ scope.row.supplierNameEn }}</div>
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
      v-if="!isExportPdf"
    />
  </iCard>
  </div>
  <partsRatingDialog :dialogVisible="dialogVisible" @changeVisible="changeDialogVisible" :rfqId="rfqId" :supplierId="supplierId" />
  <div class="pdf-item">
    <div ref="tabTitle" style="padding:1px">
      <slot name="tabTitle"></slot>
    </div>
    <div class="page-logo" ref="logo">
      <img src="../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
      <div>
        <p class="pageNum"></p>
      </div>
      <div>
        <p>{{ userName }}</p>
        <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
      </div>
    </div>
    <div class="decision-bdl" v-permission.auto="SOURCING_NOMINATION_ATTATCH_BDL|决策资料-bdl">
      <template  v-for="(item, index) in rfqList">
          <div class="pageCard-main rsPdfCard" :key="i+'_'+index" v-for="(child,i) in item.tableList">
            <div style="padding:1px">
              <slot name="tabTitle"></slot>
            </div>
            <iCard :title="'RFQ NO.'+item.rfqNum+',RFQ Name:'+item.rfqName">
              <div :style="{'height': cntentHeight + 'px'}">
                <tableList :tableTitle="item.tableTitle" :selection="false" :tableData="child" class="doubleHeader" @openDialog="openRateDialog($event, item.rfqNum)" v-permission.auto="SOURCING_NOMINATION_ATTATCH_BDL_TABLE|决策资料-bdl-表格">
                  <template #supplierName="scope">
                    <div>
                      <span class="factoryDesc">{{scope.row.supplierName }}</span>
                      <el-tooltip effect="light" :content="`${language('LK_FRMPINGJI','FRM评级')}：${scope.row.frmRate}`" v-if="$route.query.isPreview != 1 && scope.row.isFRMRate === 1">
                        <span>
                          <icon symbol name="iconzhongyaoxinxitishi" />
                        </span>
                      </el-tooltip>
                      <supplierBlackIcon
                        :isShowStatus="typeof(scope.row.isComplete) ==='boolean' ? !scope.row.isComplete : false"
                        :BlackList="scope.row.blackStuffs || []"
                      />
                      <div>{{ scope.row.supplierNameEn }}</div>
                    </div>
                  </template>
                  <template #sapCode="scope">
                    <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
                  </template>
                </tableList>
              </div>
              <div class="page-logo" v-if="isExportPdf">
                <img src="../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
                <div>
                  <p class="pageNum"></p>
                </div>
                <div>
                  <p>{{ userName }}</p>
                  <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
                </div>
              </div>
            </iCard>
          </div>
      </template>
    </div>
  </div>
</div>
</template>

<script>
import { iCard, iPage, iPagination, iButton, iMessage, icon } from 'rise'
import tableList from '../../components/tableList'
import { tableTitle } from './data'
import partsRatingDialog from './partsRating'
import { readQuotation, findRfqSupplierQuotationPage} from '@/api/designate/decisiondata/bdl'
import { pageMixins } from "@/utils/pageMixins"
import { cloneDeep, uniq } from 'lodash'
import supplierBlackIcon from "@/views/partsrfq/components/supplierBlackIcon"
import filters from "@/utils/filters"
export default {
  mixins: [pageMixins,filters],
  components: { iCard, iPage, tableList, iPagination, partsRatingDialog, iButton, icon,
  supplierBlackIcon
   },
  data() {
    return {
      rfqList: [],
      tableTitle: [],
      dialogVisible: false,
      rateTableData: [],
      cntentHeight:null
    }
  },
  props:{
    isExportPdf:{
      type:Boolean,
      default:false,
    },
    tableList: { type: Array, default: () => [] },
    prototypeTableList: { type: Array, default: () => [] },
  },
  computed: {
    isPreview() {
      return this.$store.getters.isPreview || this.otherPreview
    },
    // 定点状态
    applicationStatus(){
      return this.$store.getters.applicationStatus
    },
    userName(){
      return this.$i18n.locale === 'zh' ? this.$store.state.permission.userInfo.nameZh : this.$store.state.permission.userInfo.nameEn
    },
    // hasTitle(){
    //   return this.$slots.tabTitle && 116 || 0
    // }
  },
  created() {
    this.init()
  },
  watch:{
    rfqList:{
      deep:true,
      handler(val){}
    }
  },
  methods: {
    getHeight(){
      if(!this.$refs.bdl) return
      this.width = this.$refs.bdl.offsetWidth
      this.hasTitle = this.$refs.tabTitle.offsetHeight
      let headerHeight = this.$refs.rsPdfCard.getElementsByClassName('cardHeader')[0].offsetHeight // Title 区域高度
      let pageLogo = this.$refs.logo.offsetHeight     // logo 区域高度
      let tableHeader = this.$refs.rsPdfCard.getElementsByClassName('el-table__header-wrapper')[0].offsetHeight
      // let headerHeight = 86 // Title 区域高度
      // let pageLogo = 52     // logo 区域高度
      // let tableHeader = 64  // 表头高度
      this.cntentHeight = (this.width / 841.89) * 595.28 - headerHeight - pageLogo - this.hasTitle // 内容区域对应的高度
      let rfqList = this.rfqList
      rfqList.forEach((child,index)=>{
        let heightSum = 0
        let tableList = []
        let arr = []
        if(child.tableData&&child.tableData.length&&child.tableList&&!child.tableList.length){
          const bdl = this.$refs.bdl
          let Interval = setInterval(() => {
            let rowList = bdl.getElementsByClassName('table-row'+index)
            if(rowList.length){
              clearInterval(Interval)
              rowList.forEach((item,i)=>{
                heightSum+=item.offsetHeight
                if(heightSum<this.cntentHeight - tableHeader){
                  arr.push(this.rfqList[index].tableData[i])
                }else{
                  tableList.push(JSON.parse(JSON.stringify(arr)))
                  heightSum=item.offsetHeight
                  arr = [this.rfqList[index].tableData[i]]
                }
              })
              tableList.push(JSON.parse(JSON.stringify(arr)))
              rfqList[index].tableList = tableList
            }
          }, 2000);
        }
      })
      this.rfqList = rfqList
      return
    },
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
        return [...accum, ...((curr.departmentRate || []).map(item => item.rateDepartNum))]
      },[]))
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
      
      if(this.hasTitle)
      title.unshift({ props: 'index', name: '序号', key: '', width: 80 })
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
      const {isExportPdf = false } = this;
      const params = {
        nominateId:this.$route.query.desinateId,rfqId:element.id, current:this.rfqList[index].page.currPage || 1, 
        size:(isExportPdf ? 999999 : this.rfqList[index].page.pageSize) || 10
      }
      const res = await findRfqSupplierQuotationPage(params)
      if (res?.result) {
        let tableData = res?.data.map((child,i)=>{
          if(this.hasTitle)
          child.index = 1+i
          return child
        })
        this.rfqList = this.rfqList.map((item, rfqIndex) => {
          return rfqIndex === index ? {
          tableList:[],
          rfqNum: element.id,
          rfqName: element.rfq_name,
          tableData: tableData,
          tableTitle: this.getTableTitle(res.data),
          page: {
            ...item.page,
            pageSize: Number(res?.pageSize),
            currPage: Number(res?.pageNum),
            totalCount: Number(res?.total)
          }
        } : item
        })
        this.$nextTick(()=>{
          this.getHeight()
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
.rsPdfCard{
  box-shadow: none;
  & + .rsCard {
    margin-top: 20px; /*no*/
  }
  ::v-deep .cardHeader{
    padding: 30px 0px;
  }
  ::v-deep .cardBody{
    padding: 0px;
  }
}
.factoryDesc {
  display: inline-block;
  padding-right: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95%;
  vertical-align: middle;
}
.decision-bdl {
  // padding: 0;
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

  .page-logo{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }
</style>