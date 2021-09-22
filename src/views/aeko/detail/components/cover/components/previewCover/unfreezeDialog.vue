<!--
 * @Author: wentliao
 * @Date: 2021-09-22 11:44:05
 * @Description: 解冻弹窗
-->
<template>
  <iDialog
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="20%"
    class="unfreezeDialog"
  >
    <template slot="title">
        <h2>{{language('LK_AEKO_DIALOG_DONGJIE','解冻')}}</h2>
    </template>
    <div class="unfreezeDialog-contain">
        <p>{{language("XUANZEYAODONGJIEDEZHUANYECAIGOUYUAN", "选择要冻结的专业采购员")}}</p>
         <iSelect 
            v-model="linie" 
            class="margin-top20" 
            style="width:100%"
            :placeholder="language('LK_AEKO_DAIXUANZE','待选择')"
        >
            <el-option
                v-for="item in linieList || []"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option> 
        </iSelect>
    </div>
    <div class="confirmBtn padding-bottom20 padding-top20 text-align-right">
        <iButton>{{language('LK_AEKO_DIALOG_DONGJIE','解冻')}}</iButton>
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
export default {
    name:'unfreezeDialog',
    components:{
        iDialog,
        iSelect,
        iButton,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return{
            linieList:[],
            linie:'',
        }
    }
}
</script>

<style lang="scss" scoped>
    .unfreezeDialog{
        .assignDialog-contain{
        }
        
    }
</style>