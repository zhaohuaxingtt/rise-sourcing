<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-04-26 18:18:22
 * @LastEditors: 余继鹏 917955345@qq.com
 * @FilePath: \front-web\src\views\designate\home\signSheet\approve\components\partTable.vue
-->
<template>
  <div>
  <el-table border :data="tableData" :span-method="arraySpanMethod" :cell-class-name="cellClassName">
    <el-table-column type="selection" align="center"></el-table-column>
    <el-table-column type="index" label="#" align="center"></el-table-column>
    <el-table-column
      label="Present Items"
      header-align="center"
      align="left"
    ></el-table-column>
    <el-table-column label="Type" align="center"></el-table-column>
    <el-table-column label="Nomination No." align="center" width="180">
      <template slot-scope="scope">
        <span class="link" @click="openDetail(scope.row)">{{scope.row.nomination}}</span>
      </template>
    </el-table-column>
    <el-table-column label="Carline" align="center"></el-table-column>
    <el-table-column label="Com." align="center"></el-table-column>
    <el-table-column label="EP" align="center"></el-table-column>
    <el-table-column
      label="Package TTO"
      header-align="center"
      align="right"
    ></el-table-column>
    <el-table-column label="Supplier" align="center">
      
      <el-table-column
        label="Name"
        header-align="center"
        align="left"
        prop="supplier"
        width="190"
      >
      <template slot-scope="scope">
        <el-table class="supplier-table" v-if="scope.row.supplierInfo" :data="scope.row.supplierInfo" :show-header="false">
          <el-table-column prop="supplier" width="190"></el-table-column>
          <el-table-column prop="turnover" width="130"></el-table-column>
          <el-table-column prop="share" width="69"></el-table-column>
        </el-table>
        <!-- <template v-for="(item,index) in scope.row.supplierInfo">
          <div class="supplier-info" :key="index">
            <div class="name" style="width:190px">{{item.supplier}}</div>
            <div class="name" style="width:130px">{{item.turnover}}</div>
            <div class="name" style="width:70px">{{item.share}}</div>
          </div>
        </template> -->
      </template>
      </el-table-column>
      <el-table-column
        label="Turnover"
        header-align="center"
        align="right"
        width="130"
      ></el-table-column>
      <el-table-column
        label="Share"
        header-align="center"
        align="right"
        width="70"
      ></el-table-column>
    </el-table-column>
    <el-table-column label="Status" align="center"></el-table-column>
  </el-table>
  <drawer :visible.sync="visible" :menuList="tableData" :row="row" />
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
    cellClassName({ row, column, rowIndex, columnIndex }){
      if([9].includes(columnIndex)){
        return 'supplier-box'
      }else{
        return ''
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }){
      if([9].includes(columnIndex)){
        return [1,3]
      }else if([10,11].includes(columnIndex)){
        return [0,0]
      }
    },
    openDetail(row){
      this.row = JSON.parse(JSON.stringify(row))
      this.visible = true
    }
  }
};
</script>

<style lang="scss" scoped>

::v-deep .supplier-box{
  padding: 0;
  .cell{
    padding: 0 !important;
    .supplier-table{
      &::before{
        content:unset
      }
      .el-table__body-wrapper{
        tr:last-of-type{
          td{
            border-bottom: 0;
          }
        }
      }
      td:last-of-type{
        border-right: 0;
      }
    }
  }
}
.supplier-info{
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  &:last-of-type{
    border: 0;
  }
  .name{
    border-right: 1px solid #d9d9d9;
    padding: 0 10px;
    &:last-of-type{
      border: 0;
    }
  }
}
</style>