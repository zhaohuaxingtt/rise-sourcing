<!--
 * @Author: your name
 * @Date: 2021-06-28 16:14:19
 * @LastEditTime: 2021-07-02 18:01:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\inquiryAttachment\components\inquiryAttachment\index.vue
-->
<template>
  <iCard :title="language('XUNJIAFUJIAN', '询价附件')">
    <template #header-control>
      <iButton :loading="downloadLoading" @click="handleDownload">{{ language("XIAZAI", "下载") }}</iButton>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        :lang="true"
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
        @size-change="handleSizeChange($event, getAllAnnex)"
        @current-change="handleCurrentChange($event, getAllAnnex)"
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
import { inquiryAttachmentTableTitle as tableTitle } from "../data"
import { getAllAnnex } from "@/api/partsrfq/editordetail"
import { downloadFile, downloadUdFile } from "@/api/file"

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tableList
  },
  mixins: [ pageMixins ],
  props: {
    rfqId: {
      type: String,
      require: true
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
  },
  data() {
    return {
      downloadLoading: false,
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: []
    }
  },
  methods: {
    getAllAnnex() {
      this.loading = true

      getAllAnnex({
        fileType: "2",
        rfqId: this.rfqId,
        userId: this.userInfo.id,
        current: this.page.currPage,
        size: this.page.pageSize,
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        } else {
          this.tableListData = []
          this.page.totalCount = 0
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    async handleDownload() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.language("QINGXUANZEXUYAOXIAZAIDEWENJIAN", "请选择需要下载的文件"))

      this.downloadLoading = true
      // await downloadFile({
      //   applicationName: "rise",
      //   fileList: this.multipleSelection.map(item => item.fileName)
      // })
      await downloadUdFile(this.multipleSelection.map(item => item.uploadId))

      this.downloadLoading = false
    },
    // 单个下载
    download(row) {
      // downloadFile({
      //   applicationName: "rise",
      //   fileList: row.fileName
      // })
      downloadUdFile(row.uploadId)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>