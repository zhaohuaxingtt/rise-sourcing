<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 17:22:31
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-29 17:36:26
 * @Description: 确认并发送按钮
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\commonBtn\confirmBtn.vue
-->

<template>
  <iButton :loading="loading" @click="handleConfirmAndSend">{{language('QUERENBINGFASONG','确认并发送')}}</iButton>
</template>

<script>
import { iMessage, iButton } from 'rise'
import { confirmPartScheduleList, confirmSchedule } from '@/api/project'
import { sendDelayReasonConfirm } from '@/api/project/process'
export default {
  components: { iButton },
  props: {
    /**
     * @Description: 类型  1-产品组  2-零件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    confirmType: {type:String,default:'1'},
    /**
     * @Description: 确认数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    confirmData: {type:Array,default:()=>[]}
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleConfirmAndSend() {
      if(this.confirmData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOQUERENBINGFASONGDESHUJU', '请选择需要确认并发送的数据'))
        return
      }
      if (this.confirmType === '1') {
        this.confirmSchedule()
      } else if (this.confirmType === '2') {
        this.confirmPartScheduleList()
      } else {
        this.sendDelayReasonConfirm()
      }
    },
    confirmSchedule() {
      this.loading = true
      confirmSchedule(this.confirmData).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @Description: 零件确认
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    confirmPartScheduleList() {
      this.loading = true
      confirmPartScheduleList(this.confirmData).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    sendDelayReasonConfirm() {
      this.loading = true
      sendDelayReasonConfirm(this.confirmData).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>