<template>
  <iPage
    v-permission.auto="
      MODELTARGETPRICE_QUERY_PAGE | (模具目标价管理 - 目标价查询 - 页面)
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
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard
      class="margin-top20"
      v-permission.auto="
        MODELTARGETPRICE_QUERY_TABLE | (模具目标价管理 - 目标价查询 - 表格)
      "
    >
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <!--------------------导出按钮----------------------------------->
          <iButton
            @click="handleExport"
            :loading="exportLoading"
            v-permission.auto="
              MODELTARGETPRICE_QUERY_EXPORT |
                (模具目标价管理 - 目标价查询 - 导出)
            "
            >{{ language("DAOCHU", "导出") }}</iButton
          >
        </div>
      </div>
      <tableList
        :activeItems="'fsNum'"
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
        <template #rfqId="scope">
          <span class="link-underline cursor" @click="gotoDetail(scope.row)">{{
            scope.row.rfqId
          }}</span>
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
import search from "../components/search.vue";
import headerNav from "../components/headerNav";
import { tableTitle, searchFormData } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import tableList from "../components/tableList";
import approvalRecordDialog from "../maintenance/components/approvalRecord";
// import { excelExport } from "@/utils/filedowLoad"
import iDicoptions from "rise/web/components/iDicoptions";
import attachmentDialog from "@/views/costanalysismanage/components/home/components/downloadFiles/index";
import carProjectSelect from "@/views/modelTargetPrice/components/carProjectSelect";
import procureFactorySelect from "@/views/modelTargetPrice/components/procureFactorySelect";
import {
  getTargetPriceSelectPage,
  exportTargetPrice,
} from "@/api/modelTargetPrice/index";
import { getSelTargetPriceTask } from "@/api/SELTargetPrice";
import { dictkey } from "@/api/partsprocure/editordetail";
import { procureFactorySelectVo, selectDictByKeys } from "@/api/dictionary";
import moment from "moment";
export default {
  mixins: [pageMixins],
  components: {
    iDicoptions,
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
    carProjectSelect,
    iMultiLineInput,
    search,
  },
  data() {
    return {
      options: {},
      searchForm: {},
      searchFormData,
      tableTitle: tableTitle,
      tableData: [],
      searchParams: {
        partProjectType: "",
        cartypeProjectId: "",
        procureFactory: "",
        applyType: "",
        state: "",
        showSelf: true,
      },
      isEdit: false,
      tableLoading: false,
      attachmentDialogVisible: false,
      approvalDialogVisible: false,
      selectItems: [],
      rfqId: "",
      applyId: "",
      fsNum: "",
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
        { keys: "sign_page_apply_type" },
        { keys: "tooling_target_price_page_task_state" },
      ]).then((res) => {
        if (res.data) {
          this.$set(this.options, "PPT", res.data["PPT"]);
          this.$set(
            this.options,
            "sign_page_apply_type",
            res.data["sign_page_apply_type"]
          );
          this.$set(
            this.options,
            "tooling_target_price_page_task_state",
            res.data["tooling_target_price_page_task_state"]
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
    gotoDetail(row) {
      const router = this.$router.resolve({
        path: "/targetpriceandscore/modeltargetprice/detail",
        query: { ...row, applyType: "4" },
      });
      window.open(router.href, "_blank");
    },
    handleSelectionChange(val) {
      this.selectItems = val;
    },
    reset() {
      this.searchParams = {
        partProjectType: "",
        cartypeProjectId: "",
        procureFactory: "",
        applyType: "",
        state: "",
      };
      this.sure();
    },
    sure() {
      this.page = {
        ...this.page,
        currPage: 1,
      };
      this.getTableList();
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
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getTableList() {
      this.tableLoading = true;
      // eslint-disable-next-line no-undef
      const params = {
        current: this.page.currPage,
        size: this.page.pageSize,
        extendFields: {
          ...this.searchParams,
          applyStartDate: this.searchParams.applyDate
            ? moment(this.searchParams.applyDate[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          applyEndDate: this.searchParams.applyDate
            ? moment(this.searchParams.applyDate[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          returnStartDate: this.searchParams.responseDate
            ? moment(this.searchParams.responseDate[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          returnEndDate: this.searchParams.responseDate
            ? moment(this.searchParams.responseDate[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
        },
      };
      getSelTargetPriceTask(params)
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
    async handleExport() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      this.exportLoading = true;
      await exportTargetPrice(this.selectItems.map((item) => item.taskItemId));
      this.exportLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>