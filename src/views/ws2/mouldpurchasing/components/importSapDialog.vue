<template>
    <iDialog
        :title="$t('MODEL-ORDER.LK_SAPDAORU')"
        :visible.sync="value"
        width="25%"
        @close="clearDiolog"
        class="point-dialog"
    >
    <el-form>
        <el-form-item :label="$t('MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING')">
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="purchaseType"
                >
                  <el-option value="NB" label="模具采购申请" >
                  </el-option>
                  <el-option value="ZV" label=" " >
                  </el-option>
            </iSelect>
        </el-form-item>
        <el-form-item :label="$t('MODEL-ORDER.LK_SAPBIANHAO')">
            <iInput
                v-model="sapCode"
                :placeholder="$t('LK_QINGSHURU')"
            ></iInput>
        </el-form-item>
        <el-form-item :label="$t('MODEL-ORDER.LK_RIQIFANWEI')" class="date-pick">
            <el-date-picker
                v-model="dataRange"
                type="daterange"
                :range-separator="$t('MODEL-ORDER.LK_ZHI')"
                :start-placeholder="$t('MODEL-ORDER.LK_KAISHIRIQI')"
                :end-placeholder="$t('MODEL-ORDER.LK_JIESHURIQI')"
                value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        </el-form-item>
        <div class="comfirm-button">
            <iButton @click="handleConfirm">{{ $t('LK_QUEREN') }}</iButton>
        </div>
    </el-form>
    </iDialog>
</template>

<script>
import { iMessage, iDialog, iSelect, iButton, iInput } from "rise";
export default {
    components: {
        iDialog,
        iSelect,
        iButton,
        iInput
    },
    props: {
        value: { type: Boolean, default: false },
    },
    methods: {
        // 关闭弹窗
        clearDiolog() {
        this.$emit("input", false);
        },
        handleConfirm() {
            let data = {
                sapCode: this.sapCode,
                type: this.purchaseType,
                startDate: this.dataRange[0],
                endDate: this.dataRange[1]
            };
            if (this.dataRange.length == 0 && this.purchaseType.length != 0) {
                return iMessage.warn("请输入日期范围");
            }
            if (this.dataRange.length == 0 && this.sapCode.length == 0) {
                return iMessage.warn("请输入SAP编号或日期范围");
            }
            this.$emit("handleImportSap", data);
        }
    },
    data() {
        return {
            purchaseType: "", //采购申请类型
            sapCode: "", //sap编号
            dataRange: "",
        }
    },
    watch: {
        value: function (val) {
            if (val) {
                this.purchaseType = "";
                this.sapCode = "";
                this.dataRange = "";
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.point-dialog {
    ::v-deep .el-dialog__body{
        padding-bottom: 20px !important;
    }
}

.comfirm-button {
    display: flex;
    justify-content: flex-end;
}

.date-pick {
    ::v-deep .el-input__inner {
        width: 100%;
        height: $input-height;
    }
}
</style>