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
      <span class="title">每车用量（当前版本：{{ versionNum }}）</span>
      <div class="control">
        <iButton @click="version">查看全部版本</iButton>
        <iButton @click="download">导出</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList index class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange" />
      <iPagination
        class="pagination"
        @size-change="handleSizeChange($event, getVolume)"
        @current-change="handleCurrentChange($event, getVolume)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="data ? data.length : 0" />
    </div>
    <!-- <volumeDialog :visible.sync="versionVisible" /> -->
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from '@/components'
// import volumeDialog from '../versionDialog'
import tableList from '../tableList'
import { volumeTableTitle as tableTitle } from '../data'
import { pageMixins } from '@/utils/pageMixins'
import { getPerCarDosage } from '@/api/partsign/editordetail'
import { excelExport } from '@/utils/filedowLoad'

export default {
  components: { iCard, iButton, iPagination, tableList },
  mixins: [ pageMixins ],
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      loading: false,
      versionNum: 'V1'
      // versionVisible: false
    }
  },
  created() {
    this.getPerCarDosage()
  },
  methods: {
    download() {
      if (!this.multipleSelection.length) return iMessage.warn('请选择需要导出的版本')
      excelExport(this.multipleSelection, this.tableTitle)
    },
    getPerCarDosage() {
      this.loading = true
      getPerCarDosage({ tpId: this.data.tpPartID, status: '1', ...this.page })
        .then(res => {
          const source = res.data.tpRecordList;
          source.sort((a, b) => { +window.moment(b.dealTime) - +window.moment(a.dealTime) })
          if (source[0]) {
            this.versionNum = source[0].versionNum
            this.tableListData = source.filter(item => item.versionNum === source[0].versionNum)
          } else {
            this.tableListData = []
          }
          this.loading = false
          this.display = !!this.tableListData.length
        })
        .catch(() => this.loading = false)
    },
    version() {
      // this.versionVisible = true
      window.open('/#/partsign/version', '_blank')
      // this.$router.push('/partsign/version')
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    download() {
      if (!this.multipleSelection.length) return iMessage.warn('请选择需要导出的每车用量')
      excelExport(this.multipleSelection, this.tableTitle)
    }
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