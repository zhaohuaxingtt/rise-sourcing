<!--
 * @Author: your name
 * @Date: 2021-06-22 16:16:21
 * @LastEditTime: 2021-06-22 16:43:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\components\attachment\index.vue
-->
<template>
  <iCard class="attachment" :title="$t('供应商评分附件')">
    <template #header-control>
      <iButton :loading="downloadLoading" @click="handleDownload">{{ $t("下载") }}</iButton>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
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
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
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
import { attachmentTableTile as tableTitle } from "../data"
import { downloadFile } from "@/api/file"

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tableList
  },
  mixins: [ pageMixins ],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [{ fileName: "abc.pdf" }],
      multipleSelection: [],
      downloadLoading: false
    }
  },
  methods: {
    getList() {
      const getList = function() {}

      this.loading = true
      getList()
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        
        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 下载
    async handleDownload() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t("请选择需要下载的文件"))

      this.downloadLoading = true
      await downloadFile({
        applicationName: "rise",
        fileList: this.multipleSelection.map(item => item.fileName)
      })

      this.downloadLoading = false
    },
    // 单个下载
    download(row) {
      downloadFile({
        applicationName: "rise",
        fileList: row.fileName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.attachment {}
</style>