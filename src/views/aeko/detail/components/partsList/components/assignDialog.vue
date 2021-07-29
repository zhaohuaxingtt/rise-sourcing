<!--
 * @Author: wentliao
 * @Date: 2021-07-28 14:27:28
 * @Description: 分配科室弹窗
-->
<template>
    <iDialog     
        :title="language('LK_AEKO_FENPAIKESHI','分派科室')"
        :visible.sync="dialogVisible"
        @close="clearDialog"
        width="25%"
        class="assignDialog"
    >
    <div class="assignDialog-contain">
        <!-- 单一分派 -->
        <div v-if="singleAssign.length">
            <p>选择分派科室</p>
            <iSelect :disabled="radioType=='1'" class="margin-top20" style="width:100%">
                <el-option
                    v-for="item in selectOptions || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option> 
            </iSelect>
        </div>

        <!-- 批量分派 -->
        <div v-else>
            <el-radio v-model="radioType" label="1">{{language('LK_AEKO_FENPAIGEIYUSHEKESHI','分派给预设科室')}}</el-radio>
            <br/>
            <el-radio v-model="radioType" label="2" class="radio-select">
                {{language('LK_AEKO_SHOUDONGFENPAIKESHI','⼿动分派科室')}}
                <br/>
                <iSelect :disabled="radioType=='1'" class="margin-top20" style="width:100%">
                    <el-option
                        v-for="item in selectOptions || []"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option> 
                </iSelect>
            </el-radio>
        </div>
    </div>
     <div class="confirmBtn padding-bottom20 padding-top20 ">
         <iButton :loading="isLoading">{{language('LK_AEKO_FENPAI','分派')}}</iButton>
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
    name:'assignDialog',
    components:{
        iDialog,
        iSelect,
        iButton,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        },
        selectItems:{
            type:Array,
            default:()=>[],
        },
        singleAssign:{
            type:Array,
            default:()=>[],
        }
    },
    data(){
        return{
            radioType:'1',
            selectOptions:[
                {label:'科室1',value:'1'},
                {label:'科室2',value:'2'},
            ]
        }
    },
    methods:{
        clearDialog(){
            this.$emit('changeVisible','assignVisible',false);
        }
    }
}
</script>

<style lang="scss" scoped>
    .assignDialog{
        .assignDialog-contain{
            ::v-deep.el-radio{
                margin: 10px 0;
                .el-radio__input.is-checked+.el-radio__label{
                    color: #606266;
                }
            }
        }
        .radio-select{
            display: block;
        }
        .confirmBtn{
            text-align: right;
        }
    }
</style>