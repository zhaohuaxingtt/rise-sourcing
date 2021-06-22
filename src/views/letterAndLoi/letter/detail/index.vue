<!--
 * @Author: wentliao
 * @Date: 2021-06-18 17:19:46
 * @Description: 定点信详情页
-->
<template>
    <iPage class="letterDetail">
        <div class="header clearFloat">
        <div class="title">定点信编号: NL21-10180</div>
        <div class="control">
            <span v-if="isEdit">
                <iButton>保存</iButton>
                <iButton @click="changeEditStatus">取消</iButton>
            </span>
            <span v-else>
                <iButton @click="edit">编辑</iButton>
                <iButton>LINIE确认</iButton>
                <iButton>LINIE退回</iButton>
                <iButton v-if="radioType=='NonStandard'">完成定点信</iButton>
                <iButton>导出标准定点信</iButton>
                <iButton @click="changeShowHistory">历史定点信 </iButton>
            </span>
            <logButton class="margin-left20" />
        </div>
        </div>
        <iCard class="margin-top30">
           <el-radio-group v-model="radioType" :disabled="!isEdit">
                <el-radio :label="'standard'">标准定点信</el-radio>
                <el-radio :label="'NonStandard'">⾮标准定点信</el-radio>
            </el-radio-group>
            <div class="contain margin-top30">
                <iFormGroup row="2">
                    <div class="col">
                        <iFormItem label='供应商联系⼈：'>
                            <iSelect v-update v-if="isEdit">
                                <el-option
                                    v-for="item in selectOptions || []"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>  
                            </iSelect>
                            <iText v-else>王佩君</iText>
                        </iFormItem>
                        <iFormItem label='LINIE：'>
                            <iSelect v-update v-if="isEdit">
                                <el-option
                                    v-for="item in selectOptions || []"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>  
                            </iSelect>
                            <iText v-else>王默薇</iText>
                        </iFormItem>
                    </div>
                </iFormGroup>
                <!-- 标准定点信 -->
                <el-checkbox v-if="radioType=='standard'" v-model="checked" :disabled="!isEdit">包含以下条款：所有批量前⽣产（PVS) 和零批量（0-Serien）所需要的零件按照批量供货价格结算，Alle PVS-u，0-Serien-Telle warden zum Serienpreis abgerechnet</el-checkbox>
                
            </div>
        </iCard>

        <!-- 非标准定点信 -->
        <nonStandard class="margin-top20" v-if="radioType=='NonStandard'" :isEdit="isEdit"/>

        <!-- 历史定点信弹窗 -->
        <historyDialog v-if="showHistory" :dialogVisible="showHistory" @changeVisible="changeShowHistory" />
    </iPage>
</template>

<script>
import {
    iPage,
    iButton,
    iCard,
    iFormGroup,
    iFormItem,
    iText,
    iSelect,
} from 'rise';
import logButton from "@/components/logButton"
import historyDialog from './components/historyDialog'
import nonStandard from './components/nonStandard'
export default {
    name:'letterDetail',
    components:{
        iPage,
        logButton,
        iButton,
        iCard,
        // standard,
        historyDialog,
        nonStandard,
        iFormGroup,
        iFormItem,
        iText,
        iSelect,
    },
    data(){
        return{
            radioType:'standard',
            isEdit:false, // 编辑状态
            showHistory:false, // 历史定点信弹窗
            selectOptions:[],
            checked:false,
        }
    },
    created(){
    },
    methods:{
        // 编辑状态变更
        changeEditStatus(){
            const { isEdit } = this;
            this.isEdit = !isEdit;
        },
        // 编辑
        edit(){
            this.changeEditStatus();
        },
        //  历史定点信弹窗状态变更
        changeShowHistory(){
            const { showHistory } = this;
            this.showHistory = !showHistory;
        }
    }
}
</script>

<style lang="scss" scoped>
    .letterDetail{
        .header {
            position: relative;

            .title {
            font-size: 20px;
            font-weight: bold;
            color: #000;
            height: 28px;
            line-height: 28px;
            }

            .control {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            display: flex;
            align-items: center;
            height: 30px;
            }
        }
        .contain{
             width: 70%;
            ::v-deep .el-form-item__label{
                width: auto;
            }
            ::v-deep .el-checkbox__label{
                font-size: 12px;
            }
            ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label{
                color:#4D4F5C;
            }
        }
    }
</style>