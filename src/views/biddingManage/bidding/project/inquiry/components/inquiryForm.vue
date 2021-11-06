<template>
  <el-form
    :model="ruleForm"
    label-width="9.6rem"
    :rules="rules"
    ref="ruleForm"
    :hideRequiredAsterisk="true"
  >
    <!-- 询价 -->
    <div class="form">
      <div class="input-box">
        <div class="form-row">
          <!-- 轮次类型 -->
          <iFormItem
            label="轮次类型"
            prop="roundType"
            :hideRequiredAsterisk="true"
          >
            <iLabel :label="$t('轮次类型')" slot="label" required></iLabel>
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
              :picker-options="openDeadlineTimeOptions"
              :disabled="ruleForm.biddingStatus !== '01'"
              v-if="isOpenDelay"
            />
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="ruleForm.pricingDeadline"
              :picker-options="openDeadlineTimeOptions"
              v-else
            />
          </iFormItem>
          <!-- 占位 -->
          <iFormItem> </iFormItem>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import {
  baseRules,
  openTenderStatusList,
  roundTypeLists,
  biddingStatus,
} from "./data.js";

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
    isOpenDelay: {
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
    "ruleForm.pricingDeadline"(val) {
      if (
        this.ruleForm.biddingStatus === "09" ||
        this.ruleForm.biddingStatus === "08"
      ) {
        return;
      }
      this.ruleForm.openTenderTime = val;
      this.$nextTick(() => {
        this.ruleForm.openTenderTime = val;
      });
    },
  },
  data() {
    return {
      rules: baseRules,
      ruleForm: {},
      status: "未开标",
      openTenderStatusList,
      roundTypeLists,
      biddingStatus,
    };
  },
  computed: {
    openDeadlineTimeOptions() {
      return {
        // selectableRange: [
        //   `${dayjs(new Date().getTime()).format("HH:mm:00")} - 23:59:59`,
        // ],
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7;
        },
      };
    },
    openTenderTimeOptions() {
      // let pricingDeadline = dayjs(this.ruleForm.pricingDeadline).format(
      //   "YYYY-MM-DD"
      // );
      // let openTenderTime = dayjs(this.ruleForm.openTenderTime).format(
      //   "YYYY-MM-DD"
      // );
      let str = [
        `${dayjs(
          new Date(this.ruleForm.pricingDeadline).getTime() + 60 * 1000
        ).format("HH:mm:00")} - 23:59:59`,
      ];
      // if (pricingDeadline == openTenderTime) {
      //   str = [
      //     `${dayjs(
      //       new Date(this.ruleForm.pricingDeadline).getTime() + 60 * 1000
      //     ).format("HH:mm:00")} - 23:59:59`,
      //   ];
      // } else {
      //   str = [`00:00:00 - 23:59:59`];
      // }

      return {
        selectableRange: str,
        disabledDate: (time) => {
          // return (
          //   time.getTime() <
          //   dayjs(this.ruleForm.pricingDeadline).startOf("date").valueOf()
          // );
          return time.getTime() < Date.now() - 8.64e7;
        },
      };
    },
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
</style>