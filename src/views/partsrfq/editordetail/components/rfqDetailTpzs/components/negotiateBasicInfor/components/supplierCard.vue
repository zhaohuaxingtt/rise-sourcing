<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: card
-->
<template>
  <div>
    <iCard class="right margin-top5"  v-for="(item,index) in 3" :key="index">
      <div class="flex">
        <icon class="icon-s" name="icongongyingshangshenqingzhong" symbol></icon>
        <span>供应商</span>
      </div>
      <iLabel class="margin-top8 title" :label="$t('LK_CHEXINGXIANGMU')+':'"></iLabel>
      <div>{{}}</div>
      <iLabel class="margin-top8 title" :label="$t('TPZS.SQDZDZ')"></iLabel>
      <div>{{}}</div>
      <iLabel class="margin-top8 title" :label="$t('TPZS.ZXSE')"></iLabel>
      <div>{{}}</div>
    </iCard>
  </div>
</template>

<script>
import { iCard, icon, iLabel } from "rise";
export default {
  components: { iCard, icon, iLabel },
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

<style lang="scss" scoped>
.chartmap {
  width: 100rem;
  height: 60rem;
}
.right {
  width: 339px;
  /* right: 0px;
  position: relative; */
}
.icon-s {
  font-size: 33px;
}
.flex {
  align-items: center;
}
.title {
  color: #7e84a3;
}
</style>