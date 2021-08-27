<!--
 * @Author: wentliao
 * @Date: 2021-08-25 09:56:39
 * @Description: 
-->
<template>
  <!-- 样件费 -->
  <iCard class="sampleFee">
    <template #header>
        <div class="header">
          <div>
            <span class="title">{{ language('LK_DAMAGES_SAMPLEFEE_YANGJIANFEI','样件费') }}</span>
          </div>
          <div class="control">
            <iButton @click="save">{{language('LK_BAOCUN','保存')}}</iButton>
          </div>
        </div>
      </template>
      <div>
        <tableList
          class="table"
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :selection="false"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- ⼯装样件单件费⽤ -->
          <template #b="scope">
            <iInput class="tableInput" v-model="scope.row['b']" />
          </template>
          
          <!-- 附加⼯装样件模具价格 -->
          <template #c="scope">
            <iInput class="tableInput" v-model="scope.row['c']" />
          </template>
          
          <!-- 附加⼯装样件模具寿命 -->
          <template #d="scope">
            <iInput class="tableInput" v-model="scope.row['d']" />
          </template>

          <!-- 备注 -->
          <template #e="scope">
            <iInput class="tableInput" v-model="scope.row['e']" />
          </template>
        </tableList>
      </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iInput,
} from 'rise'
import {
  sampleFeeTableTitle as tableTitle,
} from '../data'
import tableList from "@/views/partsign/editordetail/components/tableList"

export default {
  components:{
    iCard,
    iButton,
    tableList,
    iInput,
  },
  data(){
    return{
      tableTitle,
      tableListData:[
        {a:'⼯装样件(BS1)',b:'',c:'',d:'',e:''},
        {a:'⼯装样件(BS2)',b:'',c:'',d:'',e:''},
        {a:'⼯装样件(BS3)',b:'',c:'',d:'',e:''},
        {a:'其他样件',b:'',c:'',d:'',e:''},
      ],
      loading:false,
    }
  }
}
</script>

<style lang="scss" scoped>
  .sampleFee{
    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        height: 25px;
        line-height: 25px;
        font-size: 18px;
        font-weight: bold;
        color: #131523;
      }
    }
    .tableInput{
      width: 70%;
    }
  }
</style>