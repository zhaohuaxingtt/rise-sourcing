<template>
  <iDialog
    title="新建RFQ轮次"
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
          <iFormItem :label="language('BIDDING_LUNCILEIXING', '轮次类型')" prop="roundType">
            <iLabel :label="language('BIDDING_LUNCILEIXING', '轮次类型')" slot="label" required></iLabel>
            <iSelect v-model="form.roundType" :placeholder="language('BIDDING_QXZLCLX', '请选择轮次类型')">
              <el-option
                v-for="(item, index) in roundTypeLists"
                :key="index"
                :label="item.name"
                :value="item.roundType"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-row>
        <!-- <iFormGroup :row="3" inline icon>
          <iFormItem :label="language('LK_LINGJIANHAO', 'LK_LINGJIANHAO')+':'" name="test">
            <iInput></iInput>
          </iFormItem>
          <iFormItem :label="language('LK_XUNJIACAIGOUYUAN', 'LK_XUNJIACAIGOUYUAN')+':'" name="test">
            <iInput></iInput>
          </iFormItem>
          <iFormItem :label="language('LK_LINGJIANHAO', 'LK_LINGJIANHAO')+':'" name="test">
            <iText>test8</iText>
          </iFormItem>
          <iFormItem label="FSNR/GSNR/SPNR：" name="test">
            <iInput></iInput>
          </iFormItem>
				</iFormGroup> -->

        <!-- footer 保存 -->
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
import { iButton, iDialog, iFormItem, iSelect, iLabel, iMessage } from "rise";
import iEditForm from "@/components/biddingComponents/iEditForm";
import { roundTypeLists } from "../project/inquiry/components/data";
import { saveBiddingInfo } from "@/api/bidding/bidding";

export default {
  components: {
    iDialog,
    iEditForm,
    iFormItem,
    iButton,
    iSelect,
    iLabel,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        roundType: "",
      },
      rules: {
        roundType: [{ required: true, message: this.language('BIDDING_QINGXUANZE','请选择'), trigger: "change" }],
      },
      roundTypeLists,
    };
  },

  methods: {
    handleOK() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$confirm(this.language('BIDDING_SFQDXJGRFQLC',"是否确定新建 该RFQ轮次 ？"), this.language('BIDDING_TISHI',"提示"), {
            confirmButtonText: this.language('BIDDING_SHI',"是"),
        cancelButtonText: this.language('BIDDING_FOU',"否"),
            type: "warning",
          })
            .then(() => {
              console.log(this.form);
              saveBiddingInfo({
                procureType: "01", // 默认正式项目
                rfqCode: "244",
                rfqRound: 1,
                ...this.form,
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
