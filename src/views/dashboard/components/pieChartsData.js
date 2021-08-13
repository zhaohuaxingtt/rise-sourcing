/*
 * @Author: your name
 * @Date: 2021-08-06 08:52:14
 * @LastEditTime: 2021-08-11 16:37:52
 * @LastEditors: Please set LastEditors
 * @Description: 流转状态跟踪饼状图模拟数据
 * @FilePath: /front-web/src/views/dashboard/components/pieChartsData.js
 */
export function generateOptions(data) {
    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: '#fff',
            padding: 10,
            textStyle: {fontSize: 12},
            formatter: function(params) {
                return `<div class="dashboard-tooltip">
                        ${params.marker}
                    <span class="item-name">${params.name}</span><br>
                    <p style="padding-left: 17px;">
                        <b>${params.value}(${params.percent}%)<b>
                    <p>
                </div>`
            }
        },
        series: [
            // 绘制在底层的背景层
            {
                name: '流转状态跟踪',
                type: 'pie',
                top: '-20%',
                radius: ['50%', '60%'],
                avoidLabelOverlap: false,
                animation: false,
                itemStyle: {
                    borderRadius: 2,
                    borderColor: '#fff',
                    borderWidth: 0
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: 100,
                        itemStyle: {
                            color: '#6192f0',
                        }
                    }
                ]
            },
            // 上层的数据层
            {
                name: '流转状态跟踪',
                type: 'pie',
                minAngle: 5,
                zlevel: 2,
                top: '-20%',
                radius: ['43%', '60%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 2,
                    borderColor: '#fff',
                    borderWidth: 0
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: (data && data.leWeekNum) || 0, 
                    selected: true,
                    name: '流转超4周',
                    itemStyle: {
                        color: '#fab738',
                        borderWidth: 5
                    }
                    },
                    {value: (data && data.gtWeekNum) || 0, 
                    name: '流转4周内',
                    itemStyle: {
                        color: '#6192f0',
                        borderCap: 'round',
                        opacity: 0
                    }
                    }
                
                ]
            }
        ]
    };
    console.log('pieoption', option)
    return option
}