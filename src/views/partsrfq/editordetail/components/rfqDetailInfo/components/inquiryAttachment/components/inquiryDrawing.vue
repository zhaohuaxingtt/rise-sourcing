<template>

  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{cardTitle}}</span>
      <div class="floatright">
        <iButton @click="download"
                 :loading="downloadLoading"
                 v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_DRAWINGDOWNLOAD|询价图纸下载">
          {{ language('LK_XIAZAI','下载') }}
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
        v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_DRAWINGTABLE|询价图纸表格"
    ></tablelist>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination
        v-update
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
import {iCard, iButton, iPagination, iMessage} from 'rise';
import tablelist from 'pages/partsrfq/components/tablelist'
import {inquiryDrawingTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {pageInquiryDrawingsByRfqId} from "@/api/partsrfq/home";
import {downloadFile, downloadUdFile} from "@/api/file";
import { partProjTypes } from '@/config';


export default {
  props:{
    rfqId:String,
    baseInfo:{
      type:Object,
      default:()=>{},
    }
  },
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist
  },
  computed:{
    cardTitle(){
      // 配件或者附件显示相关附件 其他的叫询价图纸
      if (Array.isArray(this.baseInfo.partProjectType) && ((this.baseInfo.partProjectType[0] === partProjTypes.PEIJIAN) || this.baseInfo.partProjectType[0] === partProjTypes.FUJIAN)) return this.language('LK_XIANGGUANFUJIAN','相关附件')
      return this.language('LK_XUNJIATUZHI','询价图纸')
    }
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
      const id = this.$route.query.id || this.rfqId
      if (id) {
        this.tableLoading = true;
        const req = {
            findType: '12',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
        }
        try {
          const res = await pageInquiryDrawingsByRfqId(req)
          this.tableListData = res.data;
          // this.page.currPage = res.pageNum
          // this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    async download() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.language('LK_QINGXUANZE','请选择'))
      // const fileList = this.selectTableData.map(item => {
      //   return item.tpPartAttachmentName
      // })
      // const req = {
      //   applicationName: 'procurereq-service',
      //   fileList,
      //   /*applicationName: 'common-function-test',
      //   fileList: ['test (4).txt']*/
      // }
      // await downloadFile(req)
      await downloadUdFile(this.selectTableData.map(item => item.uploadId))
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async handleOpenPage(row) {
      // const req = {
      //   applicationName: 'procurereq-service',
      //   fileList: [row.tpPartAttachmentName]
      // }
      this.downloadLoading = true
      // await downloadFile(req)
      await window.open(row.tpPartAttachmentPath,'_blank')
      // downloadUdFile(row.uploadId)
      this.downloadLoading = false
    }
  }
}
</script>

<style scoped>

</style>