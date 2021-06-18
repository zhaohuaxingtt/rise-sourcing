<!--
 * @Author: your name
 * @Date: 2021-05-28 16:01:25
 * @LastEditTime: 2021-06-11 17:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\costanalysis\index.vue
-->
<template>
  <iPage class="analysis">
    <div class="header clearFloat">
      <div class="title">{{ $t("costanalysismanage.ChengBenFenXi") }}</div>
      <div class="control">
        <!-- <iButton @click="back">{{ $t("costanalysismanage.FanHui") }}</iButton> -->
        <uploadButton uploadClass="uploadButton" :params="uploadParams" :beforeUpload="beforeUpload" @success="uploadSuccess" @error="uploadError">
          <iButton :loading="uploadLoading">{{ $t("costanalysismanage.ShangChuan") }}</iButton>
        </uploadButton>
        <iButton @click="handleDownload">{{ $t("costanalysismanage.XiaZai") }}</iButton>
        <iButton :loading="deleteLoading" @click="handleDelete">{{ $t("costanalysismanage.ShanChu") }}</iButton>
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iCard class="margin-top30 card">
      <div class="body">
        <tableList
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="calc(100% - 54px)"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #fileName="scope">
            <span class="link-underline" @click="download(scope.row)">{{ scope.row.fileName }}</span>
          </template>
          <template #uploadDate="scope">
            <span>{{ scope.row.uploadDate | dateFilter("YYYY-MM-DD") }}</span>
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
  </iPage>
</template>

<script>
import { iPage, iButton, icon, iCard, iPagination, iMessage } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"
import uploadButton from "../uploadButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { tableTitle } from "./components/data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { getKmFileHistory, uploadFiles, deleteFileHistory } from "@/api/costanalysismanage/costanalysis"
import { downloadFile } from "@/api/file"

export default {
  components: {
    iPage,
    iButton,
    icon,
    iCard,
    iPagination,
    logButton,
    uploadButton,
    tableList
  },
  mixins: [ filters, pageMixins ],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      uploadParams: { applicationName: "rise" },
      uploadLoading: false,
      deleteLoading: false,
      timer: 0,
      fileList: []
    }
  },
  created() {
    this.rfqId = this.$route.query.rfqId
    this.getKmFileHistory()
  },
  methods: {
    getKmFileHistory() {
      if (!this.rfqId) return

      this.loading = true
      getKmFileHistory({
        type: 1,
        hostId: this.rfqId,
        currPage: this.page.currPage,
        pageSize: this.page.pageSize
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
          this.multipleSelection = []
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
    beforeUpload() {
      this.uploadLoading = true
    },
    uploadFiles() {
      this.loading = true

      uploadFiles({
        fileHistoryDTOS: this.fileList.map(item => ({
          fileCode: "0",
          fileName: item.tpPartAttachmentName,
          filePath: item.tpPartAttachmentPath,
          fileSize: item.size,
          hostId: this.rfqId,
          source: 0
        })),
        type: 1
      })
      .then(res => {
        if (res.code == 200) {
          this.getKmFileHistory()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.loading = false
        }

        this.uploadLoading = false
      })
      .catch(() => {
        this.uploadLoading = false
        this.loading = false
      })
    },
    uploadSuccess(res, file) {
      if (res.code != 200) {
        iMessage.error(`${ this.$i18n.locale === "zh" ? res.desZh : res.desEn }`)
      } else {
        this.fileList = []
        clearTimeout(this.timer)
        iMessage.success(`${ file.name } ${ this.$t("LK_SHANGCHUANCHENGGONG") }`)
        this.fileList.push({ tpPartAttachmentName: res.data[0].fileName, tpPartAttachmentPath: res.data[0].filePath, size: file.size })
        this.timer = setTimeout(() => {
          this.uploadFiles()
          clearTimeout(this.timer)
        }, 700)
      }
    },
    uploadError(err, file) {
      this.uploadLoading = false
      iMessage.error(`${ file.name } ${ this.$t('LK_SHANGCHUANSHIBAI') }`)
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 多选下载
    handleDownload() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.$t("costanalysismanage.QingXuanZeXuYaoXiaZaiDeWenJian"))

      downloadFile({
        applicationName: "rise",
        fileList: this.multipleSelection.map(item => item.fileName)
      })
    },
    // 单个下载
    download(row) {
      downloadFile({
        applicationName: "rise",
        fileList: row.fileName
      })
    },
    // 删除
    handleDelete() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.$t("costanalysismanage.QingXuanZeXuYaoShanChuDeWenJian"))
      this.deleteLoading = true
      deleteFileHistory({
        idList: this.multipleSelection.map(item => item.id)
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getKmFileHistory()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }

        this.deleteLoading = false
      })
      .catch(() => this.deleteLoading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.analysis {
  .header {
    position: relative;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }

  .card {
    .body {
      height: calc(100vh - 240px);
      min-height: 480px;
    }
  }

  .uploadButton {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>