<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:47:55
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard :title="labelData.title">
    <div slot="header-control">
      <icon name="iconzhuanxiangfenxigongju-landian" symbol></icon>
    </div>
    <img class="cursor" :src="labelData.imgUrl" alt="" width="100%" height="300px">
    <div class="buttom">
      <div>
        <div>{{$t('TPZS.FX')+labelData.analysisTotal}}</div>
        <div>{{$t('TPZS.BG')+labelData.reportTotal}}</div>
      </div>
      <div>
        <div>{{$t('TPZS.SCGXSJ')+labelData.analysisLastUpdateDate}}</div>
        <div>{{$t('TPZS.SCDCSJ')+labelData.reportLastUpdateDate}}</div>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon, iLabel } from "rise";
export default {
  components: { iCard, icon, iLabel },
  props: {
    cardData: {
      type: Object, default: () => {
        return {}
      }
    },
  },
  watch: {
    cardData: {
      handler(data) {
        this.labelData = data
      },
      deep: true,
      immediate: true,
    }
  },
  data() {
    return {
      labelData: {},
    }
  },
  created() {
  }
}
</script>

<style>
.icon-t {
  font-size: 25rem;
}
.buttom {
  display: flex;
  justify-content: space-between;
}
</style>