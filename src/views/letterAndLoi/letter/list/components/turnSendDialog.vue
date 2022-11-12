<!--
 * @Author: wentliao
 * @Date: 2021-06-18 16:30:07
 * @Description: 转派弹窗
-->
<template>
    <iDialog
        :title="language('partsprocure.PARTSPROCURETRANSFER','转派')"
        :visible.sync="dialogVisible"
        @close="clearDialog"
        width="600px"
        class="turnSendDialog"
    >
        <div>
            <el-form label-position="top">
                <el-form-item :label="language('LK_MUBIAOXUNJIACAIGOUYUAN','目标询价采购员')">
                <el-row gutter="20">
                    <el-col :span="8">
                        <iSelect v-model="deptCodeCsf" value-key="id" :placeholder="language('QINGXUANZEKESHI','请选择科室')"  @change="getUserListCsf" clearable :loading="deptLoading">
                            <el-option
                                v-for="item in deptOptions"
                                :key="item.code"
                                :label="item.deptNum"
                                :value="item.code">
                            </el-option>
                        </iSelect> 
                    </el-col>
                    <el-col :span="16">
                        <iSelect v-update v-model="targetCsfCss" :loading="csfLoading" :placeholder="language('partsprocure.CHOOSE','请选择')" value-key="value">
                            <el-option
                                v-for="item in csfUserOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item">
                            </el-option>  
                        </iSelect> 
                    </el-col>
                </el-row>
                </el-form-item>
                <el-form-item :label="language('LK_MUBIAOLINE','⽬标LINIE')">
                    <el-row gutter="20">
                    <el-col :span="8">
                        <iSelect v-model="deptCodeLinie" value-key="id" :placeholder="language('QINGXUANZEKESHI','请选择科室')"  @change="getUserListLinie" clearable :loading="deptLoading">
                            <el-option
                                v-for="item in deptOptions"
                                :key="item.code"
                                :label="item.deptNum"
                                :value="item.code">
                            </el-option>
                        </iSelect> 
                    </el-col>
                    <el-col :span="16">
                        <iSelect v-update v-model="targetLinie" :loading="linieLoading" :placeholder="language('partsprocure.CHOOSE','请选择')" value-key="value">
                            <el-option
                                v-for="item in linieUserOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item">
                            </el-option>  
                        </iSelect> 
                    </el-col>
                </el-row>
                </el-form-item>
            </el-form>
            <p class="confirmBtn padding-bottom20">
                <iButton :loading="isLoading" @click="submit">{{language('LK_QUEDING','确定')}}</iButton>
            </p>
        </div>   
    </iDialog>
</template>

<script>
import {
    iDialog,
    iSelect,
    iButton,
    iMessage,
} from 'rise';
import {
    getBuyers,
    transfer,
}from '@/api/letterAndLoi/letter';
import { getRfqUserInfoList, getRfqDeptList } from '@/api/partsrfq/home'
export default { //
    name:'turnSendDialog',
    components:{
        iDialog,
        iSelect,
        iButton,
    },
    props:{
        dialogVisible: { type: Boolean, default: false },
        selectItems:{
            type:Array,
            default:()=>[],
        }
    },
    data(){
        return{
            targetCsfCss:'',// 前期采购员
            targetLinie:'',// 专业采购员
            isLoading:false,
            userId: '',
            csfUserOptions: [],
            linieUserOptions: [],

            deptOptions:[],
            deptCodeCsfcss:'',
            deptCodeLinie: '',// 专业采购员

            deptLoading:false,
            csfLoading:false,
            linieLoading:false,
        }
    },
    watch: {
        dialogVisible(val) {
            if (val) {
                this.userId = ''
                this.getRfqDeptList()
            }
        }
    },
    methods:{
        clearDialog() {
        this.$emit('changeVisible','turnSendVisible', false)
        },
        
        getRfqDeptList(){
            this.deptLoading = true
            getRfqDeptList().then(res=>{
                this.deptOptions = res.data
                this.deptLoading = false
                this.getUserListCsf()
                this.getUserListLinie()
            })
        },
        getUserListCsf() {
            this.csfLoading = true
            this.targetCsfCss = ''
            getRfqUserInfoList({deptId:this.deptCodeCsf}).then(res => {
                if (res.result) {
                this.csfUserOptions = res.data?.map(item => {return {value:item.code, label:item.name}})
                } else {
                this.csfUserOptions = []
                }
                this.csfLoading = false
            })
        },
        getUserListLinie() {
            this.linieLoading = true
            this.targetLinie = ''
            getRfqUserInfoList({deptId:this.deptCodeLinie}).then(res => {
                if (res.result) {
                this.linieUserOptions = res.data?.map(item => {return {value:item.code, label:item.name}})
                } else {
                this.linieUserOptions = []
                }
                this.linieLoading = false
            })
        },
        // // 获取目标采购员以及目标LINE的人员list
        // getMemberList(){
        //     // tagId: 4 专业采购员，9 前期采购员
        //    getBuyers({ roleCode: "LINIE" }).then((res)=>{
        //     //    {tagId:configUser.LINLIE}
        //        const { code,data=[] } = res;
        //        if(code ==200){
        //            this.linieList = data;
        //        }
        //     })
        //     getBuyers({ roleCode: "QQCGY" }).then((res)=>{
        //     // {tagId:configUser.BEFORBUYER}
        //         const { code,data=[] } = res;
        //        if(code ==200){
        //            this.cfList = data;
        //        }
        //     })
        // },

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

        // 提交
        async submit(){
            const { targetCsfCss, targetLinie, selectItems, } = this;
            const targetCsfCssId = targetCsfCss.value;
            const targetLinieId = targetLinie.value;
            if(!targetCsfCssId || !targetLinieId){
                 return iMessage.warn(this.language('LK_QINGXUANZE','请选择'));
            }
            const targetCsfCssName = targetCsfCss.label || '';
            const targetLinieName = targetLinie.label || '';
            var nominateLetterIds = [];
            if(this.$route.path == "/sourceinquirypoint/sourcing/partsletter/loi"){
                nominateLetterIds = selectItems.map((item)=>item.id);
            }else{
                nominateLetterIds = selectItems.map((item)=>item.nominateLetterId);
            }
            const data = {
                targetCsfCssId,
                targetLinieId,
                targetCsfCssName,
                targetLinieName,
                nominateLetterIds,
            };
            this.isLoading = true;
            await transfer(data).then((res)=>{
                this.isLoading = false;
                const { code } = res;
                if(code==200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.clearDialog();
                    this.$emit('getList');
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch((err)=>{ 
                this.isLoading = false; 
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.turnSendDialog{
    .confirmBtn{
        text-align: right;
    }
}
</style>