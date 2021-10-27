<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-21 13:54:25
 * @LastEditTime: 2021-10-27 17:22:12
 * @LastEditors: Hao,Jiang
-->
<template>
  <iPage class="designatehome" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_PAGE|定点记录页面">
    <!-- 头部 -->
    <headerNav/>
    <!-- 筛选框 -->
    <div style="clear: both"></div>
    <!-- 查询区 -->
    <search @search="query" ref="search"/>
    <!-- 表格区 -->
    <iCard class="cardMargin">
      <div class="btnright margin-bottom20">
        <iButton @click="exportRecord" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_EXPORT|定点记录导出">导出</iButton>
      </div>
      <tablelist
        class="aotoTableHeight"
        :tableTitle="tableTitle"
        :tableData="tableListData"
        :tableLoading="tableLoading"
        v-loading="tableLoading"
        @openPage="openPage"
        @handleSelectionChange="handleSelectionChange"
       >
       <!-- FS号 -->
      <template #fsnrGsnrNum="scope">
          <span class="flexRow">
            <span class="openLinkText cursor " @click="openPage(scope.row)"> {{ scope.row.fsnrGsnrNum }}</span>
            <span v-if="scope.row.fsnrGsnrNum" class="icon-gray  cursor "  @click="openPage(scope.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span>  
        </template>
      </tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, initTableList)"
        @current-change="handleCurrentChange($event, initTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
  </iPage>
</template>
<script>
import {iPage, iCard, iPagination, icon, iButton, iMessage} from "rise"
import headerNav from '@/views/designate/home/components/headerNav'
import search from './components/search.vue'
import tablelist from "@/views/designate/supplier/components/tableList"
import {tableTitle} from './data'
import { pageMixins } from '@/utils/pageMixins'
import {getNomiApplicationPageList, exportNomiRecordExcel} from '@/api/designate/nomination/record'
export default {
  mixins: [ pageMixins ],
  components: {
    iPage,
    headerNav,
    search,
    iCard,
    tablelist,
    iPagination,
    icon,
    iButton
    },
  data() {
    return{
      tableTitle:tableTitle,
      tableListData:[],
      tableLoading: false,
      searchForm:{},
      selectTableData:[]
    }
  },
  created() {
    this.initTableList()
  },
  watch: {
    searchForm() {
      this.page.currPage = 1
      this.initTableList()
    }
  },
  methods: {
    query(val) {
      this.searchForm = {...val}
    },
    openPage(val) {
      let id = val.id
      let desinateId = val.appId
      let designateType =val.nominateType
      let partProjType =val.partProjType
       const opnDetail = this.$router.resolve({
        path: "/sourcing/partsnomination/record/detail",
        query: {
          id,
          desinateId,
          designateType,
          partProjType
        }
      })
      window.open(opnDetail.href,'_blank')
    },
    initTableList() {
      this.tableLoading = true
      let data ={
        ...this.searchForm,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      try{
        getNomiApplicationPageList(data).then(res => {
          this.tableLoading = false
          if(res.code === '200') {
            this.tableListData = res.data.records || []
            this.page.totalCount = res.data.total
          } else {
            this.tableListData = []
            this.page.totalCount = 0
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
  
          }
        })
      } catch(e) {
        this.tableLoading = false
         this.tableListData = []
        this.page.totalCount = 0
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    handleSelectionChange(data){
      this.selectTableData = data
    },
    exportRecord() {
      let data = Object.assign({...this.$refs.search.formRecord},{size:1})
      exportNomiRecordExcel(data).then(res=> {
        
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .openLinkText{
    color:$color-blue;
  }
  .aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      min-height: 422px !important;  
      overflow: auto !important ;
    }
  }
  .cardMargin{
    margin-top:20px
  }
  .btnright{
    float: right;
  }
  .icon-gray{
    cursor: pointer;
    .active{
      display: none;
    }
    .show{
      display: block;
    }
  }
  .flexRow{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-gray:hover{
    cursor: pointer;
    .show{
      display: none;
    }
    .active{
      display: block;
    }
  }
</style>