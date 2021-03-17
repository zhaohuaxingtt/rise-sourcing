<template>
  <iDialog class="dialog" :title="`每车用量（当前版本：${ data.version }）`" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <tableList index height="100%" :selection="false" v-show="visible" class="table" :tableData="data.partVolumePerCarList" :tableTitle="tableTitle" :loading="loading" />
    </div>
    <div slot="footer" class="footer">
      <iPagination
        class="pagination"
        @size-change="handleSizeChange($event, getEnquiryList)"
        @current-change="handleCurrentChange($event, getEnquiryList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="data.partVolumePerCarList ? data.partVolumePerCarList.length : 0" />
    </div>
  </iDialog>
</template>

<script>
import { iPagination, iDialog } from '@/components'
import tableList from './tableList'
import { volumeDialogTableTitle as tableTitle } from './data'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { tableList, iPagination, iDialog },
  mixins: [ pageMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    visible(nv) {
      this.$emit('update:visible', nv)
    }
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
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