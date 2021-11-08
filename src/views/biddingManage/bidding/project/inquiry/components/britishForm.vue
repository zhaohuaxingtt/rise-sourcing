<template>
  <el-form
    :model="ruleForm"
    label-width="9.6rem"
    :rules="rules"
    ref="ruleForm"
    :hideRequiredAsterisk="true"
  >
    <!-- 英式竞价 -->
    <div class="form">
      <div class="input-box">
        <div class="form-row">
          <!-- 轮次类型 -->
          <iFormItem
            :label="language('BIDDING_LUNCILEIXING','轮次类型')"
            prop="roundType"
            :hideRequiredAsterisk="true"
          >
            <iLabel :label="language('BIDDING_LUNCILEIXING', '轮次类型')" slot="label" required></iLabel>
            <iSelect
              v-model="ruleForm.roundType"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
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
          <iFormItem :label="language('BIDDING_BJJZRQ', '报价截止日期')" prop="pricingDeadline">
            <iLabel :label="language('BIDDING_BJJZRQ', '报价截止日期')" slot="label" required></iLabel>
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.pricingDeadline"
              :picker-options="pricingDeadlineOptions"
              :disabled="ruleForm.biddingStatus !== '01'"
              v-if="isBiddingDelay"
            />
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.pricingDeadline"
              :picker-options="pricingDeadlineOptions"
              v-else
            />
          </iFormItem>
          <!-- 状态 -->
          <iFormItem label="状态" prop="biddingStatus">
            <iLabel :label="language('BIDDING_ZHUANGTAI', '状态')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.biddingStatus" disabled>
              <el-option
                v-for="item in biddingStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </div>

        <div class="form-row">
          <!-- 竞价开始时间 -->
          <iFormItem :label="language('BIDDING_JJKSSJ', '竞价开始时间')" prop="biddingBeginTime">
            <iLabel :label="language('BIDDING_JJKSSJ', '竞价开始时间')" slot="label" required></iLabel>
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.biddingBeginTime"
              :picker-options="biddingBeginTimeOptions"
              :disabled="ruleForm.biddingStatus !== '01'"
              v-if="isBiddingDelay"
            />
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.biddingBeginTime"
              :picker-options="biddingBeginTimeOptions"
              v-else
            />
          </iFormItem>
          <!-- 竞价结束时间 -->
          <iFormItem :label="language('BIDDING_JJJSSJ', '竞价结束时间')" prop="biddingEndTime">
            <iLabel :label="language('BIDDING_JJJSSJ', '竞价结束时间')" slot="label" required></iLabel>
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.biddingEndTime"
              :picker-options="biddingEndTimeOptions"
              :disabled="ruleForm.biddingStatus !== '01'"
              v-if="isBiddingDelay"
            />
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.biddingEndTime"
              :picker-options="biddingEndTimeOptions"
              v-else
            />
          </iFormItem>
          <!-- 开标时间 -->
          <iFormItem></iFormItem>
        </div>

        <div class="form-row" v-if="ruleForm.biddingStatus === '08'">
          <!-- 作废原因 -->
          <iFormItem label="作废原因" prop="invalidReason">
            <iLabel :label="language('BIDDING_ZUOFEIYUANYIN', '作废原因')" slot="label"></iLabel>
            <div
              :value="ruleForm.invalidReason"
              class="form-item-clo1-row1"
            ></div>
            <!-- <iInput
              type="textarea"
              v-model="ruleForm.invalidReason"
              rows="4"
              disabled
              resize="none"
            ></iInput> -->
          </iFormItem>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { baseRules, roundTypeLists, biddingStatus } from "./data.js";

import { iInput, iDatePicker, iFormItem, iLabel, iSelect } from "rise";
import dayjs from "dayjs";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    iInput,
    iDatePicker,
    iFormItem,
    iLabel,
    iSelect,
  },
  props: {
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
      // let Begin = new Date(this.ruleForm.biddingBeginTime).getTime();
      // let EndTime = new Date(this.ruleForm.biddingEndTime).getTime();
      // if (EndTime <= Begin) {
      //   this.ruleForm.pricingDeadline = null;
      //   this.ruleForm.biddingEndTime = null;
      // }
      // let three = 3 * 24 * 3600 * 1000;
      let end = 30 * 60 * 1000;
      // let time = new Date(val).getTime() + three;
      let endTime = new Date(val).getTime() + end;
      this.ruleForm.biddingEndTime = dayjs(endTime).format("YYYY-MM-DD HH:mm:00");
      if (this.ruleForm.biddingStatus === "09") return;
      // this.ruleForm.pricingDeadline = dayjs(time).format("YYYY-MM-DD HH:mm:00");
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
    "ruleForm.pricingDeadline"(val) {
      this.ruleForm.openTenderTime = val;
      this.$nextTick(() => {
        this.ruleForm.openTenderTime = val;
      });
    },
    "ruleForm.biddingEndTime"(val) {
      let three = 3 * 24 * 3600 * 1000;
       let time = new Date(val).getTime() + three;
       this.ruleForm.pricingDeadline = dayjs(time).format("YYYY-MM-DD HH:mm:00");
    }
  },
  data() {
    return {
      rules: baseRules,
      roundTypeLists,
      ruleForm: {},
      biddingStatus,
      // biddingBeginTimeOptions: {
      //   disabledDate: (time) => {
      //     let curDate = Date.now() - 8.64e7;
      //     return time.getTime() < curDate;
      //   },
      // },

      // pricingDeadlineOptions: {
      //   disabledDate: (time) => {
      //     let curDate = this.ruleForm.biddingEndTime
      //       ? new Date(this.ruleForm.biddingEndTime).getTime()
      //       : Date.now() - 8.64e7;
      //     let three = 3 * 24 * 3600 * 1000;
      //     let threeMonths = curDate + three;
      //     return time.getTime() <= curDate || time.getTime() > threeMonths;
      //   },
      // },
      pricingDeadlineOptions: {
        disabledDate: (time) => {
          let year = new Date(this.ruleForm.biddingBeginTime).getFullYear();
          let month = new Date(this.ruleForm.biddingBeginTime).getMonth() + 2;
          if (month == 13) {
            year +=1
            month = 1;
          }
          let date = new Date(this.ruleForm.biddingBeginTime).getDate();
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
    biddingBeginTimeOptions() {
      let now = dayjs(new Date().getTime()).startOf("date").valueOf();
      let biddingBeginTime = dayjs(this.ruleForm.biddingBeginTime)
        .startOf("date")
        .valueOf();
      return {
        selectableRange: [
          `${dayjs(new Date().getTime()).format("HH:mm:00")} - 23:59:59`,
        ],
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7;
        },
      };
    },
    biddingEndTimeOptions() {
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
              dayjs(this.ruleForm.biddingBeginTime).endOf("date").valueOf() ||
            time.getTime() < Date.now() - 8.64e7
          );
        },
      };
    },
  },
  methods: {
    handleRoundType() {
      this.ruleForm.biddingBeginTime = null;
      this.ruleForm.biddingEndTime = null;
      this.ruleForm.pricingDeadline = null;
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
</style>