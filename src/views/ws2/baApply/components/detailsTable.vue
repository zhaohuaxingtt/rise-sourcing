<template>
  <div>
    <div class="page-head">
      <iButton @click="applyBA">申请BA单</iButton>
    </div>
    
    <iTableList
        :height="tableHeight - 440"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :activeItems="'partNum'"
    >
      <!-- <template #data1="scope">
        <a class="table-a" href="javascript: ;" @click="jumpDetails">{{scope.row.data1}}</a>
      </template> -->
    </iTableList>
  </div>
</template>

<script>
import { tableHeight } from "@/utils/tableHeight";
import { detailsTableHead } from "./data";
import { iButton, iMessage } from "rise";
import {
  iTableList
} from "@/components";

export default {
  data(){
    return {
      tableListData: [],
      tableTitle: detailsTableHead,
      tableLoading: false,
      selectTableData: [],
    }
  },
  mixins: [tableHeight],
  components: {
    iTableList,
    iButton,
    iMessage
  },

  methods: {
    
    //  申请BA单
    applyBA(){
      if(this.selectTableData){
        return iMessage.warn('请先选择车型项目');
      }
    },

    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  }
}
</script>

<style lang="scss" scoped>
.page-head{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>