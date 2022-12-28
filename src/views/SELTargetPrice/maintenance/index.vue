<template>
  <iPage>
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
      permissionKey="SEL_MAINTENANCE"
      :tableData="tableData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @openApprovalDialog="openApprovalDialog"
      @handleSelectionChange="handleSelectionChange"
      @openPage="openPage"
      @gotoRFQ="gotoRFQ"
      :options="options"
    >
      <template v-slot:header-btn>
          <iButton
            @click="openNoInvest"
            :loading="noInvestLoading"
            v-permission.auto="
              SELTARGETPRICE_MAINTENANCE_WUMUBIAOJIA |
                (SEL目标价管理 - 目标价维护 - 无目标价)
            "
            >{{ language("无目标价", "无目标价") }}</iButton
          >
          <!--------------------指派按钮----------------------------------->
          <iButton
            @click="openAssignDialog"
            :loading="assignDialogVisible"
            v-permission.auto="
              SELTARGETPRICE_MAINTENANCE_ZHIPAI |
                (SEL目标价管理 - 目标价维护 - 指派)
            "
            >{{ language("ZHIPAI", "指派") }}</iButton
          >
          <!--------------------导出按钮----------------------------------->
          <iButton
            @click="handleExport"
            :loading="exportLoading"
            v-permission.auto="
              SELTARGETPRICE_MAINTENANCE_DAOCHU |
                (SEL目标价管理 - 目标价维护 - 导出)
            "
            >{{ language("DAOCHU", "导出") }}</iButton
          >
          <!--------------------导入批量维护按钮----------------------------------->
          <el-upload
            class="margin-left10 margin-right10"
            accept=".xlsx"
            style="display: inline-block"
            :http-request="importSelCfceMaintained"
            :show-file-list="false"
            v-permission.auto="
              SELTARGETPRICE_MAINTENANCE_PILIANGDAORUWEIHU |
                (SEL目标价管理 - 目标价维护 - 导入批量维护)
            "
          >
            <iButton :loading="uploadLoading">{{
              language("DAORUPILIANGWEIHU", "导入批量维护")
            }}</iButton>
          </el-upload>
          <iButton
            @click="openMaintain"
            :loading="assignDialogVisible"
            v-permission.auto="
              SELTARGETPRICE_MAINTENANCE_WEIHU |
                (SEL目标价管理 - 目标价维护 - 维护)
            "
            >{{ language("维护", "维护") }}</iButton
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
    <!------------------------------------------------------------------------>
    <!--                  审批记录弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalRecordDialog
      :dialogVisible="approvalDialogVisible"
      @changeVisible="changeApprovalDialogVisible"
      :id="taskId"
    />
    <!------------------------------------------------------------------------>
    <!--                  指派弹窗                                      --->
    <!------------------------------------------------------------------------>
    <assignDialog
      ref="assignDialog"
      :dialogVisible.sync="assignDialogVisible"
      :selectItems="selectItems"
      @getTableList="getTableList"
      @changeVisible="changeAssignDialogVisible"
    />
    <!-- 维护弹窗 -->
    <batchMaintain
      ref="assignDialog"
      v-if="maintainVisible"
      :tableData="maintainTable"
      :options="options"
      :dialogVisible.sync="maintainVisible"
      @changeVisible="changeMaintainVisible"
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
import {
  iPage,
  iCard,
  iPagination,
  iButton,
  iSelect,
  iDatePicker,
  iInput,
  iSearch,
  iMessage,
  iMultiLineInput,
} from "rise";
import headerNav from "../components/headerNav";
import search from "../components/search.vue";
import CardTableList from "../components/CardtableList";
import batchMaintain from "../components/batchMaintain.vue";
import noInvestConfirmDialog from "../components/noInvestConfirm";
import { tableTitle, searchFormData } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import tableList from "../components/tableList";
import approvalRecordDialog from "./components/approvalRecord";
import assignDialog from "../components/assign";
import iDicoptions from "rise/web/components/iDicoptions";
import {
  selCfCESearchPage,
  exportSelCfceMaintainedApproval,
  importSelCfceMaintained,
} from "@/api/SELTargetPrice";
import { dictkey } from "@/api/partsprocure/editordetail";
import { procureFactorySelectVo, selectDictByKeys } from "@/api/dictionary";
import moment from "moment";
import filters from '@/utils/filters'

export default {
  mixins: [pageMixins, filters],
  components: {
    iDicoptions,
    noInvestConfirmDialog,
    iPage,
    headerNav,
    iCard,
    tableList,
    iPagination,
    iButton,
    iSelect,
    iDatePicker,
    iInput,
    iSearch,
    approvalRecordDialog,
    assignDialog,
    iMultiLineInput,
    batchMaintain,
    search,
    CardTableList
  },
  data() {
    return {
      config:{
        module_obj_ae: '', 
        menuName_obj_ae: 'SEL-财务管理-SEL目标价工作台-维护'
      },
      options: {},
      searchForm: {},
      searchFormData,
      tableTitle: tableTitle,
      tableData: [],
      tableLoading: false,
      selectOptions: {},
      attachmentDialogVisible: false,
      approvalDialogVisible: false,
      recordId: "",
      applyId: "",
      rfqId: "",
      fsNum: "",
      selectItems: [],
      maintainTable: [],
      uploadLoading: false,
      exportLoading: false,
      assignDialogVisible: false,
      noInvestDialogVisible: false,
      maintainVisible: false,
      taskId: "",
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
    // 导出
    handleExport() {
      let params = {
        // ...this.searchForm,
        // applyDateStart: this.searchForm.applyDate
        //   ? moment(this.searchForm.applyDate[0]).format("YYYY-MM-DD HH:mm:ss")
        //   : null,
        // applyDateEnd: this.searchForm.applyDate
        //   ? moment(this.searchForm.applyDate[1]).format("YYYY-MM-DD HH:mm:ss")
        //   : null,
        pageType: 2,
        // current: this.page.currPage,
        // size: this.page.pageSize,
        excelList: this.selectItems,
      };
      exportSelCfceMaintainedApproval(params).then((res) => {
        console.log(res);
      });
    },
    /**
     * @Description: 指派
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    openAssignDialog() {
      console.log("openAssignDialog");
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
    // 维护
    openMaintain() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      this.changeMaintainVisible(true);
    },
    changeMaintainVisible(visible) {
      this.maintainVisible = visible;
      console.log(this.maintainVisible);
    },
    sure() {
      this.page = {
        ...this.page,
        currPage: 1,
      };
      this.getTableList();
    },
    reset() {
      this.searchForm = {};
      this.sure();
    },
    handleSelectionChange(val) {
      this.selectItems = val;
      this.maintainTable = val;
    },
    // 跳转FS
    openPage(row) {
      const router = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsprocure/editordetail",
        query: {
          projectId: row.purchasingProjectPartId,
          businessKey: row.partProjectType,
        },
      });
      window.open(router.href, "_blank");
    },
    // 跳转RFQ
    gotoRFQ(row) {
      const router = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsrfq/assistant",
        query: { id: row.rfqCode },
      });
      window.open(router.href, "_blank");
    },
    /**
     * @Description: 审批记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */
    openApprovalDialog(row) {
      this.taskId = row.id || "";
      this.changeApprovalDialogVisible(true);
    },
    /**
     * @Description: 修改审批记录弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changeApprovalDialogVisible(visible) {
      this.approvalDialogVisible = visible;
    },
    /**
     * @Description: 附件查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */
    openAttachmentDialog(row) {
      this.rfqId = row.rfqId || "";
      this.changeAttachmentDialogVisible(true);
    },
    /**
     * @Description: 修改附件弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changeAttachmentDialogVisible(visible) {
      this.attachmentDialogVisible = visible;
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
          searchType: "0",
          applyDateStart: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[0]).format("YYYY-MM-DD HH:mm:ss")
            : null,
          applyDateEnd: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[1]).format("YYYY-MM-DD HH:mm:ss")
            : null,
          pageType: 2,
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

    importSelCfceMaintained(content) {
      const formData = new FormData();
      formData.append("file", content.file);
      importSelCfceMaintained(formData).then((res) => {
        if (res?.code == "200") {
          this.maintainTable = res.data;
          this.changeMaintainVisible(true);
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>