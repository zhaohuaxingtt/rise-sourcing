<template>
  <iPage class="sign">
    <headerNav :config="config" />
    <search
      @sure="sure"
      @reset="reset"
      :searchFormData="searchFormData"
      :searchForm="searchForm"
      :options="options"
    />
    <CardTableList
      selection
      indexKey
      permissionKey="SEL_SIGN"
      :tableData="tableData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
      @openPage="openPage"
      :options="options"
    >
      <template v-slot:header-btn>
        <iButton
          @click="openNoInvest"
          v-permission.auto="
            SELTARGETPRICE_SIGNIN_WUMUBIAOJIA |
              (SEL目标价管理 - 目标价签收 - 无目标价)
          "
          >{{ language("无目标价", "无目标价") }}</iButton
        >
        <iButton
          @click="openAssignDialog"
          :loading="assignDialogVisible"
          v-permission.auto="
            SELTARGETPRICE_SIGNIN_ZHIPAI | (SEL目标价管理 - 目标价签收 - 指派)
          "
          >{{ language("LK_ZHIPAI", "指派") }}</iButton
        >
        <iButton
          @click="handleSignIn"
          :loading="signLoading"
          v-permission.auto="
            SELTARGETPRICE_SIGNIN_QIANSHOU | (SEL目标价管理 - 目标价签收 - 签收)
          "
          >{{ language("QIANSHOU", "签收") }}</iButton
        >
      </template>
      <template v-slot:table-page>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        />
      </template>
    </CardTableList>
    <!-- 指派弹窗 -->
    <assignDialog
      ref="assign"
      :dialogVisible.sync="assignDialogVisible"
      :selectItems="selectItems"
      @changeVisible="changeAssignDialogVisible"
      @getTableList="getTableList"
    />
    <!-- 无目标价确认弹窗 -->
    <noInvestConfirmDialog
      ref="noInvestConfirm"
      :dialogVisible="noInvestDialogVisible"
      :selectItems="selectItems"
      @changeVisible="changeNoInvestDialogVisible"
      @getTableList="getTableList"
    />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iMessage } from "rise";
import headerNav from "../components/headerNav";
import search from "../components/search.vue";
import CardTableList from "../components/CardtableList";
import { tableTitle, searchFormData } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import tableList from "../components/tableList";
import assignDialog from "../components/assign";
import noInvestConfirmDialog from "../components/noInvestConfirm";
import moment from "moment";
import { selCfCESearchPage, signSelTargetPrice } from "@/api/SELTargetPrice";
import { dictkey } from "@/api/partsprocure/editordetail";
import { procureFactorySelectVo, selectDictByKeys } from "@/api/dictionary";
export default {
  mixins: [pageMixins],
  components: {
    iPage,
    headerNav,
    iCard,
    tableList,
    iPagination,
    iButton,
    assignDialog,
    noInvestConfirmDialog,
    search,
    CardTableList,
  },
  data() {
    return {
      config: {
        module_obj_ae: "",
        menuName_obj_ae: "SEL-财务管理-SEL目标价工作台-签收",
      },
      options: {},
      searchForm: {},
      searchFormData,
      tableTitle: tableTitle,
      tableData: [],
      tableLoading: false,
      selectOptions: {},
      assignDialogVisible: false,
      selectItems: [],
      rfqId: "",
      applyId: "",
      noInvestDialogVisible: false,
      attachmentDialogVisible: false,
      signLoading: false,
      sendBackDialogVisible: false,
    };
  },
  created() {
    this.selectDictByKeys();
    this.procureFactorySelectVo();
    this.getProcureGroup();
    this.getTableList();
  },
  methods: {
    selectDictByKeys() {
      selectDictByKeys([
        { keys: "PPT" },
        { keys: "sel_target_business_type" },
        { keys: "sel_target_price_status" },
      ]).then((res) => {
        if (res.data) {
          this.$set(this.options, "PPT", res.data["PPT"]);
          this.$set(
            this.options,
            "sel_target_business_type",
            res.data["sel_target_business_type"]
          );
          this.$set(
            this.options,
            "sel_target_price_status",
            res.data["sel_target_price_status"]
          );
        }
      });
    },
    //获取采购工厂 比字典中多了一个 上汽大众销售公司-配件
    procureFactorySelectVo() {
      procureFactorySelectVo().then((res) => {
        if (res.data) {
          this.$set(this.options, "PURCHASE_FACTORY", res.data || []);
        }
      });
    },
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.$set(this.options, "CAR_TYPE_PRO", res.data.CAR_TYPE_PRO || []);
          this.$set(this.options, "CF_CONTROL", res.data.CF_CONTROL || []);
          this.options["CAR_TYPE_PRO"].forEach((item) => {
            item.code = item.id;
          });
        }
      });
    },

    getStatus(status) {
      return (
        this.options.sel_target_price_status?.find(
          (item) => item.code == status
        )?.name || status
      );
    },
    getBusinessDesc(type) {
      return (
        this.options.sel_target_business_type?.find((item) => item.code == type)
          ?.name || type
      );
    },
    // 无目标价
    openNoInvest() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      this.changeNoInvestDialogVisible(true);
    },

    changeNoInvestDialogVisible(visible) {
      this.noInvestDialogVisible = visible;
    },

    handleSelectionChange(val) {
      this.selectItems = val;
    },
    reset() {
      this.searchForm = {};
      this.sure();
    },
    sure() {
      this.page = {
        ...this.page,
        currPage: 1,
      };
      this.getTableList();
    },
    // 跳转FS
    openPage(row) {
      const router = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsprocure/editordetail",
        query: {
          projectId: row.purchasingProjectId,
          businessKey: row.partProjectType,
        },
      });
      window.open(router.href, "_blank");
    },
    /**
     * @Description: 指派
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    openAssignDialog() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      this.changeAssignDialogVisible(true);
    },
    /**
     * @Description: 修改指派弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changeAssignDialogVisible(visible) {
      this.assignDialogVisible = visible;
    },
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getTableList() {
      this.tableLoading = true;
      // eslint-disable-next-line no-undef
      const params = _.omit(
        {
          ...this.searchForm,
          applyDateStart: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[0]).format("YYYY-MM-DD HH:mm:ss")
            : null,
          applyDateEnd: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[1]).format("YYYY-MM-DD HH:mm:ss")
            : null,
          pageType: 1,
          current: this.page.currPage,
          size: this.page.pageSize,
        },
        ["applyDate"]
      );
      selCfCESearchPage(params)
        .then((res) => {
          if (res?.result) {
            this.page = {
              ...this.page,
              totalCount: res.total,
              currPage: res.pageNum,
              pageSize: res.pageSize,
            };
            this.tableData = res.data;
          } else {
            this.tableData = [];
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .catch((e) => {
          this.tableData = [];
          iMessage.error(this.$i18n.locale === "zh" ? e?.desZh : e?.desEn);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    /**
     * @Description: 签收
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    handleSignIn() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      this.$confirm("是否确认签收所选记录？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "返回",
      })
        .then(() => {
          const params = {
            taskId: this.selectItems.map((item) => item.id),
          };
          this.signLoading = true;
          signSelTargetPrice(params)
            .then((res) => {
              if (res?.result) {
                iMessage.success(
                  this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
                );
                this.getTableList();
              } else {
                iMessage.error(
                  this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
                );
              }
            })
            .finally(() => {
              this.signLoading = false;
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.sign{
  display: flex;
  flex-flow: column;
  height: 100%;
  ::v-deep .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 400px;
    display: flex;
    flex-flow: column;
    .card-body-box {
      flex: 1;
      overflow: hidden;
      .cardBody {
        display: flex;
        flex-flow: column;
      }
      .table-box {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
.openLinkText {
  color: $color-blue;
  text-decoration: underline;
}
</style>