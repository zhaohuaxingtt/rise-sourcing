<template>
    <iPage>
        <div class="flex">
            <span>{{$t(list.name)}}</span>
            <div>
                <!-- 刷新 -->
                <!-- <iButton v-permission="PROJECTMGT_PROJECTPROGRESSREPORT_CEANALYSIS_INFOR_REFRESH">{{$t("LK_SHUAXIN")}}</iButton> -->
                <!-- 导出 -->
                <iButton @click="upload" v-permission="PROJECTMGT_PROJECTPROGRESSREPORT_CEANALYSIS_INFOR_DAOCHU">{{$t("BIDDING_DAOCHU")}}</iButton>
                <!-- 返回 -->
                <iButton @click="goBack">{{$t("LK_FANHUI")}}</iButton>
            </div>
        </div>
        <iCard class="marginTop20">
            <el-form :inline="true">
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

                <el-form-item :label="$t('车型项目SOP时间')" v-if="$route.query.type==6 || $route.query.type==7 || $route.query.type==8">
                    <iInput type="number" class="inputW" v-model="carProjectSopTime" @change="timeChange"></iInput>
                    <span style="padding-left:10px;">年</span>
                </el-form-item>
            </el-form>
            <div id="echartsBox" class="flexone"></div>
        </iCard>
        <iCard class="marginTop20" :title="$t('明细数据')">
            <template v-slot:header-control>
                <!-- <iButton @click="editTitle">{{$t("编辑表头")}}</iButton> -->
            </template>
            <tableList v-if="$route.query.type == 1"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle1" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="percentage">
                    <span>{{setPercentage(scope.row.percentage)}}</span>
                </template>
            </tableList>
            <tableList v-else-if="$route.query.type == 2"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle2" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="percentage">
                    <span>{{setPercentage(scope.row.percentage)}}</span>
                </template>
            </tableList>
            <tableList v-else-if="$route.query.type == 3"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle3" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="percentage">
                    <span>{{setPercentage(scope.row.percentage)}}</span>
                </template>
            </tableList>
            <tableList v-else-if="$route.query.type == 4"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle4" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="percentage">
                    <span>{{setPercentage(scope.row.percentage)}}</span>
                </template>
            </tableList>
            <tableList v-else-if="$route.query.type == 5"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle5" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="otsPercentage">
                    <span>{{setPercentage(scope.row.otsPercentage)}}</span>
                </template>
            </tableList>
            <!-- 车型项目Em准时完成情况报告 -->
            <tableList v-else-if="$route.query.type == 6"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle6" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="percentage">
                    <span>{{setPercentage(scope.row.percentage)}}</span>
                </template>
            </tableList>
            <!-- 车型项目定点准时完成情况报告 -->
            <tableList v-else-if="$route.query.type == 7"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle7" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="percentage">
                    <span>{{setPercentage(scope.row.percentage)}}</span>
                </template>
            </tableList>
            <!-- 车型项目ots准时完成情况报告 -->
            <tableList v-else-if="$route.query.type == 8"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle8" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="percentage">
                    <span>{{setPercentage(scope.row.percentage)}}</span>
                </template>
            </tableList>
            <!-- FG组BF完成情况报告 -->
            <tableList v-else-if="$route.query.type == 9"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle9" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="percentage">
                    <span>{{setPercentage(scope.row.percentage)}}</span>
                </template>
            </tableList>
            <!-- 供应商1stTryout完成情况报告 -->
            <tableList v-else-if="$route.query.type == 10"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle10" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="percentage">
                    <span>{{setPercentage(scope.row.percentage)}}</span>
                </template>
            </tableList>
            <!-- 不同Commodity定点完成情况报告 -->
            <tableList v-else-if="$route.query.type == 11"
                :tableData="tableListData" 
                ref="contractForm"
                :tableTitle="tableTitle11" 
                :tableLoading="loading" 
                :index="true"
                :selectable="false"
                :selection="false"
                border
                @handleSelectionChange="handleSelectionChange"
                >
                <template slot-scope="scope" slot="nomPercentage">
                    <span>{{setPercentage(scope.row.nomPercentage)}}</span>
                </template>
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
import { iPage,iCard,iButton,iSelect,iPagination,iMessage,iInput } from "rise";
import tableList from "@/components/commonTable";
import echarts from "@/utils/echarts";
import { pageMixins } from '@/utils/pageMixins'
import { 
    tableTitle1,
    tableTitle2,
    tableTitle3,
    tableTitle4,
    tableTitle5,
    tableTitle6,
    tableTitle7,
    tableTitle8,
    tableTitle9,
    tableTitle10,
    tableTitle11,
} from "./data";
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

    getCarProjectEmOntimeDTOInfo,
    getCarProjectEmOntimeDTOPage,
    getCarProjectNomOntimeDTOInfo,
    getCarProjectNomOntimeDTOPage,
    getCarProjectOTSOntimeDTOInfo,
    getCarProjectOTSOntimeDTOPage,

    getFGBFNomiOntimeInfo,
    getFGBFNomiOntimePage,
    getSupplierTryOutOntimeInfo,
    getSupplierTryOutOntimePage,
    getCommodityNomOntimeInfo,
    getCommodityNomOntimePage,
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
        iPagination,
        iInput
    },
    data(){
        return{
            cartypeProId:"",
            selectOptions1:[],
            carProjectSopTime:"3",
            tableListData:[],
            tableTitle1,
            tableTitle2,
            tableTitle3,
            tableTitle4,
            tableTitle5,
            tableTitle6,
            tableTitle7,
            tableTitle8,
            tableTitle9,
            tableTitle10,
            tableTitle11,
            loading:false,

            list:{},
            cartypeProName:"",
        }
    },
    created(){
    },
    methods:{
        setPercentage(val){
            return val ? (val*100).toFixed(0) + "%" : val;
        },
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
            this.cartypeProName = this.selectOptions1.find(item => item.id == val).label;
            // this.cartypeProName = this.selectOptions1.find(item => item.id == val).cartypeProjectCode
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
            }).catch(res=>{
                iMessage.error("车型项目数据获取失败")
            })
        },
        getDefaultCarTypePro(){
            getDefaultCarTypePro().then(res=>{
                console.log(res);
                if(res.result){
                    this.cartypeProId = res.data;
                    this.cartypeProName = this.selectOptions1.find(item => item.id == res.data).label;
                    // this.cartypeProName = this.selectOptions1.find(item => item.id == res.data).cartypeProjectCode
                    // this.cartypeProId = "50024008";
                    this.getData(this.list.type);
                }
            })
        },
        timeChange(val){
            console.log(val);
            this.carProjectSopTime = val;
            this.getData(this.list.type);
        },
        getData(val){
            if(val == 1){
                getSupplierEmOntimeInfo({
                    cartypeProId:this.cartypeProId,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(0,res?.data,[this.$t("EM准时完成率"),this.$t("EM总数")],this.cartypeProName);
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
                        this.echartsOption(1,res?.data,[this.$t("OTS准时完成率"),this.$t("OTS总数")],this.cartypeProName);
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
                        this.echartsOption(2,res?.data,[this.$t("定点准时完成率"),this.$t("定点总数")],this.cartypeProName);
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
                        this.echartsOption(3,res?.data,[this.$t("EM准时完成率"),this.$t("EM总数")],this.cartypeProName);
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
                        this.echartsOption(4,res?.data,[
                            this.$t("OTS准时完成率"),
                            this.$t("OTS完成数")
                        ],this.cartypeProName);
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
            }else if(val == 6){//车型项目Em准时完成情况报告
                getCarProjectEmOntimeDTOInfo({
                    cartypeProId:this.cartypeProId,
                    year:this.carProjectSopTime,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(5,res?.data,[
                            this.$t("EM准时完成率"),
                            this.$t("EM总数")
                        ],this.cartypeProName);
                    }
                })
                
                getCarProjectEmOntimeDTOPage({
                    cartypeProId:this.cartypeProId,
                    year:this.carProjectSopTime,
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
            }else if(val == 7){//车型项目定点准时完成情况报告
                getCarProjectNomOntimeDTOInfo({
                    cartypeProId:this.cartypeProId,
                    year:this.carProjectSopTime,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(6,res?.data,[
                            this.$t("定点准时完成率"),
                            this.$t("OTS总数")
                        ],this.cartypeProName);
                    }
                })
                
                getCarProjectNomOntimeDTOPage({
                    cartypeProId:this.cartypeProId,
                    year:this.carProjectSopTime,
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
            }else if(val == 8){//车型项目ots准时完成情况报告
                getCarProjectOTSOntimeDTOInfo({
                    cartypeProId:this.cartypeProId,
                    year:this.carProjectSopTime,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(7,res?.data,[
                            this.$t("OTS准时完成率"),
                            this.$t("OTS总数")
                        ],this.cartypeProName);
                    }
                })
                
                getCarProjectOTSOntimeDTOPage({
                    cartypeProId:this.cartypeProId,
                    year:this.carProjectSopTime,
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
            }else if(val == 9){//FG组BF完成情况报告
                getFGBFNomiOntimeInfo({
                    cartypeProId:this.cartypeProId,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(8,res?.data,[
                            this.$t("BF准时完成率"),
                            this.$t("BF总数")
                        ],this.cartypeProName);
                    }
                })
                
                getFGBFNomiOntimePage({
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
            }else if(val == 10){//供应商1stTryout完成情况报告
                getSupplierTryOutOntimeInfo({
                    cartypeProId:this.cartypeProId,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(9,res?.data,[
                            this.$t("1stTryout准时完成率"),
                            this.$t("1stTryout总数")
                        ],this.cartypeProName);
                    }
                })
                
                getSupplierTryOutOntimePage({
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
            }else if(val == 11){//不同Commodity定点完成情况报告
                getCommodityNomOntimeInfo({
                    cartypeProId:this.cartypeProId,
                }).then(res=>{
                    if(res.result){
                        this.echartsOption(10,res?.data,[
                            this.$t("定点准时完成率"),
                            this.$t("定点总数")
                        ],this.cartypeProName);
                    }
                })
                
                getCommodityNomOntimePage({
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
        echartsOption(num,data,type,carModelName){
            let myChart = echarts().init(document.getElementById("echartsBox"));
            myChart.setOption(echartsSupplerEM(data,type,carModelName,num));
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

.inputW{
    width: 60px;
}
</style>