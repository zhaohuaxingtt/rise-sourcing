/*
 * @Author: your name
 * @Date: 2021-08-25 08:57:38
 * @LastEditTime: 2021-10-15 16:18:50
 * @LastEditors: Luoshuang
 * @Description: 风险图的配置文件
 * @FilePath: \front-web\src\views\project\progressmonitoring\components\lib\genBarChart.js
 */
/**
 * @description: 
 * @param {*} params
 * @param {*} type 图形类型1，普通类型 2.统计汇总类型
 * @return {*}
 */
export function generateOptions(params = {}, type = 1) {
    const colors = ['#4382FA', '#E30D0D','#FFCA53','#00BF87']
    const seaiesList = {
        // 通用指标，type:1【总计/延误/风险/正常】,含任务进度
        '1': [
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
        ],
        // EM&OTS已完成指标，type:2【总计/超期/按期】
        '2': [
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
        ],
        // 匹配异常指标，type:3【总计/待处理/已处理】
        '3': [
            // 已处理
            {
                key: 'value8',
                name: '已处理',
                index: 5,
                style: {
                    color: colors[3],
                    fontSize: 12
                }
            },
            // 待处理
            {
                key: 'value7',
                name: '待处理',
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
    }
    
    const seaiesItem = seaiesList[type] || []
    
    const seaiesValues = []
    const seaiesData = []
    const assistData = []
    const assistLineData = []
    seaiesItem.forEach((item, index) => {
        // 总计
        const NumAll = params.value4 || 0
        // 绘图差值（）
        let diffValue = NumAll
        // 柱子显示值
        let value = params[item.key] || '0'
        // 辅助柱子的值（白色柱子）
        let assistValue = 0
        // 辅助折线的值（灰色的线）
        let assistLineValue = value
        
        // 辅助数据
        const tempCount = []
        // 数据与绘图顺序相反，需要reverse一下数组
        const calcArray = window._.cloneDeep(seaiesItem).reverse()
        calcArray.slice(1,index+1).forEach(c => {
            tempCount.push(params[c.key])
        })
        // [计算绘图差]
        index > 0 && (diffValue = window._.sum(tempCount))

        // [计算辅助线]
        assistLineValue = (index > 0 && index < seaiesItem.length - 1) ? window._.sum(seaiesValues) : value
        // 辅助线不能大于总数值
        assistLineValue = assistLineValue > NumAll ? NumAll : assistLineValue
        // 上一个值为0，辅助线值为上一个辅助线记录值
        assistLineValue = !Number(seaiesValues[index-1]) ? (assistLineData[index - 1] || 0) : assistLineValue

        // [主数据]
        seaiesData.push({
            value,
            itemStyle: item.style
        })
        // 缓存主数据做计算
        seaiesValues.push(value)
        // 辅助柱子的值
        assistValue = NumAll - diffValue
        // console.log(item.name, value, assistLineValue, assistLineData, assistLineData[index - 1])
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
            left: type === 3 ? 55 : 40,
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
                label: {
                    show: true,
                    position: 'insideRight',
                    textStyle: {
                        fontSize: 10,
                        color: '#000'
                    },
                    formatter: (params) => {
                        return params.dataIndex === seaiesData.length - 2 && Number(seaiesData[params.dataIndex].value) < Number(seaiesData[seaiesData.length - 1].value) * (0.105 * (seaiesData[params.dataIndex].value + '').length) ? seaiesData[params.dataIndex].value : ''
                    }
                },
                data: assistData.reverse()
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
                    textStyle: {
                        fontSize: 10,
                        color: '#fff'
                    },
                    formatter: (params) => {
                        return params.value === '0' || Number(params.value) < Number(seaiesData[seaiesData.length - 1].value) * (0.105 * (seaiesData[params.dataIndex].value + '').length) ? '' : params.value
                    }
                },
                data: seaiesData
            },
            {
                name: '辅助2',
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
                label: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        fontSize: 10,
                        color: '#000'
                    },
                    formatter: (params) => {
                        return params.dataIndex !== seaiesData.length - 2 && Number(seaiesData[params.dataIndex].value) < Number(seaiesData[seaiesData.length - 1].value) * (0.105 * (seaiesData[params.dataIndex].value + '').length) ? seaiesData[params.dataIndex].value : ''
                    }
                },
                data: seaiesData.map(item => 0)
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
