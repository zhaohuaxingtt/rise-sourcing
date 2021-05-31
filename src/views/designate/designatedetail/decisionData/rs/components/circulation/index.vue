<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:18:01
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-31 11:29:26
 * @Description: 流转RS单
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\circulation\index.vue
-->

<template>
  <div :class="isPreview && 'isPreview'">
    <iCard :title="'CSC推荐表/CSC Recommendation Sheet会外流转'">
      <iFormGroup row="4" class="csc">
        <div class="col">
          <iFormItem v-for="(item,index) in titleData" :key="'titleData'+index"  :label="item.label+':'">
            <iText >
              {{ item.value }}
            </iText>
          </iFormItem>
        </div>
      </iFormGroup>
    </iCard>
    <iCard :title="'流转定点推荐 - ' + cardTitle" :class="!isPreview && 'margin-top20'">
      <tableList selection :tableTitle="tableTitle" :tabelData="tableData" class="rsTable" />
      <iPagination v-update 
        @size-change="handleSizeChange($event, getRfqTableList)" 
        @current-change="handleCurrentChange($event, getRfqTableList)" 
        background 
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <iCard title="备注" :class="!isPreview && 'margin-top20'">
      <template slot="header-control" v-if="!isPreview">
        <iButton v-if="!isEdit" @click="handleEdit">编辑</iButton>
        <template v-else>
          <iButton @click="handleDeleteRemark">删除</iButton>
          <iButton @click="handleAddRemark">添加</iButton>
          <iButton>保存</iButton>
          <iButton @click="cancelEdit">取消</iButton>
        </template>
      </template>
      <div class="meetingRemark">
        <div class="meetingRemark-item" v-for="(item, index) in remarkItem" :key="index">
          <el-checkbox v-if="!isPreview" v-model="item.checked"></el-checkbox>
          <iInput v-model="item.value" class="margin-top10" :class="!isPreview && 'margin-left20'" type="textarea" :rows="3" resize="none"></iInput>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, icon, iPagination, iFormGroup, iFormItem, iText } from 'rise'
import { nomalTableTitle, checkList, accessoryTableTitle, sparePartTableTitle } from './data'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
export default {
  mixins: [pageMixins],
  components: { iCard, tableList, iButton, iInput, icon, iPagination, iFormGroup, iFormItem, iText },
  props: {
    isPreview: {type:Boolean, default:false}
  },
  data() {
    return {
      titleData:[
        {label:'零件关系',value:'配件'},
        {label:'询价采购员',value:'胡伟'},
        {label:'货币单位',value:'RMB'},
        {label:'申请单号',value:''},
        {label:'申请日期',value:'2020-01-01'},
        {label:'LINIE采购员',value:'胡伟'},
        {label:'Exchange rate',value:'1 RMB=1.00 RMB'},
      ],
      tableTitle: nomalTableTitle,
      tableData: [],
      remarkItem: [{value: '', checked: false},{value: '', checked: false},{value: '', checked: false}],
      checkList: checkList,
      isEdit: false
    }
  },
  computed: {
    cardTitle() {
      // '配件采购 Nomination Recommendation - Spare Part Purchasing'
      // '附件采购 Nomination Recommendation – Accessory Purchasing'
      return '生产采购 Nomination Recommendation - Production Purchasing'
    }
  },
  methods: {
    handleEdit() {
      this.isEdit = true
    },
    cancelEdit() {
      this.isEdit = false
    },
    handleAddRemark() {
      this.remarkItem.push({value: '', checked: false})
    },
    handleDeleteRemark() {
      this.remarkItem = this.remarkItem.filter(item => !item.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.meetingRemark {
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
.csc {
  ::v-deep .el-form-item__label {
    width: 150px;
  }
}
.isPreview {
  .card {
    box-shadow: none;
  }
}
</style>