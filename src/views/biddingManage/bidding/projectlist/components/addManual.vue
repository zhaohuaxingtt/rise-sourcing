<template>
  <iDialog
    title="新建项目"
    :visible="show"
    @update:visible="$emit('update:show', $event)"
    width="35.25rem"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleCancel"
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
            <iLabel :label="$t('采购类型')" slot="label" required></iLabel>
            <iSelect v-model="form.procureType" placeholder="请选择采购类型">
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
          <iFormItem :label="$t('轮次类型')" name="test">
            <iLabel :label="$t('轮次类型')" slot="label" required></iLabel>
            <iText>手工竞价</iText>
          </iFormItem>
        </el-row>
        <el-row class="form-row">
          <iFormItem label="手工竞价类型" prop="manualBiddingType">
            <iLabel :label="$t('手工竞价类型')" slot="label" required></iLabel>
            <iSelect
              v-model="form.manualBiddingType"
              placeholder="请选择手工竞价类型"
              @change="handleChangeType"
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
          <iFormItem label="引用RFQ">
            <iLabel :label="$t('引用RFQ')" slot="label"></iLabel>
            <iSelect
              v-model="form.rfqCode"
              placeholder="请选择引用RFQ"
              clearable
            >
              <el-option
                v-for="(item, index) in rfqCodeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-row>
        <div class="button-list">
          <el-form-item>
            <iButton @click="handleOK" plain>{{ $t("LK_BAOCUN") }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import {
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
import { getRfqCodesList } from "@/api/mock/mock";
import { saveBiddingInfo,getRfqIdList } from "@/api/bidding/bidding";

export default {
  components: {
    iDialog,
    iEditForm,
    iFormItem,
    iButton,
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
  async mounted() {
    const res = await getRfqIdList({manualBiddingType:this.form.manualBiddingType});
    this.rfqCodeList = res.data.map((item) => ({ label: item, value: item }));
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

      RFQTurnList,
      procureTypeList,
      manualBiddingTypeList,
    };
  },

  methods: {
    async handleChangeType(){
      this.form.rfqCode='';
      const res = await getRfqIdList({manualBiddingType:this.form.manualBiddingType});
      this.rfqCodeList = res.data.map((item) => ({ label: item, value: item }));
    },
    handleCancel() {
      this.$emit("update:show", false);
      this.form.rfqCode = "";
    },

    handleOK() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$confirm("是否确定新建该项目？", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning",
          })
            .then(() => {
              saveBiddingInfo({
                ...this.form,
                rfqCode: this.form.rfqCode || null,
              })
                .then((data) => {
                  this.handleCancel();
                  this.$router.push({
                    path: `/bidding/project/inquiry/${data.id}`,
                  });
                  sessionStorage.setItem("projectBack", "back");
                  iMessage.success("保存成功");
                  this.form.rfqCode = "";
                })
                .catch(() => {
                  iMessage.error("保存失败");
                  this.form.rfqCode = "";
                });
            })
            .catch(() => {
              // this.handleCancel();
              this.form.rfqCode = "";
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
