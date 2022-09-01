<template>
  <iPage class="deliverPlan">
    <H1>送样计划</H1>
    <search class="margin-top20" :searchList="searchList" :selectOptions="selectOptions" @sure="sure" @reset="reset"></search>
    <el-row :gutter="40">
      <el-col :span="12">
        <iCard :title="'送样零件'">
          <tableList :tableData="tableDataLeft" :tableTitle="tableTitleLeft" index :indexLabel="'#'" :selection='false'>
            <template #col5="scope">
              <iButton type="text" @click="editPlan(scope.row)">编辑计划</iButton>
              <iButton type="text" @click="editActual(scope.row)">编辑实际</iButton>
              <iButton type="text" @click="copyParts(scope.row)">复制</iButton>
            </template>
          </tableList>
        </iCard>
      </el-col>
      <el-col :span="12">
        <iCard :title="rightTitleType?'送样管理进度计划':'送样管理进度计划维护'">
          <div class="flex-box">
            <div>
              <span>车型项目:{{carProject}}</span>
              <span style="display:inline-block;margin-left:20px;">零件：{{partName}}</span>
            </div>
            <div>
              <iButton>甘特图导出</iButton>
              <iButton>保存</iButton>
              <iButton>发送</iButton>
            </div>
          </div>
          <tableList v-show="rightTitleType" class="margin-top20" :tableData="tableDataRight" :tableTitle="tableTitleRight1">
            <template #col2="scope">
              <iDatePicker
                v-if="scope.row.type"
                v-model="scope.row.col2"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker>
              <span v-else>{{scope.row.col2?scope.row.col2:'/'}}</span>
            </template>
            <template #col3="scope">
              <iDatePicker
                v-if="scope.row.type"
                v-model="scope.row.col3"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker>
              <span v-else>{{scope.row.col3?scope.row.col3:'/'}}</span>
            </template>
            <template #col4="scope">
              <iButton type="text" :disabled="!scope.row.type">发送</iButton>
            </template>
          </tableList>
          <tableList v-show="!rightTitleType" class="margin-top20" :tableData="tableDataRight" :tableTitle="tableTitleRight2">
            <template #col2="scope">
              <iDatePicker
                v-if="scope.row.type"
                v-model="scope.row.col2"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker>
              <span v-else>{{scope.row.col2?scope.row.col2:'/'}}</span>
            </template>
            <template #col3="scope">
              <iDatePicker
                v-if="scope.row.type"
                v-model="scope.row.col3"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker>
              <span v-else>{{scope.row.col3?scope.row.col3:'/'}}</span>
            </template>
            <template #col4="scope">
              <iButton type="text" :disabled="!scope.row.type">发送</iButton>
            </template>
          </tableList>
        </iCard>
      </el-col>
    </el-row>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iButton,
  iDatePicker,
} from "rise";
import search from "../components/search";
import tableList from "@/components/iTableSort"
import { searchList, tableTitleLeft, tableTitleRight1,tableTitleRight2 } from "./data";
  export default {
    components:{
      iPage,
      iCard,
      iButton,
      search,
      tableList,
      iDatePicker
    },
    data() {
      return {
        searchList,
        tableDataLeft:[{
            col1:'车型项目1',
            col2:'2',
            col3:'零件1',
            col4:'4',
            col5:'5',
          },{
            col1:'车型项目2',
            col2:'2',
            col3:'零件2',
            col4:'4',
            col5:'5',
          }],
        tableDataRight:[{
            col1:'1',
            col2:'2',
            col3:'3',
            type:true,
          },{
            col1:'1',
            col2:'',
            col3:'',
            type:true,
          },{
            col1:'1',
            col2:'',
            col3:'',
            type:false,
          },{
            col1:'1',
            col2:'',
            col3:'2',
            type:false,
          }],
        tableTitleLeft,
        tableTitleRight1,
        tableTitleRight2,
        carProject: "",
        partName: '',
        rightTitleType:true,
      }
    },
    created(){
      this.carProject = this.tableDataLeft[0].col1;
      this.partName = this.tableDataLeft[0].col3;
    },
    methods:{
      editPlan(val){
        this.rightTitleType = true;
        this.carProject = val.col1;
        this.partName = val.col3;
        console.log(val);
      },
      editActual(val){
        this.rightTitleType = false;
        this.carProject = val.col1;
        this.partName = val.col3;
        console.log(val);
      },
      copyParts(val){
        console.log(val);
      },
      sure(){},
      reset(){},
    }
  }
</script>

<style lang="scss" scoped>
.deliverPlan{
  ::v-deep .el-col{
    .card{
      height: calc(100vh - 320px);
      .flex-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
::v-deep .el-input__icon{
  line-height: 2rem;
}
</style>