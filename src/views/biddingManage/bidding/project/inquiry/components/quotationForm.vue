<template>
  <el-form
    :model="ruleForm"
    label-width="9.6rem"
    :rules="rules"
    ref="ruleForm"
    :hideRequiredAsterisk="true"
  >
    <!-- 手工竞价-报价单回填 -->
    <div class="form">
      <div class="input-box">
        <div class="form-row">
          <!-- 轮次类型 -->
          <iFormItem label="轮次类型" :hideRequiredAsterisk="true">
            <iLabel :label="$t('轮次类型')" slot="label"></iLabel>
            <!-- <iInput v-model="ruleForm.roundType" disabled></iInput> -->
            <iSelect
              v-model="ruleForm.roundType"
              :placeholder="$t('LK_QINGXUANZE')"
              @change="handleRoundType"
              :disabled="ruleForm.biddingStatus !== '01'"
            >
              <el-option
                v-for="item in roundTypeLists"
                :key="item.roundType"
                :label="item.name"
                :value="item.roundType"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          <!-- 报价截止日期 -->
          <iFormItem label="报价截止日期" prop="pricingDeadline">
            <iLabel :label="$t('报价截止日期')" slot="label" required></iLabel>
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="ruleForm.pricingDeadline"
              :picker-options="pricingDeadlineOptions"
              :disabled="ruleForm.biddingStatus !== '01'"
              v-if="isBiddingDelay"
            />
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="ruleForm.pricingDeadline"
              :picker-options="pricingDeadlineOptions"
              v-else
            />
          </iFormItem>
          <!-- 手工竞价项目编号 -->
          <iFormItem label="手工竞价项目编号" :hideRequiredAsterisk="true">
            <iLabel :label="$t('手工竞价项目编号')" slot="label"></iLabel>
            <iSelect
              v-model="ruleForm.associatedQuotation"
              value-key="rfqCode"
              class="rfqs-search"
              filterable
              collapse-tags
              multiple
              :disabled="ruleForm.biddingStatus !== '01'"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
              <el-option
                v-for="item in rfqNameList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { iDatePicker, iFormItem, iLabel, iSelect } from "rise";
import {
  baseRules,
  manualBiddingTypeList,
  procureTypeList,
  roundTypeLists,
} from "./data.js";
import { getQuotation } from "@/api/bidding/bidding";
import dayjs from "dayjs";

export default {
  components: {
    iDatePicker,
    iFormItem,
    iLabel,
    iSelect,
  },
  props: {
    biddingId: String,
    value: {
      type: Object,
      default: () => ({}),
    },
    isBiddingDelay: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
      },
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
    "ruleForm.biddingBeginTime"(val) {
      let three = 3 * 24 * 3600 * 1000;
      let end =
        this.ruleForm.manualBiddingType == "01" ? 30 * 60 * 1000 : 60 * 1000;
      let time = new Date(val).getTime() + three;
      let endTime = new Date(val).getTime() + end;
      this.ruleForm.pricingDeadline = dayjs(time).format("YYYY-MM-DD HH:mm:00");
      this.ruleForm.biddingEndTime = dayjs(endTime).format("YYYY-MM-DD HH:mm:00");
      this.$nextTick(() => {
        this.$refs["ruleForm"].validateField(["biddingEndTime"]);
        this.$refs["ruleForm"].validateField(["pricingDeadline"]);
      });
      if (val == null) {
        this.$set(this.ruleForm, "biddingEndTime", "");
        this.$set(this.ruleForm, "pricingDeadline", "");
        this.$nextTick(() => {
          this.$refs["ruleForm"].clearValidate(["biddingEndTime"]);
          this.$refs["ruleForm"].clearValidate(["pricingDeadline"]);
        });
      }
    },
    "ruleForm.manualBiddingType"(val) {
      console.log(val);
    },
  },
  data() {
    return {
      rules: baseRules,
      ruleForm: {},
      manualBiddingTypeList,
      procureTypeList,
      roundTypeLists,
      rfqNameList: [],

      pricingBeginTimeOptions: {
        disabledDate: (time) => {
          let curDate = Date.now() - 8.64e7;
          return time.getTime() < curDate;
        },
      },

      pricingDeadlineOptions: {
        disabledDate: (time) => {
          let year = new Date().getFullYear();
          let month = new Date().getMonth() + 2;
          if (month == 13) {
            month = 1;
          } else if (month == 14) {
            month = 2;
          }
          let date = new Date().getDate();
          let nextMonth = new Date(year + "-" + month + "-" + date).getTime();

          let curDate = this.ruleForm.biddingEndTime
            ? new Date(this.ruleForm.biddingEndTime).getTime()
            : Date.now() - 8.64e7;
          let three = 30 * 24 * 3600 * 1000;
          let threeMonths = curDate + three;
          return time.getTime() < curDate || time.getTime() > nextMonth;
        },
      },
    };
  },
  computed: {
    pricingEndTimeOptions() {
      return {
        selectableRange: [
          `${dayjs(
            new Date(this.ruleForm.biddingBeginTime).getTime() + 60000
          ).format("HH:mm:00")} - 23:59:59`,
        ],
        disabledDate: (time) => {
          return (
            time.getTime() <
              dayjs(this.ruleForm.biddingBeginTime).startOf("date").valueOf() ||
            time.getTime() >
              dayjs(this.ruleForm.biddingBeginTime).endOf("date").valueOf()
          );
        },
      };
    },
  },
  async created() {
    const res = await getQuotation();
    // this.rfqNameList = (res || []).map((code) => {
    //   return {
    //     biddingId: this.biddingId,
    //     rfqCode: code,
    //   };
    // });
    this.rfqNameList = (res || []).map((code) => {
      return code;
    });
  },
  methods: {
    handleRoundType() {
      this.ruleForm.biddingBeginTime = null;
      this.ruleForm.pricingDeadline = null;
      this.ruleForm.biddingEndTime = null;
      this.ruleForm.openTenderTime = null;
    },
  },
};
</script>

<style lang="scss" scoped>
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

      /* 作废原因 */
      .form-item-clo1-row1 {
        width: 100%;
        height: 8rem;
        background-color: #f5f7fa;
        display: inline-block;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        padding: 0 0.875rem;
        word-wrap: break-word;
        overflow: auto;
      }
      .el-form-item {
        width: 100%;
        & + .el-form-item {
          margin-left: 80px;
        }
      }
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
          .form--item--number--input__alignRight ::v-deep .el-input__inner {
            text-align: right;
          }
        }
      }
    }
  }
}

::v-deep .el-date-editor {
  width: 100%;
  .el-icon-time::before {
    content: "";
    display: none;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 1.2rem;
    height: 1.2rem;
    color: grey;
    background-image: url("~@/assets/images/datetime.svg");
    background-size: 1.2rem 1.2rem;
  }
  &:hover::after {
    display: none;
  }

  .el-input__inner {
    padding-left: 0.875rem;
  }
}

.rfqs-search {
  ::v-deep .el-input {
    .el-input__suffix {
      display: none;
    }

    .el-input__prefix {
      right: 0;
      transform: translateX(45%);
    }
    .el-input__inner {
      padding-left: 0.875rem;
    }
  }
}
</style>
