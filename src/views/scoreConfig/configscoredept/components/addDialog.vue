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
            <iDicoptions v-else-if="item.type === 'dicoption'" :optionAll="false" v-model="form[item.props]" :optionKey="item.optionKey" @change="selectChange($event,item.props)"/>
            <el-switch
                v-else-if="item.type === 'switch'" 
                v-model="form[item.props]"
                @change="changeSwitch($event,item.props)"
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
import iDicoptions from 'rise/web/components/iDicoptions' 
import { addDialogFrom } from './data'
import { listDepartByTag,listUserByRoleCode } from "@/api/scoreConfig/configscoredept"
import { cloneDeep } from "lodash" 
export default {
    name:'addDialog',
    components:{
        iDialog,
        iButton,
        iSelect,
        iText,
        iInput,
        iDicoptions,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        },
        openType:{ // 弹窗打开方式:新增/编辑
            type:String,
            default:'add',
        },
        multipleSelection:{
            type:Array,
            default:()=>[],
        }
    },
    watch: {
    dialogVisible(val) {
      if(val) {
          this.init();
      }
    }
  },
    data(){
        return{
            addDialogFrom:[],
            form:{},
            selectOptions:{
                raterList:[], // 评分人
                coordinatorList:[], // 协调人
                rateDepartNumList:[],// 评分股
            },
        }
    },
    methods:{
        init(){
            this.addDialogFrom = cloneDeep(addDialogFrom);
            // 编辑时根据数据判断 是否需要展示定点审批人
            if(this.openType == 'edit'){
                const editForm = this.multipleSelection[0] || {};
                this.form = {
                    rateTag:editForm['rateTag'],
                    isCheck:editForm['isCheck'] == '1',
                    raterList:editForm['raterList'].map((item)=>item.userId),
                    coordinatorList:editForm['coordinatorList'].map((item)=>item.userId),
                };
                console.log(editForm,this.form);
            }else{
               this.form = {};
            }
            const roleList = [
                {key:'raterList',roleCode:'JZSPFR'},// 评分人
                {key:'coordinatorList',roleCode:'JSPFXTY'},// 协调人
                // {key:'nomiApprover',roleCode:'DDSPR'}, // 定点审批人
            ]
            roleList.forEach((item)=>{
                listUserByRoleCode({roleCode:item.roleCode}).then((res)=>{
                    if(res.code == '200'){
                        res.data.map((itemUser)=>{
                            itemUser.value = itemUser.id+'';
                            itemUser.label = itemUser.nameZh;
                        })
                        this.selectOptions[item.key] = res.data || []
                    }
                })
            })
        },
        // 开关状态改变
        changeSwitch(value,props){
            if(props == 'isCheck'){
                let copyAddDialogFrom = cloneDeep(addDialogFrom);
                copyAddDialogFrom.forEach((item)=>{
                    if(item.props == 'coordinatorList') item.required = value ;
                })
                this.addDialogFrom = copyAddDialogFrom;
            }
        },
        selectChange(value,props){
            // 选择评分类型的时候动态获取评分股
            if(props == 'rateTag' && value){
                // 获取评分股下拉数据  MQ:39 EP:38
                listDepartByTag({tagId:value=='MQ' ? '39' : '38'}).then((res)=>{
                    if(res.code == '200'){
                        this.selectOptions['rateDepartNumList'] = Array.isArray(res.data) ? res.data : [];
                    }
                })
            }

        },
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