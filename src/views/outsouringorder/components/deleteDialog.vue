<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:14:32
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-25 13:42:56
 * @Description: 退回EPS弹窗
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\components\backEps.vue
-->

<template>
  <iDialog
    :title="language('LK_NOTICE', '温馨提示')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="500px"
  >
    <span>{{
      this.language(
        "QUERENSHANCHUXUANZHONGCAIGOUSHENQING",
        "确认删除选中采购申请?"
      )
    }}</span>
    <template slot="footer">
      <div class="comfirm-button">
        <div class="switch">
          <span>{{ language("QUANBUXIANGCI") }}</span>
          <el-switch
            size="mini"
            class="margin-left10 zoom075"
            v-model="isAllItem"
            active-color="#1660F1"
            inactive-color="#cccccc"
          ></el-switch>
        </div>
        <div>
          <iButton @click="handleConfirm" :loading="saveLoading">{{
            language("LK_QUEREN", "确认")
          }}</iButton>
          <iButton @click="clearDialog">{{
            language("LK_QUXIAO", "取消")
          }}</iButton>
        </div>
      </div>
    </template>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput } from "rise";

export default {
  components: { iDialog, iButton, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false },
    mode: { type: String, default: "back" },
  },
  data() {
    return {
      reasonDescription: "",
      loading: false,
      saveLoading: false,
      isAllItem: true,
    };
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        this.reasonDescription = "";
      }
    },
  },
  methods: {
    clearDialog() {
      this.$emit("changeVisible", false);
    },
    handleConfirm() {
      this.$emit("handleBack", this.isAllItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.comfirm-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .switch {
    display: inline-flex;
    align-items: center;
    .zoom075 {
      zoom: 0.75;
    }
  }
}
</style>
