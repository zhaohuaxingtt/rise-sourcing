<!--
 * @Author: youyuan
 * @Date: 2021-11-10 15:36:52
 * @LastEditTime: 2021-11-10 17:15:49
 * @LastEditors: Please set LastEditors
 * @Description: bidLink
 * @FilePath: \front-sourcing\src\views\partsrfq\bidLink\index.vue
-->
<template>
  <div>
    <iSearch class="margin-bottom20"  @reset="handleSearchReset" @sure="handleSearchSubmit" :icon="true">
      <el-form :model="searchForm" ref="bidLinKQueryFormRef">
          <!--RFQ/项目编号-->
          <el-form-item :label="language('RFQXIANGMUBIANHAO', 'RFQ/项目编号')" prop='rfqCode'>
            <iInput :placeholder="language('QINGSHURU', '请输入')" v-model="searchForm.rfqCode"></iInput>
          </el-form-item>
          <!--RFQ/项目名称-->
          <el-form-item :label="language('RFQXIANGMUMINGCHENG', 'RFQ/项目名称')" prop='rfqName'>
            <iInput :placeholder="language('QINGSHURU', '请输入')" v-model="searchForm.rfqName"></iInput>
          </el-form-item>
          <!--报价类型-->
          <el-form-item :label="language('BAOJIALEIXING', '报价类型')" prop='quoteType'>
            <i-select
                v-model="searchForm.quoteType"
                :placeholder="language('QINGXUANZE', '请选择')"
            >
              <el-option
                  v-for="item in offerTypeList"
                  :key="item.message"
                  :label="item.code"
                  :value="item.message"/>
            </i-select>
          </el-form-item>
          <!--竞价类型-->
          <el-form-item :label="language('JINGJIALEIXING', '竞价类型')"  prop='biddingType'>
            <i-select
                v-model="searchForm.biddingType"
                :placeholder="language('QINGXUANZE', '请选择')"
             >
              <el-option
                  v-for="item in biddingTypeList"
                  :key="item.message"
                  :label="item.code"
                  :value="item.message"/>
            </i-select>
          </el-form-item>
          <!--本轮RFQ关闭时间-->
          <el-form-item :label="language('BENLUNRFQGUANBISHIJIAN', '本轮RFQ关闭时间')" prop='rfqEndTime'>
            <iDatePicker v-model="searchForm.rfqEndTime" valueFormat="yyyy-MM-dd" type="date"/>
          </el-form-item>
          <!--开始时间-->
          <el-form-item :label="language('KAISHISHIJIAN', '开始时间')" prop='openTenderTime'>
            <iDatePicker v-model="searchForm.openTenderTime" valueFormat="yyyy-MM-dd" type="date"/>
          </el-form-item>
          <!--结束时间-->
          <el-form-item :label="language('JIESHUSHIJIAN', '结束时间')" prop='biddingBeginTime'>
            <iDatePicker v-model="searchForm.biddingBeginTime" valueFormat="yyyy-MM-dd" type="date"/>
          </el-form-item>
          <!--状态-->
          <el-form-item :label="language('ZHUANGTAI', '状态')" prop='biddingStatus'>
            <i-select
                v-model="searchForm.biddingStatus"
                :placeholder="language('QINGXUANZE', '请选择')"
            >
              <el-option
                  v-for="item in statusList"
                  :key="item.message"
                  :label="item.code"
                  :value="item.message"/>
            </i-select>

          </el-form-item>
          <!--创建人-->
          <el-form-item :label="language('CHUANGJIANREN', '创建人')" prop='createName'>
            <iInput :placeholder="language('QINGSHURU', '请输入')" v-model="searchForm.createName"></iInput>
          </el-form-item>
          <!--零件号-->
          <el-form-item :label="language('LINGJIANHAO', '零件号')" prop='partNumber'>
            <input-custom
                v-model="searchForm.partNumber"
                style="width:100%"
                :editPlaceholder="language('QINGSHURU','请输入')"
                :placeholder="language('QINGSHURU','请输入')"></input-custom>
          </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" :title="language('XIANGMULIEBIAO', '项目列表')">
      <tableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          :selection="false"
          :openPageGetRowData="true"
          openPageProps="projectCode"
          @openPage="handleClickNo">
        <template #quoteType="scope">
          <span>{{queryofferTypeName(scope.row.quoteType)}}</span>
        </template>

        <template #projectType="scope">
          <span>{{projectTypeName(scope.row.projectType)}}</span>
        </template>
        <template #biddingStatus="scope">
          <span>{{biddingStatusName(scope.row.biddingStatus)}}</span>
        </template>
        <template #createDate="scope">
          <span>{{scope.row.createDate|formatDate}}</span>
        </template>

        <template #biddingBeginTime="scope">
          <p>{{ scope.row.biddingBeginTime|formatDateTime }}</p>
          <p>{{ scope.row.biddingEndTime |formatDateTime}}</p>
        </template>
        <template #pricingDeadline="scope">
          <span>{{scope.row.pricingDeadline|formatDateTime}}</span>
        </template>

      </tableList>
      <!--分页区-->
      <iPagination v-update class="pagination"
                   @size-change="handleSizeChange($event, queryLoadBdLink)"
                   @current-change="handleCurrentChange($event, queryLoadBdLink)"
                   background
                   :current-page="page.currPage"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :total="page.totalCount"/>
    </iCard>
  </div>
</template>

<script>
import {iSearch, iCard,iSelect, iInput, iDatePicker,iPagination} from 'rise'
import tableList from '@/components/ws3/commonTable';
import {tableTitle} from './components/data'
import inputCustom from '@/components/inputCustom'
import {queryBdLink, getDictByCode} from "@/api/partsrfq/bdLink";
import {pageMixins} from '@/utils/pageMixins'
import * as dateUtils from "@/utils/date";

export default {
  mixins: [pageMixins],
  components: {
    iSearch,
    iCard,
    iInput,
    iDatePicker,
    tableList,
    inputCustom,
    iPagination,
    iSelect,
  },
  filters:{
    formatDateTime(value) {
      if (value == null || value == '') return ''
      let date = new Date(value);
      return dateUtils.formatDate(date, 'yyyy-MM-dd hh:mm')
    },
    formatDate(value){
      if (value == null || value == '') return ''
      let date = new Date(value);
      return dateUtils.formatDate(date, 'yyyy-MM-dd')
    },

  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      loading: false,
      searchForm: {
        biddingBeginTime: null,//结束时间
        biddingStatus: null,//项目状态(01：草稿,02：待竞价,03:未开标,04:竞价,05:已开标,06:已结束,07:流标,08:作废,09:已取消)
        biddingType: null,//竞价类型(01：拍买（价低者得）,02：拍卖（价高者得）)
        createName: null,//创建人姓名
        isInsideEnter: true,//是否内部进入
        openTenderTime: null,//开始时间
        pageNo: 1,
        pageSize: 10,
        partNumber: null,//零件号
        projectType: null,//项目类型(01：正式项目,02：测试项目)
        quoteType: null,//报价类型(01：开标,02：英式,03：荷式)
        rfqCode: null,//RFQ编号
        rfqEndTime: null,//本轮Rfq结束时间
        rfqName: null,//RFQ名称
        supplierId: null,//供应商Id
      },

      offerTypeList: [
        {code: '全部',name:'全部', message: null},
        {code: '开标',name:'开标', message: '01'},
        {code: '英式',name:'英式', message: '02'},
        {code: '荷式',name:'荷式', message: '03'},
      ],
      //竞价类型(01：拍买（价低者得）,02：拍卖（价高者得）)
      biddingTypeList: [
        {code: '全部',name:'全部', message: null},
        {code: '拍买(价低者得)', message: '01'},
        {code: '拍卖(价高者得)', message: '02'}],
      statusList: []
    }
  },
  created() {
    this.queryStatus()
    this.page.currPage=1
    this.queryLoadBdLink()
  },
  methods: {
    //表格展示报价类型
    queryofferTypeName(code){
    let item=  this.offerTypeList.find(item=>item.message===code)
      return item.name
    },
    //表格展示项目类型
    projectTypeName(code){
      if(code){
        if(code=='01')return '正式项目'
        if(code=='02')return '测试项目'
      }
      return ''
    },
    //表格展示状态
    biddingStatusName(code){
      if(code){
        let item=this.statusList.find(item=>item.message===code)
        return  item.name
      }
      return ''
    },
    // 重置
    handleSearchReset() {
      this.$refs.bidLinKQueryFormRef.resetFields()
      this.queryLoadBdLink()
    },
    // 提交
    handleSearchSubmit() {
      this.page.currPage = 1
      this.searchForm.size = this.page.pageSize
      this.queryLoadBdLink()

    },
    // 点击项目编号
    handleClickNo(item) {
      let routeData = this.$router.resolve({
        path: `/bidding/project/inquiry/${item.id}`,
      })
      window.open(routeData.href, '_blank')
    },
    queryStatus() {
      getDictByCode('BiddingStatus').then(res => {
        let status = res.data[0].subDictResultVo
        this.statusList = status.map(item => {
          return {code: `${item.code}-${item.name}`,name:item.name, message: item.code}
        })
        this.statusList.unshift( {code: '全部',name:'全部', message: null})
      })
    },
    queryLoadBdLink() {
      this.searchForm.pageNo = this.page.currPage
      this.searchForm.pageSize = this.page.pageSize
      this.loading=true
      queryBdLink(this.searchForm).then(res => {
        this.loading=false
        this.tableListData=res.data
         this.page.totalCount = res.total
        this.page.pageSize=res.pageSize
        this.page.currPage=res.pageNum
      })
    }
  }
}
</script>

<style lang='scss' scoped>


</style>
