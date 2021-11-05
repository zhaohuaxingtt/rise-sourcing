<!--
 * @Author: your name
 * @Date: 2021-06-28 17:22:08
 * @LastEditTime: 2021-09-02 12:02:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\inquiryAttachment\components\inquiryDrawing\index.vue
-->
<template>
  <iCard :title="language('XUNJIATUZHI', '询价图纸')">
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
        <template #tpPartAttachmentName="scope">
          <span class="link-underline" @click="download(scope.row)">{{ scope.row.tpPartAttachmentName }}</span>
        </template>
      </tableList>
      <iPagination 
        v-update
        class="margin-top30"
        @size-change="handleSizeChange($event, getRfqDataList)"
        @current-change="handleCurrentChange($event, getRfqDataList)"
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
import { inquiryDrawingTableTitle as tableTitle } from "../data"
import { getRfqDataList , pageInquiryDrawingsByRfqId} from "@/api/partsrfq/home"
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
    getRfqDataList() {
      this.loading = true

      pageInquiryDrawingsByRfqId({
          findType: "12",
          rfqId: this.rfqId,
          current: this.page.currPage,
          size: this.page.pageSize,
      })
      .then(res => {
        if (res.code == 200 && res.data) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.data.total || 0
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
      //   fileList: this.multipleSelection.map(item => item.tpPartAttachmentName)
      // })
      await downloadUdFile(this.multipleSelection.map(item => item.uploadId))

      this.downloadLoading = false
    },
    // 单个下载
    download(row) {
      // downloadFile({
      //   applicationName: "rise",
      //   fileList: row.tpPartAttachmentName
      // })
      downloadUdFile(row.uploadId)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>