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
        <iprogress :carProjectId="'50141107'"></iprogress>
        <tableList
          class="margin-top20"
          ref="tableList"
          :selection="false"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :lang="true">
        </tableList>
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
    tableTitle:{type: String}
  },
  data(){
    return{
      tableListData:[]
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