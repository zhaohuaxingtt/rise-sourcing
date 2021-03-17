<!--
 * @Author: your name
 * @Date: 2021-02-24 17:57:52
 * @LastEditTime: 2021-03-01 15:54:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\volume\index.vue
-->
<template>
  <iCard class="volume">
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
        @size-change="handleSizeChange($event, getVolume)"
        @current-change="handleCurrentChange($event, getVolume)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
    <!-- <volumeDialog :visible.sync="versionVisible" /> -->
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination } from '@/components'
// import volumeDialog from '../versionDialog'
import tableList from '../tableList'
import { volumeTableTitle as tableTitle } from '../data'
import { getVolume } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { iCard, iButton, iPagination, tableList },
  mixins: [ pageMixins ],
  data() {
    return {
      tableTitle,
      tableListData: [],
      loading: false,
      // versionVisible: false
    }
  },
  created() {
    this.getVolume()
  },
  methods: {
    getVolume() {
      this.loading = true
      getVolume({})
        .then(res => {
          this.tableListData = res.data
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    version() {
      // this.versionVisible = true
      this.$router.push('/partsign/version')
    },
  }
}
</script>

<style lang="scss" scoped>
.volume {
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