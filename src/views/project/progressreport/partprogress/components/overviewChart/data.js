/*
 * @Author: Luoshuang
 * @Date: 2021-10-12 14:19:19
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-14 10:53:41
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressreport\partprogress\components\overviewChart\data.js
 */

export function getPartOptions(params) {
  const { barNames, barValues } = params 
  const option = {
    grid: {
      left: '0',
      right: '12%',
      bottom: '3%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
    },
    yAxis: {
      type: 'category',
      data: ['Y1', 'Y2', 'Y3'],
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      inverse: true
    },
    series: [
      {
        name: 'Mail Ada',
        type: 'bar',
        stack: 'total1',
        barWidth: 0.01,
        label: {
          show: true,
          position: 'insideBottomLeft',
          color: '#000',
          formatter: params => params.dataIndex === 0 ? barNames[0] : ''
        },
        data: [barValues[0],barValues[3],0],
        itemStyle: {
          color: 'rgba(255,255,255,0)'
        }
      },
      {
        name: 'Mail Ada',
        type: 'bar',
        stack: 'total1',
        label: {
          show: true,
          position: 'insideBottomLeft',
          color: '#000',
          formatter: params => barNames[params.dataIndex + 1]
        },
        data: [barValues[1],barValues[2],barValues[3]],
        itemStyle: {
          color: 'rgba(255,255,255,0)'
        }
      },
      {
        name: 'Mail Ada',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        data: [0,barValues[3],0],
        itemStyle: {
          color: 'rgba(255,255,255,0)'
        }
      },
      {
        name: 'Direct',
        type: 'bar',
        stack: 'total',
        barWidth: 30,
        label: {
          show: true,
          position: 'insideLeft'
        },
        data: [barValues[0], barValues[2], barValues[3]],
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: {
            width: 0.5
          },
          data: [
            [ { coord: [0, 'Y1'] }, { coord: [0, 'Y3'] } ],
            [
              {
                  coord: [barValues[3], 'Y2']
              },
              {
                  coord: [barValues[3], 'Y3']
              }
            ],
            [
              {
                  coord: [barValues[0], 'Y1']
              },
              {
                  coord: [barValues[0], 'Y2']
              }
            ]
          ]
        }
      },
      {
        name: 'Mail Ad',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'insideLeft'
        },
        data: [barValues[1]]
      },
      {
        name: 'Mail Addd',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'insideLeft',
          formatter: '180',
          color: '#000',
          fontWeight: 'bold'
        },
        data: [0]
      }
    ]
  }
  return option
}

export function getStackBarOptions(params) {
  const { xAxisNames, legend, data, showLegend, marklines, name, showName = false, total, showTooltip = false } = params
  const option = {
    title: {
      text: name,
      show: showName,
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    grid: {
      left: '0',
      right: '12%',
      bottom: '3%',
      top: '25%',
      containLabel: true
    },
    color: ['transparent', '#1660f1', '#bbb', 'transparent'],
    tooltip: {
      show: showTooltip,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: '#fff',
      padding: 0,
      formatter: function (params) {
        let content = ''
        let total = 0
        params.forEach((element, index) => {
          if (index !== 0 && index !== params.length - 1) {
            total += element.value
            content += `<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;">
            <div style="display:flex;align-items:center;">
            <i style="display:block;margin-right:5px;width:10px;height:10px;border-radius:50%;background:${element.color};"></i>${element.seriesName}</div><span style="font-weight:bold;">${element.value}</span></div>`
          }
        });
        content = `<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;font-weight:bold;"><span>${params[0].name}</span><span>${total}</span></div>` + content
        return '<div style="color:#000;box-shadow:0 1px 3px rgba(0, 0, 0, 0.3);padding:10px;width:200px">' + content + '</div>'
      }
    },
    legend: {
      data: legend.filter(item => item !== 'temp' && item !== 'total'),
      right: '20',
      show: showLegend,
      icon: 'circle',
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
    },
    xAxis: {
      type: 'category',
      data: xAxisNames,
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        width: 100,
        overflow: 'break'
      }
    },
    series: legend.map((item, index) => {
      return {
        name: item,
        type: 'bar',
        stack: 'Total',
        data: data[index],
        barWidth: 30,
        label: {
          show: item !== 'temp',
          position: item === 'total' ? 'top' : 'insideTop',
          formatter: params => item === 'total' ? total[params.dataIndex] : params.value,
          color: item === 'total' ? '#000' : "#fff",
        },
        markLine: {
          show: item === 'temp',
          silent: true,
          symbol: 'none',
          lineStyle: {
            width: 0.5,
            color: '#bbb'
          },
          data: xAxisNames.reduce((accu, curr, index) => {
            if (index !== xAxisNames.length - 1) {
              return [
                ...accu,
                [
                  {
                    coord: [curr, marklines[index]]
                  },
                  {
                    coord: [xAxisNames[index + 1], marklines[index]]
                  }
                ]
              ]
            } else {
              return accu
            }
          },[])
        }
      }
    })
  }
  return option
}