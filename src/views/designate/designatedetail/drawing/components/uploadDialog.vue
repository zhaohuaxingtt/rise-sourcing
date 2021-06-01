<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{$t('strategicdoc.ShangChuan')}}</div>
      <div class="control">
        <iButton>{{ $t('LK_XIAZAI') }}</iButton>
        <iButton>{{ $t('LK_SHANCHU') }}</iButton>
        <iButton>{{ $t('strategicdoc.ShangChuanWenJian') }}</iButton>
      </div>
    </div>
    <div class="body">
      <tableList index :height="controlHeight ? '91%' : '100%'" v-show="visible" class="table margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
      </tableList>
    </div>
    <div slot="footer" class="footer">
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getFetchData)"
        @current-change="handleCurrentChange($event, getFetchData)"
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
import { iPagination, iDialog, iButton } from '@/components'
import { uploadtableTitle as tableTitle, mokeUploadTableListData } from './data'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/views/designate/supplier/components/tableList'
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
      tableListData: mokeUploadTableListData,
      multipleSelection: [],
      controlHeight: 0
    }
  },
  methods: {
    getFetchData() {

    },
    handleSelectionChange(list) {
      this.multipleSelection = list
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