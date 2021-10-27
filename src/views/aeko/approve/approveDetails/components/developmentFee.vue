<!--
 * @Author: YoHo
 * @Date: 2021-10-09 16:02:48
 * @LastEditTime: 2021-10-27 14:03:28
 * @LastEditors: Please set LastEditors
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
import { developmentCostTableTitle as tableTitle,developmentCostInfos } from "rise/web/quotationdetail/components/mouldAndDevelopmentCost/components/data.js"
import { getCbdkent } from "@/api/aeko/approve";
import { cloneDeep } from "lodash"
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
    workFlowId:{
      type:String,
      default:''
    },
    quotationId:{
      type:String,
      default:'',
    }
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
      this.getCbdkent();
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
            this.tableListData = Array.isArray(res.data.cbdKentList) ? res.data.cbdKentList : [];
            this.$set(this.dataGroup, "rfqDevFeeTotal", res.data.shareTotal)
            this.$set(this.dataGroup, "shareDevFee", res.data.shareAmount)
            this.$set(this.dataGroup, "shareQuantity", res.data.shareQuantity)
            this.$set(this.dataGroup, "unitPrice", res.data.totalPrice)
          }
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

      }).catch(()=>this.loading = false)
    },
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