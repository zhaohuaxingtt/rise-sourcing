<!--
 * @Author: your name
 * @Date: 2021-06-21 10:50:38
 * @LastEditTime: 2021-06-25 16:32:00
 * @LastEditors: Please set LastEditors
 * @Description: 费用详情
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails.vue
-->
<template>
  <iCard>
    <template v-slot:header>
      <div class="flex-between-center titleBox">
        <div>
          <span>费用详情</span>
          <span v-if="remark" class="margin-left40">{{ remark }}</span>
        </div>

        <div>
          <iButton v-show="flag" @click="open">全部展开</iButton>
          <iButton v-show="flag1" @click="close">全部收回</iButton>
          <iButton @click="remarks">备注</iButton>
          <iButton>还原</iButton>
          <iButton>数据分组</iButton>
          <iButton>导出</iButton>
        </div>
      </div>
    </template>
    <demo></demo>
    <table1 :tableList="tableList"></table1>
    <table2 :dataList="dataList2"></table2>
    <table3 :dataList="dataList3"></table3>
    <table4 :dataList="dataList4"></table4>
    <table5 :dataList="dataList5"></table5>
    <table6 :dataList="dataList6"></table6>
    <remarkDialog
      :visible="visible"
      @remake="sure"
      @cancel="cancel"
    ></remarkDialog>
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
import remarkDialog from "./components/remarkDialog.vue";

import {
  dataList1,
  dataList2,
  dataList3,
  dataList4,
  dataList5,
  dataList6,
  tableList,
} from "./components/data.js";

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
    remarkDialog,
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
      tableList,
      expends: [],
      visible: false,
      remark: "",
    };
  },
  mounted() {
    console.log(this);
  },
  methods: {
    open() {
      // this.dataLists = this.dataLists
      //   .concat(dataList1)
      //   .concat(dataList2)
      //   .concat(dataList3)
      //   .concat(dataList4)
      //   .concat(dataList5)
      //   .concat(dataList6);
      // this.getTreeExpandKeys(dataLists);
      // this.expends = Array.from(new Set(this.expends));
      let els = this.$el.getElementsByClassName("el-table__expand-icon");
      if (this.tableList.dataList.length != 0 && els.length != 0) {
        this.flag = false;
        this.flag1 = true;
        for (let j1 = 0; j1 < els.length; j1++) {
          els[j1].classList.add("dafult");
        }
        if (
          this.$el.getElementsByClassName("el-table__expand-icon--expanded")
        ) {
          const open = this.$el.getElementsByClassName(
            "el-table__expand-icon--expanded"
          );
          for (let j = 0; j < open.length; j++) {
            open[j].classList.remove("dafult");
          }
          const dafult = this.$el.getElementsByClassName("dafult");
          for (let a = 0; a < dafult.length; a++) {
            dafult[a].click();
          }
        }
      }
    },
    close() {
      if (this.tableList.dataList.length != 0) {
        this.flag = true;
        this.flag1 = false;
        const elsopen = this.$el.getElementsByClassName(
          "el-table__expand-icon--expanded"
        );
        if (
          this.$el.getElementsByClassName("el-table__expand-icon--expanded")
        ) {
          for (let i = 0; i < elsopen.length; i++) {
            elsopen[i].click();
          }
        }
      }
    },
    cancel(flag) {
      this.visible = flag;
    },
    sure(val, flag) {
      this.visible = flag;
      this.remark = val;
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
    remarks() {
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.titleBox {
  width: 100%;
}
</style>
