/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div>
    <iCard class="card" :title="$t('项目信息')" collapse>
      <div>
        <el-form
          :model="ruleForm"
          label-width="9rem"
          :rules="rules"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
          :disabled="
            ruleForm.biddingStatus === '08' ||
            ruleForm.biddingStatus === '02' ||
            ruleForm.biddingStatus === '03'
          "
        >
          <div class="form">
            <div class="input-box">
              <div class="form-row">
                <iFormItem
                  label="起始年月"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel
                    :label="$t('起始年月')"
                    slot="label"
                    required
                  ></iLabel>
                  <iDatePicker
                    style="width: 50%"
                    :placeholder="$t('LK_QINGXUANZE')"
                    value-format="yyyy-MM"
                    type="month"
                    v-model="ruleForm.beginMonth"
                    disabled
                  />
                </iFormItem>
                <iFormItem
                  label="车型"
                  :prop="ruleForm.roundType !== '03' ? 'models' : ''"
                  class="mutiple-form"
                >
                  <iLabel :label="$t('车型')" slot="label" required></iLabel>
                  <iSelect
                    v-model="ruleForm.models"
                    multiple
                    filterable
                    :placeholder="
                      ruleForm.roundType !== '03' ? $t('LK_QINGXUANZE') : ''
                    "
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
                <iFormItem
                  label="车型项目"
                  :prop="ruleForm.roundType !== '03' ? 'modelProjects' : ''"
                  class="mutiple-form"
                >
                  <iLabel
                    :label="$t('车型项目')"
                    slot="label"
                    required
                  ></iLabel>
                  <iSelect
                    v-model="ruleForm.modelProjects"
                    multiple
                    filterable
                    :placeholder="
                      ruleForm.roundType !== '03' ? $t('LK_QINGXUANZE') : ''
                    "
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
                <iFormItem label="起始总价">
                  <iLabel :label="$t('起始总价')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :data-value="orgTotalPrices"
                      :value="
                        totalPriceFlag ? '0' + currencyMultiple : startingPrice
                      "
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row">
                <iFormItem label="大写">
                  <iLabel :label="$t('大写')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="totalPriceFlag ? '零元整' : numberUppercase"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <iFormItem />
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </iCard>

    <!-- 产品信息 -->
    <!-- <iCard class="card" :title="$t('产品信息')">
      <div class="card--body">
        <commonTable
          ref="tableDataForm"
          :tableData="ruleForm.biddingProducts"
          :tableTitle="multiPleTableTitle"
          :tableLoading="tableLoading"
          :selection="false"
        >
        </commonTable>
      </div>
    </iCard> -->
  </div>
</template>

<script>
import {
  iCard,
  iButton,
  iInput,
  iFormItem,
  iLabel,
  iSelect,
  iDatePicker,
} from "rise";
import {
  multiPleTableTitle,
  baseRules,
  currencyMultipleLib,
  planBaseData,
} from "./data";
import { pageMixins } from "@/utils/pageMixins";
import { digitUppercase } from "@/utils/digitUppercase";
import {
  getModels,
  getProjects,
  getCurrencyUnit,
  getUnits,
} from "@/api/mock/mock";
import {
  getRfqInfo,
  findMultiPrice,
  saveMultiPrice,
} from "@/api/bidding/bidding";
import Big from "big.js";
import dayjs from "dayjs";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iInput,
    iFormItem,
    iLabel,
    iSelect,
    iDatePicker,
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
        "moldFee",
        "developFee",
        "targetPrice",
        "lifecycle",
        "aveAnnualOutput",
        "maxAnnualOutput",
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
      rfqinfoProduct: [],
      yearsPlanTable: [],
      purchasePlanTable: [],
      prefactoryPrice: 0,
    };
  },
  mounted() {
    this.handleSearchReset();

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
    getUnits({}).then((res) => {
      this.quantityUnit = res.data;
    });
    getRfqInfo({ rfqCode: this.ruleForm.rfqCode }).then((res) => {
      this.rfqinfoProduct = res.products;
    });
  },
  computed: {
    disabledAll() {
      return this.ruleForm.roundType === "03" ? true : false;
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
      return biddingProducts.reduce((sum, item, index) => {
        return isNaN(Number(item.factoryPrice)) ||
          isNaN(Number(item.packingFee)) ||
          isNaN(Number(item.packingFee2)) ||
          isNaN(Number(item.transportFee)) ||
          isNaN(Number(item.operationFee)) ||
          isNaN(Number(item.moldFee)) ||
          isNaN(Number(item.developFee))
          ? sum
          : Big(this.calculationDetails(item, index)).add(sum).toNumber();
      }, 0);
    },

    totalPrices() {
      return Big(this.orgTotalPrices).toFixed(2);
    },
    numberUppercase() {
      return digitUppercase(Number(this.orgTotalPrices));
    },
    startingPrice() {
      return this.totalPrices + this.currencyMultiple;
    },
    biddingProducts() {
      return this.ruleForm.biddingProducts;
    },
  },
  watch: {
    //监听年度降价计划 更新采购计划的降级计划
    yearsPlanTable: {
      handler(val, oldVal) {
        let yearsPlan = val[0];
        if (this.purchasePlanTable?.length > 0) {
          this.purchasePlanTable.forEach((e, index) => {
            if (index % 3 === 1) {
              // this.$set(
              //   this.purchasePlanTable[index],
              //   `stage${0 + 1}`,
              //   yearsPlan[`stage${0 + 1}`]
              // );
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
      },
      deep: true,
    },
    //监听产品  计算B价 ==出厂价+包装费+运输费+操作费
    biddingProducts: {
      handler(val, oldVal) {
        if (val.length > 0)
          val.forEach((item) => {
            item.bPrice =
              isNaN(Number(item.factoryPrice)) ||
              isNaN(Number(item.packingFee)) ||
              isNaN(Number(item.packingFee2)) ||
              isNaN(Number(item.transportFee)) ||
              isNaN(Number(item.operationFee))
                ? item.bPrice
                : Big(item.factoryPrice || 0)
                    .add(item.packingFee || 0)
                    .add(item.packingFee2 || 0)
                    .add(item.transportFee || 0)
                    .add(item.operationFee || 0)
                    .toFixed(2);
          });
      },
      deep: true, //true 深度监听
    },
    //监听更新出厂价
    // factoryPricePercent(val, oldVal) {
    //   if (this.factoryPricePercentFlag)
    //     this.ruleForm.biddingProducts.forEach((e) => {
    //       const tmp = val || 100;
    //       if (!isNaN(Number(tmp)) && !isNaN(Number(oldVal))) {
    //         oldVal
    //           ? (e.factoryPrice = Big(e.factoryPrice || 0)
    //               .div(Number(oldVal) === 0 ? 1 : oldVal / 100)
    //               .times(Number(tmp) === 0 ? 1 : tmp / 100)
    //               .toNumber())
    //           : (e.factoryPrice = Big(e.factoryPrice || 0)
    //               .times(Number(tmp) === 0 ? 1 : tmp / 100)
    //               .toNumber());
    //       }
    //     });
    // },
  },
  methods: {
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
        if (scope.row[`stage${i}`]?.includes(dateYear)) {
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
            dayjs(purchasePlanDateItem[`stage1`]).year() +
            1;
          let countJ =
            dayjs(purchasePlanDateItem[`stage${i}`]).year() -
            dayjs(purchasePlanDateItem[`stage1`]).year() +
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
        .times(beforeMonth || 0)
        .times(lastDiscount || 0)
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
            .times(afterMonth || 0)
            .times(discount || 0)
            .toNumber()
        )
        .toNumber();
    },

    //FSNR/GSNR更改联动零件号 和 采购计划FSNR/GSNR、零件号
    rfqinfoChange(e) {
      let obj = this.rfqinfoProduct.filter((item) => {
        return e.fsnrGsnr === item.fsnrGsnr;
      });
      if (obj.length < 1) {
        return;
      }
      e.productName = obj[0]?.productName;
      e.productCode = obj[0]?.productCode;
      //3n
      this.purchasePlanTable[e.index * 3].title = obj[0]?.fsnrGsnr;
      this.purchasePlanTable[e.index * 3 + 1].title = obj[0]?.productCode;
    },
    //零件号更改联动采购计划零件号
    partNumberChange(e) {
      this.purchasePlanTable[e.index * 3 + 1].title = e.productCode;
    },
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
    //上一步
    handlePre() {
      this.$confirm("是否保存该项目信息？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(() => {
        this.submitForm(
          "ruleForm",
          "tableDataForm",
          "yearsPlanTableForm",
          "purchasePlanTableForm",
          () => {
            this.$router.push({
              name: "biddingCompetitionBase",
            });
          }
        );
      });
    },
    //下一步
    handleNext() {
      this.$confirm("是否保存该项目信息？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(() => {
        this.submitForm(
          "ruleForm",
          "tableDataForm",
          "yearsPlanTableForm",
          "purchasePlanTableForm",
          () => {
            this.$router.push({
              name: "biddingCompetitionQuotation",
            });
          }
        );
      });
    },
    handleSearchReset() {
      this.purchasePlanTable = [];
      this.yearsPlanTable = [];
      let param = { id: this.id };
      this.query(param);
    },
    submitForm(
      formName,
      tableDataForm,
      yearsPlanTableForm,
      purchasePlanTableForm,
      callback
    ) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitTableForm(
            tableDataForm,
            yearsPlanTableForm,
            purchasePlanTableForm,
            callback
          );
        } else {
          this.$message.error("项目信息数据有误！");
          return;
        }
      });
    },
    submitTableForm(
      tableDataForm,
      yearsPlanTableForm,
      purchasePlanTableForm,
      callback
    ) {
      this.$refs[tableDataForm].$children[0].validate((valid) => {
        if (valid) {
          this.submitYearsPlanTableForm(
            yearsPlanTableForm,
            purchasePlanTableForm,
            callback
          );
        } else {
          this.$message.error("产品信息数据有误！");
          return;
        }
      });
    },
    submitYearsPlanTableForm(
      yearsPlanTableForm,
      purchasePlanTableForm,
      callback
    ) {
      this.$refs[yearsPlanTableForm].$children[0].validate((valid) => {
        if (valid || this.ruleForm.biddingProducts.length == 0) {
          this.submitPurchasePlanTableForm(purchasePlanTableForm, callback);
        } else {
          this.$message.error("年降计划数据有误！");
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
      let modelList = [];
      this.ruleForm.models.forEach((item) => {
        this.modelsOption.forEach((option) => {
          if (option.code === item) {
            modelList.push({
              biddingId: this.id,
              model: option.name,
              modelCode: option.code,
            });
          }
        });
      });
      let modelProjectList = [];
      this.ruleForm.modelProjects.forEach((item) => {
        this.modelProjectsOption.forEach((option) => {
          if (option.code === item) {
            modelProjectList.push({
              biddingId: this.id,
              project: option.name,
              projectCode: option.code,
            });
          }
        });
      });
      //年降计划
      let yearsPlans = [];
      for (let i = 1; i < 16; i++) {
        let obj = {
          biddingId: this.id,
          stage: i,
          cutPricePlan: this.yearsPlanTable[0][`stage${i}`],
          discountRate: this.yearsPlanTable[1][`stage${i}`],
          id: this.yearsPlanTable[0][`id${i}`],
        };
        yearsPlans.push(obj);
      }

      //采购计划
      let procurePlans = [];
      this.ruleForm.biddingProducts.forEach((item, index) => {
        for (let i = 1; i < 16; i++) {
          let obj = {
            stage: i,
            productId: item.id,
            productCode: this.purchasePlanTable[index * 3 + 1].title,
            procureYearMonth: this.purchasePlanTable[index * 3][`stage${i}`],
            cutPricePlan: this.purchasePlanTable[index * 3 + 1][`stage${i}`],
            procureNum: this.purchasePlanTable[index * 3 + 2][`stage${i}`],
            id: this.purchasePlanTable[index * 3 + 2][`id${i}`],
          };
          procurePlans.push(obj);
        }
      });
      let formData = { ...this.ruleForm };
      //起始总价
      formData.totalPrices = this.totalPrices;
      formData.models = modelList;
      formData.modelProjects = modelProjectList;
      formData.yearsPlans = yearsPlans;
      formData.procurePlans = procurePlans;
      //保存
      saveMultiPrice(formData)
        .then((res) => {
          this.$message.success("保存成功");
          callback && callback();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleAddProduct() {
      this.ruleForm.biddingProducts.push({
        biddingId: this.id,
        fsnrGsnr: "",
        productName: "",
        productCode: "",
        factoryPrice: "",
        packingFee: "",
        upsetPrice: "",
        packingFee2: "",
        transportFee: "",
        operationFee: "",
        bPrice: "",
        moldFee: "",
        developFee: "",
        targetPrice: "",
        quantityUnit: "",
        lifecycle: "",
        aveAnnualOutput: "",
        maxAnnualOutput: "",
      });
      this.handleAddPurchase();
      this.page.total = this.ruleForm.biddingProducts.length;
      this.page.currPage = Math.ceil(this.page.total / this.page.pageSize);
    },
    handleAddPurchase(e) {
      let nowYear = this.ruleForm.beginMonth;
      var date = "";
      if (nowYear) {
        date = new Date(nowYear);
      }
      let plan = this.yearsPlanTable[0];
      this.purchasePlanTable.push(
        {
          title: typeof e === "undefined" ? "" : e.fsnrGsnr,
          stage1: nowYear,
          stage2: date ? date.getFullYear() + 1 + "-01" : "",
          stage3: date ? date.getFullYear() + 2 + "-01" : "",
          stage4: date ? date.getFullYear() + 3 + "-01" : "",
          stage5: date ? date.getFullYear() + 4 + "-01" : "",
          stage6: date ? date.getFullYear() + 5 + "-01" : "",
          stage7: date ? date.getFullYear() + 6 + "-01" : "",
          stage8: date ? date.getFullYear() + 7 + "-01" : "",
          stage9: date ? date.getFullYear() + 8 + "-01" : "",
          stage10: date ? date.getFullYear() + 9 + "-01" : "",
          stage11: date ? date.getFullYear() + 10 + "-01" : "",
          stage12: date ? date.getFullYear() + 11 + "-01" : "",
          stage13: date ? date.getFullYear() + 12 + "-01" : "",
          stage14: date ? date.getFullYear() + 13 + "-01" : "",
          stage15: date ? date.getFullYear() + 14 + "-01" : "",
        },
        {
          title: typeof e === "undefined" ? "" : e.productCode,
          stage1: plan?.stage1,
          stage2: plan?.stage2,
          stage3: plan?.stage3,
          stage4: plan?.stage4,
          stage5: plan?.stage5,
          stage6: plan?.stage6,
          stage7: plan?.stage7,
          stage8: plan?.stage8,
          stage9: plan?.stage9,
          stage10: plan?.stage10,
          stage11: plan?.stage11,
          stage12: plan?.stage12,
          stage13: plan?.stage13,
          stage14: plan?.stage14,
          stage15: plan?.stage15,
        },
        {
          ...planBaseData,
        }
      );
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
    query(e) {
      // 根据ID查询条款信息
      this.tableLoading = true;
      findMultiPrice(e)
        .then((res) => {
          this.updateRuleForm(res);
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
    updateRuleForm(data) {
      this.ruleForm = {
        ...data,
        models: data.models?.map((item) => item.modelCode),
        modelProjects: data.modelProjects?.map((item) => item.projectCode),
      };

      let o = {};
      if (this.ruleForm.procurePlans?.length) {
        o = this.ruleForm.procurePlans.reduce((obj, item) => {
          if (!obj[item.productId]) {
            obj[item.productId] = {
              yearMonth: { title: "" },
              cutPricePlan: { title: "" },
              procureNum: { title: "" },
            };
          }
          obj[item.productId].yearMonth[`stage${item.stage}`] =
            item.procureYearMonth;
          obj[item.productId].yearMonth[`id${item.stage}`] = item.id;
          obj[item.productId].cutPricePlan[`stage${item.stage}`] =
            item.cutPricePlan;
          obj[item.productId].cutPricePlan[`id${item.stage}`] = item.id;
          obj[item.productId].procureNum[`stage${item.stage}`] =
            item.procureNum;
          obj[item.productId].procureNum[`id${item.stage}`] = item.id;
          return obj;
        }, {});
      }
      let nowYear = this.ruleForm.beginMonth;
      var date = "";
      if (nowYear) {
        date = new Date(nowYear);
      }
      let planBaseDataOfDate = {
        title: "",
        stage1: nowYear,
        stage2: date ? date.getFullYear() + 1 + "-01" : "",
        stage3: date ? date.getFullYear() + 2 + "-01" : "",
        stage4: date ? date.getFullYear() + 3 + "-01" : "",
        stage5: date ? date.getFullYear() + 4 + "-01" : "",
        stage6: date ? date.getFullYear() + 5 + "-01" : "",
        stage7: date ? date.getFullYear() + 6 + "-01" : "",
        stage8: date ? date.getFullYear() + 7 + "-01" : "",
        stage9: date ? date.getFullYear() + 8 + "-01" : "",
        stage10: date ? date.getFullYear() + 9 + "-01" : "",
        stage11: date ? date.getFullYear() + 10 + "-01" : "",
        stage12: date ? date.getFullYear() + 11 + "-01" : "",
        stage13: date ? date.getFullYear() + 12 + "-01" : "",
        stage14: date ? date.getFullYear() + 13 + "-01" : "",
        stage15: date ? date.getFullYear() + 14 + "-01" : "",
      };
      if (
        !this.ruleForm.biddingProducts?.length &&
        this.ruleForm.roundType !== "03"
      ) {
        this.handleAddProduct();
      } else {
        this.ruleForm.biddingProducts.forEach((item) => {
          this.purchasePlanTable.push({
            ...planBaseDataOfDate,
            ...o[item.id]?.yearMonth,
            title: item.fsnrGsnr,
          });
          this.purchasePlanTable.push({
            ...planBaseData,
            ...o[item.id]?.cutPricePlan,
            title: item.productCode,
          });
          this.purchasePlanTable.push({
            ...planBaseData,
            ...o[item.id]?.procureNum,
            title: "",
          });
        });
      }

      this.handleAddYearPlan();
      let obj = { title: "降价计划" };
      if (this.ruleForm.yearsPlans?.length) {
        this.ruleForm.yearsPlans.forEach((item) => {
          obj[`stage${item.stage}`] = item.cutPricePlan;
          obj[`id${item.stage}`] = item.id;
        });
      } else {
        obj = {
          ...planBaseData,
          ...obj,
        };
        if (this.ruleForm.roundType === "03") {
          obj.stage2 = 3;
          obj.stage3 = 3;
          obj.stage4 = 3;
        }
      }

      this.yearsPlanTable.splice(0, 0, obj);
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    handleDeleteTable() {
      let indexs = this.selectedTableData.map((e) => {
        return e.index;
      });
      if (
        this.ruleForm.roundType === "03" &&
        this.selectedTableData.length >= this.ruleForm.biddingProducts.length
      ) {
        this.$message.error("不能 清空产品 信息 列表，至少保留一行！");
        return;
      }
      //删除产品
      this.ruleForm.biddingProducts = this.ruleForm.biddingProducts.filter(
        (item, index) => !indexs.includes(index)
      );
      let planIndexs = [];
      indexs.forEach((i) => {
        planIndexs.push(i * 3);
        planIndexs.push(i * 3 + 1);
        planIndexs.push(i * 3 + 2);
      });
      //删除产品对应的采购计划数据
      this.purchasePlanTable = this.purchasePlanTable.filter(
        (item, index) => !planIndexs.includes(index)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
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
    margin-top: 20px;
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
            }
          }
        }
        .el-form-item + .el-form-item {
          margin-left: 80px;
        }
      }
    }
  }
}
::v-deep .mutiple-form {
  .el-input.is-disabled .el-input__inner {
    background-color: transparent;
  }
}
</style>
