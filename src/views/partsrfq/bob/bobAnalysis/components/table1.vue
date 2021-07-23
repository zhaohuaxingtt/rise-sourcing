<!--
 * @Author: your name
 * @Date: 2021-06-21 11:38:57
 * @LastEditTime: 2021-07-21 16:25:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails\table1.vue
-->
<template>
  <div>
    <el-table ref="treeList"
              :data="tableList.element"
              :tree-props="{ hasChildren: 'hasChildren', children: 'child' }"
              :row-key="getRowKey"
              :expand-row-keys="expends"
              v-loading="loading"
              :max-height="maxHeight"
              :cell-style="cellsytle"
              @selection-change="handleSelectionChange"
              @row-click="rowClick"
              @row-dblclick="rowDblclick"
              @cell-dblclick="cellBbClick"
              @cell-click="cellClick"
              @expand-change="expandChange">
      <!-- <el-table-column label="" prop="title" width="200"> </el-table-column> -->
      <el-table-column v-for="i in tableList.title"
                       :key="i.index"
                       :label="i.title"
                       :prop="i.label"
                       :align="i.label=='title'?'left':'center'"
                       :width="i.label=='title'?'230':''"
                       show-overflow-tooltip>
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
          <span v-if="testing(scope.row[i.label])"
                class=" scopeBox">
            <span v-for="(item,index) in scope.row[i.label]"
                  :key="index"
                  class="flexSpan">{{ item }}</span>
          </span>
          <span v-else
                class="flex-center">
            <span class="flexSpan">{{ scope.row[i.label] }}</span>
          </span>
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
    supplierList: {
      type: Array,
      default: () => []
    },
    partList: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    testing (val) {
      return function (val) {
        if (val instanceof Array) {
          return true;
        }
      };
    },
  },
  watch: {
    expends: {
      handler (val) {
        if (val.length === 0)
          this.$refs.treeList.expandRowKeys = Array.from(val);
      },
    },
    "tableList.headerList": {
      handler (val) {

      },
      immediate: true,
      deep: true,
    },
  },
  mounted () {
  },
  data () {
    return {
      checkList: [],
      hasChildren: true,
    };
  },
  methods: {
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
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
    cellsytle ({ row, column, rowIndex, columnIndex }) {
      if (row.title == "原材料/散件" || row.title == '制造费' || row.title == '保费成本' || row.title == '管理费' || row.title == '其他费用' || row.title == '利润') {
        return "font-weight: bold"
      }
    },
    getRowKey (row) {
      return row.index;
    },
    render (h, { column, $index }) { },
    rowClick (row, event, column) {
      this.$emit("row-click", row, event, column);
    },

    cellClick (row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    // 格子双击事件
    cellBbClick (row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event);
    },
    // 行双击事件
    rowDblclick (row, enent) {
      this.$emit("row-dblclick", row, enent);
    },
    // 行单击事件
    handleSelectionChange (val) {
      this.$emit("selection-change", val);
    },
    expandChange (row, expanded) {
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
::v-deep .el-table .el-table__body-wrapper {
  height: auto;
}
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
.scopeBox {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
}
.flexSpan {
  padding: 0 10px;
}
</style>
