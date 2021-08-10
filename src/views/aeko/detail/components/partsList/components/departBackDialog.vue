<!--
 * @Author: wentliao
 * @Date: 2021-08-09 11:28:36
 * @Description: 科室退回弹窗
-->
<template>
    <iDialog
        :visible.sync="dialogVisible"
        @close="clearDialog"
        width="50%"
        class="departBackDialog"
        >
        <template slot="title">
            <h2>{{language('LK_AEKO_TUIHUIYUANYIN','退回原因')}}<span style="color:red;fontWeight:normal">*</span></h2>
        </template>
        <iInput
            type="textarea"
            :placeholder="language('LK_WEITIANXIETUIHUIYUANYIN','未填写退回原因，无法保存')"
            rows="10" 
            resize="none"
            v-model="withdrawReason"
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
    deptRollback,
} from '@/api/aeko/detail/partsList.js'
export default {
    name:'departBackDialog',
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
            withdrawReason:'非本科室零件',
            isLoading:false,
        }
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','departBackVisible', false)
        },
        // 保存
        async sumbit(){
            const {query} = this.$route;
            const { requirementAekoId ='',} = query;
            const {selectItems,withdrawReason } = this;
            const data = {
                withdrawReason,
                aekoPartIdArr:selectItems.map((item)=>item.aekoPartId),
                requirementAekoId,
            };
            this.isLoading = true;
            await deptRollback(data).then((res)=>{
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
        },
    },
}
</script>

<style lang="scss" scoped>
.departBackDialog{
    .confirmBtn{
        text-align: right;
    }
}
</style>
