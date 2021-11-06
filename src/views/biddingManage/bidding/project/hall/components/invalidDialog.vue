<template>
  <iDialog
    title="作废原因"
    :visible="show"
    @update:visible="$emit('update:show', $event)"
    width="50.25rem"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      :hideRequiredAsterisk="true"
      class="form-box"
    >
      <el-row class="form-row">
        <iFormItem prop="invalidReason" :hideRequiredAsterisk="true">
          <iInput
            required
            v-model="form.invalidReason"
            type="textarea"
            :rows="10"
            placeholder="请填写作废原因"
            resize="none"
            show-word-limit
            style="padding: 20px 0 40px 0"
          />
        </iFormItem>
      </el-row>
      <div class="button-list">
        <el-form-item>
          <iButton @click="handleCancel" plain>{{ $t("取消") }}</iButton>
          <iButton @click="handleOK" plain>{{ $t("确认") }}</iButton>
        </el-form-item>
      </div>
    </el-form>
  </iDialog>
</template>

<script>
import { iButton, iDialog, iFormItem, iLabel, iInput } from "rise";
import { invalidBidding } from "@/api/bidding/bidding";

export default {
  components: {
    iDialog,
    iFormItem,
    iButton,
    iInput,
    // iText,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
    projectCode: {
      type: String,
    },
  },
  async created() {
  },
  data() {
    return {
      rfqCodeList: [],
      form: {
        invalidReason: ''
      },
      rules: {
        invalidReason: [{ required: true, message: "请填写作废原因", trigger: "blur" }],
      },

      readed: false,
      invalidReason: "",
    };
  },

  methods: {
    handleCancel() {
      this.invalidReason = "";
      this.form.invalidReason = "";
      this.$emit("update:show", false);
    },
    handleInvalid(value) {
      console.log(value);
    },
    handleOK() {
      let param = {
        invalidReason: this.form.invalidReason,
        projectCode: this.projectCode,
      };

      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          invalidBidding(param)
            .then((res) => {
              if (res) {
                this.$message.success("作废成功");
                this.form.invalidReason = "";
                this.$emit("update:show", false);
                this.$emit("reset");
              } else {
                this.$message.error("作废失败");
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        } else {
          // this.$message.error()
        }
      });
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
      padding-right: 0;
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
  padding: 0 0 40px;

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
