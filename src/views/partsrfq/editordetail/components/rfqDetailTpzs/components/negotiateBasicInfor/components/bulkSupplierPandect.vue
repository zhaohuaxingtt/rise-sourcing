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
      <!-- <supplierCard :mapListData="mapListData" class="card-right" /> -->
      <map1 :mapListData="mapListData" />
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from "rise";
import map1 from "./map.vue";
import { batchSupplierMapOverview } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import supplierCard from "./supplierCard.vue";
export default {
  components: { iCard, icon, map1, supplierCard },
  data() {
    return {
      mapListData: []
    }
  },
  created() {
    this.getMapList()
  },
  mounted() {
  },
  methods: {
    async getMapList() {
      const pms = {
        rfqId: this.$route.query.id
      }
      const res = await batchSupplierMapOverview(pms)
      this.mapListData = res.data
    }
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
    z-index: 2;
  }
}
</style>