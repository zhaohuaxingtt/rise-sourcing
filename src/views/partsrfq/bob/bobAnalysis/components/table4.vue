<!--
 * @Author: your name
 * @Date: 2021-06-21 16:16:27
 * @LastEditTime: 2021-06-23 10:33:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails\table4.vue
-->
<template>
  <div>
    <el-table
      :data="dataList"
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
      :show-header="false"
    >
      <el-table-column
        label=""
        prop="title"
        width="250"
      >
      <template slot-scope="scope">
          <span v-html="formatter(scope.row.title)">
          </span>
      </template>
      </el-table-column>
      <el-table-column
        v-for="i in headerList"
        :key="i.id"
        :label="i.label"
        :prop="i.prop"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    expends:{
      type:Array,
      default: function () {
        return []
      }
    },

    dataList:{
      type:Array,
       default: function () {
        return []
      }
    }
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
     getRowKey(row){
      return row.id
    },
    formatter(row) {
      if (row.indexOf("（") > 0) {
       let str= row.split('（')
      
       return '<span>'+ str[0]+'</span>' +'<br/>'+ '<span class="brackets">'+'('+ str[1]+'</span>'
      }
      return row
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

<style lang="scss" scoped>

</style>
<style lang="scss" >
.el-table__row .brackets{
    padding-left: 40px !important;
}
</style>

