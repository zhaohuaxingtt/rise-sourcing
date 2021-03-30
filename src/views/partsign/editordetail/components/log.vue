<!--
 * @Author: your name
 * @Date: 2021-03-01 15:52:14
 * @LastEditTime: 2021-03-01 15:53:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\log\index.vue
-->
<template>
  <div class="log">
    <div class="header clearFloat">
      <span class="title">{{ $t('partsign.log') }}</span>
      <div class="control">
        <iButton v-permission="LOG_HOME_DOWNLOAD">{{ $t('LK_DAOCHU') }}</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList class="table" index :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" />
      <iPagination
        class="pagination"
        @size-change="handleSizeChange($event, getVolume)"
        @current-change="handleCurrentChange($event, getVolume)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </div>
</template>

<script>
import { iButton, iPagination } from '@/components'
import tableList from './tableList'
import { logTableTitle as tableTitle } from './data'
import { getVolume } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { tableList, iButton, iPagination },
  mixins: [ pageMixins ],
  data() {
    return {
      tableTitle,
      tableListData: [],
      loading: false
    }
  },
  created() {
    this.getVolume()
  },
  methods: {
    getVolume() {
      this.loading = true
      getVolume({ ...this.pageMixins?.page })
        .then(res => {
          this.tableListData = res.data
          this.loading = false
        })
        .catch(() => this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.log {
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