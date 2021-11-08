<template>
  <iDialog
    title="竞价告知书"
    :visible="show"
    @update:visible="$emit('update:show', $event)"
    width="35.25rem"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel"
  >
    我已阅读以上条款：<el-checkbox :value="readed" @change="handleReaded" />
    <iEditForm>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="form-box"
      >
        <div class="button-list">
          <el-form-item>
            <iButton @click="handleOK" plain>{{ language('BIDDING_JUJUE', '拒绝') }}</iButton>
            <iButton @click="handleOK('ok')" plain>{{ language('BIDDING_TONGYI', '同意') }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iButton, iDialog } from "rise";

export default {
  components: {
    iDialog,
    // iEditForm,
    // iFormItem,
    iButton,
    // iSelect,
    // iLabel,
    // iText,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  async created() {
  },
  data() {
    return {
      rfqCodeList: [],
      form: {
        roundType: "05",
        procureType: "01",
        manualBiddingType: "01",
        rfqCode: "",
      },
      rules: {
        manualBiddingType: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        procureType: [{ required: true, message: "请选择", trigger: "change" }],
      },

      readed: false,
    };
  },

  methods: {
    handleCancel() {
      this.$emit("update:show", false);
    },
    handleReaded() {
      this.readed = !this.readed;
    },
    handleOK(status) {
      if (this.readed) {
        this.handleCancel();
      } else if (status === "ok") {
        this.$message.error(this.language('BIDDING_QXWCTKYDBGXWYYDYSTK','请先完成条款阅读并勾选“我已阅读以上条款”'));
      } else {
        this.handleCancel();
      }
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
