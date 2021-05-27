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
          <div class="title">{{tabData.applyCount}}</div>
          <div class="describe">待确认BA申请</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 1" symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" :class="tableIndex === 3 ? 'head-on' : ''" @click="selectHeadTable(3)">
        <div class="line-divL line-div">
          <div class="title">{{tabData.amountCount}}</div>
          <div class="describe">待确认追加金额</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 2" symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
    </div>

    <template v-if="tableIndex === 0">
      <SearchBlock @sure="handleSure" />

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
          <template #detailed="scope">
            <div class="detailed">明细</div>
          </template>
        </iTableList>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, handleSure)"
          @current-change="handleCurrentChange($event, handleSure)"
          background
          :current-page="allPage.currPage"
          :page-sizes="allPage.pageSizes"
          :page-size="allPage.pageSize"
          :layout="allPage.layout"
          :total="allPage.totalCount"
        />
      </iCard>
    </template>

    <template v-else-if="tableIndex===1">
      <iCard>
        <div class="table-head">
          <iButton @click="waitApply(1)">{{ $t('LK_CANCELAPPLY') }}</iButton>
        </div>
        <iTableList
          :height="tableHeight - 440"
          :tableData="waitTableData"
          :tableTitle="waitBAATableHead"
          :tableLoading="waitTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #sixBa="scope">
            A-<div class="iDialog-input">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="sixBa" maxlength="6" />
                  </div>-<div class="iDialog-input">
                            <iInput :placeholder="`INT (${$t('LK_MODIFIABLE')})`" v-model="int" />
                          </div>
          </template>
          <template #detailed="scope">
            <div class="detailed-item">
              <div class="detailed">确认</div>
              <div class="detailed">明细</div>
            </div>
          </template>
        </iTableList>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getPageData)"
          @current-change="handleCurrentChange($event, getPageData)"
          background
          :current-page="waitPage.currPage"
          :page-sizes="waitPage.pageSizes"
          :page-size="waitPage.pageSize"
          :layout="waitPage.layout"
          :total="waitPage.totalCount"
        />
      </iCard>
    </template>

    <template v-else-if="tableIndex===3">
      <iCard>
        <div class="table-head">
          <iButton @click="waitApply(3)">{{ $t('LK_CANCELAPPLY') }}</iButton>
        </div>
        <iTableList
          :height="tableHeight - 440"
          :tableData="waitAddTableData"
          :tableTitle="waitAddTableHead"
          :tableLoading="waitAddTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #detailed="scope">
            <div class="detailed-item">
              <div class="detailed">确认</div>
              <div class="detailed">明细</div>
            </div>
          </template>
        </iTableList>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getPageData)"
          @current-change="handleCurrentChange($event, getPageData)"
          background
          :current-page="waitAddPage.currPage"
          :page-sizes="waitAddPage.pageSizes"
          :page-size="waitAddPage.pageSize"
          :layout="waitAddPage.layout"
          :total="waitAddPage.totalCount"
        />
      </iCard>
    </template>
    
    <!-- 修改A号弹窗 -->
    <iDialog :visible="visible" @close='clearDiolog' width="22%" top="7vh" z-index="1000" class="iDialog">
      <template slot="title">
        <div class="iDialog-head">
          <span>
            修改A号
          </span>
          <span>
            {{allSelectList.length && allSelectList[0].carTypeName || ''}} {{allSelectList.length && allSelectList[0].localFactoryName || ''}}
          </span>
          <Popover
              width="272"
              placement="bottom"
              trigger="hover">
            <div class="popoverDiv">
              <p>确定后，所有同⼀⻋型项⽬、同⼀⼯⼚的BA申请相关记录将⼀并更改。</p>
            </div>
            <icon symbol name="iconxinxitishi" slot="reference"></icon>
          </Popover>
        </div>
      </template>

      <div class="iDialog-item">
        <div>
          原A号：A-000001-INT
        </div>
        <div>
          原A号：A-<div class="iDialog-input">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="sixBa" maxlength="6" />
                  </div>-<div class="iDialog-input">
                            <iInput :placeholder="`INT (${$t('LK_MODIFIABLE')})`" v-model="int" />
                          </div>
        </div>
      </div>

      <div class="iDialog-bottom">
        <iButton @click="iDialogConfirm">{{ $t('LK_QUEDING') }}</iButton>
      </div>
    </iDialog>
    
  </div>
</template>

<script>
import { getBaCount, findListConditoons, listByStatus, updateSixBa, backApprove } from "@/api/ws2/baApproval";
import { allBAATableHead, waitBAATableHead, waitAddTableHead } from "./components/data";
import { tableHeight } from "@/utils/tableHeight";
import { Popover } from "element-ui"
import SearchBlock from "./components/searchBlock";
import { pageMixins } from "@/utils/pageMixins";
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

export default {
  mixins: [tableHeight, pageMixins],
  components: {
    icon, iButton, iDialog,
    SearchBlock, iTableList, iCard,
    iPagination, iInput, Popover,
  },
  data(){
    return {
      sixBa: '',
      int: 'INT',
      tableIndex: 0,
      iDialogAddCarTypeProject: false,
      allTableData: [],
      allBAATableHead,
      allTableLoading: false,
      waitTableLoading: false,
      waitAddTableLoading: false,
      visible: false,
      allSelectList: [],
      waitSelectList: [],
      waitAddSelectList: [],
      waitTableData: [],
      waitAddTableData: [],
      waitBAATableHead,
      waitAddTableHead,
      tabData: {
        amountCount: 0,
        applyCount: 0,
      },
      allPage: {
        currPage: 1,
        pageSize: 10,
      },
      waitPage: {
        currPage: 1,
        pageSize: 10,
      },
      waitAddPage: {
        currPage: 1,
        pageSize: 10,
      }
    }
  },

  created(){
    this.getBaCount();
    this.getPageData();
  },

  methods: {

    //  修改A号-确认
    iDialogConfirm(){
      const { sixBa, int, allSelectList } = this;

      if(sixBa === '' || sixBa.length < 6){
        return iMessage.warn('请输入6位数的A号！');
      }

      const param = {
        sixBa: `A-${sixBa}-${int}`,
        tmCartypeProId: allSelectList[0].tmCartypeProId,
      }

      updateSixBa(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          iMessage.success(result);
          this.visible = false;
          this.getBaCount();
          this.getPageData();
        }else{
          iMessage.error(result);
        }
      })

      
    },

    clearDiolog(){
      this.visible = false;
    },
    
    handleSure(form){
      this.allTableLoading = true;
      const param = {
        ...form,
        current: this.allPage.currPage,
        size: this.allPage.pageSize,
      }
      findListConditoons(param).then(res => {
        this.allPage.currPage = ~~res.pageNum;
        this.allPage.pageSize = ~~res.pageSize;
        this.allPage.totalCount = ~~res.total;
        this.allTableData = res.data;

        this.allTableLoading = false;
      }).catch(err => {
        this.allTableLoading = false;
      })
    },

    //  获取顶部tab数量
    getBaCount(){
      getBaCount().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(!res.data){
          return iMessage.error(result);
        }
        this.tabData = res.data;
      })
    },

    getPageData(){
      const { tableIndex } = this;
      const pageMap = {
        0: 'allPage',
        1: 'waitPage',
        3: 'waitAddPage',
      }
      const dataMap = {
        0: 'allTableData',
        1: 'waitTableData',
        3: 'waitAddTableData',
      }
      const loadingMap = {
        0: 'allTableLoading',
        1: 'waitTableLoading',
        3: 'waitAddTableLoading',
      }
      this[loadingMap[tableIndex]] = true;
      const param = {
        statusType: tableIndex,
        current: this[pageMap[tableIndex]].currPage,
        size: this[pageMap[tableIndex]].pageSize,
      }

      listByStatus(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          this[dataMap[tableIndex]] = res.data;
          this[pageMap[tableIndex]] = {
            currPage: ~~res.pageNum,
            pageSize: ~~res.pageSize,
            totalCount: ~~res.total,
          }
        }else{
          iMessage.error(result);
        }


        this[loadingMap[tableIndex]] = false;
      }).catch(err => {
        this[loadingMap[tableIndex]] = false;
      })
    },

    handleSelectionChange(val){
      const type = this.tableIndex;
      const map = {
        0: 'allSelectList',
        1: 'waitSelectList',
        3: 'waitAddSelectList'
      }
      this[map[type]] = val;
    },

    //  退回申请
    waitApply(type){
      const map = {
        0: 'allSelectList',
        1: 'waitSelectList',
        3: 'waitAddSelectList'
      }
      const list = this[map[type]];

      if(!list.length){
        return iMessage.warn('请选择需要退回的数据！');
      }

      backApprove(list.map(item => item.id)).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          iMessage.success(result);
          this.getPageData();
        }else{
          iMessage.error(result);
        }
      })


    },

    //  修改A号
    modifyA(){
      if(!this.allSelectList.length){
        return iMessage.warn('请选择需要修改的数据！');
      }

      if(this.allSelectList.length > 1){
        return iMessage.warn('最多只能同时修改一条数据！');
      }

      this.visible = true;
    },

    selectHeadTable(type){
      this.tableIndex = type;
      this.allSelectList = [];
      this.waitSelectList = [];
      this.waitAddSelectList = [];
      this.getPageData();
    },

    
  }
}
</script>

<style lang="scss" scoped>
.iDialog{

  .iDialog-bottom{
    display: flex;
    justify-content: flex-end;
    margin-top: 25px;
  }

  .iDialog-item{
    font-size: 14px;

    div:nth-child(1){
      margin-bottom: 5px;
    }

    .iDialog-input{
      display: inline-block;
      width: 120px;
    }
  }

  .iDialog-head{

    & span:nth-child(1){
      font-size: 18px;
      font-weight: bold;
    }
    & span:nth-child(2){
      color: #333333;
      font-size: 14px;
    }
  }

  ::v-deep .el-dialog{
    height: 217px;
    overflow: auto;
  }

  ::v-deep .el-dialog__header{
    padding-top: 23px;
  }
}
.detailed-item{
  display: flex;
  justify-content: space-between;
}
.detailed{
  color: #1663F6;
  text-decoration: underline;
  font-family: Arial;
  cursor: pointer;
}
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