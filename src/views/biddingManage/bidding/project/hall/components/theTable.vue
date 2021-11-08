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
              : scope.row["upsetPrice"] +
                currencyMultiples(form.currencyMultiple) +
                "-" +
                units(form.currencyUnit)
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
      layout="prev, pager, next, jumper"
      :current-page="page.currPage"
      :total="tableListData.length"
    />
  </iCard>
</template>

<script>
import { iCard, iPagination } from "rise";
import commonTable from "@/components/commonTable";
import { pageMixins } from "@/utils/pageMixins";
import { getCurrencyUnit } from "@/api/mock/mock";
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
      return {
        "01": "元",
        "02": "千",
        "03": "万",
        "04": "百万",
      }[currencyMultiple];
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
      this.pageNum = e;
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
