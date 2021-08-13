<template>
  <iCard v-if="display" class="unconfirmed">
    <div class="header clearFloat">
      <span class="title">{{ language('LK_DAIQUERENBANBEN','待确认版本') }}</span>
      <div class="control">
        <iButton @click="confirm" :loading="confirmLoading" v-permission="PARTSIGN_EDITORDETAIL_UNCONFIRMED_CONFIRM">{{ language('LK_QUEREN','确认') }}</iButton>
        <iButton @click="reject" v-permission="PARTSIGN_EDITORDETAIL_UNCONFIRMED_REFUSE">{{ language('LK_JUJUE','拒绝') }}</iButton>
        <iButton @click="download" v-permission="PARTSIGN_EDITORDETAIL_UNCONFIRMED_EXPORT">{{ language('LK_DAOCHU','导出') }}</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList class="table" index :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #version="scope">
          <span class="flexRow">
            <span class="openLinkText cursor " @click="volume(scope.row)"> {{ scope.row.version }}</span>
            <span v-if="scope.row.version" class="icon-gray  cursor "  @click="volume(scope.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span>  
        </template>
        <template #publishDate="scope">
          <span>{{ scope.row.publishDate | dateFilter }}</span>
        </template>
      </tableList>
    </div>
    <div class="footer margin-top30">
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getPerCarDosageVersion)"
        @current-change="handleCurrentChange($event, getPerCarDosageVersion)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
    <backItems class="backItems" v-model="visible" :title="language('LK_JUJUE','拒绝')" @sure="refuseSure" :repeatClick="rejectLoading" />
    <volumeDialog :visible.sync="volumeVisible" :volumeParams="volumeParams" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage,icon } from 'rise'
import tableList from '../tableList'
import { volumeUnconfirmedTableTitle as tableTitle } from '../data'
import backItems from '@/views/partsign/home/components/backItems'
import { getPerCarDosageVersion, putPerCarDosage } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import volumeDialog from '../volumeDialog'
import filters from '@/utils/filters'
import { excelExport } from '@/utils/filedowLoad'

export default {
  components: { iCard, iButton, iPagination, tableList, backItems, volumeDialog, icon },
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
      volumeVisible: false,
      volumeParams: {},
      confirmLoading: false,
      rejectLoading: false
    }
  },
  created() {
    this.getPerCarDosageVersion()
  },
  methods: {
    getPerCarDosageVersion() {
      this.loading = true

      getPerCarDosageVersion({
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        status: 0,
        tpId: this.data.tpPartID
      })
        .then(res => {
          this.tableListData = res.data.tpRecordList
          this.display = !!this.tableListData.length
          this.page.totalCount = res.data.totalCount
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
      putPerCarDosage({
        updateConfirmScenes: {
          carTypeConfigId: data.carTypeConfigId,
          purchasingRequirementTargetId: data.purchasingRequirementTargetId  + '',
          version: data.version,
          status: "1"
        }
      })
        .then(res => {
          if(res.code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
            this.confirmLoading = false
            this.$emit('updateVersion')
            this.multipleSelection = []
          }else{
             iMessage.error(res.desZh)
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
      putPerCarDosage({
        updateConfirmScenes: {
          carTypeConfigId: data.carTypeConfigId,
          purchasingRequirementTargetId: data.purchasingRequirementTargetId  + '',
          version: data.version,
          refuseReason: reason,
          status: "2"
        }
      })
        .then(res => {
          if(res.code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
            this.$emit('updateVersion')
            this.getPerCarDosageVersion()
            this.visible = false
            this.multipleSelection = []
          }else{
            iMessage.error(res.desZh)
            this.visible = false
          }
        })
        .catch(() => this.rejectLoading = false)
    },
    download() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHUBANBEN','请选择需要导出的版本'))
      excelExport(this.multipleSelection, this.tableTitle)
    },
    volume(data) {
      this.volumeVisible = true
      this.volumeParams = { ...data, tpId: this.data.tpPartID }
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