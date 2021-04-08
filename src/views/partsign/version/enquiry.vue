<template>
  <iPage class="version">
    <iCard class="card">
      <div class="header clearFloat">
        <span class="title">{{ $t('LK_QUANBUBANBEN') }}</span>
        <!-- <div class="control">
          <iButton @click="back">{{ $t('LK_FANHUI') }}</iButton>
        </div> -->
      </div>
      <div class="body margin-top25">
        <tableList index height="100%" :selection="false" class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading">
          <template #version="scope">
            <span class="link-underline" @click="volume(scope.row)">{{ scope.row.version }}</span>
          </template>
          <template #createDate="scope">
            <span>{{ scope.row.createDate | dateFilter }}</span>
          </template>
        </tableList>
      </div>
      <div class="footer">
        <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getAttachmentVersion)"
          @current-change="handleCurrentChange($event, getAttachmentVersion)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="tableListData ? tableListData.length : 0" />
      </div>
    </iCard>
    <enquiryDialog :visible.sync="enquiryVisible" :params="enquiryParams" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination } from '@/components'
import tableList from '@/views/partsign/editordetail/components/tableList'
import enquiryDialog from '@/views/partsign/editordetail/components/enquiryDialog'
import { getAttachmentVersion } from '@/api/partsign/editordetail'
import { enquiryTableTitle as tableTitle } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'

export default {
  components: { iPage, iCard, iPagination, tableList, enquiryDialog },
  mixins: [ pageMixins, filters ],
  data() {
    return {
      tableTitle,
      tableListData: [],
      enquiryVisible: false,
      enquiryParams: {},
      purchasingRequirementTargetId: ""
    }
  },
  created() {
    this.purchasingRequirementTargetId = this.$route.query.purchasingRequirementTargetId
    this.getAttachmentVersion()
  },
  methods: {
    getAttachmentVersion() {
      this.loading = true
      getAttachmentVersion({
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        status: "1",
        purchasingRequirementObjectId: this.purchasingRequirementTargetId
      })
        .then(res => {
          if (res.data.attachmentVersionVOS) {
            this.tableListData = Array.isArray(res.data.attachmentVersionVOS.tpRecordList) ? res.data.attachmentVersionVOS.tpRecordList : []
            this.page.totalCount = res.data.attachmentVersionVOS.totalCount || 0
          } else {
            this.tableListData = []
            this.page.totalCount = 0
          }
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    volume(data) {
      this.enquiryVisible = true
      this.enquiryParams = { ...data, purchasingRequirementTargetId: this.purchasingRequirementTargetId }
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
      height: calc(100vh - 300px);
    }

    .pagination {
      margin-top: 30px;
    }
  }
}
</style>