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
                @change="selectChange($event,item.props)"
            >
                <el-option
                    :value="item.value"
                    :label="item.label"
                    v-for="(item) in (selectOptions[item.selectOption] || [])"
                    :key="item.value"
                >
                </el-option>
            </iSelect>
            <iDicoptions v-else-if="item.type === 'dicoption'" :ref="'iDicoptions_'+item.props" :optionAll="false" v-model="form[item.props]" :optionKey="item.optionKey" @change="selectChange($event,item.props)"/>
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
        <iButton @click="submit" :loading="btnLoading">{{ language("LK_BAOCUN", "保存") }}</iButton>
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
    iMessage,
} from 'rise'
import iDicoptions from 'rise/web/components/iDicoptions' 
import { addDialogFrom } from './data'
import { listDepartByTag,listUserByRoleCode,setSysRateDepart,updateSysRateDepart,getParentDeptNum } from "@/api/scoreConfig/configscoredept"
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
            form:{
                rateTag:'',
                rateDepartNum:'',
                parentRateDepartNum:'',
                raterList:[],
                isCheck:false,
                coordinatorList:[],
                willReviewApproverList:[],
                flowApproverList:[],
            },
            selectOptions:{
                raterList:[], // 评分人
                coordinatorList:[], // 协调人
                rateDepartNumList:[],// 评分股
                willReviewApproverList:[], // 上会复核审批人
                flowApproverList:[], // 会外流转定点审批人
            },
            btnLoading:false,
        }
    },
    methods:{
        async init(){
            this.addDialogFrom = cloneDeep(addDialogFrom);
            // 编辑时根据数据判断 是否需要展示定点审批人
            if(this.openType == 'edit'){
                const editForm = this.multipleSelection[0] || {};
                await this.selectChange(editForm['rateTag'],'rateTag',editForm['rateDepartNum'],null,editForm['raterList'],editForm['coordinatorList']);
                await this.selectChange(editForm['rateDepartId'],'rateDepartNum',null,editForm['parentRateDepartNum']);
                this.form = {
                    rateTag:editForm['rateTag'],
                    parentRateDepartNum:editForm['parentRateDepartNum'],
                    isCheck:editForm['isCheck'] == '1',
                    raterList:Array.isArray(editForm['raterList']) ? editForm['raterList'].map((item)=>item.userId) : [],
                    coordinatorList:Array.isArray(editForm['coordinatorList']) ? editForm['coordinatorList'].map((item)=>item.userId) : [],
                    rateDepartNum:editForm['rateDepartId'],
                    willReviewApproverList:Array.isArray(editForm['willReviewApproverList']) ? editForm['willReviewApproverList'].map((item)=>item.userId) : [],
                    flowApproverList:Array.isArray(editForm['flowApproverList']) ? editForm['flowApproverList'].map((item)=>item.userId) : [],
                };
            }else{
               this.form = {
                     rateTag:'',
                    rateDepartNum:'',
                    parentRateDepartNum:'',
                    raterList:[],
                    isCheck:false,
                    coordinatorList:[],
                    willReviewApproverList:[],
                    flowApproverList:[],
               };
               this.selectOptions = {
                    raterList:[], // 评分人
                    coordinatorList:[], // 协调人
                    rateDepartNumList:[],// 评分股
                    willReviewApproverList:[], // 上会复核审批人
                    flowApproverList:[], // 会外流转定点审批人
                };
            }
            const roleList = [
                // {key:'raterList',roleCode:'JZSPFR'},// 评分人
                // {key:'coordinatorList',roleCode:'JSPFXTY'},// 协调人
                {key:'willReviewApproverList',roleCode:'SHFHSPR'},// 上会复核审批人
                {key:'flowApproverList',roleCode:'HYLZSPR'},// 会外流转定点审批人
                // 上会复核审批人  SHFHSPR
                // 会外流转定点审批人 HYLZSPR
            ]
            roleList.forEach((item)=>{
                listUserByRoleCode({roleCode:item.roleCode}).then((res)=>{
                    if(res.code == '200'){
                        res.data.map((itemUser)=>{
                            itemUser.value = itemUser.id+'';
                            itemUser.label = itemUser.nameZh+(itemUser.deptDTO&&itemUser.deptDTO['deptNum'] ? '-'+itemUser.deptDTO['deptNum'] : '');
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
        // 没有loading,频繁触发时数据存在不确定性,未找到使用场景,暂未修改
        selectChange(value,props,rateDepartNum='',parentRateDepartNum='',raterList=[],coordinatorList=[]){
            // 选择评分类型的时候动态获取评分股
            if(props == 'rateTag' && value){
                // 获取评分股下拉数据  MQ:39 EP:38
                listDepartByTag({tagId:value=='MQ' ? '39' : '38'}).then((res)=>{
                    if(res.code == '200'){
                        const data = Array.isArray(res.data) ? res.data : [];
                        data.map((item)=>{
                            item.value = item.id+'';
                            item.label = item.deptNum;
                        })
                        this.selectOptions['rateDepartNumList'] = data;
                        this.form['rateDepartNum'] = rateDepartNum;
                    }
                })
                // MQ 评分人用ZLPFR，协调员用ZLPFXTY
                // EP 评分人用JZSPFR，协调员用JSPFXTY
                const rateTagList = {
                    '39':[
                        {key:'raterList',roleCode:'ZLPFR'},// 评分人
                        {key:'coordinatorList',roleCode:'ZLPFXTY'},// 协调人
                    ],
                    '38':[
                        {key:'raterList',roleCode:'JZSPFR'},// 评分人
                        {key:'coordinatorList',roleCode:'JSPFXTY'},// 协调人
                    ]
                };
                rateTagList[value=='MQ' ? '39' : '38'].forEach((item)=>{
                listUserByRoleCode({roleCode:item.roleCode}).then((res)=>{
                    if(res.code == '200'){
                        res.data.map((itemUser)=>{
                            itemUser.value = itemUser.id+'';
                            itemUser.label = itemUser.nameZh+(itemUser.deptDTO&&itemUser.deptDTO['deptNum'] ? '-'+itemUser.deptDTO['deptNum'] : '');
                        })
                        this.selectOptions[item.key] = res.data || [];
                        this.form['raterList'] = Array.isArray(raterList) ? raterList.map((item)=>item.userId) : [];
                        this.form['coordinatorList'] = Array.isArray(coordinatorList) ? coordinatorList.map((item)=>item.userId) : [];
                    }
                })
            })
                
                
            }else if(props == 'rateDepartNum' && value){ // 评分股切换查询上级部门展示
                const rateDepartNumList = this.selectOptions['rateDepartNumList'].filter((item)=>item.id == value);
                console.log(rateDepartNumList,'rateDepartNumList');
                const parentDeptId = Array.isArray(rateDepartNumList) && rateDepartNumList.length ? rateDepartNumList[0].parentId : null;
                if(parentDeptId){
                    getParentDeptNum({parentDeptId}).then((res)=>{
                        if(res.code == '200') {
                            this.form['parentRateDepartNum'] = res.data || '-';
                        }
                    })
                }else{
                    this.form['parentRateDepartNum'] = parentRateDepartNum;
                }
                
            }

        },
        clearDialog(){
            this.$emit('changeVisible','addDialogVisible',false);
        },
        async submit(){ // 提交
            const { form,selectOptions,addDialogFrom } = this;
            const data = {
                isCheck:form['isCheck'] ? '1' : '0'
            };  
            for(let i = 0;i<addDialogFrom.length;i++){
                const item = addDialogFrom[i];
                if(item.type == 'dicoption'){
                    if(!form[item.props]) return  iMessage.warn(this.language('LK_AEKO_QINGTIANXIEWANZHENGHOUTIJIAO','请填写完整后提交'));
                    const options = this.$refs['iDicoptions_'+item.props][0].options;
                    data[item.props] = form[item.props];
                    const descOption = options.filter((o)=>form[item.props] == (o.value || o.name || o.nameEn));
                    if(descOption.length == 1){
                         data[item.props+'Desc'] = descOption[0]['describe'];
                    }
                }else if(item.type == 'select'){
                    if(item.multiple){ // 多选的时候
                        if(Array.isArray(form[item.props])&& !form[item.props].length && item.required) return  iMessage.warn(this.language('LK_AEKO_QINGTIANXIEWANZHENGHOUTIJIAO','请填写完整后提交'));
                        const list = [];
                        selectOptions[item.selectOption].map((itemSelectOption)=>{
                            if(form[item.props].includes(itemSelectOption.value)){
                                list.push({
                                    userId:itemSelectOption.value,
                                    userName:itemSelectOption.label,
                                })
                            }
                        })
                        data[item.props] = list;
                    }else{
                        if(!form[item.props] && item.required)  return iMessage.warn(this.language('LK_AEKO_QINGTIANXIEWANZHENGHOUTIJIAO','请填写完整后提交'));
                        // 评分股要单独处理一下
                        if(item.props == 'rateDepartNum'){
                            const selectRateDepart = selectOptions['rateDepartNumList'].filter((rateDepartItem)=>rateDepartItem.id == form[item.props]);
                            if(selectRateDepart.length){
                                data[item.props] = selectRateDepart[0].label || '';
                                data['rateDepartId'] = selectRateDepart[0].id || '';
                                data['rateDepartName'] = selectRateDepart[0].nameZh || '';
                                data['parentRateDepartNum'] = form['parentRateDepartNum'] || '';
                            }
                            
                        }
                    }
                }
            }
            console.log(data,'data');
            this.btnLoading = true;
            if(this.openType == 'edit'){
                const editForm = this.multipleSelection[0] || {};
                await updateSysRateDepart({
                    ...editForm,
                    ...data,
                }).then((res)=>{
                    if(res.code == '200'){
                        this.btnLoading = false;
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.$emit('getList');
                        this.clearDialog();
                    }else{
                        this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                    }
                }).catch(()=>{this.btnLoading = false;})
            }else{
                //新增
                await setSysRateDepart(data).then((res)=>{
                    this.btnLoading = false;
                    if(res.code == '200'){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.$emit('getList');
                        this.clearDialog();
                    }else{
                        this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                    }

                }).catch(()=>{this.btnLoading = false;})
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .addDialog{
        .contain{
            .contain-form{
                display: flex;
                // justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                .form-item{
                    width: 30%;
                    margin-right: 3%;
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