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
  props:{
    isGS:{
      type:Boolean,
      default: false
    }
  },
  components: {
    abPrice,
    abPriceGS,
  },
  data() {
    return {
      component: "",
    };
  },
  watch:{
    isGS(val){
      if(val){
        this.component = "abPriceGS";
      }else{
        this.component = "abPrice";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>