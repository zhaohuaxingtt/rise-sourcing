<template>
  <iCard class="outputRecord" tabCard title="图纸">
    <template v-slot:header-control>
      <iButton class="deleteBtn" @click="handleDelete" :loading="deleteLoading">删除</iButton>
      <el-upload 
        class="uploadBtn" 
        multiple
        :action="action"
        :show-file-list="false" 
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        accept=".pdf,.xlsx,.docx">
          <iButton :loading="uploadLoading">上传附件</iButton>
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
        <template #a="scope">
          <span class="link-underline" @click="preview">{{ scope.row.a }}</span>
        </template>
      </tableList>
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, getTable)"
        @current-change="handleCurrentChange($event, getTable)"
        background
        :current-page="page.size"
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

export default {
  components: { iCard, iButton, tableList, iPagination },
  mixins: [ pageMixins ],
  data() {
    return {
      loading: false,
      uploadLoading: false,
      deleteLoading: false,
      action: '', // 上传api
      tableTitle,
      tableListData: [],
      multipleSelection: []
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    beforeUpload() {
      this.uploadLoading = true
    },
    uploadSuccess(res, file) {
      this.uploadLoading = false
      iMessage.success(`${ file.name } 上传成功`)
      this.getTable()
    },
    uploadError(err, file) {
      this.uploadLoading = false
      iMessage.error(`${ file.name } 上传失败`)
    },
    getTable() {
      this.loading = true
      const timer = setTimeout(() => {
        this.loading = false
        this.page.totalCount = 0
      }, 1000)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    handleDelete() {
      if (!this.multipleSelection.length) return iMessage.warn('请选择需要删除的图纸')

      // 后端删除
      // this.deleteLoading = true
      // delete(this.multipleSelection.map(item => item.id))
      //   .then(res => {
      //     iMessage.success('删除成功')
      //     this.getTable()
      //     this.deleteLoading = false
      //     this.multipleSelection = []
      //   })
      //   .catch(() => this.deleteLoading = false)

      // 前端删除
      this.tableListData = this.tableListData.filter(item => !this.multipleSelection.includes(item))
      this.multipleSelection = []
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