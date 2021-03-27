<template>
  <iCard class="outputRecord" tabCard title="询价附件">
    <template v-slot:header-control>
      <iButton class="deleteBtn" @click="handleDelete" :loading="deleteLoading" v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSHEET_HANDLEDELETE">删除</iButton>
      <el-upload 
        class="uploadBtn" 
        multiple
        name="multipartFile"
        :action="`${ action }?applicationName=rise`"
        :show-file-list="false" 
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        accept=".pdf,.xlsx,.docx">
          <iButton :loading="uploadLoading" v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSHEET_HANDLEUPLOAD">上传附件</iButton>
      </el-upload>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        indexLabel="编号" 
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange">
        <template #tpPartAttachmentName="scope">
          <span class="link-underline" @click="preview">{{ scope.row.tpPartAttachmentName }}</span>
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
import { getInfoAnnexPage, deleteFile } from "@/api/partsprocure/editordetail";
import filters from '@/utils/filters'

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
      deleteLoading: false,
      action: '/commonApi/upload', // 上传api
      tableTitle,
      tableListData: [],
      multipleSelection: [],
    }
  },
  created() {
    this.getInfoAnnexPage()
  },
  methods: {
    beforeUpload() {
      this.uploadLoading = true
    },
    uploadSuccess(res, file) {
      this.uploadLoading = false
      if (res.code != 200) {
        iMessage.error(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
      } else {
        iMessage.success(`${ file.name } 上传成功`)
        this.getInfoAnnexPage()
      }
    },
    uploadError(err, file) {
      this.uploadLoading = false
      iMessage.error(`${ file.name } 上传失败`)
    },
    getInfoAnnexPage() {
      this.loading = true
      
      getInfoAnnexPage({
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        purchasingRequirementTargetId: this.params.purchasingRequirementTargetId || '192321'
      })
        .then(res => { 
          console.log(res.data)
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
      if (!this.multipleSelection.length) return iMessage.warn('请选择需要删除的图纸')

      // 后端删除
      this.deleteLoading = true
      deleteFile({ ids: this.multipleSelection.map(item => item.id) })
        .then(res => {
          iMessage.success('删除成功')
          this.getInfoAnnexPage()
          this.deleteLoading = false
          this.multipleSelection = []
        })
        .catch(() => this.deleteLoading = false)
    },
    preview() {}
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