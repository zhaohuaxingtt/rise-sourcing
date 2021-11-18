<template>
  <div>
    <iCard :title="language('BIDDING_XIANGMUXINXI', '项目信息')" class="card">
      <template slot="header-control">
        <div>
          <iButton
            :class="{ yingbiao: biddingStatus, unyingbiao: !biddingStatus }"
            @click="handleNext"
            >{{ language('BIDDING_CHUJIA', '出价') }}</iButton
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
                <iFormItem
                  v-if="ruleForm.biddingMode === '01'"
                  :label="language('BIDDING_QISHIZONGJIA', '起始总价')"
                >
                  <iLabel :label="language('BIDDING_QISHIZONGJIA', '起始总价')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input__totalprice"
                      :value="startingPrice"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <!-- 总价 -->
                <iFormItem :label="language('BIDDING_QISHIZONGJIA', '起始总价')" prop="totalPrices" v-else>
                  <iLabel
                    :label="language('BIDDING_QISHIZONGJIA', '起始总价')"
                    slot="label"
                    required
                  ></iLabel>
                  <div class="form--item--number">
                    <iInput
                      v-if="flag"
                      class="form--item--number--input__totalprice"
                      type="number"
                      oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
                      :value="ruleForm.totalPrices"
                      @input="handleInputChange"
                      @blur="handleInputBlur"
                      :disabled="biddingStatus"
                    ></iInput>
                    <iInput
                      v-else
                      class="form--item--number--input__totalprice"
                      :value="totalStartingPriceString"
                      @focus="handleInputFocus"
                      :disabled="biddingStatus"
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <iFormItem :label="language('BIDDING_DAXIE', '大写')">
                  <iLabel :label="language('BIDDING_DAXIE', '大写')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      v-if="ruleForm.biddingMode === '01'"
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
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem
                  :label="language('BIDDING_QISHINIANYUE', '起始年月')"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel :label="language('BIDDING_QISHINIANYUE', '起始年月')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="ruleForm.beginMonth"
                      disabled
                    ></iInput>
                  </div>
                </iFormItem>
                <iFormItem :label="language('BIDDING_CHEXING', '车型')">
                  <iLabel :label="language('BIDDING_CHEXING', '车型')" slot="label"></iLabel>
                  <div class="form-item-tag">
                    <el-tag :key="tag" v-for="tag in modelsOption">
                      {{ tag.name }}
                    </el-tag>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')">
                  <iLabel :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')" slot="label"></iLabel>
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
          <div>{{language('BIDDING_CHANPINXINXI', '产品信息')}}</div>
        </div>
      </div>
      <div class="card--body">
        <tableColumnTemplate
          ref="tableDataForm"
          :tableData="ruleForm.supplierProducts"
          :tableTitle="unitTableTitle"
          :selection="false"
          :type="'0'"
          :tableLoading="tableLoading"
        >
          <!-- 起拍价格 -->
          <template slot="upsetPrice" slot-scope="scope">
            <i-input
              v-if="ruleForm.biddingMode === '01' && !biddingStatus"
              v-model="scope.row['upsetPrice']"
              type="number"
              oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
              placeholder="0.00"
            />
            <div v-else-if="ruleForm.biddingMode === '01' && biddingStatus">
              {{ scope.row["upsetPrice"] }}
            </div>
            <div v-else></div>
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
      hidens: false,
      flag: false,
      tableLoading: false,
      rules: baseRules,
      ruleForm: {
        beginMonth: "",
        modelProjects: [],
        models: [],
        biddingProducts: [],
        totalPrices: 0,
        supplierProducts: [],
      },
      unitTableTitle,
      quantityUnit: [],
      selectedTableData: [],
      modelsOption: [],
      modelProjectsOption: [],
      currencyUnit: {},
      supplierOffer: {},
    };
  },
  watch: {
    "initData.biddingStatus"(val, oldVal) {
      if (val !== oldVal) {
        this.handleSearchReset();
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    // this.updateRuleForm(this.initData);
    this.handleSearchReset();
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
      let supplierProducts = this.ruleForm.supplierProducts;
      return supplierProducts.reduce(
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
    numberUppercase() {
      return digitUppercase(
        Big(this.orgTotalPrices).times(this.beishu).toNumber()
      );
    },
    totalNumberUppercaseString() {
      return digitUppercase(
        Big(Number(this.ruleForm.totalPrices)).times(this.beishu).toNumber()
      );
    },
    startingPrice() {
      return this.orgTotalPrices + this.currencyMultiple;
    },

    totalStartingPriceString() {
      if (this.ruleForm.totalPrices == null) {
        return 0 + this.currencyMultiple;
      }
      return this.ruleForm.totalPrices + this.currencyMultiple;
    },
  },
  methods: {
    numberTotal(prices) {
      return Big(Number(prices)).times(this.beishu).toNumber();
    },
    dividedBeiShu(val){
     return Big(val).div(this.beishu).toNumber()
    },
    toggle() {
      this.hidens = !this.hidens;
      this.$emit("toggle", this.hidens);
    },
    handleInputFocus() {
      this.flag = true;
    },
    handleInputBlur() {
      this.flag = false;
      this.ruleForm.totalPrices = isNaN(Number(this.ruleForm.totalPrices))
        ? this.ruleForm.totalPrices
        : Big(Number(this.ruleForm.totalPrices)).toFixed(2);
    },
    handleInputChange(val) {
      let reg = /^\d*$|^\d*\.\d*$/g;
      if (!reg.test(val)) {
        return;
      }
      this.ruleForm.totalPrices = val;
    },
    //下一步
    handleNext() {
      // 拍买
      if (this.ruleForm.biddingType === "01") {
        if (
          this.numberTotal(this.ruleForm.totalPrices) <
          this.biddingQuoteRule.actualValue
        ) {
          this.$confirm(this.language('BIDDING_BCBJXYGZSDDJJZSFJX',"本次报价小于规则设定的警戒值，是否继续？"), this.language('BIDDING_TISHI',"提示"), {
            confirmButtonText: this.language('BIDDING_QUEDING',"确定"),
            cancelButtonText: this.language('BIDDING_QUXIAO',"取消"),
            type: "warning",
          })
            .then(() => {
              this.submitForm("ruleForm", "tableDataForm", () => {
                this.$emit("getRank");
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.submitForm("ruleForm", "tableDataForm", () => {
            this.$emit("getRank");
          });
        }
      } else {
        if (
          this.numberTotal(this.ruleForm.totalPrices) >
          this.biddingQuoteRule.actualValue
        ) {
          this.$confirm(this.language('BIDDING_BCBJDYGZSDDJJZSFJX',"本次报价大于规则设定的警戒值，是否继续？"), this.language('BIDDING_TISHI',"提示"), {
            confirmButtonText: this.language('BIDDING_QUEDING',"确定"),
        cancelButtonText: this.language('BIDDING_QUXIAO',"取消"),
            type: "warning",
          })
            .then(() => {
              this.submitForm("ruleForm", "tableDataForm", () => {
                this.$emit("getRank");
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.submitForm("ruleForm", "tableDataForm", () => {
            this.$emit("getRank");
          });
        }
      }
      // this.submitForm("ruleForm", "tableDataForm", () => {
      //   this.$emit("getRank");
      // });
    },
    submitForm(formName, tableDataForm, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitTableForm(tableDataForm, callback);
        } else {
          this.$message.error(this.language('BIDDING_XMXXSJYW',"项目信息数据有误！"));
          return;
        }
      });
    },
    submitTableForm(tableDataForm, callback) {
      this.$refs[tableDataForm].$children[0].validate((valid) => {
        if (valid) {
          this.handleSaveData(callback);
        } else {
          this.$message.error(this.language('BIDDING_CPXISJYW',"产品信息数据有误！"));
          return;
        }
      });
    },
    //数据验证通过提交数据
    handleSaveData(callback) {
      let formData = { ...this.ruleForm };
      this.supplierOffer = {
        biddingId: this.id,
        clientTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        offerPrice: this.numberTotal(this.ruleForm.totalPrices).toString(),
        supplierCode: this.supplierCode,
      };
      //起始总价
      if (this.ruleForm.biddingMode === "01") {
        //单价
        this.supplierOffer = {
          ...this.supplierOffer,
          offerPrice: this.numberTotal(this.orgTotalPrices).toString(),
        };
        formData.supplierOffer = this.supplierOffer;
        let reg = /^[\d]{0,15}(\.[\d]{0,6})?$/;
        if (!reg.test(formData.totalPrices)) {
          return this.$message.error(this.language('BIDDING_QSZJBNDY17W',"起始总价不能大于17位(含两位小数）"));
        }
      } else {
        formData.totalPrices = this.numberTotal(this.ruleForm.totalPrices).toString();
        formData.supplierOffer = this.supplierOffer;
      }

      //保存
      saveBiddingQuotation(formData)
        .then((res) => {
          if (res.code == '200') {
            this.$message.success(this.language('BIDDING_CHUJIACHENGGONG',"出价成功"));
          }
          // this.updateRuleForm(res);
          callback && callback();
        })
        .catch((err) => {
          console.log(err);
          this.handleSearchReset();
        });
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
      if(this.ruleForm.totalPrices){
        this.ruleForm.totalPrices= this.dividedBeiShu(this.ruleForm?.totalPrices);
      }
      getModels().then((res) => {
        console.log(res);
        data.models.forEach((item) => {
          console.log(item);
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
      if (!this.ruleForm.supplierProducts?.length) {
        this.ruleForm.supplierProducts = data.biddingProducts;
        this.ruleForm.supplierProducts.forEach((item) => {
          item.id = "";
        });
      }
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
