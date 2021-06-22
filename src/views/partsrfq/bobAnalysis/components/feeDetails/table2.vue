<!--
 * @Author: your name
 * @Date: 2021-06-21 15:31:51
 * @LastEditTime: 2021-06-22 16:08:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails\table2.vue
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
      <el-table-column label="" prop="title" width="250"> </el-table-column>
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
    getRowKey:{
      type   : Function,
      default: params => {}
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
      // dataList: [
      //   {
      //     id: "1",
      //     title: "制造费",
      //     SupplierA: "25.00",
      //     SupplierB: "25.00",
      //     SupplierC: "30.48",
      //     SupplierD: "20.04",
      //     SupplierE: "25.40",
      //     SupplierF: "29.90",
      //     children: [
      //       {
      //         id: "11",
      //         title: "工序1",
      //         SupplierA: "1.67",
      //         SupplierB: "1.67",
      //         SupplierC: "2.12",
      //         SupplierD: "1.67",
      //         SupplierE: "1.38",
      //         SupplierF: "1.98",
      //         children: [
      //           {
      //             id: "111",
      //             title: "生产节拍",
      //             SupplierA: "1.67",
      //             SupplierB: "1.67",
      //             SupplierC: "2.12",
      //             SupplierD: "1.67",
      //             SupplierE: "1.38",
      //             SupplierF: "1.98",
      //           },
      //           {
      //             id: "112",
      //             title: "件数/生产节拍",
      //             SupplierA: "1.67",
      //             SupplierB: "1.67",
      //             SupplierC: "2.12",
      //             SupplierD: "1.67",
      //             SupplierE: "1.38",
      //             SupplierF: "1.98",
      //           },
      //           {   
      //             id: "113",
      //             title: "人工成本",
      //             SupplierA: "1.67",
      //             SupplierB: "1.67",
      //             SupplierC: "2.12",
      //             SupplierD: "1.67",
      //             SupplierE: "1.38",
      //             SupplierF: "1.98",
      //             children: [
      //               {
      //                 id: "1131",
      //                 title: "直接人工费率",
      //                 SupplierA: "1.67",
      //                 SupplierB: "1.67",
      //                 SupplierC: "2.12",
      //                 SupplierD: "1.67",
      //                 SupplierE: "1.38",
      //                 SupplierF: "1.98",
      //               },
      //               {
      //                 id: "1132",
      //                 title: "直接人工数量",
      //                 SupplierA: "1.67",
      //                 SupplierB: "1.67",
      //                 SupplierC: "2.12",
      //                 SupplierD: "1.67",
      //                 SupplierE: "1.38",
      //                 SupplierF: "1.98",
      //               },
      //             ],
      //           },
      //           {
      //             id: "114",
      //             title: "设备成本",
      //             SupplierA: "1.67",
      //             SupplierB: "1.67",
      //             SupplierC: "2.12",
      //             SupplierD: "1.67",
      //             SupplierE: "1.38",
      //             SupplierF: "1.98",
      //             children: [
      //               {
      //                 id: "1141",
      //                 title: "设备费率",
      //                 SupplierA: "1.67",
      //                 SupplierB: "1.67",
      //                 SupplierC: "2.12",
      //                 SupplierD: "1.67",
      //                 SupplierE: "1.38",
      //                 SupplierF: "1.98",
      //               },
      //               {
      //                 id: "1142",
      //                 title: "设备名称/型号",
      //                 SupplierA: "1.67",
      //                 SupplierB: "1.67",
      //                 SupplierC: "2.12",
      //                 SupplierD: "1.67",
      //                 SupplierE: "1.38",
      //                 SupplierF: "1.98",
      //               },
      //             ],
      //           },
      //           {
      //             id: "115",
      //             title: "间接制造成本",
      //             SupplierA: "1.67",
      //             SupplierB: "1.67",
      //             SupplierC: "2.12",
      //             SupplierD: "1.67",
      //             SupplierE: "1.38",
      //             SupplierF: "1.98",
      //             children: [
      //               {
      //                 id: "1151",
      //                 title: "间接制造成本%",
      //                 SupplierA: "1.67",
      //                 SupplierB: "1.67",
      //                 SupplierC: "2.12",
      //                 SupplierD: "1.67",
      //                 SupplierE: "1.38",
      //                 SupplierF: "1.98",
      //               },
      //               {
      //                 id: "1152",
      //                 title: "间接制造成本",
      //                 SupplierA: "1.67",
      //                 SupplierB: "1.67",
      //                 SupplierC: "2.12",
      //                 SupplierD: "1.67",
      //                 SupplierE: "1.38",
      //                 SupplierF: "1.98",
      //               },
      //               {
      //                 id: "1153",
      //                 title: "生产切换成本",
      //                 SupplierA: "1.67",
      //                 SupplierB: "1.67",
      //                 SupplierC: "2.12",
      //                 SupplierD: "1.67",
      //                 SupplierE: "1.38",
      //                 SupplierF: "1.98",
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
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
      this.multipleSelection = val;
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
