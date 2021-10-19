<template>
  <iDialog class="dialog" :title="`${language('LK_FUJIANLIEBIAO','附件列表') }（${language('LK_DANGQIANBANBEN','当前版本') } : V${ params.version }）`" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <div class="control" id="control">
        <iButton @click="download" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRYDIALOG_DOWNLOAD">{{ language('LK_XIAZAI','下载') }}</iButton>
      </div>
      <tableList index :height="controlHeight ? '91%' : '100%'" v-show="visible" class="table margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #tpPartAttachmentName="scope">
          <span class="link-underline" @click="preview(scope.row)">{{ scope.row.tpPartAttachmentName }}</span>
        </template>
        <template #updateDate="scope">
          <span>{{ scope.row.updateDate | dateFilter }}</span>
        </template>
      </tableList>
    </div>
    <div slot="footer" class="footer">
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getAttachment)"
        @current-change="handleCurrentChange($event, getAttachment)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </iDialog>
</template>

<script>
import { iPagination, iDialog, iMessage, iButton } from 'rise'
import tableList from './tableList'
import { enquiryTableTitle as tableTitle } from './data'
import { getAttachment } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import { downloadFile, downloadUdFile } from '@/api/file'
import filters from '@/utils/filters'

export default {
  components: { tableList, iPagination, iDialog, iButton },
  mixins: [ pageMixins, filters ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    visible(nv) {
      this.$nextTick(() => {
        this.controlHeight = this.$el.querySelector('#control').getBoundingClientRect().height
      })
      this.$emit('update:visible', nv)
    },
    params: {
      handler() {
        this.$nextTick(() => { if (this.visible) this.getAttachment() })
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      controlHeight: 0
    }
  },
  methods: {
    getAttachment() {
      this.loading = true

      getAttachment({
        version: this.params.version,
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        status: this.params.status,
        purchasingRequirementTargetId: this.params.purchasingRequirementTargetId
      })
        .then(res => {
          if (res.code == 200) {
            if (res.data && res.data.attachmentVOS) {
              this.tableListData = Array.isArray(res.data.attachmentVOS.tpRecordList) ? res.data.attachmentVOS.tpRecordList : []
              this.page.totalCount = res.data.attachmentVOS.totalCount || 0
            } else {
              this.tableListData = []
              this.page.totalCount = 0
            }
          } else {
            iMessage.error(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
          }

          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    download() {
      if (!this.multipleSelection.length) {
        return iMessage.warn(this.language('LK_QINGXUANZHEXUYAOXIAZHAIWENJIAN','请选择需要下载文件'))
      }

      // downloadFile({
      //   applicationName: 'rise-procurereq-service',
      //   fileList: this.multipleSelection.map(item => item.tpPartAttachmentName).join('&fileList=')
      // })
      downloadUdFile(this.multipleSelection.map(item => item.uploadId))
    },
    preview(row) {
      // downloadFile({
      //   applicationName: 'rise-procurereq-service',
      //   fileList: row.tpPartAttachmentName
      // })
      downloadUdFile(row.item.uploadId)
    },
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  .control {
    text-align: right;
  }

  ::v-deep .el-dialog {
    width: 1745px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 580px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
       @include pdtb(28px, 28px);
    }
  }
}
</style>