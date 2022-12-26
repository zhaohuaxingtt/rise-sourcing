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
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <iButton @click="openNoInvest"
          v-permission.auto="SELTARGETPRICE_SIGNIN_WUMUBIAOJIA|SEL目标价管理-目标价签收-无目标价">{{
            language("无目标价", "无目标价")
          }}</iButton>
          <iButton @click="openAssignDialog" :loading="assignDialogVisible"
          v-permission.auto="SELTARGETPRICE_SIGNIN_ZHIPAI|SEL目标价管理-目标价签收-指派">{{
            language("LK_ZHIPAI", "指派")
          }}</iButton>
          <iButton @click="handleSignIn" :loading="signLoading"
          v-permission.auto="SELTARGETPRICE_SIGNIN_QIANSHOU|SEL目标价管理-目标价签收-签收">{{
            language("QIANSHOU", "签收")
          }}</iButton>
        </div>
      </div>
      <tableList
        selection
        indexKey
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #fsNum="scope">
          <span class="link-underline cursor" @click="gotoDetail(scope.row)">{{
            scope.row.fsNum
          }}</span>
        </template>

        <template #businessType="scope">
          <span>{{ getBusinessDesc(scope.row.businessType) }}</span>
        </template>
        <template #status="scope">
          <span>{{ getStatus(scope.row.status) }}</span>
        </template>
        <!-- 期望目标价-分摊 -->
        <template #expectedShareTargetPrice="scope">
          <span>{{ scope.row.expectedShareTargetPrice | thousandsFilter(0)}}</span>
        </template>
        <!-- 期望目标价-一次性 -->
        <template #expectedDisposableTargetPrice="scope">
          <span>{{ scope.row.expectedDisposableTargetPrice | thousandsFilter(0)}}</span>
        </template>
      </tableList>
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
import {
  iPage,
  iCard,
  iPagination,
  iButton,
  iMessage,
} from "rise";
import headerNav from "../components/headerNav";
import search from "../components/search.vue";
import { tableTitle, searchFormData } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import tableList from "../components/tableList";
import assignDialog from "../components/assign";
import noInvestConfirmDialog from "../components/noInvestConfirm";
import moment from "moment";
import { selCfCESearchPage, signSelTargetPrice } from "@/api/SELTargetPrice";
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
    assignDialog,
    noInvestConfirmDialog,
    search,
  },
  data() {
    return {
      config:{
            module_obj_ae: '', 
            menuName_obj_ae: 'SEL-财务管理-SEL目标价工作台-签收'
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
    gotoDetail(row) {
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
            ? moment(this.searchForm.applyDate[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          applyDateEnd: this.searchForm.applyDate
            ? moment(this.searchForm.applyDate[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
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
.openLinkText {
  color: $color-blue;
  text-decoration: underline;
}
</style>