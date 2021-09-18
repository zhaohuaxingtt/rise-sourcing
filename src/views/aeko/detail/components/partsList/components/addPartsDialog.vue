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
                    <iFormItem
                        required
                        :label="language('LK_LINGJIANHAO','零件号')"
                    >
                    <iInput />
                    </iFormItem>
                </el-col>
                <el-col :span="16" class="text-align-right">
                    <iFormItem>
                        <iButton>{{language('LK_CHAXUN','查询')}}</iButton>
                        <iButton @click="goToAdd">{{language('LK_XINZENG','新增')}}</iButton>
                    </iFormItem>
                </el-col>
            </el-row>
        </el-form>
        <p class="divider"></p>
        <!-- 查询内容区 -->
        <div class="search-contain">
            <iFormGroup row='2' label-width="100px">
                <iFormItem 
                    v-for="(item,index) in addPartsForm"
                    :key="'addPartsForm_'+index"
                    :required="item.required"
                    :label="language(item.labelKey, item.label)+':'" 
                >
                <iSelect v-if="item.type === 'select'">
                    <el-option
                        :value="item.value"
                        :label="item.label"
                        v-for="(item) in selectOptions[item.selectOption]"
                        :key="item.value"
                    >
                    </el-option>
                </iSelect>
                <iInput v-else-if="item.type === 'input'"/>
                <iText v-else></iText>
                </iFormItem>
            </iFormGroup>
        </div>
    </div>
    </iDialog>
</template>

<script>
import {
    iDialog,
    iInput,
    iButton,
    iFormGroup,
    iFormItem,
    iSelect,
    iText,
} from 'rise';
import { addPartsForm } from '../data'
export default {
    name:'addPartsDialog',
    components:{
        iDialog,
        iInput,
        iButton,
        iFormGroup,
        iFormItem,
        iSelect,
        iText,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return{
            addPartsForm:addPartsForm,
            selectOptions:{
                
            },
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
            padding-bottom: 20px;
            .divider{
                width: 100%;
                border-bottom: 1px dashed #909091;
                margin-bottom: 20px;
            }
            .search-contain{
                min-height: 200px;
                ::v-deep.el-form-item__content {
                    margin-left: 10px!important;
                }
            }

            ::v-deep.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
                content: "*";
                color: #f56c6c;
                margin-right: 4px;
                display: inline-block;
            }
            ::v-deep.el-table table th.label-require div::after{
                content: "*";
                color: #f56c6c;
                margin-right: 4px;
            }
        }
    }
</style>