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
        :placeholder="language('LK_WEITIANXIECHEXIAOYUANYIN','未填写撤销原因，无法保存')"
        rows="10" 
        resize="none"
        v-model="reason"
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
            reason:'',
            isLoading:false,
        }
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','revokeVisible', false)
        },
        // 确认提交
        sumbit(){
            const {selectItems,reason} = this;
            const data = {
                reason,
            };
            if(!reason){
                return iMessage.warn(this.language('LK_QINGSHURUCHEXIAOYUANYIN','请输⼊撤销原因'))
            }
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