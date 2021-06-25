<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: card
-->
<template>
  <div>
    <div :class="tableData.length<3?'':'ben'">
      <iCard class="right margin-top5" v-for="(item,index) in tableData" :key="index">
        <div class="flex">
          <icon class="icon-s" name="iconpilianggongyingshangzonglan" symbol></icon>
          <span>{{item.name}}</span>
        </div>
        <iLabel class="margin-top8 title" :label="$t('LK_CHEXINGXIANGMU')+':'"></iLabel>
        <div>{{}}</div>
        <iLabel class="margin-top8 title" :label="$t('TPZS.SQDZDZ')"></iLabel>
        <div>{{}}</div>
        <iLabel class="margin-top8 title" :label="$t('TPZS.ZXSE')"></iLabel>
        <div>{{}}</div>
      </iCard>
    </div>
  </div>
</template>

<script>
import { iCard, icon, iLabel } from "rise";
export default {
  components: { iCard, icon, iLabel },
  data() {
    return {
      tableData: [
        {
          name: '供应商'
        },
        {
          name: ''
        },
        {
          name: ''
        },
        {
          name: ''
        },
        {
          name: ''
        },
        {
          name: ''
        },
      ]
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
.right {
  width: 339px;
  // height: 251px;
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
.ben {
  overflow: scroll;
  overflow-x: hidden;
  z-index: 5;
  height: 58.3125rem;
}
</style>