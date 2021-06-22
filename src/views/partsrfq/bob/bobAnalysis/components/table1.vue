<!--
 * @Author: your name
 * @Date: 2021-06-21 11:38:57
 * @LastEditTime: 2021-06-22 17:04:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails\table1.vue
-->
<template>
  <div>
    <el-table
      ref="treeList"
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
  watch:{
    // expends:{
    //   handler(val){
    //     if(val.length===0){
    //       this.$refs.treeList.expandRowKeys=[]
    //     }
    //   }
    // }
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
      //     title: "原材料/散件费用",
      //     SupplierA: "25.00",
      //     SupplierB: "25.00",
      //     SupplierC: "30.48",
      //     SupplierD: "20.04",
      //     SupplierE: "25.40",
      //     SupplierF: "29.90",
      //     children: [
      //       {
      //         id: "2",
      //         title: "散件 1",
      //         SupplierA: "23.46",
      //         SupplierB: "25.00",
      //         SupplierC: "25.00",
      //         SupplierD: "25.00",
      //         SupplierE: "25.00",
      //         SupplierF: "25.00",
      //         children: [
      //           {
      //             id: "21",
      //             title: "组别",
      //             SupplierA: "23.46",
      //             SupplierB: "25.00",
      //             SupplierC: "25.00",
      //             SupplierD: "25.00",
      //             SupplierE: "25.00",
      //             SupplierF: "25.00",
      //           },
      //           {
      //             id: "22",
      //             title: "原产国",
      //             SupplierA: "23.46",
      //             SupplierB: "25.00",
      //             SupplierC: "25.00",
      //             SupplierD: "25.00",
      //             SupplierE: "25.00",
      //             SupplierF: "25.00",
      //           },
      //           {
      //             id: "23",
      //             title: "指定散件",
      //             SupplierA: "23.46",
      //             SupplierB: "25.00",
      //             SupplierC: "25.00",
      //             SupplierD: "25.00",
      //             SupplierE: "25.00",
      //             SupplierF: "25.00",
      //           },
      //           {
      //             id: "24",
      //             title: "数量单位",
      //             SupplierA: "23.46",
      //             SupplierB: "25.00",
      //             SupplierC: "25.00",
      //             SupplierD: "25.00",
      //             SupplierE: "25.00",
      //             SupplierF: "25.00",
      //           },
      //           {
      //             id: "25",
      //             title: "数量",
      //             SupplierA: "23.46",
      //             SupplierB: "25.00",
      //             SupplierC: "25.00",
      //             SupplierD: "25.00",
      //             SupplierE: "25.00",
      //             SupplierF: "25.00",
      //           },
      //           {
      //             id: "26",
      //             title: "单价",
      //             SupplierA: "23.46",
      //             SupplierB: "25.00",
      //             SupplierC: "25.00",
      //             SupplierD: "25.00",
      //             SupplierE: "25.00",
      //             SupplierF: "25.00",
      //           },
      //           {
      //             id: "27",
      //             title: "直接原材料/散件成本",
      //             SupplierA: "xxx",
      //             SupplierB: "xxx",
      //             SupplierC: "xxx",
      //             SupplierD: "xxx",
      //             SupplierE: "xxx",
      //             SupplierF: "xxx",
      //             children: [
      //               {
      //                 id: "271",
      //                 title: "毛重",
      //                 SupplierA: "pc",
      //                 SupplierB: "pc",
      //                 SupplierC: "pc",
      //                 SupplierD: "pc",
      //                 SupplierE: "pc",
      //                 SupplierF: "pc",
      //               },
      //               {
      //                 id: "272",
      //                 title: "净重",
      //                 SupplierA: "23.46",
      //                 SupplierB: "25.00",
      //                 SupplierC: "25.00",
      //                 SupplierD: "25.00",
      //                 SupplierE: "25.00",
      //                 SupplierF: "25.00",
      //               },
      //               {
      //                 id: "273",
      //                 title: "回收单价",
      //                 SupplierA: "1",
      //                 SupplierB: "1",
      //                 SupplierC: "1",
      //                 SupplierD: "1",
      //                 SupplierE: "1",
      //                 SupplierF: "1",
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
      this.$emit("selection-change", val);
    },
    expandChange(row, expanded) {
      if (expanded.length > 0) {
        this.$emit("expand-change", row, expanded);
      }
      // console.log(row, expanded)
    },
    // ToExpandAll() {
    //   const els = document.getElementsByClassName('el-table__expand-icon')
    //   if (this.list.length !== 0 && els.length !== 0) {
    //     // 给所有的展开icon添加标记 \
    //     for (let j1 = 0; j1 < els.length; j1++) {
    //        els[j1].classList.add('clickItem')
    //        } if (this.$el.getElementsByClassName('el-table__expand-icon--expanded')) { const open = this.$el.getElementsByClassName('el-table__expand-icon--expanded') // 去掉已经展开icon的标记 for (let j = 0; j < open.length; j++) { open[j].classList.remove('clickItem') } const clickItem = this.$el.getElementsByClassName('clickItem') // 给所有未展开icon添加点击事件 for (let a = 0; a < clickItem.length; a++) { clickItem[a].click() } } } }
  }
};
</script>

<style lang="scss" scoped></style>
