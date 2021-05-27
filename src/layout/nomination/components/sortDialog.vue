<template>
  <iDialog class="sort-menu-dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{$t('strategicdoc.ZiDingYi')}}</div>
      <div class="control">
        <iButton>{{ $t('LK_BAOCUN') }}</iButton>
        <iButton>{{ $t('LK_CHONGZHI') }}</iButton>
      </div>
    </div>
    <div class="body">
      <tableList :height="280" v-show="visible" class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #visible="scope">
          <a class="link-underline" v-if="scope.row.visible">
            <icon symbol name="iconyincang" class="icon trigger-visible" />
          </a>
          <a class="link-underline" v-else>
            <icon symbol name="iconxianshi" class="icon trigger-visible" />
          </a>
        </template>
        <template #sort="scope">
          <a class="link-underline" v-if="scope.$index === 0">
            <icon symbol name="iconpaixu-xiangshangjinzhi" class="icon" />
          </a>
          <a class="link-underline" v-else>
            <icon symbol name="iconpaixu-xiangshang" class="icon" />
          </a>

          <a class="link-underline" v-if="scope.$index === tableListData.length - 1">
            <icon symbol name="iconpaixu-xiangxiajinzhi" class="icon" />
          </a>
          <a class="link-underline" v-else>
            <icon symbol name="iconpaixu-xiangxia" class="icon" />
          </a>
        </template>
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iMessage, iButton, icon } from 'rise'
import { sortTableTitle as tableTitle, sortTableData } from './data'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/views/designate/supplier/components/tableList'
import filters from '@/utils/filters'

export default {
  components: { tableList, iDialog, iButton, icon },
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
      tableListData: sortTableData,
      Selection: [],
      controlHeight: 0
    }
  },
  methods: {
    getFetchData() {

    },
    handleSelectionChange(list) {
      this.Selection = list
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-menu-dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  .link-underline {
    display: inline-block;
    font-size: 16px;
    margin-right: 15px;
  }
  .trigger-visible {
    font-size: 20px;
  }
  .dialog-Header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 40px;
  }

  ::v-deep .el-dialog {
    width: 620px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 380px;
    }

    .el-dialog__header {
      @include pdtb(30px, 20px);
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