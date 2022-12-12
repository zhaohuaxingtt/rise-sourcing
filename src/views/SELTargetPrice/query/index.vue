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
        selection
        indexKey
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @openApprovalDialog="openApprovalDialog"
      >
        <template #fsNum="scope">
          <span class="link-underline cursor" @click="openPage(scope.row)">{{
            scope.row.fsNum
          }}</span>
        </template>
        <template #businessType="scope">
          <span>{{
            getBusinessDesc(scope.row.businessType)
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
  iMessage,
} from "rise";
import search from "../components/search.vue";
import headerNav from "../components/headerNav";
import { tableTitle, searchFormData } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import tableList from "../components/tableList";
import approvalRecordDialog from "../maintenance/components/approvalRecord";
import attachmentDialog from "@/views/costanalysismanage/components/home/components/downloadFiles/index";
import { selCfCESearchAllPage, applySelTargetPriceRecordList } from "@/api/SELTargetPrice";
import { dictkey } from "@/api/partsprocure/editordetail";
import { procureFactorySelectVo, selectDictByKeys } from "@/api/dictionary";
import moment from "moment";
export default {
  mixins: [pageMixins],
  components: {
    iPage,
    headerNav,
    iCard,
    tableList,
    iPagination,
    iButton,
    attachmentDialog,
    approvalRecordDialog,
    search,
  },
  data() {
    return {
      options: {},
      searchForm: {},
      searchFormData,
      tableTitle,
      tableData: [],
      isEdit: false,
      tableLoading: false,
      attachmentDialogVisible: false,
      approvalDialogVisible: false,
      selectItems: [],
      rfqId: "",
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
    getBusinessDesc(code){
      return this.options.sel_target_business_type.find(item=>item.code==code)?.name || code
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
      const params = {
        current: this.page.currPage,
        size: this.page.pageSize,
        extendFields: {
          ...this.searchForm,
          pageType:4,
          applyStartDate: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          applyEndDate: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          returnStartDate: this.searchForm.responseDate
            ? moment(this.searchForm.responseDate[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          returnEndDate: this.searchForm.responseDate
            ? moment(this.searchForm.responseDate[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
        },
      };
      selCfCESearchAllPage(params)
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
      await applySelTargetPriceRecordList(this.selectItems.map((item) => item.taskItemId));
      this.exportLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>