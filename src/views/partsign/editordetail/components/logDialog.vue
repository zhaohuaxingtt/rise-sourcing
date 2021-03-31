<!--
 * @Author: your name
 * @Date: 2021-03-01 11:49:10
 * @LastEditTime: 2021-03-01 15:53:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\logDialog\index.vue
-->
<template>
  <iDialog class="dialog" :title="$t('LK_RIHZICHAKAN')" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <tableList index :selection="false" height="100%" v-show="visible" class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" />
    </div>
    <div slot="footer" class="footer">
      <iPagination
        class="pagination"
        @size-change="handleSizeChange($event, getEnquiryList)"
        @current-change="handleCurrentChange($event, getEnquiryList)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </iDialog>
</template>

<script>
import { iPagination, iDialog } from '@/components'
import tableList from './tableList'
import { logTableTitle as tableTitle } from './data'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { tableList, iPagination, iDialog },
  mixins: [ pageMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
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