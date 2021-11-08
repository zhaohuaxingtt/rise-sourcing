<template>
  <iDialog
    title="新建测试项目"
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
          <iFormItem prop="procureType">
            <iLabel :label="language('BIDDING_CAIGOULEIXING', '采购类型')" slot="label" required></iLabel>
            <iSelect v-model="form.procureType" :placeholder="language('BIDDING_QXZCGLX', '请选择采购类型')">
              <el-option
                v-for="(item, index) in procureTypeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-row>
        <el-row class="form-row">
          <iFormItem :label="language('BIDDING_LUNCILEIXING', '轮次类型')" name="test">
            <iLabel :label="language('BIDDING_LUNCILEIXING', '轮次类型')" slot="label" required></iLabel>
            <iText>{{language('BIDDING_SHOUGONGJINGJIA', '手工竞价')}}</iText>
          </iFormItem>
        </el-row>
        <el-row class="form-row">
          <iFormItem :label="language('BIDDING_SGJJLX','手工竞价类型')" prop="manualBiddingType">
            <iLabel :label="language('BIDDING_SGJJLX', '手工竞价类型')" slot="label" required></iLabel>
            <iSelect
              v-model="form.manualBiddingType"
              :placeholder="language('BIDDING_QXZSGJJLX', '请选择手工竞价类型')"
            >
              <el-option
                v-for="(item, index) in manualBiddingTypeList"
                :key="index"
                :label="item.name"
                :value="item.manualBiddingType"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-row>
        <el-row class="form-row">
          <iFormItem :label="language('BIDDING_YYRFQ', '引用RFQ')">
            <iLabel :label="language('BIDDING_YYRFQ', '引用RFQ')" slot="label"></iLabel>
            <iInput
              v-model="form.rfqCode"
              :placeholder="language('BIDDING_QXZYYRFQ', '请选择引用RFQ')"
              disabled
            />
          </iFormItem>
        </el-row>
        <div class="button-list">
          <el-form-item>
            <iButton @click="handleOK" plain>{{ language('LK_BAOCUN', '保存') }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import {
  iInput,
  iButton,
  iDialog,
  iFormItem,
  iSelect,
  iLabel,
  iText,
  iMessage,
} from "rise";
import iEditForm from "@/components/biddingComponents/iEditForm";
import { RFQTurnList, procureTypeList, manualBiddingTypeList } from "./data";
import { saveBiddingInfo } from "@/api/bidding/bidding";

export default {
  components: {
    iDialog,
    iEditForm,
    iFormItem,
    iButton,
    iInput,
    iSelect,
    iLabel,
    iText,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.form.rfqCode = this.$route.params.code;
  },
  data() {
    return {
      form: {
        roundType: "05",
        procureType: "01",
        manualBiddingType: "01",
        rfqCode: "",
      },
      rules: {
        manualBiddingType: [
          { required: true, message: this.language('BIDDING_QINGXUANZE','请选择'), trigger: "change" },
        ],
        procureType: [{ required: true, message: this.language('BIDDING_QINGXUANZE','请选择'), trigger: "change" }],
      },

      RFQTurnList,
      procureTypeList,
      manualBiddingTypeList,
    };
  },

  methods: {
    handleOK() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$confirm(this.language('BIDDING_SFQDXJGXM','是否确定新建该项目？'), this.language('BIDDING_TISHI',"提示"), {
            confirmButtonText: this.language('BIDDING_SHI',"是"),
            cancelButtonText: this.language('BIDDING_FOU',"否"),
            type: "warning",
          })
            .then(() => {
              saveBiddingInfo({
                ...this.form,
                isTest: true,
                rfqCode: this.form.rfqCode || null,
              })
                .then((data) => {
                  this.$router.push({
                    path: `/bidding/project/inquiry/${data.id}`,
                  });
                  iMessage.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
                })
                .catch(() => {
                  iMessage.error(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
                });
            })
            .catch(() => {
              // this.handleCancel();
            });
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
