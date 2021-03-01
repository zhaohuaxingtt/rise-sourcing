<template>
  <el-dialog class="dialog" title="全部版本" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <tablelist v-show="visible" class="table" :tableData="tableListData" :tableTitle="tableTitle" :loading="loading"></tablelist>
    </div>
    <div slot="footer" class="footer">
      <iPagination
        class="pagination"
        @size-change="handleSizeChange($event, getEnquiryList)"
        @current-change="handleCurrentChange($event, getEnquiryList)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.page"
        :layout="page.layout"
        :total="page.total" />
    </div>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'
import { iPagination } from '@/components'
import tablelist from './components/tablelist'
import { tableTitle } from './components/data'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { tablelist, iPagination },
  mixins: [ pageMixins ],
  props: {
    ...Dialog.props,
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
  @mixin pdlr {
    padding-left: 36px;
    padding-right: 36px;
  }

  ::v-deep .el-dialog {
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
      padding: 30px 0;
      @include pdlr;

      .el-dialog__title {
        font-size: 18px;
        font-weight: bold;
        line-height: 25px;
      }

      .el-dialog__headerbtn {
        transition: 150ms all;
        width: 24px;
        height: 24px;
        background: #A0BFFC;
        border-radius: 50%;
        top: 27px;
        right: 25px;

        &:hover {
          background: $color-blue;
        }

        i {
          line-height: 24px;
          color: $color-white;
          font-weight: bold;
        }
      }
    }

    .el-dialog__body {
      padding: 6px 0 0;
      @include pdlr;
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
      padding: 28px 0;
      @include pdlr;
    }
  }
}

</style>