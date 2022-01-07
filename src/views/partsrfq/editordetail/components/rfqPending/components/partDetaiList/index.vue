<!--
* @author:shujie
* @Date: 2021-2-25 11:42:11
 * @LastEditors: YoHo
* @Description: 待办事项-零件清单
 -->
<template>
  <div class="partDetaiList">
    <iCard collapse v-show="!todo" :title="language('LK_LINGJIANQINGDAN','零件清单')">
      <template slot="header-control">
        <div class="card-header">
          <div class="button-box">
            <iButton
              v-if="
                baseInfoData.partProjectType &&
                baseInfoData.partProjectType[0] &&
                (baseInfoData.partProjectType[0] ===
                  partProjTypes.GSCOMMONSOURCING ||
                  baseInfoData.partProjectType[0] ===
                    partProjTypes.FSCOMMONSOURCING)
              "
              @click="cancelRelationStarMon"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_PARTDETAILIST_QUXIAOGUANLIANSTARTMONIORJILU |
                  取消关联StarMonitor记录
              "
              >{{
                language(
                  "QUXIAOGUANLIANSTARMONITORJILU",
                  "取消关联StarMonitor记录"
                )
              }}
            </iButton>
            <iButton
              v-if="
                baseInfoData.partProjectType &&
                baseInfoData.partProjectType[0] &&
                (baseInfoData.partProjectType[0] ===
                  partProjTypes.GSCOMMONSOURCING ||
                  baseInfoData.partProjectType[0] ===
                    partProjTypes.FSCOMMONSOURCING)
              "
              @click="relationStarMon"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_PARTDETAILIST_GUANLIANSTARTMONIORJILU |
                  关联StarMonitor记录
              "
              >{{ language("GUANLIANSTARTMONITORJILU", "关联StarMonitor记录") }}
            </iButton>
            <!-- <iButton @click="showApplyPrice" v-permission.auto="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_NEWPRICE|新申请财务目标价">
            {{ language('LK_XINSHENQINGCAIWUMUBIAOJIA','新申请财务目标价') }}
          </iButton>
          <iButton @click="againApply" v-permission.auto="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_REAPPLYPRICE|再申请财务目标价">
            {{ language('LK_ZAICISHENGQINGCAIWUMUBIAOJIA','再申请财务目标价') }}
          </iButton> -->
            <iButton
              @click="openPartsDialog"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_PARTDETAILIST_NEWPRICE | 新申请财务目标价
              "
            >
              {{ language("LK_SHENQINGLINGJIANMUBIAOJIA", "申请零件目标价") }}
            </iButton>
            <iButton
              @click="moduleDialogVisible = true"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_PARTDETAILIST_REAPPLYPRICE |
                  再申请财务目标价
              "
            >
              {{ language("LK_SHENQINGMUJUMUBIAOJIA", "申请模具目标价") }}
            </iButton>
            <iButton
              @click="sendKM"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_PARTDETAILIST_SENDKM | 发送KM
              "
              >{{ language("FASONGKM", "发送KM") }}</iButton
            >
            <iButton
              v-if="!disabled && rfqId"
              @click="addItems"
              v-permission.auto="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_ADD | 添加"
              >{{ language("LK_TIANJIA", "添加") }}
            </iButton>
            <iButton
              @click="deleteItems"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_PARTDETAILIST_DELETE | 删除
              "
              >{{ language("delete", "删除") }}
            </iButton>
          </div>
        </div>
      </template>
      <div>
        <tableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="confirmTableLoading"
          @handleSelectionChange="handleSelectionChange"
          @poenPage="openPage"
          v-permission.auto="
            PARTSRFQ_EDITORDETAIL_PARTDETAILIST_TABLE | 零件清单列表
          "
        >
          <template #fsnrGsnrNum="scope">
            <span
              v-if="scope.row.partProjectType === partProjTypes.PEIJIAN"
              class="openLinkText cursor"
              @click="gotoAccessoryDetail(scope.row)"
            >
              {{ scope.row.fsnrGsnrNum }}</span
            >
            <span
              v-else
              class="openLinkText cursor"
              @click="openPage(scope.row)"
              >{{ scope.row.fsnrGsnrNum }}</span
            >
          </template>
        </tableList>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :current-page="page.currPage"
          :layout="page.layout"
          :total="page.totalCount"
        ></iPagination>
      </div>
      <!-- 添加 -->
      <iDialog :visible.sync="addvisible">
        <template slot="title">
          <div class="el-dialog__title header">
            <span>{{ language("TIANJIALINGJIAN", "添加零件") }}</span>
            
          <iButton
            @click="start"
            :loading="addLoding"
            v-permission.auto="
              PARTSRFQ_EDITORDETAIL_PARTDETAILIST_ADD | 零件清单添加
            "
          >
            {{ language("XUANZE", "选择") }}
          </iButton>
          </div>
        </template>
        <div class="addFs flex-align-center">
          <iInput
            class="partInput"
            v-model="partNumList"
            :placeholder="
              language('partsprocure.PARTSPROCURE', '请输入零件号')
            "
            v-permission.auto="
              PARTSRFQ_EDITORDETAIL_PARTDETAILIST_PARTNUMSEARCH |
                (零件清单 - 零件号搜索)
            "
          >
            <div class="inputSearchIcon" slot="suffix">
              <icon
                symbol
                name="iconshaixuankuangsousuo"
                @click.native="queryParts"
              />
            </div>
          </iInput>
        </div>
        <partsTable
          class="partsTable"
          v-permission.auto="
            PARTSRFQ_EDITORDETAIL_PARTDETAILIST_TABLE | 零件清单列表
          "
          ref="partsTable"
          :rfqId="rfqId"
          :queryForm="queryForm"
          @targetHand="waitSelect"
          @openPage="(row) => openPage(row)"
          @gotoAccessoryDetail="gotoAccessoryDetail"
        ></partsTable>
      </iDialog>
      <!-- 新申请财务目标价 -->
      <applyPrice
        ref="applyPrice"
        @refresh="getTableList"
        :handleSelectArr="handleSelectArr"
      ></applyPrice>
      <!-- 发送KM ---------->
      <kmDialog
        :rfqId="rfqId"
        :parts="handleSelectArr"
        :visible.sync="kmDialogVisible"
      />
      <relationStarMon
        ref="relationStarMon"
        :rfqId="rfqId"
        @updateStarMonitor="updateStarMonitor"
        :startVisible.sync="startVisible"
        :handleSelectArr="handleSelectArr"
      />
    </iCard>
    <!-- 申请零件目标价 -->
    <partsDialog
      :todo="todo"
      :visible.sync="partsDialogVisible"
      :tableList="handleSelectArr"
    />
    <!-- 申请模具目标价 -->
    <moduleDialog :todo="todo" :visible.sync="moduleDialogVisible" />
    <parts-target-price
      @openDialog="openDialog"
      class="margin-top20"
      :todo="todo"
      :status="todoObj.cfPriceStatusDesc.status"
    ></parts-target-price>
    <mold-target-price
      @openDialog="openDialog"
      class="margin-top20"
      :todo="todo"
      :status="todoObj.mouldPriceStatusDesc.status"
    ></mold-target-price>
    <mold-budget-application
      class="margin-top20"
      :todo="todo"
      :status="todoObj.mouldBudgetStatusDesc.status"
    ></mold-budget-application>
    <supplier-score
      v-if="todo"
      :todo="todo"
      class="margin-top20"
      :status="todoObj.pushRateStatusDesc.status"
    />
    <!-- <technicalSeminar class="margin-top20" /> -->
  </div>
</template>

<script>
import {
  iButton,
  iCard,
  iPagination,
  iMessage,
  iMessageBox,
  iInput,
  icon,
  iDialog,
} from "rise";
import tableList from "@/views/partsign/home/components/tableList";
import { form } from "@/views/partsprocure/home/components/data";
import { deleteRfqPart, cancelRef } from "@/api/partsrfq/editordetail";
import { getTabelData } from "@/api/partsprocure/home";
import { insertRfqPart as addRfq } from "@/api/partsrfq/home";
import { pageMixins } from "@/utils/pageMixins";
import applyPrice from "./components/applyPrice";
import partsTable from "./components/partsTable";
import moldTargetPrice from "./components/moldTargetPrice";
import partsTargetPrice from "./components/partsTargetPrice";
import store from "@/store";
import { rfqCommonFunMixins } from "pages/partsrfq/components/commonFun";
import kmDialog from "./components/kmDialog";
import { partProjTypes } from "@/config";
import relationStarMon from "./components/relationStarMon";
import moldBudgetApplication from "../moldBudgetApplication";
import supplierScore from "../supplierScore/components/supplierScore.vue";

import moduleDialog from "./components/moduleDialog";
import partsDialog from "./components/partsDialog";
// import technicalSeminar from "../technicalSeminar";
import { iconName } from "./data";

export default {
  mixins: [pageMixins, rfqCommonFunMixins],
  props: {
    todoObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    supplierScore,
    iButton,
    iCard,
    tableList,
    iPagination,
    applyPrice,
    partsTable,
    kmDialog,
    iInput,
    icon,
    relationStarMon,
    moldBudgetApplication,
    moldTargetPrice,
    partsTargetPrice,
    iDialog,
    moduleDialog,
    partsDialog,
    // technicalSeminar
  },
  async mounted() {
    const { id, businessKey } = this.$route.query;
    this.rfqId = id || "";
    await this.getTableList();
  },
  watch: {
    disabled(val) {
      if (!val) {
        this.$nextTick(() => {
          if (this.queryForm.buyerId != undefined) {
            this.$refs.partsTable && this.$refs.partsTable.getTableList();
          }
        });
      }
    },
  },
  inject: ["getbaseInfoData", "getDisabled", "getBaseInfo"],
  computed: {
    disabled() {
      return this.getDisabled();
    },
    baseInfoData() {
      return this.getbaseInfoData();
    },
  },
  data() {
    return {
      iconName,
      hidens: true,
      partsDialogVisible: false,
      moduleDialogVisible: false,
      todo: false, // 是否待办
      addvisible: false,
      tableTitle: [
        {
          props: "fsnrGsnrNum",
          name: "FSNF/GSNF/SPNR",
          key: "partsprocure.PARTSPROCUREFSNFGSNFSPNR",
          tooltip: true,
          minWidth: 120,
        },
        {
          props: "partNum",
          name: "零件号",
          key: "partsprocure.PARTSPROCUREPARTNUMBER",
          tooltip: true,
          width: 130,
        },
        {
          props: "partNameZh",
          name: "零件名（中）",
          key: "partsprocure.PARTSPROCUREPARTNAMEZH",
          tooltip: true,
          width: 140,
        },
        {
          props: "partNameDe",
          name: "零件名（德）",
          key: "partsprocure.PARTSPROCUREPARTNAMEDE",
          tooltip: true,
          width: 140,
        },
        {
          props: "procureFactoryName",
          name: "采购工厂",
          key: "partsprocure.PARTSPROCUREPURCHASINGFACTORY",
          tooltip: true,
          width: 100,
        },
        {
          props: "carTypeProjectZh",
          name: "车型项目",
          key: "partsprocure.PARTSPROCUREMODELPROJECT",
          tooltip: true,
          minWidth: 120,
        },
        {
          props: "statusDesc",
          name: "零件状态",
          key: "partsprocure.PARTSPROCUREPARTSTATUS",
          tooltip: true,
          minWidth: 75,
        },
        {
          props: "buyerName",
          name: "询价采购员",
          key: "partsprocure.PARTSPROCUREINQUIRYBUYER",
          tooltip: true,
          width: 120,
          ispartsAdd: true,
        },
        {
          props: "linieName",
          name: "LINIE",
          key: "partsprocure.PARTSPROCURELINIE",
          tooltip: true,
          width: 80,
          ispartsAdd: true,
        },
        {
          props: "quotationStatus",
          name: "当前轮次报价状态",
          key: "DANGQIANLUNCIBAOJIAZHUANGTAI",
          tooltip: true,
          minWidth: 90,
        },
      ],
      tableListData: [],
      confirmTableLoading: false,
      handleSelectArr: [], // 已在RFQ中零件选中数据
      waitHandleSelectArr: [], //未在RFQ中零件选中数据
      applyPriceShow: false, //显示财务申请价
      parmarsHasRfq: JSON.parse(JSON.stringify(form)),
      rfqId: "",
      addLoding: false,
      kmDialogVisible: false,
      partProjTypes,
      queryForm: {
        buyerId: "",
      },
      partNumList: "",
      startVisible: false, //关联StartMonitor
    };
  },
  methods: {
    openPartsDialog(){
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGLINGJIANMUBIAOJIADECAIGOUXIANGMU",
            "抱歉，您当前还未选择需要申请零件目标价的采购项目！"
          )
        );
        return;
      }
      this.partsDialogVisible = true
    },
    openDialog(type,arr=[]) {
      if(arr.length){
        this.handleSelectArr = arr
      }
      console.log(type);
      this[type] = true;
    },
    toggle(type) {
      this[type] = !this[type];
    },
    gotoAccessoryDetail(row) {
      const router = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/accessorypartdetail",
        query: { spNum: row.fsnrGsnrNum },
      });
      window.open(router.href, "_blank");
    },
    // 已在RFQ中零件选中数据
    handleSelectionChange(rows) {
      this.handleSelectArr = rows;
    },
    // 未在RFQ中零件选中数据
    waitSelect(e) {
      this.waitHandleSelectArr = e;
    },
    // 跳转详情
    openPage(item) {
      const resolve = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsprocure/editordetail",
        query: {
          projectId: item.id,
          businessKey: item.partProjectType, //新增业务标识。
        },
      });
      window.open(resolve.href, "_blank");
    },
    validateStart() {
      return new Promise((r) => {
        if (this.waitHandleSelectArr.length == 0) {
          r(false);
          iMessage.warn(
            this.language(
              "LK_NINDANGQIANHAIWEIXUANZEXUYAOTIANJIADECAIGOUXIANGMU",
              "抱歉，您当前还未选择需要添加的采购项目！"
            )
          );
          return;
        }
        if (this.waitHandleSelectArr.find((items) => items.fsnrGsnrNum == "")) {
          r(false);
          iMessage.warn(
            this.language(
              "LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININTIANJIA",
              "抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您添加！"
            )
          );
          return;
        }
        r(true);
      });
    },
    // 添加
    async start() {
      if (!(await this.validateStart())) return;
      this.addLoding = true;
      const parmars = this.waitHandleSelectArr.map((r) => {
        return {
          ...r,
          ...{
            userId: store.state.permission.userInfo.id || "",
            userName: store.state.permission.userInfo.userName,
            rfqId: this.rfqId,
          },
        };
      });
      addRfq(parmars)
        .then(async (res) => {
          if (res.data && res.data.rfqId) {
            this.resultMessage(res);
            await this.getTableList();
            this.queryForm = {
              ...this.queryForm,
              partNumList: this.partNumList,
            };
            this.$refs.partsTable.page.currPage = 1;
            this.$refs.partsTable && this.$refs.partsTable.getTableList();
            this.getBaseInfo();
          } else {
            this.resultMessage(res);
          }
        })
        .finally(() => (this.addLoding = false));
    },
    //获取表格数据
    getTableList() {
      if (this.rfqId) {
        this.confirmTableLoading = true;
        this.parmarsHasRfq["size"] = this.page.pageSize;
        this.parmarsHasRfq["current"] = this.page.currPage;
        this.parmarsHasRfq["rfqId"] = this.rfqId || "";
        this.parmarsHasRfq["status"] = "";
        this.parmarsHasRfq["isRfqPartList"] = true;
        return getTabelData(this.parmarsHasRfq)
          .then((res) => {
            this.page.currPage = res.pageNum;
            this.page.pageSize = res.pageSize;
            this.page.totalCount = res.total;
            res.data.forEach((val) => {
              val.mtz == true ? (val.mtz = "是") : (val.mtz = "否");
              val.quotationStatus =
                val.partEffectiveQuotationNumber +
                "/" +
                val.partTotalQuotationNumber;
            });
            this.tableListData = Array.isArray(res.data) ? res.data : [];
            if (this.tableListData.length) {
              this.queryForm = {
                buyerId: this.tableListData[0].buyerId,
                linieId: this.tableListData[0].linieId,
                partProjectType: this.tableListData[0].partProjectType,
              };
            } else {
              const baseInfo = this.getbaseInfoData();
              this.queryForm = {
                buyerId: baseInfo.buyerId,
                linieId: baseInfo.linieUserId,
              };
            }

            this.$store.dispatch(
              "setPendingPartsList",
              this.tableListData.map((r) => {
                return { ...r, ...{ purchaseProjectId: r.id } };
              })
            );
          })
          .finally(() => (this.confirmTableLoading = false));
      }
    },
    // 新申请财务目标价
    showApplyPrice() {
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU",
            "抱歉，您当前还未选择需要申请目标价的采购项目！"
          )
        );
        return;
      }
      this.$refs.applyPrice.show();
    },
    // 再次申请财务目标价
    againApply() {
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU",
            "抱歉，您当前还未选择需要申请目标价的采购项目！"
          )
        );
        return;
      }
      this.$refs.applyPrice.againShow();
    },
    async addItems() {
      this.addvisible = true;
    },
    async deleteItems() {
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU",
            "抱歉，您当前还未选择需要申请目标价的采购项目！"
          )
        );
        return;
      }
      iMessageBox(
        this.language("deleteSure", "确定要执行删除操作吗？"),
        this.language("LK_WENXINTISHI", "温馨提示")
      ).then(async () => {
        const idList = this.handleSelectArr.map((item) => {
          return item.id;
        });
        const req = {
          // deletePartPackage: {
          userId: store.state.permission.userInfo.id,
          rfqId: this.rfqId,
          idList,
          // }
        };
        const res = await deleteRfqPart(req);
        this.resultMessage(res);
        this.getTableList();
        this.queryForm = { ...this.queryForm, partNumList: this.partNumList };
        this.$refs.partsTable.page.currPage = 1;
        this.$refs.partsTable.getTableList();
      });
    },
    // 发送KM
    sendKM() {
      if (!this.handleSelectArr.length)
        return iMessage.warn(
          this.language("LK_QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据")
        );
      this.kmDialogVisible = true;
    },
    // 查询零件列表
    queryParts() {
      this.queryForm = { ...this.queryForm, partNumList: this.partNumList };
      this.$refs.partsTable.page.currPage = 1;
      this.$refs.partsTable.getTableList(this.queryForm);
    },
    //打开关联starMonitoe弹窗
    relationStarMon() {
      if (!this.handleSelectArr.length)
        return iMessage.warn(
          this.language("LK_QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据")
        );
      this.$refs.relationStarMon.showStarMo();
      //  this.$refs.relationStarMon.$refs.tips.closedunsshow()
    },
    //取消关联StarMonitor
    cancelRelationStarMon() {
      if (!this.handleSelectArr.length)
        return iMessage.warn(
          this.language("LK_QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据")
        );
      let data = {
        refRfqId: this.$route.query.id,
        projectIds: this.handleSelectArr.map((val) => val.id),
      };
      cancelRef(data).then((res) => {
        if (res.code === "200") {
          iMessage.success(
            this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
          );
          this.getTableList();
          this.getBaseInfo();
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
        }
      });
    },
    updateStarMonitor() {
      console.log("==============================");
      this.getTableList();
      this.getBaseInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding-right: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
.partsTable {
  padding-bottom: 20px;
}
.addFs {
  margin-bottom: 20px;
  justify-content: space-between;
}
.openLinkText {
  color: $color-blue;
}
::v-deep .el-dialog{
  min-width: 1250px;
}
.partInput {
  width: 260px;

  ::v-deep .el-input__suffix {
    .el-input__suffix-inner {
      height: 100% !important;
    }

    .inputSearchIcon {
      display: inline-block;
      width: 30px;
      font-size: 16px;
      height: 100%;
      cursor: pointer;

      .icon {
        height: 100% !important;
      }
    }
  }
}
</style>
