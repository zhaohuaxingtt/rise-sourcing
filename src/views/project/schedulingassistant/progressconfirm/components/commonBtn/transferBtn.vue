<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 17:49:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-29 17:54:03
 * @Description: 转派按钮
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\commonBtn\transferBtn.vue
-->

<template>
  <span>
    <iButton @click="openTransfer">{{language('ZHUANPAI','转派')}}</iButton>
    <transferDialog ref="productGroupTransfer" :dialogVisible="transferDialogVisible" @changeVisible="changeTransferVisible" @handleTransfer="handleTransfer" />
  </span>
</template>

<script>
import { iMessage, iButton } from 'rise'
import { transferPartScheduleList, transferSchedule } from '@/api/project'
import transferDialog from '../transfer'
import { transferDelayReasonConfirm } from '@/api/project/process'
export default {
  components: { iButton, transferDialog },
  props: {
    /**
     * @Description: 类型  1-产品组  2-零件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    tansferType: {type:String,default:'1'},
    /**
     * @Description: 保存数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    tansferData: {type:Array,default:()=>[]}
  },
  data() {
    return {
      loading: false,
      transferDialogVisible: false
    }
  },
  methods: {
    openTransfer() {
      if(this.tansferData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOZHUANPAIDESHUJU', '请选择需要转派的数据'))
        return
      }
      this.changeTransferVisible(true)
      // if (this.tansferType === '1') {
      //   this.saveSchedule()
      // } else {
      //   this.transferPartScheduleList()
      // }
    },
    changeTransferVisible(visible) {
      this.transferDialogVisible = visible
    },
    handleTransfer(val, valDesc,positionId=null) {
      if (this.tansferType === '1') {
        this.transferSchedule(val, valDesc)
      } else if (this.tansferType === '2') {
        this.transferPartScheduleList(val, valDesc)
      } else {
        this.transferDelayReasonConfirm(val, valDesc,positionId)
      }
    },
    /**
     * @Description: 产品组转派
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    transferSchedule(val) {
      transferSchedule(this.tansferData.map(item => item.id), val).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeTransferVisible(false)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.productGroupTransfer.changeLoading(false)
      })
    },
    /**
     * @Description: 零件转派
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    transferPartScheduleList(val) {
      transferPartScheduleList(this.tansferData.map(item => item.id), val).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeTransferVisible(false)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.productGroupTransfer.changeLoading(false)
      })
    },
    transferDelayReasonConfirm(val, valDesc,fsPositionId) {
      console.log(this.tansferData)
      transferDelayReasonConfirm(this.tansferData.map(item => {
        return {
          ...item,
          oldFs: item.projectPurchaser,
          fs: valDesc,
          fsId: val,
          fsPositionId
        }
      })).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeTransferVisible(false)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.productGroupTransfer.changeLoading(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>