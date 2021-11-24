<!--
 * @Author: wentliao
 * @Date: 2021-06-21 15:33:20
 * @Description: LOI详情页
-->
<template>
    <iPage class="loiDetail" v-permission.auto="LK_LOI_DETAIL_PAGE|LOI详情页">
        <div class="header">
        <div class="title">{{language('LK_LOIBIANHAO','LOI编号')}}: {{loiInfo.loiNum}}</div>
        <div class="control">
            <span v-if="isEdit">
                <iButton :loading="btnLoading.save" v-permission.auto="LK_LETTERANDLOI_LETTERDETAIL_SAVE|保存" @click="save">{{language('LK_BAOCUN','保存')}}</iButton>
                <iButton @click="changeEditStatus" v-permission.auto="LK_LETTERANDLOI_LETTERDETAIL_CANCEL|取消">{{language('LK_QUXIAO','取消')}}</iButton>
            </span>
            <span v-else><!-- 状态为作废时显示 -->
                <iButton v-permission.auto="LK_LOI_DETAIL_ADDLOI|新增LOI" :loading="btnLoading.add" @click="add" v-if="loiStatus=='TOVOID'">{{language('LK_LETTER_XINZENGLOI','新增LOI')}}</iButton>
                <!-- 状态为前期确认中时显示编辑按钮 -->
                <template  v-if="loiStatus=='CSF_HANDLING'" >
                    <iButton v-permission.auto="LK_LOI_DETAIL_EDIT|编辑" @click="edit">{{language('LK_BIANJI','编辑')}}</iButton>
                    <iButton v-permission.auto="LK_LOI_DETAIL_SUBMIT|确认并提交" :loading="btnLoading.submit" @click="submit">{{language('LK_QUERENBINGTIJIAO','确认并提交')}}</iButton>
                </template>
                <!-- 状态为完成时不显示 -->
                <template>
                    <iButton v-permission.auto="LK_LOI_DETAIL_LINIEQUEREN|LINE确认" :loading="btnLoading.lineSure" @click="lineSure">{{language('LK_LINIEQUEREN','LINE确认')}}</iButton>
                    <iButton v-permission.auto="LK_LOI_DETAIL_LINIETUIHUI|LINE退回" :loading="btnLoading.lineBack" @click="lineBack">{{language('LK_LINIETUIHUI','LINE退回')}}</iButton>
                </template>
                <iButton v-permission.auto="LK_LOI_DETAIL_WANCHENGLOI|完成LOI" :loading="btnLoading.lineDone" v-if="radioType=='NonStandard'" @click="lineDone">{{language('LK_WANCHENGLOI','完成LOI')}}</iButton>
                <iButton v-permission.auto="LK_LOI_DETAIL_DAOCHUBIAOZHUNLOI|导出标准LOI" @click="exportLoi">{{language('LK_DAOCHUBIAOZHUNLOI','导出标准LOI')}}</iButton>
                <iButton v-permission.auto="LK_LOI_DETAIL_LISHILOI|历史LOI" @click="changeShowHistory">{{language('LK_LISHILOI','历史LOI')}} </iButton>
            </span>
            <!-- <logButton class="margin-left20" /> -->
            <iLoger 
                class="margin-left25 margin-right5"
                isPage
                :config="{
                    module_obj_ae: 'LOI', // 模块
                    menuName_obj_ae: '', // 菜单
                    bizId_obj_ae:nomiAppId,
                    createBy_obj_ae:'', // 当前用户
                }"
            />
        </div>
        </div>
        <iCard class="margin-top30" v-permission.auto="LK_LOI_DETAIL_FORM|表单">
           <el-radio-group v-model="radioType" :disabled="!isEdit">
                <el-radio :label="'standard'">{{language('LK_BIAOZHUNLOI','标准LOI')}}</el-radio>
                <el-radio :label="'NonStandard'">{{language('LK_FEIBIAOZHUNLOI','⾮标准LOI')}}</el-radio>
            </el-radio-group>
            <div class="sendTypeBox margin-top20" v-if="radioType=='standard'">
              <el-radio-group v-model="loiInfo.templateType" :disabled="!isEdit">
                <el-radio :label="1">{{language('LK_PILIANGLOI','批量LOI')}}</el-radio>
                <el-radio :label="2">{{language('LK_KAIFALOI','开发LOI')}}</el-radio>
                <el-radio :label="3">{{language('LK_KAIFAPILIANGLOI','开发+批量LOI')}}</el-radio>
              </el-radio-group>
            </div>
            <div class="contain margin-top30">
                <iFormGroup row="2">
                    <div class="col">
                        <iFormItem :label="language('LK_GONGYINGSHANGLIANXIR','供应商联系⼈')+':'">
                            <iSelect v-update v-if="isEdit" v-model="loiInfo.supplierUserId">
                                <el-option
                                    v-for="item in supplierList || []"
                                    :key="item.id"
                                    :label="$i18n.locale === 'zh' ? item.nameZh : item.nameEn"
                                    :value="item.id">
                                </el-option>  
                            </iSelect>
                            <iText v-else>{{loiInfo.supplierUserName}}</iText>
                        </iFormItem>
                        <iFormItem label='LINIE：'>
                            <iSelect v-update v-if="isEdit" v-model="loiInfo.linieUserId">
                                <el-option
                                    v-for="item in linieList || []"
                                    :key="item.id"
                                    :label="$i18n.locale === 'zh' ? item.nameZh : item.nameEn"
                                    :value="item.id">
                                </el-option>  
                            </iSelect>
                            <iText v-else>{{loiInfo.linieName}}</iText>
                        </iFormItem>
                    </div>
                </iFormGroup>
            </div>
        </iCard>

        <!-- 非标准LOI -->
        <loiNonStandard class="margin-top20" v-if="radioType=='NonStandard'" :isEdit="isEdit" :nomiAppId="nomiAppId" v-permission.auto="LK_LOI_DETAIL_NONSTANDARDLOI|非标准LOI板块"  />

        <!-- 历史LOI弹窗 -->
        <historyDialog v-if="showHistory" :dialogVisible="showHistory" @changeVisible="changeShowHistory" :loiInfo="loiInfo"/>
    </iPage>
</template>

<script>
import {
    iPage,
    iButton,
    iCard,
    iFormGroup,
    iFormItem,
    iText,
    iSelect,
    iMessage,
} from 'rise';
// import logButton from "@/components/logButton"
import historyDialog from './components/historyDialog'
import loiNonStandard from './components/loiNonStandard'
import {
    findNomiLoiInfo,
    editTemplateLoi,
    liniefirm,
    linieBackLio,
    exportTemplateLoi,
    confirmSubmitLio,
    cfsLoiDone,
    addNomiLoi,
} from '@/api/letterAndLoi/loi'
import {
    getSupplierUsers,
    getBuyers,
} from  '@/api/letterAndLoi/letter'
import {user as configUser } from '@/config'
import iLoger from 'rise/web/components/iLoger'
export default {
    name:'loiDetail',
    components:{
        iPage,
        // logButton,
        iButton,
        iCard,
        historyDialog,
        loiNonStandard,
        iFormGroup,
        iFormItem,
        iText,
        iSelect,
        iLoger,
    },
    data(){
        return{
            radioType:'standard',
            isEdit:false, // 编辑状态
            showHistory:false, // 历史定点信弹窗
            selectOptions:[],
            checked:false,
            loiInfo:{},
            supplierList:[], // 供应商列表
            linieList:[], // line列表
            loiStatus:'', // LOI状态
            btnLoading:{
                submit:false,
                lineSure:false,
                lineBack:false,
                save:false,
                lineDone:false,
                add:false,
            },

        }
    },
    created(){
        this.getDetail();
    },
    methods:{
        // 编辑状态变更
        changeEditStatus(){
            const { isEdit } = this;
            if(isEdit){
                this.getDetail();
            }
            this.isEdit = !isEdit;
        },
        // 编辑
        edit(){
            this.changeEditStatus();
        },
        // 确认并提交
        async submit(){
            const { loiInfo } = this;
            const { id } = loiInfo;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(!confirmInfo) return;
            this.btnLoading.submit = true;
            await confirmSubmitLio({ids:[id]}).then((res)=>{
                this.btnLoading.submit = true;
                if(res.code == 200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.getDetail();
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{
                this.btnLoading.submit = false;
            })
        },
        // 保存
        async save(){
            this.btnLoading.save = true;
            const { loiInfo,radioType } = this;
            const {id,linieUserId,loiNum,supplierUserId,templateType} = loiInfo;
            const linieName = this.getName('linieList',linieUserId) || loiInfo.linieName;
            const supplierUserName = this.getName('supplierList',supplierUserId) || loiInfo.supplierUserName;
            const data = {
                id,linieUserId,loiNum,supplierUserId,templateType,
                type:radioType==='standard' ? '0' : '1',
                linieName,
                supplierUserName,
            };
            await editTemplateLoi(data).then((res)=>{
                this.btnLoading.save = false;
                const {code} = res;
                if(code == 200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.getDetail();
                    this.isEdit = false;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{
                this.btnLoading.save = false;
            })

        },
        // LINE确认
        async lineSure(){
            const { loiInfo } = this;
            const { id } = loiInfo;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(!confirmInfo) return;
            this.btnLoading.lineSure = true;
            await liniefirm({ids:[id]}).then((res)=>{
                this.btnLoading.lineSure = false;
                if(res.code == 200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.getDetail();
                }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{
                this.btnLoading.lineSure = false;
            })
        },
        // LINE退回
        async lineBack(){
            const { loiInfo } = this;
            const { id } = loiInfo;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(!confirmInfo) return;
            this.btnLoading.lineBack = true;
            await linieBackLio({ids:[id]}).then((res)=>{
                this.btnLoading.lineBack = false;
                if(res.code == 200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.getDetail();
                }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{
                this.btnLoading.lineBack = false;
            })
        },

        // 完成LOI
        async lineDone(){ 
            const { loiInfo } = this;
            const { id } = loiInfo;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(!confirmInfo) return;
            this.btnLoading.lineDone = true;
            await cfsLoiDone({id}).then((res)=>{
                this.btnLoading.lineDone = false;
                if(res.code == 200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.getDetail();
                }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{
                this.btnLoading.lineDone = false;
            })
            
        },
        //  历史定点信弹窗状态变更
        changeShowHistory(){
            const { showHistory } = this;
            this.showHistory = !showHistory;
        },
        // 获取详情
        async getDetail(sendId=null){
            const {query} = this.$route;
            const {id=''} = query;
            this.nomiAppId = sendId || id;
            await findNomiLoiInfo({id:sendId || id}).then((res)=>{
                const {code,data={}} = res;
                if(code == 200){
                    const { loiStatus ={} } = data;
                    // this.loiStatus = loiStatus.code || '';
                    this.loiStatus = loiStatus;
                    this.loiInfo = data;
                    const { type,supplierId } = data; 
                    // templateType   1(标准定点信:批量LOI)，2(标准定点信:开发LOI)，3(标准定点信:开发+批量LOI)
                    // type   0(标准定LOI) 1(非标准定LOI)
                    this.radioType = type == '1' ? 'NonStandard': 'standard' ;
                    this.getUserList(supplierId);
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            })

        },

        // 导出标准LOI 
        async exportLoi(){
            const {query} = this.$route;
            const {id=''} = query;
            await exportTemplateLoi({id});
        },

        // 查一下选中联系人id对应的name
        getName(listKey,id){
            const list = this[listKey] || [];
            const filterList = list.filter((item)=>item.id == id);
            if(filterList.length){
                return filterList[0].nameZh
            }else{
                return null;
            }
        },
        
        // 获取联系人列表
        getUserList(suppierId){
            // 供应商
            getSupplierUsers({suppierId}).then((res)=>{
               const { code,data=[] } = res;
                if(code==200){
                    this.supplierList = data;
                }
            })
            // line
            getBuyers({ roleCode: "LINIE" }).then((res)=>{ // {tagId:configUser.LINLIE}
               const { code,data=[] } = res;
               if(code ==200){
                   this.linieList = data;
               }
            })
        },

        // 新增LOI
        async add(){
            const { loiInfo } = this;
            const { id } = loiInfo;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(!confirmInfo) return;
            this.btnLoading.add = true;
            await addNomiLoi({id}).then((res)=>{
                this.btnLoading.add = false;
                const {code,data} = res;
                if(code==200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.$router.push({ path:'/sourceinquirypoint/sourcing/partsletter/loidetail',query:{id: data}})
                    this.getDetail(data);
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{
                this.btnLoading.add = false;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .loiDetail{
        .header {
            // position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: -10px;

            .title {
            font-size: 20px;
            font-weight: bold;
            color: #000;
            height: 28px;
            line-height: 28px;
            }

            .control {
            // position: absolute;
            // top: 50%;
            // right: 0;
            // transform: translate(0, -50%);
            // display: flex;
            // align-items: center;
            // height: 30px;
            }
        }
        .sendTypeBox{
          padding: 20px 10px;
          margin-left: -10px;
          background-color: #F8F9FA;
          border: 1px dashed rgba($color: #1B1D21, $alpha: .08);
        }
        .contain{
             width: 70%;
            ::v-deep .el-form-item__label{
                width: auto;
            }
            ::v-deep .el-checkbox__label{
                font-size: 12px;
            }
        }
    }
</style>