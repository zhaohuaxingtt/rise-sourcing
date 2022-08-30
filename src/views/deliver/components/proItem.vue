<template>
  <div class="card-item">
    <iCard :title="'ID.4X'" class="left">
      <template #body>
        <el-divider></el-divider>
      </template>
      <p>零件总个数：<span>{{totalNum||0}}</span></p>
      <p>当前定点完成数量：<span>{{totalNum||0}}</span></p>
      <p>当前已完成送样数量：<span>{{totalNum||0}}</span></p>
    </iCard>
    <iCard class="right">
        <iprogress :carProjectId="carProjectId"></iprogress>
        <el-table :data="tableListData" class="margin-top20">
          <template v-for="item in tableTitle">
            <el-table-column v-if="item.children" :key="item.props" :label="item.name" :prop="item.props" align="center">
              <el-table-column v-for="child in item.children" :key="child.props" :label="child.name" :prop="child.props" align="center">
                <div slot-scope="scope">
                  <span style="color:blue">{{scope.row[child.props]}}</span> | <span>{{scope.row[child.props]}}</span>
                </div>
              </el-table-column>
            </el-table-column>
            <el-table-column v-else :key="item.props" :label="item.name" :prop="item.props" align="center">
              <div slot-scope="scope">
                <span style="color:blue">{{scope.row[item.props]}}</span> | <span>{{scope.row[item.props]}}</span>
              </div>
            </el-table-column>
          </template>
        </el-table>
        <!-- <tableList
          class="margin-top20"
          ref="tableList"
          :selection="false"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :lang="true">
          <template #csc="scope">
            <span>{{'ASD'+'|'+'ZX'}}</span>
          </template>
        </tableList> -->
    </iCard>
  </div>
</template>

<script>
import { iCard } from "rise";
import tableList from "@/components/iTableSort"
import iprogress from "./progress";
export default {
  components:{
    iCard, iprogress,tableList
  },
  props:{
    tableTitle:{type: String},
    carProjectId:{type: String, default: '50141107'},
  },
  data(){
    return{
      tableListData:[
        {
          type:'Nomi后',
          csc: '50',
          Kickoff: '30',
          BF: '25',
          Data: '待办',
          tryout: '待办',
          OTS: '待办',
          M: '已办',
          G: '已办',
        },{
          type:'Aeko后',
          csc: '50',
          Kickoff: '30',
          BF: '25',
          Data: '待办',
          tryout: '待办',
          OTS: '待办',
          M: '待办',
          G: '已办',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.card-item{
  display: flex;
  flex-flow: row;
  .left{
    width: 300px;
    margin-right: 20px;
    
    ::v-deep .bodyShow{
      padding: 0;
      .el-divider--horizontal{
        margin-top: 0;
      }
    }
  }
  .right{
    flex: 1;
  }
}
</style>