<!--
 * @Author: YoHo
 * @Date: 2021-10-09 16:02:48
 * @LastEditTime: 2021-11-15 14:53:43
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <!-- 开发费 -->
  <div class="developmentCost" v-loading="loading">
    <iCard>
      <template #header>
        <div class="header">
          <div>
            <span class="title">{{language('LK_KAIFAFEIYONG','开发费用')}}</span>
            <span class="tip margin-left10">({{ language('LK_DANWEI','单位') }}：{{ language('LK_YUAN','元') }})</span>
          </div>
        </div>
      </template>
      <div>
        <tableList
          class="table" 
          index
          :selection="false"
          :tableData="tableListData"
          :tableTitle="tableTitle"
        >
        <template #isShared="scope">
          <span>{{ scope.row.isShared | statesFilter }}</span>
        </template>
        </tableList>
        <iFormGroup class="subCost margin-top30" :row="4" inline>
          <iFormItem class="item" v-for="(info, $index) in subDevelopmentCostInfos" :key="$index" :label="info.languageKey ? language(info.languageKey,info.languageName) : $t(info.key)">
            <iText>{{ dataGroup[info.props] }}</iText>
          </iFormItem>
        </iFormGroup>
      </div>
    </iCard>
  </div>
</template>

<script>
import {
  iCard,
  iMessage,
  iFormGroup,
  iFormItem,
  iText,
} from 'rise';
import tableList from 'rise/web/quotationdetail/components/tableList';
import { developmentCostTableTitle as tableTitle,developmentCostInfos,statesFilter } from "rise/web/quotationdetail/components/mouldAndDevelopmentCost/components/data.js"
import { getCbdkent } from "@/api/aeko/approve";
import { getDevFeeByLinie } from "@/api/rfqManageMent/quotationdetail"
import { cloneDeep } from "lodash"
import { developmentCostList, formatTableData, floatFixNum } from "../data.js";
export default {
  name:'developmentCost',
  components:{
    iCard,
    tableList,
    iFormGroup,
    iFormItem,
    iText,
  },
  props:{
    basicInfo:{
      type:Object,
      default:()=>{},
    },
    workFlowId:{
      type:String,
      default:''
    },
    quotationId:{
      type:String,
      default:'',
    }
  },
  filters: {
    statesFilter
  },
  data(){
    return{
      loading:false,
      tableListData:[],
      tableTitle:tableTitle,
      dataGroup: {},
      subDevelopmentCostInfos: cloneDeep(developmentCostInfos).slice(1, developmentCostInfos.length),
    }
  },
  methods:{
    init(){
      this.workFlowId?this.getCbdkent():this.getCbdkentByLinie();
    },
    // 获取开发费列表数据
    async getCbdkent(){
      const {workFlowId,quotationId} = this;
      this.loading = true;
      await getCbdkent({
        workFlowId,
        quotationId,
      }).then((res)=>{
        this.loading = false
        if(res.code == 200){
          if(res.code == 200){
            let tableListData = Array.isArray(res.data.cbdKentList) ? res.data.cbdKentList : [];
            this.tableListData = formatTableData(tableListData, developmentCostList)
            this.$set(this.dataGroup, "devFee", floatFixNum(res.data.totalPrice)) // 开发费合计
            this.$set(this.dataGroup, "shareDevFee", floatFixNum(res.data.shareTotal)) // 分摊开发费用
            this.$set(this.dataGroup, "shareQuantity", floatFixNum(res.data.shareQuantity)) // 分摊数量
            this.$set(this.dataGroup, "unitPrice", floatFixNum(res.data.shareAmount)) // 单件开发成本
          }
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

      }).catch(()=>this.loading = false)
    },
    getCbdkentByLinie(){
      this.loading = true
      getDevFeeByLinie({
        rfqId: this.basicInfo.rfqId,
        quotationId: this.basicInfo.quotationId,
        cbdLevel: this.basicInfo.currentCbdLevel || this.basicInfo.cbdLevel
      }, this.basicInfo.supplierId)
      .then(res => {
        if (res.code == 200) {
          console.log(res);
          let tableListData = Array.isArray(res.data.devFeeInfoList) ? res.data.devFeeInfoList : []
          this.tableListData = formatTableData(tableListData, developmentCostList)
          this.$set(this.dataGroup, "devFee", floatFixNum(res.data.devFee))
          this.$set(this.dataGroup, "rfqDevFeeTotal", floatFixNum(res.data.rfqDevFeeTotal))
          this.$set(this.dataGroup, "shareDevFee", floatFixNum(res.data.shareDevFee))
          this.$set(this.dataGroup, "shareQuantity", floatFixNum(res.data.shareQuantity))
          this.$set(this.dataGroup, "unitPrice", floatFixNum(res.data.unitPrice))
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    }
  },
}
</script>


<style lang="scss" scoped>
.developmentCost {
  ::v-deep .cardHeader {
    display: block;

		.title {
			font-size: 18px;
			color: #131523;
			font-weight: bold;
		}
	}

  .header {
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

    .tip {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #86878E;
    }

    .control {
      display: inline-block;
    }
  }

  .total {
    display: inline-block;
    width: 368px;
    vertical-align: middle;

    ::v-deep .el-form-item__label {
      width: 170px;
    }

    .item {
      margin-bottom: 0;
    }
  }

  .subCost {
    ::v-deep .el-form-item {
      margin-bottom: 0;

      .el-form-item__label {
        width: 140px;
        font-size: 16px;
      }
    }
  }
}
</style>