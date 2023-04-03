<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-04-03 17:47:18
 * @LastEditors: 余继鹏 917955345@qq.com
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\index.vue
-->
<template>
  <component :is="component" :key="component" />
</template>

<script>
import abPrice from "../abPricePP";
import abPriceGS from "../abPriceGS";
export default {
  components: {
    abPrice,
    abPriceGS,
  },
  data() {
    return {
      component: "abPrice",
    };
  },
  created() {
    if (this.$route.query.type == "GS") {
      this.component = "abPriceGS";
    }
  },
};
</script>

<style lang="scss" scoped>
</style>