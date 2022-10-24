<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:48:55
 * @Description: 封面表态--预览--Aeko管理员/科室协调员/CSF分配人
-->
<template>
  <iCard
    :title="language('LK_AEKO_FENGMIANBIAOTAI', '封⾯表态')"
    class="previewCover"
  >
    <iFormGroup row="4" class="basic-form">
      <template v-for="(item, index) in basicTitle">
        <iFormItem
          v-permission.auto="item.permissionKey"
          :key="'basicInfo_' + index"
          :label="language(item.labelKey, item.label) + ':'"
          :label-width="item.labelWidth || '120px'"
        >
          <iText>{{
            item.isObj ? basicInfo[item.props + "Desc"] : basicInfo[item.props]
          }}</iText>
        </iFormItem>
      </template>
    </iFormGroup>
    <div
      v-permission.auto="
        AEKO_DETAIL_TAB_FENGMIAN_TEXT_TIPS | 封面表态备注框_预览
      "
    >
      <p class="margin-bottom10 remark-label">
        {{ language("LK_BEIZHU", "备注") }}:
      </p>
      <iInput
        disabled
        class="text-disabled"
        type="textarea"
        rows="10"
        resize="none"
        v-model="basicInfo.remark"
      />
    </div>
    <!-- 费用合计table -->
    <div
      class="margin-top40"
      v-permission.auto="
        AEKO_DETAIL_TAB_FENGMIAN_TABLE_CARTYPE | 封面表态费用表单_预览
      "
    >
      <tableList
        class="summaryTable"
        :indexConfig="{ width: 60 }"
        :selection="false"
        index
        :show-summary="true"
        :lang="true"
        :summary-method="getSummaries"
        :tableData="tableTDataCost"
        :tableTitle="tableTitleCost"
        :tableLoading="tableLoading.cost"
      >
        <template #materialIncrease="scope">
          {{ fixNumber(scope.row.materialIncrease, 2) || "" }}
        </template>
        <template #investmentIncrease="scope">
          {{ fixNumber(scope.row.investmentIncrease, 0) || "" }}
        </template>
        <template #otherCost="scope">
          {{ fixNumber(scope.row.otherCost, 0) || "" }}
        </template>
      </tableList>
      <p class="summaryTable-tips margin-top20">
        Top-Aeko / Top-MP：|ΔGesamt Materialkosten| ≥35 RMB oder
        Invest≥10,000,000 RMB; Top-AeA: ΔGesamt Materialkosten ≥35 RMB oder
        Invest≥10,000,000 RMB
      </p>
    </div>
    <p class="divider"></p>

    <!-- 科室linie费用table -->
    <div
      v-permission.auto="
        AEKO_DETAIL_TAB_FENGMIAN_TABLE_LINIE | 封面表态LINIE表_预览
      "
    >
      <p class="btn-list margin-bottom20">
        <template v-if="!isFromCheck">
          <iButton
            v-permission.auto="
              AEKO_DETAIL_TAB_FENGMIAN_BUTTON_QUXIAOTONGGUO | 取消通过
            "
            v-if="!disabled"
            @click="cancelPass"
            :loading="canceling"
            >{{ language("LK_QUXIAOTONGGUO", "取消通过") }}</iButton
          >
          <!-- aeko状态为已撤销的时候禁用解冻按钮 -->
          <iButton
            :disabled="btnDisabled"
            v-permission.auto="AEKO_DETAIL_TAB_FENGMIAN_BUTTON_JIEDONG | 解冻"
            @click="unfreeze"
            >{{ language("LK_JIEDONG", "解冻") }}</iButton
          >
        </template>
      </p>
      <tableList
        index
        ref="tableList"
        :lang="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading.depart"
        @handleSelectionChange="handleSelectionChange"
        :handleSaveSetting="handleSaveSetting"
        :handleResetSetting="handleResetSetting"
      >
        <template #materialIncrease="scope">
          {{ fixNumber(scope.row.materialIncrease, 2) || "" }}
        </template>
        <template #investmentIncrease="scope">
          {{ fixNumber(scope.row.investmentIncrease, 0) || "" }}
        </template>
        <template #otherCost="scope">
          {{ fixNumber(scope.row.otherCost, 0) || "" }}
        </template>
      </tableList>
      <!-- 分页 -->
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getLinie)"
        @current-change="handleCurrentChange($event, getLinie)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </div>
    <!-- 解冻弹窗 -->
    <unfreezeDialog
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      :basicInfo="basicInfo"
      @changeVisible="changeVisible"
      @getList="getList"
    />
  </iCard>
</template>

<script>
import {
  iCard,
  iFormGroup,
  iFormItem,
  iText,
  iInput,
  iButton,
  iPagination,
  iMessage,
} from "rise";
import {
  previewBaicFrom,
  coverTableTitleCost,
  coverTableTitleDepart,
} from "../../data";
// import tableList from "../tableList"
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { getTousandNum } from "@/utils/tool";
import { pageMixins } from "@/utils/pageMixins";
import {
  getCoverDetail,
  getLiniePage,
  cancelPass,
} from "@/api/aeko/detail/cover.js";
import unfreezeDialog from "./unfreezeDialog";
import { roleMixins } from "@/utils/roleMixins";
import { cloneDeep } from "lodash";
export default {
  name: "previewCover",
  mixins: [pageMixins, roleMixins, tableSortMixins],
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iText,
    iInput,
    tableList,
    iButton,
    iPagination,
    unfreezeDialog,
  },
  data() {
    return {
      getTousandNum,
      basicTitle: previewBaicFrom,
      basicInfo: {},
      tips: "",
      tableLoading: {
        cost: false,
        depart: false,
      },
      tableTitleCost: coverTableTitleCost,
      tableTDataCost: [],
      tableListData: [],
      tableTitle: coverTableTitleDepart,
      selectItems: [],
      dialogVisible: false,
      canceling: false,
      isFromCheck: false,
      disabled: true,
    };
  },
  props: {
    currentTab: { type: String },
    aekoInfo: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    // tab 页切换到审批记录时，查询数据
    currentTab: {
      handler(val) {
        if (val == "cover") {
          this.queryData();
        }
      },
      immediate: true,
    },
  },
  computed: {
    btnDisabled() {
      // 已撤销的AEKO不允许操作解冻
      return this.aekoInfo.aekoStatus == "CANCELED";
    },
  },
  methods: {
    queryData() {
      this.getList();
      this.getLinie();
      // 判断是否从AEKO查看跳转进入该页面 并且底部表单多一个冻结时间字段
      const { query } = this.$route;
      const { from = "" } = query;
      if (from == "check") {
        this.isFromCheck = true;
        const filterFrozen = this.tableTitle.filter(
          (item) => item.props === "frozenTime"
        );
        if (!filterFrozen.length) {
          this.tableTitle.push({
            props: "frozenTime",
            name: "冻结时间",
            key: "LK_AEKO_DONGJIESHIJIAN",
            tooltip: true,
          });
        }
      }

      // 提示不可见
      const coverTableTitle = cloneDeep(coverTableTitleCost);
      coverTableTitle.map((item) => {
        if (item.props == "materialIncrease") item.showTips = false;
      });
      this.tableTitleCost = coverTableTitle;
    },
    // 获取详情
    async getList(type = null) {
      this.tableLoading = { cost: true };
      const { query } = this.$route;
      const { requirementAekoId = "", from = "" } = query;
      await getCoverDetail({
        requirementAekoId,
        isView: from == "check" ? 1 : undefined,
      })
        .then((res) => {
          this.tableLoading = { cost: false };
          const { code, data } = res;
          if (code == 200) {
            this.basicInfo = data;
            const roleList = this.roleList;
            this.disabled = !(
              roleList.includes("AEKOGLY") && data.coverStatus == "MEETING_PASS"
            ); // AKEO管理员,AEKO状态为会议通过:可以取消通过
            this.tableTDataCost = data.coverCostsWithCarType || []; // 费用汇总 车型维度
            if (type == "refresh") {
              this.$emit("getBbasicInfo");
              this.getLinie();
            }
            this.basicInfo.fsName = Array.from(
              new Set(data.fsName.split(","))
            ).join(",");
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch((err) => {
          this.tableLoading = { cost: false };
        });
    },
    // 获取linie分页表格
    async getLinie() {
      const { query } = this.$route;
      const { requirementAekoId = "", from = "" } = query;
      const { page } = this;
      const data = {
        requirementAekoId,
        isView: from == "check" ? 1 : undefined,
        current: page.currPage,
        size: page.pageSize,
      };
      this.tableLoading = { depart: true };
      await getLiniePage(data)
        .then((res) => {
          this.tableLoading = { depart: false };
          const { code, data = {} } = res;
          if (code == 200) {
            const { records = [], total } = data;
            this.tableListData = records || []; // 费用汇总 linie维度
            this.page.totalCount = total;
          }
        })
        .catch((err) => {
          this.tableLoading = { depart: false };
        });
    },
    handleSelectionChange(val) {
      this.selectItems = val;
    },
    // 表格金额合计
    getSummaries(param) {
      const { columns, data } = param;
      const { basicInfo } = this;
      const total = this.language("LK_AEKO_TOTAL", "TOTAL");
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = total;
          return;
        }

        const keyArr = ["investmentIncrease", "materialIncrease", "otherCost"];
        if (keyArr.includes(column.property)) {
          if (column.property == "investmentIncrease")
            sums[index] =
              this.fixNumber(basicInfo.investmentIncreaseTotal, 0) || "";
          else if (column.property == "materialIncrease")
            sums[index] = this.fixNumber(basicInfo.materialIncreaseTotal) || "";
          else if (column.property == "otherCost")
            sums[index] = this.fixNumber(basicInfo.otherCostTotal, 0) || "";
          else sums[index] = "";
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },

    // 费用千分位处理
    fixNumber(str, precision = 2) {
      if (!str) return null;
      var re = /(?=(?!(\b))(\d{3})+$)/g;
      var fixstr = (str || 0).toString().split(".");
      fixstr[0] = fixstr[0].replace(re, ",");
      if (precision == 0) {
        // 若小数点后两位是 .00 去除小数点后两位
        if (fixstr[1] && fixstr[1] == "00") return fixstr[0];
      }

      return fixstr.join(".");
    },

    // 取消通过
    cancelPass() {
      const aekoManageId = this.basicInfo.aekoManageId;
      this.$confirm(
        this.language("cancelPassSure", "请再次确认是否取消通过该封面？")
      )
        .then((confirmInfo) => {
          if (confirmInfo === "confirm") {
            this.canceling = true;
            cancelPass(aekoManageId)
              .then((res) => {
                if (res.code === "200") {
                  iMessage.success(
                    this.language("LK_CAOZUOCHENGGONG", "操作成功")
                  );
                  // 刷新页面
                  this.getList();
                  this.getLinie();
                  this.$emit("getBbasicInfo");
                } else {
                  iMessage.error(
                    this.$i18n.locale === "zh" ? res.desZh : res.desEn
                  );
                }
              })
              .catch((e) => {
                iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
              })
              .finally(() => {
                this.canceling = false;
              });
          }
        })
        .catch(() => {});
    },

    // 解冻
    unfreeze() {
      this.dialogVisible = true;
    },

    changeVisible(type, visible) {
      this[type] = visible;
    },
  },
};
</script>

<style  lang="scss" scoped>
.previewCover {
  .basic-form {
    ::v-deep.el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .remark-label {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4b4b4c;
    &::before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
      display: inline-block;
    }
  }
  ::v-deep .el-textarea {
    &.text-disabled.is-disabled .el-textarea__inner {
      color: #505050;
    }
  }
  .summaryTable {
    ::v-deep .el-table__body-wrapper {
      min-height: auto;
    }
    ::v-deep .el-table__footer-wrapper {
      font-weight: bold;
    }
  }
  .summaryTable-tips {
    color: #8c96a7;
  }
  .divider {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #dcdfe6;
    margin: 20px 0;
  }
  .btn-list {
    text-align: right;
  }
}
</style>