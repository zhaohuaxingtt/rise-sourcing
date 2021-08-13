<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{language('FENTANFUJIANLIEBIAO', 'SEL分摊单附件列表')}}</div>
      <div class="control">
        <span v-if="!readOnly">
          <iButton @click="downloadFile">{{ language('LK_XIAZAI','下载') }}</iButton>
          <iButton @click="deleteFile([], getFetchData)">{{ language('LK_SHANCHU','删除') }}</iButton>
          <upload
            class="upload-trigger"
            :hideTip="true"
            :accept="'.jpg,.jpeg,.png,.pdf,.tif'"
            :buttonText="language('strategicdoc_ShangChuanWenJian','上传文件')"
            @on-success="onUploadsucess(Object.assign(...arguments, {fileType, hostId: nomiAppId}), getFetchData)"
          />
        </span>
        <span v-if="selStatus">
          <iButton v-if="selStatus === 'UNCONFIRMED'" @click="selConfirm">{{ language('LK_QUEREN','确认') }}</iButton>
          <iButton @click="downloadFile">{{ language('LK_XIAZAI','下载') }}</iButton>
        </span>
        <!-- <iButton>{{ language('strategicdoc.ShangChuanWenJian') }}</iButton> -->
      </div>
    </div>
    <div class="body" v-loading="tableLoading">
      <tableList index :height="controlHeight ? '91%' : '100%'" v-show="visible" class="table margin-top20" :tableData="dataList" :tableTitle="tableTitle" @handleSelectionChange="handleSelectionChange">
        <template #uploadDate="scope">
          {{scope.row.uploadDate | dateFilter('YYYY-MM-DD')}}
        </template>
      </tableList>
    </div>
    <div slot="footer" class="footer">
      <iPagination v-update
        class="pagination"
        @current-change="handleCurrentChange($event, getFetchData)"
        background
        :current-page="page.currPage"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
      
    </div>
  </iDialog>
</template>

<script>
import { iPagination, iDialog, iMessage, iButton } from 'rise'
import { seltTableTitle as tableTitle } from '../data'
import tableList from '@/views/designate/supplier/components/tableList'
import filters from '@/utils/filters'
import { attachMixins } from '@/utils/attachMixins'
import { pageMixins } from '@/utils/pageMixins'
import upload from '@/components/Upload'
// import { downloadFile } from '@/api/file'

// sel 单据确认表格
// import {
//   getNomiSelAttachList,
//   batchUploadSelAttach,
//   batchDeleteSelAttach
// } from '@/api/designate/nomination/selAttach'
import {
  batchConfirmSelSheet
} from '@/api/designate/nomination/selsheet'

export default {
  components: { tableList, iPagination, iDialog, iButton, upload },
  mixins: [ pageMixins, filters, attachMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    selStatus: {
      type: String,
      default: ''
    },
    nomiAppId: {
      type: String,
      default: ''
    },
    fileType: {
      type: String,
      default: '105'
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    visible: {
      handler() {
        this.$nextTick(() => { 
          if (this.visible) {
            this.getFetchData()
          } else{
            // 刷新父列表
            this.$emit('refresh', {})
          }
        })
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      controlHeight: 0,
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      }
    }
  },
  methods: {
    // 获取sel附件列表
    getFetchData() {
      if (!this.nomiAppId) return iMessage.error(this.language('nominationLanguage_DingDianIDNotNull','定点申请单id不能为空'))
      this.tableLoading = true
      const params = Object.assign({
        nomiAppId: this.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: this.fileType,
        pageNo: (this.page && this.page.currPage) || 1,
        pageSize: (this.page && this.page.pageSize) || 10
      })
      this.getDataList(params)
    },
    // SEL单据确认
    async selConfirm() {
      const confirmInfo = await this.$confirm(this.language('LK_EXCUTESURE','您确定要执行该操作吗？'))
      if (confirmInfo !== 'confirm') return
      try {
        const res = await batchConfirmSelSheet({nominateIdArr: [this.nomiAppId]})
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getFetchData()
          // 刷新父列表
          this.$emit('refresh', {})
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
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

  .upload-trigger {
    margin-left: 10px;
  }

  .link-underline {
    display: inline-block;
    margin-right: 15px;
  }
  .dialog-Header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 40px;
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