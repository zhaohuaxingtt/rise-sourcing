<!--
 * @Author: wentliao
 * @Date: 2021-06-18 17:19:46
 * @Description: 定点信详情页
-->
<template>
    <iPage class="letterDetail" v-permission.auto="LK_LETTER_DETAIL_PAGE|定点信详情页">
        <div class="header">
        <div class="title">{{language('LK_DINGDIANXINBIANHAO','定点信编号')}}: {{detailInfo.letterNum}}</div>
        <div class="control">
            <span v-if="isEdit">
                <iButton :loading="btnLoading.save" @click="save" v-permission.auto="LK_LETTER_DETAIL_SAVE|保存">{{language('LK_BAOCUN','保存')}}</iButton>
                <iButton @click="changeEditStatus" v-permission.auto="LK_LETTER_DETAIL_CANCEL|取消">{{language('LK_QUXIAO','取 消')}}</iButton>
            </span>
            <span v-else>
                <!-- 状态为作废时显示 -->
                <iButton v-permission.auto="LK_LETTER_DETAIL_XINZENGDINGDIANXIN|新增定点信" :loading="btnLoading.add" @click="add" v-if="detailInfo.status=='TOVOID'">{{language('LK_LETTER_XINZENGDINGDIANXIN','新增定点信')}}</iButton>
                <!-- 状态为前期确认中时显示编辑按钮 -->
                <template v-if="detailInfo.status=='CSF_HANDLING'" >
                    <iButton v-permission.auto="LK_LETTER_DETAIL_EDIT|编辑"  @click="edit">{{language('LK_BIANJI','编辑')}}</iButton>
                    <iButton v-permission.auto="LK_LETTER_DETAIL_SUBMIT|确认并提交" :loading="btnLoading.sureSubmit"  @click="sureSubmit">{{language('LK_QUERENBINGTIJIAO','确认并提交')}}</iButton>
                </template>
                <!-- 状态为完成时不显示 -->
                <template v-if="detailInfo.status!='COMPLETIED'">
                    <iButton v-permission.auto="LK_LETTER_DETAIL_LINIEQUEREN|LINIE确认" :loading="btnLoading.lineSure"  @click="lineSure">{{language('LK_LINIEQUEREN','LINIE确认')}}</iButton>
                    <iButton v-permission.auto="LK_LETTER_DETAIL_LINIETUIHUI|LINIE退回" :loading="btnLoading.lineBack" @click="lineBack">{{language('LK_LINIETUIHUI','LINIE退回')}}</iButton>
                </template>
                <iButton v-permission.auto="LK_LETTER_DETAIL_WANCHENGDINGDIANXIN|完成定点信" :loading="btnLoading.complete" v-if="radioType=='NonStandard' && detailInfo.status!='COMPLETIED'" @click="complete">{{language('LK_WANCHENGDINGDIANXIN','完成定点信')}}</iButton>
                <iButton v-permission.auto="LK_LETTER_DETAIL_DAOCHUBIAOZHUNDINGDIANXIN|导出标准定点信" @click="downloadFiles">{{language('LK_DAOCHUBIAOZHUNDINGDIANXIN','导出标准定点信')}}</iButton>
                <iButton v-permission.auto="LK_LETTER_DETAIL_LISHIDINGDIANXIN|历史定点信"  @click="changeShowHistory">{{language('LK_LISHIDINGDIANXIN','历史定点信')}} </iButton>
            </span>
            <!-- <logButton class="margin-left20" @click="toLogPage"/> -->
            <iLoger 
                class="margin-left25 margin-right5"
                optionDicKey="LOG_OPERATION_TYPES"
				optionDicKey2="定点信详情页"
                isPage
                isUser
                :config="{
                    module_obj_ae: '定点信', // 模块
                    menuName_obj_ae: '', // 菜单
                    bizId_obj_ae:nomiAppId, // 定点信id
                }"
            />
        </div>
        </div>
        <iCard class="margin-top30" v-permission.auto="LK_LETTER_DETAIL_FORM|表单">
           <el-radio-group v-model="radioType" :disabled="!isEdit" @change="changeRadio">
                <el-radio :label="'standard'">{{language('LK_BIAOZHUNDINGDIANXIN','标准定点信')}}</el-radio>
                <el-radio :label="'NonStandard'">{{language('LK_FEIBIAOZHUNDINGDIANXIN','⾮标准定点信')}}</el-radio>
            </el-radio-group>
            <div class="contain margin-top30">
                <iFormGroup row="2">
                    <div class="col">
                        <iFormItem :label="language('LK_GONGYINGSHANGLIANXIR','供应商联系⼈')+':'">
                            <iSelect v-update v-if="isEdit" v-model="detailInfo.supplierUserId">
                                <el-option
                                    v-for="item in supplierList || []"
                                    :key="item.id"
                                    :label="$i18n.locale === 'zh' ? item.nameZh : item.nameEn"
                                    :value="item.id">
                                </el-option>  
                            </iSelect>
                            <iText v-else>{{detailInfo.supplierUserName}}</iText>
                        </iFormItem>
                        <iFormItem label='LINIE：'>
                            <iSelect v-update v-if="isEdit" v-model="detailInfo.linieId">
                                <el-option
                                    v-for="item in linieList || []"
                                    :key="item.id"
                                    :label="$i18n.locale === 'zh' ? item.nameZh : item.nameEn"
                                    :value="item.id+''">
                                </el-option>  
                            </iSelect>
                            <iText v-else>{{detailInfo.linieName}}</iText>
                        </iFormItem>
                    </div>
                </iFormGroup>
                <!-- 标准定点信 -->
                <el-checkbox v-if="radioType=='standard'" v-model="detailInfo.isCheckClause" :disabled="!isEdit">包含以下条款：所有批量前⽣产（PVS) 和零批量（0-Serien）所需要的零件按照批量供货价格结算，Alle PVS-u，0-Serien-Telle warden zum Serienpreis abgerechnet</el-checkbox>
                
            </div>
        </iCard>

        <!-- v-if="radioType=='NonStandard'"  -->
        <!-- 非标准定点信 -->
        <nonStandard ref="ddxTable" class="margin-top20" :radioType="radioType" :isEdit="isEdit" v-if="typeShow" :nomiAppId="nominateLetterId" v-permission.auto="LK_LETTER_DETAIL_NONSTANDARDLETTER|非标准定点信" />

        <!-- 历史定点信弹窗 -->
        <historyDialog v-if="showHistory" :dialogVisible="showHistory" @changeVisible="changeShowHistory" :nominateLetterId ="nominateLetterId"/>
        <!-- 日志弹窗 -->
        <!-- <iLog :show.sync="showLogDialog" :module="module"></iLog> -->
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
import nonStandard from './components/nonStandard'
import iLoger from 'rise/web/components/iLoger'
import {
    getLetterDetail,
    downloadLetterFile,
    liniefirm,
    liniereturn,
    getSupplierUsers,
    getBuyers,
    update,
    fsAdd,
    fsComplete,
    fsConfirm,
} from  '@/api/letterAndLoi/letter'
import {user as configUser } from '@/config'
// import iLog from '@/views/aeko/log'
export default {
    name:'letterDetail',
    components:{
        iPage,
        iButton,
        iCard,
        historyDialog,
        nonStandard,
        iFormGroup,
        iFormItem,
        iText,
        iSelect,
        // iLog,
        // logButton,
        iLoger,
    },
    data(){
        return{
            radioType:'standard',
            isEdit:false, // 编辑状态
            showHistory:false, // 历史定点信弹窗
            selectOptions:[],
            nominateLetterId:'', // 定点信id
            linieList:[], // line列表
            supplierList:[], // 供应商列表
            detailInfo:{}, // 详情
            btnLoading:{
                save:false,
                add:false,
                sureSubmit:false,
                lineSure:false,
                lineBack:false,
                complete:false,
            },
            showLogDialog:false,
            module:'定点信',
            typeShow:false,

        }
    },
    created(){
        this.getDetail();

    },
    methods:{
        changeRadio(val){
            if(val == "standard"){//标准定点信
                this.$refs.ddxTable.getFetchDataList();
            }else if(val == "NonStandard"){//非标准定点信
                this.$refs.ddxTable.getFetchDataList();
            }
        },
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
        //  历史定点信弹窗状态变更
        changeShowHistory(){
            const { showHistory } = this;
            this.showHistory = !showHistory;
        },
        // 获取定点信详情
        async getDetail(){
            const {query} = this.$route;
            const {id=''} = query;
            this.nomiAppId = id;
            await getLetterDetail({nominateLetterId:id}).then((res)=>{
                const {code,data={}} = res;
                if(code == 200){
                    const { templateType,nominateLetterId,supplierId } = data;
                    this.detailInfo = data;
                    this.radioType = templateType==0 ? 'standard' : 'NonStandard';
                    this.nominateLetterId = nominateLetterId;

                    this.typeShow = true;
                    this.getUserList(supplierId);
                }else{
                     iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{})
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
            // linie
            getBuyers({ roleCode: "LINIE" }).then((res)=>{
            // {tagId:configUser.LINLIE}
               const { code,data=[] } = res;
               if(code ==200){
                   this.linieList = data;
               }
            })
        },
        // 导出定点信
        async downloadFiles(){
            const { nominateLetterId }  = this;
            await downloadLetterFile({nominateLetterId});
        },
        // line确认
        async lineSure(){
            const { nominateLetterId } = this;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(confirmInfo){
                 await liniefirm({nominateLetterIds:nominateLetterId}).then((res)=>{
                 const { code } = res;
                 if(code == 200){
                     this.getDetail();
                     iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                 }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                 }
                }).catch((err)=>{});
            }
            
        },

        // line退回
        async lineBack(){
            const { nominateLetterId } = this;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(confirmInfo){
                 await liniereturn({nominateLetterIds:nominateLetterId}).then((res)=>{
                 const { code } = res;
                 if(code == 200){
                     iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                     this.getDetail();
                 }else{
                      iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                 }
                }).catch((err)=>{});
            }
        },

        // 保存
        async save(){
            const { detailInfo,linieList,supplierList,radioType } = this;
            const { supplierUserId ,linieId} = detailInfo;
            // 获取所选供应商和line的名称
            const linieName = linieList.filter((item)=>item.id == linieId);
            const supplierUserName = supplierList.filter((item)=>item.id == supplierUserId);
            const data = {
                ...detailInfo,
                linieName:linieName[0] ? linieName[0].nameZh : '',
                supplierUserName:supplierUserName[0] ? supplierUserName[0].nameZh : '',
                templateType:radioType==='standard' ? 0 : 1,
            }
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(confirmInfo){
                this.btnLoading.save = true;
                await update(data).then((res)=>{
                    this.btnLoading.save = false;
                    if(res.code==200){
                         iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                         this.getDetail();
                         this.isEdit = false;
                    }else{
                         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.save = false;
                })
            }
        },
        
        // 新增定点信
        async add(){
            const { nominateLetterId } = this;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(!confirmInfo) return;
            this.btnLoading.add = true;
            await fsAdd({nominateLetterId}).then((res)=>{
                this.btnLoading.add = false;
                const {code} = res;
                if(code==200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.getDetail();
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{
                this.btnLoading.add = false;
            })
        },

        // 完成定点信
        async complete(){
            const { nominateLetterId } = this;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(!confirmInfo) return;
            this.btnLoading.complete = true;
            await fsComplete({nominateLetterId}).then((res)=>{
                this.btnLoading.complete = false;
                const {code} = res;
                if(code==200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.getDetail();
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{
                this.btnLoading.complete = false;
            })
        },

        // 确认并提交
        async sureSubmit(){
            const { nominateLetterId } = this;
            const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
            if(!confirmInfo) return;
            this.btnLoading.sureSubmit = true;
            await fsConfirm({nominateLetterIds:nominateLetterId}).then((res)=>{
                    this.btnLoading.sureSubmit = false;
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getDetail();
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.sureSubmit = false;
                });
        },

        // 跳转查看日志
        toLogPage() {
            // const id = this.$route.query.id
            // if (id) {
            //     window.open(`/#/log?recordId=${id}`, '_blank')
            // }
            // setLogMenu('AEKO管理-列表')
            this.showLogDialog = true;
        },
    }
}
</script>

<style lang="scss" scoped>
    .letterDetail{
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
        .contain{
             width: 70%;
            ::v-deep .el-form-item__label{
                width: auto;
            }
            ::v-deep .el-checkbox__label{
                font-size: 12px;
            }
            ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label{
                color:#4D4F5C;
            }
        }
    }
</style>