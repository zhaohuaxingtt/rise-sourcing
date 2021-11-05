<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{language('strategicdoc_PaiXu','排序')}}</div>
      <!-- <div class="control">
        <iButton @click="$emit('update:visible', false)">{{ language('LK_QUEDING','确定') }}</iButton>
        <iButton @click="$emit('update:visible', false)">{{ language('LK_QUXIAO','取消') }}</iButton>
      </div> -->
    </div>
    <div class="body" v-loading="tableLoading">
      <tableList
        index
        radio
        :selection="false"
        :height="controlHeight ? '91%' : '100%'"
        v-show="visible"
        class="table margin-top20" 
        :tableData="tableListData"
        :tableTitle="tableTitle" 
        :tableLoading="loading" 
        @handleSelectionChange="handleSelectionChange">
        <template #isTop="scope">
          <a class="link-underline" v-if="scope.$index === 0">
            <icon symbol name="iconpaixu-xiangshangjinzhi" class="icon" />
          </a>
          <a class="link-underline" @click="updateAttachSort(scope.row, true)" v-else>
            <icon symbol name="iconpaixu-xiangshang" class="icon" />
          </a>

          <a class="link-underline" v-if="scope.$index === tableListData.length - 1">
            <icon symbol name="iconpaixu-xiangxiajinzhi" class="icon" />
          </a>
          <a class="link-underline" @click="updateAttachSort(scope.row, false)" v-else>
            <icon symbol name="iconpaixu-xiangxia" class="icon" />
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
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </iDialog>
</template>

<script>
import { iPagination, iDialog, iMessage, icon } from 'rise'
import { sorttableTitle as tableTitle, mokeTableListData } from './data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import tableList from '@/views/designate/supplier/components/tableList'
import {
  updateDaringSort,
  getdDecisiondataDaringList
} from '@/api/designate/decisiondata/drawing'

export default {
  components: { tableList, iPagination, iDialog, icon },
  mixins: [ pageMixins, filters ],
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
        this.$nextTick(() => {
          this.visible && (this.getAttachment())
        })
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableLoading: false,
      tableListData: [],
      multipleSelection: [],
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
    getAttachment(hideLoading) {
      !hideLoading && (this.tableLoading = true)
      console.log('tableLoading')
      getdDecisiondataDaringList({
        nomiAppId: this.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '101',
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }).then(res => {
        if (res.code === '200') {
          this.tableListData = res.data || []
          this.page.totalCount = Number(res.total) || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.tableLoading = false
        console.log(res)
      }).catch(e => {
        console.log(e)
        this.tableLoading = false
      })
    },
    updateAttachSort(row, isUp) {
      console.log(this.multipleSelection)
      const params = {
        fileId: row.id,
        isUp
      }
      // const params = JSON.parse("{\"fileCode\":\"0\",\"fileName\":\"1.jpg\",\"filePath\":\"https://dev-rise.obs.cloud.csvw.com:443/rise%2F1.jpg\",\"fileSize\":93894,\"size\":93894,\"fileType\":101,\"hostId\":\"1\"}")
      console.log(params)
      updateDaringSort(params).then(res => {
        if (res.code === '200') {
          console.log(res)
          this.page.currPage = 1
          this.getAttachment(true)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : event.desEn)
      })
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
    width: 825px!important;
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