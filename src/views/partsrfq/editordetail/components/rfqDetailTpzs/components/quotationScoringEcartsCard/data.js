/*
 * @Author: yuszhou
 * @Date: 2021-04-23 09:18:12
 * @LastEditTime: 2021-06-18 15:35:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\views\rfqManageMent\partsOffer\components\ecartsCard\data.js
 */
export const form = {
  fsNum: [],
  partNum: [],
  priceLatitude: '1',
  rfqId: '',
  round: [],
  supplierID:[]
}
/**
 * @description: 当小于10的时候，默认使用自定义颜色，可以很好区分出线条。 
 * @param {*}
 * @return {*}
 */
 export const color = [
  '#315efb',
  '#F44336',
  '#9C27B0',
  '#3F51B5',
  '#2196F3',
  '#009688',
  '#FF9800',
  '#607D8B',
  '#0deca6',
  '#969df7',
  '#1763f7',
  '#77cbff',
  '#21d59b',
  '#75a340',
  '#ffb04d',
  '#ffd72e',
  '#a07cbf',
  '#e2a8ce',
  '#9ab9f6',
  '#ff8e01'
]
/**
 * @description: echarts 图所有配置文件 
 * @param {*} options
 * @return {*}
 */
export function chartsOptions(options,title,unit) {
    return {
      title: {
        left:'45%',
        text: title,
        textStyle:{
          fontSize:14
        },
        subtextStyle:{
          lineHeight:-35,
          align: 'center'
        }
      },
      tooltip: {
          extraCssText:'box-shadow: 0px 4px 10px rgba(27, 29, 33, 0.12);',
          trigger: 'axis',
          backgroundColor:'#FFFFFF',
          textStyle:{
            color:'#333333'
          },
          formatter:function (params,ticket,callback) {
            var htmlContentText = ''
            const Xname = params[0].name
            htmlContentText += '<div style="margin-bottom:10px;"> '+ Xname + '<div/>'
            for (let index = 0; index < params.length; index++) {
              if(params[index].data.value != null && params[index].seriesName){
                htmlContentText += '<div>';
                htmlContentText += '<span style="margin-right:5px;display:inline-block;height:13px;width:13px;font-size: 12pt; border-radius:50%;background-color:'+params[index].color+'"></span>';
                htmlContentText += '<span>'+(params[index].seriesName.indexOf('series')> -1?'Null':params[index].seriesName) +"："+params[index].data.value+'</span>';
                htmlContentText += '</div>'
              }     
            }
            return htmlContentText
          }
      },
      // 右上方提示
      legend: {
          type: 'scroll',
          data: options.legend, //['零件一', '零件二', '零件三', '零件四', '零件五'],
          right:'3%',
          top:'8%'
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:'20%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data:options.xAxis,
          //刻度颜色
          axisLine:{
            lineStyle:{
              color:'#E6E9F4'
            }
          }
      },
      yAxis: {
          name:unit,
          nameTextStyle:{
            lineHeight: '90',
            color:'#7E84A3'
          },
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          //刻度颜色
          axisLine:{
            textStyle:{
              color:'#7E84A3'
            },
            lineStyle:{
              color:'#E6E9F4'
            }
          },
          //设置网格线颜色
          splitLine:{
            lineStyle:{
              type:'dotted',
              color:'#E6E9F4'
            }
          }
      },
      series: options.series
  };
}

/**
 * @description: 找到当前数据中的最大轮次 为每个轮次补入数据  ///后台处理了。当前方法，暂时废弃
 * @param {*}
 * @return {*}
 */
export function MaxLength(datas){
  let maxLengthNumber = JSON.parse(JSON.stringify(datas)).sort(function(a,b){return b.data.length - a.data.length})[0].data.length
  datas.forEach(items=>{
    for(let i = items.data.length;i<maxLengthNumber;i++){
      items.data.push({
        round: i+1,
        symbols: "0",
        value: '0'
      })
    }
  })
  return datas
}

/**
 * @description: 转换后台数据为echarts数据
 * @param {*} params
 * @return {*}
 */
export function translateGetLunci(params,gjhLunchi) {
  //params = MaxLength(params)
  //找到当前零件中的最大轮次。
  let options = {
    legend:[],
    xAxis:[],
    series:[]
  }
  try {
      //处理颜色问题
      params.forEach((element,index) => {
        element['color'] = params.length < color.length?color[index]:getLineColor()
        element['type'] = 'line',
        options['legend'].push(element['name'])
      });
      params[0].data.forEach(element => {
        options['xAxis'].push({value:`${gjhLunchi}${' '}${element.round}`,textStyle:{color:'#7E84A3',fontSize:12}})
      })
      options.series = params
  } catch (error) {
    options = {
      legend:[],
      xAxis:[],
      series:[]
    }
  }
  return options 
}

/**
 * @description: 为线条生成同一色系的颜色
 * @param {*} params
 * @return {*}
 */
export function getLineColor(params) {
  var r=70;
  var g=Math.floor(Math.random()*256);
  var b=Math.floor(Math.random()*256);
  console.log(r,(g < 50 ?g+100:g),b)
  return "rgb("+r+','+(g < 50 ?g+100:g)+','+b+")";
  // return '#'+ Math.floor(Math.random()*0xffffff).toString(16);
}