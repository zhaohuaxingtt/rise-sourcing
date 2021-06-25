<!--
 * @Author: your name
 * @Date: 2021-06-24 16:19:33
 * @LastEditTime: 2021-06-24 16:20:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bob\bobAnalysis\ungroupedTable.vue
-->
<template>
  <iCard>
    <el-table
      ref="treeList"
      :data="tableList.dataList"
      :tree-props="{ hasChildren: 'hasChildren', children: 'children' }"
      :row-key="getRowKey"
      :expand-row-keys="expends"
      v-loading="loading"
      :max-height="maxHeight"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @cell-dblclick="cellBbClick"
      @cell-click="cellClick"
      @expand-change="expandChange"
    >
      <el-table-column label="" prop="title" width="250"> </el-table-column>
      <el-table-column
        v-for="i in tableList.headerList"
        :key="i.id"
        :label="i.label"
        :prop="i.prop"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="testing(scope.row[i.prop])">
            <span
              v-for="item in scope.row[i.prop]"
              :key="item.id"
              class="margin-right20"
              >{{ item }}</span
            >
          </div>
          <div v-else>
            <span>{{ scope.row[i.prop] }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </iCard>
</template>

<script>
import { iCard } from "rise";
export default {
  components: {
    iCard,
  },
  props: {
    expends: {
      type: Array,
      default: function () {
        return [];
      },
    },

    tableList: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    testing(val) {
      return function (val) {
        if (val instanceof Array) {
          return true;
        }
      };
    },
  },
  watch: {
    expends: {
      handler(val) {
        if (val.length === 0)
          this.$refs.treeList.expandRowKeys = Array.from(val);
      },
    },
  },
  data() {
    return {
      headerList: [
        {
          id: "1",
          label: "Supplier A",
          prop: "SupplierA",
        },
        {
          id: "2",
          label: "Supplier B",
          prop: "SupplierB",
        },
        {
          id: "3",
          label: "Supplier C",
          prop: "SupplierC",
        },
        {
          id: "4",
          label: "Supplier D",
          prop: "SupplierD",
        },
        {
          id: "5",
          label: "Supplier E",
          prop: "SupplierE",
        },
        {
          id: "6",
          label: "Supplier F",
          prop: "SupplierF",
        },
      ],
    };
  },
  methods: {
    getRowKey(row) {
      return row.id;
    },
    render(h, { column, $index }) {
      console.log(h, column, $index);
    },
    rowClick(row, event, column) {
      this.$emit("row-click", row, event, column);
    },

    cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    // 格子双击事件
    cellBbClick(row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event);
    },
    // 行双击事件
    rowDblclick(row, enent) {
      this.$emit("row-dblclick", row, enent);
    },
    // 行单击事件
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
    },
    expandChange(row, expanded) {
      if (expanded.length > 0) {
        this.$emit("expand-change", row, expanded);
      }
      // console.log(row, expanded)
    },
  },
};
</script>

<style lang="scss" scoped></style>

