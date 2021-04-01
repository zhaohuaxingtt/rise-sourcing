<template>

  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{$t('LK_XUNJIATUZHI')}}</span>
      <div class="floatright">
        <iButton @click="download"
                 :loading="downloadLoading"
                 v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_DRAWINGDOWNLOAD">
          {{ $t('LK_XIAZAI') }}
        </iButton>
      </div>
    </div>
    <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        open-page-props="tpPartAttachmentName"
        :openPageGetRowData="true"
        @openPage="handleOpenPage"
    ></tablelist>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"
    />
  </iCard>
</template>

<script>
import {iCard, iButton, iPagination, iMessage} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {inquiryDrawingTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getRfqDataList} from "@/api/partsrfq/home";
import {downloadFile} from "@/api/file";


export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: inquiryDrawingTableTitle,
      tableLoading: false,
      selectTableData: [],
      downloadLoading: false
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        const req = {
          otherInfoPackage: {
            findType: '12',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.tableListData = res.data.inquiryDrawingsVO.inquiryDrawingsVOS;
          this.page.currPage = res.data.inquiryDrawingsVO.pageNum
          this.page.pageSize = res.data.inquiryDrawingsVO.pageSize
          this.page.totalCount = res.data.inquiryDrawingsVO.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    async download() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.$t('LK_QINGXUANZE'))
      const fileList = this.selectTableData.map(item => {
        return item.fileName
      })
      const req = {
        applicationName: 'rise',
        fileList,
        /*applicationName: 'common-function-test',
        fileList: ['test (4).txt']*/
      }
      await downloadFile(req)
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async handleOpenPage(row) {
      const req = {
        applicationName: 'rise',
        fileList: [row.fileName]
      }
      this.downloadLoading = true
      await downloadFile(req)
      this.downloadLoading = false
    }
  }
}
</script>

<style scoped>

</style>