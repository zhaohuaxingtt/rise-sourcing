<template>
  <el-form
    :model="ruleForm"
    label-width="130px"
    :rules="rules"
    ref="ruleForm"
    :hideRequiredAsterisk="true"
    :disabled="!isUser"
  >
    <!-- 开标 -->
    <div class="form">
      <div class="input-box">
        <div class="form-row">
          <!-- 轮次类型 -->
          <iFormItem
            label="轮次类型"
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
                :label="language(item.key, item.name)"
                :value="item.roundType"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          <!-- 报价截止日期 -->
          <iFormItem label="报价截止日期" prop="pricingDeadline">
            <iLabel :label="language('BIDDING_BJJZRQ', '报价截止日期')" slot="label" required></iLabel>
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              :default-value="new Date()"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.pricingDeadline"
              :picker-options="openDeadlineTimeOptions"
              :disabled="ruleForm.biddingStatus !== '01'"
              v-if="isOpenDelay"
            />
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              :default-value="new Date()"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.pricingDeadline"
              :picker-options="openDeadlineTimeOptions"
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
                :label="language(item.key, item.label)"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </div>
        <div class="form-row">
          <!-- 开标时间 -->
          <iFormItem label="开标时间" prop="openTenderTime">
            <iLabel :label="language('BIDDING_KAIBIAOSHIJIAN', '开标时间')" slot="label" required></iLabel>
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.openTenderTime"
              :picker-options="openTenderTimeOptions"
              :disabled="ruleForm.biddingStatus !== '01'"
              v-if="isOpenDelay"
            />
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.openTenderTime"
              :picker-options="openTenderTimeOptions"
              v-else
            />
          </iFormItem>
          <!-- 占位 -->
          <iFormItem></iFormItem>
          <!-- 占位 -->
          <iFormItem></iFormItem>
        </div>

        <div class="form-row" v-if="ruleForm.biddingStatus === '08'">
          <!-- 作废原因 -->
          <iFormItem label="作废原因" prop="invalidReason">
            <iLabel :label="language('BIDDING_ZUOFEIYUANYIN', '作废原因')" slot="label"></iLabel>
            <div
              class="form-item-clo1-row1"
            >{{ruleForm.invalidReason}}</div>
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
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
      },
    },
    '$i18n.locale':{
      immediate:true,
      deep:true,
      handler(val){
        this.rules = baseRules(this)
      }
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
    "ruleForm.pricingDeadline"(val) {
      if (moment(val).isBefore(new Date())) return this.$set(this.ruleForm, 'pricingDeadline', moment().format("YYYY-MM-DD HH:mm:00"))
      
      if (
        this.ruleForm.biddingStatus === "09" ||
        this.ruleForm.biddingStatus === "08"
      ) {
        return;
      }
      this.ruleForm.openTenderTime = val;
      // this.$nextTick(() => {
      //   let endTime = new Date(val).getTime() + 60 * 1000;
      //   this.ruleForm.openTenderTime = dayjs(endTime).format("YYYY-MM-DD HH:mm:00");
      // });
       this.$nextTick(() => {
        this.$refs["ruleForm"].validateField(["pricingDeadline"]);
       });
      if (val == null) {
        this.$nextTick(() => {
          this.$refs["ruleForm"].clearValidate(["pricingDeadline"]);
        });
      }
    },
    "ruleForm.openTenderTime"(val) {
      this.ruleForm.pricingDeadline = val
    }
  },
  data() {
    return {
      rules: baseRules(this),
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
        selectableRange: [ moment(this.ruleForm.pricingDeadline || null).isAfter(Date.now(), 'day') ? '00:00:00 - 23:59:59' : `${ moment().format('HH:mm:00') } - 23:59:59` ],
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
        // `${dayjs(new Date(this.ruleForm.pricingDeadline).getTime()).format(
        //   "HH:mm:00"
        // )} - 23:59:59`,
        `${dayjs(new Date().getTime()).format("HH:mm:00")} - 23:59:59`,
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
          // return this.ruleForm.pricingDeadline
          //   ? time.getTime() <
          //       dayjs(this.ruleForm.pricingDeadline).startOf("date").valueOf()
          //   : time.getTime() < Date.now() - 8.64e7;
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
        color: #aaa;
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