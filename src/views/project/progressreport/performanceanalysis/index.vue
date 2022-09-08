<!--
 * @Author: Luoshuang
 * @Date: 2021-10-11 15:06:02
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-11 15:06:03
 * @Description: 项目管理-项目进度报告-项目管理绩效分析
 * @FilePath: \front-web\src\views\project\progressreport\performanceanalysis\index.vue
-->
<template>
    <div>
        <div class="model_analysis">
            <!-- <iButton @click="myReport">{{$t("我的报告")}}</iButton> -->
            <div class="model_font flexend">
                <div @click="checkedBtn" class="model_font marginRright20">
                    <img class="model_img"
                            :src="checked?require('@/assets/images/checked.png'):require('@/assets/images/unchecked.png')"
                            :fit="fit" />
                    <span :class="checked?'checked':'unchecked'">{{$t('全选')}}</span>
                </div>
                <iButton @click="upload">{{$t("导出")}}</iButton>
            </div>
        </div>

        <div class="model_wrap_box">
            <div class="model_supplierEm" v-for="(item,index) in picImg" :key="index">
                <div class="model_title" @click="jump(item)">
                    <div class="model_top">
                        <span>{{item.name}}</span>
                        <div @click.stop="choiceClick(index)" :class="item.select?'clip_box':'clip_box_no'">
                            <img class="clip_img"
                                :src="require('@/assets/images/bingo_yes.png')"
                                :fit="fit" />
                        </div>
                    </div>
                    <div :id="'echarts_'+index" class="echarts"></div>
                </div>
            </div>
            <!-- <div class="model_supplierEm">
                <div>

                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { iButton,iMessage } from "rise";
import { echartsSupplerEM } from "./data";
import echarts from "@/utils/echarts";
import {
    getSupplierEmOntimeInfo,
    getSupplierOtsOntimeInfo,
    getFGNomiOntimeInfo,
    getCommodityEmOntimeInfo,
    getCommodityOntimeInfo,

    getDefaultCarTypePro,

    exprotProjectAnalysisc,
} from '@/api/project/projectprogressreport'

export default {
    components:{
        iButton,
    },
    data(){
        return{
            checked: false,
            picImg:[],
            cartypeProId:'',
        }
    },
    created(){
        this.picImg = [
            {
                select:false,
                name:this.$t("供应商EM准时完成情况报告"),
                id:1,
            },{
                select:false,
                name:this.$t("供应商OTS准时完成情况报告"),
                id:2,
            },{
                select:false,
                name:this.$t("FG组定点准时完成情况报告"),
                id:3,
            },{
                select:false,
                name:this.$t("不同Commodity EM完成情况报告"),
                id:4,
            },{
                select:false,
                name:this.$t("不同Commodity项目完成情况报告"),
                id:5,
            }
        ];
        
    },
    methods:{
        getDefaultCarTypePro(){
            getDefaultCarTypePro().then(res=>{
                console.log(res);
                if(res.result){
                    this.cartypeProId = res.data;
                    // this.cartypeProId = "50024008";

                    this.getSupplierEmOntimeInfo();
                    this.getSupplierOtsOntimeInfo();
                    this.getFGNomiOntimeInfo();
                    this.getCommodityEmOntimeInfo();
                    this.getCommodityOntimeInfo();
                }
            })
        },
        jump(val){
            this.$router.push({
                path:"/projectmgt/performanceanalysis/reportDetails",
                query:{
                    type:val.id,
                    name:val.name
                }
            })
        },
        checkedBtn(){
            this.checked = !this.checked;
            this.picImg.forEach((e,index)=>{
                e.select = this.checked
            })
        },
        choiceClick(index){
            this.picImg[index].select = !this.picImg[index].select
        },
        myReport(){
            
        },
        upload(){
            if(this.picImg.some(e=>e.select)){
                const datalist = [];
                this.picImg.forEach(e=>{
                    if(e.select){
                       datalist.push(e.id) 
                    }
                })
                exprotProjectAnalysisc({
                    cartypeProId:this.cartypeProId,
                    reportIdList:datalist
                }).then(res=>{
                    console.log(res)
                })
            }else{
                iMessage.error("请勾选需导出的报表");
            }
        },
        getSupplierEmOntimeInfo(){//1
            getSupplierEmOntimeInfo({
                cartypeProId:this.cartypeProId,
            }).then(res=>{
                // console.log(res);
                if(res.result){
                    this.echartsOption(0,res?.data,["EM准时完成率","EM总数"]);
                }
            })
        },
        getSupplierOtsOntimeInfo(){//2
            getSupplierOtsOntimeInfo({
                cartypeProId:this.cartypeProId,
            }).then(res=>{
                // console.log(res);
                if(res.result){
                    this.echartsOption(1,res?.data,["OTS准时完成率","OTS总数"]);
                }
            })
        },
        getFGNomiOntimeInfo(){//3
            getFGNomiOntimeInfo({
                cartypeProId:this.cartypeProId,
            }).then(res=>{
                // console.log(res);
                if(res.result){
                    this.echartsOption(2,res?.data,["定点准时完成率","定点总数"]);
                }
            })
        },
        getCommodityEmOntimeInfo(){//4
            getCommodityEmOntimeInfo({
                cartypeProId:this.cartypeProId,
            }).then(res=>{
                // console.log(res);
                if(res.result){
                    this.echartsOption(3,res?.data,["EM准时完成率","EM总数"]);
                }
            })
        },
        getCommodityOntimeInfo(){//5
            getCommodityOntimeInfo({
                cartypeProId:this.cartypeProId,
            }).then(res=>{
                // console.log(res);
                if(res.result){
                    this.echartsOption(4,res?.data,["EM准时完成率","OTS准时完成率","定点总数"]);
                }
            })
        },
        echartsOption(num,data,type){
            // this.picImg.forEach((e,index)=>{
                let nameId = "echarts_"+num;
                let myChart = echarts().init(document.getElementById(nameId));
                myChart.setOption(echartsSupplerEM(data,type));
            // })
        },
    },
    mounted(){
        this.getDefaultCarTypePro();
        // this.echartsOption();
    },
}
</script>

<style lang="scss" scoped>
.model_analysis{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.model_checkbox{
    margin-right:20px;
}
.model_wrap_box{
    margin-top:20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.model_supplierEm{
    margin-bottom: 20px;
    width: 49%;
    height: 450px;
    background:#fff;
    box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
    border-radius: 0.375rem;
    position: relative;
    overflow: hidden;
}
.model_title{
    padding:1.6rem 2.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
.model_img{
    width: 20px;
    height:20px;
    margin-right:10px;
}
.model_top{
    span{
        font-size: 22px;
        font-weight: bold;
    }
}
.model_font{
    display: flex;
    align-items: center;
}
.marginRright20{
    margin-right:20px;
    cursor: pointer;
}
.checked{
    font-size:15px;
    color:#1763f7;
    font-weight: bold;
}
.unchecked{
    font-size:15px;
    color:#1763f7;
    font-weight: bold;
}

.clip_box{
    background:#1763f7;
    clip-path:polygon(0 0, 100% 0, 100% 100%, 0 0);
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    cursor: pointer;
}
.clip_box_no{
    background:#CBCBCB;
    clip-path:polygon(0 0, 100% 0, 100% 100%, 0 0);
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    cursor: pointer;
}
.clip_img{
    margin-left: 26px;
    margin-top: 7px;
    width: 18px;
    height: 15px;
}
.echarts{
    flex:1;
}
.flexend{
    justify-content: flex-end;
    flex:1;
}
</style>