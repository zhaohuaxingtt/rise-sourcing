<template>
  <iDialog class="dialog" :title="$t('LK_SHEZHIPINGFENBUMEN')" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <div class="control" id="control">
        <iButton @click="handleAdd">{{ $t('LK_XINZENG') }}</iButton>
        <iButton @click="handleDelete">{{ $t('LK_SHANCHU') }}</iButton>
        <iButton @click="handleRecover">{{ $t('LK_HUIFU') }}</iButton>
        <iButton @click="download" >{{ $t('LK_BAOCUN') }}</iButton>
      </div>
      <tableList index height="83%" class="table margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" :cellClassName="deleteLine" @handleSelectionChange="handleSelectionChange">
        <template #a="scope">
          <iSelect v-model="scope.row.a" :disabled="scope.row.deleteStatus"></iSelect>
        </template>
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from '@/components'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { scoringDeptTitle as tableTitle } from './data'
import { getAllScoringDepartmentInfo } from '@/api/partsrfq/editordetail'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { tableList, iDialog, iSelect, iButton },
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
        // this.$nextTick(() => { if (this.visible) this.getAllScoringDepartmentInfo() })
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: []
    }
  },
  methods: {
    getAllScoringDepartmentInfo() {
      this.loading = true

      getAllScoringDepartmentInfo({
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
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    handleAdd() {
      this.tableListData.push({})
    },
    handleDelete() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('LK_QINGXUANZEXUYAOSHANCHUDEPINGFENBUMEN'))

      this.multipleSelection.forEach(item => this.$set(item, 'deleteStatus', true))
    },
    deleteLine({ row }) {
      if (row.deleteStatus) return 'deleteLine'
    },
    handleRecover() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('LK_QINGXUANZEXUYAOHUIFUDEPINGFENBUMEN'))

      this.multipleSelection.forEach(item => this.$set(item, 'deleteStatus', false))
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

  .control {
    text-align: right;
  }

  ::v-deep .el-dialog {
    width: 1500px!important;
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

  .table {
    ::v-deep .deleteLine:not(.el-table-column--selection)::after {
      content: no-open-quote;
      position: absolute;
      top: 51%;
      left: 0;
      width: 100%;
      border-bottom: 1px solid $color-blue;
    }
  }
}
</style>