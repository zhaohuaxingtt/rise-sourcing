<!--
 * @Author: wentliao
 * @Date: 2021-06-23 15:11:21
 * @Description: 备注弹窗
-->
<template>
  <iDialog
    :title="$t('LK_BIANJIBEIZHU')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="50%"
    class="remarkDialog"
    >
    <iInput
        type="textarea"
        :placeholder="$t('LK_QINGSHURUBEIZHU')"
        rows="10" 
        resize="none"
        v-model="remark"
     />
     <div class="confirmBtn padding-bottom20 padding-top20">
         <iButton @click="submit">{{$t('LK_QUEDING')}}</iButton>
         <iButton @click="clearDialog">{{$t('LK_QUXIAO')}}</iButton>
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
    editRemarkLoi,
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
            default:()=>[],
        }

    },
    data(){
        return{
            remark:'',
        }
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','remarkVisible', false)
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
                return iMessage.warn(this.language('LOI_LK_QINGSHURUBEIZHU','请输⼊备注'))
            }
            await editRemarkLoi(data).then((res)=>{
                const {code } = res;
                if(code==200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.clearDialog();
                    this.$emit('getList');
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
            }).catch((err)=>{});
        }
    }
}
</script>

<style lang="scss" scoped>
.remarkDialog{
    .confirmBtn{
        text-align: right;
    }
}
</style>