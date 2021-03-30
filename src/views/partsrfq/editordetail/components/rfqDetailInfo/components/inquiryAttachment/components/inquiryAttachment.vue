<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('LK_XUNJIAFUJIAN') }}</span>
      <div class="floatright">
        <iButton @click="deleteItems"
                 v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_DELETE">
          {{ $t('LK_SHANCHU') }}
        </iButton>
        <upload-button
            @uploadedCallback="uploadAttachments"
            :upload-button-loading="uploadAttachmentsButtonLoading"
            class="margin-left8 margin-right8"
            v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_UPLOADBUTTON"/>
        <iButton @click="download"
                 :loading="downloadLoading"
                 v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_DOWNLOADBUTTON">
          {{ $t('LK_XIAZAI') }}
        </iButton>
        <!-- 暂不做，后端暂无接口：用户可以选择“通知全部供应商”，询价附件会发送给当前RFQ BDL中所选择的全部供应商-->
        <iButton @click="notifyAllSuppliers"
                 v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_NOTIFYALL">
          通知全部供应商
        </iButton>
        <!-- 暂不做，后端暂无接口：用户选择“通知已报价供应商”，系统会根据RFQ的报价记录，发给有有效报价的供应商-->
        <iButton @click="notifySuppliersWhoHaveQuoted"
                 v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_NOTIFYQUOTED">
          {{ $t('LK_TONGZHIQUANBUGONGYINGSHANG') }}
        </iButton>
      </div>
    </div>
    <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        open-page-props="fileName"
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
import {iCard, iButton, iPagination, iMessage, iMessageBox} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {inquiryAttachmentTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import uploadButton from 'pages/partsrfq/components/uploadButton'
import {deleteAnnex, getAllAnnex, uploadRfqAnnex} from "@/api/partsrfq/editordetail";
import store from '@/store'
import {downloadFile} from '@/api/file'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    uploadButton
  },
  mixins: [pageMixins, rfqCommonFunMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: inquiryAttachmentTableTitle,
      tableLoading: false,
      selectTableData: [],
      uploadAttachmentsButtonLoading: false,
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
          fileType: 2,
          rfqId: id,
          userId: store.state.permission.userInfo.id
        }
        try {
          const res = await getAllAnnex(req)
          this.tableListData = res.records;
          this.page.currPage = res.current
          this.page.pageSize = res.size
          this.page.totalCount = res.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    deleteItems() {
      iMessageBox('是否确认删除?').then(async () => {
        const annexIds = this.selectTableData.map(item => {
          return item.id
        })
        const req = {annexIds}
        const res = await deleteAnnex(req)
        this.resultMessage(res)
        this.getTableList()
      })
    },
    async uploadAttachments(data, size) {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true
        this.uploadAttachmentsButtonLoading = true
        const req = {
          rfqId: id,
          userId: store.state.permission.userInfo.id,
          fileType: 2,
          fileName: data.fileName,
          fileSize: size,
          filePath: data.filePath
        }
        const res = await uploadRfqAnnex(req)
        this.resultMessage(res)
        this.tableLoading = false
        this.uploadAttachmentsButtonLoading = false
        this.getTableList()
      }
    },
    notifyAllSuppliers() {
    },
    notifySuppliersWhoHaveQuoted() {
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
      await downloadFile(req)
    },
    async download() {
      if (this.selectTableData.length == 0)
        return iMessage.warn('请选择')
      const fileList = this.selectTableData.map(item => {
        return item.fileName
      })
      const req = {
        applicationName: 'rise',
        fileList
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