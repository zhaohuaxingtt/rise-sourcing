<template>
  <iCard :title="title">
    <commonTable
      ref="tableDataForm"
      :tableData="tableListDateSub"
      :tableTitle="columns"
      :tableLoading="tableLoading"
      :selection="false"
    >
      <template slot="upsetPrice" slot-scope="scope">
        <div>
          {{
            scope.row["upsetPrice"] === undefined ||
            scope.row["upsetPrice"] === "" ||
            scope.row["upsetPrice"] === null
              ? ""
              : scope.row["upsetPrice"].toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g ,'$1,') +
                currencyMultiples(form.currencyMultiple) +
                "-" +
                units(form.currencyUnit)
          }}
        </div>
      </template>
    </commonTable>
    <iPagination
      v-update
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :prev-text="language('BIDDING_SHANGYIYE','上一页')"
      :next-text="language('BIDDING_XIAYIYE','下一页')"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="tableListData.length"
    />
  </iCard>
</template>

<script>
import { iCard, iPagination } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import { pageMixins } from "@/utils/pageMixins";
import { getCurrencyUnit } from "@/api/mock/mock";
import {
  currencyMultipleLib
} from "./data";
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    commonTable,
    iPagination,
  },
  props: {
    tableListData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
    title: String,
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      currencyUnit: {},
      currencyMultipleLib
    };
  },
  mounted() {
    this.page.total = this.tableListData?.length;
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
    console.log(this.form);
  },
  computed: {
    tableListDateSub() {
      return this.tableListData?.slice(
        (this.pageNum - 1) * this.pageSize,
        (this.pageNum - 1) * this.pageSize + this.pageSize
      );
    },
  },
  methods: {
    units(unit) {
      return this.currencyUnit[unit];
    },
    currencyMultiples(currencyMultiple) {
      // return {
      //   "01": "元",
      //   "02": "千",
      //   "03": "万",
      //   "04": "百万",
      // }[currencyMultiple];
      return this.language(currencyMultipleLib[currencyMultiple]?.key, currencyMultipleLib[currencyMultiple]?.unit ) 
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
      // this.pageNum = e;
    },
    handleSizeChange(val) {
      this.page.currPage = 1;
      this.page.pageSize = val;
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
.tab_top {
  display: flex;
  justify-content: space-between;
}

::v-deep .circle:before {
  content: "";
  display: inline-block;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: red;
  position: relative;
  top: 2px;
  margin-right: 10px;
}

// ::v-deep .has-gutter tr {
//   background-color: #eaf1fd;
// }
// ::v-deep .el-table th {
//   background-color: #eaf1fd;
// }
</style>
