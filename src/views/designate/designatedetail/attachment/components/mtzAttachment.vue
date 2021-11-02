<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-19 10:59:33
 * @LastEditTime: 2021-11-01 17:00:00
 * @LastEditors:  
-->
<template>
  <iCard class="margin-bottom25">
    <div class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{language("MTZ Attachment", "MTZ Attachment")}}
      </span>
    </div>
    <tablelist
      index
      :selection="!$store.getters.isPreview"
      :tableTitle ="mtzuploadtableTitle"
      :tableData ="mtzTableData"
      :tableLoading ="tbaleLoading"
      v-loading="tableLoading"
    >
    <template #uploadDate="scope">
      {{scope.row.uploadDate | dateFilter('YYYY-MM-DD')}}
    </template>
    </tablelist>
    <iPagination
    v-update
    @size-change="handleSizeChange($event,getFetchDataList)"
    @current-change="handleCurrentChange($event,getFetchDataList)"
    background
    :current-page="page.currPage"
    :page-sizes="page.pageSizes"
    :page-size="page.pageSize"
    :layout="page.layout"
    :total="page.totalCount"
    >

    </iPagination>
  </iCard>
</template>
<script>
import {iCard, iPagination} from 'rise'
import tablelist from "@/views/designate/supplier/components/tableList";
import { mtzuploadtableTitle} from './data'
import { attachMixins } from '@/utils/attachMixins'
import { pageMixins } from '@/utils/pageMixins'
import { getMtzAttachmentPageList } from '@/api/designate/designatedetail/attachment'
export default {
  mixins: [ attachMixins, pageMixins ],
  components: {
    iCard, 
    tablelist,
    iPagination
  },
  data() {
    return{
      nomiAppId: this.$route.query.mtzApplyId || '',
      mtzuploadtableTitle,
      tableLoading: false,
      multiEditState: false,
      multiEditControl: false,
      mtzTableData:[],
      page: {
        currPage: 1,
        pageSizes: 10,
        totalCount: 0,
        layout:"prev, pager, next, jumper"
      }
    }
  },
  created() {
    this.getFetchDataList()
  },
  methods: {
    getFetchDataList() {
      let data = {
        mtzAppId:this.nomiAppId-0,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      if(this.nomiAppId !== '')
      getMtzAttachmentPageList(data).then(res => {
        this.mtzTableData = res.data
      })
    }
  }
}
</script>
<style>

</style>