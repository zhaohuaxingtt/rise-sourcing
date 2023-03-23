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