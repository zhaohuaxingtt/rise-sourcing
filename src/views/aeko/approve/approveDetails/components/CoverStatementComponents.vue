<template>
  <div>
    <i-card>
      <span class="card-title">封面表态 - {{ auditCoverStatus }}
        <span v-if="show">
          <span class="info">(备注:请先保存表态单据，审批单数据方可预览)</span>
        </span>
      </span>
      <i-form-group row='1' class="margin-top10">
        <!--第一行-->
        <el-row :gutter='20'>
          <el-col :span='6'>
            <i-form-item label="是否Top:">
              <i-text>{{ auditCover.isTopDesc }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="是否相关:">
              <i-text>{{ auditCover.isReferenceDesc }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="更改零件名称:">
              <i-text>{{ auditCover.partName }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="主要供应商:">
              <i-text>{{ auditCover.mainSupplier }}</i-text>
            </i-form-item>
          </el-col>
        </el-row>
        <!--第二行-->
        <el-row :gutter='20'>
          <el-col :span='6'>
            <i-form-item label="新首批送样周期(周数):">
              <i-text>{{ auditCover.sendCycle }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="影响进度:">
              <i-text>{{ auditCover.isEffectproDesc }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="指定前期采购:">
              <i-text>{{ auditCover.fsName }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="封面状态:">
              <i-text>{{ coverStatusDesc }}</i-text>
            </i-form-item>
          </el-col>
        </el-row>
        <!--第三行行-->
        <el-row :gutter='20'>
          <div class="margin-left10">备注:</div>
          <i-input class="margin-top10 margin-left10 text-disabled" type="textarea" v-model="auditCover.remark" :rows="8" disabled>
          </i-input>
        </el-row>
      </i-form-group>

      <el-table :data="costsWithCarType" border class="margin-top30 total" :summary-method="getSummaries" show-summary
                :row-class-name="rowClassName">
        <el-table-column
            type="index"
            label="#"
            align="center">
        </el-table-column>
        <el-table-column
            prop="cartypeNameZh"
            align="center"
            label="车型项目/车型"
        >
        </el-table-column>
        <el-table-column
            align="center"
            prop="materialIncrease"
            label="增加材料成本(RMB/车)"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.materialIncrease|numberToCurrencyNo2 }}</span>
            <el-tooltip effect="light" popper-class="custom-card-tooltip"
                        placement="top">
              <div slot="content" v-html="queryRowMaterialIncreaseTipContent(scope.row)"></div>
              <div class="oneLine">{{ queryRowMaterialIncreaseTipContent(scope.row) }}</div>
              <i class="el-icon-warning-outline bule"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="investmentIncrease"
            label="增加投资费用(不含税)"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.investmentIncrease | numFilter }}</span>
            <el-tooltip effect="light" popper-class="custom-card-tooltip"
                        placement="top">
              <div slot="content" v-html="queryRowInvestmentIncreaseTipContent(scope.row)"></div>
              <div class="oneLine">{{ queryRowInvestmentIncreaseTipContent(scope.row) }}</div>
              <i class="el-icon-warning-outline bule"></i>
            </el-tooltip>
          </template>

        </el-table-column>
        <el-table-column
            prop="otherCost"
            align="center"
            label="其它费用(不含税)"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.otherCost | numFilter }}</span>
            <el-tooltip effect="light" popper-class="custom-card-tooltip"
                        placement="top">
              <div slot="content" v-html="queryRowotherCostTipContent(scope.row)"></div>
              <div class="oneLine">{{ queryRowotherCostTipContent(scope.row) }}</div>
              <i class="el-icon-warning-outline bule"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <div class="margin-top30 card-bottom-tip">Top-Aeko / Top-MP：|ΔGesamt Materialkosten| ≥35 RMB oder
        Invest≥10,000,000 RMB; Top-AeA: ΔGesamt Materialkosten ≥35 RMB oder Invest≥10,000,000 RMB
      </div>

    </i-card>

  </div>
</template>

<script>
import {iInput, iCard, iFormItem, iFormGroup, iText} from "rise"
import {fixNumber, numberToCurrencyNo, numberToCurrencyNo2} from "../../../../../utils/cutOutNum";

export default {
  name: "CoverStatementComponents",
  components: {
    iCard,
    iFormItem,
    iText,
    iInput,
    iFormGroup,
  },
  filters: {
    numFilter(value) {
      if (value == null || value == '') return ''
      return numberToCurrencyNo(value)
    },
    numberToCurrencyNo2(value) {
      if (value == null || value == '') return ''
      return numberToCurrencyNo2(value)

    }
  },
  computed: {
    coverStatusDesc: function () {
      if ((this.auditCover.coverStatusDesc == null || this.auditCover.coverStatusDesc == undefined)
          && this.auditCover.coverStatus == 'APPROVED') {
        return '已审批'
      }
      return this.auditCover.coverStatusDesc
    }
  },
  props: {
    auditCoverStatus: {type: String, default: () => ''},
    auditCover: {type: Object, default: () => ({})}
  },
  watch: {
    auditCover(val) {
      this.costsWithCarType = this.auditCover?.costsWithCarType
      if(!Object.keys(val).length){
        this.show = true
      }else{
        this.show = false
      }
    }
  },
  data() {
    return {
      costsWithCarType: [],
      show: false
    }
  },

  methods: {
    //查询增加投资费
    queryRowInvestmentIncreaseTipContent(row) {
      let costsWithLinie = row.costsWithLinie
      if (costsWithLinie != null && costsWithLinie.length > 0) {
        let strTip = ''
        costsWithLinie.forEach(item => {
          strTip += `${item.linieDeptNum}-${item.linieName}:${item.currencyUnit} ${numberToCurrencyNo(item.investmentIncrease)} \n`
        })
        return strTip.split("\n").join("<br/>")

      }
      return ''
    },
    //增加材料成本
    queryRowMaterialIncreaseTipContent(row) {
      let costsWithLinie = row.costsWithLinie
      if (costsWithLinie != null && costsWithLinie.length > 0) {
        let strTip = ''
        costsWithLinie.forEach(item => {
          strTip += `${item.linieDeptNum}-${item.linieName}:${item.currencyUnit} ${numberToCurrencyNo2(item.materialIncrease)} \n`
        })
        return strTip.split("\n").join("<br/>")
      }
      return ''
    },
    //其他费用
    queryRowotherCostTipContent(row) {
      let costsWithLinie = row.costsWithLinie
      if (costsWithLinie != null && costsWithLinie.length > 0) {
        let strTip = ''
        costsWithLinie.forEach(item => {
          strTip += `${item.linieDeptNum}-${item.linieName}:${item.currencyUnit} ${numberToCurrencyNo(item.otherCost)} \n`
        })
        return strTip.split("\n").join("<br/>")
      }
      return ''
    },
    rowClassName({row, rowIndex}) {
      if (rowIndex == this.costsWithCarType.length - 1) {
        return 'lastCelStyle'
      }
      return ''
    },
    // total 不用前端计算 后端计算后返回
    getSummaries(param){
        const { columns, data } = param;
        const { auditCover } = this;
        const total = this.language('LK_AEKO_TOTAL','TOTAL');
        const sums = [];
        columns.forEach((column, index) => {
            if (index === 1) {
                sums[index] = total;
                return;
            }

            const keyArr = ['investmentIncrease', 'materialIncrease', 'otherCost'];
            if(keyArr.includes(column.property)){
                if(column.property == 'investmentIncrease') sums[index] = this.fixNumber(auditCover.investmentIncreaseTotal,0) || '';
                else if(column.property == 'materialIncrease') sums[index] = this.fixNumber(auditCover.materialIncreaseTotal)  || '';
                else if(column.property == 'otherCost') sums[index] = this.fixNumber(auditCover.otherCostTotal,0)  || '';
                else sums[index] = ''
            }else{
                sums[index] = '';
            }
        })
        return sums;
    },
    // 费用千分位处理
    fixNumber(str,precision=2){
        if(!str) return null;
        var re=/(?=(?!(\b))(\d{3})+$)/g;
        var fixstr = (str || 0).toString().split(".");
        fixstr[0] =  fixstr[0].replace(re,",");
        if(precision == 0){ // 若小数点后两位是 .00 去除小数点后两位
            if( fixstr[1] && fixstr[1] == '00') return fixstr[0];
        }
        
        return fixstr.join('.');
    },
    // getSummaries(param) {
    //   const {columns, data} = param;
    //   const sums = [];
    //   columns.forEach((column, index) => {
    //     if (index == 0) {
    //       sums[index] = '';
    //       return;
    //     }
    //     if (index === 1) {
    //       sums[index] = 'TOTAL';
    //       return;
    //     }
    //     const values = data.map(item => Number(item[column.property]));
    //     if (column.property == 'materialIncrease') {
    //       let maxNum6 = Math.max(...values);
    //       sums[index] = numberToCurrencyNo2(maxNum6)
    //       return;
    //     }
    //     if (!values.every(value => isNaN(value))) {
    //       let mValue = values.reduce((prev, curr) => {
    //         const value = Number(curr);
    //         console.log(value,'valuevalue')
    //         console.log(prev + curr,'prev + curr')
    //         if (!isNaN(value)) {
    //           return prev + curr;
    //         } else {
    //           return prev;
    //         }
    //       }, 0);
    //       sums[index] = numberToCurrencyNo(mValue)
    //     }

    //   });
    //   return sums;
    // }
  }
}
</script>

<style scoped lang="scss">
.card-title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
  .info{
    font-size: 14px;
    margin-left: 20px;
    color: #E30D0D;
  }
}
::v-deep .el-textarea{
  &.text-disabled.is-disabled .el-textarea__inner{
    color: #505050;
  }
}
.total{
  ::v-deep .el-table__footer-wrapper{
    font-weight: bolder;
  }
}
.lastCelStyle {
  font-size: 14px;
  font-family: Arial;
  font-weight: bold;
  color: black;
}

.card-bottom-tip {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #8C96A7;
}
</style>