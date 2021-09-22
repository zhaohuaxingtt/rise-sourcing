<template>
  <div v-permission="MOLD_PURCHASE_ORDER_HOME_PAGE">
    <ModelOrderSeachComponents
        v-permission="MOLD_PURCHASE_ORDER_HOME_SEARCH"
      class="margin-bottom20 margin-top20"
      :purchasing-factory-list="purchasingFactoryList"
      :sap-send-status-list="sapSendStatusList"
      :order-status-list="orderStatusList"
      :contract-status-list="contractStatusList"
      :order-query-form="orderQueryForm"
      @queryOrder="queryOrder"
    />
    <i-card>
      <div class="margin-bottom10 clearFloat">
        <show-me-components
            v-permission="MOLD_PURCHASE_ORDER_HOME_BTN_JUST_LOOK_YOURSELF"
          :is-only-myself="orderQueryForm.isOnlyMyself"
          @showOnlyMyselfData="showOnlyMyselfData"
        />
        <!--右侧按钮区-->
        <div class="floatright">
          <!--新建采购订单-->
          <i-button @click="createOrder" v-permission="MOLD_PURCHASE_ORDER_HOME_BTN_CREATE">{{
            $t("MODEL-ORDER.LK_XINJIAN")
          }}</i-button>
          <!--删除采购订单-->
          <i-button @click="deleteOrder" v-permission="MOLD_PURCHASE_ORDER_HOME_BTN_DELETE">{{
            $t("MODEL-ORDER.LK_SHANCHU")
          }}</i-button>
          <!--转派-->
          <i-button @click="transferOrder" v-permission="MOLD_PURCHASE_ORDER_HOME_BTN_TRANSFER">{{
            $t("MODEL-ORDER.LK_ZHUANPAI")
          }}</i-button>
          <!--创建入账单-->
          <i-button @click="createIncomingBill" v-permission="MOLD_PURCHASE_ORDER_CREATE_INCOMING_BILL">{{
            $t("MODEL-ORDER.LK_CHUANGJIANRUZHANGDAN")
          }}</i-button>
          <!--报销申请-->
          <i-button @click="reimbursementApplication" v-permission="MOLD_PURCHASE_ORDER_REIMBURSEMENT_APPLICATION">{{
            $t("MODEL-ORDER.LK_BAOXIAOSHENQING")
          }}</i-button>
          <!--导出-->
          <i-button @click="exportOrderData" v-permission="MOLD_PURCHASE_ORDER_HOME_BTN_EXPORT">{{
            $t("MODEL-ORDER.LK_DAOCHU")
          }}</i-button>
          <!--发送SAP-->
          <i-button @click="sendOrderSAP" v-permission="MOLD_PURCHASE_ORDER_HOME_BTN_SENDSAP">{{
            $t("MODEL-ORDER.LK_FASONGSAP")
          }}</i-button>
          <!--全部展开或收起-->
          <i-button @click="toggleRowExpansion" v-permission="MOLD_PURCHASE_ORDER_HOME_BTN_EXPAND_ALL_OR_COLLAPSE">
            {{
              isExpandAll
                ? $t("MODEL-ORDER.LK_QUANBUSHOUQI")
                : $t("MODEL-ORDER.LK_QUANBUZHANKAI")
            }}
          </i-button>
        </div>
      </div>

      <order-home-table-components
          v-permission="MOLD_PURCHASE_ORDER_HOME_DATA_SHOW_AREA"
        ref="orderHomeTableComponentsRef"
        :columns="columns"
        :order-data="orderData"
        :extra-data="extraData"
        @handleSelectionChange="handleSelectionChange"
        @open-page="openPage"
      />
      <!--分页区-->
      <i-pagination
        v-update
        v-permission="MOLD_PURCHASE_ORDER_HOME_DATA_SHOW_AREA"
        @size-change="handleSizeChange($event, loadOrder)"
        @current-change="handleCurrentChange($event, loadOrder)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />

      <TransferBuyerDialog
        v-if="transferBuyerDialogisDisplay"
        v-model="transferBuyerDialogisDisplay"
        @sure="confirmTransfer"
        :title="$t('partsprocure.PARTSPROCURETRANSFER')"
        :subtitle="$t('MODEL-ORDER.LK_ZHUANYECAIGOUYUAN')"
        :subtitle1="$t('MODEL-ORDER.LK_BUMEN')"
        :deptDTO="$store.state.permission.userInfo.deptDTO"
        @sureByMySelf="sureByMySelf"
      />
    </i-card>
  </div>
</template>

<script>
import { iPagination, iCard, iButton, iMessageBox } from "rise";
import ModelOrderSeachComponents from "./components/ModelOrderSeachComponents";
import ShowMeComponents from "./components/ShowMeComponents";
import OrderHomeTableComponents from "./components/OrderHomeTableComponents";
import { MODEL_ORDER_HOME_TABCOLUMNS } from "./config/data";
import { pageMixins } from "@/utils/pageMixins";
import filters from "@/utils/filters";
import { purchaseFactory } from "@/api/partsprocure/editordetail";
import { getDictByCode } from "@/api/dictionary";
import {
  getPurchaseOrder,
  findCurrentUserAllGroup,
  delPurchaseOrder,
  exportPurchaseOrderByPage,
  purchaseOrderSubmission,
  purchaseOrderTransfer,
} from "@/api/ws2/modelOrder";
import TransferBuyerDialog from "./components/TransferBuyerDialog";

export default {
  name: "index",
  mixins: [pageMixins, filters],
  components: {
    TransferBuyerDialog,
    OrderHomeTableComponents,
    ShowMeComponents,
    ModelOrderSeachComponents,
    iCard,
    iButton,
    iPagination,
  },
  data() {
    return {
      transferBuyerDialogisDisplay: false,

      orderQueryForm: {
        contractType: "ZF", //订单类型
        isOnlyMyself: true,
        buyerName: "", //采购员名称
        contractCode: "", //CSC订单编号
        contractSapCode: "", //SAP订单编号
        currentPage: 1, //当前页
        pageSize: 10, //每页查询多少条
        partNum: "", //零件号
        procureFactory: "", //采购工厂编号
        procureGroup: "", //采购组
        sapSendStatus: "", //SAP发送状态(0未发送，1发送成功，2发送失败)
        state: "draft", //订单状态draft - 草稿 formal -正式 history - 历史
        supplierSapCode: "", //供应商SAP编号
        // type: '45'//类型（55/54/spare/db/steel/45/43/42/47/411）
        typeList: ["42"],
        contractStatus: "",
      },
      columns: MODEL_ORDER_HOME_TABCOLUMNS,
      orderData: [],
      extraData: {},
      purchasingFactoryList: [], //采购工厂
      sapSendStatusList: [], //SAP发送状态
      orderStatusList: [], //订单状态
      selectedOrderData: [], //选中数据
      currentUserPurchasingGroups: [], //用户所拥有的所有采购组
      isExpandAll: false,
      contractStatusList: [], //合同状态
    };
  },
  created() {
    this.queryPurchasingFactory();
    this.querySAPsendstatus();
    this.queryOrderStateList();
    this.queryContractStatus();
    this.queryCurrentUserGroup();
    this.loadOrder();
  },
  methods: {
    //获取采购工厂
    queryPurchasingFactory() {
      purchaseFactory({ isSparePart: false }).then((res) => {
        if (res?.data && res.code == 200) {
          this.purchasingFactoryList = res.data;
        }
      });
    },
    // 获取字典SAP发送状态
    querySAPsendstatus() {
      getDictByCode("CONTRACT_SEND_SAP_STATUS").then((res) => {
        if (res.code == 200) {
          this.sapSendStatusList = res?.data[0]?.subDictResultVo;
          this.extraData.sapSendStatusList = this.sapSendStatusList;
        } else {
          this.$message.error(res?.desZh);
        }
      });
    },
    // 获取订单状态
    queryOrderStateList() {
      getDictByCode("CONTRACT_STATUS").then((res) => {
        if (res.code == 200) {
          this.orderStatusList = res?.data[0]?.subDictResultVo;
          this.extraData.orderStatusList = this.orderStatusList;
        }
      });
    },
    //获取合同状态
    queryContractStatus() {
      getDictByCode("contract_cover_status").then((res) => {
        if (res.code == 200) {
          this.contractStatusList = res?.data[0]?.subDictResultVo;
          this.extraData.contractStatus = this.contractStatus;
        }
      });
    },
    loadOrder() {
      this.orderQueryForm.currentPage = this.page.currPage;
      this.orderQueryForm.pageSize = this.page.pageSize;
      getPurchaseOrder(this.orderQueryForm).then((res) => {
        if (res.code == 200) {
          let localData = res.data?.records;
          localData.forEach((item, index) => {
            item.index = index + 1;
          });
          this.orderData = localData;
          this.page.totalCount = res.data.total;
        } else {
          this.$message.error(res.desZh);
        }
      });
    },
    queryOrder(val) {
      this.orderQueryForm = val;
      this.orderQueryForm.currentPage = 1;
      this.orderQueryForm.pageSize = this.page.pageSize;
      this.loadOrder();
    },
    showOnlyMyselfData(val) {
      this.orderQueryForm.currentPage = 1;
      this.orderQueryForm.pageSize = this.page.pageSize;
      this.orderQueryForm.isOnlyMyself = val;

      this.loadOrder();
    },
    //创建订单
    createOrder() {
      let routeData = this.$router.resolve({
        path: `/ws2/order/modeler/details/ModelOrderDetailsPage/0/-1`,
      });
      window.open(routeData.href, "_blank");
    },
    //删除订单
    deleteOrder() {
      if (this.selectedOrderData.length === 0) {
        return this.$message.warning("抱歉，您当前还未选择需要删除的订单");
      }
      let state = this.selectedOrderData.some(
        (i) => i.state == "formal" || i.state == "history"
      );
      if (state)
        return this.$message.warning("选中采购订单包含非草稿状态不支持删除");
      if (
        this.currentUserPurchasingGroups != null &&
        this.currentUserPurchasingGroups.length > 0 &&
        this.currentUserPurchasingGroups != undefined
      ) {
        let notContainOrders = [];
        for (let i = 0; i < this.selectedOrderData.length; i++) {
          let selOrderItem = this.selectedOrderData[i];
          if (
            this.currentUserPurchasingGroups.indexOf(
              selOrderItem.procureGroup.toUpperCase()
            ) == -1
          ) {
            notContainOrders.push(selOrderItem);
          }
        }
        if (notContainOrders.length > 0) {
          let str_message = [];
          notContainOrders.forEach((item, index) => {
            str_message.push(
              `您无该${item.contractCode}订单采购组${item.procureGroup}删除权限无法删除`
            );
          });
          let str = str_message.join(" <br/> ");
          return this.$message({
            dangerouslyUseHTMLString: true,
            message: str,
            type: "error",
          });
        }
      } else {
        let str_message = [];
        this.selectedOrderData.forEach((item, index) => {
          str_message.push(
            `您无该${item.contractCode}订单采购组${item.procureGroup}删除权限无法删除`
          );
        });
        let str = str_message.join(" <br/> ");
        return this.$message({
          dangerouslyUseHTMLString: true,
          message: str,
          type: "error",
        });
      }
      let deleteIds = this.selectedOrderData.map((i) => i.id);
      let newDeleteIds = [...new Set(deleteIds)];
      iMessageBox(
        "请确认删除选中采购订单", // 暂时处理
        this.$t("LK_WENXINTISHI"),
        {
          confirmButtonText: this.$t("LK_QUEDING"),
          cancelButtonText: this.$t("LK_QUXIAO"),
        }
      ).then(() => {
        delPurchaseOrder(newDeleteIds).then((res) => {
          if (res.code == 200) {
            this.selectedOrderData = [];
            this.$message.success(res.desZh);
            this.loadOrder();
          } else {
            this.$message.error(res.desZh);
          }
        });
      });
    },
    //转派
    transferOrder() {
      if (this.selectedOrderData.length <= 0) {
        return this.$message.warning("抱歉，您当前还未选择您需要转派的订单");
      }
      if (this.selectedOrderData.length > 1) {
        return this.$message.warning("一次只能选择一条哟");
      }
      if (
        this.selectedOrderData.find((i) => i.state).state.toUpperCase() !==
        "DRAFT"
      ) {
        return this.$message.warning(this.$t("非草稿状态订单不可转派"));
      }
      this.transferBuyerDialogisDisplay = true;
    },
    confirmTransfer(val) {
      let transfer = {
        newBuyerId: val.id,
        orderId: this.selectedOrderData.find((i) => i.id).id,
      };
      purchaseOrderTransfer(transfer).then((res) => {
        if (res.code == 200) {
          this.loadOrder();
          this.$message.success(res.desZh);
        } else {
          this.$message.error(res.desZh);
        }
      });
    },
    sureByMySelf() {
      let userInfo = this.$store.state.permission.userInfo;
      this.confirmTransfer(userInfo);
    },
    //导出
    exportOrderData() {
      exportPurchaseOrderByPage(this.orderQueryForm);
    },
    //展开收起
    toggleRowExpansion() {
      this.isExpandAll = !this.isExpandAll;
      if (this.isExpandAll) {
        this.$refs.orderHomeTableComponentsRef.expandAll();
      } else {
        this.$refs.orderHomeTableComponentsRef.collapseAll();
      }
    },
    //创建入账单
    createIncomingBill() {},
    //报销申请
    reimbursementApplication() {},
    sendOrderSAP() {
      if (this.selectedOrderData.length <= 0) {
        return this.$message.warning(
          this.$t(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDELINGJIANCAIGOUXIANGMU"
          )
        );
      }
      if (this.selectedOrderData.length > 1) {
        return this.$message.warning("一次只能选择一条哟");
      }
      purchaseOrderSubmission(this.selectedOrderData.find((i) => i.id).id).then(
        (res) => {
          if (res.code == 200) {
            this.$message.success(res.desZh);
            this.loadDbOrder();
          } else {
            this.$message.error(res.desZh);
          }
        }
      );
    },
    handleSelectionChange(row) {
      this.selectedOrderData = row;
    },
    openPage(row) {
      let routeData = this.$router.resolve({
        path: `/ws2/order/modeler/details/ModelOrderDetailsPage/1/${row.id}`,
      });
      window.open(routeData.href, "_blank");
    },
    //查询用户所有采购组
    queryCurrentUserGroup() {
      findCurrentUserAllGroup().then((res) => {
        if (res.code == 200) {
          this.currentUserPurchasingGroups = res.data;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>