<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{$t('strategicdoc.ShangChuan')}}</div>
      <div class="control">
        <iButton @click="download">{{ $t('LK_XIAZAI') }}</iButton>
        <iButton @click="deleteFile">{{ $t('LK_SHANCHU') }}</iButton>
        <upload
          class="upload-trigger"
          :hideTip="true"
          :accept="'.jpg,.jpeg,.png,.pdf,.tif'"
          :buttonText="$t('strategicdoc.ShangChuanWenJian')"
          @on-success="onUploadsucess(Object.assign(...arguments, {fileType: '101'}), getDataList)"
        />
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
import { uploadtableTitle as tableTitle } from './data'
import tableList from '@/views/designate/supplier/components/tableList'
import filters from '@/utils/filters'
import { attachMixins } from '@/utils/attachMixins'
import { pageMixins } from '@/utils/pageMixins'
import upload from '@/components/Upload'
import { downloadFile } from '@/api/file'

import {
  uploadDaring,
  batchDeleteDaring,
  getdDecisiondataDaringList
} from '@/api/designate/decisiondata/drawing'

export default {
  components: { tableList, iPagination, iDialog, iButton, upload },
  mixins: [ pageMixins, filters, attachMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    nomiAppId: {
      type: String,
      default: ''
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
        totalCount: 0,
        layout: "total, prev, pager, next, jumper"
      }
    }
  },
  methods: {
    getFetchData() {
      const params = {
        nomiAppId: this.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '101',
      }
      this.getDataList(params)
    },
    download() {
      const fileList = this.multipleSelection.map(o => o.id)
      if (!fileList.length) return iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
      try {
        console.log(fileList)
        if (fileList.length) {
          const params = {
            applicationName: 'rise',
            fileList
          }
          downloadFile(params)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 删除文件
    async deleteFile() {
      if (!this.multipleSelection.length) {
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      const confirmInfo = await this.$confirm(this.$t('deleteSure'))
      if (confirmInfo !== 'confirm') return
      const idList = this.multipleSelection.map(o => o.id)
      try {
        const res = await batchDeleteDaring({idList})
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