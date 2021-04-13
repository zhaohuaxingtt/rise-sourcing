<template>
  <iCard v-if="display" class="unconfirmed">
    <div class="header clearFloat">
      <span class="title">{{ $t('LK_DAIQUERENBANBEN') }}</span>
      <div class="control">
        <iButton @click="confirm" :loading="confirmLoading" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_UNCONFIRMED_CONFIRM">{{ $t('LK_QUEREN') }}</iButton>
        <iButton @click="reject" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_UNCONFIRMED_REFUSE">{{ $t('LK_JUJUE') }}</iButton>
        <iButton @click="download" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_UNCONFIRMED_DOWNLOAD" :loading="downLoading">{{ $t('LK_XIAZAI') }}</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList class="table" index :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #version="scope">
          <span class="link-underline" @click="enquiry(scope.row)">{{ scope.row.version }}</span>
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
    <backItems class="backItems" v-model="visible" :title="$t('LK_JUJUE')" @sure="refuseSure" :repeatClick="rejectLoading" />
    <enquiryDialog :visible.sync="enquiryVisible" :params="params" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from '@/components'
import tableList from '../tableList'
import { enquiryUnconfirmedTableTitle as tableTitle } from '../data'
import backItems from '@/views/partsign/home/components/backItems'
import { getAttachmentVersion, patchAttachmentVersion, getAttachment } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import enquiryDialog from '../enquiryDialog'
import filters from '@/utils/filters'
import { downloadFile } from '@/api/file'

export default {
  components: { iCard, iButton, iPagination, tableList, backItems, enquiryDialog },
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
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.$t('LK_QINGXUANZHEYITIAOXUYAOQUEREDEBANBEN'))
      const data = this.multipleSelection[0]
      this.confirmLoading = true
      patchAttachmentVersion({
        purchasingRequirementObjectId: data.purchasingRequirementTargetId,
        version: data.version,
        status: "1"
      })
        .then(res => {
          if(res.code == 200){
            iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
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
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.$t('LK_QINGXUANZHEYITIAOXUYAOQUEREDEBANBEN'))

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
            iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
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
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.$t('LK_QINGXUANZHEYIGEXUYAOXIAZAIBANBEN'))
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
          return iMessage.error(this.$t('LK_SUOXUANBANBENWUFUJIAN'))
        }

        await downloadFile({
          applicationName: 'rise-procurereq-service',
          fileList: list.map(item => item.tpPartAttachmentName).join('&fileList=')
        })

        this.downLoading = false
      } else {
        iMessage.error(this.$t('LK_SUOXUANBANBENWUFUJIAN'))
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
}
</style>