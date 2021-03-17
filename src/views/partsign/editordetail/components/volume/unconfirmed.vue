<template>
  <iCard v-if="display" class="unconfirmed">
    <div class="header clearFloat">
      <span class="title">待确认版本</span>
      <div class="control">
        <iButton @click="confirm">确认</iButton>
        <iButton @click="visible = true">拒绝</iButton>
        <iButton>导出</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList class="table" index :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading">
        <template #a="scope">
          <span class="link-underline">{{ scope.row.a }}</span>
        </template>
      </tableList>
    </div>
    <div class="footer margin-top30">
      <iPagination
        class="pagination"
        @size-change="handleSizeChange($event, getVolume)"
        @current-change="handleCurrentChange($event, getVolume)"
        background
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
    <backItems class="backItems" v-model="visible" title="拒绝" @sure="refuseSure" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination } from '@/components'
import tableList from '../tableList'
import { unconfirmedTableTitle as tableTitle } from '../data'
import backItems from '@/views/partsign/home/components/backItems'
import { getUnconfirmed } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import { iMessage } from '../../../../../components'

export default {
  components: { iCard, iButton, iPagination, tableList, backItems },
  mixins: [ pageMixins ],
  data() {
    return {
      show: false,
      display: true,
      tableTitle,
      tableListData: [],
      loading: false,
      visible: false
    }
  },
  created() {
    this.getUnconfirmed()
  },
  methods: {
    getUnconfirmed() {
      this.loading = true
      getUnconfirmed({})
        .then(res => {
          this.tableListData = res.data
          this.loading = false
          this.display = !!this.tableListData.length
        })
        .catch(() => this.loading = false)
    },
    confirm() {
      iMessage.success('操作成功')
    },
    refuseSure() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.unconfirmed {
  .header {
    position: relative;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #001847;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
    }
  }

 .body {
    .pagination {
      margin-top: 30px;
    }
  }

  .footer {
    .control {
      text-align: right;
    }
  }

  .backItems {
    ::v-deep .el-dialog {
      width: 878px!important;

      .el-dialog__body {
        // padding-top: 0;
        // padding-bottom: 0;
      }

      textarea {
        height: 274px!important;
      }

      .el-dialog__footer {
        padding-top: 45px;
        padding-bottom: 60px;
      }
    }
  }
}
</style>