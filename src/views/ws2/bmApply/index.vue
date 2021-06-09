<template>
  <div>
    <div class="page-head">
      <div class="page-head-flex" :class="tableIndex === 0 ? 'head-on' : ''" @click="selectHeadTable(0)">
        <div class="line-divL line-div">
          <div class="title">All</div>
          <div class="describe">{{$t('LK_ALLBMAPPLY')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 0" symbol name="iconsuoyouBAshenqingxuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" :class="tableIndex === 1 ? 'head-on' : ''" @click="selectHeadTable(1)">
        <div class="line-divL line-div">
          <div class="title">1</div>
          <div class="describe">{{$t('LK_DAIQUERENBMDAN')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 1" symbol name="icondaiquerenBAshenqingzhuijiajinexuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" :class="tableIndex === 2 ? 'head-on' : ''" @click="selectHeadTable(2)">
        <div class="line-divL line-div">
          <div class="title">2</div>
          <div class="describe">{{$t('LK_AEKOZENGZHIBMDAN')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 2" symbol name="iconAekozengzhiBMdanxuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="iconAekozengzhiBMdanweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" :class="tableIndex === 3 ? 'head-on' : ''" @click="selectHeadTable(3)">
        <div class="line-divL line-div">
          <div class="title">44</div>
          <div class="describe">{{$t('LK_AEKOJIANZHIBMDAN')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 3" symbol name="iconAekojianzhiBMdanxuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="iconAekojianzhiBMdanweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
    </div>

    <template v-if="tableIndex === 0">
      <SearchBlock />

      <iCard>
        <div class="table-head">
          <iButton @click="modifyA">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </div>
        <iTableList
          :tableData="allTableList"
          :tableTitle="allTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- <template #detailed="scope">
            <div class="detailed-item">
              <div class="detailed" @click="confirmA(scope)">{{$t('LK_QUEREN')}}</div>
              <div class="detailed" @click="openDetails(scope)">{{$t('LK_DETAILEDTXT')}}</div>
            </div>
          </template> -->
        </iTableList>
      </iCard>
      
    </template>

    <template v-if="tableIndex === 1">

    </template>

    <template v-if="tableIndex === 2">

    </template>

    <template v-if="tableIndex === 3">

    </template>
  </div>
</template>

<script>
import {
  icon,
  iTableList
} from "@/components";
import {
  iMessage,
  iButton,
  iCard,
  iPagination,
  iDialog,
  iInput,
} from "rise";
import SearchBlock from "./components/searchBlock";
import { allTableHead } from "./components/data"
export default {
  components: {
    icon, SearchBlock, iTableList, iCard,
    iButton
  },
  data(){
    return {
      tableIndex: 0,
      allTableHead,
      allTableLoading: false,
      allTableList: [],
      selectTableList: [],
    }
  },

  methods: {
    selectHeadTable(type){
      this.selectTableList = [];
      this.tableIndex = type;
    },

    handleSelectionChange(val){

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