<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-27 20:38:44
 * @LastEditTime: 2021-11-09 18:50:24
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
    },
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible',false)
    },
    handleChoose(data=[]) {
      this.$emit('choose', data)
      this.$emit('changeVisible',false)
    },
  },
  data() {
    return {
      designateSignRefresh: false,
    }
  }
}
</script>

<style lang="scss" scoped>

</style> scoped>
