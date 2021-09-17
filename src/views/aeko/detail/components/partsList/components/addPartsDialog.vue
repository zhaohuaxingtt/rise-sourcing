<!--
 * @Author: wentliao
 * @Date: 2021-09-17 10:25:17
 * @Description: 新增零件弹窗
-->
<template>
    <iDialog
        :title="language('AEKO_DIALOG_TITLE_XINZENGLINGJIAN','新增零件')"
        :visible.sync="dialogVisible"
        @close="clearDialog"
        width="50%"
        class="addPartsDialog"
    >
    <div class="addPartsDialog-contain">
        <el-form :inline="true">
            <el-row>
                <el-col :span="8">
                    <el-form-item
                        required
                        :label="language('LK_LINGJIANHAO','零件号')"
                    >
                    <iInput />
                    </el-form-item>
                </el-col>
                <el-col :span="16" class="text-align-right">
                    <el-form-item>
                        <iButton>{{language('LK_CHAXUN','查询')}}</iButton>
                        <iButton @click="goToAdd">{{language('LK_XINZENG','新增')}}</iButton>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-divider></el-divider>
    </div>
    </iDialog>
</template>

<script>
import {
    iDialog,
    iInput,
    iButton,
} from 'rise';
export default {
    name:'addPartsDialog',
    components:{
        iDialog,
        iInput,
        iButton,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        }
    },
    methods:{
        clearDialog(){
            this.$emit('changeVisible','addPartsDialog',false);
        },
        // 跳转到新增页面
        goToAdd(){

        },
    }
}
</script>

<style lang="scss" scoped>
    .addPartsDialog{
        .addPartsDialog-contain{

        }
    }
</style>