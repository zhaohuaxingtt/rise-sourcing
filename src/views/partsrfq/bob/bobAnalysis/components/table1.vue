<!--
 * @Author: your name
 * @Date: 2021-06-21 11:38:57
 * @LastEditTime: 2021-07-06 10:46:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails\table1.vue
-->
<template>
  <div>
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
      <el-table-column label="" prop="title" width="200"> </el-table-column>
      <el-table-column
        v-for="i in tableList.headerList"
        :key="i.id"
        :label="i.label"
        :prop="i.prop"
        align="center"
        width="200"
      >
        <!-- <template>
          <el-table-column
            v-for="item in i.children"
            :key="item.id"
            :label="item.label"
            :prop="item.prop"
            align="left"
            :render-header="render"
          >
          </el-table-column>
        </template> -->

        <template slot-scope="scope">
          <div v-if="testing(scope.row[i.prop])" class=" scopeBox">
            <span
              v-for="(item, index) in scope.row[i.prop]"
              :key="item.id"
              :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)"
              >{{ item }}</span
            >
          </div>
          <div v-else class="flex-center">
            <span
              :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)"
              >{{ scope.row[i.prop] }}</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
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
    "tableList.headerList": {
      handler(val) {
        this.$set(this.tableList, val);
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    console.log(this.tableList, 2222222222);
  },
  data() {
    return {
      checkList: [],
      hasChildren: true,
    };
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex % 2 === 0) {
          return {
            rowspan: 0,
            colspan: 3,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    addclass(row) {
      var that = this;
      if (row.columnIndex == that.num) {
        return "addcss";
      }
    },
    checkClass(a, b, c) {
      return function (a, b, c) {
        const id = b.row.id;
        let check = this.checkList.findIndex((item) => {
          return item.index === c;
        });
        if (check > -1) {
          switch (id) {
            case "1-2-1":
              console.log(id);
              return "top";
            case "1-2-7":
              console.log(id);
              return "bottom";
            case "1-2":
              console.log(id);
              return "nocolor";
            default:
              console.log(id);
              return "middle";
          }
        }
        return "nocolor";
      };
    },
    clickCol(a, b, c) {
      const i = this.checkList.findIndex((item) => item.index == c);
      if (i > -1) this.checkList.splice(i, i + 1);
      else
        this.checkList.push({
          id: b.row.id,
          index: c,
        });
    },

    getRowKey(row) {
      return row.id;
    },
    render(h, { column, $index }) {},
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

<style lang="scss" scoped>
// ::v-deep .el-table tr:nth-child(even){
//     display: none;
// }
</style>
<style lang="scss">
.addcss {
  color: red;
}
.nocolor {
  border: none;
}
.top {
  border: 1px solid blue;
  border-bottom: none;
}
.middle {
  border: 1px solid blue;
  border-bottom: none;
  border-top: none;
}
.bottom {
  border: 1px solid blue;
  border-top: none;
}
.scopeBox{
  display: flex;
  justify-content:space-around;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
