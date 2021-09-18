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
        <iFormGroup row='2' label-width="100px">
            <iFormItem required :label="language('LK_LINGJIANHAO','零件号')+':'" >
                <iInput v-model.trim="partNum" />
            </iFormItem>
            <iFormItem>
                <p class="text-align-right">
                    <iButton :loading="btnLoading.searchPart" @click="searchPart">{{language('LK_CHAXUN','查询')}}</iButton>
                    <iButton @click="goToAdd">{{language('LK_XINZENG','新增')}}</iButton>
                </p>
            </iFormItem>
        </iFormGroup>
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
                <iSelect 
                    collapse-tags 
                    v-if="item.type === 'select'" 
                    v-model="form[item.props]"
                    :multiple="item.multiple" 
                >
                    <el-option
                        :value="item.value"
                        :label="item.label"
                        v-for="(item) in selectOptions[item.selectOption]"
                        :key="item.value"
                    >
                    </el-option>
                </iSelect>
                <iInput v-model="form[item.props]" v-else-if="item.type === 'input'" @input="handleNumber($event,form,item.props)"/>
                <iText v-else></iText>
                </iFormItem>
            </iFormGroup>
            <p class="text-align-right" :loading="btnLoading.save" @click="save"><iButton>{{language('LK_BAOCUN','保存')}}</iButton></p>
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
import {numberProcessor} from '@/utils';
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
            btnLoading:{
                save:false,
                searchPart:false,
            },
            selectOptions:{
                'e':[
                    {label:'A',value:'A'},
                    {label:'N',value:'N'},
                    {label:'U',value:'U'},
                    {label:'F',value:'F'},
                    {label:'I',value:'I'},
                    {label:'M',value:'M'},
                ],
                'f':[
                    {label:'PID-1',value:'PID-1'},
                    {label:'PID-2',value:'PID-2'},
                    {label:'PID-3',value:'PID-3'},
                ],
            },
            partNum:'',
            form:{
                e:'A',
            },
        }
    },
    methods:{
        clearDialog(){
            this.$emit('changeVisible','addPartsDialog',false);
        },

        // 查询零件
        searchPart(){

        },
        // 保存
        save(){
            
        },
        // 跳转到新增页面
        goToAdd(){

        },

        handleNumber(val, row, props) {
            this.$set(row, props, numberProcessor(val, 0));
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
            }
            ::v-deep.el-form-item__content {
                margin-left: 10px!important;
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