<!--
 * @Author: wentliao
 * @Date: 2021-06-21 15:19:01
 * @Description: LOI关闭原因
-->
<template>
  <iDialog
    :title="language('LK_GUANBILOI','关闭LOI')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="50%"
    class="closeLoiDialog"
    >
    <iInput
        type="textarea"
        :placeholder="language('LK_QINGSHURUGUANBIYUANYIN','请输⼊关闭原因')"
        rows="10" 
        resize="none"
        v-model="remark"
     />
     <div class="confirmBtn padding-bottom20 padding-top20">
         <iButton :loading="isLoading" @click="submit">{{language('LK_QUEDING','确定')}}</iButton>
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
    closeLoi,
} from '@/api/letterAndLoi/loi'
export default {
    name:"closeLoiDialog",
    components:{
        iDialog,
        iInput,
        iButton,
    },
    props:{
        dialogVisible: { type: Boolean, default: false },
        selectItems:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return{
            remark:'',
            isLoading:false,
        }
    },
    methods:{
        clearDialog() {
        this.$emit('changeVisible','closeLoiVisible', false)
        },
        
        // 确认提交
        async submit(){
            const {selectItems,remark} = this;
            const ids = (selectItems.map((item)=>item.id));
            const data = {
                ids,
                remark,
            };
            if(!remark){
                return iMessage.warn(this.language('LK_QINGSHURUGUANBIYUANYIN','请输⼊关闭原因'))
            }
            this.isLoading = true;
            await closeLoi(data).then((res)=>{
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