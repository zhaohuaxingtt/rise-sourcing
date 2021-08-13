<template>
  <iPage class="log" v-permission="LOG_HOME_INDEXPAGE">
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton @click="download" v-permission="LOG_HOME_DOWNLOAD">{{ language('LK_DAOCHU','导出') }}</iButton>
        <span class="margin-left20">
					<icon symbol name="icondatabaseweixuanzhong" class="font18"></icon>
				</span>
      </div>
    </div>
    <iCard class="card">
      <div class="header clearFloat">
        <span class="title">{{ language('LK_RIZHI','日志') }}</span>
      </div>
      <div class="body margin-top25">
        <tableList index height="100%" class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
          <template #publishDate="scope">
            <span>{{ scope.row.publishDate | dateFilter }}</span>
          </template>
        </tableList>
      </div>
      <div class="footer" >
        <iPagination
          v-update
          class="pagination"
          @size-change="handleSizeChange($event, queryByPage)"
          @current-change="handleCurrentChange($event, queryByPage)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, icon, iCard, iButton, iPagination, iMessage } from 'rise'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { tableTitle } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import { queryByPage } from '@/api/log'
import { excelExport } from '@/utils/filedowLoad'
import store from '@/store'

export default {
  components: { iPage, icon, iCard, iButton, iPagination, tableList },
  mixins: [ pageMixins, filters ],
  data() {
    return {
      recordId: '',
      tableTitle,
      tableListData: [],
      multipleSelection: []
    }
  },
  created() {
    this.recordId = this.$route.query.recordId
    this.queryByPage()
  },
  methods: {
    queryByPage() {
      this.loading = true
      queryByPage({ recordId: this.recordId, deptId: Array.isArray(store.state.permission.userInfo.positionList) ? (store.state.permission.userInfo.positionList[0] ? store.state.permission.userInfo.positionList[0].deptId : undefined) : undefined || '123', pageNo: this.page.currPage, pageSize: this.page.pageSize })
        .then(res => {
          this.tableListData = res.data
          this.page.totalCount = res.total
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    download() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHURIZHI','请选择需要导出的日志'))
      excelExport(this.multipleSelection, this.tableTitle)
    }
  }
}
</script>

<style lang="scss" scoped>
.log {
  .card {
    height: calc(100% - 55px);
    min-height: 575px;

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
      height: calc(100vh - 350px);
      min-height: 400px;
    }

    .pagination {
      margin-top: 30px;
    }
  }
}
</style>