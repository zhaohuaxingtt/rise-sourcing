<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-27 20:38:44
 * @LastEditTime: 2021-10-29 11:23:59
 * @LastEditors:  
-->
<template>
  <iDialog 
  title="零件定点申请单"
  :visible.sync="dialogVisible"
  @close="clearDialog"
  width='80%'
  >
    <designateSign :mode="'sign'"
      @choose="handleChoose"
      v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAIL_UNCHOSENTABLE|签字单详情未选择表格"
      :refresh.sync="designateSignRefresh" />
  </iDialog>
</template>

<script>
import {iDialog} from 'rise'
import designateSign from "@/views/designate/home/designateSign/index"
export default {
  components: {iDialog, designateSign},
  props: {
    dialogVisible:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible',false)
    },
    handleChoose(data) {
      this.tableListData = data
      this.$emit('choose', this.tableListData)
      this.$emit('changeVisible',false)
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
