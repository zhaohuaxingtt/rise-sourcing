<!--
 * @Author: wentliao
 * @Date: 2021-07-27 13:45:04
 * @Description: 撤销原因弹窗
-->
<template>
    <iDialog
        :visible.sync="dialogVisible"
        @close="clearDialog"
        width="50%"
        class="revokeDialog"
        >
        <template slot="title">
            <h2>{{language('LK_AEKOCHEXIAOYUANYIN','撤销原因')}}<span style="color:red;fontWeight:normal">*</span></h2>
        </template>
        <iInput
            type="textarea"
            :placeholder="language('LK_QINGSHURUCHEXIAOYUANYIN','请输⼊撤销原因')"
            rows="10" 
            resize="none"
            v-model="cancelReason"
        />
        <div class="confirmBtn padding-bottom20 padding-top20">
            <iButton :loading="isLoading" @click="sumbit">{{language('LK_BAOCUN','保存')}}</iButton>
            <iButton @click="clearDialog">{{language('LK_QUXIAO','取 消')}}</iButton>
        </div>
    </iDialog>
</template>

<script>
import {
    iDialog,
    iInput,
    iButton,
    iMessage,
} from 'rise';
import {
  purchasingCancel,
} from '@/api/aeko/manage'
export default {
    name:"revokeDialog",
    components:{
        iDialog,
        iInput,
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
            cancelReason:'',
            isLoading:false,
        }
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','revokeVisible', false)
        },
        // 确认提交
        async sumbit(){
            const {selectItems,cancelReason } = this;
            const data = {
                cancelReason,
                requirementAekoId:selectItems[0].requirementAekoId,
            };
            if(!cancelReason) return iMessage.warn(this.language('LK_WEITIANXIECHEXIAOYUANYIN','未填写撤销原因，无法保存'));
            this.isLoading = true;
            await purchasingCancel(data).then((res)=>{
                this.isLoading = false;
                if(res.code == 200){
                     iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                     this.clearDialog();
                     this.$emit('getList');
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch((err)=>{
                this.isLoading = false;
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
.revokeDialog{
    .confirmBtn{
        text-align: right;
    }
}
</style>