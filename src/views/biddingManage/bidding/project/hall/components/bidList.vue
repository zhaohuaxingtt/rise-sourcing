<template>
  <iCard>
    <commonTable
      ref="tableDataForm"
      :tableData="bidListPage"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      :selection="false"
      @handleSelectionChange="handleSelectionChange"
    >
      <template slot="currencyUnit" slot-scope="scope">
        {{ scope.row["currencyUnit"] }}
      </template>
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
        <div>{{ scope.row["serverTime"].replace("T", " ") }}</div>
      </template>
      <template slot="operation" slot-scope="scope">
        <div style="color: blue; cursor: pointer" @click="check(scope)">
          {{language('BIDDING_CHAKAN','查看')}}
        </div>
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
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.total"
      @size-change="handleSizeChange"
    />
  </iCard>
</template>

<script>
import { iCard, iButton, iInput, iSelect, iPagination, iPage } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import {
  bidTableTitle,
  bidTableTitles,
  isAttendList,
  heBidTableTitle,
  heBidTableTitles,
  currencyMultipleLib
} from "./data";
import {
  getModels,
  getProjects,
  getCurrencyUnit,
  getUnits,
} from "@/api/mock/mock";
import { getSupplierBid } from "@/api/bidding/bidding";
import { pageMixins } from "@/utils/pageMixins";
import Big from "big.js";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,

    commonTable,
  },
  data() {
    return {
      // 测试数据
      showAddRFQ: false,
      showAddManual: false,

      showSupplierDialog: false,

      id: 0,
      orgRuleForm: {
        biddingProducts: [],
      },
      ruleForm: {
        biddingProducts: [],
      },

      selectedTableData: [],

      cbdLevelList: [],
      userListCache: {},

      currencyUnit: {},

      bidTableTitle,
      bidTableTitles,
      currencyMultipleLib,
      heBidTableTitles,
      heBidTableTitle,
      isAttendList,

      clickType: "",

      bidList: [],

      cUnit: "RMB",
      currencyMultiple: "千",
      isTax: "01",
    };
  },
  props: {
    supplierCode: {
      type: String,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    isSupplier: Boolean,
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        console.log(110, val);
        this.ruleForm = {
          ...val,
        };
      },
    },
  },
  mounted() {
    // this.handleSearchReset();
    this.debounce();
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
  },
  computed: {
    debounce(wait = 1000) {
      let timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.handleSearchReset();
        }, wait);
      };
    },
    unit() {
      return this.currencyUnit[this.cUnit];
    },
    title() {
      const { rfqCode, projectCode } = this.ruleForm || {};
      return rfqCode ? `${this.language('BIDDING_RFQBIANHAO','RFQ编号')}：${rfqCode}` : `${this.language('BIDDING_XIANGMUBIANHAO','项目编号')}：${projectCode}`;
    },
    beishu() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.beishu || 1;
    },
    bidListPage() {
      const { currPage, pageSize } = this.page;
      return this.bidList?.slice(
        (currPage - 1) * pageSize,
        pageSize * currPage
      );
    },
    tableTitle() {
      let { isTax, manualBiddingType, roundType } = this.ruleForm || {};
      if (manualBiddingType == "02" && roundType == "05") {
        if (isTax == "01") {
          return this.heBidTableTitle;
        } else {
          return this.heBidTableTitles;
        }
      } else {
        if (isTax == "01") {
          return this.bidTableTitle;
        } else {
          return this.bidTableTitles;
        }
      }
    },
  },
  async created() {
    this.id = this.$route.params.id;
    // this.cbdLevelList = await getSuppliers();
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
      let param = { biddingId: this.id, supplierCode: this.supplierCode };
      this.query(param);
    },
    handleCheck(place) {
      const placeCollapse = this.$refs[`${place}Collapse`];
      this.$set(this, `${place}CollapseVal`, false);
      placeCollapse.collapseValue = true;
    },
    handleFinish(place, type) {
      this.clickType = type;
      this.place = place;
      const callback = () => {
        const placeCollapse = this.$refs[`${place}Collapse`];
        this.$set(this, `${place}CollapseVal`, true);
        placeCollapse.collapseValue = false;
      };
      if (place === "header") {
        this.submitForm(callback);
      } else {
        this.submitForm(callback);
      }
    },
    handleSave(place, type) {
      this.clickType = type;
      this.place = place;
      this.submitForm();
    },
    handleSetting() {
      this.place = "header";
      this.clickType = "keep";
      this.submitForm(() => {
        this.$router.push({
          path:
            this.ruleForm.roundType == "02"
              ? `/bidding/open/${this.id}`
              : `/bidding/competition/base/${this.id}`,
        });
      });
    },
    handleSupplierChecked(rows) {
      const len = this.ruleForm.suppliers.length;
      const suppliersList = this.ruleForm.suppliers;
      // console.log('点击保存供应商',suppliersList, rows);
      const suppliers = rows.map((row, index) => {
        this.$set(this.userListCache, row.supplierId, row.userList);
        return {
          sort: Number(len + index) + 1,
          biddingId: this.id,
          userList: row.userList,
          contactName: row.userList[0]?.nameZh,
          email: row.userList[0]?.email,
          telephone: row.userList[0]?.phoneM,
          // supplierCode: row.supplierId,
          supplierName: row.nameZh,
          mbdl: "",
          isAttend: true,
          ...(this.ruleForm.roundType == "05"
            ? {
                cbdLevel: this.cbdLevelList[0]?.cbdLevel,
                supplierCode: row.supplierId,
              }
            : {
                cbdLevel: "",
                // supplierCode: "",
              }),
        };
      });
      this.ruleForm.suppliers.push(...suppliers);
      this.page.total = this.ruleForm.suppliers.length;
    },
    handleUserChange(row, item) {
      row.contactName = item.nameZh;
      row.contactId = item.id;
      row.email = item.email;
      row.telephone = item.phoneM;
    },
    handleCbdChange(row, item) {
      row.cbdLevel = item.cbdLevel;
      row.supplierCode = item.supplierCode;
    },
    handleSizeChange(val) {
      console.log("handleSizeChange", this.page);
      this.page.pageSize = val;
    },
    // 表格选中值集
    handleCurrentChange(e) {
      this.page.currPage = e;
    },
    async query(e) {
      const res = await getSupplierBid(e);
      this.$emit("change-title", res);
      this.page.total = res?.length;
      this.page.currPage = 1;

      // this.currencyUnit = res.biddingInfoDTO.currencyUnit;
      // this.currencyMultiple	= res.biddingInfoDTO.currencyMultiple;

      if (res.length) {
        this.isTax = res[0]?.isTax;
        for (let i = 0; i < res.length; i++) {
          res[i].currentSort = i + 1;
        }
      }

      this.bidList = [...res];
      // this.ruleForm = {
      //   ...res
      // }
    },
    check(e) {
      console.log(e.row["id"]);
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
</style>
