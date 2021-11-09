<template>
  <div id="card">
    <iCard :title="language('BIDDING_XIANGMUXINXI', '项目信息')" class="card" v-loading="reLoad">
      <template slot="header-control">
        <div v-if="!biddingStatus">
          <iButton
            :disabled="yingbiao"
            :class="{ yingbiao: yingbiao, unyingbiao: !yingbiao }"
            @click="handleNext"
            >{{ language('应标', '应标') }}</iButton
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
          :model="heRuleForm"
          label-width="9rem"
          :rules="rules"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
        >
          <div class="form">
            <div class="input-box">
              <div class="form-row">
                <iFormItem :label="language('BIDDING_QISHIZONGJIA', '起始总价')">
                  <iLabel :label="language('BIDDING_QISHIZONGJIA', '起始总价')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input__totalprice"
                      :value="
                        heRuleForm.currentOffer
                          ? heRuleForm.currentOffer + currencyMultiple
                          : ''
                      "
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <iFormItem :label="language('BIDDING_DAXIE', '大写')">
                  <iLabel :label="language('BIDDING_DAXIE', '大写')" slot="label"></iLabel>
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
                  label="开始时间"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel :label="language('BIDDING_KAISHISHIJIAN', '开始时间')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="createDate"
                      disabled
                    ></iInput>
                  </div>
                </iFormItem>
                <iFormItem
                  label="结束时间"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel :label="language('BIDDING_JIESHUSHIJIAN', '结束时间')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="expiryDate"
                      disabled
                    ></iInput>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem
                  label="出价类型"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel :label="language('BIDDING_CHUJIALEIXING', '出价类型')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="language('BIDDING_ZIDONGYINGBIAO', '自动应标')"
                      disabled
                    ></iInput>
                  </div>
                </iFormItem>
                <iFormItem
                  label="货币单位"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel :label="language('BIDDING_HUOBIDANWEI', '货币单位')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="currencyMultiple + ' ' + ruleForm.currencyUnit"
                      disabled
                    ></iInput>
                  </div>
                </iFormItem>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, iFormItem, iLabel } from "rise";
import { currencyMultipleLib, unitTableTitle } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import { digitUppercase } from "@/utils/digitUppercase";
import {
  getModels,
  getProjects,
  getCurrencyUnit,
  getUnits,
} from "@/api/mock/mock";
import {
  getCurrentDutchOffer,
  saveDutchQuotation,
  saveNextDutchOffer,
} from "@/api/bidding/bidding";
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
  },
  props: {
    id: String,
    initData: {
      type: Object,
      default: () => ({}),
    },
    supplierCode: String,
  },
  data() {
    return {
      yingbiao: false,
      hidens: false,
      flag: false,
      tableLoading: false,
      heRuleForm: {
        currentOffer: "",
        createDate: "",
        expiryDate: "",
        systemTime: "",
        biddingInterval: 0,
      },
      currencyMultipleLib,
      ruleForm: {},
      unitTableTitle,
      quantityUnit: [],
      modelsOption: [],
      modelProjectsOption: [],
      currencyUnit: {},
      timer: null,
      timeOut: null,
      curTime: 0,
      isClick: false,
      reLoad: false,
    };
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    this.ruleForm = { ...this.initData };
    this.handleSearchReset();
    getModels().then((res) => {
      this.modelsOption = res?.data;

      let obj = {};
      this.modelsOption = this.modelsOption.reduce(function (item, next) {
        obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
        return item;
      }, []);
    });
    getProjects().then((res) => {
      this.modelProjectsOption = res?.data;
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
        this.ruleForm.biddingStatus === "04" ||
        this.ruleForm.biddingStatus === "05"
      ) {
        return false;
      }
      return true;
    },
    createDate() {
      return this.heRuleForm.createDate?.replace("T", " ");
    },
    expiryDate() {
      return this.heRuleForm.expiryDate?.replace("T", " ");
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
    numberUppercase() {
      return digitUppercase(
        Big(this.heRuleForm.currentOffer || 0)
          .times(this.beishu)
          .toNumber()
      );
    },
  },
  watch: {
    curTime: function (val) {
      // if (!this.isClick) {
      //   if (val > dayjs(this.heRuleForm.createDate).valueOf()) {
      //     console.log("object");
      //     this.yingbiao = false;
      //   }
      // }

      if (val > dayjs(this.heRuleForm.expiryDate).valueOf()) {
        clearInterval(this.timer);
        this.yingbiao = true;
        // this.reLoad = true;
      }

      console.log(
        "当前时间-结束时间：",
        val - dayjs(this.heRuleForm.expiryDate).valueOf()
      );
    },
  },
  methods: {
    numberTotal(prices) {
      return Big(Number(prices)).times(this.beishu).toNumber();
    },
    dividedBeiShu(val){
     return Big(val).div(this.beishu).toNumber()
    },
    handleSearchReset() {
      let param = { id: Number(this.id), supplierCode: this.supplierCode };
      this.query(param);
    },
    toggle() {
      this.hidens = !this.hidens;
    },
    handleNext() {
      let param = {
        biddingId: this.id,
        clientTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        dutchOfferId: this.heRuleForm.id,
        offerPrice: this.numberTotal(this.heRuleForm.currentOffer),
        supplierCode: this.supplierCode,
      };
      saveDutchQuotation(param).then((res) => {
        this.yingbiao = true;
        this.isClick = true;
        this.$message.success(this.language('BIDDING_YINGBIAOCHENGGONG', "应标成功"));
        this.handleSearchReset();
      });
    },
    async query(e) {
      const res = await getCurrentDutchOffer(e).catch((err) => {
        console.log(err);
        // this.handleSearchReset();
      });

      this.reLoad = false;
      this.heRuleForm = { ...res };
      console.log(314,this.heRuleForm)
      const currentOffer = this.dividedBeiShu(this.heRuleForm.currentOffer)
      this.heRuleForm = {... this.heRuleForm,currentOffer}
      console.log(316,this.heRuleForm)

      if (this.heRuleForm.offered) {
        this.yingbiao = true;
      } else {
        this.yingbiao = false;
      }
      if (res.state === "06" || res.state === "07") {
        this.yingbiao = true;
        this.reLoad = false;
        return;
      }
      this.timer = setInterval(() => {
        //当前时间
        this.curTime = Date.now();
      }, 1000);
    },
    reset() {
      this.query({ id: Number(this.id), supplierCode: this.supplierCode });
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
