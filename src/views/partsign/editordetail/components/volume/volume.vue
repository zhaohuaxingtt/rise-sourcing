<!--
 * @Author: your name
 * @Date: 2021-02-24 17:57:52
 * @LastEditTime: 2021-04-01 00:02:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\volume\index.vue
-->
<template>
  <iCard class="volume">
    <div class="header clearFloat">
      <span class="title">{{ $t('LK_MEICHEYONGLIANG') }}（{{ $t('LK_DANGQIANBANBEN') }} ：{{ versionNum }}）</span>
      <div class="control">
        <iButton @click="version" v-permission="PARTSIGN_EDITORDETAIL_VOLUME_ALL">{{ $t('LK_CHAKANQUANBUBANBEN') }}</iButton>
        <iButton @click="download" v-permission="PARTSIGN_EDITORDETAIL_VOLUME_EXPORT">{{ $t('LK_DAOCHU') }}</iButton>
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
        :total="page.totalCount" />
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
import { getPerCarDosageVersion, getPerCarDosageInfo } from '@/api/partsprocure/editordetail'
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
      versionNum: '',
      carTypeConfigId: '',
      // versionVisible: false
    }
  },
  created() {
    this.getVolume()
  },
  methods: {
    async getVolume() {
      this.loading = true

      try {
        if (!this.versionNum || !this.carTypeConfigId) {
          const versionRes = await getPerCarDosageVersion({
            "currPage": 1,
            "pageSize": 10,
            "status": 1,
            "tpId": this.data.tpPartID
          })
          this.versionNum = 'V1'
          if (versionRes.data && Array.isArray(versionRes.data.tpRecordList) && versionRes.data.tpRecordList[0]) {
            this.carTypeConfigId = versionRes.data.tpRecordList[0].carTypeConfigId
            this.versionNum = versionRes.data.tpRecordList[0].versionNum || 'V1'
          }
        }
        const infoRes = await getPerCarDosageInfo({
          carTypeConfigId: this.carTypeConfigId,
          versionNum: this.versionNum,
          currPage: this.page.currPage,
          pageSize: this.page.pageSize,
          status: 1,
          tpId: this.data.tpPartID
        })
        if(infoRes.data){
          this.tableListData = infoRes.data.tpRecordList
          this.page.totalCount = infoRes.data.totalCount
        }
      } catch(e) {
        console.warn(e)
      } finally {
        this.loading = false
      }
    },
    version() {
      // this.versionVisible = true
      window.open(`/#/partsign/version?tpId=${ this.data.tpPartID }`, '_blank')
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