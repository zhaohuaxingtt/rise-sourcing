<template>
  <iCard class="margin-top20 table-card">
    <template v-slot:header-control>
      <slot name="header-btn"></slot>
      <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
    </template>
    <tableList v-bind="$attrs" v-on="$listeners" ref="tableList" class="table-box" height="100%">
      <template #fsnrGsnrNum="scope">
        <span class="link-underline cursor" @click="openPage(scope.row)">{{
          scope.row.fsnrGsnrNum
        }}</span>
      </template>
      <template #rfqCode="scope">
        <span class="link-underline cursor" @click="gotoRFQ(scope.row)">{{
          scope.row.rfqCode
        }}</span>
      </template>
      <template #businessType="scope">
        <span>{{ getBusinessDesc(scope.row.businessType) }}</span>
      </template>
      <template #status="scope">
        <span>{{ getStatus(scope.row.status) }}</span>
      </template>

      <!-- 目标价-分摊 -->
      <template #shareTargetPrice="scope">
        <span>{{ scope.row.shareTargetPrice | thousandsFilter(2) }}</span>
      </template>
      <!-- 预计A价分摊 -->
      <template #estimateShareAPrice="scope">
        <span>{{ scope.row.estimateShareAPrice | thousandsFilter }}</span>
      </template>
      <!-- 期望目标价·分摊 -->
      <template #expectedShareTargetPrice="scope">
        <span>{{ scope.row.expectedShareTargetPrice | thousandsFilter(2)}}</span>
      </template>
      <!-- 期望目标价·一次性 -->
      <template #expectedTargetPrice="scope">
        <span>{{ scope.row.expectedTargetPrice | thousandsFilter(2)}}</span>
      </template>
      <!-- 目标价·一次性 -->
      <template #targetPrice="scope">
        <span>{{ scope.row.targetPrice | thousandsFilter(2)}}</span>
      </template>
      <!------------------审批记录列--------------------------->
      <template #shenpi="scope">
        <span
          class="openLinkText cursor"
          @click="$emit('openApprovalDialog', scope.row)"
          >{{ language("CHAKAN", "查看") }}</span
        >
      </template>
    </tableList>
    <slot name="table-page"></slot>
  </iCard>
</template>
<script>
import { iCard, iPagination, iButton, iMessage, iSelect, iInput } from "rise";
import { _getMathNumber } from "@/utils";
import filters from "@/utils/filters";
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from "@/components/buttonTableSetting";
export default {
  components: {
    iCard,
    iPagination,
    iButton,
    iMessage,
    iSelect,
    iInput,
    tableList,
    buttonTableSetting,
  },
  mixins: [filters, tableSortMixins],
  inject: ["vm"],
  computed: {
    indexFixed() {
      return this.tableTitle.some((item) => item?.fixed);
    },
  },
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getStatus(status) {
      return (
        this.options.sel_target_price_status?.find(
          (item) => item.code == status
        )?.name || status
      );
    },
    getBusinessDesc(code) {
      return (
        this.options.sel_target_business_type?.find((item) => item.code == code)
          ?.name || code
      );
    },
    changeValue(val, row, item) {
      if (item.isNumber) {
        if (/^\d*\.?\d*$/.test(val)) {
          this.$set(row, item.props, val);
        }
      } else {
        this.$set(row, item.props, val);
      }
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    openPage(e) {
      this.$emit("openPage", e);
    },
    gotoRFQ(e) {
      this.$emit("gotoRFQ", e);
    },
  },
};
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
  text-decoration: underline;
}
.radio {
  ::v-deep thead .el-table-column--selection .cell {
    display: none;
  }
}
.isChange {
  ::v-deep .el-input__inner {
    color: red;
    background: rgb(255 0 0 / 10%);
    border-color: red;
  }
}
</style>