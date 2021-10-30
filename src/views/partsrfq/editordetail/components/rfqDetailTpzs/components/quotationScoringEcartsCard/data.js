/*
 * @Author: yuszhou
 * @Date: 2021-04-23 09:18:12
 * @LastEditTime: 2021-10-30 16:24:35
 * @LastEditors:  
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
  '#BA67D9',
  '#CC9687',
  '#6E6ED6',
  '#807C81',
  '#9090D6',
  '#3262BF',
  '#4E83EB',
  '#3890BE',
  '#3BA2D9',
  '#0CA8A8',
  '#29BEBE',
  '#55A598',
  '#85AF9F',
  '#83AC6B',
  '#AEC99C',
  '#ADB158',
  '#CBCE7C',
  '#B99D54',
  '#DBB85B',
  '#BC745F'
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
              if(params[index].data.value != null && params[index].seriesName && params[index].data.symbolSize > 0){
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
  console.log(params,'----------------------');
  let options = {
    legend:[],
    xAxis:[],
    series:[]
  }
  try {
      //处理颜色问题
      params.forEach((element,index) => {
        element['color'] = params.length <= color.length?color[index]:getLineColor()
        element['type'] = 'line',
        element['symbol'] = 'circle',
        element['name'] = element['name'] +'   '
        options['legend'].push(element['name'])
      });
      params[0].data.forEach(element => {
        options['xAxis'].push({value:`${gjhLunchi}${' '}${element.round}`,textStyle:{color:'#7E84A3',fontSize:12}})
      })
      options['xAxis'] = [...options['xAxis'],...[{value:'',textStyle:{color:'#7E84A3',fontSize:12}},{value:'有效报价',textStyle:{color:'#7E84A3',fontSize:12}}]]
      params.forEach((e,i)=>{
        for(let a = e.data.length-1;a>=0;a--){
          if(e.data[a].value){
            e.data = [...e.data,...[{round: "",symbolSize: "",value: null},e.data[a]]]
            break;
          }
        }
      })
      options.series = params
  } catch (error) {
    console.log(error)
    options = {
      legend:[],
      xAxis:[],
      series:[]
    }
  }
  console.log(options)
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