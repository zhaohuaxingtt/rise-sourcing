<template>
  <iCard class="outputRecord" tabCard :title="$t('LK_XUNJIAFUJIAN')">
    <template v-slot:header-control>
      <iButton @click="handleDownload" :loading="downloadLoading" v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSHEET_HANDDOWNLOAD">{{ $t('LK_XIAZAI') }}</iButton>
      <iButton class="deleteBtn" @click="handleDelete" :loading="deleteLoading" v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSHEET_HANDLEDELETE">{{ $t('LK_SHANCHU') }}</iButton>
      <el-upload 
        class="uploadBtn" 
        multiple
        :action="action"
        :data="{ applicationName: 'procurereq-service' }"
        name="multipartFile"
        :show-file-list="false" 
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        accept=".pdf,.xlsx,.docx">
          <iButton :loading="uploadLoading" v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSHEET_HANDLEUPLOAD">{{ $t('LK_SHANGCHUANFUJIAN') }}</iButton>
      </el-upload>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        :indexLabel="$t('LK_BIANHAO')" 
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange">
        <template #tpPartAttachmentName="scope">
          <span class="link-underline" @click="preview(scope.row)">{{ scope.row.tpPartAttachmentName }}</span>
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
        :total="page.totalCount" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from '@/components'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './data'
import { getInfoAnnexPage, deleteFile, patchTpRecords } from "@/api/partsprocure/editordetail";
import filters from '@/utils/filters'
import { downloadFile } from "@/api/file";

export default {
  components: { iCard, iButton, tableList, iPagination },
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
      action: `${ process.env.VUE_APP_COMMON }/upload`, // 上传api
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      fileList: [],
      timer: 0
    }
  },
  created() {
    this.getInfoAnnexPage()
  },
  methods: {
    beforeUpload(res) {
      // console.log(res)
      this.uploadLoading = true
    },
    uploadSuccess(res, file) {
      this.uploadLoading = false
      if (res.code != 200) {
        iMessage.error(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
      } else {
        clearTimeout(this.timer)
        iMessage.success(`${ file.name } ${ $t('LK_SHANGCHUANCHENGGONG') }`)
        this.fileList.push({ tpPartAttachmentName: res.data[0].fileName, tpPartAttachmentPath: res.data[0].filePath, size: (file.size / 1024 / 1024).toFixed(3) })
        this.timer = setTimeout(() => {
          this.patchTpRecords()
          clearTimeout(this.timer)
        }, 700)
      }
    },
    uploadError(err, file) {
      this.uploadLoading = false
      iMessage.error(`${ file.name } ${ $t('LK_SHANGCHUANSHIBAI') }`)
    },
    patchTpRecords() {
      patchTpRecords({
        enquiryAttachmentFacadeDTO: {
          partAttachmentList: this.fileList,
          purchasingRequirementId: this.params.purchasingRequirementId
        }
      })
        .then(res => {
          if (res.code == 200) {
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
        purchasingRequirementTargetIds: this.params.purchasingRequirementObjectId
      })
        .then(res => { 
          // console.log(res.data)
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
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN'))

      // 后端删除
      this.deleteLoading = true
      deleteFile({ ids: this.multipleSelection.map(item => item.id) })
        .then(res => {
          iMessage.success(this.$t('LK_SHANCHUCHENGGONG'))
          this.getInfoAnnexPage()
          this.deleteLoading = false
          this.multipleSelection = []
        })
        .catch(() => this.deleteLoading = false)
    },
    preview(row) {
      downloadFile({
        applicationName: 'procurereq-service',
        fileList: row.tpPartAttachmentName
      })
    },
    async handleDownload() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN'))

      this.downloadLoading = true
      await downloadFile({
        applicationName: 'procurereq-service',
        fileList: this.multipleSelection.map(item => item.tpPartAttachmentName).join('&fileList=')
      })

      this.downloadLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.outputRecord {
  .deleteBtn {
    & + .uploadBtn {
      margin-left: 10px;
    }
  }

  .uploadBtn {
    display: inline-block;
  }
}
</style>