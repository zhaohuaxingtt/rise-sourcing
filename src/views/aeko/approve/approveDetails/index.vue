<!--
 * @Author: YoHo
 * @Date: 2021-10-09 09:24:00
 * @LastEditTime: 2021-10-09 18:19:07
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iPage>
    <ApprovalDetailsTopComponents/>
    <router-view></router-view>
  </iPage>
</template>

<script>
import {iPage} from "rise"
import ApprovalDetailsTopComponents from "./components/ApprovalDetailsTopComponents";

export default {
  components: {
    ApprovalDetailsTopComponents,
    iPage,
    //projectTop,
  },
  created() {
   console.log('---------------',this.$router)
    console.log('---------------',this.$route)

  }


};
</script>

<style lang="scss" scoped>
</style>