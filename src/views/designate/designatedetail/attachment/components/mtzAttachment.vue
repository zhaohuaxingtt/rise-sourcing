<template>
  <iCard class="margin-bottom25">
    <div class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{language("MTZ Attachment", "MAT Attachment")}}
      </span>
    </div>
    <tablelist
      index
      :selection="!$store.getters.isPreview"
      :tableTitle ="uploadtableTitle"
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
import { uploadtableTitle} from './data'
import { attachMixins } from '@/utils/attachMixins'
import { pageMixins } from '@/utils/pageMixins'
export default {
  mixins: [ attachMixins, pageMixins ],
  components: {
    iCard, 
    tablelist,
    iPagination
  },
  data() {
    return{
      uploadtableTitle,
      tableLoading: false,
      multiEditState: false,
      multiEditControl: false,
      page: {
        currPage: 1,
        pageSizes: 10,
        totalCount: 0,
        layout:"prev, pager, next, jumper"
      }
    }
  },
  mounted() {
    this.getFetchDataList()
  },
}
</script>
<style>

</style>