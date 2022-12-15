<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2022-12-08 15:38:28
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-15 13:23:33
 * @FilePath: \front-web\src\views\SELTargetPrice\components\noInvestConfirm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
// 无目标价
<template>
  <iDialog
    :title="language('请输入备注(必填)', '请输入备注(必填)')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="30%"
  >
    <template slot="footer">
      <iButton @click="clearDialog">{{ language("QUXIAO", "取消") }}</iButton>
      <iButton @click="handleConfirm" :loading="saveLoading">{{
        language("QUEREN", "确认")
      }}</iButton>
    </template>
    <el-form>
      <el-form-item>
        <iInput
          v-model="remark"
          :placeholder="language('QINGSHURU', '请输入')"
          type="textarea"
          :rows="6"
          resize="none"
        ></iInput>
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iMessage } from "rise";
import { setNullSelTargetPrice } from "@/api/SELTargetPrice";
export default {
  components: { iDialog, iButton, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false },
    selectItems: {type:Array, default:()=>[]}
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.remark = "";
      }
    },
  },
  data() {
    return {
      backType: "",
      remark: "",
      saveLoading: false,
    };
  },
  methods: {
    clearDialog() {
      this.remark = "";
      this.$emit("changeVisible", false);
    },
    handleConfirm() {
      this.saveLoading = true;
      this.setNullSelTargetPrice();
    },

    setNullSelTargetPrice() {
      this.saveLoading = true;
      const params = {
        remark: this.remark,
        taskId: this.selectItems.map((item) => item.id),
      };
      setNullSelTargetPrice(params)
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
            this.clearDialog()  // 关闭弹窗
            this.$emit("getTableList");  // 重新获取数据
          } else {
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .finally(() => {
          this.saveLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>