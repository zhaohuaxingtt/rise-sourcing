<!--
 * @Author: your name
 * @Date: 2021-02-24 17:57:52
 * @LastEditTime: 2021-04-02 18:57:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\volume\index.vue
-->
<template>
  <iCard class="volume">
    <div class="header clearFloat">
      <span class="title">{{ $t('LK_FUJIANLIEBIAO') }} （{{ $t('LK_DANGQIANBANBEN') }}: {{ version }}）</span>
      <div class="control">
        <iButton @click="download" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_DOWNLOAD">{{ $t('LK_XIAZAI') }}</iButton>
        <iButton @click="jump" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_ALL">{{ $t('LK_CHAKANQUANBUBANBEN') }}</iButton>
        <iButton @click="download" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_EXPORT">{{ $t('LK_DAOCHU') }}</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList index class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #tpPartAttachmentName="scope">
          <span class="link-underline" @click="preview(scope.row)">{{ scope.row.tpPartAttachmentName }}</span>
        </template>
        <template #updateDate="scope">
          <span>{{ scope.row.updateDate | dateFilter }}</span>
        </template>
      </tableList>
      <iPagination v-update
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
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from '@/components'
import tableList from '../tableList'
import { enquiryTableTitle as tableTitle } from '../data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import { getAttachmentVersion, getAttachment } from '@/api/partsign/editordetail'
import { excelExport } from '@/utils/filedowLoad'
import { downloadFile } from '@/api/file'

export default {
  components: { iCard, iButton, iPagination, tableList },
  mixins: [ pageMixins, filters ],
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
      version: '',
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
        const versionRes = await getAttachmentVersion({
          currPage: 1,
          pageSize: 10,
          status: 1,
          purchasingRequirementObjectId: this.data.purchasingRequirementTargetId
        })
        this.version = 'V1'

        if (versionRes.code != 200) {
          return iMessage.error(`${ this.$i18n.locale === 'zh' ? versionRes.desZh : versionRes.desEn }`)
        }

        if (versionRes.data.attachmentVersionVOS && Array.isArray(versionRes.data.attachmentVersionVOS.tpRecordList) && versionRes.data.attachmentVersionVOS.tpRecordList[0]) {
          this.version = versionRes.data.attachmentVersionVOS.tpRecordList[0].version || 'V1'
        }

        //如果没有已确认的版本，不调用查询没车用量
        const infoRes = await getAttachment({
          version: this.version,
          currPage: this.page.currPage,
          pageSize: this.page.pageSize,
          status: 1,
          purchasingRequirementTargetId: this.data.purchasingRequirementTargetId
        })

        if (infoRes.code != 200) {
          return iMessage.error(`${ this.$i18n.locale === 'zh' ? infoRes.desZh : infoRes.desEn }`)
        }

        if(infoRes.data.attachmentVOS){
          this.tableListData = infoRes.data.attachmentVOS.tpRecordList
          this.page.totalCount = infoRes.data.attachmentVOS.totalCount

        }
      } catch(e) {
        console.warn(e)
      } finally {
        this.loading = false
      }
    },
    jump() {
      window.open(`/#/partsign/enquiryVersion?purchasingRequirementTargetId=${ this.data.purchasingRequirementTargetId }`, '_blank')
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    download() {
      if (!this.multipleSelection.length) {
        iMessage.warn(this.$t('LK_QINGXUANZHEXUYAOXIAZHAIWENJIAN'))
      }

      downloadFile({
        applicationName: 'rise-procurereq-service',
        fileList: this.multipleSelection.map(item => item.tpPartAttachmentName).join('&fileList=')
      })
    },
    exportFile() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUDEMEINIANYONGCHELIANG'))
      excelExport(this.multipleSelection, this.tableTitle)
    },
    preview(row) {
      downloadFile({
        applicationName: 'rise-procurereq-service',
        fileList: row.tpPartAttachmentName
      })
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