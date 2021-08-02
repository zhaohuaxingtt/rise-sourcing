<template>
    <div class="box">
        <div style="height:360px" ref="chart"></div>
    </div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
    data(){
        return {
            value:"供应商数量",
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
                    formatter:function(params){
                        const str = `<div style="padding:10px">
                            <div>该分数断下供应商数量:<span style="color:#1763F7">${params.value}家</span></div>
                            <div>${params.seriesName}:${params.name}分</div>
                        </div>`
                        return str
                    },
                    axisPointer:{//直线指示器
                        type:'none'
                    },
                    extraCssText: 'box-shadow: 0px 3px 10px rgba(27, 29, 33, 0.16);'
                },
                legend: {
                    data:[{
                        name:'上海汇众汽车有限公司',
                        icon:'circle',
                        textStyle: {
                            color: '#1763F7'
                        }
                    },{
                        name:'大陆汽车电子有限公司',
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
                        // axisPointer: {
                        //     label: {
                        //         formatter: function (params) {
                        //             return '降水量  ' + params.value
                        //                 + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        //         }
                        //     }
                        // },
                        splitNumber:10,
                        axisLabel:{
                            interval:1
                        }, 
                        data: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
                   
                },
                yAxis: {
                    show:false,
                    type:'value',
                    name:'该分数段下供应商数量：',
                    min: 0,
                    max: 1000,
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
                        data: [{
                            value:100,
                            itemStyle:{
                                color:'red',
                            }
                        },{
                            value: 70,
                            itemStyle:{
                                color:'#000',
                            }
                        },{
                            value: 100,
                            itemStyle:{
                                color:'yellow',
                            }
                        }, {
                            value: 400,
                            itemStyle:{
                                color:'blue',
                            }
                        },{
                            value: 500,
                            itemStyle:{
                                color:'green',
                            }
                        } , 700, 230, 60, 60, 90,100],
                        markLine: {
                            lineStyle: {
                                type:'solid',
                                width: 1,
                                color: '#707070',
                            },
                            silent: true, // 鼠标悬停事件, true悬停不会出现实线
                            symbol: 'none', // 去掉箭头
                            data: [[
                                { coord: ['50', 0] }, // [x第几个（从0开始），y轴起始点 ]
                                { coord: ['50', 1000] } // [x第几个（从0开始），y轴起始点 ]
                            ]]
                        },
                        markPoint:{
                             symbol:"circle"
                        }
                    }
                ]
            }
        }
    },
    mounted(){
        // var chartDom = document.getElementById('main');
        // var myChart = echarts.init(chartDom);
        // option && myChart.setOption(this.option)
        this.initCharts();
    },
    methods:{
        initCharts() {
            const myChart = echarts().init(this.$refs.chart);
            // 绘制图表
            const option = this.option
            myChart.setOption(option);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

