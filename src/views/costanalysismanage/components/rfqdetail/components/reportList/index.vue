<!--
 * @Author: wentliao
 * @Date: 2021-05-28 11:06:19
 * @Description: 报告清单列表
-->
<template>
    <iCard :title="$t('costanalysismanage.baogaoqingdan')">
        <template v-slot:header-control>
            <iButton>{{$t('LK_SHANGCHUAN')}}</iButton>
            <iButton>{{$t('LK_XIAZAI')}}</iButton>
            <iButton>{{$t('delete')}}</iButton>
        </template>
        <div class="body">
        <tableList
            class="table"
            index
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
        >
        </tableList>
        <iPagination 
            v-update
            class="margin-top30"
            @size-change="handleSizeChange($event, getList)"
            @current-change="handleCurrentChange($event, getList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount" />
        </div>
    </iCard>
  
</template>

<script>
import { iCard, iButton, iInput, iPagination } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { reportListTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"
export default {
    name:'reportList',
    mixins: [ pageMixins ],
    components: {
        iCard,
        iButton,
        iInput,
        iPagination,
        tableList
    },
    data() {
        return {
        loading: false,
        tableTitle,
        tableListData: []
        }
    }
}
</script>

<style lang="scss" scoped>

</style>