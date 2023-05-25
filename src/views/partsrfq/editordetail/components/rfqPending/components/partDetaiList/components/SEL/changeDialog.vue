<template>
  <iDialog
    :visible.sync="visible"
    class="margin-top30 dialog"
    :loading="loading"
    v-on="$listeners"
    width="70%"
  >
    <template slot="title">
      <div class="el-dialog__title header">
        <span>{{ language("SEL目标价", "SEL目标价") }}</span>
        <div class="btn">
          <iButton @click="cancel">{{ language("LK_QUXIAO", "取消") }}</iButton>
          <iButton @click="submit">{{ language("LK_BAOCUN", "保存") }}</iButton>
        </div>
      </div>
    </template>
    <tableList
      class="table"
      :tableData="tableData"
      :tableTitle="tableTitle"
      :tableLoading="loading"
    >
      <template #status="scope">
        <span>{{ getStatus(scope.row.status) }}</span>
      </template>
      <!-- 分摊量 -->
      <template #releaseOutput="scope">
        <iInput
          :value="scope.row.releaseOutput"
          @input="handleInput($event, scope.row)"
        />
      </template>
      <!-- 目标价·分摊 -->
      <template #shareTargetPrice="scope">
        <span>{{ scope.row.shareTargetPrice | thousandsFilter(2)}}</span>
      </template>
      <!-- 目标价·一次性 -->
      <template #targetPrice="scope">
        <span>{{ scope.row.targetPrice | thousandsFilter(2)}}</span>
      </template>
      <!-- 预计A价分摊 -->
      <template #estimateShareAPrice="scope">
        <span>{{ scope.row.estimateShareAPrice | thousandsFilter }}</span>
      </template>
    </tableList>
  </iDialog>
</template>

<script>
import { iDialog, iMessage, iInput, iButton } from "rise";
import { SELTargetPriceTitle } from "./data";
import tableList from "pages/modelTargetPrice/components/tableList.vue";
import { updateSelTargetPriceReleaseOut } from "@/api/SELTargetPrice";
import { numberProcessor } from "@/utils";
import filters from '@/utils/filters'
export default {
  props: {
    visible: { type: Boolean },
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
  },
  mixins:[filters],
  components: { iDialog, tableList, iInput, iButton },
  data() {
    return {
      tableTitle: SELTargetPriceTitle,
      loading: false,
    };
  },
  computed: {
    tableData() {
      return JSON.parse(JSON.stringify(this.data));
    },
    rfqId() {
      return this.$route.query.rfqId || this.$route.query.id || "";
    },
    taskId() {
      return this.$route.query.taskId || "";
    },
  },
  methods: {
    getStatus(status) {
      return (
        this.options.sel_target_price_status?.find((item) => item.code == status)
          ?.name || status
      );
    },
    // 取消
    cancel() {
      this.$emit("update:visible", false);
    },
    // 保存
    submit() {
      if (this.tableData.some((item) => !(item.releaseOutput || "").trim())) {
        return iMessage.warn(this.language("分摊量不能为空", "分摊量不能为空"));
      }
      this.loading = true;
      updateSelTargetPriceReleaseOut({
        taskDTOList: this.tableData
      })
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.$emit("update:visible", false);
            this.$emit('getTableList')
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @Description: 输入限制
     */
    handleInput(value, row) {
      this.$set(row, "releaseOutput", numberProcessor(value, 0)); // 分摊量
      this.$set(
        row,
        "estimateShareAPrice",
        Number(numberProcessor(row.shareTargetPrice / row.releaseOutput, 6)).toFixed(2)
      ); // 计算预计A价=  目标价·分摊/分摊量
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn {
      margin-right: 20px;
    }
  }
  .table {
    padding-bottom: 20px;
  }
}
</style>