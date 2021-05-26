<template>
  <div class="generateInvestmentList" v-permission="TOOLING_BUDGET_BUILD">
    <div class="page-head">
      <div class="page-head-flex" :class="tableIndex === 0 ? 'head-on' : ''" @click="selectHeadTable(0)">
        <div class="line-divL line-div">
          <div class="title">All</div>
          <div class="describe">所有BA申请</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 0" symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" :class="tableIndex === 1 ? 'head-on' : ''" @click="selectHeadTable(1)">
        <div class="line-divL line-div">
          <div class="title">10</div>
          <div class="describe">待确认BA申请</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 1" symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" :class="tableIndex === 2 ? 'head-on' : ''" @click="selectHeadTable(2)">
        <div class="line-divL line-div">
          <div class="title">18</div>
          <div class="describe">待确认追加金额</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 2" symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
    </div>

    <template v-if="tableIndex === 0">
      <SearchBlock />

      <iCard>
        <div class="table-head">
          <iButton @click="modifyA">{{ $t('LK_MODIFYANUMBER') }}</iButton>
        </div>
        <iTableList
          :height="tableHeight - 440"
          :tableData="allTableData"
          :tableTitle="allBAATableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- <template #amount="scope">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.amount" v-if="scope.row.deptName === 'Aeko'"
                    maxlength="20"></iInput>
            <div v-else>{{scope.row.amount}}</div>
          </template> -->
        </iTableList>
      </iCard>
    </template>

    <template v-else-if="tableIndex===1">
      <iCard>
        <div class="table-head">
          <iButton @click="waitApply">{{ $t('LK_CANCELAPPLY') }}</iButton>
        </div>
        <iTableList
          :height="tableHeight - 440"
          :tableData="waitTableData"
          :tableTitle="waitBAATableHead"
          :tableLoading="waitTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
        </iTableList>
      </iCard>
    </template>

    <template v-else-if="tableIndex===2">
      <iCard>
        <div class="table-head">
          <iButton @click="waitApply">{{ $t('LK_CANCELAPPLY') }}</iButton>
        </div>
        <iTableList
          :height="tableHeight - 440"
          :tableData="waitAddTableData"
          :tableTitle="waitAddTableHead"
          :tableLoading="waitAddTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
        </iTableList>
      </iCard>
    </template>
    
    
  </div>
</template>

<script>
import { allBAATableHead, waitBAATableHead, waitAddTableHead } from "./components/data";
import { tableHeight } from "@/utils/tableHeight";
import SearchBlock from "./components/searchBlock";
import {
  icon,
  iTableList
} from "@/components";
import {
  iSearch,
  iMessage,
  iSelect,
  iInput,
  iButton,
  iCard
} from "rise";

export default {
  mixins: [tableHeight],
  components: {
    icon, iSearch, iMessage,
    iSelect, iInput, iButton,
    SearchBlock, iTableList, iCard
  },
  data(){
    return {
      tableIndex: 0,
      iDialogAddCarTypeProject: false,
      allTableData: [],
      allBAATableHead,
      allTableLoading: false,
      waitTableLoading: false,
      waitAddTableLoading: false,
      allSelectList: [],
      waitTableData: [],
      waitAddTableData: [],
      waitBAATableHead,
      waitAddTableHead,
    }
  },

  created(){
    
  },

  methods: {

    handleSelectionChange(val){
      const type = this.tableIndex;
      const map = {
        0: 'allSelectList'
      }
      this[map[type]] = val;
    },

    //  退回申请
    waitApply(){

    },

    //  修改A号
    modifyA(){

    },

    selectHeadTable(type){
      this.tableIndex = type;
    },

    
  }
}
</script>

<style lang="scss" scoped>
.table-head{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.page-head{
  display: flex;
  padding-top: 20px;
  margin-bottom: 20px;

  .head-on{
    background: linear-gradient(42deg, #1660F1 0%, #76A5FF 100%) !important;

    .title, .describe{
      color: #FFFFFF !important;
    }
  }

  .page-head-flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 70px;
    flex: 1;
    height: 160px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
    border-radius: 10px;
    margin-left: 20px;
    cursor: pointer;

    .line-div{

      .title{
        font-size: 60px;
        font-weight: bold;
      }
      .describe{
        color: #798489;
        font-size: 16px;
        margin-top: 7px;
      }
      .openIcon{
        width: 78px;
        height: 78px;
      }
    }
  }
  & .page-head-flex:nth-child(1){
    margin-left: 0;
  }
}
</style>