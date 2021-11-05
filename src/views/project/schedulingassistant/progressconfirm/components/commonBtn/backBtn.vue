<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 17:34:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-29 17:22:58
 * @Description: 退回按钮
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\commonBtn\backBtn.vue
-->

<template>
  <span>
    <iButton @click="handleSave">{{language('TUIHUI','退回')}}</iButton>
    <backDialog ref="productGroupBack" :dialogVisible="backDialogVisible" @changeVisible="changeBackVisible" @handleBack="handleBack" />
  </span>
</template>

<script>
import { iMessage, iButton } from 'rise'
import { returnPartScheduleList, returnSchedule } from '@/api/project'
import backDialog from '../back'
import { backDelayReasonConfirm } from '@/api/project/process'
export default {
  components: { iButton, backDialog },
  props: {
    /**
     * @Description: 类型  1-产品组  2-零件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    backType: {type:String,default:'1'},
    /**
     * @Description: 保存数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    backData: {type:Array,default:()=>[]}
  },
  data() {
    return {
      loading: false,
      backDialogVisible: false
    }
  },
  methods: {
    handleSave() {
      if(this.backData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOTUIHUIDESHUJU', '请选择需要退回的数据'))
        return
      }
      this.changeBackVisible(true)
      // if (this.backType === '1') {
      //   this.saveSchedule()
      // } else {
      //   this.returnPartScheduleList()
      // }
    },
    changeBackVisible(visible) {
      this.backDialogVisible = visible
    },
    handleBack(val) {
      if (this.backType === '1') {
        this.returnSchedule(val)
      } else if (this.backType === '2') {
        this.returnPartScheduleList(val)
      } else {
        this.backDelayReasonConfirm(val)
      }
    },
    /**
     * @Description: 产品组退回
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    returnSchedule(val) {
      returnSchedule(this.backData.map(item => item.id), val).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeBackVisible(false)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.productGroupBack.changeSaveLoading(false)
      })
    },
    /**
     * @Description: 零件退回
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    returnPartScheduleList(val) {
      returnPartScheduleList(this.backData.map(item => item.id), val).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeBackVisible(false)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.productGroupBack.changeSaveLoading(false)
      })
    },
    /**
     * @Description: 延误原因退回
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    backDelayReasonConfirm(val) {
      backDelayReasonConfirm(this.backData.map(item => {return {...item, backReason:val}})).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeBackVisible(false)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.productGroupBack.changeSaveLoading(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>