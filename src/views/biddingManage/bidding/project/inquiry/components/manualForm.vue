<template>
  <el-form
    :model="ruleForm"
    label-width="9.6rem"
    :rules="rules"
    ref="ruleForm"
    :hideRequiredAsterisk="true"
  >
    <!-- 手工竞价 -->
    <div class="form">
      <div class="input-box">
        <div class="form-row">
          <!-- 采购类型 -->
          <iFormItem label="采购类型" :hideRequiredAsterisk="true">
            <iLabel :label="language('BIDDING_CAIGOULEIXING', '采购类型')" slot="label"></iLabel>
            <!-- <iInput v-model="ruleForm.procureType" disabled></iInput> -->
            <iSelect
              v-model="ruleForm.procureType"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              disabled
            >
              <el-option
                v-for="item in procureTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          <!-- 轮次类型 -->
          <iFormItem label="轮次类型" :hideRequiredAsterisk="true">
            <iLabel :label="language('BIDDING_LUNCILEIXING', '轮次类型')" slot="label"></iLabel>
            <!-- <iInput v-model="ruleForm.roundType" disabled></iInput> -->
            <iSelect
              v-model="ruleForm.roundType"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              disabled
            >
              <el-option
                v-for="item in roundTypeList"
                :key="item.roundType"
                :label="item.name"
                :value="item.roundType"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          <!-- 手工竞价类型 -->
          <iFormItem
            label="手工竞价类型"
            prop="manualBiddingType"
            :hideRequiredAsterisk="true"
          >
            <iLabel :label="language('BIDDING_SGJJLX', '手工竞价类型')" slot="label" required></iLabel>
            <iSelect
              v-model="ruleForm.manualBiddingType"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              :disabled="ruleForm.biddingStatus !== '01'"
              @change="handleChangeType"
            >
              <el-option
                v-for="item in manualBiddingTypeList"
                :key="item.manualBiddingType"
                :label="item.name"
                :value="item.manualBiddingType"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </div>
        <div class="form-row">
          <!-- 竞价开始时间 -->
          <iFormItem
            :label="language('BIDDING_JJKSSJ', '竞价开始时间')"
            prop="biddingBeginTime"
            :hideRequiredAsterisk="true"
          >
            <iLabel :label="language('BIDDING_JJKSSJ', '竞价开始时间')" slot="label" required></iLabel>
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.biddingBeginTime"
              :picker-options="pricingBeginTimeOptions"
              :disabled="ruleForm.biddingStatus !== '01'"
              v-if="isBiddingDelay"
            />
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.biddingBeginTime"
              :picker-options="pricingBeginTimeOptions"
              v-else
            />
          </iFormItem>
          <!-- 竞价结束时间 -->
          <iFormItem
            v-if="ruleForm.manualBiddingType !== '02'"
            :label="language('BIDDING_JJJSSJ', '竞价结束时间')"
            prop="biddingEndTime"
          >
            <iLabel :label="language('BIDDING_JJJSSJ', '竞价结束时间')" slot="label" required></iLabel>
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.biddingEndTime"
              :picker-options="pricingEndTimeOptions"
              :disabled="ruleForm.biddingStatus !== '01'"
              v-if="isBiddingDelay"
            />
            <iDatePicker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:00"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.biddingEndTime"
              :picker-options="pricingEndTimeOptions"
              v-else
            />
          </iFormItem>
          <!-- 报价截止日期 -->
          <iFormItem label="报价截止日期" prop="pricingDeadline">
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
          <!-- 引用RFQ -->
          <iFormItem
            v-if="ruleForm.manualBiddingType === '02'"
            label="引用RFQ"
            :hideRequiredAsterisk="true"
          >
            <iLabel :label="language('BIDDING_YYRFQ', '引用RFQ')" slot="label"></iLabel>
            <iInput v-model="ruleForm.rfqCode" disabled></iInput>
          </iFormItem>
        </div>
        <div class="form-row">
          <!-- 引用RFQ -->
          <iFormItem
            v-if="ruleForm.manualBiddingType !== '02'"
            label="引用RFQ"
            :hideRequiredAsterisk="true"
          >
            <iLabel :label="language('BIDDING_YYRFQ', '引用RFQ')" slot="label"></iLabel>
            <iInput v-model="ruleForm.rfqCode" disabled></iInput>
          </iFormItem>
          <!-- 关联RFQ -->
          <iFormItem label="关联RFQ" :hideRequiredAsterisk="true">
            <iLabel :label="language('BIDDING_GLRFQ', '关联RFQ')" slot="label"></iLabel>
            <iSelect
              v-model="ruleForm.rfqs"
              value-key="rfqCode"
              placeholder="请关联"
              class="rfqs-search"
              filterable
              multiple
              :disabled="ruleForm.biddingStatus !== '01'"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
              <el-option
                v-for="item in rfqNameList"
                :key="item.rfqCode"
                :label="item.rfqCode"
                :value="item"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          <!-- 占位 -->
          <iFormItem v-if="ruleForm.manualBiddingType === '02'"></iFormItem>
          <!-- 占位 -->
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
import { iInput, iDatePicker, iFormItem, iLabel, iSelect } from "rise";
import {
  baseRules,
  manualBiddingTypeList,
  procureTypeList,
  roundTypeList,
} from "./data.js";
import { getRfqIdList } from "@/api/bidding/bidding";
import dayjs from "dayjs";

// 当format设置成"yyyy-MM-dd HH:mm"时，同时设置selectableRange会导致此刻按钮判断失败，点击无效
const { mountPicker } = iDatePicker.extends.mixins[0].methods;
iDatePicker.extends.mixins[0].methods.mountPicker = function() {
  mountPicker.apply(this, arguments);
  if(this.format !== 'yyyy-MM-dd HH:mm') return;
  this.picker.checkDateWithinRange = function(date) {
    return this.selectableRange.length > 0
      ? `${dayjs(date.getTime()).format("HH:mm:00")} - 23:59:59`
      : true;
  }
}

export default {
  components: {
    iInput,
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
      // let three = 3 * 24 * 3600 * 1000;
      let end =
        this.ruleForm.manualBiddingType == "01" ? 30 * 60 * 1000 : 60 * 1000;
      // let time = new Date(this.ruleForm.biddingEndTime).getTime() + three;
      let endTime = new Date(val).getTime() + end;
      // this.ruleForm.pricingDeadline = dayjs(time).format("YYYY-MM-DD HH:mm:00");
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
    "ruleForm.biddingEndTime"(val) {
      let three = 3 * 24 * 3600 * 1000;
       let time = new Date(val).getTime() + three;
       this.ruleForm.pricingDeadline = dayjs(time).format("YYYY-MM-DD HH:mm:00");
    }
  },
  data() {
    return {
      rules: baseRules,
      ruleForm: {},
      manualBiddingTypeList,
      procureTypeList,
      roundTypeList,
      rfqNameList: [],

      // pricingBeginTimeOptions: {

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
          let curDate = this.ruleForm.biddingBeginTime
            ? new Date(this.ruleForm.biddingBeginTime).getTime()
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
    pricingBeginTimeOptions() {
      return {
        selectableRange: [
          `${dayjs(new Date().getTime()).format("HH:mm:00")} - 23:59:59`,
        ],
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7;
        },
      };
    },
  },
  async mounted() {
    console.log(365,this.ruleForm)
    const res = await getRfqIdList({manualBiddingType:this.ruleForm.manualBiddingType});
    this.rfqNameList = (res?.data || []).map((code) => {
      return {
        biddingId: this.biddingId,
        rfqCode: code,
      };
    });
  },
   methods: {
    async handleChangeType(){
      this.ruleForm.rfqCode='';
      const res = await getRfqIdList({manualBiddingType:this.ruleForm.manualBiddingType});
      this.rfqNameList = (res.data || []).map((code) => {
      return {
        biddingId: this.biddingId,
        rfqCode: code,
      };
    });
    },
  }
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
