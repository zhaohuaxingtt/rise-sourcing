<!--
 * @Author: wentliao
 * @Date: 2021-06-18 16:30:07
 * @Description: 转派弹窗
-->
<template>
    <iDialog
        title="转派"
        :visible.sync="dialogVisible"
        @close="clearDialog"
        width="300px"
        class="turnSendDialog"
    >
        <div>
            <el-form>
                <el-form-item label="目标询价采购员">
                    <iSelect v-update v-model="turnSendFrom.key1" :placeholder="$t('partsprocure.CHOOSE')">
                    <el-option
                        v-for="item in selectOptionKey1 || []"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>  
                    </iSelect> 
                </el-form-item>
                <el-form-item label="⽬标LINIE">
                    <iSelect v-update v-model="turnSendFrom.key2" :placeholder="$t('partsprocure.CHOOSE')">
                    <el-option
                        v-for="item in selectOptionKey2 || []"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>  
                    </iSelect> 
                </el-form-item>
            </el-form>
            <p class="confirmBtn padding-bottom20">
                <iButton>确定</iButton>
            </p>
        </div>   
    </iDialog>
</template>

<script>
import {
    iDialog,
    iSelect,
    iButton,
} from 'rise';
export default {
    name:'turnSendDialog',
    components:{
        iDialog,
        iSelect,
        iButton,
    },
    props:{
        dialogVisible: { type: Boolean, default: false }
    },
    data(){
        return{
            turnSendFrom:{},
            selectOptionKey1:[],
            selectOptionKey2:[],
        }
    },
    methods:{
        clearDialog() {
        this.$emit('changeVisible','turnSendVisible', false)
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