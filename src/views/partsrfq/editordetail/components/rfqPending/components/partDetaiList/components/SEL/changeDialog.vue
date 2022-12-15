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
      <template #shareCount="scope">
        <iInput :value="scope.row.shareCount" @input="handleInput($event, scope.row)" />
      </template>
    </tableList>
  </iDialog>
</template>

<script>
import { iDialog, iMessage, iInput, iButton } from "rise";
import { SELTargetPriceTitle } from "./data";
import tableList from "pages/modelTargetPrice/components/tableList.vue";
import { applySelTargetPrice } from "@/api/SELTargetPrice";
import { numberProcessor } from "@/utils"
export default {
  props: {
    visible: { type: Boolean },
    data: { type: Array, default: () => [] },
    options:{ type: Object, default: ()=>({})}
  },
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
        this.options.sel_target_price_status.find((item) => item.code == status)
          ?.name || status
      );
    },
    // 取消
    cancel() {
      this.$emit("update:visible", false);
    },
    // 保存
    submit() {
      console.log(this.tableData);
      if (
        this.tableData.some(
          (item) => !(item.shareCount||'').trim()
        )
      ) {
        return iMessage.warn(this.language("分摊量不能为空", "分摊量不能为空"));
      }
      return
      this.loading = true;
      applySelTargetPrice({
        ids: [],
        taskDTOList: this.tableData.map((item) => {
          item.status = "";
          item.purchasingProjectPartId = item.id;
          return item;
        }),
      })
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.$emit("update:visible", false);
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
        this.$set(row, 'shareCount', numberProcessor(value, 0));  // 分摊量
        this.$set(row, 'estimateShareAPrice', numberProcessor(row.shareTargetPrice/row.shareCount, 2)); // 计算预计A价
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