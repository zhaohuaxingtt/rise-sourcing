<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-21 19:56:57
 * @LastEditTime: 2022-03-23 16:34:19
 * @LastEditors: YoHo
-->
<template>
  <iPage v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORDDETAILS_PAGE|定点记录详情">   
    <topComponents :logModuleName="'定点明细'" :logBizIdKey="'id'" optionDicKey2="定点申请详情页">
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
        <iButton @click='gotoRs' v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORDDETAILS_TORS|RS单">RS单</iButton>
        <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
      </div>
      <tablelist
        permissionKey="DESIGNATE_HOME_RECORD_DETAIL"
        lang
        class="aotoTableHeight"
        :tableTitle="tableDetailTitle"
        :tableData="tableListData"
        :tableLoading="tableLoading"
        v-loading="tableLoading"
        :selection="false"
        @openPage="openPage"
        v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORDDETAILS_DETAIL_TABLE|定点记录详情-表格"
        ref="tableList"
        >

        <template #supplierId="scope">
          <span>{{ scope.row.svwNum || scope.row.tempNum }}</span>
        </template>

        <template #ltc="scope">
          <span>{{resetLtcData(scope.row.ltcs,'ltc')}}</span>
        </template>

        <!-- 年降开始时间 -->
        <template #beginYearReduce="scope">
          <span>{{resetLtcData(scope.row.ltcs,'beginYearReduce')}}</span>
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
import {iPage, iCard, iFormGroup, iFormItem, iText, iPagination, iButton} from 'rise'
// import tablelist from "@/views/designate/supplier/components/tableList"
import tablelist from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import topComponents from '@/views/designate/designatedetail/components/topComponents'
import {detailList, tableDetailTitle} from "./data"
import { pageMixins } from '@/utils/pageMixins'
import {getNomiRecordDetailPageList} from '@/api/designate/nomination/record'
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins: [ pageMixins,tableSortMixins ],
  components: {
    iPage,
    topComponents,
    iCard,
    iFormGroup, 
    iFormItem, 
    iText,
    tablelist,
    iPagination,
    iButton,
    buttonTableSetting
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
            const dtoList = res.data?.dtoList ?? {}
            Array.isArray(dtoList.records) && dtoList.records.forEach(val=>{
             val.isModeApportion === true ? val.isModeApportion = '是' : val.isModeApportion = '否'
           })
           this.tableListData = res.data.dtoList.records || []
         } 
      })
    },
    gotoRs() {
      let  desinateId =this.$route.query.desinateId
      let  designateType =this.$route.query.designateType
      let  partProjType =this.$route.query.partProjType
      const openPageRs = this.$router.resolve({
        path:'/rspreview/view',
        query:{
          route: 'force',
          isPreview: 1,
          desinateId,
          designateType,
          partProjType,
          businessKey:partProjType
        }
      })
      window.open(openPageRs.href,'_blank')
    },
       // 单独处理下年降或年降计划
    resetLtcData (row,type) {
      const _row = Array.isArray(row) ? row : []
      // 年降开始时间
      if(type == 'beginYearReduce'){
        // 取第一个非0的年份
        const list = _row.filter((item)=> (+item.priceReduceRate)!='0');
        return list.length ? list[0].yearMonths : '-'
      }else{ // 年降
       // 从非0开始至非0截至的数据 不包含0
       let strList = [];
        const priceReduceRateArr = _row.map(item => item.priceReduceRate)

        let i = 0
        do {
          i = priceReduceRateArr.length
          if (priceReduceRateArr[0] == 0) priceReduceRateArr.shift()
          if (priceReduceRateArr[priceReduceRateArr.length - 1] == 0) priceReduceRateArr.pop()
        } while (i !== priceReduceRateArr.length)

        return priceReduceRateArr.length ? priceReduceRateArr.join('/') : '-'
      }
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