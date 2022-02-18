<template>
  <iDialog
    class="fileManageDialog"
    v-bind="$props"
    :visible.sync="visible"
    v-on="$listeners"
  >
    <template #title>
      <p class="title">{{ language("WENJIANGUANLI", "文件管理") }}</p>
      <p class="tip">{{ language("ZHUYI", "注意") }}：{{ language("WENJIANGUANLITIPS", "上传文件后，页面将不再展示BI工具内容，而是展示所传文件的内容") }}</p>
    </template>
    <div class="body">
      <div class="control">
        <uploadButton 
          uploadClass="uploadButton" 
          accept=".jpg,.jpeg,.png,.bmp,.webp" 
          v-if="!isDisabled"
          v-permission.auto="SOURCING_NOMINATION_ATTATCH_STRATEGY_DIALOG_FILEMANAGE_BUTTON_UPLOAD|文件管理-上传"  
          :beforeUpload="beforeUpload" 
          @success="uploadSuccess" @error="uploadError">
          <iButton :disabled="loading" :loading="uploadLoading">{{ language("SHANGCHUAN", "上传") }}</iButton>
        </uploadButton>
        <iButton v-permission.auto="SOURCING_NOMINATION_ATTATCH_STRATEGY_DIALOG_FILEMANAGE_BUTTON_DOWNLOAD|文件管理-下载" :disabled="loading" :loading="downloadLoading" @click="handleDownload">{{ language("XIAZAI", "下载") }}</iButton>
        <iButton v-if="!isDisabled" v-permission.auto="SOURCING_NOMINATION_ATTATCH_STRATEGY_DIALOG_FILEMANAGE_BUTTON_DELETE|文件管理-删除" :disabled="loading" @click="handleDelete">{{ language("SHANCHU", "删除") }}</iButton>
      </div>
      <tableList
        index
        lang
        height="100%"
        class="table"
        :tableData="tableListData"
        :tableTitle="tableTitleComputed"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange">
          <template #fileName="scope">
            <span class="link-underline" @click="handleDownloadByRow(scope.row)">{{ scope.row.fileName }}</span>
          </template>
          <template #flag="scope"> <!-- 0: 不展示, 1: 展示 -->
            <icon 
              symbol 
              class="icon" 
              :class="{ cursor: !isDisabled }"
              :name="scope.row.flag === 1 ? 'iconxianshi' : 'iconyincang'" 
              @click.native="isDisabled ? '' : handleChangeVisibility(scope.row)" />
          </template>
          <template #sortOrder="scope">
            <div>
              <icon symbol :class="{ cursor: !isDisabled && scope.$index !== 0 }" class="icon" :name="scope.$index === 0 ? 'iconliebiaoweizhiding' : 'iconliebiaoyizhiding'" @click.native="isDisabled ? '' : handleChangeSort(scope.row, 'Up')" />
              <icon symbol :class="{ cursor: !isDisabled && (scope.$index !== tableListData.length - 1) }" class="icon desc" :name="scope.$index === tableListData.length - 1 ? 'iconliebiaoweizhiding' : 'iconliebiaoyizhiding'" @click.native="isDisabled ? '' : handleChangeSort(scope.row, 'Down')" />
            </div>
          </template>
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, icon, iMessage } from "rise"
import uploadButton from "@/views/costanalysismanage/components/uploadButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { fileManageTableTitle as tableTitle } from "./data"
import { getStrategy, setStrategy } from "@/api/designate/designatedetail/decisionData/strategy"
import { delFiles, downloadUdFile } from "@/api/file"

export default {
  components: { iDialog, iButton, icon, uploadButton, tableList },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    nominateAppId: {
      type: String,
      require: true
    },
    categoryCode: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      uploadLoading: false,
      downloadLoading: false,
      timer: 0,
      fileList: [],
      delFileList: [],
      tableTitle,
      tableListData: [],
      multipleSelection: []
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
    isDisabled() {
      return this.isPreview || this.nominationDisabled || this.rsDisabled
    },
    tableTitleComputed() {
      if (this.isDisabled) return this.tableTitle.filter(item => item.props !== "sortOrder")
      return this.tableTitle
    }
  },
  watch: {
    visible(nv) {
      if (nv) {
        this.getStrategy()
      } else {
        this.loading = false
        this.uploadLoading = false
        this.downloadLoading = false
        this.timer = 0
        this.fileList = []
        this.delFileList = []
        this.tableListData = []
        this.multipleSelection = []

        this.$emit("afterClose")
      }

      this.$emit("update:visible", nv)
    },
  },
  methods: {
    // 获取列表
    getStrategy() {
      this.loading = true

      getStrategy({
        nominateAppId: this.nominateAppId, // 定点申请id
        categoryCode: this.categoryCode // 材料组code
      })
      .then(res => {
        if (res.code == 200) {
          try {
            const data = JSON.parse(res.data.reportFiles)
            this.tableListData = Array.isArray(data.fileList) ? data.fileList : []
          } catch(e) {
            this.tableListData = []
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 手动保存列表
    handleSave() {
      this.loading = true

      setStrategy({
        nominateAppId: this.nominateAppId, // 定点申请id
        categoryCode: this.categoryCode, // 材料组code
        reportFiles: JSON.stringify({ fileList: this.tableListData }), // 文件列表json字符串
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.getStrategy()

          if (this.delFileList.length) {
            this.delFiles()
          }
        } else {
          iMessage.error(message)
        }
      })
      .finally(() => this.loading = false)
    },
    // 删除OBS中的文件
    delFiles() {
      delFiles(this.delFileList.map(item => ({ fileIds: item.uploadId })))
    },
    // 上传前
    beforeUpload() {
      this.fileList = []
      this.uploadLoading = true
    },
    // 上传成功
    uploadSuccess(res, file) {
      if (res.code != 200) {
        iMessage.error(`${ this.$i18n.locale === "zh" ? res.desZh : res.desEn }`)
      } else {
        clearTimeout(this.timer)
        this.fileList.push({ uploadId: res.data[0].id, fileName: res.data[0].name, filePath: res.data[0].path, fileSize: file.size, uploadTime: moment().format("YYYY-MM-DD HH:mm:ss"), uploader: this.$store.state.permission.userInfo.nameZh })
        
        this.timer = setTimeout(() => {
          this.tableListData = this.tableListData.concat(this.fileList.map(item => ({
            ...item,
            flag: 0
          }))).map((item, index, list) => ({
            ...item,
            sortOrder: list.length - 1 - index
          }))

          this.handleSave()
          this.fileList = []

          this.uploadLoading = false
          clearTimeout(this.timer)
        }, 700)
      }
    },
    // 上传失败
    uploadError(err, file) {
      this.uploadLoading = false
      iMessage.error(`${ file.name } ${ this.language("SHANGCHUANSHIBAI", "上传失败") }`)
    },
    // 下载
    async handleDownload() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOXIAZAIDEWENJIAN", "请选择需要下载的文件"))

      this.downloadLoading = true
      await downloadUdFile(this.multipleSelection.map(item => item.uploadId))
      this.downloadLoading = false
    },
    // 删除
    handleDelete() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('QINGXUANZEXUYAOSHANCHUDEWENJIAN', "请选择需要删除的文件"))

      this.delFileList = this.multipleSelection
      this.tableListData = this.tableListData.filter(item => !this.multipleSelection.includes(item)).map((item, index, list) => ({
        ...item,
        sortOrder: list.length - 1 - index
      }))

      this.handleSave()
    },
    handleDownloadByRow(row) {
      downloadUdFile(row.uploadId)
    },
    // 修改是否可见
    handleChangeVisibility(row) {
      this.$set(row, "flag", row.flag ^ 1)

      this.handleSave()
    },
    // 修改排序
    handleChangeSort(row, type) {
      const flag = this[`sort${ type }`](row)
      if (flag) this.handleSave()
    },
    // 提升
    sortUp(row) {
      if (this.tableListData[0] === row) return false

      const currentIndex = this.tableListData.indexOf(row);
      [this.tableListData[currentIndex - 1], this.tableListData[currentIndex]] = [this.tableListData[currentIndex], this.tableListData[currentIndex - 1]];
      this.tableListData[currentIndex - 1].sortOrder += 1
      this.tableListData[currentIndex].sortOrder -= 1

      return true
    },
    // 下降
    sortDown(row) {
      if (this.tableListData.slice(-1) === row) return false

      const currentIndex = this.tableListData.indexOf(row);
      [this.tableListData[currentIndex], this.tableListData[currentIndex + 1]] = [this.tableListData[currentIndex + 1], this.tableListData[currentIndex]];
      this.tableListData[currentIndex + 1].sortOrder += 1
      this.tableListData[currentIndex].sortOrder -= 1

      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.fileManageDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }

  .title,
  .tip {
    display: inline-block;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    vertical-align: bottom;
  }

  .tip {
    font-size: 14px;
    color: #86878E;
    margin-left: 20px;
  }

  ::v-deep .el-dialog__header {
    position: relative;
  }

  .control {
    text-align: right;
    margin-bottom: 15px;

    .uploadButton {
      display: inline-block;
      padding: 0 10px;
    }
  }

  ::v-deep .el-dialog {
    width: 75% !important;
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
      margin-bottom: 40px;
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
      @include pdtb(28px, 28px);
    }
  }

  .table {
    ::v-deep .el-table__body-wrapper {
      height: 580px !important;
    }
  }

  .icon {
    font-size: 16px;
  }

  .cursor {
    cursor: pointer;
  }

  .desc {
    transform: rotate(180deg);
    margin-left: 10px;
  }
}
</style>