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
    :title="
      mode == 'back' ? language('TUIHUIYUANYIN', '退回原因') : $t('关闭原因')
    "
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="878px"
  >
    <el-form label-position="top">
      <el-form-item
        :label="
          mode == 'back'
            ? language('TUIHUILIYOUMIAOSHU', '退回理由描述')
            : '关闭理由'
        "
      >
        <iInput
          v-model="reasonDescription"
          :placeholder="language('QINGSHURUCHEXIAOYUANYIN', '请输入撤销原因')"
          type="textarea"
          :rows="6"
          resize="none"
        ></iInput>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <div class="comfirm-button">
        <div class="switch">
          <span>全部项次</span>
          <el-switch
            class="margin-left10 zoom075"
            v-model="isAllItem"
            active-color="#1660F1"
            inactive-color="#cccccc"
          ></el-switch>
        </div>
        <div>
          <iButton @click="handleConfirm" :loading="saveLoading">{{
            language("BAOCUN", "保存")
          }}</iButton>
          <iButton @click="clearDialog">{{
            language("QUXIAO", "取消")
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
      this.reasonDescription = "";
      this.$emit("changeVisible", false);
    },
    handleConfirm() {
      this.saveLoading = true;
      this.$emit("handleBack", this.reasonDescription, this.isAllItem);
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading;
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
