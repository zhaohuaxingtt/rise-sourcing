export const tableTitle = [
    {
        props: 'tpPartAttachmentName',
        name: '车型项目',
        key: 'partsprocure.PARTSPROCUREMODELPROJECT',
    },{
        props: 'tpPartAttachmentName',
        name: '供应商编码',
        key: 'GONGYINGSHANGBIANMA',
    },{
        props: 'tpPartAttachmentName',
        name: '供应商名称',
        key: 'GONGYINGSHANGMINGCHENG',
    },{
        props: 'tpPartAttachmentName',
        name: 'EM准时完成率',
        key: 'EM准时完成率',
    },{
        props: 'tpPartAttachmentName',
        name: 'EM总数',
        key: 'EM总数',
    },{
        props: 'tpPartAttachmentName',
        name: 'EM完成数量',
        key: 'EM完成数量',
    },
]

export function echartsSupplerEM(data){
    var name = ['EM准时完成率','EM总数'];
    var data1 = [12, 31, 23, 11, 12, 31, 44, 55, 90]
    var data2 = [22, 11, 22, 18, 70, 3000, 44, 11, 78]
    var xAxis = [
        '供应商1',
        '供应商2',
        '供应商3',
        '供应商4',
        '供应商5供应商5供应商5供应商5供应商5供应商5',
        '供应商6',
        '供应商7',
        '供应商8',
        '供应商9',
      ];
    var interval2 = Math.ceil(Math.max(...data2)/5)

    return {
        title:{
            top:10,
            show:true,
            text:"车型项目XXX",
            textStyle:{
                color:"#9E9E9E",
                fontSize:13,
            }
        },
        legend:{
            top:10,
            right:0,
            show:true,
            data:name,
        },
        xAxis: {
            type: 'category',
            data: xAxis,
            axisLabel:{
                formatter:function(value){
                    let rowMax = 4;
                    let overValue = "";
                    for(let i=0;i<value.length;i++){
                        if((i%rowMax == 0) && (i!=0)){
                            overValue+="\n";
                            overValue+=value[i];
                        }else{
                            overValue+=value[i];
                        }
                    }
                    return overValue;
                },
            }
        },
        grid:{
            top:70,
            right:50,
            left:50,
            bottom:50,
        },
        yAxis:[
            {
                type: 'value',
                axisLabel:{
                    show:true,
                    interval:"auto",
                    formatter:"{value}%"
                },
                splitNumber:6,
                interval:20,
                max:100,
                min:0,
                show: true
            },{
                type: 'value',
                axisLabel:{
                    show:true,
                    interval:"auto",
                    formatter:"{value}"
                },
                splitNumber:5,
                interval:interval2,
                max:interval2*5,
                min:0,
                show: true
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:params=>{
                var t = params[0].name + '<br/>';
                params.forEach((e,index) => {
                    t += '<div>'
                    t += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + e.color + ';"></span>'
                    if(index == 0){
                        t += e.seriesName + ':' + e.value + '%'
                    }else{
                        t += e.seriesName + ':' + e.value
                    }
                    t += '</div>'
                });
                return t
            }
        },
        series: [
            {
                name:name[0],
                type: 'bar',
                barMaxWidth:40,
                data: data1,
                itemStyle:{
                    normal:{
                        color:"#6EA0FF",
                    }
                }
            },{
                name:name[1],
                type: 'line',
                showSymbol:true,
                symbol:"circle",
                symbolSize:15,
                yAxisIndex: 1,
                data: data2,
                itemStyle:{
                    normal:{
                        color:"#1663F6",
                    }
                }
            }
        ]
      };
}