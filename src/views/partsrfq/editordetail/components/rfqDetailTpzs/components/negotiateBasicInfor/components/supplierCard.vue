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
          <el-popover trigger="hover" placement="top-start" :content="item.name">
            <div slot="reference" class="title">{{item.name}}</div>
          </el-popover>
        </div>
        <iLabel class="margin-top8 title1" :label="language('CHEXINGXI','车型：')"></iLabel>
        <div class="carBox">
          <span v-for="(val,ix) in item.carTypeProjectList" :key="ix">{{item.carTypeProjectList.length-1>ix?val+' |&nbsp;&nbsp;':val}}</span>
        </div>
        <div class="address">
          <div v-for="(val,i) in item.factoryAddress" :key="i">
            <iLabel class="margin-top8 title1" :label="`${language('GONGYINGSHANGGONGCHANGDIZI','供应商工厂地址')}${i+1}：`"></iLabel>
            <div>
              {{ val}}
            </div>
          </div>
        </div>
        <iLabel class="margin-top8 title1" :label="language('GONGCHANGZONGXIAOSHOUE','工厂总销售额：')"></iLabel>
        <div style="height:14px">{{String(item.toAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'RMB'}}</div>
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
        this.tableData.map(item => {
          return item.factoryAddress = item.factoryAddress.split(',')
        })
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
  width: 496px;
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
.address {
  overflow: auto;
  height: 4rem;
}
.title {
  width: 13rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
.carBox {
  overflow: auto;
  height: 3rem;
  display: flex;
  flex-wrap: wrap;
}
</style>