<template>
  <iCard class="outputRecord" tabCard :title="language('LK_XUNJIAFUJIAN','询价附件')">
    <template v-slot:header-control>
      <iButton @click="handleDownload" :loading="downloadLoading" v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSHEET_HANDDOWNLOAD">{{ language('LK_XIAZAI','下载') }}</iButton>
      <iButton v-if="!disabled" class="deleteBtn" @click="handleDelete" :loading="deleteLoading" v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSHEET_HANDLEDELETE">{{ language('LK_SHANCHU','删除') }}</iButton>
      <el-upload 
        v-if="!disabled"
        class="uploadBtn" 
        multiple
        ref="upload"
        name="multipartFile"
        :http-request="upload"
        :show-file-list="false" 
        :before-upload="beforeUpload"
        accept=".pdf,.xlsx,.docx">
          <iButton :loading="uploadLoading" v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSHEET_HANDLEUPLOAD">{{ language('LK_SHANGCHUANFUJIAN','上传附件') }}</iButton>
      </el-upload>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        :indexLabel="language('LK_BIANHAO','编号')" 
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange">
        <template #tpPartAttachmentName="scope">
          <span class="flexRow">
            <span class="openLinkText cursor" @click="preview(scope.row)"> {{scope.row.tpPartAttachmentName}}</span>
            <span class="icon-gray  cursor  " v-if="scope.row.tpPartAttachmentName"  @click="preview(scope.row)">
              <icon symbol class="show" name="icontiaozhuananniu" />
              <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span>  
        </template>
        <template #updateDate="scope">
          <span>{{ scope.row.updateDate | dateFilter }}</span>
        </template>
      </tableList>
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, getInfoAnnexPage)"
        @current-change="handleCurrentChange($event, getInfoAnnexPage)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" 
		v-update
		/>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, icon, iMessageBox} from 'rise'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './data'
import { getInfoAnnexPage, deleteFile, patchTpInfoByAttachment } from "@/api/partsprocure/editordetail";
import filters from '@/utils/filters'
import { downloadFile, downloadUdFile } from "@/api/file";
import { uploadFile, uploadUdFile } from "@/api/file/upload";
import { getToken } from "@/utils";

export default {
  components: { iCard, iButton, tableList, iPagination, icon},
  inject: ['getDisabled'],
  mixins: [ pageMixins, filters ],
  props: {
    params: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      uploadLoading: false,
      downloadLoading: false,
      deleteLoading: false,
      // action: `${ process.env.VUE_APP_COMMON }/upload`, // 上传api
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      fileList: [],
      timer: 0
    }
  },
  computed: {
    disabled() {
      return this.getDisabled()
    }
  },
  created() {
    this.getInfoAnnexPage()
    this.token = getToken()
  },
  methods: {
    upload(content) {
      // const formData = new FormData()
      // formData.append('multipartFile', content.file)
      // formData.append('applicationName', 'procurereq-service')
      // uploadFile(formData)
      //   .then(res => {
      //     this.uploadSuccess(res, content.file)
      //   })
      //   .catch(rej => {
      //     this.uploadError(rej, content.file)
      //   })
      uploadUdFile({
        multifile: content.file
      })
      .then(res => {
        this.uploadSuccess(res, content.file)
      })
      .catch(rej => {
        this.uploadError(rej, content.file)
      })
    },
    beforeUpload() {
      this.uploadLoading = true
    },
    uploadSuccess(res, file) {
      this.uploadLoading = false
      if (res.code != 200) {
        iMessage.error(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
      } else {
        clearTimeout(this.timer)
        iMessage.success(`${ file.name } ${ this.language('LK_SHANGCHUANCHENGGONG','上传成功') }`)
        this.fileList.push({ tpPartAttachmentId: res.data[0].id, tpPartAttachmentName: res.data[0].name, tpPartAttachmentPath: res.data[0].path, size: file.size, uploadId: res.data[0].id })
        this.timer = setTimeout(() => {
          this.patchTpInfoByAttachment()
          clearTimeout(this.timer)
        }, 700)
      }
    },
    uploadError(err, file) {
      this.uploadLoading = false
      iMessage.error(`${ file.name } ${ this.language('LK_SHANGCHUANSHIBAI','上传失败') }`)
    },
    patchTpInfoByAttachment() {
      patchTpInfoByAttachment({
        partAttachmentList: this.fileList,
        purchasingRequirementId: this.params.purchasingRequirementId
      })
        .then(res => {
          if (res.code == 200) {
            this.fileList = []
            this.getInfoAnnexPage()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        })
        .catch(() => {})
    },
    getInfoAnnexPage() {
      this.loading = true
      
      getInfoAnnexPage({
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        purchasingRequirementTargetId: this.params.purchasingRequirementObjectId ? this.params.purchasingRequirementObjectId + "" : undefined
      })
        .then(res => { 
          this.tableListData = res.data.tpRecordList
          this.page.totalCount = res.data.totalCount || 0
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    handleDelete() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN','请选择需要删除的附件'))
      iMessageBox(this.language('deleteSure','您确定要执行删除操作吗？'),this.language('LK_WENXINTISHI','温馨提示')).then(()=>{
      let deleteArr = []
      for(let i = 0, item; (item = this.multipleSelection[i++]); ) {
        if (item.source == 1) { // 1 外部NewPro  2 内部
          return iMessage.warn(`${ item.tpPartAttachmentName } ${ this.language('LK_WEIBUXITONGWENJIANWUFASHANCHU','为外部系统文件，无法删除') }`)
        } else {
          deleteArr.push(item)
        }
      }

      if (!deleteArr.length) return

      // 后端删除
      this.deleteLoading = true
      deleteFile({ ids: deleteArr.map(item => item.id) })
        .then(res => {
          iMessage.success(this.language('LK_SHANCHUCHENGGONG','删除成功'))
          this.getInfoAnnexPage()
          this.deleteLoading = false
          this.multipleSelection = []
        })
        .catch(() => this.deleteLoading = false)
      })
    },
    preview(row) {
      // downloadFile({
      //   applicationName: 'procurereq-service',
      //   fileList: row.tpPartAttachmentName
      // })

      downloadUdFile(row.uploadId)
    },
    async handleDownload() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN','请选择需要下载的附件'))

      this.downloadLoading = true
      // await downloadFile({
      //   applicationName: 'procurereq-service',
      //   fileList: this.multipleSelection.map(item => item.tpPartAttachmentName).join('&fileList=')
      // })
      await downloadUdFile(this.multipleSelection.map(item => item.uploadId))

      this.downloadLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.outputRecord {
  .openLinkText{
    color:$color-blue;
  }
  .deleteBtn {
    & + .uploadBtn {
      margin-left: 10px;
    }
  }

  .uploadBtn {
    display: inline-block;
  }
    .icon-gray{
    cursor: pointer;
    .active{
      display: none;
    }
    .show{
      display: block;
    }
  }
  .flexRow{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-gray:hover{
    cursor: pointer;
    .show{
      display: none;
    }
    .active{
      display: block;
    }
  }
}
</style>