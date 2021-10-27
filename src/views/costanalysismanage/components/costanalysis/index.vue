<!--
 * @Author: your name
 * @Date: 2021-05-28 16:01:25
 * @LastEditTime: 2021-06-25 14:10:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\costanalysis\index.vue
-->
<template>
  <iPage class="analysis">
    <div class="header clearFloat">
      <div class="title">{{ language("CHENGBENFENXI", "成本分析") }}</div>
      <div class="control">
        <!-- <iButton @click="back">{{ $t("costanalysismanage.FanHui") }}</iButton> -->
        <uploadButton uploadClass="uploadButton" :params="uploadParams" :beforeUpload="beforeUpload" @success="uploadSuccess" @error="uploadError">
          <iButton :loading="uploadLoading">{{ language("SHANGCHUAN", "上传") }}</iButton>
        </uploadButton>
        <iButton @click="handleDownload">{{ language("XIAZAI", "下载") }}</iButton>
        <iButton :loading="deleteLoading" @click="handleDelete">{{ language("SHANCHU", "删除") }}</iButton>
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
          :lang="true"
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
import logButton from "@/components/logButton"
import uploadButton from "../uploadButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { tableTitle } from "./components/data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { getKmFileHistory, kmUploadFiles, deleteFileHistory } from "@/api/costanalysismanage/costanalysis"
import { downloadFile, downloadUdFile } from "@/api/file"

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

      kmUploadFiles({
        fileHistoryDTOS: this.fileList.map(item => ({
          fileCode: "0",
          fileName: item.fileName,
          filePath: item.filePath,
          fileSize: item.size,
          hostId: this.rfqId,
          source: 0,
          uploadId: item.id
        })),
        type: 1
      })
      .then(res => {
        if (res.code == 200) {
          this.fileList = []
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
        clearTimeout(this.timer)
        iMessage.success(`${ file.name } ${ this.language("SHANGCHUANCHENGGONG", "上传成功") }`)
        this.fileList.push({ id: res.data[0].id, fileName: res.data[0].name, filePath: res.data[0].path, size: file.size })
        this.timer = setTimeout(() => {
          this.uploadFiles()
          clearTimeout(this.timer)
        }, 700)
      }
    },
    uploadError(err, file) {
      this.uploadLoading = false
      iMessage.error(`${ file.name } ${ this.language("SHANGCHUANSHIBAI", "上传失败") }`)
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 多选下载
    handleDownload() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.language("QINGXUANZEXUYAOXIAZAIDEWENJIAN", "请选择需要下载的文件"))

      // downloadFile({
      //   applicationName: "rise",
      //   fileList: this.multipleSelection.map(item => item.fileName)
      // })
      downloadUdFile(this.multipleSelection.map(item => item.uploadId))
    },
    // 单个下载
    download(row) {
      // downloadFile({
      //   applicationName: "rise",
      //   fileList: row.fileName
      // })
      downloadUdFile(row.uploadId)
    },
    // 删除
    handleDelete() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.language("QINGXUANZEXUYAOSHANCHUDEWENJIAN", "请选择需要删除的文件"))
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