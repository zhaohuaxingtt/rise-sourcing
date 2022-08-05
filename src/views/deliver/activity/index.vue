<template>
  <iPage>
    <search :searchList="searchList" :selectOptions="selectOptions" @sure="sure" @reset="reset"></search>
    <iCard class="margin-top20">
      <tableList
        class="table"
        ref="tableList"
        :lang="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :selection='false'>
        <template #col7="scope">
          <iButton type="text" @click="delete(scope.row,scope.rowIndex)">删除</iButton>
        </template>
        </tableList>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iInput, iButton } from "rise";
import search from "../components/search";
import { searchList, tableTitle } from "./data.js";
import tableList from "@/components/iTableSort";
  export default {
    components:{
      iPage, iCard, iInput, iButton, search, tableList
    },
    data() {
      return {
        searchList,
        selectOptions:{
          typeOptions:[
            {
              value:'0',
              label:'类型0'
            },{
              value:'1',
              label:'类型1'
            },
          ],
          kzOptions:[
            {
              value:'0',
              label:'否'
            },{
              value:'1',
              label:'是'
            },
          ]
        },
        tableListData:[
          {
            col1:'1.0',
            col2:'2.0',
            col3:'3.0',
            col4:'4.0',
            col5:'5.0',
            col6:'6.0',
          },{
            col1:'1.0',
            col2:'2.0',
            col3:'3.0',
            col4:'4.0',
            col5:'5.0',
            col6:'6.0',
          },
        ],
        tableTitle
      }
    },
    methods:{
      delete(row,rowIndex){

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>