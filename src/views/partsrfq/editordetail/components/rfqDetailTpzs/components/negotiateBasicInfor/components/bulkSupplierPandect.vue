<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 总览
-->
<template>
  <iCard :title="$t('TPZS.PLGYSZL')" :defalutCollVal="$route.path==='/sourcing/partsrfq/assistant'?false:true" collapse>
    <div class="center">
      <iButton @click="handleBack" v-if="$route.path==='/sourcing/categoryManagementAssistant/internalDemandAnalysis/bulkSupplierPandect'">{{language("FANHUI","返回")}}</iButton>
      <supplierCard :supplierDataList="supplierDataList" class="card-right" />
      <map1 :mapListData="mapListData" />
      <theMapIcon :mapListData="mapListData" />
    </div>
  </iCard>
</template>

<script>
import { iCard, icon, iButton } from "rise";
import map1 from "./map.vue";
import theMapIcon from "./theMapIcon.vue";
import { overviewBatchSupplierMap } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import supplierCard from "./supplierCard.vue";
export default {
  components: { iCard, icon, iButton, map1, supplierCard, theMapIcon },
  data() {
    return {
      mapListData: {},
      supplierDataList: [],
    }
  },
  created() {
    this.getMapList()
  },
  mounted() {
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    async getMapList() {
      const pms = {
        rfqId: '',
        categoryCode: ''
      }
      if (this.$route.path === '/sourcing/partsrfq/assistant') {
        pms.rfqId = this.$route.query.id
      } else {
        pms.categoryCode = this.$store.state.rfq.categoryCode
      }
      const res = await overviewBatchSupplierMap(pms)
      this.mapListData = res.data
      this.supplierDataList = res.data.supplierDataList || []
    }
  }
}
</script>

<style lang='scss' scoped>
.center {
  position: relative;
  width: 100%;
  .card-right {
    position: absolute;
    right: 0;
    z-index: 2;
  }
}
.el-button {
  position: absolute;
  top: -3.625rem;
  right: 0;
  display: flex;
  justify-content: center;
}
</style>