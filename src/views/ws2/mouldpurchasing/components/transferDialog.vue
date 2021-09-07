<template>
    <iDialog
        :title="$t('LK_ZHUANPAI')"
        :visible.sync="value"
        width="25%"
        @close="clearDiolog"
        class="point-dialog"
    >
    <el-form>
        <el-form-item :label="$t('LK_KESHI')">
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="department"
                @change="selDeptOnChange"
                value-key="id"
                >
                <el-option :value="{}" :label="$t('all')"/>
                <el-option
                    v-for="(items, index) in deptList"
                    :key="index"
                    :value="items"
                    :label="items.nameZh"/>
            </iSelect>
        </el-form-item>
        <el-form-item :label="$t('MODEL-ORDER.LK_ZHUANYECAIGOUYUAN')">
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="buyer"
                value-key="id"
                >
                <el-option
                    v-for="(items, index) in userList"
                    :key="index"
                    :value="items"
                    :label="items.nameZh" />
            </iSelect>
        </el-form-item>
        <div class="comfirm-button">
            <iButton @click="handleConfirm">{{ $t('LK_QUEREN') }}</iButton>
        </div>
    </el-form>
    </iDialog>
</template>

<script>
import {
  iDialog,
  iSelect,
  iButton,
  iMessage
} from "rise";
import { getDeptListByTag, getUserListByTag } from "@/api/usercenter";
export default {
    components: {
        iDialog,
        iSelect,
        iButton
    },
    props: {
        value: { type: Boolean, default: false },
    },
    created() {
        this.getDeptList();
        this.selDeptOnChange();
    },
    methods: {
        // 关闭弹窗
        clearDiolog() {
        this.department = {};
        this.buyer = {};
        this.$emit("input", false);
        },
        handleConfirm() {
            if (!this.buyer.id) {
                return iMessage.warn(
                    this.$t("LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN")
                );
            }
            let data = {
                deptName: this.department.nameZh,
                deptNum: this.department.deptNum,
                ownerId: this.buyer.id,
            }
            this.department = {};
            this.buyer = {};
            this.$emit("handleTransfer", data);
        },
        getDeptList() {
            let parmars={'tagId':4};
            getDeptListByTag(parmars).then((res)=>{
                if(+res.code===200){
                this.deptList=res.data
                }
            }).catch((err) =>{});
        },
        //选中部分发生变化//获取部门用户
        selDeptOnChange(){
            this.buyer={};
            let parmars={'tagId':4,'deptId':this.department.id}
            getUserListByTag(parmars).then((res)=>{
                if(+res.code===200){
                this.userList=res.data
                }
            }).catch((err)=>{})
        }
    },
    data() {
        return {
            department: {}, //科室
            buyer: {}, //前期采购员
            deptList: [],
            userList: []
        }
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
</style>