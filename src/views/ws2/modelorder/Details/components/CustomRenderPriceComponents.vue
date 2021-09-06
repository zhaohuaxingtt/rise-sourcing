<template>
   <span>
     {{price|numFilter}}
   </span>
</template>

<script>
import {cutOutNum} from "@/utils/cutOutNum";

export default {
  name: "CustomRenderPriceComponents",
  props:['price'],
  filters:{
    numFilter (value) {
      return  cutOutNum(value,2)
    }
  },
}
</script>

<style scoped>

</style>
