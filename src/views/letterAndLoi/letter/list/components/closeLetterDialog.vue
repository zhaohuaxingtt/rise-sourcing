<!--
 * @Author: wentliao
 * @Date: 2021-06-18 16:56:36
 * @Description: 关闭定点信弹窗
-->
<template>
  <iDialog
    :title="$t('LK_GUANBIDINGDIANXIN')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="50%"
    class="turnSendDialog"
    >
    <iInput
        type="textarea"
        :placeholder="$t('LK_QINGSHURUGUANBIYUANYIN')"
        rows="10" 
        resize="none"
        v-model="reason"
     />
     <div class="confirmBtn padding-bottom20 padding-top20">
         <iButton>{{$t('LK_QUEDING')}}</iButton>
         <iButton @click="clearDialog">{{$t('LK_QUXIAO')}}</iButton>
     </div>
    </iDialog>
</template>

<script>
import {
    iDialog,
    iInput,
    iButton,
} from 'rise';
export default {
    name:"closeLetterDialog",
    components:{
        iDialog,
        iInput,
        iButton,
    },
    props:{
        dialogVisible: { type: Boolean, default: false }
    },
    data(){
        return{
            reason:'',
        }
    },
    methods:{
        clearDialog() {
        this.$emit('changeVisible','closeLetterVisible', false)
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