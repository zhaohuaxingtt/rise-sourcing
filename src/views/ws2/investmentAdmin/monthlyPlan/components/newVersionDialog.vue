<template>
    <iDialog
        :title="$t('LK_BAOCUNWEIXINBANBEN')"
        :visible.sync="value"
        width="25%"
        @close="clearDiolog"
        class="point-dialog"
    >
    <el-form>
        <el-form-item :label="$t('LK_BANBENJIHUANIANFEN')" class="date-pick">
            <iDatePicker 
                v-model="planYear" 
                format="yyyyMMdd" 
                value-format="yyyyMMdd"
                :clearable="false"
                :picker-options="option"
            />
        </el-form-item>
        <div class="comfirm-button">
            <iButton @click="handleConfirm">{{ $t('LK_QUEREN') }}</iButton>
        </div>
    </el-form>
    </iDialog>
</template>

<script>
import { iMessage, iDialog, iButton, iDatePicker } from "rise";
export default {
    components: {
        iDialog,
        iButton,
        iDatePicker
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
            this.$emit("handleConfirm", this.planYear);
        }
    },
    data() {
        return {
            planYear: "",
            option: {
                disabledDate:(time)=> {
                    return time.getTime() < Date.now() - 24 * 3600 * 1000
                }
            }
        }
    },
    watch: {
        value: function (val) {
            if (val) {
                this.planYear = "";
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