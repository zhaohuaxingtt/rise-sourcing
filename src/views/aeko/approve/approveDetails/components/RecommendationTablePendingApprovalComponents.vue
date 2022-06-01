<template>
  <div>
    <i-card v-permission.auto="AEKO_APPROVED_RECOMMENDATION_TABLE|AEKO推荐表列表">
      <div class="margin-bottom15">
        <span class="card-title"
            >AEKO Recommendation Sheet/AEKO 推荐表 - {{ auditContentStatusDesc }}
            <!-- 待审批的时候显示一个icon -->
            <icon v-if=" auditContentStatus == 'TO_BE_APPROVAL'" class="icon font22" symbol name="iconjinridaiban" />
          </span>
        <span class="floatright">
          <iButton v-if="show && isMtz" @click="toMtzUrl">{{ language('LK_CHAKANMTZBIANGENG',"查看MTZ变更") }}</iButton>
          <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </span>
      </div>
      
      <tableList
        permissionKey="AEKO_APPROVE_APPROVEDETAILS_COMPONENTS_RECOMMENDATIONTABLEPENDINGAPPROVALCOMPONENTS"
        class="margin-top24"
        ref="tableList"
        :tableTitle="recommendationFormPendingApprovalTitle"
        :tableData="recommendationFormPendingApprovalList"
        :titlePopover="false"
      >
        <template #supplier="scope">
          <span>{{showSupplierNameZh(scope.row.supplierSapCode,scope.row.supplierNameZh)}}</span>
        </template>
      </tableList>
      <!-- <div class="margin-top20 card-bottom-tip">
        Top-Aeko / Top-MP：|ΔGesamt Materialkosten| ≥35 RMB oder
        Invest≥10,000,000 RMB; Top-AeA: ΔGesamt Materialkosten ≥35 RMB oder
        Invest≥10,000,000 RMB
      </div> -->
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
import { iCard, iPagination, iButton, iMessage,icon } from "rise";
// import iTableCustom from "@/components/iTableCustom";
import tableList from "@/components/iTableSort"
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins"
import { pageMixins } from "@/utils/pageMixins";
import filters from "@/utils/filters";
import {searchApproved} from "@/api/aeko/detail";
import { formatTableData, recommendationList } from "../data.js";
import buttonTableSetting from '@/components/buttonTableSetting'

export default {
  name: "RecommendationTablePendingApprovalComponents",
  mixins: [pageMixins, filters, tableSortMixins],
  components: {
    iCard,
    tableList,
    iPagination,
    iButton,
    icon,
    buttonTableSetting
  },
  props: {
    auditContents: { type: Object, require: true, default: () => [] },
    auditContentStatus: { type: String, default: () => "" },
    auditContentStatusDesc: { type: String, default: () => "" },
  },
  computed:{
    // 推荐表是否含有mtz零件
    isMtz(){
      return this.recommendationFormPendingApprovalList.filter(o => o.isMtz === 1).length
    }
  },
  watch: {
    auditContents(val) {
      this.page.totalCount = this.auditContents?.length;
      let recommendationFormPendingApprovalList = this.auditContents.slice(
        this.page.currPage - 1,
        this.page.pageSize
      )
      this.recommendationFormPendingApprovalList = formatTableData(recommendationFormPendingApprovalList, recommendationList)
    },
  },
  data() {
    return {
      recommendationFormPendingApprovalList: [],
      recommendationFormPendingApprovalTitle: [
        {
          props: "partNum",
          name: "零件号",
          key: "LK_LINGJIANHAO",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:180
        },
        {
          props: "partNameZh",
          name: "零件名称",
          key: "LK_LINGJIANMINGCHENG",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:100
        },
        {
          props: "cartypeZh",
          name: "车型项目/车型",
          key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:140,
        },
        {
          props: "originPartNum",
          name: "原零件号",
          key: "LK_YUANLINGJIANHAO",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:180
        },
        {
          props: "linieDeptNum",
          name: "科室",
          key: "LK_KESHI",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:72
        },
        {
          props: "linieName",
          name: "采购员",
          key: "MODEL-ORDER.LK_CAIGOUYUAN",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:85
        },
        {
          props: "newAPrice",
          name: "新A价",
          key: "LK_XIANAJIA",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:82
        },
        {
          props: "apriceChange",
          name: "A价变动(含分摊)",
          key: "AJIABIANDONGHANFENTAN",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:96,
          isHeaderSetting:true,
          HeaderSettingList:[
            {key:'AJIABIANDONG',name:'A价变动'},
            {key:'AEKO_HANFENTAN',name:'(含分摊)'}
          ],
        },
        {
          props: "bnkChange",
          name: "BNK变动",
          key: "LK_BNKBIANDONG",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:100
        },
        {
          props: "newBPrice",
          name: "新B价",
          key: "LK_XINBJIA",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:82
        },
        {
          props: "incInvestmentCost",
          name: "增加投资费(不含税)",
          key: "LK_ZENGJIATOUZIFEIBUHANSUI",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:162,
          width:100,
          isHeaderSetting:true,
          HeaderSettingList:[
            {key:'AEKO_ZENGJIATOUZIFEI',name:'增加投资费'},
            {key:'AEKO_BUHANSHUI',name:'(不含税)'}
          ],
        },
        {
          props: "developmentCost",
          name: "开发费",
          key: "KAIFAFEI",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:86
        },
        {
          props: "procureFactory",
          name: "采购工厂",
          key: "nominationSupplier.CaiGouGongChang",
          headerAlign: "center",
          align: "center",
          tooltip: true,
          minWidth:75
        },
        {
          props: "supplier",
          name:'供应商',
          key:'TPZS.GONGYINGSHANG',
          headerAlign: "center",
          align: "center",
          tooltip: true,
          width:200,
        }
        // {
        //   props: "supplierSapCode",
        //   name: "供应商编号",
        //   key: "LK_GONGYINGSHANGBIANHAO",
        //   headerAlign: "center",
        //   align: "center",
        //   tooltip: true,
        //   width:100,
        // },
        // {
        //   props: "supplierNameZh",
        //   name: "供应商名称",
        //   key: "LK_GONGYINGSHANGMINGCHENG",
        //   headerAlign: "center",
        //   align: "center",
        //   tooltip: true,
        //   minWidth:114
        // },
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
      this.auditContentStatusDesc = '已审批'
      this.show = false
    }
    this.page.pageSize = 1
    this.page.pageSizes = [1,10,20,50,100,300] //每页条数切换
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
      let recommendationFormPendingApprovalList = this.auditContents.slice(
        (this.page.currPage - 1) * this.page.pageSize,
        this.page.currPage * this.page.pageSize
      )
      this.recommendationFormPendingApprovalList = formatTableData(recommendationFormPendingApprovalList, recommendationList)
    },
    // 查询数据
    searchApproved(requirementAekoId){
      searchApproved(requirementAekoId).then(res=>{
        this.auditContents = res?.data||[];
        if(res?.code=='200'){
          this.page.totalCount = res.data?.length || 0;
          let recommendationFormPendingApprovalList = res.data.slice(
            this.page.currPage - 1,
            this.page.pageSize
          )
          this.recommendationFormPendingApprovalList = formatTableData(recommendationFormPendingApprovalList, recommendationList)
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    addStatusColumn(){
      let stausColumn={
          props: "status",
          name: "内容状态",
          key: "LK_LEIRONGZHUANGTAI",
          headerAlign: "center",
          align: "center",
          tooltip: true,
         customRender: (h, scope, column, extraData) => {
            let {label}=this.stateEnums.find(item=>item.value==scope.row.status)
            return <span>{label} </span>
        }
      }
      this.recommendationFormPendingApprovalTitle.splice(5,0,stausColumn)
    },

    showSupplierNameZh(code=null,name=null){
      if(!code && !name) return ''
      else{
        return (code || '') + '-' + (name || '')
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card-title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  .icon{
    margin-bottom: -2px;
  }
}

.card-bottom-tip {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #8c96a7;
}
</style>