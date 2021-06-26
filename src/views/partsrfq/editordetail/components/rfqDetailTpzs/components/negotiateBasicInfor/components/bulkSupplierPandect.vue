<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 总览
-->
<template>
  <iCard :title="$t('TPZS.PLGYSZL')" collapse>
    <div class="center">
      <supplierCard class="card-right" />
      <map1 />
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from "rise";
import map1 from "./map.vue";
import supplierCard from "./supplierCard.vue";
export default {
  components: { iCard, icon, map1, supplierCard },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang='scss' >
.center {
  position: relative;
  width: 100%;
  .card-right {
    position: absolute;
    right: 0;
  }
}
</style>