<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-27 20:38:44
 * @LastEditTime: 2021-11-08 15:41:52
 * @LastEditors:  
-->
<template>
  <iDialog 
  title="零件定点申请单"
  :visible.sync="dialogVisible"
  @close="clearDialog"
  width='86%'
  >
    <designateSign :mode="'sign'"
      @choose="handleChoose"
      v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAIL_UNCHOSENTABLE|签字单详情未选择表格"
      :refresh.sync="designateSignRefresh" />
  </iDialog>
</template>

<script>
import {iDialog, iMessage} from 'rise'
import designateSign from "@/views/designate/home/designateSign/index"
import {
  saveSignSheet,
} from '@/api/designate/nomination/signsheet'
export default {
  components: {iDialog, designateSign},
  props: {
    dialogVisible:{
      type:Boolean,
      default:false
    },
    form:{
      type:Object,
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible',false)
    },
    async handleChoose(data) {
      this.tableListData = data
        if (!this.tableListData.length) {
        iMessage.error(this.language('QINGXAUNZEDINGDIANSHENQINGDAN','请选择定点申请单号'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('LK_SAVESURE','您确定要执行保存操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.tableListData.map(o => Number(o.id))
      
      try {
        const params = {
          signId: Number(this.form.signId) || '', 
          description: this.form.description, 
          nominateIdArr: idList}
        const res = await saveSignSheet(params)
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.$emit('changeVisible',false)
          this.$emit('getChooseData')
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        // iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
  },
  data() {
    return {
      designateSignRefresh: false,
      tableListData:[]
    }
  }
}
</script>

<style lang="scss" scoped>

</style> scoped>
