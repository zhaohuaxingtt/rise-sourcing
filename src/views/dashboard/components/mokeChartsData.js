// 主要的几种颜色
const colors = ['#6192f0', '#00bf87', '#a5aab4'];
const rich = {
    n: {
      fontSize: 10,
      lineHeight: 12,
      color: '#a2a5aa'
    }
}
// 平均定点周期
const freqData = [14, 22,39,36,14, 22,39,36]
// 平均定点周期标记
const xAxisTopData = []
freqData.forEach(d => {
    xAxisTopData.push({
        value: d,
        textStyle: {
            backgroundColor: '#e5f8f3',
            color: colors[1],
            padding: [3, 10],
            borderRadius: 10
        }
    })
})
// 材料组
const fugroup = ['附件材\n料组1', '附件材\n料组2','附件材\n料组3','附件材\n料组4','附件材\n料组5', '附件材\n料组6','附件材\n料组7','附件材\n料组8']
// 材料组x轴
const xAxisBottomData = []
fugroup.forEach(d => {
    xAxisBottomData.push({
        value: d,
        textStyle: {
            color: '#485465',
            fontSize: 12
        }
    })
})
export const option = {
    color: colors,
    grid: {
        left: '10',
        right: '10',
        bottom: '0',
        top: '10%',
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
    },
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
            offset: 10,
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
                align: 'center'
            },
            min: 0,
            position: 'left',
            axisLine: {
                show: false
            },
            splitLine: {
                show: false,
            },
            axisTick: {show: false,},
            axisLabel: {
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
                align: 'center'
            },
            min: 0,
            max: 38,
            position: 'right',
            axisLine: {
                show: false
            },
            axisTick: {show: false,},
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name: '定点及时率',
            data: [10, 19,33,34,10, 19,33,34],
            type: 'bar',
            barWidth: 15,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#485465'
              },
              formatter: function(params) {
                return params.data
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
            data: freqData,
            lineStyle: {
                color: colors[1]
            }
        }
    ]
};
