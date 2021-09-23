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
          <div class="title">{{item.name}}</div>
        </div>
        <iLabel class="margin-top8 title1" :label="language('CHEXINGXIANGMUMAOHAO','车型项目：')"></iLabel>
        <div class="flex-align-center">
          <div v-for="(val,ix) in item.carTypeProjectList" :key="ix">{{item.carTypeProjectList.length-1>ix?val+' |&nbsp;':val}}</div>
        </div>
        <iLabel class="margin-top8 title1" :label="language('GONGYINGSHANGGONGCHANGDIZHI','供应商工程厂地址：')"></iLabel>
        <div>
          {{ item.factoryAddress}}
        </div>
        <iLabel class="margin-top8 title1" :label="language('GONGCHANGZONGXIAOSHOUE','工厂总销售额：')"></iLabel>
        <div>{{String(item.toAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'RMB'}}</div>
      </iCard>
    </div>
  </div>
</template>

<script>
import { iCard, icon, iLabel } from "rise";
export default {
  components: { iCard, icon, iLabel },
  props: {
    supplierDataList: {
      type: Array, default: () => {
        return []
      }
    }
  },
  watch: {
    supplierDataList: {
      handler(data) {
        this.tableData = data
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
  margin-right: 5px;
}
.flex {
  align-items: center;
  .title {
    font-size: 20px;
  }
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