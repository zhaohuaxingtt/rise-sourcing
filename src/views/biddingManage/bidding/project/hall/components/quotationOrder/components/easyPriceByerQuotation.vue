<template>
  <div>
    <iCard :title="$t('项目信息')" class="card">
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
                <iFormItem label="起始总价">
                  <iLabel :label="$t('起始总价')" slot="label"></iLabel>
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
                <iFormItem label="大写">
                  <iLabel :label="$t('大写')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="numberUppercase"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem
                  label="起始年月"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel :label="$t('起始年月')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="ruleForm.beginMonth"
                      disabled
                    ></iInput>
                  </div>
                </iFormItem>
                <iFormItem label="车型">
                  <iLabel :label="$t('车型')" slot="label"></iLabel>
                  <div class="form-item-tag">
                    <el-tag :key="tag" v-for="tag in modelsOption">
                      {{ tag.name }}
                    </el-tag>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem label="车型项目">
                  <iLabel :label="$t('车型项目')" slot="label"></iLabel>
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
          <div>{{ $t("产品信息") }}</div>
        </div>
      </div>
      <div class="card--body">
        <tableColumnTemplate
          ref="tableDataForm"
          :tableData="this.ruleForm.biddingProducts"
          :tableTitle="unitTableTitle"
          :selection="false"
          :type="'0'"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- 起拍价格 -->
          <template slot="upsetPrice" slot-scope="scope">
            <div>
              {{ ruleForm.biddingMode === "01" ? scope.row["upsetPrice"] : "" }}
            </div>
          </template>
          <!-- 目标价 -->
          <template slot="targetPrice" slot-scope="scope">
            <div>
              {{
                ruleForm.biddingMode === "01"
                  ? scope.row["targetPrice"]
                    ? scope.row["targetPrice"]
                    : "" + currencyMultiple
                  : ""
              }}
            </div>
          </template>
        </tableColumnTemplate>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, iFormItem, iLabel } from "rise";
import tableColumnTemplate from "./tableColumnTemplate.vue";
import { baseRules, currencyMultipleLib, unitTableTitle } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import { digitUppercase } from "@/utils/digitUppercase";
import {
  getModels,
  getProjects,
  getCurrencyUnit,
  getUnits,
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
    isSupplier: { type: Boolean, default: false },
  },
  data() {
    return {
      hidens: false,
      tableLoading: false,
      rules: baseRules,
      ruleForm: {
        beginMonth: "",
        modelProjects: [],
        models: [],
        biddingProducts: [],
        totalPrices: 0,
      },
      unitTableTitle,
      currencyMultipleLib,
      quantityUnit: [],
      selectedTableData: [],
      modelsOption: [],
      modelProjectsOption: [],
      currencyUnit: {},
    };
  },
  mounted() {
    this.updateRuleForm(this.initData);
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
    totalStartingPriceString() {
      if (this.ruleForm.totalPrices == null) {
        return 0 + this.currencyMultiple;
      }
      return this.ruleForm.totalPrices + this.currencyMultiple;
    },
    biddingProducts() {
      return this.ruleForm.biddingProducts;
    },
  },
  watch: {},
  methods: {
    toggle() {
      this.hidens = !this.hidens;
      this.$emit("toggle", this.hidens);
    },
    dividedBeiShu(val){
     return Big(val).div(this.beishu).toNumber()
    },
    updateRuleForm(data) {
      this.ruleForm = {
        ...data,
      };
      console.log(235,this.ruleForm)
      // const supplierOffer = {
      //   ...this.ruleForm?.supplierOffer,
      //   offerPrice: this.dividedBeiShu(this.ruleForm?.supplierOffer?.offerPrice)
      // }
      const totalPrices = this.dividedBeiShu(this.ruleForm.totalPrices)
      this.ruleForm = {... this.ruleForm,totalPrices}
      console.log(241,this.ruleForm)

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
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val;
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
