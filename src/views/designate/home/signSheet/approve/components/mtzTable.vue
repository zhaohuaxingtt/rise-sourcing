<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-04-26 18:18:30
 * @LastEditors: 余继鹏 917955345@qq.com
 * @FilePath: \front-web\src\views\designate\home\signSheet\approve\components\mtzTable.vue
-->
<template>
<div>
  <el-table border :data="tableData">
    <el-table-column label="#" align="center"></el-table-column>
    <el-table-column
      label="Present Items"
      header-align="center"
      align="left"
    ></el-table-column>
    <el-table-column label="Type" align="center"></el-table-column>
    <el-table-column label="Nomination No." prop="nomination" align="center">
      <template slot-scope="scope">
        <span class="link" @click="openDetail(scope.row)">{{scope.row.nomination}}</span>
      </template>
    </el-table-column>
    <el-table-column label="Supplier" align="center"></el-table-column>
    <el-table-column label="New Rule" align="center"></el-table-column>
    <el-table-column label="Material" align="center"></el-table-column>
    <el-table-column label="Com." align="center"></el-table-column>
    <el-table-column label="Status" align="center"></el-table-column>
  </el-table>
  <drawer :visible.sync="visible" :row="row" isMtz />
</div>
</template>

<script>
import drawer from "./drawer";
export default {
  components:{drawer},
  data() {
    return {
      tableData: [
        {
          nomination:'123121',
          supplierInfo:[{
            supplier:'Supplier1Supplier1',
            turnover:'1,200,123',
            share:'50%'
          },{
            supplier:'Supplier1Supplier2',
            turnover:'1,200,123',
            share:'50%'
          }]
        },{
          nomination:'222221',}
      ],
      row:{},
      visible: false,
    }
  },
  methods:{
    
    openDetail(row){
      this.row = JSON.parse(JSON.stringify(row))
      this.visible = true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>