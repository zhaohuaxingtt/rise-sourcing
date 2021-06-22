<!--
 * @Author: your name
 * @Date: 2021-06-21 10:50:38
 * @LastEditTime: 2021-06-22 21:03:42
 * @LastEditors: Please set LastEditors
 * @Description: 费用详情
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails.vue
-->
<template>
  <iCard>
    <template v-slot:header>
      <div class="flex-between-center titleBox">
        <span>费用详情</span>
        <div>
          <iButton v-show="flag" @click="open">全部展开</iButton>
          <iButton v-show="flag1" @click="close">全部收回</iButton>
          <iButton>备注</iButton>
          <iButton>还原</iButton>
          <iButton>数据分组</iButton>
          <iButton>导出</iButton>
        </div>
      </div>
    </template>
    <table1 :dataList="dataList1" :getRowKey="getRowKey" :expends="expends"></table1>
    <table2 :dataList="dataList2" :getRowKey="getRowKey" :expends="expends"></table2>
    <table3 :dataList="dataList3" :getRowKey="getRowKey" :expends="expends"></table3>
    <table4 :dataList="dataList4" :getRowKey="getRowKey" :expends="expends"></table4>
    <table5 :dataList="dataList5" :getRowKey="getRowKey" :expends="expends"></table5>
    <table6 :dataList="dataList6" :getRowKey="getRowKey" :expends="expends"></table6>
  </iCard>
</template>

<script>
import { iCard, iButton } from "rise";
import table1 from "./components/table1.vue";
import table2 from "./components/table2.vue";
import table3 from "./components/table3.vue";
import table4 from "./components/table4.vue";
import table5 from "./components/table5.vue";
import table6 from "./components/table6.vue";
import { dataList1,dataList2,dataList3,dataList4,dataList5,dataList6 } from "./components/data.js";

export default {
  components: {
    iCard,
    iButton,
    table1,
    table2,
    table3,
    table4,
    table5,
    table6,
  },
  data() {
    return {
      flag: true,
      flag1: false,
      dataList1,
      dataList2,
      dataList3,
      dataList4,
      dataList5,
      dataList6,
      expends: [],
    };
  },
  methods: {
    open() {
      this.flag=false
      this.flag1=true
      let dataLists=[]
      dataLists= dataLists.concat(dataList1).concat(dataList2).concat(dataList3).concat(dataList4).concat(dataList5).concat(dataList6)
      this.getTreeExpandKeys(dataLists);
      this.expends= Array.from(new Set(this.expends))
    },
    close(){
      this.flag=true  
      this.flag1=false  
      this.expends=[]
    },
    getRowKey(row) {
      return row.id;
    },
    // 递归获取checked属性方法
    getTreeExpandKeys(obj) {
      // obj是传入的array
      if (obj && obj.length !== 0) {
        obj.forEach((item) => {
          this.expends.push(item.id);
          // 如果此列表有children, 进行递归
          if (item.children) {
            this.getTreeExpandKeys(item.children);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.titleBox {
  width: 100%;
}
</style>
