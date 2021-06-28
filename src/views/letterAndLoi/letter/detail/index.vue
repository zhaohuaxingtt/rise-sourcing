<!--
 * @Author: wentliao
 * @Date: 2021-06-18 17:19:46
 * @Description: 定点信详情页
-->
<template>
    <iPage class="letterDetail">
        <div class="header clearFloat">
        <div class="title">{{language('LK_DINGDIANXINBIANHAO','定点信编号')}}: {{letterNum}}</div>
        <div class="control">
            <span v-if="isEdit">
                <iButton>{{language('LK_BAOCUN','保存')}}</iButton>
                <iButton @click="changeEditStatus">{{language('LK_QUXIAO','取 消')}}</iButton>
            </span>
            <span v-else>
                <iButton @click="edit">{{language('LK_BIANJI','编辑')}}</iButton>
                <iButton >{{language('LK_QUERENBINGTIJIAO','确认并提交')}}</iButton>
                <iButton @click="lineSure">{{language('LK_LINEQUEREN','LINIE确认')}}</iButton>
                <iButton @click="lineBack">{{language('LK_LINETUIHUI','LINIE退回')}}</iButton>
                <iButton v-if="radioType=='NonStandard'">{{language('LK_WANCHENGDINGDIANXIN','完成定点信')}}</iButton>
                <iButton @click="downloadFiles">{{language('LK_DAOCHUBIAOZHUNDINGDIANXIN','导出标准定点信')}}</iButton>
                <iButton @click="changeShowHistory">{{language('LK_LISHIDINGDIANXIN','历史定点信')}} </iButton>
            </span>
            <logButton class="margin-left20" />
        </div>
        </div>
        <iCard class="margin-top30">
           <el-radio-group v-model="radioType" :disabled="!isEdit">
                <el-radio :label="'standard'">{{language('LK_BIAOZHUNDINGDIANXIN','标准定点信')}}</el-radio>
                <el-radio :label="'NonStandard'">{{language('LK_FEIBIAOZHUNDINGDIANXIN','⾮标准定点信')}}</el-radio>
            </el-radio-group>
            <div class="contain margin-top30">
                <iFormGroup row="2">
                    <div class="col">
                        <iFormItem :label="language('LK_GONGYINGSHANGLIANXIR','供应商联系⼈')+':'">
                            <iSelect v-update v-if="isEdit">
                                <el-option
                                    v-for="item in selectOptions || []"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>  
                            </iSelect>
                            <iText v-else>{{supplierUserName}}</iText>
                        </iFormItem>
                        <iFormItem label='LINIE：'>
                            <iSelect v-update v-if="isEdit">
                                <el-option
                                    v-for="item in selectOptions || []"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>  
                            </iSelect>
                            <iText v-else>{{linieName}}</iText>
                        </iFormItem>
                    </div>
                </iFormGroup>
                <!-- 标准定点信 -->
                <el-checkbox v-if="radioType=='standard'" v-model="isCheckClause" :disabled="!isEdit">包含以下条款：所有批量前⽣产（PVS) 和零批量（0-Serien）所需要的零件按照批量供货价格结算，Alle PVS-u，0-Serien-Telle warden zum Serienpreis abgerechnet</el-checkbox>
                
            </div>
        </iCard>

        <!-- 非标准定点信 -->
        <nonStandard class="margin-top20" v-if="radioType=='NonStandard'" :isEdit="isEdit" :nomiAppId="nomiAppId"/>

        <!-- 历史定点信弹窗 -->
        <historyDialog v-if="showHistory" :dialogVisible="showHistory" @changeVisible="changeShowHistory" :nominateLetterId ="nominateLetterId"/>
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
} from 'rise';
import logButton from "@/views/partsign/editordetail/components/logButton"
import historyDialog from './components/historyDialog'
import nonStandard from './components/nonStandard'
import {
    getLetterDetail,
    downloadLetterFile,
    liniefirm,
    liniereturn,
} from  '@/api/letterAndLoi/letter'
export default {
    name:'letterDetail',
    components:{
        iPage,
        logButton,
        iButton,
        iCard,
        historyDialog,
        nonStandard,
        iFormGroup,
        iFormItem,
        iText,
        iSelect,
    },
    data(){
        return{
            radioType:'standard',
            isEdit:false, // 编辑状态
            showHistory:false, // 历史定点信弹窗
            selectOptions:[],
            letterNum:'',
            supplierUserName:'', // 供应商名称
            linieName:'', // line名称
            nomiAppId:'', // 定点申请id
            isCheckClause:false, // 是否勾选协议
            nominateLetterId:'', // 定点信id
        }
    },
    created(){
        this.getDetail();
    },
    methods:{
        // 编辑状态变更
        changeEditStatus(){
            const { isEdit } = this;
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
            await getLetterDetail({nominateLetterId:id}).then((res)=>{
                const {code,data={}} = res;
                if(code == 200){
                    const { templateType,letterNum,supplierUserName,linieName,nomiAppId,isCheckClause,nominateLetterId } = data;
                    this.radioType = templateType==0 ? 'standard' : 'NonStandard';
                    this.letterNum = letterNum;
                    this.supplierUserName = supplierUserName;
                    this.linieName = linieName;
                    this.nomiAppId = nomiAppId;
                    this.isCheckClause = isCheckClause;
                    this.nominateLetterId = nominateLetterId;

                }
            }).catch((err)=>{})
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
                     this.getDetail();
                 }
                }).catch((err)=>{});
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .letterDetail{
        .header {
            position: relative;

            .title {
            font-size: 20px;
            font-weight: bold;
            color: #000;
            height: 28px;
            line-height: 28px;
            }

            .control {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            display: flex;
            align-items: center;
            height: 30px;
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