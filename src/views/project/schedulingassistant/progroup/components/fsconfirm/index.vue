<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 15:59:13
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-01 14:31:51
 * @Description: 发送FS确认弹窗
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\fsconfirm\index.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
  >
    <template slot="title">
      <div class="chosseProGroup">
        <span class="chosseProGroup-title">{{language('CHANGZHOUQICHANPINZUJINDUQUEREN','长周期产品组进度确认')}}</span>
        <iButton @click="handleConfirm" :loading="saveLoading">{{language('FASONG','发送')}}</iButton>
      </div>
    </template>
    <tableList v-update indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @handleSelectChange="handleSelectChange"></tableList>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import { tableTitle } from './data'
import tableList from '../tableList'
import { getBuyer, getFsUserList } from '@/api/project'
import moment from 'moment'
export default {
  components: { iDialog, iButton, tableList },
  props: {
    dialogVisible: { type: Boolean, default: false },
    allData: {type:Array, default: () => []},
    selectValue: {type:Array, default: () => [{}]},
    tableList: {type: Array, default: () => []},
    cartypeProId: {type:String}
  },
  watch:{
    dialogVisible(val) {
      if(val) {
        this.getBuyer()
        this.getFsUserList()
      }
    }
  },
  data() {
    return {
      saveLoading: false,
      tableTitle: tableTitle,
      tableLoading: false,
      buyer: '',
      fsOptions: {},
      selectData: []
    }
  },
  computed: {
    tableData() {
      return this.tableList.map(item => {
        return {
          ...item,
          projectPurchaser: this.buyer,
          scheBfToFirstTryoutWeek: item.keyBfToFirstTryoutWeek,
          scheFirstTryEmWeek: item.keyFirstTryEmWeek,
          scheFirstTryOtsWeek: item.keyFirstTryOtsWeek,
          productGroupDe: item.productGroupNameDe,
          productGroupZh: item.productGroupNameZh,
          cartypeProId: item.cartypeProId,
          fs: item.selectOption ? item.selectOption[0].label || '' : '',
          fsId: item.selectOption ? item.selectOption[0].value || '' : '',
          projectPurchaserId: this.buyerId,
          confirmDateDeadline: moment().format('YYYY-MM-DD')
        }
      })
    }
  },
  methods: {
    handleSelectChange(val, row) {
      this.$set(row, 'fs', row.selectOption.find(item => item.value === val).label)
    },
    handleSelectionChange(val) {
      this.selectData = val
    },
    getFsUserList() {
      getFsUserList(this.tableList.map(item => item.productGroupId)).then(res => {
        if (res?.result) {
          this.fsOptions = res.data
          this.tableList.forEach(element => {
            element.selectOption = this.fsOptions[element.productGroupId]?.map(item => {
            return {
              ...item,
              value: item.userId,
              label: item.userName
            }
          })
          });
        } else {
          this.fsOptions = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    getBuyer() {
      if (!this.cartypeProId) {
        return
      }
      getBuyer(this.cartypeProId).then(res => {
        if (res?.result) {
          this.buyer = res.data.nameZh
          this.buyerId = res.data.id
        } else {
          this.buyer = ''
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    clearDialog() {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      if (this.selectData.length < 1) {
        iMessage.warn('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据')
        return
      }
      this.saveLoading = true
      this.$emit('handleConfirm', this.selectData)
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>
.chosseProGroup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  &-title {
    font-size: 18px;
    font-weight: 600;
    color: #000
  }
}
</style>