<template>
  <div>
    <div class="page-head">
      <div v-permission="TOOLING_BUDGET_BMAPPLICATION_ALL" class="page-head-flex" :class="tableIndex === 0 ? 'head-on' : ''" @click="selectHeadTable(0)">
        <div class="line-divL line-div">
          <div class="title">All</div>
          <div class="describe">{{$t('LK_ALLBMAPPLY')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 0" symbol name="iconsuoyouBAshenqingxuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div v-permission="TOOLING_BUDGET_BMAPPLICATION_TOBECONFIRMED" class="page-head-flex" :class="tableIndex === 1 ? 'head-on' : ''" @click="selectHeadTable(1)">
        <div class="line-divL line-div">
          <div class="title">{{tableCount.watiConfirmCount}}</div>
          <div class="describe">{{$t('LK_DAIQUERENBMDAN')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 1" symbol name="icondaiquerenBAshenqingzhuijiajinexuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOINCREASE" class="page-head-flex" :class="tableIndex === 2 ? 'head-on' : ''" @click="selectHeadTable(2)">
        <div class="line-divL line-div">
          <div class="title">{{tableCount.aekoAddCount}}</div>
          <div class="describe">{{$t('LK_AEKOZENGZHIBMDAN')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 2" symbol name="iconAekozengzhiBMdanxuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="iconAekozengzhiBMdanweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOREDUCE" class="page-head-flex" :class="tableIndex === 3 ? 'head-on' : ''" @click="selectHeadTable(3)">
        <div class="line-divL line-div">
          <div class="title">{{tableCount.aekoMinusCount}}</div>
          <div class="describe">{{$t('LK_AEKOJIANZHIBMDAN')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 3" symbol name="iconAekojianzhiBMdanxuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="iconAekojianzhiBMdanweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
    </div>

    <!-- 所有BM申请单 -->
    <template v-if="tableIndex === 0">
      <div v-permission="TOOLING_BUDGET_BMAPPLICATION_ALL">
        <AllBmListBlock @openBMDetail="openBMDetail" :refresh="refresh" />
      </div>
    </template>

    <!-- 待确认BM单 -->
    <template v-if="tableIndex === 1">
      <div v-permission="TOOLING_BUDGET_BMAPPLICATION_TOBECONFIRMED">
        <ToBeConfirmed @updateTable="updateTable" @openBMDetail="openBMDetail" :refresh="refresh" />
      </div>
    </template>

    <!-- Aeko增值金额 -->
    <template v-if="tableIndex === 2">
      <div v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOINCREASE">
        <IncrementBlock @updateTable="updateTable" @openBMDetail="openBMDetail" :refresh="refresh" />
      </div>
    </template>

    <!-- Aeko减值BM单 -->
    <template v-if="tableIndex === 3">
      <div v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOREDUCE">
        <ImpairmentBlock @updateTable="updateTable" @openBMDetail="openBMDetail" :refresh="refresh" />
      </div>
    </template>

    <!-- BM单流水号弹窗 -->
    <BmPopup :visible="bmVisible" @changeLayer="() => this.bmVisible = false" :title="`${$t('LK_BMDANLIUSHUIHAO')}：${bmNumber}`">
      <template slot="btns">
        <iButton :loading="saveLoading" @click="save">{{ $t('LK_BAOCUN') }}</iButton><!-- 保存 -->
        
      </template>

      <template slot="content">
        <div class="popup-form">
          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_BMDANLIUSHUIHAO') }}</span><!-- BM单流水号 -->
              </div>
              <div class="disabled">{{detailObj.bmSerial}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_CHEXINGXIANGMU') }}</span><!-- 车型项目 -->
              </div>
              <iSelect v-if="isCarTypeList" v-model="detailObj.tmCartypeProId" class="input" :placeholder="$t('LK_QINGXUANZE')">
                <el-option
                    :value="item.tmCartypeProId"
                    :label="item.tmCartypeProName"
                    v-for="(item, index) in fromGroup"
                    :key="index"
                ></el-option>
              </iSelect>
              <div v-else class="disabled">{{fromGroupName}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_CAIGOUSHENQINGHAO') }}</span><!-- 采购申请号 -->
              </div>
              <div class="disabled">{{detailObj.bmNum}}</div>
            </div>
            <div class="item">
              <div class="txt required">
                <span>{{ $t('LK_WBSBIANHAO') }}</span><!-- WBS编号 -->
              </div>
              <iInput v-model="detailObj.wbsCode" class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_KEMU') }}</span><!-- 科目 -->
              </div>
              <div class="disabled">{{detailObj.subject}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_CHENGBENZHONGXIN') }}</span><!-- 成本中心 -->
              </div>
              <div class="disabled">{{detailObj.costCenter}}</div>
            </div>
            <div class="item">
              <div class="txt required">
                <span>{{ $t('LK_CHENGBENKONGZHIYU') }}</span><!-- 成本控制域 -->
              </div>
              <iInput type="number" v-model="detailObj.costControlDomain" class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
            <div class="item">
              <div class="txt required">
                <span>{{ $t('LK_ZONGZHANGKEMU') }}</span><!-- 总账科目 -->
              </div>
              <iInput type="number" v-model="detailObj.generalLedger" class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_XUQIUGENZHONGHAO') }}</span><!-- 需求跟踪号 -->
              </div>
              <div class="disabled">{{detailObj.bmInfoNum}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_CAIGOUGONGCHANG') }}</span><!-- 采购工厂 -->
              </div>
              <iSelect v-model="detailObj.productionFactoryId" class="input" :placeholder="$t('LK_QINGXUANZE')">
                <el-option
                    :value="item.productionFactoryId"
                    :label="item.productionFactoryName"
                    v-for="(item, index) in factoryList"
                    :key="index"
                ></el-option>
              </iSelect>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('costanalysismanage.GongYingShang') }}</span><!-- 供应商 -->
              </div>
              <div class="disabled">{{detailObj.designatedSupplierName}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_JIAOHUORIQI') }}</span><!-- 交货日期 -->
              </div>
              <el-date-picker
                v-model="detailObj.deliveryDate"
                type="date"
                class="input"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_KESHI') }}</span><!-- 科室 -->
              </div>
              <iSelect v-model="detailObj.deptId" class="input" :placeholder="$t('LK_QINGXUANZE')">
                <el-option
                    :value="item.deptId"
                    :label="item.deptName"
                    v-for="(item, index) in departmentList"
                    :key="index"
                ></el-option>
              </iSelect>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_REGINOCONTROLLER') }}</span><!-- 区域控制员 -->
              </div>
              <iInput v-model="detailObj.areaControlPerson" class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
            <div class="item">
              <div class="txt required">
                <span>{{ $t('LK_CAIGOUZU') }}</span><!-- 采购组 -->
              </div>
              <iInput v-model="detailObj.procureGroup" class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{$t('LK_SHENQINGREN')}}</span><!-- 申请人 -->
              </div>
              <div class="disabled">{{detailObj.applyPersonName}}</div>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_BUHANSUICHENGBEN') }}</span><!-- 不含税成本 -->
              </div>
              <div class="disabled">{{getTousandNum(NumFormat(detailObj.bmAmount))}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_HANSUICHENGBEN') }}</span><!-- 含税成本 -->
              </div>
              <div class="disabled">{{getTousandNum(NumFormat(detailObj.taxCost))}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_SOPRIQI') }}</span><!-- SOP日期 -->
              </div>
              <div class="disabled">{{detailObj.sopDate}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_QIANSHOURIQI') }}</span><!-- 签收日期 -->
              </div>
              <div class="disabled">{{detailObj.receiveDate}}</div>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_JILIANGDANWEI') }}</span><!-- 计量单位 -->
              </div>
              <div class="disabled">{{detailObj.measuringUnit}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_SHULIANG') }}</span><!-- 数量 -->
              </div>
              <div class="disabled">{{detailObj.count}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>FS/GS</span><!-- FS/GS -->
              </div>
              <div class="disabled">{{detailObj.fsGs}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_TONGJIDINGDAN') }}</span><!-- 统计订单 -->
              </div>
              <iInput v-model="detailObj.orderStatistics" class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_WULIAOZHU') }}</span><!-- 物料组 -->
              </div>
              <div class="disabled">{{detailObj.materialNam}}</div>
            </div>
            <div class="item item-only">
              <div class="txt">
                <span>{{ $t('LK_HUOBI') }}</span><!-- 货币 -->
              </div>
              <div class="disabled">{{detailObj.currencyCode}}</div>
            </div>
            <div class="popup-item">
              <div class="txt">
                <span>{{ $t('LK_DUANWENBEN') }}</span>
              </div>
              <iInput v-model="detailObj.shortText" class="input" :placeholder="`${$t('LK_LIZI')}:${$t('LK_LIZISHUOMING')}`"></iInput>
            </div>
          </div>
        </div>

        <iTableList
          :tableData="aekoTableList"
          :tableTitle="bmPopupTableHead"
          :tableLoading="allTableLoading"
          :selection="false"
        >
          <template #partsFs="scope">
            <div @click="jumpDetails(scope)" class="table-link">{{scope.row.partsFs}}</div>
          </template>
          <template #bmAmount="scope">
            <div>{{getTousandNum(NumFormat(scope.row.bmAmount))}}</div>
          </template>
        </iTableList>
      </template>
    </BmPopup>
  </div>
</template>

<script>
import {
  iTableList
} from '@/components';
import {
  iMessage,
  iButton,
  iCard,
  iPagination,
  iDialog,
  iInput,
  iSelect,
  icon
} from "rise";
// import SearchBlock from "./components/searchBlock";
import { bmPopupTableHead } from "./components/data";
import { bmTableCount, getBmDetailById, getBmPartsList,
  getProductionFactoryPullDown, deptPullDown, bmCarTypePullDown,
  bmDetailUpdate
} from "@/api/ws2/bmApply";
import BmPopup from "./components/popup";
import AllBmListBlock from "./components/allBmListBlock";
import ToBeConfirmed from "./components/toBeConfirmed";
import IncrementBlock from "./components/incrementBlock";
import ImpairmentBlock from "./components/impairmentBlock";
import { getTousandNum, NumFormat } from "@/utils/tool";
import store from '@/store';


export default {
  components: {
    icon, iTableList, ImpairmentBlock,
    iButton, BmPopup, iInput, iSelect,
    AllBmListBlock, ToBeConfirmed, IncrementBlock,
  },
  data(){
    return {
      tableIndex: 0,
      bmPopupTableHead,
      allTableLoading: false,
      aekoTableList: [],  //  aeko增值BM单
      selectTableList: [],
      bmVisible: false,
      factoryList: [],  //  工厂下拉列表
      departmentList: [], //  科室下拉列表
      fromGroup: [],  //  车型项目
      tableCount: {
        aekoAddCount: 0,
        aekoMinusCount: 0,
        watiConfirmCount: 0
      },
      detailObj: {},
      saveLoading: false,
      refresh: false,
      bmNumber: '',
      getTousandNum,
      NumFormat,
      fromGroupName: '',
      isCarTypeList: true,
    }
  },

  created(){
    const key = store.state.permission.whiteBtnList['TOOLING_BUDGET_BMAPPLICATION_SELECT'];  //  车型下拉列表
    this.bmTableCount();  //  获取table数量
    this.isCarTypeList = key ? true : false;
  },

  methods: {

    updateTable(){
      this.bmTableCount();  //  获取table数量
    },

    jumpDetails(scope){
      const query = {
        ...scope.row,
        partNum: scope.row.partsNum,
        // purchasingRequirementId: '279830436628008960',
      }
      console.log('跳转的参数：', query);
      this.$router.push({
        path: "/sourcing/partsprocure/editordetail",
        query: {
          item: JSON.stringify(query),
        },
      });
    },


    //  保存
    save(){
      const { wbsCode, costControlDomain, generalLedger, procureGroup	 } = this.detailObj;
      // console.log('wbsCode, costControlDomain, generalLedger, procureGroup', !wbsCode, costControlDomain, generalLedger, procureGroup)
      if(!wbsCode && !costControlDomain && !generalLedger && !procureGroup){
        return iMessage.warn(this.$t('LK_BMAPPLYBAOCUNMSG'));
      }
      this.saveLoading = true;

      bmDetailUpdate(this.detailObj).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          // this.bmVisible = false;
          this.refresh = !this.refresh;
          iMessage.success(result);
        }else{
          iMessage.error(result);
        }

        this.saveLoading = false;
      }).catch(err => {
        this.saveLoading = false;
      })
    },

    //  打开详情
    openBMDetail(scope){
      this.allTableLoading = true;
      this.bmVisible = true;

      //  BM详情、零件号列表、采购工厂、专业科室、车型项目
      Promise.all([
        getBmDetailById({id: scope.id}), getBmPartsList({id: scope.id}),
        getProductionFactoryPullDown(), deptPullDown(), bmCarTypePullDown()
      ]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn;
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn;
        const result4 = this.$i18n.locale === 'zh' ? res[4].desZh : res[4].desEn;

        if(res[0].data){
          const date = new Date();
          this.detailObj = res[0].data;
          this.bmNumber = scope.bmSerial;

          this.detailObj.deliveryDate === null ? 
            this.detailObj.deliveryDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : 
            this.detailObj.deliveryDate
        }else{
          iMessage.error(result0);
        }

        if(res[1].data){
          this.aekoTableList = res[1].data;
        }else{
          iMessage.error(result1);
        }

        if(res[2].data){
          this.factoryList = res[2].data;
          // this.factoryList = res[2].data.map(item => ({
          //   productionFactoryId: item.productionFactoryId,
          //   productionFactoryName: `${item.productionFactoryId}-${item.productionFactoryName}`
          // }));
        }else{
          iMessage.error(result2);
        }

        if(res[3].data){
          this.departmentList = res[3].data;
        }else{
          iMessage.error(result3);
        }

        if(res[4].data){
          
          this.fromGroup = res[4].data;
          const arr = res[4].data.filter(item => item.tmCartypeProId == res[0].data.tmCartypeProId);
          if(arr.lenght){
            this.fromGroupName = arr[0].tmCartypeProName;
          }
        }else{
          iMessage.error(result4);
        }
        this.allTableLoading = false;
      }).catch(err => {
        this.allTableLoading = false;
      })
    },

    bmTableCount(){
      bmTableCount().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.tableCount = res.data;
        }else{
          iMessage.error(result);
        }
      })
    },

    // //  打开BM单流水号
    // openBMDetail(scope){
    //   this.bmVisible = true;
    // },

    selectHeadTable(type){
      if(this.tableIndex === type){
        return
      }
      this.tableIndex = type;
    },

    handleSelectionChange(val){
      this.selectTableList = val;
    },
  }
}
</script>

<style lang="scss" scoped>
.table-link{
  color: #1663F6;
  text-decoration: underline;
  font-family: Arial;
  cursor: pointer;
}
.popup-form{
  border-bottom: 2px solid #E3E3E3;
  margin-bottom: 20px;

  .popup-formItem{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .popup-item{
      display: flex;
      flex: 2;
      padding-left: 91px;

      .txt{
        width: 116px;
      }
      .input{
        flex: 1 !important;
      }
    }
    
    .lastItem{
      width: 50%;
      display: flex;
      padding-right: 30px;

      .txt{
        flex: 1;
        font-size: 16px;
        color: #4B4B4C;
      }

      .input{
        flex: 6;
      }
    }

    .item-only{
      margin-left: 89px;
    }

    .item{
      display: flex;
      flex: 0 1 auto;
      line-height: 35px;

      .required{

        span::after{
          content: '*';
          color: crimson;
        }
      }

      .txt{
        font-size: 16px;
        color: #4B4B4C;
        width: 116px;
      }

      .disabled{
        width: 250px;
        height: 35px;
        background: #F8F8FA;
        border-radius: 4px;
        text-align: center;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
      }

      .input{
        width: 250px;
        height: 35px;
      }
    }

    & .item:nth-child(1){
      margin-left: 0;
    }
  }
}
.table-txtStyle{
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