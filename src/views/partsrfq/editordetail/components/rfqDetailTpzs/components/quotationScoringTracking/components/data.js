/*
 * @Author: your name
 * @Date: 2021-05-25 21:01:30
 * @LastEditTime: 2021-07-15 00:03:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\data.js
 */

export const timeList = [
  {
    week:1,
    name:'首次报价',
    active:true
  },
  {
    week:2,
    name:''
  },
  {
    week:3,
    name:''
  },
  {
    week:4,
    name:''
  },
  {
    week:5,
    name:'首次报价'
  },
  {
    week:6,
    name:''
  },
  {
    week:7,
    name:''
  },
  {
    week:8,
    name:'首次报价A'
  },
  {
    week:9,
    name:''
  },
  {
    week:10,
    name:''
  },
  {
    week:11,
    name:'首次报价A'
  },
  {
    week:12,
    name:''
  },
  {
    week:13,
    name:''
  },
  {
    week:14,
    name:'首次报价A'
  }
]


export const iconList_car = { //汽车图标
  'a2':{
    icon:'iconbaojiafenxi-zhengchejindu-cheng' //橙色
  },
  'a3':{
    icon:'iconbaojiafenxi-zhengchejindu-hong' //红色
  },
  'a1':{
    icon:'iconbaojiafenxi-zhengchejindu-huang1' //黄色浅黄
  },
  'a0':{
    icon:'icondingdianguanlijiedian-yiwancheng' //default
  }
}
export const iconList_all_times = { //整体任务进度以及每格进度
  'a2':{
    icon:'iconbaojiapingfengenzong-jiedian-lv' //绿色
  },
  'a3':{
    icon:'iconbaojiapingfengenzong-jiedian-huang' //红色
  },
  'a1':{
    icon:'iconbaojiapingfengenzong-jiedian-hei' //黑色
  },
  'a0':{
    icon:'iconbaojiapingfengenzong-jiedian-hei' //黑色
  },
  'a4':{
    icon:'iconbaojiapingfengenzong-jiedian-cheng' //橙色
  }
}


export const tableTile = {props:'supplierName',name:'供应商',key: '',tooltip:false, width:''}

//构建表头。
/**
 * @description: parmats => res.data
 * @param {*} params
 * @return {*}
 */
export function buildTitleTabel(params) {
   //前方评分 
   const supplierTitle = [JSON.parse(JSON.stringify(tableTile))]
   params.roundTableHead.forEach(element => {
     const temlateData = JSON.parse(JSON.stringify(tableTile))
     temlateData.props = 'round' + element.round
     temlateData.name = '第'+element.round+`轮(${element.roundHeadDetailVO.inquiryType})`
     temlateData.roundHeadDetailVO = element.roundHeadDetailVO
     supplierTitle.push(temlateData)
   });
   //评分数据
   let supplierRateTitle = []
   try {
    if(!params.rateTableHead) throw 'rateTableHead 无数据';
    params.rateTableHead.forEach(items=>{
      const temlateData = JSON.parse(JSON.stringify(tableTile))
      temlateData.name = items.rateTableHeadDetailVO.rateDepart
      temlateData.props = 'rateHead'+items.rateHead
      supplierRateTitle.push(temlateData)
   })
   } catch (error) {
    console.log(error)
    supplierRateTitle = [{props:'ep',name:'EP',key: '',tooltip:false, width:'100'},{props:'mq',name:'MQ',key: '',tooltip:false, width:'100'},{props:'pl',name:'PL',key: '',tooltip:false, width:'100'}]
   }
   return [...supplierTitle,...supplierRateTitle]
}

/**
 * @description: 数据构造
 * @param {*} data
 * @return {*}
 */
export function buildTableData(data){
  try {
    const datas = []
    data.roundQuotationVOS.forEach(element=>{
      for(let key in element.detailVOMap){
        element[key] = element.detailVOMap[key]
      }
      const rateList = data.rateDepartInfoVOS?data.rateDepartInfoVOS.find(e=>e.supplierId == element.supplierId):[]
      if(rateList){
        for(let key in rateList.detailVOMap){
          element[key] = rateList.detailVOMap[key]
        }
      }
      datas.push(element)
    })
    return datas
  } catch (error) {
    console.log(error)
  }
}
