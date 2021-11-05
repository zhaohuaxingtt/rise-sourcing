<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{language('nominationSuggestion.MoJuYuSuanGuanLi','模具预算管理')}}</div>
      <div class="control">
        <iButton>{{ language('LK_TIJIAO','提交') }}</iButton>
        <iButton>{{ language('LK_CHEHUI','撤回') }}</iButton>
      </div>
    </div>
    <div class="body">
      <tableList index :height="controlHeight ? '91%' : '100%'" v-show="visible" class="table margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #rfqNum="scope">
          <a class="link-underline">
            {{scope.row.rfqNum}}
          </a>
        </template>
         <!-- 预算 -->
        <template #budget="scope">
          <div>
            <iInput
              :placeholder="language('LK_QINGSHURU','请输入')"
              v-model="scope.row.budget"
            ></iInput>
          </div>
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
import { iPagination, iDialog, iButton, iInput } from 'rise'
import tableList from './tableList'
import { mouldTitle as tableTitle, mokeMouldData } from './data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'

export default {
  components: { tableList, iPagination, iDialog, iButton, iInput },
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
      tableListData: mokeMouldData,
      selectedData: [],
      controlHeight: 0
    }
  },
  methods: {
    getFetchData() {

    },
    handleSelectionChange(list) {
      this.selectedData = list
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