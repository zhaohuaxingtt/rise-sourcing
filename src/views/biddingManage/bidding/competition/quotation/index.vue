<template>
  <iCard class="card">
    <div class="card--header">
      <div class="card--header--item">
        {{ language('BIDDING_BAOJIAGUIZE', '报价规则') }}
      </div>
      <div class="card--header--item card--header--item--btn">
        <template v-if="ruleForm.biddingStatus !== '01'"></template>
        <template v-else>
          <iButton @click="handlePre">{{ language('BIDDING_SHANGYIBU', '上一步') }}</iButton>
          <iButton @click="handleSearchReset">{{ language('BIDDING_CHONGZHI','重置')}}</iButton>
          <iButton @click="handleNext">{{ language('BIDDING_WANCHENGSHEZHI', '完成设置') }}</iButton>
        </template>
      </div>
    </div>
    <div class="card--body">
      <component
        ref="regular"
        v-if="regular"
        :is="regular"
        v-model="ruleForm"
        :biddingQuoteRule="biddingQuoteRule"
      ></component>
    </div>
  </iCard>
</template>
<script>
import { iCard, iButton } from "rise";
import regular from "./component/regular.vue";
import regularHe from "./component/regularHe.vue";
import { findQuoteRule, saveBiddingQuoteRule } from "@/api/bidding/bidding";

export default {
  components: {
    iCard,
    iButton,

    regular,
    regularHe,
  },
  data() {
    return {
      id: 0,
      ruleForm: {},
      biddingQuoteRule: {
        greenLightFrom: "",
        greenLightTo: "",
        greenDeviationValue: "", //绿灯偏离值
        yellowLightFrom: "",
        yellowLightTo: "",
        yellowDeviationValue: "", //黄灯偏离值
        redLightFrom: "",
        redLightTo: "",
        redDeviationValue: "", //红灯偏离值
        biddingId: "",
      },
    };
  },
  computed: {
    regular() {
      const { manualBiddingType, roundType } = this.ruleForm;
      if ("03" === roundType) return "regular";
      else if ("04" === roundType) return "regularHe";
      else if ("05" === roundType) {
        if ("01" === manualBiddingType) return "regular";
        if ("02" === manualBiddingType) return "regularHe";
      }
      return "";
    },
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.handleSearchReset();
  },
  methods: {
    handlePre() {
      this.submitForm(() => {
        this.$router.push({
          name: "biddingCompetitionProject",
        });
      });
    },
    handleNext() {
      this.$confirm(this.language('BIDDING_SFBCGBJXX',"是否保存该报价信息？"), this.language('BIDDING_TISHI',"提示"), {
        confirmButtonText: this.language('BIDDING_SHI',"是"),
        cancelButtonText: this.language('BIDDING_FOU',"否"),
        type: "warning",
      })
        .then(() => {
          this.submitForm(() => {
            localStorage.setItem('close','close')
            window.close()
            // this.$router.push({
            //   name: "biddingProjectInquiry",
            // });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSearchReset() {
      let param = { id: this.id };
      this.query(param);
    },
    submitForm(callback) {
      this.$refs["regular"].$refs["ruleForm"].validate((valid) => {
        if (valid) {
          const formData = this.ruleForm;
          saveBiddingQuoteRule(formData)
            .then((res) => {
              if (res) {
                this.$message.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
                callback && callback();
              } else {
                this.$message.error(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
              }
            })
            .catch((err) => {
              console.log(err);
            });
          // this.$confirm("是否保存该报价信息？", "提示", {
          //   confirmButtonText: "是",
          //   cancelButtonText: "否",
          //   type: "warning",
          // })
          //   .then(() => {
          //     //保存
          //     const formData = this.ruleForm;
          //     return saveBiddingQuoteRule(formData);
          //   })
          //   .then((res) => {
          //     if (res) {
          //       this.$message.success("保存成功");
          //       callback && callback();
          //     } else {
          //       this.$message.error("保存失败");
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        } else {
          return;
        }
      });
    },
    query(payload) {
      findQuoteRule(payload)
        .then((res) => {
          this.$emit("change-title", res);
          this.ruleForm = {
            ...res,
            biddingQuoteRule: {
              priceDiffLimit: "01",
              priceDiffObject: "01",
              rankDisplayRule:
                {
                  "01": "01",
                  "02": "02",
                }[res.resultOpenForm] || "",
              quotationScope: "01",
              rankRule: "01",
              rankDisplayLimit: "01",
              quotedValue: "",
              rankLimit: "",
              priceLimit: "",
              alertPercentage: "10",
              rankShowRule: "01",
              ...res.biddingQuoteRule,
            },
          };
          this.biddingQuoteRule = {
            ...this.biddingQuoteRule,
            greenLightFrom: res.biddingQuoteRule.greenLightFrom,
            greenLightTo: res.biddingQuoteRule.greenLightTo,
            yellowLightFrom: res.biddingQuoteRule.yellowLightFrom,
            yellowLightTo: res.biddingQuoteRule.yellowLightTo,
            redLightFrom: res.biddingQuoteRule.redLightFrom,
            redLightTo: res.biddingQuoteRule.redLightTo,
            greenDeviationValue: res.biddingQuoteRule.greenDeviationValue,
            yellowDeviationValue: res.biddingQuoteRule.yellowDeviationValue,
          };
          if (res.resultOpenForm === "01") {
            this.ruleForm.biddingQuoteRule.rankDisplayRule = "01";
          }
          if (res.resultOpenForm === "02") {
            if (res.biddingQuoteRule.rankDisplayRule === "01") {
              this.ruleForm.biddingQuoteRule.rankDisplayRule = "02";
            }
          }
        })
        .catch((err) => {
          this.tableLoading = false;
        });
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
  }
  .card--body {
    margin-top: 20px;
  }
}
</style>
