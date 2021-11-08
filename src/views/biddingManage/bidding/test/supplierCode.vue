<template>
  <iDialog
    title="修改供应商Code"
    :visible="true"
    width="35.25rem"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <iEditForm>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="form-box"
      >
        <el-row class="form-row">
          <iFormItem label="" prop="roundType">
            <iLabel :label="language('BIDDING_GYSCODE', '供应商code')" slot="label" required></iLabel>
            <iInput
              v-model="form.supplierCode"
              :placeholder="language('BIDDING_QSRGYSCODE', '请输入供应商code')"
            />
          </iFormItem>
        </el-row>
        <div class="button-list">
          <el-form-item>
            <iButton @click="handleOK" plain>{{ language('BIDDING_BAOCUN', '保存') }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iButton, iDialog, iFormItem, iInput, iLabel, iMessage } from "rise";
import iEditForm from "@/components/iEditForm";

export default {
  components: {
    iDialog,
    iEditForm,
    iFormItem,
    iButton,
    iInput,
    iLabel,
  },
  data() {
    return {
      form: {
        supplierCode: window.sessionStorage.getItem("BIDDING_SUPPLIER_CODE") || '11135',
      },
    };
  },

  methods: {
    handleOK() {
      window.sessionStorage.setItem(
        "BIDDING_SUPPLIER_CODE",
        this.form.supplierCode
      );
      iMessage.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .form-row {
  .el-form-item {
    display: flex;

    .el-form-item__label {
      line-height: 35px;
      width: 134px;
      text-align: left;
      font-size: 16px;
      color: #4b4b4c;
      letter-spacing: 0;
      margin-bottom: 0;
    }

    .el-form-item__content {
      flex: 1;
    }
  }
}

.button-list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 18px 0 40px;

  .el-form-item {
    margin-bottom: 0;
    .el-button {
      height: 35px;
      width: 100px;
    }
    .cancel {
      margin-right: 20px;
    }
  }
}
</style>
