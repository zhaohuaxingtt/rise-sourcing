<template>
    <div class="box">
        <div class="supplier-itemList" v-for="(x,index) in supplierNameArray" :key="index"><i class="point"></i>{{x.name}}</div>
        <div style="height:360px" ref="chart"></div>
    </div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
    props:{
        options:{
            type:Object
        },
        supplierNameArray:{
            type:Array,
            default:()=>[]
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
            seriesObj:{}
        }
    },
    mounted(){
        this.option={...this.options}
        this.initCharts();
    },
    watch:{
        option:{
            handler(curVal,oldVal){
                this.seriesObj=this.options.series[0]
                this.option.tooltip.formatter=function(params){
                        const str = `<div style="padding:10px">
                            <div>该分数断下供应商数量:<span style="color:#1763F7">${params.value}家</span></div>
                            ${params.data.sArray.map(x=>{return `<div>${x}:${params.data.c}分</div>`})}
                        </div>`
                        return str
                    }
                this.initCharts()
            },
            immediate: true,
            deep: true
        },
        // supplierNameArray(){
        //     this.option.series=[]
        //     this.supplierNameArray.forEach((x,index)=>{
        //         this.option.series.push({...this.seriesObj,name:x.name})
        //     })
        //     this.initCharts()
        // }
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
.supplier-itemList{
    padding-left: 10px;
}
    .point{
        height: 12px;
        width: 12px;
        background-color: #1763F7;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
    }
</style>

