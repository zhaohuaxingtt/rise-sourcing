<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:12:31
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-14 09:50:31
 * @Description: 模具目标价-目标价维护
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\maintenance\index.vue
-->

<template>
  <iPage
    v-permission.auto="
      MODELTARGETPRICE_MAINTENANCE_PAGE | (模具目标价管理 - 目标价维护 - 页面)
    "
  >
    <headerNav />
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <search
      @sure="sure"
      @reset="reset"
      :searchFormData="searchFormData"
      :searchForm="searchForm"
      :options="options"
    />
    <!----------------------------------------------------------------->
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard
      class="margin-top20"
      v-permission.auto="
        MODELTARGETPRICE_MAINTENANCE_TABLE |
          (模具目标价管理 - 目标价维护 - 表格)
      "
    >
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <iButton @click="openNoInvest" :loading="noInvestLoading">{{
            language("无目标价", "无目标价")
          }}</iButton>
          <!--------------------指派按钮----------------------------------->
          <iButton @click="openAssignDialog" :loading="assignDialogVisible">{{
            language("ZHIPAI", "指派")
          }}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleExport" :loading="exportLoading">{{
            language("DAOCHU", "导出")
          }}</iButton>
          <!--------------------导入批量维护按钮----------------------------------->
          <el-upload
            class="margin-left10 margin-right10"
            accept=".xlsx"
            style="display: inline-block"
            :http-request="upload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <iButton :loading="uploadLoading">{{
              language("DAORUPILIANGWEIHU", "导入批量维护")
            }}</iButton>
          </el-upload>
          <iButton @click="openMaintain" :loading="assignDialogVisible">{{
            language("维护", "维护")
          }}</iButton>
        </div>
      </div>
      <tableList
        ref="tableList"
        :activeItems="'rfqId'"
        selection
        indexKey
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @openPage="openPage"
        @openAttachmentDialog="openAttachmentDialog"
        @openApprovalDialog="openApprovalDialog"
      >
        <template #businessType="scope">
          <span>{{ getBusinessDesc(scope.row.businessType) }}</span>
        </template>
        <template #status="scope">
          <span>{{ getStatus(scope.row.status) }}</span>
        </template>
      </tableList>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
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
    </iCard>
    <!------------------------------------------------------------------------>
    <!--                  附件弹窗                                      --->
    <!------------------------------------------------------------------------>
    <attachmentDialog
      :dialogVisible="attachmentDialogVisible"
      @changeVisible="changeAttachmentDialogVisible"
      :rfqNum="rfqId"
    />
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
      :tableData="selectItems"
      :options="options"
      :dialogVisible.sync="maintainVisible"
      @changeVisible="changeMaintainVisible"
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
import batchMaintain from "../components/batchMaintain.vue";
import noInvestConfirmDialog from "../components/noInvestConfirm";
import { tableTitle, searchFormData } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import tableList from "../components/tableList";
import attachmentDialog from "@/views/costanalysismanage/components/home/components/downloadFiles/index";
import approvalRecordDialog from "./components/approvalRecord";
import assignDialog from "../components/assign";
import iDicoptions from "rise/web/components/iDicoptions";
import carProjectSelect from "@/views/modelTargetPrice/components/carProjectSelect";
import procureFactorySelect from "@/views/modelTargetPrice/components/procureFactorySelect";
import {
  selCfCESearchPage,
  exportSelCfceMaintained,
} from "@/api/SELTargetPrice";
import { dictkey } from "@/api/partsprocure/editordetail";
import { procureFactorySelectVo, selectDictByKeys } from "@/api/dictionary";
import moment from "moment";

export default {
  mixins: [pageMixins],
  components: {
    carProjectSelect,
    iDicoptions,
    noInvestConfirmDialog,
    procureFactorySelect,
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
    attachmentDialog,
    approvalRecordDialog,
    assignDialog,
    iMultiLineInput,
    batchMaintain,
    search,
  },
  data() {
    return {
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
        }
      });
    },
    getStatus(status) {
      return (
        this.options.sel_target_price_status.find((item) => item.code == status)
          ?.name || status
      );
    },
    getBusinessDesc(type) {
      return (
        this.options.sel_target_business_type.find((item) => item.code == type)
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
      let params = _.omit(
        {
          ...this.searchForm,
          applyDateStart: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          applyDateEnd: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          pageType: 2,
          current: this.page.currPage,
          size: this.page.pageSize,
        },
        ["applyDate"]
      );
      exportSelCfceMaintained(params).then((res) => {
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
    beforeUpload() {
      this.uploadLoading = true;
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
    },
    openPage(row) {
      const router = this.$router.resolve({
        path: "/targetpriceandscore/modeltargetprice/detail",
        query: { ...row, applyType: "2" },
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
      this.taskId = row.taskId || "";
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
            ? moment(this.searchForm.applyDate[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          applyDateEnd: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
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
  },

  upload(content) {
    const formData = new FormData();
    formData.append("file", content.file);
    // formData.append('applicationName', 'procurereq-service')
    // 上传接口
    let res = true;
    // 上传成功
    if (res) {
      const router = this.$router.resolve({
        path: "/targetpriceandscore/seltargetprice/batchMaintain",
      });
      window.open(router.href, "_blank");
    }
  },
};
</script>

<style lang="scss" scoped>
</style>