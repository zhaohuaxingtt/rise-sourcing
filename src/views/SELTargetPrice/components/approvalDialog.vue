<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2022-12-09 11:22:07
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-22 14:18:26
 * @FilePath: \front-web\src\views\SELTargetPrice\components\approvalDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <iDialog
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="60%"
    v-bind="$attrs"
  >
    <template slot="title">
      <div class="header">
        <span class="el-dialog__title">
          {{ $t("TISHI") }}
        </span>
        <i-button @click="handleConfirm">{{ $t("QUEREN") }}</i-button>
      </div>
    </template>
    确认审批通过以下目标价
    <el-form label-position="left" v-if="!isApproval">
      <el-form-item
        :label="language('审批备注', '审批备注')"
        label-width="100px"
      >
        <iInput
          v-model="remark"
          :placeholder="language('QINGSHURU', '请输入')"
          type="textarea"
          :rows="1"
          resize="none"
        ></iInput>
      </el-form-item>
    </el-form>
    <tableList
      :selection="false"
      indexKey
      :tableData="tableData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      class="padding-bottom20"
    >
      <!-- 目标价·分摊 -->
      <template #shareTargetPrice="scope">
        <span>{{ scope.row.shareTargetPrice | thousandsFilter(2) }}</span>
      </template>
      <!-- 目标价·一次性 -->
      <template #targetPrice="scope">
        <span>{{ scope.row.targetPrice | thousandsFilter(2) }}</span>
      </template>
      <!-- 预计A价分摊 -->
      <template #estimateShareAPrice="scope">
        <span>{{ scope.row.estimateShareAPrice | thousandsFilter }}</span>
      </template>
    </tableList>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton, iMessage } from "rise";
import tableList from "./tableList";
import { approvalTableTitle as tableTitle } from "../approval/data";
import { passApproval, passApprovalAndRemark } from "@/api/SELTargetPrice";
import filters from "@/utils/filters";
export default {
  components: { iDialog, iInput, iButton, iMessage, tableList },
  mixins: [filters],
  props: {
    dialogVisible: { type: Boolean, default: false },
    tableData: { type: Array, default: () => [] },
    isMaintain: { type: Boolean, default: false },
    isApproval: { type: Boolean, default: false },
  },
  data() {
    return {
      backType: "",
      remark: "",
      saveLoading: false,
      tableLoading: false,
      tableData: [],
      tableTitle,
    };
  },
  methods: {
    clearDialog() {
      this.$emit("changeVisible", false);
    },
    handleConfirm() {
      let submit = this.isMaintain ? passApproval : passApprovalAndRemark;
      submit({
        remark: this.remark,
        taskId: this.tableData.map((item) => item.id),
      })
        .then((res) => {
          if (res?.code == "200") {
            iMessage.success("操作成功");
            this.clearDialog();
            this.$emit("clearDialog");
          }
        })
        .finally(() => {
          this.saveLoading = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
}
</style>