<template>
  <iCard v-if="display" class="unconfirmed">
    <div class="header clearFloat">
      <span class="title">{{ language('LK_DAIQUERENBANBEN','待确认版本') }}</span>
      <div class="control">
        <iButton @click="confirm" :loading="confirmLoading" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_UNCONFIRMED_CONFIRM">{{ language('LK_QUEREN','确认') }}</iButton>
        <iButton @click="reject" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_UNCONFIRMED_REFUSE">{{ language('LK_JUJUE','拒绝') }}</iButton>
        <iButton @click="download" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_UNCONFIRMED_DOWNLOAD" :loading="downLoading">{{ language('LK_XIAZAI','下载') }}</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList class="table" index :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #version="scope">
          <span class="flexRow">
            <span class="openLinkText cursor " @click="enquiry(scope.row)"> {{ scope.row.version }}</span>
            <span v-if="scope.row.version" class="icon-gray  cursor "  @click="enquiry(scope.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span>  
        </template>
        <template #createDate="scope">
          <span>{{ scope.row.createDate | dateFilter }}</span>
        </template>
      </tableList>
    </div>
    <div class="footer margin-top30">
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getAttachmentVersion)"
        @current-change="handleCurrentChange($event, getAttachmentVersion)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
    <backItems class="backItems" v-model="visible" :title="language('LK_JUJUE','拒绝')" @sure="refuseSure" :repeatClick="rejectLoading" />
    <enquiryDialog :visible.sync="enquiryVisible" :params="params" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage,icon } from 'rise'
import tableList from '../tableList'
import { enquiryUnconfirmedTableTitle as tableTitle } from '../data'
import backItems from '@/views/partsign/home/components/backItems'
import { getAttachmentVersion, patchAttachmentVersion, getAttachment } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import enquiryDialog from '../enquiryDialog'
import filters from '@/utils/filters'
import { downloadFile, downloadUdFile } from '@/api/file'

export default {
  components: { iCard, iButton, iPagination, tableList, backItems, enquiryDialog, icon},
  mixins: [ pageMixins, filters ],
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      show: false,
      display: true,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      loading: false,
      visible: false,
      enquiryVisible: false,
      params: {},
      confirmLoading: false,
      rejectLoading: false,
      downLoading: false
    }
  },
  created() {
    this.getAttachmentVersion()
  },
  methods: {
    getAttachmentVersion() {
      this.loading = true

      getAttachmentVersion({
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        status: 0,
        purchasingRequirementObjectId: this.data.purchasingRequirementTargetId
      })
        .then(res => {
          if (res.code != 200) return iMessage.error(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)

          if (res.data.attachmentVersionVOS) {
            this.tableListData = Array.isArray(res.data.attachmentVersionVOS.tpRecordList) ? res.data.attachmentVersionVOS.tpRecordList : []
            this.page.totalCount = res.data.attachmentVersionVOS.totalCount || 0
          } else {
            this.tableListData = []
            this.page.totalCount = 0
          }

          this.display = !!this.tableListData.length
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    confirm() {
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.language('LK_QINGXUANZHEYITIAOXUYAOQUEREDEBANBEN','请选择一条需要确认的版本'))
      const data = this.multipleSelection[0]
      this.confirmLoading = true
      patchAttachmentVersion({
        purchasingRequirementObjectId: data.purchasingRequirementTargetId,
        version: data.version,
        status: "1"
      })
        .then(res => {
          if(res.code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
            this.confirmLoading = false
            this.$emit('updateVersion')
            this.multipleSelection = []
            this.getAttachmentVersion()
          }else{
             iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
             this.confirmLoading = false
          }
        })
        .catch(() => this.confirmLoading = false)
    },
    reject() {
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.language('LK_QINGXUANZHEYITIAOXUYAOQUEREDEBANBEN','请选择一条需要确认的版本'))

      this.visible = true
    },
    refuseSure(reason) {
      const data = this.multipleSelection[0]

      this.rejectLoading = true
      patchAttachmentVersion({
        purchasingRequirementObjectId: data.purchasingRequirementTargetId,
        version: data.version,
        refuseReason: reason,
        status: "2"
      })
        .then(res => {
          if(res.code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
            this.$emit('updateVersion')
            this.visible = false
            this.multipleSelection = []
          }else{
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.visible = false
          }
        })
        .catch(() => this.rejectLoading = false)
    },
    async download() {
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.language('LK_QINGXUANZHEYIGEXUYAOXIAZAIBANBEN','请选择一个需要下载的版本'))
      const data = this.multipleSelection[0]
      
      this.downLoading = true
      const infoRes = await getAttachment({
        version: data.version,
        currPage: 1,
        pageSize: 999999,
        status: "0",
        purchasingRequirementTargetId: data.purchasingRequirementTargetId
      })

      if (infoRes.code != 200) {
        this.downLoading = false
        return iMessage.error(`${ this.$i18n.locale === 'zh' ? infoRes.desZh : infoRes.desEn }`)
      }

      if(infoRes.data.attachmentVOS){
        const list = infoRes.data.attachmentVOS.tpRecordList
        if (list.length == 0) {
          this.downLoading = false
          return iMessage.error(this.language('LK_SUOXUANBANBENWUFUJIAN','所选版本无附件'))
        }

        // await downloadFile({
        //   applicationName: 'rise-procurereq-service',
        //   fileList: list.map(item => item.tpPartAttachmentName).join('&fileList=')
        // })
        await downloadUdFile(list.map(item => item.uploadId))

        this.downLoading = false
      } else {
        iMessage.error(this.language('LK_SUOXUANBANBENWUFUJIAN','所选版本无附件'))
        this.downLoading = false
      }
    },
    enquiry(data) {
      this.enquiryVisible = true
      this.params = { ...data, purchasingRequirementTargetId: this.data.purchasingRequirementTargetId, stauts: "0" }
    },
  }
}
</script>

<style lang="scss" scoped>
.unconfirmed {
  .openLinkText{
    color:$color-blue;
  }
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

  .footer {
    .control {
      text-align: right;
    }
  }

  .backItems {
    ::v-deep .el-dialog {
      width: 878px!important;

      .el-dialog__body {
        // padding-top: 0;
        // padding-bottom: 0;
      }

      textarea {
        height: 274px!important;
      }

      .el-dialog__footer {
        padding-top: 45px;
        padding-bottom: 60px;
      }
    }
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