<template>
  <div class="usage">
    <div class="header clearFloat">
      <span class="title">每车用量 （V3）</span>
      <div class="control">
        <iButton @click="version">查看全部版本</iButton>
        <iButton>导出</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tablelist index class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading"></tablelist>
      <iPagination
        class="pagination"
        @size-change="handleSizeChange($event, getUsage)"
        @current-change="handleCurrentChange($event, getUsage)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.page"
        :layout="page.layout"
        :total="page.total" />
    </div>
    <versionDialog :visible.sync="versionVisible" />
  </div>
</template>

<script>
import { iButton, iPagination } from '@/components'
import versionDialog from '../versionDialog'
import tablelist from '@/views/partsign/home/components/tablelist'
import { tableTitle } from './components/data'
import { getUsage } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { tablelist, iButton, iPagination, versionDialog },
  mixins: [ pageMixins ],
  data() {
    return {
      tableTitle,
      tableListData: [],
      loading: false,
      versionVisible: false
    }
  },
  created() {
    this.getUsage()
  },
  methods: {
    getUsage() {
      this.loading = true
      getUsage({})
        .then(res => {
          this.tableListData = res.data
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    version() {
      this.versionVisible = true
    },
  }
}
</script>

<style lang="scss" scoped>
.usage {
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
}
</style>