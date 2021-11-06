<template>
  <div>
    <iCard :title="$t('项目信息')" class="card">
      <template slot="header-control">
        <div>
          <iButton
            :disabled="biddingStatus"
            :class="{ yingbiao: biddingStatus, unyingbiao: !biddingStatus }"
            @click="handleNext"
            >{{ $t("出价") }}</iButton
          >
        </div>
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
                  <iLabel
                    :label="$t('起始总价')"
                    slot="label"
                    required
                  ></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input__totalprice"
                      :data-value="orgTotalPrices"
                      :value="
                        biddingStatus
                          ? ruleForm.totalPrices
                          : totalPriceFlag
                          ? '0' + currencyMultiple
                          : startingPrice
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
                      :value="
                        biddingStatus
                          ? numberUppercase
                          : totalPriceFlag
                          ? '零元整'
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
          <div class="margin-left40">批量更新出厂价</div>
          <div class="margin-left10">
            <iInput
              style="width: 7.2rem"
              :value="factoryPricePercent"
              @blur="handleFactoryPricePercentBlur"
              @input="handleFactoryPricePercentInput"
              :disabled="biddingStatus"
            >
              <template slot="suffix">%</template>
            </iInput>
          </div>
        </div>
      </div>
      <div class="card--body">
        <tableColumnTemplate
          ref="tableDataForm"
          :tableData="ruleForm.supplierProducts"
          :tableTitle="multiPleTableTitle"
          :selection="false"
          :type="'0'"
          :tableLoading="tableLoading"
          :inputProps="biddingStatus ? [] : inputProps"
          :priceProps="priceProps"
          @handleSelectionChange="handleSelectionChange"
        >
          <template slot="moldFee" slot-scope="scope">
            <template v-if="ruleForm.moldFee === '01'">
              <div>{{ scope.row["moldFee"] }}</div>
            </template>
            <template v-else>
              <i-input
                v-if="!biddingStatus"
                oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
                v-model="scope.row['moldFee']"
              />
              <div v-else>{{ scope.row["moldFee"] }}</div>
            </template>
          </template>

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
    <iCard class="card">
      <div class="card--header">
        <div class="card--header--item card--header--item__top">
          <div>{{ $t("年降计划 & 折现率") }}</div>
        </div>
      </div>
      <div class="card--body">
        <tableColumnTemplate
          ref="yearsPlanTableForm"
          :tableData="yearsPlanTable"
          :tableTitle="yearsPlanTableColumn"
          :selection="false"
          :inputProps="biddingStatus ? [] : yearsPlanTableInputProps"
          :type="'1'"
          :tableLoading="tableLoading"
        >
        </tableColumnTemplate>
      </div>
    </iCard>

    <iCard class="card">
      <div class="card--header">
        <div class="card--header--item card--header--item__top">
          <div>{{ $t("年降计划明细") }}</div>
        </div>
      </div>
      <div id="purchasePlanTableForm" class="card--body">
        <tableColumnTemplate
          ref="purchasePlanTableForm"
          :tableData="purchasePlanTable"
          :tableTitle="yearsPlanTableColumn"
          :selection="false"
          :type="biddingStatus ? '3' : '2'"
          :isSupplier="isSupplier"
          :tableLoading="tableLoading"
          :inputProps="yearsPlanTableInputProps"
          @handleInputNum="handleInputNum"
          @handleInputDate="handleInputDate"
        >
        </tableColumnTemplate>
      </div>
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
} from "./data";
import { pageMixins } from "@/utils/pageMixins";
import { digitUppercase } from "@/utils/digitUppercase";
import {
  getModels,
  getProjects,
  getCurrencyUnit,
  getUnits,
} from "@/api/mock/mock";
import { findHallQuotation, saveBiddingQuotation } from "@/api/bidding/bidding";
import Big from "big.js";
import dayjs from "dayjs";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
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
    supplierCode: String,
    isSupplier: { type: Boolean, default: false },
    biddingQuoteRule: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // factoryPricePercentFlag: true,
      hidens: false,
      totalPriceFlag: false,
      tableLoading: false,
      rules: baseRules,
      ruleForm: {
        beginMonth: "",
        modelProjects: [],
        models: [],
        biddingProducts: [],
        supplierProducts: [],
        totalPrices: 0,
      },
      factoryPricePercent: "",
      multiPleTableTitle,
      yearsPlanTableColumn,
      priceProps: [
        "factoryPrice",
        "packingFee",
        "packingFee2",
        "transportFee",
        "operationFee",
        "moldFee",
        "developFee",
        "targetPrice",
      ],
      inputProps: [
        "factoryPrice",
        "packingFee",
        "packingFee2",
        "transportFee",
        "operationFee",
        "developFee",
      ],
      yearsPlanTableInputProps: [
        "stage1",
        "stage2",
        "stage3",
        "stage4",
        "stage5",
        "stage6",
        "stage7",
        "stage8",
        "stage9",
        "stage10",
        "stage11",
        "stage12",
        "stage13",
        "stage14",
        "stage15",
      ],
      quantityUnit: [],
      selectedTableData: [],
      modelsOption: [],
      modelProjectsOption: [],
      currencyUnit: {},
      yearsPlanTable: [],
      purchasePlanTable: [],
      prefactoryPrice: 0,
      planyearChange: false,
    };
  },
  watch: {
    "initData.biddingStatus"(val, oldVal) {
      if (val !== oldVal) {
        this.handleSearchReset();
      }
    },
    //监听年度降价计划 更新采购计划的降级计划
    yearsPlanTable: {
      handler(val, oldVal) {
        if (this.planyearChange) {
          let yearsPlan = val[0];
          if (this.purchasePlanTable?.length > 0) {
            this.purchasePlanTable.forEach((e, index) => {
              if (index % 3 === 1) {
                let purchase = this.purchasePlanTable[index];
                purchase.stage1 = yearsPlan.stage1;
                purchase.stage2 = yearsPlan.stage2;
                purchase.stage3 = yearsPlan.stage3;
                purchase.stage4 = yearsPlan.stage4;
                purchase.stage5 = yearsPlan.stage5;
                purchase.stage6 = yearsPlan.stage6;
                purchase.stage7 = yearsPlan.stage7;
                purchase.stage8 = yearsPlan.stage8;
                purchase.stage9 = yearsPlan.stage9;
                purchase.stage10 = yearsPlan.stage10;
                purchase.stage11 = yearsPlan.stage11;
                purchase.stage12 = yearsPlan.stage12;
                purchase.stage13 = yearsPlan.stage13;
                purchase.stage14 = yearsPlan.stage14;
                purchase.stage15 = yearsPlan.stage15;
              }
            });
          }
        }
      },
      deep: true,
    },
    //监听产品  计算B价 ==出厂价+包装费+运输费+操作费
    supplierProducts: {
      handler(val, oldVal) {
        if (val?.length > 0)
          val.forEach((item) => {
            item.bprice =
              isNaN(Number(item.factoryPrice)) ||
              isNaN(Number(item.packingFee)) ||
              isNaN(Number(item.packingFee2)) ||
              isNaN(Number(item.transportFee)) ||
              isNaN(Number(item.operationFee))
                ? item.bprice
                : Big(Number(item.factoryPrice) || 0)
                    .add(Number(item.packingFee) || 0)
                    .add(Number(item.packingFee2) || 0)
                    .add(Number(item.transportFee) || 0)
                    .add(Number(item.operationFee) || 0)
                    .toFixed(2);
          });
      },
      deep: true, //true 深度监听
    },
  },
  mounted() {
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
    getUnits({}).then((res) => {
      this.quantityUnit = res.data;
    });
    this.handleSearchReset();
  },
  computed: {
    biddingStatus() {
      if (
        (this.ruleForm.biddingStatus === "04" ||
          this.ruleForm.biddingStatus === "05") &&
        this.ruleForm.isSupplierOffer &&
        this.ruleForm.supplierKickOutStatus === "01"
      ) {
        return false;
      }
      return true;
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
      let total = 0;
      this.ruleForm.supplierProducts.forEach((item, index) => {
        if (
          isNaN(Number(item.factoryPrice)) ||
          isNaN(Number(item.packingFee)) ||
          isNaN(Number(item.packingFee2)) ||
          isNaN(Number(item.transportFee)) ||
          isNaN(Number(item.operationFee)) ||
          isNaN(Number(item.moldFee)) ||
          isNaN(Number(item.developFee))
        ) {
          return 0;
        }
        item.upsetPrice = this.calculationDetails(item, index);
        total = Big(this.calculationDetails(item, index)).add(total).toNumber();
      });
      return total;
      // return supplierProducts.reduce((sum, item, index) => {
      //   return isNaN(Number(item.factoryPrice)) ||
      //     isNaN(Number(item.packingFee)) ||
      //     isNaN(Number(item.packingFee2)) ||
      //     isNaN(Number(item.transportFee)) ||
      //     isNaN(Number(item.operationFee)) ||
      //     isNaN(Number(item.moldFee)) ||
      //     isNaN(Number(item.developFee))
      //     ? sum
      //     : Big(this.calculationDetails(item, index)).add(sum).toNumber();
      // }, 0);
    },
    totalPrices() {
      return Big(this.orgTotalPrices).toFixed(2);
    },
    numberUppercase() {
      if (this.biddingStatus) {
        return digitUppercase(Number(this.ruleForm.totalPrices));
      }
      return digitUppercase(Number(this.totalPrices));
    },
    startingPrice() {
      return this.totalPrices + this.currencyMultiple;
    },
    supplierProducts() {
      return this.ruleForm.supplierProducts;
    },
  },
  methods: {
    toggle() {
      this.hidens = !this.hidens;
      this.$emit("toggle", this.hidens);
    },
    //采购数量input事件
    handleInputNum(val, scope) {
      let stage = scope.column.property;
      const purchasePlanDateItem = this.purchasePlanTable[scope.$index - 2];
      let dateYear = new Date(purchasePlanDateItem[stage]).getFullYear();
      for (let i = 1; i < 16; i++) {
        if (purchasePlanDateItem[`stage${i}`].includes(dateYear)) {
          scope.row[`stage${i}`] = val;
        }
      }
    },
    //采购计划日期 input事件
    handleInputDate(val, scope) {
      let stage = scope.column.property;
      let dateYear = new Date(val).getFullYear();
      const purchaseQtyItem = this.purchasePlanTable[scope.$index + 2];
      for (let i = 1; i < 16; i++) {
        if (scope.row[`stage${i}`].includes(dateYear)) {
          purchaseQtyItem[stage] = purchaseQtyItem[`stage${i}`];
        }
      }
    },
    //产品操作事件
    handleClickOne(scope) {
      this.$nextTick(() => {
        var tr = document.querySelectorAll(
          "#purchasePlanTableForm .el-table__body-wrapper tr"
        )[scope.row.index * 3];
        document.querySelector(".routerpage").scrollTop =
          tr.getBoundingClientRect().top +
          document.querySelector(".routerpage").scrollTop -
          document.querySelector(".routerpage").getBoundingClientRect().top;
      });
    },
    calculationDetails(item, index) {
      this.$nextTick(() => {
        this.$refs["tableDataForm"].$children[0].validate((valid) => {
          if (valid) {
            this.$refs["yearsPlanTableForm"].$children[0].validate((valid) => {
              if (valid) {
                this.$refs["purchasePlanTableForm"].$children[0].validate(
                  (valid) => {
                    if (valid) {
                      this.totalPriceFlag = false;
                    } else {
                      this.totalPriceFlag = true;
                    }
                  }
                );
              } else {
                this.totalPriceFlag = true;
              }
            });
          } else {
            this.totalPriceFlag = true;
          }
        });
      });
      if (!this.yearsPlanTable?.length || !this.purchasePlanTable?.length) {
        return 0;
      }
      const yearPlan = this.yearsPlanTable[1];
      const purchasePlanDateItem = this.purchasePlanTable[index * 3];
      const purchaseDownPlanItem = this.purchasePlanTable[index * 3 + 1];
      const purchaseQtyItem = this.purchasePlanTable[index * 3 + 2];
      this.prefactoryPrice = item.factoryPrice;
      let totalPrice = 0;
      for (let i = 1; i < 16; i++) {
        if (i === 1) {
          totalPrice = Big(totalPrice)
            .add(
              this.formula({
                beforeAndAfterMonth: [0, 0],
                factoryPrice: item.factoryPrice,
                beforeCalcuationNum: 0,
                calcuationNum: purchaseQtyItem[`stage${i}`],
                yearPlan: purchaseDownPlanItem[`stage${i}`],
                discount: yearPlan[`stage${i}`],
                packingFee: item.packingFee,
                packingFee2: item.packingFee2,
                transportFee: item.transportFee,
                operationFee: item.operationFee,
                lastYearPlan: 0,
                lastDiscount: 1,
              })
            )
            .toNumber();
        } else {
          let beforeAndAfterMonth = this.monthBetwen(
            i,
            purchasePlanDateItem[`stage${i - 1}`],
            purchasePlanDateItem[`stage${i}`]
          );
          if (!beforeAndAfterMonth?.length) {
            return 0;
          }
          let countI =
            dayjs(purchasePlanDateItem[`stage${i - 1}`]).year() -
            dayjs(purchasePlanDateItem.stage1).year() +
            1;
          let countJ =
            dayjs(purchasePlanDateItem[`stage${i}`]).year() -
            dayjs(purchasePlanDateItem.stage1).year() +
            1;
          totalPrice = Big(totalPrice)
            .add(
              this.formula({
                beforeAndAfterMonth: beforeAndAfterMonth,
                factoryPrice: this.prefactoryPrice,
                beforeCalcuationNum: purchaseQtyItem[`stage${i - 1}`],
                calcuationNum: purchaseQtyItem[`stage${i}`],
                yearPlan: purchaseDownPlanItem[`stage${i}`],
                discount: yearPlan[`stage${countJ}`],
                packingFee: item.packingFee,
                packingFee2: item.packingFee2,
                transportFee: item.transportFee,
                operationFee: item.operationFee,
                lastYearPlan: purchaseDownPlanItem[`stage${i - 1}`],
                lastDiscount: yearPlan[`stage${countI}`],
              })
            )
            .toNumber();
        }
        this.factoryPrice(
          this.prefactoryPrice,
          purchaseDownPlanItem[`stage${i}`],
          purchaseQtyItem[`stage${1}`]
        );
      }
      return Big(totalPrice)
        .add(item.moldFee || 0)
        .add(item.developFee || 0)
        .toNumber();
    },
    //计算本年出厂价
    factoryPrice(price, yearPlan, purchaseQty) {
      this.prefactoryPrice =
        isNaN(Number(price)) ||
        isNaN(Number(yearPlan)) ||
        isNaN(Number(purchaseQty)) ||
        purchaseQty === ""
          ? 0
          : Big(price || 0)
              .times(
                Big(1)
                  .minus(yearPlan / 100)
                  .toNumber()
              )
              .toNumber();
    },
    //计算阶段的beforeMonth  和  afterMonth
    monthBetwen(i, purchasePlanDateBefore, purchasePlanDateNow) {
      if (
        purchasePlanDateBefore === null ||
        purchasePlanDateBefore === "" ||
        purchasePlanDateNow === null ||
        purchasePlanDateNow === ""
      ) {
        return [0, 0];
      }
      purchasePlanDateBefore = new Date(purchasePlanDateBefore);
      let beforeYear = purchasePlanDateBefore.getFullYear();
      let beforeMonth = purchasePlanDateBefore.getMonth() + 1;
      purchasePlanDateNow = new Date(purchasePlanDateNow);
      let nowYear = purchasePlanDateNow.getFullYear();
      let nowMonth = purchasePlanDateNow.getMonth() + 1;
      //年份一致
      if (beforeYear === nowYear) {
        if (i === 15) {
          return [nowMonth - beforeMonth, 13 - nowMonth];
        }
        return [nowMonth - beforeMonth, 0];
      } else {
        if (i === 15) {
          return [13 - beforeMonth, 12];
        }
        return [13 - beforeMonth, nowMonth - 1];
      }
    },
    //总价计算公式
    //月份，出厂价，采购量，降价计划,折现率，前段包装费，后段包装费
    formula({
      beforeAndAfterMonth,
      factoryPrice,
      beforeCalcuationNum,
      calcuationNum,
      yearPlan,
      discount,
      packingFee,
      packingFee2,
      //运输费,操作费，上年降价计划，上年折现率
      transportFee,
      operationFee,
      lastYearPlan,
      lastDiscount,
    }) {
      if (
        isNaN(Number(calcuationNum)) ||
        isNaN(Number(yearPlan)) ||
        isNaN(Number(lastYearPlan))
      ) {
        return 0;
      }
      //1-本段降价计划
      const nowPlanYear = Big(1)
        .minus(Number(yearPlan) / 100)
        .toNumber();
      //1-上一段降价计划
      const lastPlanYear = Big(1)
        .minus(Number(lastYearPlan) / 100)
        .toNumber();
      //年采购量/12 * beforeMonth
      const beforeMonth = Big(Number(beforeCalcuationNum) || 0)
        .div(12)
        .times(beforeAndAfterMonth[0])
        .toNumber();
      //年采购量/12 * afterMonth
      const afterMonth = Big(Number(calcuationNum) || 0)
        .div(12)
        .times(beforeAndAfterMonth[1])
        .toNumber();
      const brforeFactoryPrice =
        lastPlanYear === 1
          ? factoryPrice
          : Big(factoryPrice)
              .div(
                Big(1)
                  .minus(Number(lastYearPlan) / 100)
                  .toNumber()
              )
              .toNumber();
      return Big(
        Big(brforeFactoryPrice || 0)
          .times(lastPlanYear)
          .add(packingFee || 0)
          .add(packingFee2 || 0)
          .add(transportFee || 0)
          .add(operationFee || 0)
          .toNumber()
      )
        .times(beforeMonth)
        .times(lastDiscount)
        .add(
          Big(
            Big(factoryPrice || 0)
              .times(nowPlanYear)
              .add(packingFee || 0)
              .add(packingFee2 || 0)
              .add(transportFee || 0)
              .add(operationFee || 0)
              .toNumber()
          )
            .times(afterMonth)
            .times(discount)
            .toNumber()
        )
        .toNumber();
    },

    //限制批量更新出厂价（%）：输入框，1~10000
    handleFactoryPricePercentInput(val) {
      let reg = /^([1-9]|[1-9]\d{0,3}|10000)$/;
      if (val && !reg.test(val)) {
        return;
      }
      this.factoryPricePercent = val;
    },
    //批量更新出厂价鼠标移出数据清空
    handleFactoryPricePercentBlur() {
      this.ruleForm.supplierProducts.forEach((e) => {
        const tmp = this.factoryPricePercent || 100;
        if (!isNaN(Number(tmp))) {
          e.factoryPrice = Big(e.factoryPrice || 0)
            .times(Number(tmp) === 0 ? 1 : tmp / 100)
            .toNumber();
        }
      });
      this.factoryPricePercent = "";
    },

    //下一步
    handleNext() {
      // 拍买
      if (this.ruleForm.biddingType === "01") {
        if (
          Number(this.totalPrices) < Number(this.biddingQuoteRule.actualValue)
        ) {
          this.$confirm("本次报价小于规则设定的警戒值，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.submitForm(
                "ruleForm",
                "tableDataForm",
                "purchasePlanTableForm",
                () => {
                  this.$emit("getRank");
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.submitForm(
            "ruleForm",
            "tableDataForm",
            "purchasePlanTableForm",
            () => {
              this.$emit("getRank");
            }
          );
        }
      } else {
        if (
          Number(this.totalPrices) > Number(this.biddingQuoteRule.actualValue)
        ) {
          console.log("object");
          this.$confirm("本次报价大于规则设定的警戒值，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.submitForm(
                "ruleForm",
                "tableDataForm",
                "purchasePlanTableForm",
                () => {
                  this.$emit("getRank");
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.submitForm(
            "ruleForm",
            "tableDataForm",
            "purchasePlanTableForm",
            () => {
              this.$emit("getRank");
            }
          );
        }
      }
      // this.submitForm(
      //   "ruleForm",
      //   "tableDataForm",
      //   "purchasePlanTableForm",
      //   () => {
      //     this.$emit("getRank");
      //   }
      // );
    },
    submitForm(formName, tableDataForm, purchasePlanTableForm, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitTableForm(tableDataForm, purchasePlanTableForm, callback);
        } else {
          this.$message.error("项目信息数据有误！");
          return;
        }
      });
    },
    submitTableForm(tableDataForm, purchasePlanTableForm, callback) {
      this.$refs[tableDataForm].$children[0].validate((valid) => {
        if (valid) {
          this.submitPurchasePlanTableForm(purchasePlanTableForm, callback);
        } else {
          this.$message.error("产品信息数据有误！");
          return;
        }
      });
    },
    submitPurchasePlanTableForm(purchasePlanTableForm, callback) {
      this.$refs[purchasePlanTableForm].$children[0].validate((valid) => {
        if (valid) {
          this.handleSaveData(callback);
        } else {
          this.$message.error("采购计划数据有误！");
          return;
        }
      });
    },
    //数据验证通过提交数据
    handleSaveData(callback) {
      let formData = { ...this.ruleForm };
      //采购计划
      this.ruleForm.supplierProducts.forEach((item, index) => {
        item.supplierPlans = [];
        for (let i = 1; i < 16; i++) {
          let obj = {
            stage: i,
            productId: item.id,
            partNumber: this.purchasePlanTable[index * 3 + 1].title,
            procureYearMonth: this.purchasePlanTable[index * 3][`stage${i}`],
            cutPricePlan: this.purchasePlanTable[index * 3 + 1][`stage${i}`],
            procureNum: this.purchasePlanTable[index * 3 + 2][`stage${i}`],
            id: this.purchasePlanTable[index * 3 + 2][`id${i}`],
          };
          item.supplierPlans.push(obj);
        }
      });
      let supplierOffer = {
        biddingId: this.id,
        clientTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        offerPrice: this.totalPrices,
        supplierCode: this.supplierCode,
      };
      //起始总价
      formData.totalPrices = this.totalPrices;
      formData.supplierOffer = supplierOffer;
      //保存
      saveBiddingQuotation(formData)
        .then((res) => {
          this.$message.success("出价成功");
          callback && callback();
        })
        .catch((err) => {
          console.log(err);
          this.yearsPlanTable = [];
          this.purchasePlanTable = [];
          this.handleSearchReset();
        });
    },
    handleAddYearPlan() {
      let obj = {
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
      };
      this.yearsPlanTable.splice(1, 0, obj);
    },
    handleSearchReset() {
      let param = { biddingId: this.id, supplierCode: this.supplierCode };
      this.query(param);
    },
    async query(e) {
      // 根据 ID 获取竞价大厅报价单列表数据
      const res = await findHallQuotation(e);
      this.updateRuleForm(res);
    },
    updateRuleForm(data) {
      this.ruleForm = {
        ...data,
        totalPrices: data.supplierOffer?.offerPrice || data.totalPrices,
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
      this.handleAddYearPlan();
      let obj = { title: "降价计划" };
      if (this.ruleForm.yearsPlans?.length) {
        this.ruleForm.yearsPlans.forEach((item) => {
          obj[`stage${item.stage}`] = this.biddingStatus
            ? item.cutPricePlan 
            : item.cutPricePlan;
          obj[`id${item.stage}`] = item.id;
        });
      } else {
        obj = {
          ...obj,
          stage1: "",
          stage2: "",
          stage3: "",
          stage4: "",
          stage5: "",
          stage6: "",
          stage7: "",
          stage8: "",
          stage9: "",
          stage10: "",
          stage11: "",
          stage12: "",
          stage13: "",
          stage14: "",
          stage15: "",
        };
      }
      this.yearsPlanTable.splice(0, 0, obj);

      if (!this.ruleForm.supplierProducts?.length) {
        this.ruleForm.supplierProducts = data.biddingProducts;
      }
      this.ruleForm.supplierProducts?.forEach((items) => {
        if (items.procurePlans !== undefined) {
          items.supplierPlans = items.procurePlans;
        }
        let o = items.supplierPlans?.reduce((obj, item) => {
          if (item.supplierProdId === undefined) {
            item.supplierProdId = item.productId;
          }
          if (!obj[item.supplierProdId]) {
            obj[item.supplierProdId] = {
              yearMonth: { title: "" },
              cutPricePlan: { title: "" },
              procureNum: { title: "" },
            };
          }
          obj[item.supplierProdId].yearMonth[`stage${item.stage}`] =
            item.procureYearMonth;
          if (data.supplierProducts?.length) {
            obj[item.supplierProdId].yearMonth[`id${item.stage}`] = item.id;
          }
          console.log(889, this.biddingStatus);
          obj[item.supplierProdId].cutPricePlan[`stage${item.stage}`] = this
            .biddingStatus
            ? item.cutPricePlan 
            : item.cutPricePlan;
          if (data.supplierProducts?.length) {
            obj[item.supplierProdId].cutPricePlan[`id${item.stage}`] = item.id;
          }
          obj[item.supplierProdId].procureNum[`stage${item.stage}`] =
            item.procureNum;
          if (data.supplierProducts?.length) {
            obj[item.supplierProdId].procureNum[`id${item.stage}`] = item.id;
          }
          return obj;
        }, {});
        if (o[items.id] !== undefined) {
          this.purchasePlanTable.push({
            ...o[items.id].yearMonth,
            title: items.fsnrGsnr,
          });
          this.purchasePlanTable.push({
            ...o[items.id].cutPricePlan,
            title: items.productCode,
          });
          this.purchasePlanTable.push({ ...o[items.id].procureNum, title: "" });
        }
        if (!data.supplierProducts?.length) {
          items.id = "";
        }
      });
      this.$nextTick(() => {
        this.planyearChange = true;
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
  // .card--body {
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
              .form--item--number--input__totalprice ::v-deep .el-input__inner {
                color: #1660f1;
                background-color: #ffffff;
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
  // }
}
.rotate {
  transform: rotate(180deg);
  color: #d3d3db;
}
.hiden {
  display: none !important;
}
::v-deep .control {
  display: flex !important;
  align-items: center;
  .icon {
    color: #d3d3db;
  }
}

.yingbiao {
  background-color: #f4f5f6;
}
.unyingbiao {
  background-color: #1660f1;
  color: #fff;
}
</style>
