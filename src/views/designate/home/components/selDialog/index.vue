<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{$t('nominationLanguage.SELFenTanDanFuJianLieBiao')}}</div>
      <div class="control">
        <span v-if="!readOnly">
          <iButton @click="downloadFile">{{ $t('LK_XIAZAI') }}</iButton>
          <iButton @click="deleteFile">{{ $t('LK_SHANCHU') }}</iButton>
          <upload
            class="upload-trigger"
            :hideTip="true"
            :accept="'.jpg,.jpeg,.png,.pdf,.tif'"
            :buttonText="$t('strategicdoc.ShangChuanWenJian')"
            @on-success="onUploadConfirm"
          />
        </span>
        <span v-if="selStatus">
          <iButton @click="deleteFile">{{ $t('LK_QUEREN') }}</iButton>
          <iButton @click="downloadFile">{{ $t('LK_XIAZAI') }}</iButton>
        </span>
        <!-- <iButton>{{ $t('strategicdoc.ShangChuanWenJian') }}</iButton> -->
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
import { iPagination, iDialog, iMessage, iButton } from '@/components'
import { seltTableTitle as tableTitle } from '../data'
import tableList from '@/views/designate/supplier/components/tableList'
import filters from '@/utils/filters'
import { attachMixins } from '@/utils/attachMixins'
import { pageMixins } from '@/utils/pageMixins'
import upload from '@/components/Upload'
// import { downloadFile } from '@/api/file'

// sel 单据确认表格
import {
  getNomiSelAttachList,
  batchUploadSelAttach,
  batchDeleteSelAttach
} from '@/api/designate/nomination/selAttach'

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
      type: Boolean,
      default: false
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
        this.$nextTick(() => { if (this.visible) this.getFetchData() })
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
      if (!this.$store.getters.nomiAppId) return iMessage.error(this.$t('nominationLanguage.DingDianIDNotNull'))
      this.tableLoading = true
      const params = Object.assign({
        nomiAppId: this.nomiAppId || this.$store.getters.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '105',
        pageNo: (this.page && this.page.currPage) || 1,
        pageSize: (this.page && this.page.pageSize) || 10
      })
      // console.log('-请求参数--', params)
      getNomiSelAttachList(params).then(res => {
        if (res.code === '200') {
          this.dataList = res.data.records || res.data || []
          if (this.page) {
            this.page.totalCount = Number(res.total)
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.tableLoading = false
        console.log(res)
      }).catch(e => {
        console.log(e)
        this.tableLoading = false
      })
    },
    // 上传成功回调
    onUploadConfirm(data) {
      if (!data.data.fileName && !data.data.filePath) {
        this.tableLoading = false
        // 上传发生错误，oss无文件名，路径返回
        iMessage.error(this.$t('strategicdoc.ShangChuanFaShengCuoWu'))
        return
      }
      this.tableLoading = true
      const params = {
        // 业务配置相关
        fileType: data.fileType || 105,
        hostId: data.hostId || this.$store.getters.nomiAppId || '',
        fileCode: data.fileCode || '0',
        // 文件内容🇭相关
        fileName: data.data.fileName || '',
        filePath: data.data.filePath || '',
        fileSize: data.file.size || 0,
        size: data.file.size || 0
      }
      console.log(params, data)
      batchUploadSelAttach(params).then(res => {
        if (res.code === '200') {
          iMessage.success('上传成功')
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : event.desEn)
      })
    },
    // 删除文件
    async deleteSelFile() {
      if (!this.multipleSelection.length) {
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      const confirmInfo = await this.$confirm(this.$t('deleteSure'))
      if (confirmInfo !== 'confirm') return
      const idList = this.multipleSelection.map(o => o.id)
      
      try {
        const res = await batchDeleteSelAttach({idList})
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : event.desEn)
      }
    }
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