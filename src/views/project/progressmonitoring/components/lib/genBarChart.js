/*
 * @Author: your name
 * @Date: 2021-08-25 08:57:38
 * @LastEditTime: 2021-09-08 13:57:08
 * @LastEditors: Hao,Jiang
 * @Description: 风险图的配置文件
 * @FilePath: /front-web/src/views/project/progressmonitoring/components/components/barChart.js
 */
/**
 * @description: 
 * @param {*} params
 * @param {*} type 图形类型1，普通类型 2.统计汇总类型
 * @return {*}
 */
export function generateOptions(params = {}, type = 1) {
    const colors = ['#4382FA', '#E30D0D','#FFCA53','#00BF87']
    const seaiesItemArray1 = [
        // 正常
        {
            key: 'value1',
            name: '正常',
            index: 0,
            style: {
                color: colors[3],
                fontSize: 12
            }
        },
        // 风险
        {
            key: 'value2',
            name: '风险',
            index: 1,
            style: {
                color: colors[2],
                fontSize: 12
            }
        },
        // 延误
        {
            key: 'value3',
            name: '延误',
            index: 2,
            style: {
                color: colors[1],
                fontSize: 12
            }
        },
        // 总计
        {
            key: 'value4',
            name: '总计',
            index: 3,
            style: {
                color: colors[0],
                fontSize: 12
            }
        },
    ]
    const seaiesItemArray2 = [
        // 按期
        {
            key: 'value6',
            name: '按期',
            index: 5,
            style: {
                color: colors[3],
                fontSize: 12
            }
        },
        // 超期
        {
            key: 'value5',
            name: '超期',
            index: 4,
            style: {
                color: colors[1],
                fontSize: 12
            }
        },
        // 总计
        {
            key: 'value4',
            name: '总计',
            index: 3,
            style: {
                color: colors[0],
                fontSize: 12
            }
        },
    ]
    const seaiesItem = type === 1 ? seaiesItemArray1 : seaiesItemArray2
    
    const seaiesData = []
    const assistData = []
    const assistLineData = []
    seaiesItem.forEach((item, index) => {
        const NumAll = params.value4 || 0
        let value = params[item.key] || '0'
        let assistValue = 0
        let assistLineValue = value
        // 辅助数据
        if (![0, 3].includes(index)) {
            if (value <= NumAll) {
                // assistValue = NumAll - value
                if (index === 1) {
                    assistValue = NumAll - value - (type === 1 ? params.value3 : 0)
                }
                if (index === 2) {
                    assistValue = NumAll - value
                }
                assistLineValue = assistValue
            } else {
                value = 0
            } 
        }
        // assistLineValue特殊情况
        if (type === 2 && index === 2) {
            assistLineValue = value
        }

        // 主数据
        seaiesData.push({
            value,
            itemStyle: item.style
        })
        // 辅助柱状图数据
        assistData.push(assistValue)
        // 辅助线数据
        assistLineData.push(assistLineValue)
    })
    

    const option = {
        color: ['#4382FA', '#E30D0D','#FFCA53','#00BF87'],
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#fff',
            padding: 10,
            textStyle: {
                color: '#000',
                fontSize: 12
            },
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                var tar = params[1];
                return tar.seriesName + '<br/>' + tar.name + ' : ' + tar.value;
            }
        },
        grid: {
            left: 40,
            right: 10,
            bottom: 10,
            top: 5,
        },
        yAxis: {
            type: 'category',
            splitLine: {show: false},
            axisTick: {show: false},
            axisLabel: {
                color: '#595b65'
            },
            axisLine:{
                show: true,
                lineStyle: {
                    color: '#CDD4E2',
                }
            },
            data: seaiesItem.map(o => o.name)
        },
        xAxis: {
            axisLabel:{show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            splitLine: {show: false},
            type: 'value'
        },
        series: [
            {
                name: '辅助',
                type: 'bar',
                zlevel: 1,
                stack: '总量',
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    itemStyle: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: assistData
            },
            {
                name: params.title,
                type: 'bar',
                zlevel: 1,
                barWidth: 14,
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight',
                    formatter: (params) => {
                        return params.value === '0' ? '' : params.value
                    }
                },
                data: seaiesData
            },
            {
                name: '辅助线',
                type: 'line',
                zlevel: 0,
                step: 'start',
                symbol: 'none',
                lineStyle: {
                    width: 0.5,
                    type: 'dashed',
                    color: '#000',
                    opacity: 0.4
                },
                data: assistLineData
            },
        ]
    };
    return option
}
