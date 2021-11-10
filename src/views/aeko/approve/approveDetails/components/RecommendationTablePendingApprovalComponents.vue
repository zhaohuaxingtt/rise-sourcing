<template>
  <div>
    <i-card>
      <div class="margin-bottom15">
        <span class="card-title"
          >AEKO Recommendation Sheet/AEKO 推荐表 - {{ auditContentStatus }}</span>
        <span class="floatright" v-if="show">
          <iButton @click="toMtzUrl">{{ language('LK_CHAKANMTZBIANGENG',"查看MTZ变更") }}</iButton>
        </span>
      </div>
      
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
import { iCard, iPagination, iButton, iMessage } from "rise";
import iTableCustom from "@/components/iTableCustom";
import { pageMixins } from "@/utils/pageMixins";
import filters from "@/utils/filters";
import {searchApproved} from "@/api/aeko/detail";

export default {
  name: "RecommendationTablePendingApprovalComponents",
  mixins: [pageMixins, filters],
  components: {
    iCard,
    iTableCustom,
    iPagination,
    iButton
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
      this.page.totalCount = this.auditContents?.length;
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
          minWidth:50
        },
        {
          prop: "partNum",
          label: "零件号",
          i18n: "LK_LINGJIANHAO",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:128
        },
        {
          prop: "partNameZh",
          label: "零件名称",
          i18n: "LK_LINGJIANMINGCHENG",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:100
        },
        {
          prop: "cartypeZh",
          label: "车型项目/车型",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:140,
          width:100,
        },
        {
          prop: "originPartNum",
          label: "原零件号",
          i18n: "LK_YUANLINGJIANHAO",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:128
        },
        {
          prop: "linieDeptNum",
          label: "科室",
          i18n: "LK_KESHI",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:72
        },
        {
          prop: "linieName",
          label: "采购员",
          i18n: "MODEL-ORDER.LK_CAIGOUYUAN",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:85
        },
        {
          prop: "newAPrice",
          label: "新A价",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:82
        },
        {
          prop: "apriceChange",
          label: "A价变动",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:96
        },
        {
          prop: "bnkChange",
          label: "BNK变动",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:100
        },
        {
          prop: "newBPrice",
          label: "新B价",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:82
        },
        {
          prop: "incInvestmentCost",
          label: "增加投资费(不含税)",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:162,
          width:150,
        },
        {
          prop: "developmentCost",
          label: "开发费",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:86
        },
        {
          prop: "procureFactory",
          label: "采购工厂",
          i18n: "nominationSupplier.CaiGouGongChang",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:100
        },
        {
          prop: "supplierSapCode",
          label: "供应商编号",
          i18n: "",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          width:100,
        },
        {
          prop: "supplierNameZh",
          label: "供应商名称",
          i18n: "LK_GONGYINGSHANGMINGCHENG",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:114
        },
      ],
      transmitObj: {},
      show:true,
      stateEnums:[{value:'EMPTY',label:''},
        {value:'TOBE_STATED',label:'待表态'},
        {value:'QUOTING',label:'报价中'},
        {value:'BOUND',label:'已绑定'},
        {value:'PENDING_APPROVAL',label:'待审批'},
        {value:'K3_APPROVED',label:'CommodityK3通过'},
        {value:'K2_APPROVED',label:'Commodity科室通过'},
        {value:'CSF_K3_APPROVED',label:'CSF K3 通过'},
        {value:'CSF_FINAL_APPROVAL',label:'CSF 科室通过'},
        {value:'K1_APPROVED',label:'审批完成'},
        {value:'REJECT',label:'拒绝'},
        {value:'SUPPLEMENTAL_RESULT',label:'补充材料'},
        {value:'DESIGNATED',label:'已定点'},
      ],//状态枚举
    };
  },
  created() {
    this.queryParams = this.$route.query
    let str_json = window.atob(this.queryParams.transmitObj)
    this.transmitObj = JSON.parse(decodeURIComponent(escape(str_json)))
    if(this.transmitObj.option == 4){ // linie 预览不显示"查看MTZ变更"按钮
      this.show = false
    }
    if(this.queryParams?.goto){
      this.addStatusColumn()
      this.searchApproved(this.queryParams.requirementAekoId)
      this.auditContentStatus = '已审批'
      this.show = false
    }
  },
  methods: {
    // 查看mtz变更
    toMtzUrl() {
      !this.transmitObj && (this.transmitObj = {})
      const aekoNum = this.transmitObj.aekoApprovalDetails.aekoNum
      const workflow = this.transmitObj.aekoApprovalDetails.workFlowDTOS || []
      const workflowDecy = window.btoa(unescape(encodeURIComponent(JSON.stringify(workflow))))
      const requirementAekoId = this.transmitObj.aekoApprovalDetails.requirementAekoId

      const params = {
        name: 'aekoMtzlist',
        query: {
          requirementAekoId,
          aekoNum,
          workflow: workflowDecy
        }
      }
      const routeData = this.$router.resolve(params)
      window.open(routeData.href, '_blank')
      // console.log(params, this.transmitObj)
    },
    loadRecommendData() {
      this.recommendationFormPendingApprovalList = this.auditContents.slice(
        (this.page.currPage - 1) * this.page.pageSize,
        this.page.currPage * this.page.pageSizes
      );
    },
    // 查询数据
    searchApproved(requirementAekoId){
      searchApproved(requirementAekoId).then(res=>{
        this.auditContents = res?.data||[];
        if(res?.code=='200'){
          this.page.totalCount = res.data?.length || 0;
          this.recommendationFormPendingApprovalList = res.data.slice(
            this.page.currPage - 1,
            this.page.pageSize
          );
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    addStatusColumn(){
      let stausColumn={
          prop: "status",
          label: "内容状态",
          i18n: "LK_LEIRONGZHUANGTAI",
          headerAlign: "center",
          align: "center",
          tooltip: true,
         customRender: (h, scope, column, extraData) => {
            let {label}=this.stateEnums.find(item=>item.value==scope.row.status)
            return <span>{label} </span>
        }
      }
      this.recommendationFormPendingApprovalTitle.splice(5,0,stausColumn)
    }
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