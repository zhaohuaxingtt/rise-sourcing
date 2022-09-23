export function echartsSupplerEM(data,type,valueN){
    console.log(data);

    var name = [
        // 'EM准时完成率','EM总数'
        ...type
    ];
    var data1 = [
        // 12, 31, 23, 11, 12, 31, 44, 55, 90
    ]//左
    var data1_2 = [
        // 12, 31, 23, 11, 12, 31, 44, 55, 90
    ]//左
    var data2 = [
        // 22, 11, 22, 18, 70, 300, 44, 11, 78
    ]//右
    var xAxis = [
        // '供应商1',
        // '供应商2',
        // '供应商3',
        // '供应商4',
        // '供应商5供应商5供应商5供应商5供应商5供应商5',
        // '供应商6',
        // '供应商7',
        // '供应商8',
        // '供应商9',
    ];
    
    var series = [];

    data.forEach(e=>{
        if(name.length == 3){
            data1.push(e.emPercentage)
            data1_2.push(e.otsPercentage)
            data2.push(e.totalNum)
            xAxis.push(e.dept)
        }else{
            data1.push(e.percentage)
            data2.push(e.totalNum)
            xAxis.push(e.name)
        }
    })

    if(name.length == 3){
        series = [
            {
                name:name[0],
                type: 'line',
                barMaxWidth:40,
                showSymbol:true,
                symbol:"circle",
                symbolSize:15,
                data: data1,
                itemStyle:{
                    normal:{
                        color:"#1663F6",
                    }
                }
            },{
                name:name[1],
                type: 'line',
                barMaxWidth:40,
                showSymbol:true,
                symbol:"circle",
                symbolSize:15,
                data: data1_2,
                itemStyle:{
                    normal:{
                        color:"#76CBFF",
                    }
                }
            },{
                name:name[2],
                type: 'bar',
                barMaxWidth:40,
                yAxisIndex: 1,
                data: data2,
                itemStyle:{
                    normal:{
                        color:"#6EA0FF",
                    }
                }
            }
        ]
    }else{
        series = [
            {
                name:name[0],
                type: 'line',
                barMaxWidth:40,
                showSymbol:true,
                symbol:"circle",
                symbolSize:15,
                data: data1,
                itemStyle:{
                    normal:{
                        color:"#1663F6",
                    }
                }
            },{
                name:name[1],
                type: 'bar',
                barMaxWidth:40,
                yAxisIndex: 1,
                data: data2,
                itemStyle:{
                    normal:{
                        color:"#6EA0FF",
                    }
                }
            }
        ]
    }


    console.log(name);
    var interval2 = Math.ceil(Math.max(...data2)/5)

    return {
        title:{
            top:10,
            show:true,
            text:valueN,
            textStyle:{
                color:"#9E9E9E",
                fontSize:13,
            }
        },
        legend:{
            top:10,
            right:10,
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
                    if(name.length == 3){
                        if(index == 0 || index == 1){
                            t += e.seriesName + ':' + e.value + '%'
                        }else{
                            t += e.seriesName + ':' + e.value
                        }
                    }else{
                        if(index == 0){
                            t += e.seriesName + ':' + e.value + '%'
                        }else{
                            t += e.seriesName + ':' + e.value
                        }
                    }
                    t += '</div>'
                });
                return t
            }
        },
        series: series
      };
}