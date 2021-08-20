/*
 * @Author: your name
 * @Date: 2021-08-06 08:52:14
 * @LastEditTime: 2021-08-20 10:56:58
 * @LastEditors: Please set LastEditors
 * @Description: 流转状态跟踪饼状图模拟数据
 * @FilePath: /front-web/src/views/dashboard/components/pieChartsData.js
 */
export function generateOptions(data) {
    // 超过4周
    const within4weeks = (data && data.leWeekNum) || 0
    const over4weeks = (data && data.gtWeekNum) || 0
    const isNull = (over4weeks === 0 && within4weeks=== 0)
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
                        <b>${isNull ? 0 : params.value}(${isNull ? 0 : params.percent}%)<b>
                    <p>
                </div>`
            }
        },
        series: [
            // 上层的数据层
            {
                name: '流转状态跟踪',
                type: 'pie',
                minAngle: 5,
                zlevel: 2,
                selectedMode: 'single',
                selectedOffset: '0',
                top: '-25%',
                radius: ['38%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: {
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
                    {
                        value: isNull ? 1 : over4weeks, 
                        selected: true,
                        name: '流转超4周',
                        itemStyle: {
                            color: isNull ? '#ddd' : '#fab738',
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    {
                        value: within4weeks, 
                        name: '流转4周内',
                        itemStyle: {
                            color: '#6192f0',
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    }
                
                ]
            }
        ]
    };
    console.log('pieoption', option)
    return option
}