<template>
  <iDialog class="dialog" :title="`${language('LK_MEICHEYONGLIANG','每车用量') }（${language('LK_DANGQIANBANBEN','当前版本') } ：${ volumeParams.version }）`" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <tableList index height="100%" :selection="false" v-show="visible" class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" />
    </div>
    <div slot="footer" class="footer">
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getPerCarDosageInfo)"
        @current-change="handleCurrentChange($event, getPerCarDosageInfo)"
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
import { iPagination, iDialog } from 'rise'
import tableList from './tableList'
import { volumeDialogTableTitle as tableTitle } from './data'
import { getPerCarDosageInfo } from '@/api/partsign/editordetail'
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
    volumeParams: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    visible(nv) {
      this.$emit('update:visible', nv)
    },
    volumeParams: {
      handler() {
        this.$nextTick(() => { if (this.visible) this.getPerCarDosageInfo() })
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
    }
  },
  methods: {
    getPerCarDosageInfo() {
      this.loading = true

      getPerCarDosageInfo({
        carTypeConfigId: this.volumeParams.carTypeConfigId,
        version: this.volumeParams.version,
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        status: this.volumeParams.status,
        tpId: this.volumeParams.tpId
      })
        .then(res => {
          this.tableListData = res.data.tpRecordList
          this.page.totalCount = res.data.totalCount
          this.loading = false
        })
        .catch(() => this.loading = false)
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