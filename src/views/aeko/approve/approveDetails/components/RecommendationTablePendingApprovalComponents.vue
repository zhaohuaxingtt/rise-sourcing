<template>
  <div>
    <i-card>
      <span class="card-title"
        >AEKO Recommendation Sheet/AEKO 推荐表 - {{ auditContentStatus }}</span
      >
      <i-table-custom
        class="margin-top24"
        :columns="recommendationFormPendingApprovalTitle"
        :data="recommendationFormPendingApprovalList"
      >
      </i-table-custom>
      <div class="margin-top20 card-bottom-tip">
        Top-Aeko / Top-MP：|ΔGesamt Materialkosten| ≥35 RMB oder
        Invest≥10,000,000 RMB; Top-AeA: ΔGesamt Materialkosten ≥35 RMB oder
        Invest≥10,000,000 RMB
      </div>
      <!--分页区-->
      <i-pagination
        v-update
        @size-change="handleSizeChange($event, loadRecommendData)"
        @current-change="handleCurrentChange($event, loadRecommendData)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </i-card>
  </div>
</template>

<script>
import { iCard, iPagination, iMessage } from "rise";
import iTableCustom from "@/components/iTableCustom";
import { pageMixins } from "@/utils/pageMixins";
import filters from "@/utils/filters";

export default {
  name: "RecommendationTablePendingApprovalComponents",
  mixins: [pageMixins, filters],
  components: {
    iCard,
    iTableCustom,
    iPagination,
  },
  props: {
    auditContents: { type: Object, require: true, default: () => [] },
    auditContentStatus: { type: String, default: () => "" },
  },
  // computed:{
  //   ContentStatus(){
  //     return this.auditContentStatus
  //   }
  // },
  watch: {
    auditContents(val) {
      this.page.totalCount = this.auditContents.length;
      this.recommendationFormPendingApprovalList = this.auditContents.slice(
        this.page.currPage - 1,
        this.page.pageSize
      );
    },
  },
  data() {
    return {
      recommendationFormPendingApprovalList: [],
      recommendationFormPendingApprovalTitle: [
        {
          type: "index",
          align: "center",
          label: "#",
        },
        {
          prop: "partNum",
          label: "零件号",
          i18n: "LK_LINGJIANHAO",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "partNameZh",
          label: "零件名称",
          i18n: "LK_LINGJIANMINGCHENG",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "cartypeZh",
          label: "车型项目/车型",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "originPartNum",
          label: "原零件号",
          i18n: "LK_YUANLINGJIANHAO",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "linieDeptName",
          label: "科室",
          i18n: "LK_KESHI",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "linieName",
          label: "采购员",
          i18n: "MODEL-ORDER.LK_CAIGOUYUAN",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "newAPrice",
          label: "新A价",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "apriceChange",
          label: "A价变动",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "bnkChange",
          label: "BNK变动",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "newBPrice",
          label: "新B价",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "incInvestmentCost",
          label: "增加投资费(不含税)",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "developmentCost",
          label: "开发费",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "procureFactory",
          label: "采购工厂",
          i18n: "nominationSupplier.CaiGouGongChang",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "supplierSapCode",
          label: "供应商SAP号",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "supplierNameZh",
          label: "供应商名称",
          i18n: "LK_GONGYINGSHANGMINGCHENG",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
      ],
    };
  },
  created() {
    this.queryParams = this.$route.query
    let str_json = window.atob(this.queryParams.transmitObj)
    this.transmitObj = JSON.parse(decodeURIComponent(escape(str_json)))
    let auditContents = sessionStorage.getItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContents`)
    this.auditContents = JSON.parse(auditContents)
    this.auditContentStatus = sessionStorage.getItem(`${this.transmitObj?.aekoApprovalDetails?.aekoNum}-auditContentStatusDesc`)
  },
  methods: {
    loadRecommendData() {
      this.recommendationFormPendingApprovalList = this.auditContents.slice(
        (this.page.currPage - 1) * this.page.pageSize,
        this.page.currPage * this.page.pageSizes
      );
    },
  },
};
</script>

<style scoped lang="scss">
.card-title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
}

.card-bottom-tip {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #8c96a7;
}
</style>