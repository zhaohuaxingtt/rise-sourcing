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
        width="300px"
        class="turnSendDialog"
    >
        <div>
            <el-form>
                <el-form-item :label="language('LK_MUBIAOXUNJIACAIGOUYUAN','目标询价采购员')">
                    <iSelect v-update v-model="turnSendFrom.targetCsfCssId" :placeholder="language('partsprocure.CHOOSE','请选择')">
                    <el-option
                        v-for="item in cfList || []"
                        :key="item.id"
                        :label="$i18n.locale === 'zh' ? item.nameZh : item.nameEn"
                        :value="item.id">
                    </el-option>  
                    </iSelect> 
                </el-form-item>
                <el-form-item :label="language('LK_MUBIAOLINE','⽬标LINIE')">
                    <iSelect v-update v-model="turnSendFrom.targetLinieId" :placeholder="language('partsprocure.CHOOSE','请选择')">
                    <el-option
                        v-for="item in linieList || []"
                        :key="item.id"
                        :label="$i18n.locale === 'zh' ? item.nameZh : item.nameEn"
                        :value="item.id">
                    </el-option>  
                    </iSelect> 
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
import {user as configUser } from '@/config'
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
            turnSendFrom:{
                targetCsfCssId:'',
                targetLinieId:'',
            },
            cfList:[], // 前期采购员
            linieList:[], // 专业采购员
            isLoading:false,
        }
    },
    created(){
        this.getMemberList();
    },
    methods:{
        clearDialog() {
        this.$emit('changeVisible','turnSendVisible', false)
        },

        // 获取目标采购员以及目标LINE的人员list
        getMemberList(){
            // tagId: 4 专业采购员，9 前期采购员
           getBuyers({ roleCode: "LINIE" }).then((res)=>{
            //    {tagId:configUser.LINLIE}
               const { code,data=[] } = res;
               if(code ==200){
                   this.linieList = data;
               }
            })
            getBuyers({ roleCode: "QQCGY" }).then((res)=>{
            // {tagId:configUser.BEFORBUYER}
                const { code,data=[] } = res;
               if(code ==200){
                   this.cfList = data;
               }
            })
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

        // 提交
        async submit(){
            const { turnSendFrom,selectItems, } = this;
            const {targetCsfCssId,targetLinieId} = turnSendFrom;
            if(!targetCsfCssId || !targetLinieId){
                 return iMessage.warn(this.language('LK_QINGXUANZE','请选择'));
            }
            
            const targetCsfCssName = this.getName('cfList',targetCsfCssId) || '';
            const targetLinieName = this.getName('linieList',targetLinieId) || '';
            const nominateLetterIds = selectItems.map((item)=>item.nominateLetterId);
            const data = {
                ...turnSendFrom,
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