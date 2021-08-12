<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{language('LK_LINGJIANQINGDAN', '零件清单')}}</div>
      <div class="control">
        <iButton @click="add">{{ language('LK_TIANJIA','添加') }}</iButton>
        <iButton @click="close">{{ language('LK_QUXIAO', '取消') }}</iButton>
      </div>
    </div>
    <div class="body">
      <tableList index :height="controlHeight ? '91%' : '100%'" v-show="visible" class="table margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" :lang="true" @handleSelectionChange="handleSelectionChange">
        <template #partProjectType="scope">
          <span>{{scope.row.partProjectType && scope.row.partProjectType.desc ? scope.row.partProjectType.desc : scope.row.partProjectType}}</span>
        </template>
        <template #partStatus="scope">
          <span>{{scope.row.partStatus && scope.row.partStatus.desc ? scope.row.partStatus.desc : scope.row.partStatus}}</span>
        </template>
        <!-- <template #isTop="scope">
          <a class="link-underline" v-if="scope.row.isTop">
            <icon symbol name="iconliebiaoyizhiding" class="icon" />
          </a>
          <a class="link-underline" v-else>
            <icon symbol name="iconliebiaoweizhiding" class="icon" />
          </a>
        </template> -->
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
import { iPagination, iDialog, iMessage, iButton } from 'rise'
import tableList from "@/views/designate/supplier/components/tableList";
import { partTitle as tableTitle } from './data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
// 获取零件列表
import { getPartList } from '@/api/designate/designatedetail/rfqdetail/index'

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
    visible(nv) {
      if (nv) {
        this.getFetchData()
      }
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      controlHeight: 0,
      page:{
         totalCount:0, //总条数
         currPage:1,    //当前页
         layout:"prev, pager, next, jumper"
       }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    add() {
      if (!this.multipleSelection.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      this.$emit('add', this.multipleSelection)
      this.close()
    },
    getFetchData() {
      const nominateId = this.$store.getters.nomiAppId
      getPartList(nominateId).then(res => {
        if (res.code === '200') {
          this.tableListData = res.data
          this.page.totalCount = this.tableListData.length
        } else {
          this.tableListData =  []
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
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