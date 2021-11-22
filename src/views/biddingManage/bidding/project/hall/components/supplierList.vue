<template>
  <iCard>
    <commonTable
      ref="tableDataForm"
      :tableData="suppliers"
      :tableTitle="
        role === 'supplier' ? supplierTableTitles : supplierTableTitle
      "
      :tableLoading="tableLoading"
      :selection="false"
      @handleSelectionChange="handleSelectionChange"
    >
      <template slot="index" slot-scope="scope">
        <div>{{ scope.row.index + 1 }}</div>
      </template>
      <template slot="sort">
        <div v-if="role === 'supplier' && ruleForm.resultOpenForm == '02'"
          :class="comRankDatas"
        >
        </div>
      </template>
      <!-- 是否参与本轮RFQ -->
      <template slot="isAttend" slot-scope="scope">
        <div>
          {{
            scope.row["biddingNtfFlag"] == true &&
            scope.row["isEnter"] == true &&
            scope.row["systemUseFlag"] == true
              ? `${language('BIDDING_SHI','是')}`
              : `${language('BIDDING_FOU','否')}`
          }}
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
import { iCard, iPagination } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import { supplierTableTitle, supplierTableTitles } from "./data";
import { findHallSupplier, getProjectResults,getSupplierRank } from "@/api/bidding/bidding";
import { pageMixins } from "@/utils/pageMixins";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,

    commonTable,
  },
  props: {
    supplierCode: {
      type: String,
    },
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
      },
    },
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
      ruleForm: {},

      tableLoading: false,
      selectedTableData: [],

      cbdLevelList: [],
      userListCache: {},

      supplierTableTitle,
      supplierTableTitles,

      clickType: "",

      suppliers: [],

      timer: null,
      rankDatas:''
    };
  },
  computed: {
    role() {
      return this.$route.meta.role;
    },
    suppliersPage() {
      const { suppliers } = this.ruleForm;
      const { currPage, pageSize } = this.page;
      return suppliers?.slice((currPage - 1) * pageSize, pageSize * currPage);
    },
    comRankDatas(){
      return this.rankDatas.trafficLight == '01'
                ? 'green-ball'
                : this.rankDatas.trafficLight == '02'
                ? 'yellow-ball'
                : this.rankDatas.trafficLight == '03'
                ? 'red-ball'
                : ''
    }
  },
  async created() {
    this.id = this.$route.params.id;
    // this.cbdLevelList = await getSuppliers();
  },
  async mounted() {
    this.tableLoading = true;
    if (
      this.ruleForm.biddingStatus == "04" ||
      this.ruleForm.biddingStatus == "05"
    ) {
      this.timer = setInterval(() => {
        this.handleSearchReset();
      }, 1000);
    }
    let param = { biddingId: this.id, supplierCode: this.supplierCode };
    const r = await getSupplierRank(param).catch(err => {
          console.log(err)
        });
    this.rankDatas = r
    await this.handleSearchReset();
    this.tableLoading = false;
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    async handleSearchReset() {
      let param = this.id;
      await this.query(param);
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
    compare(property) {
      return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value1 - value2;
      };
    },
    async query(e) {
      let list = [];
      if (this.role !== "supplier") {
        const res = await findHallSupplier({
          id: e,
        }).catch();
        list = res?.suppliers.filter((item) => item?.isAttend == true) || [];
        console.log(list);
      } else {
        list =
          (await getProjectResults({
            id: e,
          })) || [];
        if (this.ruleForm.resultOpenForm != "03") {
          list = list.filter((i) => i?.supplierCode == this.supplierCode);
        }
        list = list.map((item) => ({
          ...item,
          sort: item.currentSort,
        }));
      }
      // if (this.ruleForm.supplierProducts?.length < 1) {
      //   list = [];
      // }
      this.suppliers = list;
      console.log(this.suppliers);
      this.suppliers.sort(this.compare("currentSort"));
      this.page.total = list.length;
      this.page.currPage = 1;
    },
    handleShowBidNotice() {
      this.showBidNotice = true;
    },
    handleBottom(e) {
      this.bottomActived = e;
    },
  },
};
</script>

<style lang="scss" scoped>
.red-ball {
  background-color: #D10000;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  margin: 0 auto;
}
.green-ball {
  background-color: #4CAF50;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  margin: 0 auto;
}
.yellow-ball {
  background-color: #FFC100;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  margin: 0 auto;
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
</style>
