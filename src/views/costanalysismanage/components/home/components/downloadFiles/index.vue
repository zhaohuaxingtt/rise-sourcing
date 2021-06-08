<!--
 * @Author: wentliao
 * @Date: 2021-05-27 20:05:33
 * @Description: 技术资料下载弹窗
-->
<template>
    <iDialog
        :visible.sync="dialogVisible"
        @close="clearDialog"
        width="90%"
        class="addPartsDialog"
    >
        <template v-if="dialogVisible">
            <inquiryFiles :rfqNum="rfqNum" />
            <el-divider/>
            <inquiryDrawing :rfqNum="rfqNum" />
        </template>
    </iDialog>
</template>

<script>
import {
    iDialog
} from 'rise'
import inquiryFiles from './inquiryFiles'
import inquiryDrawing from './inquiryDrawing'
export default {
    name:'downloadFiles',
    components:{
        iDialog,
        inquiryFiles,
        inquiryDrawing,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false
        },
        rfqNum:{
            type:String,
            default:'',
        }
    },
    data(){
        return{

        }
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible', false)
        },
    }

}
</script>

<style>

</style>