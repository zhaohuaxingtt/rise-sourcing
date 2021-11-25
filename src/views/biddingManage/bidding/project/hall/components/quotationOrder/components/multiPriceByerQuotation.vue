<template>
  <div>
    <iCard :title="language('BIDDING_XIANGMUXINXI', '项目信息')" class="card">
      <template slot="header-control">
        <i
          @click="toggle"
          class="el-icon-arrow-up icon margin-left20 cursor"
          :class="{ rotate: hidens }"
        ></i>
      </template>

      <div class="card--body">
        <el-form
          :model="ruleForm"
          label-width="9rem"
          :rules="rules"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
        >
          <div class="form">
            <div class="input-box">
              <div class="form-row">
                <iFormItem
                  :label="language('BIDDING_QISHIZONGJIA', '起始总价')"
                >
                  <iLabel
                    :label="language('BIDDING_QISHIZONGJIA', '起始总价')"
                    slot="label"
                    required
                  ></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input__totalprice"
                      :value="
                        ruleForm.totalPrices
                          ? ruleForm.totalPrices + currencyMultiple
                          : ''
                      "
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <iFormItem :label="language('BIDDING_DAXIE', '大写')">
                  <iLabel
                    :label="language('BIDDING_DAXIE', '大写')"
                    slot="label"
                  ></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="
                        totalPriceFlag
                          ? language('BIDDING_LINGYUANZHENG', '零元整')
                          : numberUppercase
                      "
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem
                  :label="language('BIDDING_QISHINIANYUE', '起始年月')"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel
                    :label="language('BIDDING_QISHINIANYUE', '起始年月')"
                    slot="label"
                  ></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="ruleForm.beginMonth"
                      disabled
                    ></iInput>
                  </div>
                </iFormItem>
                <iFormItem :label="language('BIDDING_CHEXING', '车型')">
                  <iLabel
                    :label="language('BIDDING_CHEXING', '车型')"
                    slot="label"
                  ></iLabel>
                  <div class="form-item-tag">
                    <el-tag :key="tag" v-for="tag in modelsOption">
                      {{ tag.name }}
                    </el-tag>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem
                  :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')"
                >
                  <iLabel
                    :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')"
                    slot="label"
                  ></iLabel>
                  <div class="form-item-tag">
                    <el-tag :key="tag" v-for="tag in modelProjectsOption">
                      {{ tag.name }}
                    </el-tag>
                  </div>
                </iFormItem>
                <iFormItem />
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </iCard>

    <iCard class="card">
      <div class="card--header">
        <div class="card--header--item card--header--item__top">
          <div>{{ language("BIDDING_CHANPINXINXI", "产品信息") }}</div>
          <div class="margin-left40">
            {{ language("BIDDING_PLGXCCJ", "批量更新出厂价") }}
          </div>
          <div class="margin-left10">
            <iInput
              style="width: 7.2rem"
              :value="factoryPricePercent"
              @blur="handleFactoryPricePercentBlur"
              @input="handleFactoryPricePercentInput"
              disabled
            >
              <template slot="suffix">%</template>
            </iInput>
          </div>
        </div>
      </div>
      <div class="card--body">
        <tableColumnTemplate
          ref="tableDataForm"
          :tableData="this.ruleForm.biddingProducts"
          :tableTitle="multiPleTableTitle"
          :selection="false"
          :type="'0'"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- 操作 -->
          <template slot="caozuo" slot-scope="scope">
            <span>
              <a
                href="javascript:void(0)"
                class="open-link-text"
                @click="handleClickOne(scope)"
              >
                <i class="el-icon-edit"> </i>
              </a>
            </span>
          </template>
        </tableColumnTemplate>
      </div>
    </iCard>
    <iCard class="card yearsPlan" :title="language('BIDDING_NIANJIANGJIHUA','年降计划')">
      <tableColumnTemplate
        ref="yearsPlan"
        :tableData="yearsPlan"
        :tableTitle="stageColumn"
        :selection="false"
        :type="'4'"
        :tableLoading="false"
      >
      </tableColumnTemplate>
    </iCard>
    <iCard class="card" :title="language('BIDDING_NIANCHANLIANG','年产量')">
      <tableColumnTemplate
        ref="annualOutput"
        :tableData="annualOutput"
        :tableTitle="outPutColumn"
        :selection="false"
        :type="'5'"
        :tableLoading="false"
      >
      </tableColumnTemplate>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, iFormItem, iLabel } from "rise";
import tableColumnTemplate from "./tableColumnTemplate.vue";
import {
  multiPleTableTitle,
  baseRules,
  currencyMultipleLib,
  yearsPlanTableColumn,
  planBaseData,
  planBaseYear,
  stageColumn,
  outPutColumn,
} from "./data";
import { pageMixins } from "@/utils/pageMixins";
import { digitUppercase } from "@/utils/digitUppercase";
import {
  getModels,
  getProjects,
  getCurrencyUnit,
  getUnits,
  getDiscount,
} from "@/api/mock/mock";
import { findHallQuotation } from "@/api/bidding/bidding";
import Big from "big.js";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iInput,
    iFormItem,
    iLabel,
    tableColumnTemplate,
  },
  props: {
    id: String,
    initData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      hidens: false,
      factoryPricePercentFlag: true,
      totalPriceFlag: false,
      tableLoading: false,
      rules: baseRules,
      ruleForm: {
        beginMonth: "",
        modelProjects: [],
        models: [],
        biddingProducts: [],
        totalPrices: 0,
      },
      factoryPricePercent: "",
      multiPleTableTitle,
      yearsPlanTableColumn,
      quantityUnit: [],
      selectedTableData: [],
      modelsOption: [],
      modelProjectsOption: [],
      currencyUnit: {},
      yearsPlanTable: [],
      purchasePlanTable: [],
      stageColumn,
      outPutColumn,
      yearsPlan: [],
      annualOutput: [
        {
          title: "折现率",
          stage1: 1,
          stage2: 0.9,
          stage3: 0.81,
          stage4: 0.73,
          stage5: 0.66,
          stage6: 0.59,
          stage7: 0.53,
          stage8: 0.48,
          stage9: 0.43,
          stage10: 0.39,
          stage11: 0.35,
          stage12: 0.31,
          stage13: 0.28,
          stage14: 0.25,
          stage15: 0.23,
        },
      ],
    };
  },
  mounted() {
    let o = {...planBaseData,title:'折现率'};
    getDiscount({}).then((res) => {
      if(res?.data != null){
        res?.data?.md_discount_rate.map(item=>{
          let x = Number(item.code.replace('Y','0'));
          this.$set(o,`stage${x}`,item.describe)
        })
      }
      this.annualOutput[0] = { ...o };
      this.updateRuleForm(this.initData);
    });
    
    // getModels().then((res) => {
    //   this.modelsOption = res?.data;
    // });
    // getProjects().then((res) => {
    //   this.modelProjectsOption = res?.data;
    // });
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
    getUnits({}).then((res) => {
      this.quantityUnit = res.data;
    });
  },
  computed: {
    unit() {
      return this.currencyUnit[this.ruleForm.currencyUnit];
    },
    beishu() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.beishu || 1;
    },
    currencyMultiple() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.unit || "元";
    },
    numberUppercase() {
      return digitUppercase(
        Big(this.ruleForm.totalPrices || 0)
          .times(this.beishu)
          .toNumber()
      );
    },
    biddingProducts() {
      return this.ruleForm.biddingProducts;
    },
  },
  methods: {
    //限制批量更新出厂价（%）：输入框，1~10000
    handleFactoryPricePercentInput(val) {
      let reg = /^([1-9]|[1-9]\d{0,3}|10000)$/;
      if (val && !reg.test(val)) {
        return;
      }
      this.factoryPricePercent = val;
      this.factoryPricePercentFlag = true;
    },
    //批量更新出厂价鼠标移出数据清空
    handleFactoryPricePercentBlur() {
      this.ruleForm.biddingProducts.forEach((e) => {
        const tmp = this.factoryPricePercent || 100;
        if (!isNaN(Number(tmp))) {
          e.factoryPrice = Big(e.factoryPrice || 0)
            .times(Number(tmp) === 0 ? 1 : tmp / 100)
            .toNumber();
        }
      });
      this.factoryPricePercent = "";
      this.factoryPricePercentFlag = false;
    },
    toggle() {
      this.hidens = !this.hidens;
      this.$emit("toggle", this.hidens);
    },
    //产品操作事件
    handleClickOne(scope) {
      this.$nextTick(() => {
        var tr = document.querySelectorAll(
          ".yearsPlan .el-table__body-wrapper tr"
        )[scope.row.index * 2+1];
        document.querySelector(".routerpage").scrollTop =
          tr.getBoundingClientRect().top +
          document.querySelector(".routerpage").scrollTop -
          document.querySelector(".routerpage").getBoundingClientRect().top;
      });
    },
    updateRuleForm(data) {
      this.ruleForm = {
        ...data,
      };
      getModels().then((res) => {
        data.models.forEach((item) => {
          this.modelsOption.push(
            ...res?.data?.filter((e) => e.code === item.modelCode)
          );

          let obj = {};
          this.modelsOption = this.modelsOption.reduce(function (item, next) {
            obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
            return item;
          }, []);
        });
      });

      getProjects().then((res) => {
        data.modelProjects.forEach((item) => {
          this.modelProjectsOption.push(
            ...res?.data?.filter((e) => e.code === item.projectCode)
          );

          let obj = {};
          this.modelProjectsOption = this.modelProjectsOption.reduce(function (
            item,
            next
          ) {
            obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
            return item;
          },
          []);
        });
      });
      this.ruleForm.biddingProducts.forEach((items) => {
        //this.ruleForm.procurePlans 年降计划
        let o = {};
        if (items.procurePlans?.length) {
          o = items.procurePlans.reduce((obj, item) => {
            if (!obj[item.productId]) {
              obj[item.productId] = {
                yearMonth: { title: "" },
                cutPricePlan: { title: "" },
              };
            }
            obj[item.productId].yearMonth[`stage${item.stage}`] =
              item.procureYearMonth;
            obj[item.productId].yearMonth[`id${item.stage}`] = item.id;
            obj[item.productId].cutPricePlan[`stage${item.stage}`] =
              item.cutPricePlan ? item.cutPricePlan + "%" : item.cutPricePlan;
            obj[item.productId].cutPricePlan[`id${item.stage}`] = item.id;
            return obj;
          }, {});
        }
        this.yearsPlan.push({
          ...planBaseYear,
          ...o[items.id]?.yearMonth,
          title: items.fsnrGsnr,
        });
        this.yearsPlan.push({
          ...planBaseYear,
          ...o[items.id]?.cutPricePlan,
          title: items.productCode,
        });
        //this.ruleForm.productions 年产量
        let output = {};
        if (items.productions?.length) {
          output = items.productions.reduce((obj, item) => {
            if (!obj[item.productId]) {
              obj[item.productId] = {
                procureYearMonth: { title: "" },
                procureNum: { title: "" },
              };
            }
            obj[item.productId].procureYearMonth[`stage${item.stage}`] =
              item.procureYearMonth;
            obj[item.productId].procureYearMonth[`id${item.stage}`] = item.id;
            obj[item.productId].procureNum[`stage${item.stage}`] =
              item.procureNum;
            obj[item.productId].procureNum[`id${item.stage}`] = item.id;
            return obj;
          }, {});
        }
        this.annualOutput.push({
          ...planBaseData,
          ...output[items.id]?.procureYearMonth,
          title: items.fsnrGsnr,
        });
        this.annualOutput.push({
          ...planBaseData,
          ...output[items.id]?.procureNum,
          title: items.productCode,
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  margin-bottom: 30px;
  .card--header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .card--header--item {
      font-size: 18px;
      font-weight: bold;
    }

    .card--header--item__top {
      display: flex;
      align-items: center;
      ::v-deep .el-input__suffix {
        position: absolute;
        height: 100%;
        right: 0.3125rem;
        top: 0.4rem;
        font-size: 16px;
        text-align: center;
        color: #aaaaaa;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        pointer-events: none;
      }
    }
  }
  .card--body {
    .form {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .input-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .form-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          .el-form-item {
            width: 100%;
            .el-form-item__content {
              width: 100%;
              .form-item-tag ::v-deep {
                height: auto;
                box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
                border-color: transparent;
                border-radius: 0.25rem;
                .el-tag {
                  background-color: #f5f7fa;
                  color: #000;
                  border-radius: 18px;
                  border-color: #fff;
                  margin-left: 3px;
                  min-width: 15px;
                }
              }
              .form--item--number {
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                .form--item--number--lable {
                  min-width: 4rem;
                  margin-left: 4%;
                  text-align: right;
                }
                .form--item--number--input ::v-deep .el-input__inner {
                  background-color: #f5f7fa;
                  text-align: center;
                }
                .form--item--number--input__center ::v-deep .el-input__inner {
                  text-align: center;
                }
                .form--item--number--input__totalprice
                  ::v-deep
                  .el-input__inner {
                  text-align: center;
                  color: #1660f1;
                  box-shadow: 0 0 0.1875rem rgb(22 96 241 / 55%);
                  border-color: #1660f1;
                }
              }
            }
          }
          .el-form-item + .el-form-item {
            margin-left: 120px;
          }
        }
      }
    }
    ::v-deep .el-table {
      .cell {
        padding-left: 3px;
        padding-right: 3px;
        .el-form-item {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .el-table__header {
        background-color: rgb(216 229 253);
      }
      tr:nth-child(even) {
        background-color: #eff5fd;
      }
    }
  }
}
.rotate {
  transform: rotate(180deg);
  color: #d3d3db;
}
.hiden {
  display: none !important;
}
::v-deep .control {
  display: flex;
  align-items: center;
  .icon {
    color: #d3d3db;
  }
}
</style>
