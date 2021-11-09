<template>
  <div>
    <!-- 项目信息 -->
    <div style="padding-top: 2rem">
      <!-- <el-form
          :model="ruleForm"
          label-width="17%"
          :rules="rules"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
        >
          <div class="form">
            <div class="input-box">
              <div class="form-row">
                <iFormItem
                  label="总价"
                  v-if="
                    ruleForm.biddingMode === '01'
                  "
                >
                  <iLabel :label="language('总价', '总价')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      v-model="startingPrice"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <iFormItem label="起始总价" prop="totalPrices" v-else>
                  <iLabel
                    :label="language('起始总价', '起始总价')"
                    slot="label"
                    required
                  ></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input__center"
                      :value="setTotalPrices"
                      @input="handleInputChange"
                      @blur="handleInputBlur"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <iFormItem label="大写">
                  <iLabel :label="language('大写', '大写')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      v-if="
                        ruleForm.biddingMode === '01' 
                      "
                      class="form--item--number--input"
                      v-model="numberUppercase"
                      disabled
                    ></iInput>
                    <iInput
                      v-else
                      class="form--item--number--input"
                      v-model="totalNumberUppercaseString"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row">
                <iFormItem
                  label="起始年月"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel :label="language('起始年月', '起始年月')" slot="label"></iLabel>
                  <iDatePicker
                    style="width: 100%"
                    :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
                    value-format="yyyy-MM-dd"
                    type="month"
                    v-model="ruleForm.beginMonth"
                    disabled
                  />
                </iFormItem>
                <iFormItem label="车型" class="mutiple-form">
                  <iLabel :label="language('车型', '车型')" slot="label"></iLabel>
                  <iSelect
                    v-model="ruleForm.models"
                    multiple
                    filterable
                    :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
                    disabled
                  >
                    <el-option
                      v-for="item in modelsOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code"
                    >
                    </el-option>
                  </iSelect>
                </iFormItem>
              </div>
              <div class="form-row">
                <iFormItem label="车型项目" class="mutiple-form">
                  <iLabel
                    :label="language('车型项目', '车型项目')"
                    slot="label"
                    required
                  ></iLabel>
                  <iSelect
                    v-model="ruleForm.modelProjects"
                    multiple
                    filterable
                    :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
                    disabled
                  >
                    <el-option
                      v-for="item in modelProjectsOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code"
                    >
                    </el-option>
                  </iSelect>
                </iFormItem>
                <iFormItem />
              </div>
            </div>
          </div>
        </el-form> -->

      <component :is="priceComponent" :initData="ruleForm" :id="id"></component>
    </div>

    <!-- 产品信息 -->
    <iCard class="card" :title="language('BIDDING_CHANPINXINXI', '产品信息')">
      <div class="card--body">
        <commonTable
          ref="tableDataForm"
          :tableData="ruleForm.products"
          :tableTitle="
            ruleForm.biddingMode === '03'
              ? multiPleTableTitle
              : ruleForm.biddingMode === '02'
              ? totalTableTitle
              : unitTableTitle
          "
          :tableLoading="tableLoading"
          :selection="false"
        >
          <!-- 起拍价格 -->
          <template slot="upsetPrice" slot-scope="scope">
            <div v-if="ruleForm.biddingMode === '01'">
              {{ scope.row["upsetPrice"] }}
            </div>
            <div v-else>-</div>
          </template>
          <!-- 目标价 -->
          <template slot="targetPrice" slot-scope="scope">
            <div
              v-if="
                ruleForm.biddingMode === '01' || ruleForm.biddingMode === '03'
              "
            >
              {{ scope.row["targetPrice"] }}
            </div>
            <div v-else>-</div>
          </template>
        </commonTable>
      </div>
    </iCard>

    <!-- 年降计划&折现率 -->
    <iCard
      class="card"
      :title="language('BIDDING_NJJHZXL', '年降计划&折现率')"
      v-if="ruleForm.biddingMode === '03'"
    >
      <div class="card--body">
        <commonTable
          ref="tableDataForm"
          :tableData="yearsPlans"
          :tableTitle="yearsTableTitle"
          :tableLoading="tableLoading"
          :selection="false"
        >
        </commonTable>
      </div>
    </iCard>

    <!-- 采购计划 -->
    <iCard
      class="card"
      :title="language('BIDDING_NJJJMX', '年降计划明细')"
      v-if="ruleForm.biddingMode === '03'"
    >
      <div class="card--body">
        <commonTable
          ref="tableDataForm"
          :tableData="procurePlans"
          :tableTitle="yearsTableTitle"
          :tableLoading="tableLoading"
          :selection="false"
        >
        </commonTable>
      </div>
    </iCard>

    <!-- 报价规则 -->

    <quotation />
  </div>
</template>

<script>
import { iCard, iInput, iFormItem, iLabel, iSelect, iDatePicker } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import {
  unitTableTitle,
  totalTableTitle,
  multiPleTableTitle,
  yearsTableTitle,
  baseRules,
  currencyMultipleLib,
} from "./data";
import { pageMixins } from "@/utils/pageMixins";
import { digitUppercase } from "@/utils/digitUppercase";
import { getModels, getProjects, getCurrencyUnit } from "@/api/mock/mock";
import {
  // getCurrencyUnit,
  getRfqInfo,
  saveUnitPrice,
  findMultiPrice,
} from "@/api/bidding/bidding";
import Big from "big.js";
import quotation from "./quotation";
import easyPrice from "./easyPrice";
import multiPrice from "./multiPrice";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iInput,
    iFormItem,
    iLabel,
    iSelect,
    iDatePicker,
    commonTable,

    easyPrice,
    multiPrice,

    quotation,
  },
  //   props: {
  //     id: String,
  //     initData: {
  //       type: Object,
  //       default: () => ({}),
  //     },
  //   },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    yearsPlans: {
      type: Array,
    },
    procurePlans: {
      type: Array,
    },
  },
  data() {
    return {
      id: 0,
      flag: false,
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
      yearsTableTitle,

      selectedTableData: [],
      totalTableTitle,
      multiPleTableTitle,
      isApprovalOption: [
        {
          model: this.language('demoData1', 'demoData1'),
          id: 1,
        },
        {
          model: this.language('demoData2', 'demoData2'),
          id: 2,
        },
        {
          model: this.language('demoData3', 'demoData3'),
          id: 3,
        },
      ],
      modelsOption: [],
      modelProjectsOption: [],
      totalStartingPrice: 0,
      currencyUnit: {},
      rfqinfoProduct: [],
      rfqinfoProductCopy: [],
      timeout: "",

      // yearsPlans: [],
      // procurePlans: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        console.log("ruleForm---------->projectInfo", val);
        this.ruleForm = val;
      },
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
  },
  mounted() {
    this.updateRuleForm(this.ruleForm);
    // this.handleSearchReset();
    getModels().then((res) => {
      this.modelsOption = res?.data.filter((item) => item.name?.length > 0);
    });
    getProjects().then((res) => {
      this.modelProjectsOption = res?.data.filter(
        (item) => item.name?.length > 0
      );
    });
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });

    getRfqInfo({ rfqCode: this.ruleForm.rfqCode }).then((res) => {
      this.rfqinfoProduct = res.products;
      // this.rfqinfoProductCopy = res.products;
    });
  },
  computed: {
    priceComponent() {
      // if(this.ruleForm.biddingMode) {
      //   return 'easyPrice';
      // }
      // TODO 多价格merge后开启判断
      if (this.ruleForm.biddingMode) {
        return this.ruleForm.biddingMode === "03" ? "multiPrice" : "easyPrice";
      }
      return "";
    },

    unit() {
      return this.currencyUnit[this.ruleForm.currencyUnit];
    },
    beishu() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.beishu || 1;
    },
    currencyMultiple() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.unit || "元";
    },
    orgTotalPrices() {
      let biddingProducts = this.ruleForm.biddingProducts;
      return biddingProducts?.reduce(
        (sum, item) =>
          isNaN(Number(item.purchaseQty)) || isNaN(Number(item.upsetPrice))
            ? sum
            : Big(item.purchaseQty || 0)
                .times(item.upsetPrice || 0)
                .add(sum)
                .toNumber(),
        0
      );
    },
    totalPrices() {
      return this.orgTotalPrices
        ? Big(Big(parseInt(this.orgTotalPrices))?.toFixed(2))
            .div(this.beishu)
            .toNumber()
        : "";
    },
    numberUppercase() {
      return this.totalPrices && this.beishu
        ? digitUppercase(Big(this.totalPrices).times(this.beishu).toNumber())
        : 0;
    },
    totalNumberUppercaseString() {
      return digitUppercase(this.ruleForm.totalPrices);
    },
    startingPrice() {
      return this.totalPrices + this.currencyMultiple;
    },
    setTotalPrices() {
      let { totalPrices } = this.ruleForm;
      return totalPrices + this.currencyMultiple;
    },
  },
  methods: {
    handleSearchReset() {
      let param = { id: this.id };
      this.query(param);
    },
    handleAddProduct() {
      this.ruleForm.biddingProducts?.push({
        biddingId: this.id,
        fsnrGsnr: "",
        productName: "",
        productCode: "",
        purchaseQty: "",
        quantityUnit: "",
        upsetPrice: "",
        targetPrice: "",
        historyTalksPrice: "",
        productParm: "",
      });
      this.page.total = this.ruleForm.biddingProducts?.length;
      this.page.currPage = Math.ceil(this.page.total / this.page.pageSize);
    },
    updateRuleForm(data) {
      this.ruleForm = {
        ...data,
        models: data.models
          ?.filter((item) => item.modelCode)
          .map((item) => item.modelCode),
        modelProjects: data.modelProjects
          ?.filter((item) => item.projectCode)
          .map((item) => item.projectCode),
      };
      if (!this.ruleForm.biddingProducts?.length) {
        this.handleAddProduct();
      } else {
        this.page.total = this.ruleForm.biddingProducts?.length;
      }
    },
    handleInputChange(val) {
      let reg = /^\d*$|^\d*\.\d*$/g;
      if (!reg.test(val)) {
        return;
      }
      this.ruleForm.totalPrices = val;
    },
    async query(e) {
      const res = await findMultiPrice(e);
      this.$emit("change-title", res);
      const cutPricePlan = { title: this.language('BIDDING_JIANGJIAJIHUA',"降价计划") };
      const discountRate = { title: this.language('BIDDING_ZHEXIANLV',"折现率") };
      // 年降计划&折现率
      res.yearsPlans?.forEach((item) => {
        cutPricePlan[`stage${item.stage}`] = item.cutPricePlan + "%";
        discountRate[`stage${item.stage}`] = item.discountRate;
      });
      this.yearsPlans = [cutPricePlan, discountRate];
      // 采购计划
      let o = res.procurePlans?.reduce((obj, item) => {
        if (!obj[item.productId]) {
          obj[item.productId] = {
            yearMonth: { title: "" },
            cutPricePlan: { title: "" },
          };
        }
        obj[item.productId].yearMonth[`stage${item.stage}`] =
          item.procureYearMonth.substring(0, 4) +
          "-" +
          item.procureYearMonth.substring(4, 7);
        obj[item.productId].cutPricePlan[`stage${item.stage}`] =
          item.cutPricePlan + "%";
        return obj;
      }, {});
      this.ruleForm.products?.forEach((item) => {
        this.procurePlans.push({
          ...o[item.id].yearMonth,
          title: item.fsnrGsnr,
        });
        this.procurePlans.push({
          ...o[item.id].cutPricePlan,
          title: item.productCode,
        });
      });
    },
    submitForm(formName, tableDataForm, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitTableForm(tableDataForm, callback);
        } else {
          this.$message.success(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
          return;
        }
      });
    },
    submitTableForm(tableDataForm, callback) {
      this.$refs[tableDataForm].$children[0].validate((valid) => {
        if (valid) {
          let modelList = [];
          this.ruleForm.models?.forEach((item) => {
            this.modelsOption?.forEach((option) => {
              if (option.modelCode === item) {
                modelList.push({
                  biddingId: this.id,
                  model: option.modelName,
                  modelCode: option.modelCode,
                });
              }
            });
          });
          let modelProjectList = [];
          this.ruleForm.modelProjects?.forEach((item) => {
            this.modelProjectsOption?.forEach((option) => {
              if (option.projectCode === item) {
                modelProjectList.push({
                  biddingId: this.id,
                  project: option.projectName,
                  projectCode: option.projectCode,
                });
              }
            });
          });
          let formData = { ...this.ruleForm };
          //起始总价
          if (
            this.ruleForm.biddingMode === "01" ||
            this.ruleForm.biddingMode === "03"
          ) {
            //单价
            formData.totalPrices = this.totalPrices;
          } else {
            //总价
            formData.totalPrices = Big(this.ruleForm.totalPrices || 0)
              .div(this.beishu)
              .toNumber();
          }
          formData.models = modelList;
          formData.modelProjects = modelProjectList;
          //保存
          saveUnitPrice(formData)
            .then((res) => {
              this.$message.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
              callback && callback();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.success(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
          return;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  margin-top: 2rem;
  margin-bottom: 30px;

  .card--header {
    display: flex;
    justify-content: space-between;
    .card--header--item {
      font-size: 18px;
      font-weight: bold;
    }
    .card--header--item--btn {
      ::v-deep .el-button--default {
        min-width: 150px;
      }
    }
  }
  .card--body {
    margin-top: 20px;
  }
}

.item ::v-deep {
  display: flex;
  margin-right: -6rem;
  flex-wrap: wrap;
  .el-form-item {
    display: flex;
    width: 28%;
    margin-right: 5rem;
    position: relative;
    .el-form-item__label {
      width: 16.4rem;
    }
    .el-form-item__content {
      width: 100%;
      .el-input {
        margin-left: 1rem;
      }
    }
    /* 禁用样式 */
    .el-input.is-disabled .el-input__inner {
      background-color: #f4f5f6;
      color: #000;
      text-align: center;
    }
    .form-item-row1-clo3-right {
      line-height: initial;
      text-align: left;
    }
    /* 目标价图标 */
    .form-item-targetPrice-icon {
      position: absolute;
      left: -6.5rem;
      top: 3px;
    }
    /* 供应商图标 */
    .form-item-resultOpenForm-icon {
      position: absolute;
      left: -1.4rem;
    }
  }
}

::v-deep .mutiple-form {
  .el-input.is-disabled .el-input__inner {
    background-color: transparent;
  }
}

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
        .el-form-item__label {
          min-width: 17%;
        }
        .el-form-item__content {
          width: 100%;
          .el-select ::v-deep {
            height: auto;
            .el-select__tags {
              .el-tag {
                background-color: #f7f7f7;
                color: #000;
                border-radius: 20px;
                .el-tag__close {
                  color: #000000;
                  background-color: transparent;
                  font-size: large;
                  font-weight: bold;
                }
              }
            }
          }
          .form--item--number {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            .form--item--number--lable {
              min-width: 8%;
              margin-left: 4%;
            }
            .form--item--number--input ::v-deep .el-input__inner {
              background-color: #f7f7f7;
              text-align: center;
            }
            .form--item--number--input__center ::v-deep .el-input__inner {
              text-align: center;
            }
          }
        }
      }
      .el-form-item + .el-form-item {
        margin-left: 80px;
      }
    }
  }
}
::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
