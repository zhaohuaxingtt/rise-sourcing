<template>
    <div class="box">
        <div style="height:360px" ref="chart"></div>
    </div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
    props:{
        options:{
            type:Object
        }
    },
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
                        return 
                    },
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
        }
    },
    mounted(){
        this.option={...this.options}
        this.initCharts();
    },
    watch:{
        option:{
            handler(curVal,oldVal){
                this.option.legend.data=this.options.legend.data
                // 更新供应商名称
                this.options.legend.data.forEach((x,index)=>{
                    this.option.legend.data[index].name=x.name
                    this.option.series[0].name=x.name
                })

                this.option.tooltip.formatter=function(params){
                        const str = `<div style="padding:10px">
                            <div>该分数断下供应商数量:<span style="color:#1763F7">${params.value}家</span></div>
                            <div>${params.seriesName}:${params.name}分</div>
                        </div>`
                        return str
                    }
                this.initCharts()
            },
            immediate: true,
            deep: true
        }
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

