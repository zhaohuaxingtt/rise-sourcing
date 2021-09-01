<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 17:34:22
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-30 17:37:52
 * @Description: 保存按钮
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\commonBtn\saveBtn.vue
-->

<template>
  <iButton :loading="loading" @click="handleSave">{{language('BAOCUN','保存')}}</iButton>
</template>

<script>
import { iMessage, iButton } from 'rise'
import { savePartScheduleList, saveSchedule } from '@/api/project'
export default {
  components: { iButton },
  props: {
    /**
     * @Description: 类型  1-产品组  2-零件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    saveType: {type:String,default:'1'},
    /**
     * @Description: 保存数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    saveData: {type:Array,default:()=>[]}
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleSave() {
      if(this.saveData.length < 1) {
        return
      }
      if (this.saveType === '1') {
        this.saveSchedule()
      } else {
        this.savePartScheduleList()
      }
    },
    saveSchedule() {
      this.loading = true
      saveSchedule(this.saveData).then(res => {
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
    savePartScheduleList() {
      this.loading = true
      savePartScheduleList(this.saveData).then(res => {
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