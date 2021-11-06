<template>
  <div>
    <iCard :title="$t('项目信息')" class="card">
      <template slot="header-control">
        <i
          @click="toggle"
          class="el-icon-arrow-up icon margin-left20 cursor"
          :class="{ rotate: hidens }"
        ></i>
      </template>

      <div class="card--body">
        <el-form
          :model="ruleForm"
          label-width="9rem"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
        >
          <div class="form">
            <div class="input-box">
              <div class="form-row">
                <iFormItem label="起始总价">
                  <iLabel :label="$t('起始总价')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input__center"
                      :value="
                        ruleForm.supplierOffer.offerPrice
                          ? ruleForm.supplierOffer.offerPrice + currencyMultiple
                          : ''
                      "
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <iFormItem label="大写">
                  <iLabel :label="$t('大写')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="totalPriceFlag ? '零元整' : numberUppercase"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem
                  label="起始年月"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel :label="$t('起始年月')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="ruleForm.beginMonth"
                      disabled
                    ></iInput>
                  </div>
                </iFormItem>
                <iFormItem label="车型">
                  <iLabel :label="$t('车型')" slot="label"></iLabel>
                  <div class="form-item-tag">
                    <el-tag :key="tag" v-for="tag in modelsOption">
                      {{ tag.name }}
                    </el-tag>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem label="车型项目">
                  <iLabel :label="$t('车型项目')" slot="label"></iLabel>
                  <div class="form-item-tag">
                    <el-tag :key="tag" v-for="tag in modelProjectsOption">
                      {{ tag.name }}
                    </el-tag>
                  </div>
                </iFormItem>
                <iFormItem />
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </iCard>

    <iCard :title="$t('产品信息')" class="card">
      <div class="card--body">
        <commonTable
          ref="tableDataForm"
          :tableData="this.ruleForm.supplierProducts"
          :tableTitle="
            ruleForm.biddingMode === '03' ? multiPleTableTitle : unitTableTitle
          "
          :selection="false"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- 操作 -->
          <template slot="caozuo" slot-scope="scope">
            <span>
              <a
                href="javascript:void(0)"
                class="open-link-text"
                @click="handleClickOne(scope)"
              >
                <i class="el-icon-edit"> </i>
              </a>
            </span>
          </template>
        </commonTable>
      </div>
    </iCard>
    <iCard class="card" v-if="ruleForm.biddingMode === '03'">
      <div class="card--header">
        <div class="card--header--item card--header--item__top">
          <div>{{ $t("年降计划 & 折现率") }}</div>
        </div>
      </div>
      <div class="card--body">
        <commonTable
          ref="yearsPlanTableForm"
          :tableData="yearsPlanTable"
          :tableTitle="yearsPlanTableColumn"
          :selection="false"
          :type="'1'"
          :tableLoading="tableLoading"
        >
        </commonTable>
      </div>
    </iCard>

    <iCard class="card" v-if="ruleForm.biddingMode === '03'">
      <div class="card--header">
        <div class="card--header--item card--header--item__top">
          <div>{{ $t("年降计划明细") }}</div>
        </div>
      </div>
      <div id="purchasePlanTableForm" class="card--body">
        <commonTable
          ref="purchasePlanTableForm"
          :tableData="purchasePlanTable"
          :tableTitle="yearsPlanTableColumn"
          :selection="false"
          :type="'2'"
          :isSupplier="isSupplier"
          :tableLoading="tableLoading"
          :class="role === 'supplier' ? 'form-item-none' : ''"
        >
        </commonTable>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, iFormItem, iLabel } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import {
  multiPleTableTitle,
  unitTableTitle,
  currencyMultipleLib,
  yearsPlanTableColumn,
} from "./data";
import { digitUppercase } from "@/utils/digitUppercase";
import {
  getModels,
  getProjects,
  getCurrencyUnit,
  getUnits,
} from "@/api/mock/mock";
import Big from "big.js";
import { findSupplierOffer } from "@/api/bidding/bidding";

export default {
  components: {
    iCard,
    iInput,
    iFormItem,
    iLabel,
    commonTable,
  },
  props: {
    id: String,
    initData: {
      type: Object,
      default: () => ({}),
    },
    supplierCode: {
      type: String,
    },
    supplierOfferId: {
      type: String,
    },
  },
  data() {
    return {
      hidens: false,
      totalPriceFlag: false,
      tableLoading: false,
      ruleForm: {
        beginMonth: "",
        modelProjects: [],
        models: [],
        biddingProducts: [],
        supplierProducts: [],
        totalPrices: 0,
        supplierOffer: {},
      },
      multiPleTableTitle,
      unitTableTitle,
      yearsPlanTableColumn,
      currencyMultipleLib,
      quantityUnit: [],
      selectedTableData: [],
      modelsOption: [],
      modelProjectsOption: [],
      currencyUnit: {},
      yearsPlanTable: [],
      purchasePlanTable: [],
    };
  },
  mounted() {
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
    getUnits({}).then((res) => {
      this.quantityUnit = res.data;
    });
    this.handleSearchReset();
  },
  created() {
    this.id = this.$route.params.id;
  },
  computed: {
    role() {
      return this.$route.meta.role;
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
        Big(this.ruleForm.supplierOffer.offerPrice || 0)
          .times(this.beishu)
          .toNumber()
      );
    },
  },
  methods: {
    handleSearchReset() {
      let param = { biddingId: this.id, supplierOfferId: this.supplierOfferId };
      this.query(param);
    },
    dividedBeiShu(val){
     return Big(val).div(this.beishu).toNumber()
    },
    async query(e) {
      // 根据 ID 获取竞价大厅报价单列表数据
      const res = await findSupplierOffer(e);
      this.$emit("change-title", res);
      this.updateRuleForm(res);
    },

    toggle() {
      this.hidens = !this.hidens;
      this.$emit("toggle", this.hidens);
    },
    //产品操作事件
    handleClickOne(scope) {
      this.$nextTick(() => {
        var tr = document.querySelectorAll(
          "#purchasePlanTableForm .el-table__body-wrapper tr"
        )[scope.row.index * 3];
        document.querySelector(".routerpage").scrollTop =
          tr.getBoundingClientRect().top +
          document.querySelector(".routerpage").scrollTop -
          document.querySelector(".routerpage").getBoundingClientRect().top;
      });
    },

    handleAddYearPlan() {
      let obj = {
        title: "折现率",
        stage1: 1,
        stage2: 0.9,
        stage3: 0.81,
        stage4: 0.73,
        stage5: 0.66,
        stage6: 0.59,
        stage7: 0.53,
        stage8: 0.48,
        stage9: 0.43,
        stage10: 0.39,
        stage11: 0.35,
        stage12: 0.31,
        stage13: 0.28,
        stage14: 0.25,
        stage15: 0.23,
      };
      this.yearsPlanTable.splice(1, 0, obj);
    },
    updateRuleForm(data) {
      this.ruleForm = {
        ...data,
      };
      const supplierOffer = {
        ...this.ruleForm.supplierOffer,
        offerPrice: this.dividedBeiShu(this.ruleForm.supplierOffer.offerPrice)
      }
      const totalPrices = this.dividedBeiShu(this.ruleForm.totalPrices)
      this.ruleForm = {... this.ruleForm,supplierOffer,totalPrices}

      getModels().then((res) => {
        data.models.forEach((item) => {
          this.modelsOption.push(
            ...res?.data?.filter((e) => e.code === item.modelCode)
          );
        });
      });

      getProjects().then((res) => {
        data.modelProjects.forEach((item) => {
          this.modelProjectsOption.push(
            ...res?.data?.filter((e) => e.code === item.projectCode)
          );
        });
      });
      this.ruleForm.supplierProducts?.forEach((items) => {
        let o = items.supplierPlans.reduce((obj, item) => {
          if (!obj[item.supplierProdId]) {
            obj[item.supplierProdId] = {
              yearMonth: { title: "" },
              cutPricePlan: { title: "" },
              procureNum: { title: "" },
            };
          }
          obj[item.supplierProdId].yearMonth[`stage${item.stage}`] =
            item.procureYearMonth;
          obj[item.supplierProdId].cutPricePlan[`stage${item.stage}`] =
            item.cutPricePlan ;
          obj[item.supplierProdId].procureNum[`stage${item.stage}`] =
            item.procureNum || 0;
          return obj;
        }, {});
        if (o[items.id] !== undefined) {
          this.purchasePlanTable.push({
            ...o[items.id].yearMonth,
            title: items.fsnrGsnr,
          });
          this.purchasePlanTable.push({
            ...o[items.id].cutPricePlan,
            title: items.productCode,
          });
          this.purchasePlanTable.push({ ...o[items.id].procureNum, title: "" });
        }
      });
      this.handleAddYearPlan();
      let obj = { title: "降价计划" };
      if (this.ruleForm.yearsPlans?.length) {
        this.ruleForm.yearsPlans.forEach((item) => {
          obj[`stage${item.stage}`] = item.cutPricePlan;
        });
      }
      this.yearsPlanTable.splice(0, 0, obj);
    },
  },
};
</script>
<style lang="scss" scoped>
/* 隐藏 */
::v-deep .form-item-none .el-table__row:nth-child(3n) {
  display: none;
}
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
                  text-align: center;
                  color: #1660f1;
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
  display: flex;
  align-items: center;
  .icon {
    color: #d3d3db;
  }
}
</style>
