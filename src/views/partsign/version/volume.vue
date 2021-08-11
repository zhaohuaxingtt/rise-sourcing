<template>
  <iPage class="version">
    <iCard class="card">
      <div class="header clearFloat">
        <span class="title">{{ language('LK_QUANBUBANBEN','全部版本') }}</span>
        <!-- <div class="control">
          <iButton @click="back">{{ $t('LK_FANHUI') }}</iButton>
        </div> -->
      </div>
      <div class="body margin-top25">
        <tableList index height="100%" :selection="false" class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading">
          <template #version="scope">
            <span class="link-underline" @click="volume(scope.row)">{{ scope.row.version }}</span>
          </template>
          <template #publishDate="scope">
            <span>{{ scope.row.publishDate | dateFilter }}</span>
          </template>
        </tableList>
      </div>
      <div class="footer">
        <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getPerCarDosageVersion)"
          @current-change="handleCurrentChange($event, getPerCarDosageVersion)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="tableListData ? tableListData.length : 0" />
      </div>
    </iCard>
    <volumeDialog :visible.sync="volumeVisible" :volumeParams="volumeParams" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination } from 'rise'
import tableList from '@/views/partsign/editordetail/components/tableList'
import volumeDialog from '@/views/partsign/editordetail/components/volumeDialog'
import { getPerCarDosageVersion } from '@/api/partsign/editordetail'
import { volumeTableTitle as tableTitle } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'

export default {
  components: { iPage, iCard, iPagination, tableList, volumeDialog },
  mixins: [ pageMixins, filters ],
  data() {
    return {
      tableTitle,
      tableListData: [],
      volumeVisible: false,
      volumeParams: {}
    }
  },
  created() {
    this.tpId = this.$route.query.tpId
    this.getPerCarDosageVersion()
  },
  methods: {
    getPerCarDosageVersion() {
      this.loading = true
      getPerCarDosageVersion({
        "currPage": this.page.currPage,
        "pageSize": this.page.pageSize,
        "status": 1,
        "tpId": this.tpId
      })
        .then(res => {
          this.tableListData = res.data.tpRecordList
          this.page.totalCount = res.data.totalCount
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    volume(data) {
      this.volumeVisible = true
      this.volumeParams = { ...data, tpId: this.tpId }
    },
    // back() {
    //   this.$router.go(-1)
    // }
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