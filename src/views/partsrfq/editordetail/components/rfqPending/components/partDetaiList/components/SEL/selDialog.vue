<template>
  <iDialog
    :visible.sync="visible"
    class="margin-top30 applyModuleTargetPrice"
    :loading="loading"
    v-on="$listeners"
  >
    <template slot="title">
      <div class="el-dialog__title header">
        <span>{{ language("申请SEL目标价", "申请SEL目标价") }}</span>
        <iButton class="btn" @click="handleSubmit">{{
          language("LK_APPLAY", "申请")
        }}</iButton>
      </div>
    </template>
    <tableList
      class="table"
      :selection="false"
      :tableData="tableData"
      :tableTitle="tableTitle"
      :tableLoading="loading"
    >
      <!-----------期望目标价--------------------------->
      <template #expectedShareTargetPrice="scope">
        <thousandsFilterInput
          class="thousandsFilterInput"
          :numProcessor="0"
          :inputValue="scope.row['expectedShareTargetPrice']"
          style="width: 100px"
          @handleInput="handleInput($event,scope.row,'expectedShareTargetPrice')"
        />
      </template>
    </tableList>
  </iDialog>
</template>

<script>
import { iDialog, iMessage, iText, iInput, iButton } from "rise";
import { selDialogTitle } from "./data";
import tableList from "pages/modelTargetPrice/components/tableList.vue";
import thousandsFilterInput from "rise/web/aeko/quotationdetail/components/thousandsFilterInput";
import { applySelTargetPrice } from "@/api/SELTargetPrice";
export default {
  props: {
    todo: { type: Boolean },
    visible: { type: Boolean },
    data: { type: Array, default: () => [] },
  },
  components: { iDialog, iText, tableList, iInput, iButton, thousandsFilterInput },
  data() {
    return {
      // isEdit: false,
      loading: false,
      remarks: "",
    };
  },
  computed: {
    tableTitle() {
      if (this.todo) {
        return selDialogTitle.filter((i) => !i.todoHiddel);
      }
      return selDialogTitle;
    },
    tableData() {
      return JSON.parse(JSON.stringify(this.data))
    },
    rfqId() {
      return this.$route.query.rfqId || this.$route.query.id || "";
    },
    taskId() {
      return this.$route.query.taskId || "";
    },
  },
  methods: {
    handleInput(value, row, name) {
        this.$set(row, name, value); // 填充数据
    },
    /**
     * @Description: 申请目标价提交
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    handleSubmit() {
      if (
        this.tableData.some(
          (item) => !item.expectedShareTargetPrice || item.expectedShareTargetPrice === ""
        )
      ) {
        iMessage.warn(this.language("期望目标价不能为空", "期望目标价不能为空"));
        return;
      }
      this.loading = true;
      applySelTargetPrice({
        ids: [],
        taskDTOList: this.tableData.map((item) => {
          item.status = "";
          item.purchasingProjectPartId = item.id
          return item;
        }),
      })
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.$store.dispatch("setTodoObj", this.$route.query.id);
            this.$emit("update", "selTargetPrice");
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
     * @Author: Luoshuang
     * @param {*} value
     * @param {*} row
     * @param {*} name
     * @return {*}
     */
    handleInput(value, row, name) {
      if (/^\d*$/.test(value)) {
        this.$set(row, name, value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.applyModuleTargetPrice {
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
    .thousandsFilterInput {
      margin: 0 auto;
    }
  }
  .applyMemo {
    display: flex;
    align-items: center;
    ::v-deep .itext,
    .el-input {
      width: 300px;
    }
  }
}
</style>