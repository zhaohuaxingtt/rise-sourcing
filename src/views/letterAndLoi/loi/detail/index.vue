<!--
 * @Author: wentliao
 * @Date: 2021-06-21 15:33:20
 * @Description: LOI详情页
-->
<template>
    <iPage class="loiDetail">
        <div class="header clearFloat">
        <div class="title">{{$t('LK_LOIBIANHAO')}}: LOI21-10341</div>
        <div class="control">
            <span v-if="isEdit">
                <iButton>{{$t('LK_BAOCUN')}}</iButton>
                <iButton @click="changeEditStatus">{{$t('LK_QUXIAO')}}</iButton>
            </span>
            <span v-else>
                <iButton @click="edit">{{$t('LK_BIANJI')}}</iButton>
                <iButton>{{$t('LK_LINEQUEREN')}}</iButton>
                <iButton>{{$t('LK_LINETUIHUI')}}</iButton>
                <iButton v-if="radioType=='NonStandard'">{{$t('LK_WANCHENGLOI')}}</iButton>
                <iButton>{{$t('LK_DAOCHUBIAOZHUNLOI')}}</iButton>
                <iButton @click="changeShowHistory">{{$t('LK_LISHILOI')}} </iButton>
            </span>
            <logButton class="margin-left20" />
        </div>
        </div>
        <iCard class="margin-top30">
           <el-radio-group v-model="radioType" :disabled="!isEdit">
                <el-radio :label="'standard'">{{$t('LK_BIAOZHUNLOI')}}</el-radio>
                <el-radio :label="'NonStandard'">{{$t('LK_FEIBIAOZHUNLOI')}}</el-radio>
            </el-radio-group>
            <div class="sendTypeBox margin-top20" v-if="radioType=='standard'">
              <el-radio-group v-model="sendType" :disabled="!isEdit">
                <el-radio :label="'kye1'">{{$t('LK_PILIANGLOI')}}</el-radio>
                <el-radio :label="'key2'">{{$t('LK_KAIFALOI')}}</el-radio>
                <el-radio :label="'key3'">{{$t('LK_KAIFAPILIANGLOI')}}</el-radio>
              </el-radio-group>
            </div>
            <div class="contain margin-top30">
                <iFormGroup row="2">
                    <div class="col">
                        <iFormItem :label="$t('LK_GONGYINGSHANGLIANXIR')+':'">
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
        <loiNonStandard class="margin-top20" v-if="radioType=='NonStandard'" :isEdit="isEdit"/>

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
import logButton from "@/views/partsign/editordetail/components/logButton"
import historyDialog from './components/historyDialog'
import loiNonStandard from './components/loiNonStandard'
export default {
    name:'loiDetail',
    components:{
        iPage,
        logButton,
        iButton,
        iCard,
        historyDialog,
        loiNonStandard,
        iFormGroup,
        iFormItem,
        iText,
        iSelect,
    },
    data(){
        return{
            radioType:'standard',
            sendType:'kye1',
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
    .loiDetail{
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
        .sendTypeBox{
          padding: 20px 10px;
          margin-left: -10px;
          background-color: #F8F9FA;
          border: 1px dashed rgba($color: #1B1D21, $alpha: .08);
        }
        .contain{
             width: 70%;
            ::v-deep .el-form-item__label{
                width: auto;
            }
            ::v-deep .el-checkbox__label{
                font-size: 12px;
            }
        }
    }
</style>