<template>
    <iPage>
        <div class="flex">
            <span>{{$t(list.name)}}</span>
            <div>
                <!-- 刷新 -->
                <iButton>{{$t("LK_SHUAXIN")}}</iButton>
                <!-- 导出 -->
                <iButton @click="upload">{{$t("BIDDING_DAOCHU")}}</iButton>
                <!-- 返回 -->
                <iButton @click="goBack">{{$t("LK_FANHUI")}}</iButton>
            </div>
        </div>
        <iCard class="marginTop20">
            <el-form>
                <el-form-item :label="$t('partsprocure.PARTSPROCUREMODELPROJECT')">
                    <iSelect v-model="cartypeProId" @change="getChange">
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
import { iPage,iCard,iButton,iSelect,iPagination,iMessage } from "rise";
import tableList from "@/components/commonTable";
import echarts from "@/utils/echarts";
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from "./data";
import { echartsSupplerEM } from "../data";

import {
    getSupplierEmOntimeInfo,
    getSupplierOtsOntimeInfo,
    getFGNomiOntimeInfo,
    getCommodityEmOntimeInfo,
    getCommodityOntimeInfo,

    getSupplierEmOntimePage,
    getSupplierOtsOntimePage,
    getFGNomiOntimePage,
    getCommodityEmOntimePage,
    getCommodityOntimePage,

    getDefaultCarTypePro,
    exprotProjectAnalysisc,
} from '@/api/project/projectprogressreport'

import { getCarTypePro } from '@/api/project'

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
            cartypeProId:"",
            selectOptions1:[],

            tableListData:[],
            tableTitle:tableTitle,
            loading:false,

            list:{},
        }
    },
    created(){
    },
    methods:{
        getEnquiry(){
            this.getData(this.list.type);
        },
        upload(){
            exprotProjectAnalysisc({
                cartypeProId:this.cartypeProId,
                reportIdList:[this.list.type]
            }).then(res=>{
                console.log(res)
            })
        },
        getChange(val){
            console.log(val);
            this.cartypeProId = val;
            this.getData(this.list.type);
        },
        getCarData(){
            getCarTypePro().then(res => {
                if (res?.result) {
                    this.selectOptions1 = res.data.map(item => {
                        return {
                            ...item,
                            value: item.id,
                            label: item.cartypeProName
                        }
                    })

                    this.getDefaultCarTypePro();
                } else {
                    iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
                }
            })
        },
        getDefaultCarTypePro(){
            getDefaultCarTypePro().then(res=>{
                console.log(res);
                if(res.result){
                    // this.cartypeProId = res.data;
                    this.cartypeProId = "50024008";
                    this.getData(this.list.type);
                }
            })
        },
        getData(val){
            if(val == 1){
                getSupplierEmOntimeInfo({
                    cartypeProId:this.cartypeProId,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(0,res?.data,["EM准时完成率","EM总数"]);
                    }
                })
                
                getSupplierEmOntimePage({
                    cartypeProId:this.cartypeProId,
                    current:this.page.currPage,
                    size:this.page.pageSize,
                }).then(res=>{
                    console.log(res);
                    if(res.result){
                        const { pageNum, pageSize, total } = res;
                        this.page.currPage = pageNum;
                        this.page.pageSize = pageSize;
                        this.page.totalCount = total;

                        this.tableListData = res.data;
                    }
                })
            }else if(val == 2){
                getSupplierOtsOntimeInfo({
                    cartypeProId:this.cartypeProId,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(0,res?.data,["OTS准时完成率","OTS总数"]);
                    }
                })
                
                getSupplierOtsOntimePage({
                    cartypeProId:this.cartypeProId,
                    current:this.page.currPage,
                    size:this.page.pageSize,
                }).then(res=>{
                    console.log(res);
                    if(res.result){
                        const { pageNum, pageSize, total } = res;
                        this.page.currPage = pageNum;
                        this.page.pageSize = pageSize;
                        this.page.totalCount = total;

                        this.tableListData = res.data;
                    }
                })
            }else if(val == 3){
                getFGNomiOntimeInfo({
                    cartypeProId:this.cartypeProId,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(0,res?.data,["定点准时完成率","定点总数"]);
                    }
                })
                
                getFGNomiOntimePage({
                    cartypeProId:this.cartypeProId,
                    current:this.page.currPage,
                    size:this.page.pageSize,
                }).then(res=>{
                    console.log(res);
                    if(res.result){
                        const { pageNum, pageSize, total } = res;
                        this.page.currPage = pageNum;
                        this.page.pageSize = pageSize;
                        this.page.totalCount = total;

                        this.tableListData = res.data;
                    }
                })
            }else if(val == 4){
                getCommodityEmOntimeInfo({
                    cartypeProId:this.cartypeProId,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(0,res?.data,["EM准时完成率","EM总数"]);
                    }
                })
                
                getCommodityEmOntimePage({
                    cartypeProId:this.cartypeProId,
                    current:this.page.currPage,
                    size:this.page.pageSize,
                }).then(res=>{
                    console.log(res);
                    if(res.result){
                        const { pageNum, pageSize, total } = res;
                        this.page.currPage = pageNum;
                        this.page.pageSize = pageSize;
                        this.page.totalCount = total;

                        this.tableListData = res.data;
                    }
                })
            }else if(val == 5){
                getCommodityOntimeInfo({
                    cartypeProId:this.cartypeProId,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(0,res?.data,["EM准时完成率","OTS准时完成率","定点总数"]);
                    }
                })
                
                getCommodityOntimePage({
                    cartypeProId:this.cartypeProId,
                    current:this.page.currPage,
                    size:this.page.pageSize,
                }).then(res=>{
                    console.log(res);
                    if(res.result){
                        const { pageNum, pageSize, total } = res;
                        this.page.currPage = pageNum;
                        this.page.pageSize = pageSize;
                        this.page.totalCount = total;

                        this.tableListData = res.data;
                    }
                })
            }
        },
        goBack(){
            this.$router.go(-1)
        },
        handleSelectionChange(e){

        },
        editTitle(){

        },
        echartsOption(num,data,type){
            let myChart = echarts().init(document.getElementById("echartsBox"));
            myChart.setOption(echartsSupplerEM(data,type));
        },
    },
    mounted(){
        this.list = this.$route.query;
        this.getCarData();

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