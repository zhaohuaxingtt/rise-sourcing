<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    :hideRequiredAsterisk="true"
    :disabled="ruleForm.biddingStatus !== '01'"
  >
    <div class="form-group">
      <iLabelML slot="label">
        <template v-solt="label">
          <iLabel label="最高报价" slot="label" class="label" required></iLabel>
        </template>
      </iLabelML>
      <div class="box-line">
        <iFormItem
          prop="biddingQuoteRule.highestOffer"
          :hideRequiredAsterisk="true"
        >
          <iInput
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
            v-model="ruleForm.biddingQuoteRule.highestOffer"
            class="input-wrap"
          ></iInput>
        </iFormItem>
      </div>
    </div>
    <div class="form-group">
      <iLabelML slot="label">
        <template v-solt="label">
          <iLabel label="幅度值" slot="label" class="label" required></iLabel>
        </template>
      </iLabelML>
      <div class="box-line">
        <iFormItem
          prop="biddingQuoteRule.amplitudeValue"
          :hideRequiredAsterisk="true"
        >
          <iInput
            v-model="ruleForm.biddingQuoteRule.amplitudeValue"
            class="input-wrap"
            maxlength="15"
          ></iInput>
        </iFormItem>
      </div>
    </div>
    <div class="form-group">
      <iLabelML slot="label">
        <template v-solt="label">
          <iLabel
            label="应标间隔数(秒)"
            slot="label"
            class="label"
            required
          ></iLabel>
        </template>
      </iLabelML>
      <div class="box-line">
        <iFormItem
          prop="biddingQuoteRule.biddingInterval"
          :hideRequiredAsterisk="true"
        >
          <iInput
            type="number"
            v-model="ruleForm.biddingQuoteRule.biddingInterval"
            class="input-wrap"
          ></iInput>
        </iFormItem>
      </div>
    </div>
    <div class="form-group">
      <iLabelML slot="label">
        <template v-solt="label">
          <iLabel
            label="自动标价设置"
            slot="label"
            class="label"
            required
          ></iLabel>
        </template>
      </iLabelML>
      <div class="box-align">
        <iFormItem
          prop="biddingQuoteRule.autoPriceLimit"
          :hideRequiredAsterisk="true"
        >
          <div>
            自动标价开始,折中<iInput
              v-model="ruleForm.biddingQuoteRule.autoPriceLimit"
              class="input-number80"
              maxlength="10"
            ></iInput
            >次后,无供应商应标,项目自动结束。
          </div>
        </iFormItem>
      </div>
    </div>
  </el-form>
</template>

<script>
import { iInput, iLabel, iFormItem } from "rise";
import iLabelML from "@/components/biddingComponents/iLabelML";
import { baseHeRules } from "./data.js";

export default {
  components: {
    iInput,
    iLabel,
    iLabelML,
    iFormItem,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
        this.rules = baseHeRules(this.ruleForm);
      },
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
    "ruleForm.biddingQuoteRule.amplitudeValue"(val) {
      if (val < this.ruleForm.biddingQuoteRule.highestOffer) {
        this.$refs["ruleForm"].clearValidate(["biddingQuoteRule.highestOffer"]);
      }
    },
    "ruleForm.biddingQuoteRule.highestOffer"(val) {
      if (val > this.ruleForm.biddingQuoteRule.amplitudeValue) {
        this.$refs["ruleForm"].clearValidate([
          "biddingQuoteRule.amplitudeValue",
        ]);
      }
    },
  },
  data() {
    return {
      rules: baseHeRules(this.ruleForm),
      ruleForm: {
        biddingQuoteRule: {},
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.hover-text {
  max-width: 270px;
  color: #999999;
  font-family: "PingFangSC-Regular";
  font-size: 14px;
  font-weight: 400;
  .hover-stick {
    color: #1660f1;
  }
}
::v-deep .el-form {
  position: relative;
  width: 100%;
  .el-popover {
    position: absolute;
    right: 0;
    max-width: 270px;
  }
  .pop-class {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .pop-class:last-child {
    margin-bottom: 0;
  }
}
.margin-double {
  margin: 0 12px;
}
.text-warn {
  color: #d50000;
}
.text-grey {
  color: #999;
}
.quote-regular {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 23px;
  height: 28px;
  font-family: "PingFangSC-Semibold";
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  white-space: nowrap;
}
::v-deep .title-header {
  width: 150px;
  .label {
    span {
      color: #4b4b4c;
      font-family: "PingFangSC-Regular";
      font-size: 16px !important;
      font-weight: 400;
      white-space: nowrap;
    }
    .start {
      color: red;
    }
  }
}
::v-deep .el-radio__label {
  color: #4b4b4c;
  font-family: "PingFangSC-Regular";
  font-size: 16px !important;
  font-weight: 400;
}

.box-line {
  width: 720px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input-wrap {
    width: 350px;
  }
  .input-select {
    width: 350px;
  }
}
::v-deep .box-line-handle {
  color: #4b4b4c;
  font-family: "PingFangSC-Regular";
  font-size: 16px !important;
  font-weight: 400;
  white-space: nowrap;
  .section-first {
    margin-bottom: 20px;
    color: #4b4b4c;
    font-family: "PingFangSC-Regular";
    font-size: 16px !important;
    font-weight: 400;
    white-space: nowrap;
  }
}

::v-deep .input-number80 {
  width: 80px;
  margin: 0 6px;
}
.box-align {
  .section-first {
    margin-bottom: 35px;
    color: #4b4b4c;
    font-family: "PingFangSC-Regular";
    font-size: 16px !important;
    font-weight: 400;
    white-space: nowrap;
  }
}
.form-group {
  display: flex;
  & + .form-group {
    margin-top: 20px;
  }
}
.el-form-item {
  margin-bottom: 0;
}
::v-deep .card {
  position: relative;
  width: 1740px;
}
.double-input {
  display: flex;
  .label {
    display: block;
  }
}
</style>
