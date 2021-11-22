<template>
  <iCard :title="title || language('FUJIAN', '附件')">
    <template #header-control>
      <iButton :loading="downloadLoading" @click="handleDownload">{{ language("XIAZAI", "下载") }}</iButton>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        lang
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #fileName="scope">
          <span class="link-underline" @click="download(scope.row)">{{ scope.row.fileName }}</span>
        </template>
      </tableList>
      <iPagination 
        v-update
        class="margin-top30"
        @size-change="handleSizeChange($event, getFiles)"
        @current-change="handleCurrentChange($event, getFiles)"
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
import { iCard, iButton, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins"
import { fileTableTitle as tableTitle } from "../data"
import { getFiles, downloadUdFile } from "@/api/file"

export default {
  components: { iCard, iButton, tableList, iPagination },
  mixins: [ pageMixins ],
  props: {
    title: {
      type: String
    },
    fileType: {
      type: String,
      require: true
    },
    hostId: {
      type: Number || String,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      downloadLoading: false,
      fileTypes: {
        ACCESSORY_TEC_ATTACHMENT: "9", // 配件的技术资料
        ACCESSORY_PACKAGE_ATTACHMENT: "10" // 配件的包装资料
      }
    }
  },
  methods: {
    getFiles() {
      const fileType = this.fileTypes[this.fileType]
      if (!fileType || !this.hostId) return

      this.loading = true
      getFiles({
        hostId: this.hostId,
        fileType,
        page: this.page.currPage,
        currPage: this.page.pageSize
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.data.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    async handleDownload() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.language("QINGXUANZEXUYAOXIAZAIDEWENJIAN", "请选择需要下载的文件"))

      this.downloadLoading = true
      await downloadUdFile(this.multipleSelection.map(item => item.uploadId))
      this.downloadLoading = false
    },
    // 单个下载
    download(row) {
      downloadUdFile(row.uploadId)
    },
  }
}
</script>

<style>

</style>