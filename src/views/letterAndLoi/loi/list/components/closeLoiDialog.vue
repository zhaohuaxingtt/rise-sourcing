<!--
 * @Author: wentliao
 * @Date: 2021-06-21 15:19:01
 * @Description: LOI关闭原因
-->
<template>
  <iDialog
    :title="$t('LK_GUANBILOI')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="50%"
    class="closeLoiDialog"
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
    name:"closeLoiDialog",
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
        this.$emit('changeVisible','closeLoiVisible', false)
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