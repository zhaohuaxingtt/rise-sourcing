<template>
  <iPage>
    <H1>送样计划</H1>
    <search class="margin-top20" :searchList="searchList" :selectOptions="selectOptions" @sure="sure" @reset="reset"></search>
    <el-row :gutter="40">
      <el-col :span="12">
        <iCard :title="'送样零件'">
          <tableList :tableData="tableDataLeft" :tableTitle="tableTitleLeft" index :indexLabel="'#'" :selection='false'>
            <template #col5="scope">
              <iButton type="text">编辑计划</iButton>
              <iButton type="text">编辑实际</iButton>
              <iButton type="text">复制</iButton>
            </template>
          </tableList>
        </iCard>
      </el-col>
      <el-col :span="12">
        <iCard :title="'送样管理进度计划维护'">
          <tableList :tableData="tableDataRight" :tableTitle="tableTitleRight">
          <template #col4="scope">
              <iButton type="text">发送</iButton>
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
} from "rise";
import search from "../components/search";
import tableList from "@/components/iTableSort"
import { searchList, tableTitleLeft, tableTitleRight } from "./data";
  export default {
    components:{
      iPage,
      iCard,
      iButton,
      search,
      tableList
    },
    data() {
      return {
        searchList,
        tableDataLeft:[{
            col1:'1',
            col2:'2',
            col3:'3',
            col4:'4',
            col5:'5',
          },{
            col1:'1',
            col2:'2',
            col3:'3',
            col4:'4',
            col5:'5',
          }],
        tableDataRight:[{
            col1:'1',
            col2:'2',
            col3:'3',
            col4:'4',
            col5:'5',
          },{
            col1:'1',
            col2:'2',
            col3:'3',
            col4:'4',
            col5:'5',
          }],
        tableTitleLeft,
        tableTitleRight,
      }
    },
    methods:{
      sure(){},
      reset(){},
    }
  }
</script>

<style lang="scss" scoped>

</style>