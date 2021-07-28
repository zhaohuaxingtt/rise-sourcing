<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: card
-->
<template>
  <div>
    <div class="scroll">
      <iCard class="right margin-bottom5" v-for="(item,index) in tableData" :key="index">
        <div class="flex">
          <icon class="icon-s" name="iconpilianggongyingshangzonglan" symbol></icon>
          <span>{{item.supplierName}}</span>
        </div>
        <iLabel class="margin-top8 title1" :label="$t('LK_CHEXING')+':'"></iLabel>
        <div>{{item.factoryName}}</div>
        <iLabel class="margin-top8 title1" :label="$t('TPZS.SQDZDZ')"></iLabel>
        <div>{{item.address}}</div>
        <iLabel class="margin-top8 title1" :label="$t('TPZS.ZXSE')"></iLabel>
        <div>{{item.toAmount}}</div>
      </iCard>
    </div>
  </div>
</template>

<script>
import { iCard, icon, iLabel } from "rise";
export default {
  components: { iCard, icon, iLabel },
  props: {
    mapListData: {
      type: String, default: () => {
        return {}
      }
    }
  },
  watch: {
    mapListData: {
      handler(data) {
        this.tableData = data.listVO
      }
    }
  },
  data() {
    return {
      tableData: []
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
  text-align: left;
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
.title1 {
  color: #7e84a3;
  margin-bottom: 8px;
}
.scroll {
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
  z-index: 5;
  height: 58.3125rem;
}
</style>