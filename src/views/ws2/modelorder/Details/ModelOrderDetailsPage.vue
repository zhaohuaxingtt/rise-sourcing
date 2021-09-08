<template>
  <i-page class="orderClassBox">
    <div class="pageTitle flex-between-center-center margin-botttom20">
      <span>{{ titleComputed }}</span>
      <div class="btnList flex-align-center">
        <!---日志-->
        <LogButton class="margin-left10" @click="lookLog"/>
        <LedgerIconComponent/>
      </div>
    </div>
    <div class="line-top margin-top10"></div>
    <div class="flex-between-center-center margin-top20">
      <el-radio-group v-model="selectItem" @change="onItemSelFunction">
        <el-radio-button label="MODEL_ORDER">{{ $t("MODEL-ORDER.LK_DINGDAN") }}</el-radio-button>
        <el-radio-button label="MODEL_CONTRACT" :disabled="!bottomIsShow">{{
            $t("MODEL-ORDER.LK_HETONG")
          }}
        </el-radio-button>
      </el-radio-group>

      <div class="btnList flex-align-center">
        <!--下一步-->
        <i-button v-if="nextStepShow" @click="nextStep">{{ $t("LK_XIAYIBU") }}</i-button>
        <!--清空-->
        <i-button v-if="nextStepShow" @click="clearForm">{{ $t("MODEL-ORDER.LK_QINGKONG") }}</i-button>

        <i-button v-if="saveOrderShow" @click="outEditOrder">{{ $t("LK_TUICHUBIANJI") }}</i-button>
        <!--保存-->
        <i-button v-if="saveOrderShow" v-loading.fullscreen.lock="fullscreenLoading" @click="saveOrder">
          {{ $t("LK_BAOCUN") }}
        </i-button>
        <!--编辑-->
        <i-button v-if="editOrderbtnShow" @click="editOrder">{{ $t("LK_BIANJI") }}</i-button>

        <!--提交订单-->
        <i-button v-if="submitOrderbtnShow" v-loading.fullscreen.lock="fullscreenLoading" @click="submitOrder">
          {{ $t("LK_TIJIAO") }}
        </i-button>
        <!--版本升级-->
        <i-button v-if="versionUpgradeShow" v-loading.fullscreen.lock="fullscreenLoading" @click="versionUpgrade">
          {{ $t("MODEL-ORDER.LK_BANBENSHNGJI") }}
        </i-button>
      </div>
    </div>
    <ModelOrderDetailsTopComponents
        v-if="orderShow"
        ref="orderDetailsTopComponentsRef"
        :is-edit="isEdit"
        :option="option"
        :id="id"
        :order-details="orderDetails"
        :purchasing-factory-list="purchasingFactoryList"
        :order-status-list="orderStatusList"
        :contain-purchase-group="containPurchaseGroup"
    />

    <ModelOrderDetailsBottomComponents
        v-if="bottomIsShow&&orderShow"
        ref="orderDetailsBottomComponentRef"
        :id="id"
        :isEdit="isEdit"
        :order-details="orderDetails"
        :containPurchaseGroup="containPurchaseGroup"
    />
    <iLog
        :show.sync="logDialogVisible"
        :bizId="id == -1 ? 0 : orderDetails.contractCode"
    />
  </i-page>
</template>

<script>
import {iButton, iPage, iLog} from "rise";
import LogButton from "../../budgetManagement/components/logButton";
import LedgerIconComponent from "./components/LedgerIconComponent";
import ModelOrderDetailsTopComponents from "./components/ModelOrderDetailsTopComponents";
import ModelOrderDetailsBottomComponents from "./components/ModelOrderDetailsBottomComponents";
import {
  queryPurchaseGroup,
  findCurrentUserAllGroup,
  createPurchaseOrder,
  getPurchaseOrderDetails,
  queryPurchasingGroup,
  updatePurchaseOrderById,
  savaPurchaseOrderItem,
  purchaseOrderSubmission,
  versionUpgradeByOrder,
} from "@/api/ws2/modelOrder";
import {purchaseFactory} from "@/api/partsprocure/editordetail";
import {getDictByCode} from "@/api/dictionary";

export default {
  name: "ModelOrderDetailsPage",
  components: {
    ModelOrderDetailsBottomComponents,
    ModelOrderDetailsTopComponents,
    LedgerIconComponent,
    LogButton,
    iButton,
    iPage,
    iLog,
  },
  props: ["option", "id"],
  computed: {
    //title显示控制
    titleComputed: function () {
      if (this.option == 0 && this.id == -1) {
        return "新建订单";
      } else {
        if (null == this.orderDetails || this.orderDetails == undefined) return "";
        return (
            this.$t("MODEL-ORDER.LK_RISEDINGDANHAO") +
            `:${this.orderDetails.contractCode}`
        );
      }
    },
    //创建模式按钮显示
    nextStepShow: function () {
      return this.orderShow && this.option == 0 && this.id == -1;
    },
    //保存按钮显示
    saveOrderShow: function () {
      let val = this.orderDetails.state ?? "draft";
      if (val == "history") return false;
      return this.orderShow && this.containPurchaseGroup && this.isEdit && this.id !== -1;
    },
    //编辑  提交按钮显示
    editOrderbtnShow: function () {
      let val = this.orderDetails.state ?? "draft";
      if (val == "history") return false;
      if (val == "formal") {
        return (
            this.orderShow && this.containPurchaseGroup &&
            this.orderDetails.isLatest &&
            this.isEdit === false &&
            (this.id != -1 || this.option == 1)
        );
      }
      return (
          this.orderShow && this.containPurchaseGroup &&
          this.isEdit === false &&
          (this.id != -1 || this.option == 1)
      );
    },
    //提交按钮显示
    submitOrderbtnShow: function () {
      let val = this.orderDetails.state ?? "draft";
      if (val == "history" || val == "formal") return false;
      return (
          this.orderShow && this.containPurchaseGroup &&
          this.isEdit === false &&
          (this.id != -1 || this.option == 1)
      );
    },
    //版本升级按钮显示
    versionUpgradeShow: function () {
      let val = this.orderDetails.state ?? "draft";
      if (val == "history") return false;
      if (val == "formal") {
        return this.orderShow && this.orderDetails.isLatest && this.option == 1 && !this.isEdit;
      }
      return this.orderShow && val == "formal" && this.option == 1 && !this.isEdit;
    },
    //判断该订单采购组与当前用户所在采购组是否一致
    containPurchaseGroup: function () {
      return this.btnMenuShow;
    },
    bottomIsShow() {
      return (
          this.orderDetails != null &&
          this.orderDetails != undefined &&
          this.orderDetails.id != null &&
          this.orderDetails.id != undefined
      );
    },

    orderShow: function () {
      return this.selectItem == 'MODEL_ORDER'
    },
    contractShow: function () {
      return this.selectItem == 'MODEL_CONTRACT'
    }
  },
  data() {
    return {
      selectItem: "MODEL_ORDER",
      btnMenuShow: false,
      isEdit: false, //编辑状态控制
      logDialogVisible: false,
      fullscreenLoading: false,
      orderDetails: {
        departmentCode: this.$store.state.permission.userInfo.deptDTO.deptNum, //部门code
        nameZh: this.$store.state.permission.userInfo.deptDTO.nameZh, //部门名字
        departmentName: this.$store.state.permission.userInfo.deptDTO.nameZh, //部门名字
        version: "1", //版本
        currency: "RMB", //货币
        paymentCode: "0001", //支付条件
        buyerName: this.$store.state.permission.userInfo.nameZh, //采购员
        buyerId: this.$store.state.permission.userInfo.id, //采购员ID
        buyerCode: this.$store.state.permission.userInfo.userNum, //采购员编号
        state: "draft", //订单状态
        companyCode: "", //公司代码
        procureOrganization: "1000", //采购组织
        orderDate: new Date().toLocaleDateString().replace(/\//g, "-"),
        contractType: "ZF",
        isSteel: 0, //是否钢材合同 1-是 0-否
        procureGroup: "",
        type: "42", //订单类型45，43/steel钢材/db
      },
      purchaseGroupsByAll: [], //系统所有采购组
      purchaseGroups: [], //用户拥有的采购组
      purchasingFactoryList: [], //采购工厂
      orderStatusList: [], //订单状态
      contractStatusList: [], //合同状态
    };
  },
  created() {
    if (this.$route.query.isEdit) {
      this.isEdit = this.$route.query.isEdit;
    }
    this.queryPurchasingFactory();
    this.queryOrderStateList();
    this.queryOrderDetails();
    this.getPurchaseGroup();
    this.queryAllPurchaseGroup();
    this.queryContractStatus();
  },
  methods: {
    onItemSelFunction(val) {
      this.selectItem = val
    },
    lookLog() {
      this.logDialogVisible = true;
    },
    //获取采购工厂
    queryPurchasingFactory() {
      purchaseFactory({isSparePart: false}).then((res) => {
        if (res?.data && res.code == 200) {
          this.purchasingFactoryList = res.data;
        }
      });
    },
    // 获取订单状态
    queryOrderStateList() {
      getDictByCode("CONTRACT_STATUS").then((res) => {
        if (res.code == 200) {
          this.orderStatusList = res?.data[0]?.subDictResultVo;
        }
      });
    },
    //获取采购订单详情 通过id
    queryOrderDetails() {
      if (this.id == -1) {
        return;
      }
      let data = {orderId: this.id};
      getPurchaseOrderDetails(data).then((res) => {
        if (res.code == 200) {
          this.orderDetails = res.data;
          this.queryOrderPurchasingGroup();
        }
      });
    },
    queryOrderPurchasingGroup() {
      queryPurchasingGroup(this.orderDetails.procureGroup.toUpperCase()).then(
          (res) => {
            if (res.code == 200) {
              this.btnMenuShow = res.data;
            }
          }
      );
    },
    //获取合同状态
    queryContractStatus() {
      getDictByCode("contract_cover_status").then((res) => {
        if (res.code == 200) {
          this.contractStatusList = res?.data[0]?.subDictResultVo;
        }
      });
    },

    //查询所有采购组
    queryAllPurchaseGroup() {
      queryPurchaseGroup().then((res) => {
        if (res.code == 200) {
          this.purchaseGroupsByAll = res.data;
        }
      });
    },
    //查询用户所拥有的采购组
    getPurchaseGroup() {
      findCurrentUserAllGroup().then((res) => {
        if (res.code == 200) {
          this.purchaseGroups = res.data;
        }
      });
    },
    nextStep() {
      let valid =
          this.$refs.orderDetailsTopComponentsRef.getOrderDetailsValidate(); //获取表单校验数据
      if (valid) {
        //检测表单是否校验通过
        let val = this.$refs.orderDetailsTopComponentsRef.getOrderDetailsVal(); //获取表单数据
        let flag1 = this.purchaseGroupsByAll.some((purchaseGroup) => {
          return (
              purchaseGroup.purchaseGroupCode == val.procureGroup.toUpperCase()
          );
        });
        if (!flag1) {
          return this.$message.error("采购组主数据不存在");
        }
        let flag = this.purchaseGroups.some((value) => {
          return value == val.procureGroup.toUpperCase();
        });
        if (!flag) {
          return this.$message.error("您所在的岗位无此采购组权限");
        }
        if (val.procureGroup.toUpperCase().startsWith("PZ")) {
          return this.$message.error("请输入正式采购组");
        }
        createPurchaseOrder(val).then((res) => {
          //调用创建接口
          if (res.code == 200) {
            this.$message.success(res.desZh);
            this.id = res.data;
            this.option = 1;
            this.isEdit = true;
            this.$router.replace({
              path: `/ws2/order/modeler/details/ModelOrderDetailsPage/1/${res.data}`,
              query: {isEdit: this.isEdit},
            });
            this.id = res.data;
            this.queryOrderDetails();
          } else {
            this.$message.error(res.desZh);
          }
        });
      }
    },
    clearForm() {
      this.$refs.orderDetailsTopComponentsRef.restOrderForm();
    },
    async saveOrder() {
      let val = this.$refs.orderDetailsTopComponentsRef.getOrderDetailsVal(); //获取表单数据
      let flag1 = this.purchaseGroupsByAll.some((purchaseGroup) => {
        return (
            purchaseGroup.purchaseGroupCode == val.procureGroup.toUpperCase()
        );
      });
      if (!flag1) {
        return this.$message.error("采购组主数据不存在");
      }
      let flag = this.purchaseGroups.some((value) => {
        return value == val.procureGroup.toUpperCase();
      });
      if (!flag) {
        return this.$message.error("您所在的岗位无此采购组权限");
      }
      this.fullscreenLoading = true;
      let params = {
        orderId: this.id,
        procureGroup: this.orderDetails.procureGroup,
        remark: this.orderDetails.remark,
      };
      let res = await updatePurchaseOrderById(params);
      if (res.code == 200) {
        if (res.data != this.orderDetails.id) {
          this.fullscreenLoading = false;
          this.isEdit = false;
          this.id = res.data;
          this.$router.replace({
            path: `/ws2/order/modeler/details/ModelOrderDetailsPage/1/${res.data}`,
          });
          this.queryOrderDetails();
        } else {
          let itemDatas =
              this.$refs.orderDetailsBottomComponentRef.getOrderItemData();
          let data = {
            orderId: this.orderDetails.id,
            purchaseOrderEntityItemDtos: itemDatas,
          };
          let res1 = await savaPurchaseOrderItem(data);
          if (res1.code == 200) {
            this.fullscreenLoading = false;
            this.isEdit = false;
            this.$refs.orderDetailsBottomComponentRef.queryOrderItemList();
            if (this.$route.query.isEdit) {
              this.option = 1;
              this.isEdit = false;
              this.$route.query.isEdit = false;
              this.$router.replace({
                path: `/ws2/order/modeler/details/ModelOrderDetailsPage/1/${this.orderDetails.id}`,
              });
              this.queryOrderDetails();
            }
          } else {
            this.fullscreenLoading = false;
            this.$message.error(res1.desZh);
          }
        }
      } else {
        this.fullscreenLoading = false;
        this.$message.error(res.desZh);
      }
    },
    editOrder() {
      this.isEdit = true;
    },
    outEditOrder() {
      this.isEdit = false;
    },
    submitOrder() {
      this.fullscreenLoading = true;
      purchaseOrderSubmission(this.orderDetails.id).then((res) => {
        this.fullscreenLoading = false;
        if (res.code == 200) {
          this.$message.success(res.desZh);
          this.queryOrderDetails();
        } else {
          this.$message.error(res.desZh);
        }
      });
    },
    versionUpgrade() {
      this.fullscreenLoading = true;
      versionUpgradeByOrder(this.orderDetails.id).then((res) => {
        this.fullscreenLoading = false;
        if (res.code == 200) {
          this.$message.success(res.desZh);
          this.$router.replace({
            path: `/ws2/order/dbOrder/details/DbOrderDetails/1/${res.data}`,
          });
          this.id = res.data;
          this.queryOrderDetails();
        } else {
          this.$message.error(res.desZh);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.orderClassBox {
  position: relative;

  .pageTitle {
    > span {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .btnList {
    > span {
      font-size: 20px;
      margin-left: 20px;
    }

    .log {
      font-size: 16px;
      color: #1660f1;
      margin-left: 5px;
    }
  }
}

.line-top {
  border-top: solid #969896 0.5px;
}
</style>