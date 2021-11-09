<template>
  <div>
    <basic-info v-model="ruleForm" v-if="ruleForm.roundType != '02'" />
    <project-info
      v-model="ruleForm"
      :yearsPlans="yearsPlans"
      :procurePlans="procurePlans"
    />
  </div>
</template>

<script>
import basicInfo from "./components/basicInfo.vue";
import projectInfo from "./components/projectInfo.vue";
import { getBiddingId, findMultiPrice } from "@/api/bidding/bidding";

export default {
  components: {
    basicInfo,
    projectInfo,
  },
  data() {
    return {
      id: 0,
      actived: -1,
      ruleForm: {},

      showBidNotice: false,

      yearsPlans: [],
      procurePlans: [],
    };
  },
  mounted() {
    this.handleSearchReset();
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    handleSearchReset() {
      let param = { id: this.id };
      this.query(param);
    },
    async query(e) {
      const res = await getBiddingId(e);
      this.$emit("change-title", res);
      const r = await findMultiPrice(e);
      this.ruleForm = {
        ...res,
        ...r,
        models: r.models.map((item) => item.modelCode),
        modelProjects: r.modelProjects.map((item) => item.projectCode),
      };

      const cutPricePlan = { title: this.language('BIDDING_JIANGJIAJIHUA',"降价计划") };
      const discountRate = { title: this.language('BIDDING_ZHEXIANLV',"折现率") };
      // 年降计划&折现率
      // if (r.yearsPlans.length) {
      //   r.yearsPlans?.forEach((item) => {
      //     cutPricePlan[`stage${item.stage}`] = item.cutPricePlan;
      //     discountRate[`stage${item.stage}`] = item.discountRate;
      //   });
      //   this.yearsPlans = [cutPricePlan, discountRate];
      // }

      // 采购计划
      if (r.procurePlans.length) {
        let o = r.procurePlans?.reduce((obj, item) => {
          if (!obj[item.productId]) {
            obj[item.productId] = {
              yearMonth: { title: "" },
              cutPricePlan: { title: "" },
            };
          }
          obj[item.productId].yearMonth[`stage${item.stage}`] =
            item.procureYearMonth.substring(0, 4) +
            item.procureYearMonth.substring(4, 7);
          obj[item.productId].cutPricePlan[`stage${item.stage}`] =
            item.cutPricePlan?item.cutPricePlan+'%':item.cutPricePlan;
          return obj;
        }, {});
        this.ruleForm.products?.forEach((item) => {
          this.procurePlans.push({
            ...o[item.id]?.yearMonth,
            title: item.fsnrGsnr,
          });
          this.procurePlans.push({
            ...o[item.id]?.cutPricePlan,
            title: item.productCode,
          });
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  .card--header {
    .card--header--item {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-direction: row;
      margin-bottom: 15px;
      min-height: 37px;
      .header--item--left {
        display: flex;
        .header--item--lable {
          ::v-deep .el-button {
            font-size: 0.9rem;
            background-color: #fff;
            color: #1763f7;
            box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
            border-color: transparent;
          }
        }

        .header--item--lable__left {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          min-width: 290px;
          margin-right: 10px;
        }
      }
      .header--item--left__btn {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;

        ::v-deep .el-button--default {
          min-width: 130px;
          margin-bottom: 10px;
          cursor: default;
        }
        ::v-deep .el-button.active {
          color: #1763f7;
          box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
          border-color: transparent;
        }
      }
      .header--item--left__tab {
        ::v-deep .el-button {
          margin-left: 2px;
          background-color: #fcfdfd;
          color: #ccc;
        }
      }
    }
  }
}
</style>
