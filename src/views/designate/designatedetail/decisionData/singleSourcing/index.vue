<!--
 * @Author: wentliao
 * @Date: 2021-05-24 10:16:04
 * @Description: 决策资料-SingleSourcing
-->
<template>
    <iCard title="⽣产采购单⼀供应商说明 Single Sourcing for Production Purchasing">
        <div class="decision-data-singleSourcing-content">
            <div class="margin-top30 margin-bottom30">
                <iFormGroup inline>
                    <iFormItem label-width="130px"  label="项⽬名称 Project:">
                        <iText style="width:250px">xxxx</iText>
                    </iFormItem>
                        <iFormItem label-width="180px"  label="定点申请单号 Project No.:">
                        <iText style="width:250px">51017456</iText>
                    </iFormItem>
                </iFormGroup>
            </div>
            <!-- 表单部分 -->
            <div class="singleSourcing-table">
                <el-table
                :empty-text="$t('LK_ZANWUSHUJU')"
                :data="tableListData"
                v-loading="loading"
                header-align="center"
                >
                <el-table-column
                    :key="'tableListData-index'+index"
                    label="#"
                    align="center"
                    width="50"
                    >
                    {{index+0}}
                </el-table-column>
                <template v-for="(item,index) in tableTitle" >
                    <el-table-column
                        :key="'tableListData'+index"
                        :prop="item.key"
                        :label="item.name"
                        align="center"
                        >
                    </el-table-column>>
                    </template>
                    </el-table>
                <iPagination
                    class="margin-bottom20"
                    @size-change="handleSizeChange($event, purchaseFactory)"
                    @current-change="handleCurrentChange($event, purchaseFactory)"
                    background
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    :layout="page.layout"
                    :current-page="page.currPage"
                    :total="page.totalCount" v-update
                />
            </div>
        </div>
    </iCard>
</template>

<script>
import {
  iCard,
  iPagination,
  iFormGroup,
  iFormItem,
  iText,
} from "rise";
import {pageMixins} from '@/utils/pageMixins'
export default {
    mixins:[pageMixins],
     components:{
        iCard,
        iPagination,
        iFormGroup,
        iFormItem,
        iText,
    },
    name:'SingleSourcing',
    data(){
        return{
            loading: false,
            tableListData:[],
            tableTitle:[
                {name:'FS号\nFS No',key:'FSNo'},
                {name:'零件号\nPart No.',key:'PARTNO'},
                {name:'零件名称\nPart Name',key:'PartName'},
                {name:'供应商名称\nSupplier Name',key:'SupplierName'},
                {name:'供应商编码\nSupplier No.',key:'SupplierNo.'},
                {name:'原因\nReason',key:'Reason'},
                {name:'原因部⻔\nCaused by',key:'Causedby'},
            ]
        }
    },
    computed:{
        isPreview(){
            return this.$store.getters.isPreview;
        }
    },

}
</script>

<style lang="scss" scoped>
.decision-data-singleSourcing-content{
    .singleSourcing-table{
        ::v-deep .el-table .cell{
            white-space:pre-line;
        }
    }
}

</style>