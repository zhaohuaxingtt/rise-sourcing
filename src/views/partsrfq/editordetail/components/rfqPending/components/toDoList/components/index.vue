<!--
 * @Author: YoHo
 * @Date: 2022-01-04 09:40:10
 * @LastEditTime: 2022-01-04 10:16:18
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iDialog
    :visible.sync="tipsVislble"
    width='50%'
    :title="language('BIDDING_TISHI','提示')"
    append-to-body
    class="dunsTipsDiogog">
    123
  </iDialog>
</template>

<script>
import { iDialog } from "rise";
  export default {
    components:{
      iDialog
    },
    data() {
      return {
        tipsVislble: false
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>