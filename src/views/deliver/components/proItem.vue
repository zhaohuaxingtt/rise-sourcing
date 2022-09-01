<template>
  <!-- <div class="card-item"> -->
    <iCard>
      <div class="wrap-flex">
        <div class="left">
          <h2>全新一代朗逸两厢</h2>
          <h2>New Gran Lavida</h2>
          <div>
            <p>零件总个数：<span>{{totalNum||0}}</span></p>
            <p>当前定点完成数量：<span>{{totalNum||0}}</span></p>
            <p>当前已完成送样数量：<span>{{totalNum||100000}}</span></p>
          </div>
        </div>
        <div class="right">
          <iprogress :carProjectId="carProjectId"></iprogress>
          <el-table :data="tableListData" class="margin-top20">
            <template v-for="item in tableTitle">
              <el-table-column v-if="item.children" :key="item.props" :label="item.name" :prop="item.props" align="center">
                <el-table-column v-for="child in item.children" :key="child.props" :label="child.name" :prop="child.props" align="center">
                  <div slot-scope="scope">
                      <span style="color:blue;cursor:pointer;" @click="jump(child.props)">{{scope.row[child.props]}}</span> | <span>{{scope.row[child.props]}}</span>
                  </div>
                </el-table-column>
              </el-table-column>
              <el-table-column v-else :key="item.props" :label="item.name" :prop="item.props" align="center">
                <div slot-scope="scope">
                  <template v-if="item.props == 'type'">
                      <span>{{scope.row[item.props]}}</span>
                    </template>
                    <template v-else>
                      <span style="color:blue;cursor:pointer;" @click="jump(item.props)">{{scope.row[item.props]}}</span> | <span>{{scope.row[item.props]}}</span>
                    </template>
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
        </div>
      </div>
    </iCard>
  <!-- </div> -->
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
          Data: '30',
          tryout: '30',
          OTS: '30',
          M: '30',
          G: '30',
        },{
          type:'Aeko后',
          csc: '50',
          Kickoff: '30',
          BF: '25',
          Data: '35',
          tryout: '40',
          OTS: '35',
          M: '35',
          G: '35',
        },
      ]
    }
  },
  methods:{
    jump(val){
      console.log(val);
      const hrefs = this.$router.resolve({
        path: "/deliver/kickoff",
        query: {
          type: val
        }
      });
      window.open(hrefs.href, "_blank");

    }
  }
}
</script>

<style lang="scss" scoped>
.left{
  width: 250px;
  margin-right: 30px;
  padding-right: 30px;
  border-right:1px solid #E6E9F0;
  
  h2{
    margin-bottom:10px;
  }
  p{
    font-size: 14.5px;
    margin-bottom:15px;
  }

  div{
    margin-top:40px;
  }

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
.wrap-flex{
  display: flex;
  justify-content: space-between;
}
</style>