<!--
 * @Author: your name
 * @Date: 2021-06-21 10:50:38
 * @LastEditTime: 2021-06-30 22:33:56
 * @LastEditors: Please set LastEditors
 * @Description: 费用详情
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails.vue
-->
<template>
  <div>
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
            <iButton @click="group">数据分组</iButton>
            <iButton>导出</iButton>
          </div>
        </div>
      </template>
      <table1
        :tableList="groupby ? groupList : tableList"
        v-if="totalTable"
      ></table1>
      <groupedTable
        class="margin-top20"
        :tableList="groupList"
        v-if="!totalTable"
        @groupBy="groupBtn"
      ></groupedTable>
      <iDialog :visible.sync="visible1" title="分组至" width="20%">
        <el-form>
          <el-form-item label="选择组">
            <el-cascader
              v-model="value"
              :options="ungroupList"
              label="title"
              value="prop"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="分组至">
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </iDialog>
      <remarkDialog
        :visible="visible"
        @remake="sure"
        @cancel="cancel"
      ></remarkDialog>
    </iCard>
    <ungroupedTable
      class="margin-top20"
      :tableList="ungroupList"
      v-if="groupby"
      @groupBy="groupBtn"
    ></ungroupedTable>
  </div>
</template>

<script>
import { iCard, iButton, iDialog } from "rise";
import table1 from "./components/table1.vue";
import table2 from "./components/table2.vue";
import table3 from "./components/table3.vue";
import table4 from "./components/table4.vue";
import table5 from "./components/table5.vue";
import table6 from "./components/table6.vue";
import remarkDialog from "./components/remarkDialog.vue";
import ungroupedTable from "@/views/partsrfq/bob/bobAnalysis/ungroupedTable.vue";
import groupedTable from "@/views/partsrfq/bob/bobAnalysis/groupedTable.vue";
import { chargeRetrieve } from "@/api/partsrfq/bob";

import { tableList, ungroupList, groupList } from "./components/data.js";

export default {
  components: {
    iCard,
    iDialog,
    iButton,
    table1,
    ungroupedTable,
    groupedTable,
    remarkDialog,
  },
  data() {
    return {
      flag: true,
      flag1: false,
      tableList,
      ungroupList,
      groupList,
      expends: [],
      visible: false,
      visible1: false,
      remark: "",
      groupby: false,
      totalTable: true,
      value: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.open();
      this.chargeRetrieve();
    });
  },
  methods: {
    chargeRetrieve() {
      chargeRetrieve({
        schemaId: 5,
        viewType: "all",
      })
        .then((res) => {})
        .catch((err) => {});
    },
    open() {
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
    group() {
      this.totalTable = false;
      this.groupby = true;
    },
    groupBtn(e) {
      this.visible1 = e;
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
// .titleBox {
//   width: 100%;
//   font-weight: bold;
// }
</style>
