<!--
 * @Author: wentliao
 * @Date: 2021-12-31 11:15:41
 * @Description: 新增/编辑弹窗
-->
<template>
  <iDialog
    :title="openType=='add' ? language('LK_XINZENG', '新增') : language('BIANJI','编辑')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="50%"
    class="addDialog"
  >
    <div class="contain">
        <el-form class="contain-form">
            <el-form-item
                class="form-item" 
                v-for="(item,index) in addDialogFrom"
                :key="'addDialogFrom_'+index"
                :required="item.required"
                :label="language(item.labelKey, item.label)+':'" 
            >
            <iSelect 
                collapse-tags 
                v-if="item.type === 'select'" 
                v-model="form[item.props]"
                :multiple="item.multiple" 
                :filterable="item.filterable"
                :clearable="item.clearable" 
            >
                <el-option
                    :value="item.value"
                    :label="item.label"
                    v-for="(item) in (selectOptions[item.selectOption] || [])"
                    :key="item.value"
                >
                </el-option>
            </iSelect>
            <el-switch
                v-else-if="item.type === 'switch'" 
                v-model="form[item.props]"
            />
            <iInput v-model="form[item.props]" v-else-if="item.type === 'input'" @input="handleNumber($event,form,item.props)"/>
            <iText v-else>{{form[item.props] || '-'}}</iText>
            </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <iButton @click="dialogVisible = false">{{language('QUXIAO','取消')}}</iButton>
        <iButton @click="submit()">{{ language("LK_BAOCUN", "保存") }}</iButton>
    </span>
  </iDialog>
</template>

<script>
import {
    iDialog,
    iButton,
    iSelect,
    iText,
    iInput,
} from 'rise'
import { addDialogFrom } from './data'
export default {
    name:'addDialog',
    components:{
        iDialog,
        iButton,
        iSelect,
        iText,
        iInput,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        },
        openType:{ // 弹窗打开方式:新增/编辑
            type:String,
            default:'add',
        }
    },
    data(){
        return{
            addDialogFrom,
            form:{},
            selectOptions:{},
        }
    },
    methods:{
        clearDialog(){
            this.$emit('changeVisible','addDialogVisible',false);
        },
        submit(){ // 保存

        }
    }
}
</script>

<style lang="scss" scoped>
    .addDialog{
        .contain{
            .contain-form{
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                .form-item{
                    width: 30%;
                }
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
</style>>