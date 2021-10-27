<!--
 * @Author: your name
 * @Date: 2021-02-24 17:57:52
 * @LastEditTime: 2021-10-27 13:27:53
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\volume\index.vue
-->
<template>
  <iCard class="volume">
    <div class="header clearFloat">
      <span class="title">{{ language('LK_FUJIANLIEBIAO','附件列表') }} （{{ language('LK_DANGQIANBANBEN','当前版本') }} : V{{ version }}）</span>
      <div class="control">
        <iButton v-if="!disabled" @click="download" v-permission.auto="PARTSIGN_EDITORDETAIL_ENQUIRY_DOWNLOAD|询价资料下载">{{ language('LK_XIAZAI','下载') }}</iButton>
        <iButton v-if="!disabled" @click="jump" v-permission.auto="PARTSIGN_EDITORDETAIL_ENQUIRY_ALL|询价资料查看全部版本">{{ language('LK_CHAKANQUANBUBANBEN','查看全部版本') }}</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList index class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #tpPartAttachmentName="scope">
          <span class="flexRow">
            <span class="openLinkText cursor"   @click="preview(scope.row)" >{{ scope.row.tpPartAttachmentName }}</span>
            <span v-if=" scope.row.tpPartAttachmentName" class="icon-gray  cursor " @click="preview(scope.row)">
              <icon symbol class="show" name="icontiaozhuananniu" />
              <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span>  
          <!-- <span class="link-underline" @click="preview(scope.row)">{{ scope.row.tpPartAttachmentName }}</span> -->
        </template>
        <template #updateDate="scope">
          <span>{{ scope.row.updateDate | dateFilter }}</span>
        </template>
      </tableList>
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getEnquiry)"
        @current-change="handleCurrentChange($event, getEnquiry)"
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
import { iCard, iButton, iPagination, iMessage,icon } from 'rise'
import tableList from '../tableList'
import { enquiryTableTitle as tableTitle } from '../data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import { getAttachmentVersion, getAttachment } from '@/api/partsign/editordetail'
import { excelExport } from '@/utils/filedowLoad'
import { downloadFile, downloadUdFile } from '@/api/file'

export default {
  components: { iCard, iButton, iPagination, tableList, icon },
  mixins: [ pageMixins, filters ],
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
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
    this.getEnquiry()
  },
  methods: {
    async getEnquiry() {
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

        const infoRes = await getAttachment({
          version: this.version,
          currPage: this.page.currPage,
          pageSize: this.page.pageSize,
          status: "1",
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
      // window.open(`/#/sourcing/partsign/enquiryVersion?purchasingRequirementTargetId=${ this.data.purchasingRequirementTargetId }`, '_blank')
      const route = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsign/enquiryVersion",
        query: {
          purchasingRequirementTargetId: this.data.purchasingRequirementTargetId
        }
      })
      window.open(route.href, "_blank")
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    download() {
      if (!this.multipleSelection.length) {
        return iMessage.warn(this.language('LK_QINGXUANZHEXUYAOXIAZHAIWENJIAN','请选择需要下载文件'))
      }

      // downloadFile({
      //   applicationName: 'rise-procurereq-service',
      //   fileList: this.multipleSelection.map(item => item.tpPartAttachmentName).join('&fileList=')
      // })
      downloadUdFile(this.multipleSelection.map(item => item.uploadId))
    },
    exportFile() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHUDEMEINIANYONGCHELIANG','请选择需要导出的每车用量'))
      excelExport(this.multipleSelection, this.tableTitle)
    },
    preview(row) {
      // downloadFile({
      //   applicationName: 'rise-procurereq-service',
      //   fileList: row.tpPartAttachmentName
      // })
      downloadUdFile(row.uploadId)
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
  .openLinkText{
    color:$color-blue;
  }
  .icon-gray{
    cursor: pointer;
    .active{
      display: none;
    }
    .show{
      display: block;
    }
  }
  .flexRow{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-gray:hover{
    cursor: pointer;
    .show{
      display: none;
    }
    .active{
      display: block;
    }
  }
}
</style>