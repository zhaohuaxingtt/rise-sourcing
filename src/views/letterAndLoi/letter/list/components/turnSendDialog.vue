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
                    <iSelect v-update v-model="turnSendFrom.targetCf" :placeholder="language('partsprocure.CHOOSE','请选择')">
                    <el-option
                        v-for="item in cfList || []"
                        :key="item.id"
                        :label="$i18n.locale === 'zh' ? item.nameZh : item.nameEn"
                        :value="item.id">
                    </el-option>  
                    </iSelect> 
                </el-form-item>
                <el-form-item :label="language('LK_MUBIAOLINE','⽬标LINIE')">
                    <iSelect v-update v-model="turnSendFrom.targetLinie" :placeholder="language('partsprocure.CHOOSE','请选择')">
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
                <iButton @click="submit">{{language('LK_QUEDING','确定')}}</iButton>
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
                targetCf:'',
                targetLinie:'',
            },
            cfList:[], // 前期采购员
            linieList:[], // 专业采购员
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
            // tagId: 4 专业采购员，10 前期采购员
           getBuyers({tagId:4}).then((res)=>{
               const { code,data={} } = res;
               if(code ==200){
                   this.linieList = data;
               }
            })
            getBuyers({tagId:10}).then((res)=>{
                const { code,data={} } = res;
               if(code ==200){
                   this.cfList = data;
               }
            })
        },

        // 提交
        async submit(){
            const { turnSendFrom,selectItems } = this;
            const {targetCf,targetLinie} = turnSendFrom;
            if(!targetCf || !targetLinie){
                iMessage.warn(this.language('LK_QINGXUANZE','请选择'));
            }
            const nominateLetterIds = (selectItems.map((item)=>item.nominateLetterId)).join();
            const data = {
                ...turnSendFrom,
                nominateLetterIds,
            };
            await transfer(data).then((res)=>{
                const { code } = res;
                if(code==200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.clearDialog();
                    this.$emit('getList');
                }
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