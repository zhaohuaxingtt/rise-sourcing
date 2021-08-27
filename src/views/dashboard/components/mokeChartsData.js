// 主要的几种颜色
const colors = ['#6192f0', '#00bf87', '#a5aab4'];
const rich = {
    n: {
      fontSize: 10,
      lineHeight: 12,
      color: '#a2a5aa'
    }
}
const symbolImg = require('@/assets/images/symbal.png')
const maker0 = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${colors[0]};"></span>`
const maker1 = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${colors[1]};"></span>`

// 给标题每隔Num个字符加上\n 换行符
function splitStr(str, num){
    const reg = new RegExp(`[^\n]{1,${num}}`,'g');
    return str.match(reg).join('\n');
}

export function generateOptions(params) {
    try {
        // 平均定点周期
        const freq = params.freqData || []
        // 生成freqData
        const freqData = []
        // 平均定点周期标记
        const xAxisTopData = []
        // dataZoom 缩放百分比
        const displayNum = 10
        const endPercent = freq.length > displayNum ? (displayNum/freq.length*100) : 100
        // 刻度分割分数
        const splitNumber = 10
        // 右边平均定点周期y轴刻度最大值
        let max2Number = window._.max(freq.map(o => Number(o)))
        max2Number = max2Number ? Math.floor(max2Number/100) : 0
        // 求平均定点周期y刻度权重值，根据最大值取取最大值相近的10的倍数
        const splitWeight = max2Number > 10 ? Math.floor(max2Number/10) : 0
        // 生成平均定点周期y刻度最大值
        const max2 = (splitWeight + 1) * 10

        freq.forEach(d => {
            freqData.push({
                value: Number(d/100).toFixed(2),
                symbol:`image://${symbolImg}`,
                symbolSize:10,
            })
            xAxisTopData.push({
                value: Number(d/100).toFixed(2),
                textStyle: {
                    backgroundColor: '#e5f8f3',
                    color: colors[1],
                    padding: [3, 10],
                    borderRadius: 10
                }
            })
        })

        // 定点数据
        const nomiData = params.nomiData || []

        // 材料组名称
        const fugroup = params.fugroup || []

        // 材料组x轴
        const xAxisBottomData = []
        fugroup.forEach(d => {
            xAxisBottomData.push({
                value: splitStr(d, 4),
                textStyle: {
                    color: '#485465',
                    fontSize: 12
                }
            })
        })
        const option = {
            color: colors,
            grid: {
                left: '40',
                right: '40',
                bottom: '0',
                top: '15%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                // axisPointer: {
                //     type: 'cross'
                // },
                backgroundColor: '#fff',
                padding: 10,
                textStyle: {
                    fontSize: 12,
                    color: '#333'
                },
                formatter: function(params) {
                    return `<div class="dashboard-tooltip">
                        <span class="item-name">${params[0].name}</span><br>
                        <p style="padding-left: 5px; padding-top: 5px;">
                            ${maker0} ${params[0].seriesName}:${params[0].value}%
                        <p>
                        <p style="padding-left: 5px;">
                            ${maker1} ${params[1].seriesName}:${params[1].value}
                        <p>
                    </div>`
                }
            },
            dataZoom: [
                {
                    xAxisIndex: [0, 1],
                    show: false,
                    realtime: true,
                    start: 0,
                    end: endPercent
                },
                {
                    type: 'inside',
                    realtime: false,
                    start: 0,
                    end: endPercent,
                    zoomLock: true
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    axisLine:{
                        show: false
                    },
                    axisTick:{
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel:{
                        textStyle:{
                            color: '#485465'
                        },
                        formatter: function (val) {
                            // 使用 rich 中的 n 来设置样式
                            return `{n|${val}}`
                        },
                        rich,
                        interval: 0 // 显示所有的 x 轴上的文字不隐藏
                    },
                    data: xAxisBottomData
                },
                {
                    type: 'category',
                    axisLine:{
                        show: false
                    },
                    axisTick:{
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    offset: 30,
                    data: xAxisTopData
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '定\n点\n及\n时\n率\n(%)',
                    nameRotate: '0',
                    nameGap: 60,
                    nameLocation: 'middle',
                    nameTextStyle: {
                        color: '#abacb2',
                        align: 'center'
                    },
                    min: 0,
                    max: 100,
                    splitNumber: splitNumber,
                    position: 'left',
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    axisTick: {show: false,},
                    axisLabel: {
                        color: '#abacb2',
                        formatter: '{value}%'
                    }
                },
                {
                    type: 'value',
                    name: '平\n均\n定\n点\n周\n期\n︵\n周\n︶',
                    nameRotate: '0',
                    nameGap: 50,
                    nameLocation: 'middle',
                    nameTextStyle: {
                        color: '#abacb2',
                        align: 'center'
                    },
                    min: 0,
                    max: max2,
                    splitNumber: splitNumber,
                    position: 'right',
                    axisLine: {
                        show: false
                    },
                    axisTick: {show: false,},
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#abacb2',
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '定点及时率',
                    data: nomiData,
                    type: 'bar',
                    barWidth: 15,
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                        color: '#485465'
                        },
                        formatter: function(params) {
                        return `${params.data}%`
                        }
                    },
                    itemStyle: {
                        normal: {
                        barBorderRadius: [2, 2, 0, 0],
                        color: colors[0]
                        },
                    }
                },
                {
                    name: '平均定点周期',
                    type: 'line',
                    yAxisIndex: 1,
                    data: freqData,
                    lineStyle: {
                        color: colors[1]
                    }
                }
            ]
        };
        return option;
    } catch (e) {
        console.log('optione', e)
    }
}
