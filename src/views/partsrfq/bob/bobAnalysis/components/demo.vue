<!--
 * @Author: your name
 * @Date: 2021-06-25 16:02:36
 * @LastEditTime: 2021-06-25 16:20:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bob\bobAnalysis\components\demo.vue
-->
<template>
  <el-table :data="tableData" style="width: 100%">
    <!-- <el-table-column type="expand">
      <template slot-scope="props">
        <el-table>
          <el-table-column>123</el-table-column>
          <el-table-column>123</el-table-column>
          <el-table-column>123</el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label="商品 ID" prop="id"> </el-table-column>
    <el-table-column label="商品名称" prop="name"> </el-table-column>
    <el-table-column label="描述" prop="desc"> </el-table-column> -->
    <el-table-column
      v-for="(i, index) in headerList"
      :key="index"
      :type="index == 0 ? 'expand' : ''"
      :prop="i.prop"
      :label="i.label"
    >
      <template slot-scope="props" :show-header="false" v-if="index === 0">
        <el-table>
          <el-table-column></el-table-column>
          <el-table-column>123</el-table-column>
          <el-table-column>123</el-table-column>
        </el-table>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      headerList: [
        {
          label: "",
          prop: "title",
          colspan: 4,
        },
        {
          label: "Supplier A",
          prop: "title",
          colspan: 3,
        },
        {
          label: "Supplier B",
          prop: "title",
          colspan: 3,
        },
        {
          label: "Supplier C",
          prop: "title",
          colspan: 3,
        },
      ],

      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
   .el-table--enable-row-transition .el-table__body td {
       padding: 0;
   }
</style>