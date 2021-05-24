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

    <!-- 申请BA单弹窗 -->
    <ApplyPopup :visible="visible" @changeLayer="changeLayer" @confirm="layerConfirm">
      <span slot="nameArry" class="span-color">
        名字
      </span>

      <template slot="table">
        <iTableList
          :getSummaries="getSummaries"
          :tableData="tableLayerListData1"
          :tableTitle="tableLayerTitle1"
          :tableLoading="tableLayerLoading"
          :selection="false"
          :show-summary="true"
      >
      </iTableList>
      </template>

    </ApplyPopup>
  </div>
</template>

<script>
import { tableHeight } from "@/utils/tableHeight";
import { detailsTableHead, layerTableHead1, layerTableHead2 } from "./data";
import { iButton, iMessage } from "rise";
import ApplyPopup from "./applyPopup";
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
      visible: false,
      tableLayerListData1: [
        {data1: '11111111', data2: '11111111', data3: '11111111', data4: '11111111', data5: '11111111'},
        {data1: '11111111', data2: '11111111', data3: '11111111', data4: '11111111', data5: '11111111'},
        {data1: '11111111', data2: '11111111', data3: '11111111', data4: '11111111', data5: '11111111'},
      ],
      tableLayerTitle1: layerTableHead1,
      tableLayerLoading: false
    }
  },
  mixins: [tableHeight],
  components: {
    iTableList,
    iButton,
    iMessage,
    ApplyPopup
  },

  methods: {

    layerConfirm(){
      
    },

    changeLayer(visible){
      this.visible = visible;
    },

    getSummaries(param){
      console.log('param', param);
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Total';
          return;
        }
        if(column.property === "data5"){  //  只有金额字段才需要显示总价
          const values = data.map(item => Number(item[column.property]));
          console.log('values', values);
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        }else{
          sums[index] = '';
        }
        
      });
      return sums;
    },
    
    //  申请BA单
    applyBA(){
      // if(this.selectTableData){
      //   return iMessage.warn('请先选择车型项目');
      // }
      this.visible = true;
    },

    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  }
}
</script>

<style lang="scss" scoped>
.span-color{
  color: #1660F1;
}
.page-head{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>