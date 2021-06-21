<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:47:55
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard>
    <div slot="header" class="title">
      <div></div>
      <icon name="iconzhuanxiangfenxigongju-landian" symbol></icon>
    </div>
    <icon class="icon-t" name="iconchubupingji" symbol></icon>
    <div class="buttom">
      <div>
        <div>{{$t('TPZS.FX')}}</div>
        <div>{{$t('TPZS.BG')}}</div>
      </div>
      <div>
        <div>{{$t('TPZS.SCGXSJ')}}</div>
        <div>{{$t('TPZS.SCDCSJ')}}</div>
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
    xxx: { type: String, default: '' }
  },
  data() {
    return {
    }
  },
  watch: {
    title: {
      handler(data) {
        console.log(data);
      },
      deep: true,
      immediate: true,
    },

  },
  created() {
    console.log(this.title);
  }
}
</script>

<style>
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.icon-t {
  font-size: 25rem;
}
.buttom{
  display:flex;
  justify-content: space-between;
}
</style>