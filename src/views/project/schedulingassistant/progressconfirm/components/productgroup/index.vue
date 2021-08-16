<!--
 * @Author: Luoshuang
 * @Date: 2021-08-02 10:54:35
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-16 16:01:00
 * @Description: 产品组
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\productgroup\index.vue
-->

<template>
  <div class="productGroup">
    <iSearch :icon="true" class="margin-top30">
      <template slot="button">
        <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>
        <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)">
          <iSelect v-if="item.type ==='select'" :filterable="item.filterable" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option
              v-for="item in selectOptions[item.selectOption]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
          <iInput v-else-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('CHANPINZUJINDUQUERENHUIZONG', '产品组进度确认汇总')}}</span>
        <div class="floatright">
          <!--------------------发送按钮----------------------------------->
          <iButton v-if="!isFS && withSend" @click="handleSend" >{{language('FASONG','发送')}}</iButton>
          <template v-if="isFS">
            <!--------------------转派按钮----------------------------------->
            <iButton @click="openTransfer" >{{language('ZHUANPAI','转派')}}</iButton>
            <!--------------------退回按钮----------------------------------->
            <iButton v-if="withAllBtn" @click="openBack" >{{language('TUIHUI','退回')}}</iButton>
            <!--------------------保存按钮----------------------------------->
            <iButton v-if="withAllBtn" @click="handleSave" >{{language('BAOCUN','保存')}}</iButton>
            <!--------------------确认并发送按钮----------------------------------->
            <iButton v-if="withAllBtn" @click="handleConfirmAndSend" >{{language('QUERENBINGFASONG','确认并发送')}}</iButton>
          </template>
        </div>
      </div>
      <tableList indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange">
        <template #scheBfToFirstTryoutWeek="scope">
          <span v-if="!isFS">{{scope.row.scheBfToFirstTryoutWeek}}</span>
          <iInput v-else v-model="scope.row.scheBfToFirstTryoutWeek" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </template>
        <template #scheFirstTryEmWeek="scope" >
          <span v-if="!isFS">{{scope.row.scheFirstTryEmWeek}}</span>
          <iInput v-else v-model="scope.row.scheFirstTryEmWeek" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </template>
        <template #scheFirstTryOtsWeek="scope" >
          <span v-if="!isFS">{{scope.row.scheFirstTryOtsWeek}}</span>
          <iInput v-else v-model="scope.row.scheFirstTryOtsWeek" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </template>
      </tableList> 
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <backDialog ref="productGroupBack" :dialogVisible="backDialogVisible" @changeVisible="changeBackVisible" @handleBack="handleBack" />
    <fsConfirmDialog ref="fsConfirm" @handleConfirm="handleFSConfirm" :dialogVisible="fsDialogVisible" @changeVisible="changeFSVisible" :tableList="sendRows" type="1" />
    <transferDialog ref="productGroupTransfer" :dialogVisible="transferDialogVisible" @changeVisible="changeTransferVisible" @handleTransfer="handleTransfer" :selectOptions="selectOptions.fsOptions" />
  </div>
</template>

<script>
import { iSearch, iSelect, iInput, iButton, iCard, iPagination, iMessage } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { searchList, tableTitle } from './data'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import backDialog from '../back'
import { getCarTypePro, getProductGroup, getAllFS, getAllProPurchaser, deliveryProduct, returnSchedule, saveSchedule, confirmSchedule, transferSchedule } from '@/api/project'
import { getDictByCode } from '@/api/dictionary'
import fsConfirmDialog from '@/views/project/schedulingassistant/progroup/components/fsconfirm'
import transferDialog from '../transfer'
export default {
  mixins: [pageMixins],
  components: { iSearch, iSelect, iInput, iButton, iCard, tableList, iPagination, backDialog, fsConfirmDialog, transferDialog },
  data() {
    return {
      searchList,
      searchParams: {
        confirmStatus: 'TO_BE_CONFIRMED'
      },
      selectOptions: {},
      // tableTitle,
      tableData: [],
      tableLoading: false,
      backDialogVisible: false,
      selectRows: [],
      fsDialogVisible: false,
      transferDialogVisible: false,
      sendRows: [],
      withSend: false,
      withAllBtn: false
    }
  },
  computed: {
    isFS() {
      return this.$route.path.includes('proconfirm')
    },
    tableTitle() {
      if (this.isFS) {
        return tableTitle.filter(item => item.key !== 'QUERENSHIJIAN')
      } else {
        return tableTitle
      }
    },
  },
  created() {
    this.initSearchParams()
    this.getCarProjectOptions()
    this.getConfirmStatusOptions()
    this.getFSOPtions()
    this.getProductPurchaserOptions()
    this.getTableList()
  },
  methods: {
    handleTransfer(val) {
      transferSchedule(this.selectRows.map(item => item.id), val).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeTransferVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.productGroupTransfer.changeLoading(false)
      })
    },
    openTransfer() {
      if (this.selectRows.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOZHUANPAIDESHUJU', '请选择需要转派的数据'))
        return
      }
      this.changeTransferVisible(true)
    },
    changeTransferVisible(visible) {
      this.transferDialogVisible = visible
    },
    handleConfirmAndSend() {
      if (this.selectRows.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOQUERENBINGFASONGDESHUJU', '请选择需要确认并发送的数据'))
        return
      }
      this.tableLoading = true
      confirmSchedule(this.selectRows).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    initSearchParams() {
      this.searchParams = {
        confirmStatus: 'TO_BE_CONFIRMED',
        cartypeProId: this.$route.query.cartypeProId || '',
        productGroup: this.$route.query.productGroup || ''
      }
    },
    handleSave() {
      if (this.tableData.length < 1) {
        return
      }
      this.tableLoading = true
      saveSchedule(this.tableData).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    handleBack(val) {
      returnSchedule(this.selectRows.map(item => item.id), val).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeBackVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.productGroupBack.changeSaveLoading(false)
      })
    },
    handleFSConfirm(val) {
      deliveryProduct(val).then(res => {
        if (res?.result) {
          if (res.data.length > 0) {
            iMessage.warn(res.data.map(item => item.productGroupZh).join(',')+'产品组询价采购员还未确认，请勿重复发送')
          } else {
            iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
            this.changeFSVisible(false)
            this.getTableList()
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.fsConfirm.changeSaveLoading(false)
      })
    },
    handleSend() {
      if (this.selectRows.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据'))
        return
      }
      this.sendRows = this.selectRows.map(item => {
        return {
          ...item,
          selectOption:this.selectOptions.fsOptions
        }
      })
      this.changeFSVisible(true)
    },
    changeFSVisible(visible) {
      this.fsDialogVisible = visible
    },
    getFSOPtions() {
      getAllFS().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            fsOptions: res.data.map(item => {
              return {
                ...item,
                value: item.id,
                label: item.nameZh
              }
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    getProductPurchaserOptions() {
      getAllProPurchaser().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            purchaseOptions: res.data.map(item => {
              return {
                ...item,
                value: item.id,
                label: item.nameZh
              }
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleReset() {
      this.searchParams = {
        confirmStatus: 'TO_BE_CONFIRMED'
      }
      this.handleSure()
    },
    handleSure() {
      this.page.pageSize = 10
      this.page.currPage = 1
      this.getTableList()
    },
    getConfirmStatusOptions() {
      getDictByCode('SCHEDULE_CONFIRM_STATUS').then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            'SCHEDULE_CONFIRM_STATUS': res.data[0]?.subDictResultVo?.map(item => {
              return {
                ...item,
                value: item.code,
                label: item.name
              }
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    getCarProjectOptions() {
      getCarTypePro().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            carProjectOptions: res.data.map(item => {
              return {
                ...item,
                value: item.id,
                label: item.cartypeProName
              }
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleSelectionChange(val) {
      this.selectRows = val
    },
    openBack() {
      if (this.selectRows.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOTUIHUIDESHUJU', '请选择需要退回的数据'))
        return
      }
      this.changeBackVisible(true)
    },
    changeBackVisible(visible) {
      this.backDialogVisible = visible
    },
    getTableList() {
      if (this.searchParams.confirmStatus === 'RETURNED') {
        this.withSend = true
      } else {
        this.withSend = false
      }
      if (this.searchParams.confirmStatus === 'TO_BE_CONFIRMED') {
        this.withAllBtn = true
      } else {
        this.withAllBtn = false
      }
      const params = {
        ...this.searchParams,
        size: this.page.pageSize,
        current: this.page.currPage,
        identityTag: this.isFS ? '2' : '1'
      }
      this.tableLoading = true
      getProductGroup(params).then(res => {
        if (res?.result) {
          this.tableData = res.data
          this.page.pageSize = Number(res.pageSize)
          this.page.totalCount = Number(res.total)
          this.page.currPage = Number(res.pageNum)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>