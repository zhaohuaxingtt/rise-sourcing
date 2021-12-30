<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-11-05 12:03:00
 * @LastEditTime: 2021-12-23 16:35:17
 * @LastEditors: Please set LastEditors
-->
<template>
    <iPage class="partsignHome">
      <headerNav :type="sourceinquirypoint" />
      <bidding/>
    </iPage>
</template>
<script>
import { iPage } from "rise";
import headerNav from "@/components/headerNav"
import bidding from "./bidding"

export default {
  components:{ iPage, headerNav, bidding },
}
</script>

<style lang="scss" scoped>
</style>