<!--
 * @Author: wentliao
 * @Date: 2021-06-18 16:56:36
 * @Description: 关闭定点信弹窗
-->
<template>
  <iDialog
    :title="language('LK_GUANBIDINGDIANXIN','关闭定点信')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="50%"
    class="turnSendDialog"
    >
    <iInput
        type="textarea"
        :placeholder="language('LK_QINGSHURUGUANBIYUANYIN','请输⼊关闭原因')"
        rows="10" 
        resize="none"
        v-model="reason"
     />
     <div class="confirmBtn padding-bottom20 padding-top20">
         <iButton :loading="isLoading" @click="sumbit">{{language('LK_QUEDING','确定')}}</iButton>
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
    fsClose,
} from '@/api/letterAndLoi/letter'
export default {
    name:"closeLetterDialog",
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
            reason:'',
            isLoading:false,
        }
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','closeLetterVisible', false)
        },
        // 确认提交
        async sumbit(){
            const {selectItems,reason} = this;
            const nominateLetterIds = (selectItems.map((item)=>item.nominateLetterId)).join();
            const data = {
                nominateLetterIds,
                reason,
            };
            if(!reason){
                return iMessage.warn(this.language('LK_QINGSHURUGUANBIYUANYIN','请输⼊关闭原因'))
            }
            this.isLoading = true;
            await fsClose(data).then((res)=>{
                this.isLoading = false;
                const {code } = res;
                if(code==200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.clearDialog();
                    this.$emit('getList');
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
            }).catch((err)=>{
                this.isLoading = false;
            });
        }
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