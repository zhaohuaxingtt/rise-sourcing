<!--
 * @Author: your name
 * @Date: 2021-02-24 17:57:52
 * @LastEditTime: 2021-03-01 15:54:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\usage\index.vue
-->
<template>
  <iCard class="usage">
    <div class="header clearFloat">
      <span class="title">每车用量（当前版本：V3）</span>
      <div class="control">
        <iButton @click="version">查看全部版本</iButton>
        <iButton>导出</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList index class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" />
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
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination } from '@/components'
import versionDialog from './versionDialog'
import tableList from './tableList'
import { usageTableTitle as tableTitle } from './data'
import { getUsage } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { iCard, iButton, iPagination, tableList, versionDialog },
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