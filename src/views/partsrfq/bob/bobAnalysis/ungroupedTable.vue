<!--
 * @Author: your name
 * @Date: 2021-06-21 11:38:57
 * @LastEditTime: 2021-07-02 17:46:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails\table1.vue
-->
<template>
  <iCard>
    <template v-slot:header>
      <div class="flex-between-center titleBox">
        <div>
          <span>待分配区域</span>
          <span v-if="remark" class="margin-left40">{{ remark }}</span>
        </div>
        <div>
          <iButton @click="groupBy">分组至</iButton>
        </div>
      </div>
    </template>
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
      <!-- <el-table-column label="" prop="title" width="250"> </el-table-column> -->
      <el-table-column
        v-for="i in tableList.headerList"
        :key="i.id"
        :label="i.label"
        :prop="i.prop"
        align="center"
        :width="i.prop == 'title' ? '200' : ''"
      >
        <template v-if="i.children">
          <el-table-column
            v-for="item in i.children"
            :key="item.id"
            :label="item.label"
            :prop="item.prop"
            align="left"
          >
          </el-table-column>
        </template>

        <!-- <template slot-scope="scope">
          <span v-if="testing(scope.row[i.prop])" class="flex">
            <span
              v-for="(item, index) in scope.row[i.prop]"
              :key="item.id"
              class="margin-right20"
              :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)"
              >{{ item }}</span
            >
          </span>
          <span v-else>
            <span
              :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)"
              >{{ scope.row[i.prop] }}</span
            >
          </span>
        </template> -->
      </el-table-column>
    </el-table>
  </iCard>
</template>

<script>
import { iCard, iButton } from "rise";

export default {
  components: {
    iCard,
    iButton,
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
    checkClass(a, b, c) {
      return function (a, b, c) {
        const id = b.row.id;
        let check = this.checkList.findIndex((item) => {
          return item.index === c;
        });
        if (check > -1) {
          switch (id) {
            case "1-2-1":
              return "top";
            case "1-2-7":
              return "bottom";
            case "1-2":
              return "nocolor";
            default:
              return "middle";
          }
        }
        return "nocolor";
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
    tableList: {
      handler(val) {
        let newArr = [];
        val.dataList.forEach((value, index) => {
          newArr[index] = value;
          newArr[index].children = value.children.filter(
            (item) => !item.isShow
          );
        });
      },
      immediate: true,
    },
  },
  data() {
    return {
      checkList: [],
      auditData: [], //表格行内容数据
      auditDataColumnCode: [], //表头动态列内容数据Code备份  业务需求 可忽略
      auditDataColumn: [], //表头动态列内容数据集合
      checkAllOptions: [], //全选备用赋值数组   二维  注意没写错 这里暂时先定义成一维数组 业务需求 需要动态验证是否选中
      noCheckAllOptions: [], //全选备用赋值数组 二维
      checkedOptions: [], //列选择项 选中控制 二维
      checkOptionCount: [], //实时记录当前列 选中数量
      checkAll: [], //表头全选按钮 选中控制
      isIndeterminate: [], //表头 不确定状态控制
    };
  },
  methods: {
    addclass(row) {
      var that = this;
      if (row.columnIndex == that.num) {
        return "addcss";
      }
    },
    clickCol(a, b, c) {
      const i = this.checkList.findIndex((item) => item.index == c);
      console.log("i", i);
      if (i > -1) this.checkList.splice(i, i + 1);
      else
        this.checkList.push({
          id: b.row.id,
          index: c,
        });
      console.log("checkList", this.checkList);
    },

    getRowKey(row) {
      return row.id;
    },

    renderHeader(h, opt) {
      return "<div>aaaf</div>";
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
    select(e, col) {
      console.log(e, col);
    },
    groupBy() {
      this.$emit("groupBy", true);
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
.titleBox {
  width: 100%;
  color: #000000;
  font-size: 18px;
  font-weight: bold;
}
</style>
