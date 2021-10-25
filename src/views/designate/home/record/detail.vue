<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-21 19:56:57
 * @LastEditTime: 2021-10-25 15:42:34
 * @LastEditors:  
-->
<template>
  <iPage>   
    <topComponents>
      <span slot="left" class="floatleft font20 font-weight">
        {{language('DINGDIANMINGXI','定点明细')}}
      </span>
    </topComponents>
    <iCard>
      <iFormGroup row="4" class="accessoryPartDetail">
        <iFormItem v-for="(item, index) in detailList" :key="index" :label="language(item.key,item.label)" :class="item.row ? 'row'+item.row : ''">
          <iText>{{detailData[item.value] ? detailData[item.value].desc || detailData[item.value] : ''}}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
    <iCard class="margin-top20">
      <div class="btnRight">
        <iButton @click='gotoRs'>RS单</iButton>
      </div>
      <tablelist
        class="aotoTableHeight"
        :tableTitle="tableDetailTitle"
        :tableData="tableListData"
        :tableLoading="tableLoading"
        v-loading="tableLoading"
        :selection="false"
        @openPage="openPage"
        >
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
import {iPage, iCard, iFormGroup, iFormItem, iText, iPagination, iButton} from 'rise'
import tablelist from "@/views/designate/supplier/components/tableList"
import topComponents from '@/views/designate/designatedetail/components/topComponents'
import {detailList, tableDetailTitle} from "./data"
import { pageMixins } from '@/utils/pageMixins'
import {getNomiRecordDetailPageList} from '@/api/designate/nomination/record'
export default {
  mixins: [ pageMixins ],
  components: {
    iPage,
    topComponents,
    iCard,
    iFormGroup, 
    iFormItem, 
    iText,
    tablelist,
    iPagination,
    iButton
  },
  data() {
    return {
      detailList,
      tableDetailTitle,
      tableListData:[],
      detailData: {},
      tableLoading:false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.tableLoading = true
      let data = {
        recordId:this.$route.query.id,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getNomiRecordDetailPageList(data).then(res => {
         this.tableLoading = false
         if(res.code === '200'){
           this.detailData = res.data.baseInfo
           this.page.totalCount = res.data.dtoList.total
           this.tableListData = res.data.dtoList.records || []
         } 
      })
    },
    gotoRs() {
      let  desinateId =this.$route.query.desinateId
      let  designateType =this.$route.query.designateType
      let  partProjType =this.$route.query.partProjType
      const openPageRs = this.$router.resolve({
        path:'/designate/decisiondata/rs',
        query:{
          desinateId,
          designateType,
          partProjType,
        }
      })
      window.open(openPageRs.href,'_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      min-height: 422px !important;  
      overflow: auto !important ;
    }
  }
.accessoryPartDetail {
  .el-form-item {
    ::v-deep .el-form-item__label {
      width: 150px;
    }
  }
}
  .btnRight{
    float: right;
    margin-bottom: 20px;
  }
</style>