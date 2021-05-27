<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{$t('LK_LINGJIANQINGDAN')}}</div>
      <div class="control">
        <iButton>{{ $t('LK_TIANJIA') }}</iButton>
        <iButton>{{ $t('LK_QUXIAO') }}</iButton>
      </div>
    </div>
    <div class="body">
      <tableList index :height="controlHeight ? '91%' : '100%'" v-show="visible" class="table margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #isTop="scope">
          <a class="link-underline" v-if="scope.row.isTop">
            <icon symbol name="iconliebiaoyizhiding" class="icon" />
          </a>
          <a class="link-underline" v-else>
            <icon symbol name="iconliebiaoweizhiding" class="icon" />
          </a>
        </template>
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
import { iPagination, iDialog, iMessage, iButton, icon } from '@/components'
import tableList from './tableList'
import { partTitle as tableTitle, mokeSingleSupplierData } from './data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'

export default {
  components: { tableList, iPagination, iDialog, iButton, icon },
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
      tableListData: mokeSingleSupplierData,
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