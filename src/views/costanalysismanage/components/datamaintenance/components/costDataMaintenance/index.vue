<!--
 * @Author: your name
 * @Date: 2021-05-27 12:33:07
 * @LastEditTime: 2021-08-23 14:54:54
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\costanalysismanage\components\datamaintenance\components\costDataMaintenance\index.vue
-->
<template>
  <div class="datamaintenance">
    <div class="control">
      <logButton class="margin-left20" />
      <span class="margin-left20">
        <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
      </span>
    </div>
    <iCard class="card margin-top65" :title="language('RENGONGCHENGBENSHUJUWEIHU', '人工成本数据维护')">
      <template v-slot:header-control>
        <iButton @click="handleExport">{{ language("DAOCHU", "导出") }}</iButton>
        <uploadButton uploadClass="uploadButton" :params="uploadParams" :beforeUpload="beforeUpload" @success="uploadSuccess" @error="uploadError">
          <iButton :loading="uploadLoading">{{ language("SHANGCHUAN", "上传") }}</iButton>
        </uploadButton>
        <iButton @click="handleDownload">{{ language("XIAZAI", "下载") }}</iButton>
        <iButton :loading="deleteLoading" @click="handleDelete">{{ language("SHANCHU", "删除") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :lang="true"
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
          @size-change="handleSizeChange($event, getKmFileHistory)"
          @current-change="handleCurrentChange($event, getKmFileHistory)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </div>
</template>

<script>
import { icon, iCard, iButton, iPagination, iMessage } from "rise"
import logButton from "@/components/logButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import uploadButton from "../../../uploadButton"
import { tableTitle } from "../data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { excelExport } from "@/utils/filedowLoad"
import { getKmFileHistory, uploadFiles, deleteFileHistory } from "@/api/costanalysismanage/costanalysis"
import { downloadFile, downloadUdFile } from "@/api/file"

export default {
  components: { 
    icon,
    iCard,
    iButton,
    iPagination,
    logButton,
    tableList,
    uploadButton
  },
  mixins: [ filters, pageMixins ],
  computed: {
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
  },
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
    this.getKmFileHistory()
  },
  methods: {
    getKmFileHistory() {
      this.loading = true
      getKmFileHistory({
        type: 2,
        hostId: this.userInfo.id,
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
    // 导出
    handleExport() {
      // if (this.tableListData.length) {
        if (this.multipleSelection.length) {
          excelExport(this.multipleSelection, this.tableTitle)
        } else {
          excelExport(this.tableListData, this.tableTitle)
        }
      // }
    },
    beforeUpload() {
      this.uploadLoading = true
    },
    uploadFiles() {
      this.loading = true

      uploadFiles({
        fileHistoryDTOS: this.fileList.map(item => ({
          fileCode: "0",
          fileName: item.fileName,
          filePath: item.filePath,
          fileSize: item.size,
          hostId: this.userInfo.id,
          source: 0,
          uploadId: item.id
        })),
        type: 2
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
    }, 
  }
}
</script>

<style lang="scss" scoped>
.datamaintenance {
  .control {
    position: absolute;
    top: 30px;
    right: 40px;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .card {
    .body {
      height: calc(100vh - 310px);
      min-height: 480px;
    }
  }

  .uploadButton {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
