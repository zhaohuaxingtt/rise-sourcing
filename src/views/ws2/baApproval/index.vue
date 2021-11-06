<template>
  <div class="generateInvestmentList">
    <div class="page-head">
      <div class="page-head-flex" v-permission="TOOLING_BUDGET_BAAPPROVAL_ALL" :class="tableIndex === 0 ? 'head-on' : ''" @click="selectHeadTable(0)">
        <div class="line-divL line-div">
          <div class="title">All</div>
          <div class="describe">{{$t('LK_ALLBAAPPLY')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 0" symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" v-permission="TOOLING_BUDGET_BAAPPROVAL_APPLY" :class="tableIndex === 1 ? 'head-on' : ''" @click="selectHeadTable(1)">
        <div class="line-divL line-div">
          <div class="title">{{tabData.applyCount}}</div>
          <div class="describe">{{$t('LK_TOBECONFIRMEDBAAPPLY')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 1" symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" v-permission="TOOLING_BUDGET_BAAPPROVAL_MONEY" :class="tableIndex === 3 ? 'head-on' : ''" @click="selectHeadTable(3)">
        <div class="line-divL line-div">
          <div class="title">{{tabData.amountCount}}</div>
          <div class="describe">{{$t('LK_TOBECONFIRMEDMONEY')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 3" symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
    </div>

    <keep-alive>
      <div v-if="tableIndex === 0" v-permission="TOOLING_BUDGET_BAAPPROVAL_ALL">
        <SearchBlock @sure="handleSure" />

        <iCard>
          <div class="table-head">
            <iButton @click="modifyA">{{ $t('LK_MODIFYANUMBER') }}</iButton>
          </div>
          <iTableList
            :tableData="allTableData"
            :tableTitle="allBAATableHead"
            :tableLoading="allListLoading"
            @handleSelectionChange="handleSelectionChange"
          >
            <template #detailed="scope">
              <div class="detailed" @click="openDetails(scope)">{{$t('LK_DETAILEDTXT')}}</div>
            </template>
          </iTableList>
          <div class="unitExplain">
            <UnitExplain />
          </div>
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
      </div>
    </keep-alive>
    
    <keep-alive>
      <div v-if="tableIndex===1" v-permission="TOOLING_BUDGET_BAAPPROVAL_APPLY">
        <iCard>
          <div class="table-head">
            <iButton @click="waitApply(1)">{{ $t('LK_CANCELAPPLY') }}</iButton>
          </div>
          <iTableList
            :tableData="waitTableData"
            :tableTitle="waitBAATableHead"
            :tableLoading="waitTableLoading"
            @handleSelectionChange="handleSelectionChange"
          >
            <template #sixBa="scope">
              A-<div class="iDialog-inputItem">
                      <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.sixBa" maxlength="5" />
                    </div>-<div class="iDialog-inputItem">
                              <iInput :placeholder="`INT (${$t('LK_MODIFIABLE')})`" maxlength="3" v-model="scope.row.int" />
                            </div>
            </template>
            <template #detailed="scope">
              <div class="detailed-item">
                <div class="detailed" @click="confirmA(scope)">{{$t('LK_QUEREN')}}</div>
                <div class="detailed" @click="openDetails(scope)">{{$t('LK_DETAILEDTXT')}}</div>
              </div>
            </template>
          </iTableList>
          <div class="unitExplain">
            <UnitExplain />
          </div>
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
      </div>
    </keep-alive>
    
    <keep-alive>
      <div v-if="tableIndex===3" v-permission="TOOLING_BUDGET_BAAPPROVAL_MONEY">
        <iCard>
          <div class="table-head">
            <iButton @click="waitApply(3)">{{ $t('LK_CANCELAPPLY') }}</iButton>
          </div>
          <iTableList
            :tableData="waitAddTableData"
            :tableTitle="waitAddTableHead"
            :tableLoading="waitAddTableLoading"
            @handleSelectionChange="handleSelectionChange"
          >
            <template #detailed="scope">
              <div class="detailed-item">
                <div class="detailed" @click="confirmA(scope)">{{$t('LK_QUEREN')}}</div>
                <div class="detailed" @click="openDetails(scope)">{{$t('LK_DETAILEDTXT')}}</div>
              </div>
            </template>
          </iTableList>
          <div class="unitExplain">
            <UnitExplain />
          </div>
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
      </div>
    </keep-alive>
    
    
    <!-- 修改A号弹窗 -->
    <iDialog :visible="visible" @close='clearDiolog' width="22%" top="7vh" z-index="1000" class="iDialog">
      <template slot="title">
        <div class="iDialog-head">
          <div>
            {{$t('LK_MODIFYANUMBER')}}
          </div>
          <Popover
              width="272"
              placement="bottom"
              trigger="hover">
            <div class="popoverDiv">
              <p>{{$t('LK_MODIFYANUMBERTXTTIPS')}}</p>
            </div>
            <icon symbol name="iconxinxitishi" slot="reference"></icon>
          </Popover>
          <div>
            {{allSelectList.length && allSelectList[0].carTypeName || ''}} {{allSelectList.length && allSelectList[0].localFactoryName || ''}}
          </div>
          
        </div>
      </template>

      <div class="iDialog-item">
        <div>
          {{$t('LK_PRIMARYAMBER')}}:{{allSelectList.length && allSelectList[0].sixBa || ''}}
        </div>
        <div>
          {{$t('LK_NEWAMBER')}}:A-<div class="iDialog-input">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="sixBa" maxlength="5" />
                  </div>-<div class="iDialog-input">
                            <iInput :placeholder="`INT (${$t('LK_MODIFIABLE')})`" maxlength="3" v-model="int" />
                          </div>
        </div>
      </div>

      <div class="iDialog-bottom">
        <iButton @click="iDialogConfirm" :loading="modifyAButtonLoading">{{ $t('LK_QUEDING') }}</iButton>
      </div>
    </iDialog>

    <!-- 明细 -->
    <ApplyPopup :visible="detailsdVisible" :title="$t('LK_DETAILEDTXT')" @changeLayer="clearDetailsDiolog">
      <template slot="table">
        <iTableList
          :tableData="detailsTableData"
          :tableTitle="detailedTableHead"
          :selection="false"
          class="table-footerStyle"
        >
          <template #rsNum="scope">
            <a @click="openViewPdf(scope)" class="detailed">{{scope.row.rsNum}}</a>
          </template>
        </iTableList>
      </template>
    </ApplyPopup>

    <!-- 确认页面 -->
    <ApplyPopup :visible="confirmVisible" :title="titleMap[tableIndex]" @changeLayer="clearConfirmDiolog">
      <template slot="table">
        <iTableList
          :tableData="confirmTableData"
          :tableTitle="confirmTableHead"
          :selection="false"
          class="table-footerStyle"
        >
          
        </iTableList>
      </template>
      <template slot="btns">
        <iButton @click="handleConfirm(tableIndex)" :loading="confirmButtonLoding">{{ $t('LK_QUEREN') }}</iButton>
      </template>
    </ApplyPopup>

    <!-- 提示 -->
    <Tips :visible='tipsVisible' @changeLayer="clearTipsDiolog">
      <template slot="msg">
        <div>
          <span>
            {{currentScope.localFactoryName}}
            {{$t('LK_OF')}}
            {{currentScope.carTypeName}}
            {{$t('LK_PLEASEINPUTTIPS5')}}
          </span>
          <span class="color-txt">
            {{$t('LK_PLEASEINPUTTIPS6')}}
          </span>
          <span>
            {{$t('LK_PLEASEINPUTTIPS7')}}
          </span>
        </div>
      </template>
    </Tips>
  </div>
</template>

<script>
import { getBaCount, findListConditoons,
  listByStatus, updateSixBa, backApprove, getDetail,
  addSixBa, updateByCarId, confirmDetail
} from "@/api/ws2/baApproval";
import { allBAATableHead, waitBAATableHead, waitAddTableHead, detailedTableHead, confirmTableHead } from "./components/data";
import { tableHeight } from "@/utils/tableHeight";
import { Popover } from "element-ui"
import SearchBlock from "./components/searchBlock";
import { pageMixins } from "@/utils/pageMixins";
import ApplyPopup from "./components/applyPopup";
import Tips from "./components/tips";
import UnitExplain from "./components/unitExplain";
import {
  icon,
  iTableList
} from '@/components';
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
    ApplyPopup, Tips, UnitExplain
  },
  data(){
    return {
      titleMap: {
        1: this.$t('LK_CONFIRMANUMBER'),
        3: this.$t('LK_CONFIRMMONEY')
      },
      sixBa: '',
      int: 'INT',
      tableIndex: 0,
      iDialogAddCarTypeProject: false,
      allTableData: [],
      allBAATableHead,
      detailedTableHead,
      allListLoading: false,
      waitTableLoading: false,
      waitAddTableLoading: false,
      modifyAButtonLoading: false,
      detailsdVisible: false,
      visible: false,
      confirmVisible: false,
      tipsVisible: false,
      confirmButtonLoding: false,
      allSelectList: [],
      waitSelectList: [],
      waitAddSelectList: [],
      waitTableData: [],
      waitAddTableData: [],
      detailsTableData: [],
      confirmTableData: [],
      confirmTableHead,
      waitBAATableHead,
      waitAddTableHead,
      currentScope: {},
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
      },
      detailPage: {
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

    //  rs单号
    openViewPdf(scope){
      let url = process.env.VUE_APP_TOOLING  + '/baCommodityApply' + '/exportRsForAudit/' + scope.row.rsNum;
      console.log('url', url);
      window.open(url)
    },

    clearTipsDiolog(){
      this.tipsVisible = false;
    },

    //  确认金额、确认A号
    handleConfirm(type){
      const { currentScope } = this;
      const sixBa = currentScope.sixBa || '';
      const int = currentScope.int || '';

      const fun = type === 1 ? addSixBa : updateByCarId;
      const data = {
        approveAmount: currentScope.approveAmount,
        id: currentScope.id,
        localFactoryId: currentScope.localFactoryid,
        tmCartypeProId: currentScope.tmCartypeProId
      }
      const paramMap = {
        1: {
          ...data,
          sixBa: `A-${sixBa}-${int.length === 0 ? 'INT' : int}`,
        },
        3: {
          ...data
        }
      }

      this.confirmButtonLoding = true;

      fun(paramMap[type]).then(res => {
        console.log('确认：', res);
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.code === '1'){
          this.confirmVisible = false;
          this.tipsVisible = true;
        }else{
          if(res.data){
            iMessage.success(result);
            this.confirmVisible = false;
            this.getPageData();
            this.getBaCount();
          }else{
            iMessage.error(result);
          }
          
        }
        this.confirmButtonLoding = false;
      }).catch(err => {
        this.confirmButtonLoding = false;
      })
    },

    clearDetailsDiolog(visible){
      this.detailsdVisible = visible;
    },

    //  明细
    openDetails(scope){
      getDetail({id: scope.row.id}).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.detailsTableData = res.data;
          this.detailsdVisible = true;
        }else{
          iMessage.error(result);
        }
      })
    },

    clearConfirmDiolog(){
      this.confirmVisible = false;
    },

    //  确认A号
    confirmA(scope){
      const { currentScope, tableIndex } = this;
      const sixBa = scope.row.sixBa || '';
      const int = scope.row.int || '';
      const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
      
      if(tableIndex === 1){ //  对输入的BA号判断
        
        if(sixBa === '' || sixBa.length < 5){
          return iMessage.warn(this.$t('LK_INPUTNUMBERORMORE'));
        }

        if(int.length < 3 && int !== ''){
          return iMessage.warn(this.$t('LK_INPUTNUMBERORMORE'));
        }

        if(pattern.test(sixBa) || pattern.test(int)){
          return iMessage.warn(this.$t('LK_INPUTNUMBERORMORE1'));
        }
      }

      confirmDetail({
        id: scope.row.id,
        tmCartypeProId: scope.row.tmCartypeProId
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          if(this.tableIndex === 1){
            this.confirmTableData = res.data.map(item => ({
              ...item,
              baNumber: item.carTypeName === 'Total' ? '' : (sixBa ? `A-${sixBa}-${int.length === 0 ? 'INT' : int}` : sixBa),
            }));
          }else if(this.tableIndex === 3){
            this.confirmTableData = res.data.map(item => ({
              ...item,
              baNumber: item.carTypeName === 'Total' ? '' : item.baNum,
            }));
          }
          
          this.confirmVisible = true;
          this.currentScope = scope.row;
        }else{
          iMessage.error(result);
        }
      })
    },

    //  修改A号-确认
    iDialogConfirm(){
      const { sixBa, int, allSelectList } = this;

      if(sixBa === '' || sixBa.length < 5){
        return iMessage.warn(this.$t('LK_INPUTNUMBERORMORE'));
      }

      if(int.length < 3 && int !== ''){
        return iMessage.warn(this.$t('LK_INPUTNUMBERORMORE'));
      }

      this.modifyAButtonLoading = true;

      const param = {
        sixBa: `A-${sixBa}-${int.length === 0 ? 'INT' : int}`,
        tmCartypeProId: allSelectList[0].tmCartypeProId,
        localFactoryId: allSelectList[0].localFactoryid,
        id: allSelectList[0].id,
      }

      updateSixBa(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          iMessage.success(result);
          this.visible = false;
          this.getBaCount();
          this.getPageData();
          this.modifyAButtonLoading = false;
        }else{
          iMessage.error(result);
          this.modifyAButtonLoading = false;
        }
      })

      
    },

    clearDiolog(){
      this.visible = false;
    },
    
    handleSure(form){
      this.allListLoading = true;
      const param = {
        ...form,
        current: this.allPage.currPage,
        size: this.allPage.pageSize,
      }
      findListConditoons(param).then(res => {
        this.allPage.currPage = ~~res.pageNum || 1;
        this.allPage.pageSize = ~~res.pageSize || 10;
        this.allPage.totalCount = ~~res.total;
        this.allTableData = res.data;

        this.allListLoading = false;
      }).catch(err => {
        this.allListLoading = false;
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
        0: 'allListLoading',
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

      backApprove({
        ids: list.map(item => item.id)
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          iMessage.success(result);
          this.getPageData();
          this.getBaCount();
        }else{
          iMessage.error(result);
        }
      })


    },

    //  修改A号
    modifyA(){
      if(!this.allSelectList.length){
        return iMessage.warn(this.$t('LK_PLEASEINPUTTIPS1'));
      }

      if(this.allSelectList.length > 1){
        return iMessage.warn(this.$t('LK_PLEASEINPUTTIPS2'));
      }
      
      if(!this.allSelectList[0].sixBa || this.allSelectList[0].sixBa === ''){
        return iMessage.warn(this.$t('LK_PLEASEINPUTTIPS3'));
      }

      if(this.allSelectList[0].baStatus === "5"){
        return iMessage.warn(this.$t('LK_PLEASEINPUTTIPS4'));
      }

      this.visible = true;
    },

    selectHeadTable(type){
      if(this.tableIndex === type){
        return
      }
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
.unitExplain{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.table-footerStyle{

  ::v-deep .el-table__row:nth-last-child(1){
    color: #000 !important;
    font-weight: bold !important;
  }
}
.color-txt{
  color: #1660F1;
}
.iDialog-inputItem{
  display: inline-block;
  width: 80px;
}
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
    display: flex;

    & div:nth-child(1){
      font-size: 18px;
      font-weight: bold;
    }
    & div:nth-child(3){
      width: 175px;
      color: #333333;
      font-size: 14px;
      margin-left: 5px;
    }
  }

  ::v-deep .el-dialog{
    height: auto !important;
    padding-bottom: 10px !important;
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