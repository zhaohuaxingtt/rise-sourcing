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
        this.$emit('changeVisible','remarkVisible', false)
        },
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