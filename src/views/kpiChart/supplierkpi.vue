<template>
    <div class="spi-page">
        <iPage>
            <div class="navBox clearfix">
            <el-tabs v-model="activeName" @tab-click="handleleftClick" class="leftNav">
                <el-tab-pane 
                v-for="x in tabRouterList"
                :label="x.name" 
                :name="x.url"
                :key="x.value"
                ></el-tab-pane>
            </el-tabs>
            <div>
            <el-tabs v-model="activeRightName" @tab-click="handlerightClick" class="rightNav">
                <el-tab-pane 
                v-for="x in categoryManagementAssistantList"
                :label="x.name" 
                :name="x.url"
                :key="x.value"
                ></el-tab-pane>
            </el-tabs>
            <logButton class="logButton"/>
            </div>
        </div>
            <div class="head">
                <div class="head-left">
                    <div>
                        <supplierkpiSearchFrom
                        @chartData="watchData"
                        ></supplierkpiSearchFrom>
                    </div>
                    <div></div>
                </div>
                <div class="head-right">
                    <div class="head-right-tittle">
                        <div class="fontbold">供应商筛选结果</div>
                        <iButton @click="getScore">{{$t('LK_QUEREN')}}</iButton>
                    </div>
                    <supplierTable 
                    :tabledata="tabledata" 
                    @returnScoreID="returnData"
                    @returnSupplierName="getSupplierName"></supplierTable>
                </div>
            </div>
            <div class="foot">
                <div class="kpichart"><div class="tittle">总分</div><kpiEchart :options="totalScore"></kpiEchart></div>
                <div class="kpichart"><div class="tittle">服务质量</div><kpiEchart :options="quality"></kpiEchart></div>
                <div class="kpichart"><div class="tittle">成本竞争力</div><kpiEchart :options="cost"></kpiEchart></div>
                <div class="kpichart"><div class="tittle">交付</div><kpiEchart :options="delivery"></kpiEchart></div>
                <div class="kpichart"><div class="tittle">可持续发展</div><kpiEchart :options="sustainable"></kpiEchart></div>
            </div>
        </iPage>
    </div>
</template>

<script>
import kpiEchart from './components/kpiEchart'
import supplierTable from './components/supplierTable'
import {iButton,iPage,iCard} from 'rise'
import supplierkpiSearchFrom from './components/supplierkpiSearchFrom'
import {spiTotalScore} from '@/api/kpiChart'
import publicHeaderMenu from './commonHeardNav/headerNav'
import {iNavMvp } from 'rise'
import { tabRouterList, categoryManagementAssistantList } from './commonHeardNav/navData'
import logButton from '@/components/logButton'
export default {
    components:{
        publicHeaderMenu,
        kpiEchart,
        supplierTable,
        iButton,
        iPage,
        iCard,
        supplierkpiSearchFrom,
        categoryManagementAssistantList,
        tabRouterList,
        iNavMvp,
        logButton
    },
    data(){
        return {
        activeName:'/supplier/kpiIndex',
        activeRightName:'/supplier/kpiIndex',
        tabRouterList:tabRouterList,
        categoryManagementAssistantList:categoryManagementAssistantList,
            value:"供应商数量",
            tabledata:[{
                supplierName:'aaa'
            }],
            response:{"result":true,"code":"200","desEn":"success","desZh":"操作成功","data":{"supplierList":[{"supplierId":11002,"nameZh":"南通冠东模塑股份有限公司","levelOneCode":"PP01000","score":"21.5000"},{"supplierId":11025,"nameZh":"上海联晟汽车配套服务有限公司","levelOneCode":"PP02000","score":"44.2000"},{"supplierId":159916,"nameZh":"（无效）宁波艾思科汽车音响通讯有限公司（无效）","levelOneCode":"PP02000","score":"42.9000"},{"supplierId":159930,"nameZh":"123","levelOneCode":"PP04000","score":"44.4000"}],"totalMap":{"between9":1,"between8":0,"between7":0,"between6":0,"between5":1,"between4":1,"between3":1,"between10":0,"between2":0,"between1":0},"oneMaps":{"PP02000":{"categoryName":"成本","oneMap":{"between9":0,"between8":0,"between7":0,"between6":0,"between5":2,"between4":0,"between3":1,"between10":0,"between2":0,"between1":0}},"PP01000":{"categoryName":"服务质量","oneMap":{"between9":0,"between8":0,"between7":0,"between6":0,"between5":0,"between4":0,"between3":1,"between10":0,"between2":0,"between1":0}},"PP04000":{"categoryName":"可持续发展","oneMap":{"between9":0,"between8":0,"between7":0,"between6":0,"between5":1,"between4":0,"between3":0,"between10":0,"between2":0,"between1":0}},"PP03000":{"categoryName":"交付","oneMap":{"between9":0,"between8":0,"between7":0,"between6":0,"between5":0,"between4":0,"between3":1,"between10":0,"between2":0,"between1":0}}}}},
            dataTotal:{},
            option : {
                color: ['#1763F7'],
                tooltip: {
                    trigger: 'item',
                    backgroundColor:'#fff',
                    lineStyle:{
                        color:'#000'
                    },
                    textStyle: {
                        color:'#000'
                    },
                    // formatter:function(params){
                    //     const str = `<div style="padding:10px">
                    //         <div>该分数断下供应商数量:<span style="color:#1763F7">${params.value}家</span></div>
                    //         <div>${params.seriesName}:${params.name}分</div>
                    //     </div>`
                    //     return str
                    // },
                    axisPointer:{//直线指示器
                        type:'none'
                    },
                    extraCssText: 'box-shadow: 0px 3px 10px rgba(27, 29, 33, 0.16);'
                },
                legend: {
                    data:[{
                        name:'',
                        icon:'circle',
                        textStyle: {
                            color: '#1763F7'
                        }
                    }],
                },
                grid: {
                    top: 50,
                    bottom: 20,
                    left:0,
                    right:0,
                    tooltip:{
                        axisPointer:{
                            shadowStyle:{
                                color:'red'
                            } 
                        }
                    }
                },
                xAxis: {
                        type: 'category',
                        splitLine:{
                            show:false//不显示网格线
                        },
                        axisTick: {
                            show:false
                        },
                        splitNumber:10,
                        axisLabel:{
                            interval:1
                        }, 
                        data: ['5', '15', '25', '35', '45', '55', '65', '75', '85', '95']
                   
                },
                yAxis: {
                    show:false,
                    type:'value',
                    name:'该分数段下供应商数量：',
                    min: 0,
                    max: 10,
                },
                series: [
                    {
                        name: '上海汇众汽车有限公司',
                        //symbol: "none",//显示隐藏曲线上的点
                        symbolSize:10,
                        type: 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [],
                        markLine: {
                            lineStyle: {
                                type:'solid',
                                width: 1,
                                color: '#707070',
                            },
                            silent: true, // 鼠标悬停事件, true悬停不会出现实线
                            symbol: 'none', // 去掉箭头
                            data: [[
                                { coord: ['45', 0] }, // [x第几个（从0开始），y轴起始点 ]
                                { coord: ['45', 10] } // [x第几个（从0开始），y轴起始点 ]
                            ]]
                        },
                        markPoint:{
                             symbol:"circle"
                        }
                    }
                ]
            },
            totalScore:{},
            quality:{},
            cost:{},
            sustainable:{},
            delivery:{},
            idList:[],
            supplierObj:[]
        }
    },
    created(){
        this.totalScore=JSON.parse(JSON.stringify(this.option)),
        this.quality=JSON.parse(JSON.stringify(this.option)),
        this.cost=JSON.parse(JSON.stringify(this.option)),
        this.delivery=JSON.parse(JSON.stringify(this.option))    
        this.sustainable=JSON.parse(JSON.stringify(this.option))         

    },
    methods:{
        handleleftClick(tab,event){
            this.$router.push(tab.name)
        },
        handlerightClick(tab){
            this.activeName='/supplier/kpiIndex'
             this.$router.push(tab.name)
        },
        initOptions:{

        },
        watchData(x){
            this.tabledata= x.supplierList
            // 折线图点
            x.totalSupplierList.forEach(z=>{this.totalScore.series[0].data.push({value:z,symbol:'none'})})
            x.oneMaps.PP01000.oneSupplierList.forEach(z=>{this.quality.series[0].data.push({value:z,symbol:'none'})})
            x.oneMaps.PP02000.oneSupplierList.forEach(z=>{this.cost.series[0].data.push({value:z,symbol:'none'})})
            x.oneMaps.PP03000.oneSupplierList.forEach(z=>{this.delivery.series[0].data.push({value:z,symbol:'none'})})
            x.oneMaps.PP04000.oneSupplierList.forEach(z=>{this.sustainable.series[0].data.push({value:z,symbol:'none'})})
            
        },
        // 勾选供应商id
        returnData(x){
            this.idList=x
        },
        getScore(){
            // 根据供应商查询分数
             spiTotalScore({idList:this.idList}).then(res=>{
               this.changeTotalX(res.data)//总分
               this.changeOneListX(res.data)//其余曲线图
            })
            // 供应商名字
            this.supplierObj.forEach((y,index)=>{
                this.totalScore.legend.data[index].name=y.nameZh
                this.quality.legend.data[index].name=y.nameZh
                this.cost.legend.data[index].name=y.nameZh
                this.delivery.legend.data[index].name=y.nameZh
                this.sustainable.legend.data[index].name=y.nameZh
            })
        },
        getSupplierName(x){
            if(x.length>0){
                this.supplierObj=x
            }
        },
        // 总分
        changeTotalX(x){
            if(x.totalList.length>0){
                 x.totalList.forEach(score => {
                     if(score.totalScore>9){
                         this.totalScore.series[0].data[Math.floor((score.totalScore)/10)].symbol='emptyCircle'
                     }else{
                         this.totalScore.series[0].data[0].symbol='emptyCircle'
                     }
                     
                 });   
                 
            }
        },
        // 其余折线图
        changeOneListX(x){
            if(x.oneList.length>0){
                 x.oneList.forEach(score => {
                     if(score.levelOneCode=="PP01000" || score.levelOneCode=="PP01000"){
                         this.quality.series[0].data[Math.floor((score.score)/10)].symbol='emptyCircle'
                     }
                    if(score.levelOneCode=="PP02000" || score.levelOneCode=="PP02000"){
                        this.cost.series[0].data[Math.floor((score.score)/10)].symbol='emptyCircle'
                     }
                     if(score.levelOneCode=="PP03000" || score.levelOneCode=="PP03000"){
                         this.delivery.series[0].data[Math.floor((score.score)/10)].symbol='emptyCircle'
                     }
                     if(score.levelOneCode=="PP04000" || score.levelOneCode=="PP04000"){
                         this.sustainable.series[0].data[Math.floor((score.score)/10)].symbol='emptyCircle'
                     }
                 });   
                 
            }
        },
      
    }
}
</script>

<style lang="scss" scoped>
    .spi-page{
        height: 100vh;
        width: 100%;
        overflow: auto;
    }
    .head{
        width: 100%;
        height: 414px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .head-left{
            width: calc(76% - 20px);
            height: 100%;
            background: #fff;
            border-radius: 10px;
            .tittle{
                font-size: 18px;
                color: #000;
                font-weight: bold;
            }
        }
        .head-right{
            width: 24%;
            height: 100%;
            padding: 30px 40px 0 40px;
            overflow-y: auto;
            background: #fff;
             border-radius: 10px;
            .head-right-tittle{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-bottom: 20px;
                .fontbold{
                    font-weight: bold;
                }
            }
        }
    }
    .foot{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        overflow-x: auto;
        .kpichart{
            width: 410px;
            margin-right: 30px;
            .tittle{
                font-weight: bold;
                width: 100%;
                font-size: 16px;
                padding-left: 20px;
            }
        }
    }
    ::v-deep.navBox {
  position: relative;
  // border-bottom: 1px solid #E3E3E3;
  margin-bottom: 20px;
  .logButton .icon + span{vertical-align: top;}
  div{font-size: 20px;}
  .el-tabs__nav-wrap::after{
    width: 0;
  }
  .el-tabs__item{
    line-height: 24px;
  }
  .el-tabs__item.is-active{
    font-weight: Bold;
  }
  .leftNav{
      float: left;
  }
  .rightNav {
    float: right;
    margin-right: 110px;
    .el-tabs__active-bar {
        background-color: transparent !important;
    }
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
.clearfix:after{
  content: "020"; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
  }

.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
  }
</style>