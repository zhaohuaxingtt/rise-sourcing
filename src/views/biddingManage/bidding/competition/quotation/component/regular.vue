<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    :validate-on-rule-change="false"
    :hideRequiredAsterisk="true"
    :disabled="ruleForm.biddingStatus !== '01'"
  >
    <div class="form-group">
      <iLabelML showTip>
        <div class="hover-text">
          <span>{{language('BIDDING_YI','以')}}</span>
          <span class="hover-stick">{{language('BIDDING_CHANPINZONGJIA','产品总价')}}</span
          ><span>
            {{language('BIDDING_WJSGYSMCGXBJJCDZDZDYJDZJSHZBFBDXZ',
            '为基数，供应商每次更新报价价差的最低值都有绝对值（基数）或者百分比的限制')}}
          </span>
          <span>。</span>
        </div>
        <template v-solt="label">
          <iLabel :label="language('BIDDING_CHAJIAXIANZHI','差价限制')" slot="label" class="label" required></iLabel>
        </template>
      </iLabelML>
      <div class="box-line">
        <iFormItem
          prop="biddingQuoteRule.priceDiffLimit"
          :hideRequiredAsterisk="true"
        >
          <iSelect
            :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
            class="input-select"
            v-model="ruleForm.biddingQuoteRule.priceDiffLimit"
            @change="handleChangeSelect"
          >
            <el-option
              v-for="(item, index) of priceDiffLimitSelectList"
              :key="index"
              :label="item.name"
              :value="item.id"
              >{{ item.name }}</el-option
            >
          </iSelect>
        </iFormItem>
        <iFormItem
          prop="biddingQuoteRule.limitValue"
          :hideRequiredAsterisk="true"
        >
          <iInput
            class="input-wrap"
            v-model="ruleForm.biddingQuoteRule.limitValue"
            maxlength="15"
          ></iInput>
        </iFormItem>
      </div>
    </div>

    <div class="form-group">
      <iLabelML showTip>
        <div class="hover-text">
          <span>{{language('BIDDING_YONGYU','用于')}}</span>
          <span class="hover-stick">{{language('BIDDING_DYCBJ','第一次报价')}}</span>
          <span>。</span>
        </div>
        <template v-solt="label">
          <iLabel :label="language('BIDDING_BAOJIAFEIWEI','报价范围')" slot="label" class="label" required></iLabel>
        </template>
      </iLabelML>
      <div class="box-align">
        <iFormItem
          prop="biddingQuoteRule.quotationScope"
          :hideRequiredAsterisk="true"
        >
          <div class="section-first">
            <el-radio
              v-model="ruleForm.biddingQuoteRule.quotationScope"
              label="01"
              >{{language('BIDDING_TANGEBAOJIA','严格报价')}}<span class="text-span">{{language('BIDDING_（≦QICHUJIAGE）','（≦起初价格）')}}</span></el-radio
            >
          </div>
          <div class="section-second">
            <el-radio
              v-model="ruleForm.biddingQuoteRule.quotationScope"
              label="02"
              >{{language('BIDDING_DAZHIBAOJIA','大致报价（≦')}}
              <iFormItem
                v-if="ruleForm.biddingQuoteRule.quotationScope === '02'"
                prop="biddingQuoteRule.quotedValue"
                :hideRequiredAsterisk="true"
                class="inline-block"
                ><iInput
                  class="input-number70"
                  v-model="ruleForm.biddingQuoteRule.quotedValue"
                  oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
                ></iInput>
              </iFormItem>
              <iInput v-else class="input-number70" disabled></iInput>
              {{language('BIDDING_xQICHUBAOJIA','x起初报价）')}}</el-radio
            >
          </div>
        </iFormItem>
      </div>
    </div>

    <div class="form-group">
      <iLabelML>
        <template v-solt="label">
          <iLabel :label="language('BIDDING_BAOJIADUIXIANG','报价对象')" slot="label" class="label"></iLabel>
        </template>
      </iLabelML>
      <div class="box-line">
        <iFormItem
          prop="biddingQuoteRule.priceDiffObject"
          :hideRequiredAsterisk="true"
        >
          <iSelect
            :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
            class="input-wrap"
            v-model="ruleForm.biddingQuoteRule.priceDiffObject"
          >
            <el-option
              v-for="(item, index) of priceDiffObjectSelectList"
              :key="index"
              :label="item.name"
              :value="item.id"
              >{{ item.name }}</el-option
            >
          </iSelect>
        </iFormItem>
      </div>
    </div>

    <div class="form-group">
      <iLabelML showTip>
        <div class="hover-text">
          <span>{{language('BIDDING_GSYSRD', '供应商输入的')}}</span>
          <span class="hover-stick"
            >{{language('BIDDING_BJZJDYJJZSDDTZFDSX', '报价（总价）大于警戒 值设定的调整幅度上限')}}</span
          >
          <span>{{language('BIDDING_SXTHTXGYSSFQRGBJ', '时，系统会提 醒供应商是否确认该报价。')}}</span>
        </div>
        <template v-solt="label">
          <iLabel :label="language('BIDDING_JINGJIEZHI', '警戒值')" slot="label" class="label"></iLabel>
        </template>
      </iLabelML>
      <div class="box-line">
        <div class="box-line-handle">
          {{language('BIDDING_TIAOZHENGFUDU', '调整幅度')}}<iFormItem
            prop="biddingQuoteRule.alertPercentage"
            :hideRequiredAsterisk="true"
            class="inline-block"
            ><iInput
              class="input-number70"
              v-model="ruleForm.biddingQuoteRule.alertPercentage"
            ></iInput></iFormItem
          >{{language('BIDDING_%SHIJIZHI', '%，实际值')}}<iFormItem
            prop="biddingQuoteRule.actualValue"
            :hideRequiredAsterisk="true"
            class="inline-block"
            ><iInput
              class="input-number100"
              :value="ruleForm.biddingQuoteRule.actualValue"
              disabled
            ></iInput></iFormItem
          >{{language('BIDDING_RENMINGBI', '人民币')}}
        </div>
      </div>
    </div>

    <div class="form-group">
      <iLabelML>
        <template v-solt="label">
          <iLabel :label="language('BIDDING_DYCBJXZ', '第一次报价限制')" slot="label" class="label"></iLabel>
        </template>
      </iLabelML>
      <div class="box-line">
        <div class="box-line-handle">
          {{language('BIDDING_ZJJKSH', '在竞价开始后')}}<iFormItem
            prop="biddingQuoteRule.firstOfferLimit"
            :hideRequiredAsterisk="true"
            class="inline-block"
            ><iInput
              class="input-number70"
              v-model="ruleForm.biddingQuoteRule.firstOfferLimit"
              maxlength="10"
              :required="ruleForm.roundType === '03' ? true : false"
            ></iInput></iFormItem
          >(<span class="text-warn">{{language('BIDDING_ZHENGSHU', '整数')}}</span>){{language('BIDDING_FZBXBJ，FZZQQCL。', '分钟必须报价，否则作弃权处理。')}}
        </div>
      </div>
    </div>
    <div class="form-group">
      <iLabelML>
        <!-- <div class="hover-text">
          <span>供应商对红绿灯名次区间/偏离比例 的</span>
          <span class="hover-stick">的具体定义不可见</span>
        </div> -->
        <template v-solt="label">
          <iLabel :label="language('BIDDING_LXMPXZ', '连续排名限制')" slot="label" class="label"></iLabel>
        </template>
      </iLabelML>
      <div class="box-line">
        <div class="box-line-handle">
          {{language('BIDDING_GYSBJ', '供应商报价')}}<iFormItem
            prop="biddingQuoteRule.conRankLimit"
            :hideRequiredAsterisk="true"
            class="inline-block"
            ><iInput
              class="input-number70"
              v-model="ruleForm.biddingQuoteRule.conRankLimit"
              maxlength="10"
            ></iInput></iFormItem
          >(<span class="text-warn">{{language('BIDDING_ZHENGSHU', '整数')}}</span
          >){{language('BIDDING_C，PMJWZHYM，ZZDZWQQCL。', '次，排名均为最后一名，则自动作为弃权处理。')}}
        </div>
      </div>
    </div>

    <div class="form-group">
      <iLabelML>
        <template v-solt="label">
          <iLabel :label="language('BIDDING_PAIMINGGUIZE', '排名规则')" slot="label" class="label"></iLabel>
        </template>
      </iLabelML>
      <div class="box-align">
        <iFormItem
          prop="biddingQuoteRule.rankRule"
          :hideRequiredAsterisk="true"
        >
          <div class="section-first">
            <el-radio v-model="ruleForm.biddingQuoteRule.rankRule" label="01"
              >{{language('BIDDING_DIJIACIWEI', '低价位次')}}<span class="text-grey"
                >{{language('BIDDING_BKLBJSJJGXTJPMXGRGLGGYSBJZDZXSDEM', 
                '（不考虑报价时间，价格相同即排名相同；如果两个供应商报价最低，则显示第二名）')}}</span
              ></el-radio
            >
          </div>
          <div class="section-second">
            <el-radio v-model="ruleForm.biddingQuoteRule.rankRule" label="02"
              >{{language('BIDDING_SHIJIANYOUXIAN', '时间优先')}}<span class="text-grey"
                >{{language('BIDDING_JGXTZABJSJPX', '（价格相同，则按报价时间排序）')}}</span
              ></el-radio
            >
          </div>
        </iFormItem>
      </div>
    </div>
    
    <!-- <div class="form-group" v-if="rankDisplayRuleSelectList.length > 0">
      <iLabelML showTip>
        <div class="hover-text">
          <span>{{language('BIDDING_GYSDHLDMCQJ/PLBLD', '供应商对红绿灯名次区间/偏离比例的')}}</span>
          <span class="hover-stick">{{language('BIDDING_JTDYBKJ', '具体定义不可见')}}</span>
          <span>。</span>
        </div>
        <template v-solt="label">
          <iLabel :label="language('BIDDING_PMXSGZ', '排名显示规则')" slot="label" class="label"></iLabel>
        </template>
      </iLabelML>
      <div class="box-line">
        <div class="box-line-handle">
          <div class="section-first">
            <iFormItem
              prop="biddingQuoteRule.rankDisplayRule"
              :hideRequiredAsterisk="true"
            >
              <iSelect
                :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
                class="input-wrap"
                v-model="ruleForm.biddingQuoteRule.rankDisplayRule"
              >
                <el-option
                  v-for="(item, index) of rankDisplayRuleSelectList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                  >{{ item.name }}</el-option
                >
              </iSelect>
            </iFormItem>
          </div>
          <div
            v-if="ruleForm.biddingQuoteRule.rankDisplayRule === '02'"
            class="section-second"
          >
            {{language('BIDDING_PMQJDLQJ', '排名区间，绿灯区间')}}(<span class="text-warn">{{language('BIDDING_ZHENGSHU', '整数')}}</span>)<iFormItem
              prop="biddingQuoteRule.greenLightFrom"
              :hideRequiredAsterisk="true"
              class="inline-block"
              ><iInput
                v-model="ruleForm.biddingQuoteRule.greenLightFrom"
                @change="handleChangeLightArea"
                class="input-number60"
                maxlength="3"
              ></iInput></iFormItem
            ><span class="margin-double">-</span
            ><iFormItem
              prop="biddingQuoteRule.greenLightTo"
              :hideRequiredAsterisk="true"
              class="inline-block"
              ><iInput
                class="input-number60"
                v-model="ruleForm.biddingQuoteRule.greenLightTo"
                @change="handleChangeLightArea"
                maxlength="3"
              ></iInput></iFormItem
            ><span class="marginLeft50">{{language('BIDDING_HUANGDENGQUJIAN', '黄灯区间')}}</span
            ><iFormItem
              prop="biddingQuoteRule.yellowLightFrom"
              :hideRequiredAsterisk="true"
              class="inline-block"
              ><iInput
                class="input-number60"
                v-model="ruleForm.biddingQuoteRule.yellowLightFrom"
                @change="handleChangeLightArea"
                maxlength="3"
              ></iInput></iFormItem
            ><span class="margin-double">-</span
            ><iFormItem
              prop="biddingQuoteRule.yellowLightTo"
              :hideRequiredAsterisk="true"
              class="inline-block"
              ><iInput
                class="input-number60"
                v-model="ruleForm.biddingQuoteRule.yellowLightTo"
                @change="handleChangeLightArea"
                maxlength="3"
              ></iInput
            ></iFormItem>
            <span class="marginLeft50">{{language('BIDDING_HONGDENGQUJIAN', '红灯区间')}}</span
            ><iFormItem
              prop="biddingQuoteRule.redLightFrom"
              :hideRequiredAsterisk="true"
              class="inline-block"
              ><iInput
                class="input-number60"
                v-model="ruleForm.biddingQuoteRule.redLightFrom"
                @change="handleChangeLightArea"
                maxlength="3"
              ></iInput></iFormItem
            ><span class="margin-double">-</span
            ><iFormItem
              prop="biddingQuoteRule.redLightTo"
              :hideRequiredAsterisk="true"
              class="inline-block"
              ><iInput
                class="input-number60"
                v-model="ruleForm.biddingQuoteRule.redLightTo"
                @change="handleChangeLightArea"
                maxlength="3"
              ></iInput
            ></iFormItem>
          </div>
          <div
            v-else-if="ruleForm.biddingQuoteRule.rankDisplayRule === '03'"
            class="section-second"
          >
            {{language('BIDDING_MUBIAOJIA', '目标价')}}
            <iFormItem
              prop="biddingQuoteRule.targetPrice"
              :hideRequiredAsterisk="true"
              class="inline-block"
              ><iInput
                class="input-number200"
                oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
                v-model="ruleForm.biddingQuoteRule.targetPrice"
                type="number"
              ></iInput
            ></iFormItem>
            {{language('BIDDING_PIANLIMUBIAOJIA', '偏离目标价')}}
            <iFormItem
              prop="biddingQuoteRule.greenDeviationValue"
              :hideRequiredAsterisk="true"
              class="inline-block"
              ><iInput
                class="input-number60"
                v-model="ruleForm.biddingQuoteRule.greenDeviationValue"
                @change="handleChangeLightDeviation"
              ></iInput></iFormItem
            >%{{language('BIDDING_YJXSLD', '以内，显示绿灯')}}<span class="marginLeft50">{{language('BIDDING_PIANLIMUBIAOJIA', '偏离目标价')}}</span
            ><iFormItem
              prop="biddingQuoteRule.yellowDeviationValue"
              :hideRequiredAsterisk="true"
              class="inline-block"
              ><iInput
                class="input-number60"
                v-model="ruleForm.biddingQuoteRule.yellowDeviationValue"
                @change="handleChangeLightDeviation"
              ></iInput></iFormItem
            >%{{language('BIDDING_YJXSHD', '以内，显示黄灯')}}<span class="marginLeft50">{{language('BIDDING_FZXSHD', '否则显示红灯')}}</span>
          </div>
        </div>
      </div>
    </div> -->

    <div class="form-group">
      <iLabelML showTip>
        <div class="hover-text">
          <span>{{language('BIDDING_GONGYINGSHANG', '供应商')}}</span>

          <span class="hover-stick">{{language('BIDDING_BUKEJIAN', '不可见')}}</span>
          <span>。</span>
        </div>
        <template v-solt="label">
          <iLabel :label="language('BIDDING_PMXSXZ', '排名显示限制')" slot="label" class="label"></iLabel>
        </template>
      </iLabelML>
      <div class="box-align">
        <iFormItem
          prop="biddingQuoteRule.rankDisplayLimit"
          :hideRequiredAsterisk="true"
          class="inline-block"
        >
          <div class="section-first">
            <el-radio
              v-model="ruleForm.biddingQuoteRule.rankDisplayLimit"
              label="01"
              >{{language('BIDDING_JIAGEDADAO', '价格达到')}}
              <iFormItem
                v-if="ruleForm.biddingQuoteRule.rankDisplayLimit === '01'"
                prop="biddingQuoteRule.priceLimit"
                :hideRequiredAsterisk="true"
                class="inline-block"
                ><iInput
                  class="input-number70"
                  v-model="ruleForm.biddingQuoteRule.priceLimit"
                  maxlength="15"
                ></iInput>
              </iFormItem>
              <iInput v-else class="input-number70" disabled></iInput>
              {{language('BIDDING_HCNXSJJPM', '后，才能显示竞价排名')}}</el-radio
            >
          </div>
          <div class="section-second section-second_bot">
            <el-radio
              v-model="ruleForm.biddingQuoteRule.rankDisplayLimit"
              label="02"
              >{{language('BIDDING_HPAIMINGZAI', '排名在')}}
              <iFormItem
                v-if="ruleForm.biddingQuoteRule.rankDisplayLimit === '02'"
                prop="biddingQuoteRule.rankLimit"
                :hideRequiredAsterisk="true"
                class="inline-block"
                ><iInput
                  class="input-number70"
                  v-model="ruleForm.biddingQuoteRule.rankLimit"
                  maxlength="9"
                ></iInput
              ></iFormItem>
              <iInput v-else class="input-number70" disabled></iInput>
              (<span class="text-warn">{{language('BIDDING_ZHENGSHU', '整数')}}</span
              >){{language('BIDDING_MYQCNXSJJPM', '名以前，才能显示竞价排名')}}</el-radio
            >
          </div>
        </iFormItem>
      </div>
    </div>
  </el-form>
</template>

<script>
import { iInput, iFormItem, iLabel, iSelect } from "rise";
import iLabelML from "@/components/biddingComponents/iLabelML";
import Big from "big.js";
import {
  priceDiffLimitSelectList,
  rankDisplayRuleSelectList,
  priceDiffObjectSelectList,
  baseRules,
  currencyMultipleLib,
} from "./data.js";

export default {
  components: {
    iInput,
    iFormItem,
    iLabel,
    iLabelML,
    iSelect,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    biddingQuoteRule: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
        this.rules = baseRules(this);
      },
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
    "ruleForm.biddingQuoteRule.alertPercentage": {
      immediate: true,
      handler(val) {
        if(val){
          this.$set(
            this.ruleForm?.biddingQuoteRule,
            "actualValue",
            val == "" || isNaN(Number(val))
              ? ""
              : Big(this.ruleForm?.totalPrices|| 0)
                  .times(val)
                  .div(100)
                  .toFixed(2)
          );
        }
      },
    },
    "ruleForm.biddingQuoteRule.quotationScope"(val) {
      this.ruleForm.biddingQuoteRule.quotedValue = "";
    },
    "ruleForm.biddingQuoteRule.rankDisplayLimit"(val) {
      if (val === "01") {
        this.ruleForm.biddingQuoteRule.rankLimit = "";
      } else {
        this.ruleForm.biddingQuoteRule.priceLimit = "";
      }
    },
    "ruleForm.biddingQuoteRule.greenLightTo"(val) {
      const { greenLightFrom } = this.ruleForm.biddingQuoteRule;
      if (!(greenLightFrom || 0 === greenLightFrom) && (val || 0 === val)) {
        this.$set(this.ruleForm.biddingQuoteRule, "greenLightFrom", 1);
      }
    },
    "ruleForm.biddingQuoteRule.yellowLightTo"(val) {
      const { greenLightTo = "", yellowLightFrom = "" } =
        this.ruleForm.biddingQuoteRule;
      if (
        !(yellowLightFrom || 0 === yellowLightFrom) &&
        (val || 0 === val) &&
        !isNaN(greenLightTo)
      ) {
        this.$set(
          this.ruleForm.biddingQuoteRule,
          "yellowLightFrom",
          Number(greenLightTo) + 1
        );
      }
    },
    "ruleForm.biddingQuoteRule.redLightTo"(val) {
      const { yellowLightTo = "", redLightFrom = "" } =
        this.ruleForm.biddingQuoteRule;
      if (
        !(redLightFrom || 0 === redLightFrom) &&
        (val || 0 === val) &&
        !isNaN(yellowLightTo)
      ) {
        this.$set(
          this.ruleForm.biddingQuoteRule,
          "redLightFrom",
          Number(yellowLightTo) + 1
        );
      }
    },
    "ruleForm.biddingQuoteRule.rankDisplayRule"(val) {
      if (val === "03" || val === "02") {
        this.ruleForm.biddingQuoteRule = {
          ...this.ruleForm.biddingQuoteRule,
          ...this.biddingQuoteRule,
        };
        this.$refs["ruleForm"].clearValidate([
          "biddingQuoteRule.greenLightFrom",
          "biddingQuoteRule.greenLightTo",
          "biddingQuoteRule.yellowLightFrom",
          "biddingQuoteRule.yellowLightTo",
          "biddingQuoteRule.redLightFrom",
          "biddingQuoteRule.redLightTo",
          "biddingQuoteRule.greenDeviationValue",
          "biddingQuoteRule.yellowDeviationValue",
        ]);
      }
    },
    "ruleForm.biddingQuoteRule.targetPrice"(val) {
      console.log(val);
      if (val === null || val === "" || val === undefined) {
        this.$refs["ruleForm"].clearValidate([
          "biddingQuoteRule.greenDeviationValue",
          "biddingQuoteRule.yellowDeviationValue",
        ]);
      }
    },
  },
  data() {
    return {
      rules: baseRules(this),
      ruleForm: {},

      priceDiffLimitSelectList,
      priceDiffObjectSelectList,
    };
  },
  computed: {
    rankDisplayRuleSelectList() {
      if (this.ruleForm.resultOpenForm === "01") {
        return rankDisplayRuleSelectList.slice(0, 1);
      }
      if (this.ruleForm.resultOpenForm === "02") {
        return rankDisplayRuleSelectList.slice(1, 3);
      }
      return [];
    },
    beishu() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.beishu || 1;
    },
    realTotalPrices() {
      return isNaN(Number(this.ruleForm.totalPrices)) ||
        isNaN(Number(this.beishu))
        ? 0
        : Big(Number(this.ruleForm.totalPrices))
            .times(Number(this.beishu))
            .toNumber();
    },
  },
  methods: {
    handleChangeLightArea() {
      this.$refs["ruleForm"].validateField(
        [
          "biddingQuoteRule.greenLightTo",
          "biddingQuoteRule.yellowLightFrom",
          "biddingQuoteRule.yellowLightTo",
          "biddingQuoteRule.redLightFrom",
          "biddingQuoteRule.redLightTo",
        ],
        (error) => {
          !error &&
            this.$refs["ruleForm"].validateField(
              "biddingQuoteRule.greenLightFrom"
            );
        }
      );
    },
    handleChangeLightDeviation() {
      this.$refs["ruleForm"].validateField([
        "biddingQuoteRule.greenDeviationValue",
        "biddingQuoteRule.yellowDeviationValue",
      ]);
    },
    handleChangeSelect() {
      // this.ruleForm.biddingQuoteRule.limitValue = "";
      this.$set(this.ruleForm.biddingQuoteRule, "limitValue", "");
    },
  },
};
</script>
<style lang="scss" scoped>
.inline-block {
  display: inline-block;
}
.text-span {
  color: #4b4b4c;
}
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
.marginLeft50 {
  margin-left: 50px;
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
.section-second_bot {
  margin-top: 20px;
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
      /* color:red; */
      /* line-height: 16px; */
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
::v-deep .el-form-item {
  margin-bottom: 0;
}
::v-deep .box-line-handle {
  color: #4b4b4c;
  font-family: "PingFangSC-Regular";
  font-size: 16px !important;
  font-weight: 400;
  white-space: nowrap;
  .section-first {
    margin-bottom: 20px;
  }
}

::v-deep .input-number70 {
  width: 70px;
  margin: 0 6px;
}
::v-deep .input-number60 {
  width: 60px;
  margin: 0 6px;
}
::v-deep .input-number100 {
  width: 100px;
  margin: 0 6px;
}
::v-deep .input-number200 {
  width: 200px;
  margin: 0 6px;
  margin-right: 3rem;
}
.box-align {
  .section-first {
    margin-bottom: 10px;
  }
}
::v-deep .form-group {
  display: flex;
}
.form-group + .form-group {
  margin-top: 20px;
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
