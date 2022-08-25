<template>
    <iPage>
        <div class="flex">
            <span>{{$t("供应商EM准时完成情况报告")}}</span>
            <div>
                <!-- 刷新 -->
                <iButton>{{$t("LK_SHUAXIN")}}</iButton>
                <!-- 保存 -->
                <iButton>{{$t("BIDDING_DAOCHU")}}</iButton>
                <!-- 返回 -->
                <iButton @click="goBack">{{$t("LK_FANHUI")}}</iButton>
            </div>
        </div>
        <iCard class="marginTop20">
            <el-form>
                <el-form-item :label="$t('partsprocure.PARTSPROCUREMODELPROJECT')">
                    <iSelect v-model="searchParams.search1">
                        <el-option
                        v-for="(item,index) in selectOptions1 || []"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </iSelect>
                </el-form-item>
            </el-form>
            <div id="echartsBox" class="flexone"></div>
        </iCard>
        <iCard class="marginTop20" :title="$t('明细数据')">
            <template v-slot:header-control>
                <iButton @click="editTitle">{{$t("编辑表头")}}</iButton><!-- 编辑表头 -->
            </template>
            <tableList 
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >

            </tableList>
            <iPagination v-update
                class="pagination"
                @size-change="handleSizeChange($event, getEnquiry)"
                @current-change="handleCurrentChange($event, getEnquiry)"
                background
                :current-page="page.currPage"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :total="page.totalCount" />
        </iCard>
    </iPage>
</template>

<script>
import { iPage,iCard,iButton,iSelect,iPagination } from "rise";
import tableList from "@/components/commonTable";
import echarts from "@/utils/echarts";
import { pageMixins } from '@/utils/pageMixins'
import { echartsSupplerEM,tableTitle } from "./data";

export default {
    mixins: [ pageMixins ],
    components:{
        iPage,
        iCard,
        iButton,
        iSelect,
        tableList,
        iPagination
    },
    data(){
        return{
            searchParams:{
                search1:""
            },
            selectOptions1:[],

            tableListData:[],
            tableTitle:tableTitle,
            loading:false,
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        handleSelectionChange(e){

        },
        editTitle(){

        },
        setMapEcharts(){
            let myChart = echarts().init(document.getElementById("echartsBox"));
            myChart.setOption(echartsSupplerEM());
        },
    },
    mounted(){
        this.setMapEcharts();
    },
}
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;

    span{
        font-size:1.25rem;
        font-weight: bold;
    }
}
.marginTop20{
    margin-top:20px;
    width: 100%;

    ::v-deep .cardBody{
        display: flex;
        flex-direction: column;
    }
}

::v-deep .el-select{
    width: auto!important;
}

.flexone{
    width: 100%;
    height:400px;
}
.flexone{
}

</style>