<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-21 19:56:57
 * @LastEditTime: 2021-10-21 21:27:39
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
    </iCard>
  </iPage>
</template>
<script>
import {iPage, iCard, iFormGroup, iFormItem, iText} from 'rise'
import tablelist from "@/views/designate/supplier/components/tableList"
import topComponents from '@/views/designate/designatedetail/components/topComponents'
import {detailList, tableDetailTitle} from "./data"
export default {
  components: {
    iPage,
    topComponents,
    iCard,
    iFormGroup, 
    iFormItem, 
    iText,
    tablelist
  },
  data() {
    return {
      detailList,
      tableDetailTitle,
      tableListData:[],
      detailData: {},
    }
  }
}
</script>
<style lang="scss" scoped>
.accessoryPartDetail {
  .el-form-item {
    ::v-deep .el-form-item__label {
      width: 150px;
    }
  }
}
</style>