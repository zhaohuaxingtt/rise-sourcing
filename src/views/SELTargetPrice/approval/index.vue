<template>
  <iPage class="approval">
    <headerNav :config="config"/>
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
      permissionKey="SEL_APPROVAL"
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
          <iButton @click="openMaintain"
            v-permission.auto="SELTARGETPRICE_APPROVAL_WEIHU |SEL目标价管理-目标价审批-维护">
            {{ language("WEIHU", "维护") }}
          </iButton>
          <iButton @click="openApprovalDetailDialog"
            v-permission.auto="SELTARGETPRICE_APPROVAL_PIZHUN |SEL目标价管理-目标价审批-批准">
            {{ language("PIZHUN", "批准") }}
          </iButton>
          <iButton @click="recallBack"
            v-permission.auto="SELTARGETPRICE_APPROVAL_BOHUI |SEL目标价管理-目标价审批-驳回">{{ language("驳回", "驳回") }}</iButton>
          <iButton @click="handleExport" :loading="exportLoading"
            v-permission.auto="SELTARGETPRICE_APPROVAL_DAOCHU |SEL目标价管理-目标价审批-导出">{{
            language("DAOCHU", "导出")
          }}</iButton>
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
    <!-- 审批记录弹窗 -->
    <approvalRecordDialog
      :dialogVisible="approvalRecordDialogVisible"
      @changeVisible="changeApprovalRecordDialogVisible"
      :id="taskId"
    />
    <!-- 批准弹窗 -->
    <approvalDialog
      ref="modelApproval"
      :tableData="selectItems"
      :isApproval="true"
      :dialogVisible="approvalDialogVisible"
      @changeVisible="changeApprovalDialogVisible"
    />
    <!-- 维护弹窗 -->
    <batchMaintain
      ref="assignDialog"
      v-if="maintainVisible"
      :tableData="selectItems"
      :options="options"
      :isMaintain="false"
      :dialogVisible.sync="maintainVisible"
      @changeVisible="changeMaintainVisible"
    />
    <!-- 驳回弹窗 -->
    <recallBackDialog
      ref="sendBackConfirm"
      :selectItems="selectItems"
      :dialogVisible="recallBackDialogVisible"
      @changeVisible="changeSendBackDialogVisible"
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
import recallBackDialog from "../components/recallBack.vue";

import { tableTitle, searchFormData } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import tableList from "../components/tableList";
import approvalRecordDialog from "../maintenance/components/approvalRecord";
import approvalDialog from "../components/approvalDialog";
import {
  selCfCESearchApprovalPage,
  exportSelCfceMaintainedApproval,
} from "@/api/SELTargetPrice";
import { dictkey } from "@/api/partsprocure/editordetail";
import { procureFactorySelectVo, selectDictByKeys } from "@/api/dictionary";
import filters from '@/utils/filters'
export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    headerNav,
    iCard,
    tableList,
    iPagination,
    iButton,
    iSelect,
    iInput,
    iSearch,
    approvalRecordDialog,
    approvalDialog,
    iMultiLineInput,
    batchMaintain,
    search,
    recallBackDialog,
    CardTableList
  },
  data() {
    return {
      config:{
        module_obj_ae: '', 
        menuName_obj_ae: 'SEL-财务管理-SEL目标价工作台-审批'
      },
      options: {},
      searchForm: {},
      searchFormData,
      tableTitle: tableTitle,
      tableData: [],
      isEdit: false,
      tableLoading: false,
      selectOptions: {},
      approvalDialogVisible: false,
      selectItems: [],
      applyId: "",
      fsNum: "",
      attachmentDialogVisible: false,
      approvalRecordDialogVisible: false,
      maintainVisible: false,
      recallBackDialogVisible: false,
      taskId: "",
      exportLoading: false,
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
          this.options['CAR_TYPE_PRO'].forEach(item=>{
            item.code = item.id
          })
        }
      });
    },

    getStatus(status) {
      return (
        this.options.sel_target_price_status?.find((item) => item.code == status)
          ?.name || status
      );
    },
    getBusinessDesc(type) {
      return (
        this.options.sel_target_business_type?.find((item) => item.code == type)
          ?.name || type
      );
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
     * @Description: 修改记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */
    openUpdateDialog(row) {
      this.fsNum = row.fsnrGsnrNum || "";
      this.changeUpdateDialogVisible(true);
    },
    /**
     * @Description: 审批记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */
    openApprovalDialog(row) {
      this.taskId = row.id || "";
      this.changeApprovalRecordDialogVisible(true);
    },
    /**
     * @Description: 修改审批记录弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changeApprovalRecordDialogVisible(visible) {
      this.approvalRecordDialogVisible = visible;
    },
    /**
     * @Description: 修改修改记录弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changeUpdateDialogVisible(visible) {
      this.updateDialogVisible = visible;
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
    handleSelectionChange(val) {
      this.selectItems = val;
    },
    getTableList() {
      this.tableLoading = true;
      const params = {
        ...this.searchForm,
        pageType: 3,
        applyDateStart: this.searchForm.applyDate
          ? moment(this.searchForm.applyDate[0]).format("YYYY-MM-DD HH:mm:ss")
          : null,
        applyDateEnd: this.searchForm.applyDate
          ? moment(this.searchForm.applyDate[1]).format("YYYY-MM-DD HH:mm:ss")
          : null,
        current: this.page.currPage,
        size: this.page.pageSize,
      };
      selCfCESearchApprovalPage(params)
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
    // 跳转RFQ
    gotoRFQ(row) {
      const router = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsrfq/assistant",
        query: { id: row.rfqCode },
      });
      window.open(router.href, "_blank");
    },
    // 打开审批确认弹窗
    openApprovalDetailDialog(row) {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      this.changeApprovalDialogVisible(true);
    },
    changeApprovalDialogVisible(visible) {
      this.approvalDialogVisible = visible;
      if (!visible) {
        this.getTableList();
      }
    },
    // 驳回
    recallBack() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      this.changeSendBackDialogVisible(true);
    },

    changeSendBackDialogVisible(visible) {
      this.recallBackDialogVisible = visible;
    },
    // 维护、批量维护
    batchMaintain() {
      const router = this.$router.resolve({
        path: "/targetpriceandscore/seltargetprice/batchMaintain",
      });
      window.open(router.href, "_blank");
    },

    // 维护、批量维护
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

    /**
     * @Description: 更改编辑状态
     * @Author: Luoshuang
     * @param {*} isEdit 是否为编辑状态
     * @return {*}
     */
    changeEdit(isEdit) {
      this.isEdit = isEdit;
    },
    // async handleExport() {
    //   const params = {
    //     ...this.searchForm,
    //     pageType: 3,
    //     applyDateStart: this.searchForm.applyDate
    //       ? moment(this.searchForm.applyDate[0]).format("YYYY-MM-DD HH:mm:ss")
    //       : null,
    //     applyDateEnd: this.searchForm.applyDate
    //       ? moment(this.searchForm.applyDate[1]).format("YYYY-MM-DD HH:mm:ss")
    //       : null,
    //     current: this.page.currPage,
    //     size: this.page.pageSize,
    //   };
    //   exportSelCfceMaintainedApproval(params).then((res) => {
    //     console.log(res);
    //   });
    // },
    
    // 导出
    handleExport() {
      this.exportLoading = true;
      let params = {
        pageType: 3,
        excelList: this.selectItems,
      };
      exportSelCfceMaintainedApproval(params).then((res) => {
        console.log(res);
        this.exportLoading = false;
      });
    },
    handleUpload() {},
    /**
     * @Description: 保存编辑后的内容
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    handleSave() {
      this.changeEdit(false);
    },
    /**
     * @Description: 取消编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    handleCancel() {
      this.changeEdit(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.approval{
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
</style>