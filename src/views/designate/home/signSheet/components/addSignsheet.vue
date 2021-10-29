<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-27 20:38:44
 * @LastEditTime: 2021-10-27 21:34:08
 * @LastEditors:  
-->
<template>
  <iDialog 
  title="零件定点申请单"
  :visible.sync="dialogVisible"
  @close="clearDialog"
  >
    <div>
      1111111
    </div>
  </iDialog>
</template>

<script>
import {iDialog} from 'rise'
export default {
  components: {iDialog},
  props: {
    dialogVisible:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible',false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style> scoped>

</style>