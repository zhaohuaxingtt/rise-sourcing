<template>
  <iCard>
    <commonTable
      ref="tableDataForm"
      :tableData="suppliers"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      :selection="false"
    >
      <template slot="isTax" slot-scope="scope">
        <div>
          {{
            dividedBeiShu(scope.row["offerPrice"])  +
            currencyMultiples(scope.row["currencyMultiple"]) +
            "-" +
            units(scope.row["currencyUnit"])
          }}
        </div>
      </template>
      <template slot="serverTime" slot-scope="scope">
        <div>
          {{ scope.row["serverTime"].replace("T", " ") }}
        </div>
      </template>
      <template slot="caozuo" slot-scope="scope">
        <div class="form-view" @click="handleCheck(scope)">{{ language('BIDDING_CHAKAN','查看') }}</div>
      </template>
    </commonTable>
    <iPagination
      v-update
      @current-change="handleCurrentChange($event)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      prev-text="上一页"
      next-text="下一页"
      layout="prev,pager,next,jumper"
      :current-page="page.currPage"
      :total="page.total"
    />
  </iCard>
</template>

<script>
import { iCard, iPagination } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import { bidDetail, bidDetails, bidDetailHe, bidDetailsHe, currencyMultipleLib } from "./data";
import { getBiddingDetails } from "@/api/bidding/bidding";
import { pageMixins } from "@/utils/pageMixins";
import { getCurrencyUnit } from "@/api/mock/mock";
import Big from "big.js";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,
    commonTable,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    supplierCode: {
      type: String,
    },
    isSupplier: Boolean,
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
      },
    },
  },
  data() {
    return {
      id: 0,
      ruleForm: {},
      selectedTableData: [],
      bidDetail,
      bidDetails,
      bidDetailsHe,
      bidDetailHe,
      currencyMultipleLib,
      suppliers: [],
      currencyUnit: {},
      isTax: "",
    };
  },
  computed: {
    beishu() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.beishu || 1;
    },
    tableTitle() {
      if (
        this.ruleForm.roundType === "05" &&
        this.ruleForm.manualBiddingType === "02"
      ) {
        if (this.ruleForm.isTax === "01") {
          return this.bidDetailHe;
        } else {
          return this.bidDetailsHe;
        }
      } else {
        if (this.ruleForm.isTax === "01") {
          return this.bidDetail;
        } else {
          return this.bidDetails;
        }
      }
    },
  },
  async created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.handleSearchReset();
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
  },
  methods: {
    units(unit) {
      return this.currencyUnit[unit];
    },
    dividedBeiShu(val){
     return Big(val).div(this.beishu).toNumber()
    },
    currencyMultiples(currencyMultiple) {
      return {
        "01": "元",
        "02": "千",
        "03": "万",
        "04": "百万",
      }[currencyMultiple];
    },
    handleSearchReset() {
      let param = this.id;
      this.query(param);
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
      this.pageNum = e;
    },
    async query(e) {
      const res = await getBiddingDetails({
        id: e,
      });
      this.suppliers = res;
      this.page.total = res?.length;
      this.page.currPage = 1;
      this.isTax = res[0]?.isTax;
      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          res[i].currentSort = i + 1;
        }
      }
    },
    handleCheck(e) {
      let id = e.row["id"];
      let { href } = this.$router.resolve({
        name: this.isSupplier
          ? "biddingSupplierDetail"
          : "biddingProjectDetail",
      });
      window.open(href + `?supplierOfferId=${id}`, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-view {
  color: blue;
  cursor: pointer;
}
.inquiry {
  &__header {
    &-title {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      font-weight: bold;
      .el-button--default {
        min-width: 130px;
        margin-bottom: 10px;
      }
    }
  }
  &__navtab {
    margin-bottom: 15px;
    &-item {
      .el-button {
        margin-left: 2px;
        background-color: #fcfdfd;
        color: #ccc;
      }
      .el-button.active {
        color: #1763f7;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        border-color: transparent;
      }
    }
  }
}
.card {
  margin-bottom: 30px;
}

::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}

::v-deep .el-form-item {
  .el-input.is-disabled {
    .el-input__inner {
      text-align: center;
    }
  }
  .el-select .el-input.is-disabled {
    .el-input__suffix {
      display: none;
    }
  }
}

::v-deep .cardHeader {
  position: relative;

  .collapse {
    pointer-events: none;
  }
}
.icon-success {
  color: green;
  font-size: 1.8rem;
  position: absolute;
  left: 120px;
  top: 35px;
  z-index: 10;
}
.check {
  color: #1763f7;
  cursor: pointer;
}
</style>
