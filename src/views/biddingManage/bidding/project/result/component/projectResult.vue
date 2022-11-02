<template>
  <div>
    <el-form
      class="form"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      :hideRequiredAsterisk="true"
      :validate-on-rule-change="false"
    >
      <!-- 项目结果 -->
      <iCard style="margin-top: 1rem">
        <div class="form-top">
          <div>
            <h2>{{language('BIDDING_XIANGMUJIEGUO','项目结果')}}</h2>
          </div>
          <div>
            <iButton @click="handleExport">{{language('BIDDING_DAOCHU','导出')}}</iButton>
          </div>
        </div>
        <commonTable
          ref="tableDataForm"
          :tableData="suppliersPage"
          :key="isTax"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :selection="false"
        >
          <template slot="currentSort" slot-scope="scope">
            <!-- <div v-if="role === 'supplier' && form.resultOpenForm == '02'" -->
            <div v-if="form.resultOpenForm == '02'"
              :class="
                scope.row['trafficLight'] == '01'
                  ? 'green-ball'
                  : scope.row['trafficLight'] == '02'
                  ? 'yellow-ball'
                  : scope.row['trafficLight'] == '03'
                  ? 'red-ball'
                  : ''
              "
            >
            </div>
            <div v-else>
              {{
                form.roundType === "05" && form.manualBiddingType === "02"
                  ? 1
                  : scope.row["currentSort"]
              }}
            </div>
          </template>
          <template slot="isTax" slot-scope="scope">
            <div>
              {{
                scope.row["offerPrice"] ? (dividedBeiShu(scope.row["offerPrice"]).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g ,'$1,') +
                currencyMultiples(scope.row["currencyMultiple"]) +
                "-" + units(scope.row["currencyUnit"])) : ''
              }}
            </div>
          </template>
          <template slot="serverTime" slot-scope="scope">
            <div>
              {{ scope.row["serverTime"] ? scope.row["serverTime"].replace("T", " ") : ''}}
            </div>
          </template>
          <template slot="operation" slot-scope="scope">
            <div class="toView" @click="handleGoDetail(scope)">{{scope.row["offerPrice"] ? language('BIDDING_CHAKAN','查看') : ''}}</div>
          </template>
        </commonTable>
        <iPagination
          v-update
          @current-change="handleCurrentChange($event)"
          @size-change="handleSizeChange($event)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :prev-text="language('BIDDING_SHANGYIYE','上一页')"
          :next-text="language('BIDDING_XIAYIYE','下一页')"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.total"
        />
      </iCard>
    </el-form>
  </div>
</template>
<script>
import { iCard, iButton, iPagination } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import { pageMixins } from "@/utils/pageMixins";
import { downloadAll } from "@/utils/downloadAll";
import {
  projectResultTableTitle,
  projectResultTitle,
  projectResultTitleHe,
  projectResultTableTitleHe,
  currencyMultipleLib
} from "./data";
import { getCurrencyUnit } from "@/api/mock/mock";
import { getProjectResults, findHallQuotation } from "@/api/bidding/bidding";
import Big from "big.js";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iPagination,
    commonTable,
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
      selectedTableData: "",
      projectResultTableTitle,
      projectResultTitle,
      projectResultTitleHe,
      projectResultTableTitleHe,
      currencyMultipleLib,
      tableLoading: false,
      showAddManual: false,
      tableListData: [],
      formData: {},

      currencyUnit: {},
      isTax: "",
      offerPrice: "",
      dataList: [],
    };
  },
  props: {
    supplierCode: {
      type: String,
    },
    form: {
      type: Object,
    },
    ranks: {
      type: Object,
    },
    isSupplier: Boolean,
  },
  created() {
    console.log('fwafwafwa',this.$store)
    const falg = this.$route.path === '/bidding/project/result'
    if(falg){
      this.id = this.$route.params.id;
    }else {
      this.id = this.$route.params.id;
      this.params = this.$route.query
    }
  },
  mounted() {
    this.getTableList();
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
    console.log(139,this.form)
  },
  computed: {
    role() {
      return this.$route.meta.role;
    },
    suppliersPage() {
      const { tableListData } = this;
      const { currPage, pageSize } = this.page;
      return tableListData?.slice((currPage - 1) * pageSize, pageSize * currPage);
    },
    // lookOver() {
    //   if (
    //     this.form.roundType === "05" &&
    //     this.form.manualBiddingType === "02"
    //   ) {
    //     return ``;
    //   } else {
    //     return `查看`;
    //   }
    // },
    beishu() {
      return currencyMultipleLib[this.form.currencyMultiple]?.beishu || 1;
    },
    tableTitle() {
      if (
        this.form.roundType === "05" &&
        this.form.manualBiddingType === "02"
      ) {
        if (this.form.isTax === "01") {
          return this.projectResultTableTitleHe;
        } else {
          return this.projectResultTitleHe;
        }
      } else {
        if (this.form.isTax === "01") {
          return this.projectResultTableTitle;
        } else {
          return this.projectResultTitle;
        }
      }
    },
  },
  methods: {
    units(unit) {
      return this.currencyUnit[unit];
    },
    dividedBeiShu(val){
     return val ? Big(val).div(this.beishu).toNumber() : ''
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
    handleSizeChange(val) {
      this.page.currPage = 1;
      this.page.pageSize = val;
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
    },
    // 导出
    handleExport() {
      console.log(this.role);
      const data = this.tableListData;
      for (let i = 0; i < this.tableListData.length; i++) {
        let currentSort = this.tableListData[i].currentSort || '';
        let price = this.tableListData[i].offerPrice;
        let currencyMultiple = this.currencyMultiples(
          this.tableListData[i].currencyMultiple
        );
        let currencyUnit = this.units(this.tableListData[i].currencyUnit);
        let offerPrice = this.dividedBeiShu(price) + currencyMultiple + "-" + currencyUnit;
        let supplierName = this.tableListData[i].supplierName;
        let serverTime = this.tableListData[i]?.serverTime ? this.tableListData[i]?.serverTime.replace("T", " ") : '';
        let isTax =
          this.tableListData[i].isTax === "01" ? "不含可抵扣税" : "含税";
        this.dataList.push({
          currentSort,
          offerPrice,
          supplierName,
          serverTime,
          isTax,
        });
      }
      const prama = { id: this.id };
      downloadAll({
        url:
          this.role === "supplier"
            ? `${process.env.VUE_APP_BIDDING}/biddingQueryService/exportProjectResults`
            : `${process.env.VUE_APP_BIDDING}/biddingService/exportProjectResultForBuyer`,
        filename: this.language('BIDDING_XIANGMUJIEGUO', "项目结果"),
        type: "application/vnd.ms-excel",
        data: this.role === "supplier" ? this.dataList : prama,
        callback: (e) => {
          if (e) {
            this.$message.success(this.language('BIDDING_DAOCHUCHENGGONG','导出成功'));
          } else {
            this.$message.error(this.language('BIDDING_DAOCHUSHIBAI','导出失败'));
          }
        },
      });
    },
    // 查询
    getTableList() {
      this.page.currPage = 1;

      let param = { id: this.id };
      this.query(param);
    },
    handleGoDetail(e) {
      let id = e.row["id"];
      let { href } = this.$router.resolve({
        name: this.isSupplier
          ? "biddingSupplierDetail"
          : "biddingProjectDetail",
      });
      window.open(href + `?supplierOfferId=${id}`, "_blank");
    },
    // 表格选中值集
    handleSelectionChange(val) {
      console.log(val);
      this.selectedTableData = val;
    },
    compare(property) {
      return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value1 - value2;
      };
    },
    async query(e) {
      // 分页查询获取项目列表
      this.tableLoading = true;
      let param
      if( this.supplierCode === '11135'){
        param = { biddingId: this.id};
      } else {
        param = { biddingId: this.id, supplierCode: this.supplierCode };
      }
      const data = await findHallQuotation(param)
      const res = await getProjectResults(e);
      this.tableLoading = false;
      this.form = data
      this.tableListData.sort(this.compare("currentSort"));
      this.isTax = res[0]?.isTax;
        if (
          (this.role === "supplier" && this.form.resultOpenForm === '01' 
          || (this.role === "supplier" && this.form.resultOpenForm === '02'))
        ) {
          this.tableListData = res.filter((item) => {
            return this.supplierCode.includes(item.supplierCode);
          });
        } else {
          this.tableListData = res || [];
        }
        this.tableListData = this.tableListData.map(item => {
          return {
            ...item,
            offerPrice : this.dividedBeiShu(item.offerPrice)
          }
        })
        this.page.total = res.length;
        console.log('object',this.tableListData)
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

.form-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.toView {
  color: blue;
  cursor: pointer;
}

::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}
::v-deep .el-table__row {
  height: 50px;
}
</style>
