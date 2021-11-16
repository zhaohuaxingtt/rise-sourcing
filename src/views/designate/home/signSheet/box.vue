<template>
  <iPage class="signSheetBox" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_SIGNSHEETPAGE|签字单列表" >
    <!-- 头部 -->
    <headerNav  />
    <signSheet class="signSheet" :showTitle="false" />
  </iPage>
</template>

<script>
import { iPage } from "rise"
import headerNav from "@/views/designate/home/components/headerNav"
import signSheet from "./index"

export default {
  components: { iPage, headerNav, signSheet },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.signSheetBox {
  .signSheet {
    padding: 0;
    overflow: visible;
  }
}
</style>