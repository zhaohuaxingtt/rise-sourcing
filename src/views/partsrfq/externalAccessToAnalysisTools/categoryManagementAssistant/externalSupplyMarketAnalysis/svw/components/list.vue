<template>
    <div class="charts">
        <div class="width3-1">
            <h3>Top1</h3>
            <div class="flex">
                <div class="score">Supplier A <span>7.77%</span><img :src="upImg" alt=""></div>
                <div>单位: 百万元</div>
            </div>
            <div style="height:360px" ref="chart"></div>
        </div>
        <div class="width3-1">
            <div style="height:360px" ref="turnover"></div>
        </div>
        <div class="width3-1">
            <div class="thead bg">
                <div>公司名称</div>
                <div>份额</div>
            </div>
            <div class="thead">
                <div class="border first">
                    <div class="index">
                        1
                    </div>
                    <div class="name">公司名称</div>
                </div>
                <div class="border">份额</div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
    data(){
        return {
            upImg:require('../img/up.png'),
            option : {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['svw','其他']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['2018', '2019', '2020'],
                        splitLine:{
                            show:false,
                        },
                        axisTick: {
                            show:false
                        },
                    }
                ],
                yAxis: {
                    splitLine:{
                        show:true,
                    },
                    axisTick: {
                            show:false
                        },
                    axisLine: {
                        show: false,//不显示坐标轴线
                    }
                },
                series: [
                    {
                        name: 'svw',
                        label:{
                            normal:{
                                show: true,
                                formatter:'{c}%'
                            }
                        },
                        itemStyle:{
                            color:"#0059FF"
                        },
                        stack: "check",
                        type: 'bar',
                        data: [{
                            value:20,
                            itemStyle:{
                                borderRadius: [25,25,0,0]
                            }
                        },{
                            value:50,
                            itemStyle:{
                                borderRadius: [25,25,0,0]
                            }
                        },{
                            value:60,
                            itemStyle:{
                                borderRadius: [25,25,0,0]
                            }
                        }]
                    },
                    {
                        name: '其它',
                        itemStyle:{
                            color:"#B4CBF7"
                        },
                        label:{
                            normal:{
                                show: true,
                                formatter:'{c}%'
                            }
                        },
                        stack: "check",
                        type: 'bar',
                        data: [{
                            value:20,
                            itemStyle:{
                                borderRadius: [25,25,0,0]
                            }
                        },{
                            value:50,
                            itemStyle:{
                                borderRadius: [25,25,0,0]
                            }
                        },{
                            value:47,
                            itemStyle:{
                                borderRadius: [25,25,0,0]
                            }
                        }]
                    }
                ]
            },
            turnover:{
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    bottom: 'bottom',
                },
                series: [
                    {
                        // name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        label:{
                            normal:{
                                show: true,
                                formatter:'{d}%'
                            }
                        },
                        data: [
                            {
                                value: 1048,
                                name: '材料组A',
                                itemStyle:{
                                    color:"#0058FF"
                                }
                            },
                            {
                                value: 735, 
                                name: '材料组B',
                                itemStyle:{
                                    color:"#6EA0FF"
                                }
                            },
                            {
                                value: 580, 
                                name: '材料组C',
                                itemStyle:{
                                    color:"#97D1FF"
                                }
                            },
                            {
                                value: 484, 
                                name: '材料组D',
                                itemStyle:{
                                    color:"#0094FF"
                                }
                            },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }
    },
    mounted(){
        this.initCharts()
        this.initturnover()
    },
    methods:{
        initCharts() {
            const myChart = echarts().init(this.$refs.chart);
            // 绘制图表
            const option = this.option
            myChart.setOption(option);
        },
        initturnover() {
            const myChart = echarts().init(this.$refs.turnover);
            // 绘制图表
            const option = this.turnover
            myChart.setOption(option);
        }
    }
}
</script>

<style lang="scss" scoped>
    .flex{
        display: flex;
        justify-content: space-between;
    }
    .charts{
        width: 100%;
        display: flex;
        justify-content: space-between;
        border:1px solid #ACB8CF;
        border-radius: 10px;
        padding: 20px 30px;
        .width3-1{
            width: calc(33.33% - 94px);
            .bg{
                div{
                    background-color: rgba(22,96,241,0.1);
                    font-size: 16px;
                    color: #000;
                    border-radius: 5px 5px 0px 0px;
                }
                div:first-child{
                    padding-left: 58px;
                }
            }
            .thead{
                 display: flex;
                 justify-content: space-between;
                 margin-bottom: 12px;
                div{
                    height: 40px;
                   line-height: 40px;
                }
                div:first-child{
                    width: calc(73% - 10px);
                    
                }
                div:last-child{
                    width: 27%;
                    text-align: center;
                }
                .border{
                    border: 1px solid #F1F1F5;
                    border-radius: 5px;
                }
                .first{
                    display: flex;
                    justify-content: flex-start;
                }
                .name{
                    width: calc(100% - 50px);
                    padding-left: 10px;
                }
                .index{
                    width: 50px;
                    text-align: center;
                    border-right: 1px solid #F1F1F5;
                }
            }
        }
    }
    h3{
        margin-bottom: 15px;
    }
    .score{
        span{
            color: #1660F1;
            font-size: 14px;
            margin-left: 15px;
            display: inline-block;
        }
        img{
                display: inline-block;
                margin-left: 10px;
            }
    }
</style>