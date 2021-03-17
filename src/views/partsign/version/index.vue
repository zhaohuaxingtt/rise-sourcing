<template>
  <iPage class="version">
    <iCard class="card">
      <div class="header clearFloat">
        <span class="title">全部版本</span>
        <div class="control">
          <iButton @click="back">返回</iButton>
        </div>
      </div>
      <div class="body margin-top25">
        <tableList index height="100%" :selection="false" class="table" :tableData="tableListData" :tableTitle="tableTitle" :loading="loading">
          <template #version="scope">
            <span class="link-underline" @click="volume">{{ scope.row.version }}</span>
          </template>
        </tableList>
      </div>
      <div class="footer">
        <iPagination
          class="pagination"
          @size-change="handleSizeChange($event, getTable)"
          @current-change="handleCurrentChange($event, getTable)"
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
import { iPage, iCard, iButton, iPagination } from '@/components'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { tableTitle } from './components/data'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { iPage, iCard, iButton, iPagination, tableList },
  mixins: [ pageMixins ],
  data() {
    return {
      tableTitle,
      tableListData: []
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    getTable() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.page.totalCount = 0
      }, 1000)
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.version {
  .card {
    height: 100%;

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
      height: calc(100vh - 304px);
    }

    .pagination {
      margin-top: 30px;
    }
  }
}
</style>