<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:48:55
 * @Description: 封面表态--预览--Aeko管理员/科室协调员/CSF分配人
-->
<template>
    <iCard :title="language('LK_AEKO_FENGMIANBIAOTAI','封⾯表态')" class="previewCover">
        <iFormGroup row="4" class="basic-form">
          <template v-for="(item,index) in basicTitle">
            <iFormItem :key="'basicInfo_'+index" :label="language(item.labelKey,item.label)+':'"  >
              <iText>{{basicInfo[item.props] || '-'}}</iText>
            </iFormItem>
          </template>
      </iFormGroup>
      <p class="margin-bottom10">{{language('LK_BEIZHU','备注')}}:</p>
      <iInput
        disabled
        type="textarea"
        rows="10" 
        resize="none"
        v-model="tips"
      />
      <!-- 费用合计table -->
      <div class="margin-top40">
        <iTableList
            :key="index"
            :selection="false"
            :show-summary="true"
            :tableData="tableTDataCost"
            :tableTitle="tableTitleCost"
            :tableLoading="tableLoading.cost"
            :activeItems="'x'"
            :typeIndex="true"
            :sum-text="language('LK_AEKO_TOTAL','TOTAL')"
        >

        </iTableList>
        <p>Top-Aeko / Top-MP：|ΔGesamt Materialkosten| ≥35 RMB oder Invest≥10,000,000 RMB; Top-AeA: ΔGesamt Materialkosten ≥35 RMB oder Invest≥10,000,000 RMB</p>
      </div>
    </iCard>
</template>

<script>
import {
    iCard,
    iFormGroup,
    iFormItem,
    iText,
    iInput,
} from 'rise'
import { previewBaicFrom,coverTableTitleCost } from '../../data'
import { iTableList } from '@/components'
import tableList from "@/views/partsign/editordetail/components/tableList"
import {_getMathNumber} from '@/utils'
export default {
    name:'previewCover',
    components:{
        iCard,
        iFormGroup,
        iFormItem,
        iText,
        iInput,
        tableList,
        iTableList,
    },
    data(){
        return{
            basicTitle:previewBaicFrom,
            basicInfo:{ },
            tips:'',
            tableLoading:{
                cost:false,
                depart:false,
            },
            tableTitleCost:coverTableTitleCost,
            tableTDataCost:[
                {'a':'New Passat','b':'-1.00','c':'1.00','d':'1.00'},
                {'a':'Tiguan L PHVE','b':'2.00','c':'2.00','d':'2.00'},
                {'a':'Tiguan L PHVE PA','b':'3.00','c':'2.00','d':'2.00'},
                {'a':'Tiguan L PA','b':'0.00','c':'2.00','d':'2.00'},
            ],
        }
    },
    methods:{

    }
}
</script>

<style  lang="scss" scoped>
    .previewCover{
        .basic-form{
            ::v-deep.el-form-item__content {
                margin-left: 0!important;
            }
        }
        ::v-deep.el-table .el-table__body-wrapper{
            min-height: auto;
        }
    }
</style>