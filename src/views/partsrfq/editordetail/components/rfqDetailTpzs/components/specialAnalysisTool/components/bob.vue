<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:47:55
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard :title="title">
    <div slot="header-control">
      <icon name="iconzhuanxiangfenxigongju-landian" symbol></icon>
    </div>
    <icon class="icon-t" name="iconchubupingji" symbol></icon>
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
    title: { type: String, default: '' },
    totalBobOverview: {
      type: Object, default: () => {
        return {}
      }
    },
  },
  watch: {
    title: {
      handler(data) {
        this.title = data
      },
      deep: true,
      immediate: true,
    },
    totalBobOverview(data) {
      this.labelData = data
    }

  },
  data() {
    return {
      labelData: {},
      title: ''
    }
  },
  created() {
    console.log(this.title);
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