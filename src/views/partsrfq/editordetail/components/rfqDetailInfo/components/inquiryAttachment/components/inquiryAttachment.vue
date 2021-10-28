<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language('LK_XUNJIAFUJIAN','询价附件') }}</span>
      <div class="floatright">
        <iButton v-if="!disabled" @click="deleteItems"
                 v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_DELETE|询价附件-删除">
          {{ language('LK_SHANCHU','删除') }}
        </iButton>
        <upload-button
            v-if="!disabled"
            @uploadedCallback="uploadAttachments"
            :upload-button-loading="uploadAttachmentsButtonLoading"
            class="margin-left8 margin-right8"
            :buttonText="language('LK_SHANGCHUAN','上传')"
            v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_UPLOADBUTTON|询价附件-上传"/>
        <iButton @click="download"
                 :loading="downloadLoading"
                 v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_DOWNLOADBUTTON|询价附件-下载">
          {{ language('LK_XIAZAI','下载') }}
        </iButton>
        <!-- 暂不做，后端暂无接口：用户可以选择“通知全部供应商”，询价附件会发送给当前RFQ BDL中所选择的全部供应商-->
        <iButton v-if="!disabled" @click="notifyAllSuppliers"
                 v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_NOTIFYALL|询价附件-通知全部供应商">
          {{ language('LK_TONGZHIQUANBUGONGYINGSHANG','通知全部供应商') }}
        </iButton>
        <!-- 暂不做，后端暂无接口：用户选择“通知已报价供应商”，系统会根据RFQ的报价记录，发给有有效报价的供应商-->
<!--        <iButton @click="notifySuppliersWhoHaveQuoted"
                 v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_NOTIFYQUOTED" disabled>
          {{ $t('LK_TONGZHIYIBAOJIAGONGYINGSHANG') }}
        </iButton>-->
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
import {iCard, iButton, iPagination, iMessage, iMessageBox} from 'rise';
import tablelist from 'pages/partsrfq/components/tablelist'
import {inquiryAttachmentTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import uploadButton from 'pages/partsrfq/components/uploadButton'
import {deleteAnnex, getAllAnnex, uploadRfqAnnex, notifySuppliers} from "@/api/partsrfq/editordetail";
import store from '@/store'
import {downloadFile, downloadUdFile} from '@/api/file'
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
  inject: ["getDisabled"],
  computed: {
    disabled() {
      return this.getDisabled()
    }
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
          const {code,data,total} = res;
          if(code == 200 && data){
            this.tableListData = data;
            this.page.totalCount = total
          }
          
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    deleteItems() {
      iMessageBox(
        this.language('LK_SHIFOUQUERENSHANCHU','是否确认删除?'), // 暂时处理
        this.language('LK_WENXINTISHI','温馨提示'),
        { confirmButtonText: this.language('LK_QUEDING','确定'), cancelButtonText: this.language('LK_QUXIAO','取 消') }
      ).then(async () => {
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
          fileName: data.name,
          fileSize: size,
          filePath: data.path,
          uploadId: data.id
        }
        const res = await uploadRfqAnnex(req)
        this.resultMessage(res)
        this.tableLoading = false
        this.uploadAttachmentsButtonLoading = false
        this.getTableList()
      }
    },
    async notifyAllSuppliers() {
      const id = this.$route.query.id
      const res = await notifySuppliers(id)
      this.resultMessage(res)
    },
    notifySuppliersWhoHaveQuoted() {
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async handleOpenPage(row) {
      // const req = {
      //   applicationName: 'rise',
      //   fileList: [row.fileName]
      // }
      // await downloadFile(req)

      await downloadUdFile(row.uploadId)
    },
    async download() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.language('LK_QINGXUANZE','请选择'))
      // const fileList = this.selectTableData.map(item => {
      //   return item.fileName
      // })
      // const req = {
      //   applicationName: 'rise',
      //   fileList
      // }
      this.downloadLoading = true
      // await downloadFile(req)
      await downloadUdFile(this.selectTableData.map(item => item.uploadId))
      this.downloadLoading = false
    }
  }
}
</script>

<style scoped>

</style>