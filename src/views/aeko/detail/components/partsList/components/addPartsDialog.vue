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
            <div v-if="infoShow">
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
                        :filterable="item.filterable"
                        :clearable="item.clearable" 
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
                    <iText v-else>{{(item.isBoolean ? (form[item.props] ? language('nominationLanguage.Yes','是') : language('nominationLanguage.No','否')) :form[item.props]) || '-'}}</iText>
                    </iFormItem>
                </iFormGroup>
                <p class="text-align-right"><iButton :loading="btnLoading.save" @click="save">{{language('LK_BAOCUN','保存')}}</iButton></p>
            </div>
            <!-- 未查询到相关零件 -->
            <p v-if="!infoShow && noInfoData" class="no-data-tips">{{language('LK_AEKO_TIPS_WEICHAXUNDAOGAILINGJIAN','未查询到该零件，可点击新增创建零件')}}</p>
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
    iMessage,
} from 'rise';
import { addPartsForm } from '../data'
import {numberProcessor} from '@/utils';
import { getpartInfo,getPidList,addPart } from "@/api/aeko/detail/partsList.js"
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
        },
        aekoInfo:{
            type:Object,
            default:()=>{}
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
                'changeType':[
                    {label:'A',value:'A'},
                    {label:'N',value:'N'},
                    {label:'U',value:'U'},
                    {label:'F',value:'F'},
                    {label:'I',value:'I'},
                    {label:'M',value:'M'},
                ],
                'pid':[],
            },
            partNum:'',
            form:{ },
            infoShow:false,
            noInfoData:false,
        }
    },
    created(){
        this.getPidList();
    },
    methods:{
        clearDialog(){
            this.$emit('changeVisible','addPartskVisible',false);
        },

        // 获取PID列表
        async getPidList(){
            const { aekoInfo={} } = this;
            const {requirementAekoId} = aekoInfo;
            await getPidList({requirementAekoId}).then((res)=>{
                const {code,data} = res;
                if(code == 200){
                    if(Array.isArray(data)){
                        let list = [];
                        data.map((item)=>{
                            list.push({label:item,value:item})
                        })
                        this.selectOptions['pid'] = list;
                    }
                    
                }
            })
        },

        // 查询零件
        async searchPart(){
            const {partNum} = this;
            if(!partNum) return iMessage.warn(this.language('LK_AEKO_QINGSHURULINGJIANHAOHOUCHAXUN','请输入零件号后查询'));
            this.btnLoading.searchPart = true;
            await getpartInfo({partNum}).then((res)=>{
                this.btnLoading.searchPart = false;
                const {code,data=null} = res;
                if(code == 200){
                    if(data){
                        this.form = {
                            ...data,
                            'changeType':'A'  // 变更类型默认为A
                            };
                       
                        this.infoShow = true;
                    }else{
                        this.infoShow = false;
                        this.noInfoData = true;
                    }
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch((err)=>{
                this.btnLoading.searchPart = false;
            })
        },
        // 保存
        async save(){
           const {form={},aekoInfo={}} = this; 
           if(!form.changeType || !form.pid || !form.perCarDosage) return iMessage.warn(this.language('LK_AEKO_QINGTIANXIEWANZHENGHOUTIJIAO','请填写完整后提交'));

           const data = {
               aekoCode:aekoInfo.aekoCode,
               aekoId:aekoInfo.requirementAekoId,
               changeType:form.changeType,
               partNameDe:form.partNameDe,
               partNum:form.partNum,
               perCarDosage:form.perCarDosage,
               pid:form.pid,
               partNameZh:form.partNameZh,
           };
           this.btnLoading.save = true;
           await addPart(data).then((res)=>{
               this.btnLoading.save = false;
               if(res.code == 200){
                   iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                   this.clearDialog();
                   this.$emit('getList');
               }
           }).catch((err)=>{
               this.btnLoading.save = false;
           })
        },
        // 跳转到新增页面
        goToAdd(){
            window.open(`${ process.env.VUE_APP_PORTAL_URL }materielData/parts-message/edit `, '_blank')
        },

        // 获取涉及
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
                .no-data-tips{
                    text-align: center;
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
</style>