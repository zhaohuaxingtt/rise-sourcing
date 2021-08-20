/*
 * @Author: your name
 * @Date: 2021-05-25 21:01:30
 * @LastEditTime: 2021-08-20 13:56:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\data.js
 */

export const timeList = [
  {
    week:1,
    name:'第一轮询价',
    key: 'DIYILUNXUNJIA',
    query: {
      taskStatus: 'quotationStatus',
      doneWeek: 'quotationFinishTime',
      planWeek: 'quotationPlanTime'
    },
    active:true
  },
  {
    week:3,
    key: 'LK_ZHUANTANPANS',
    name:'转谈判',
    query: {
      taskStatus: 'negoStatus',
      doneWeek: 'negoFinishTime',
      planWeek: 'negoPlanTime'
    },
  },
  {
    week:3,
    key: 'EPPINGFEN',
    name: 'EP评分',
    query: {
      taskStatus: 'epScoreStatus',
      doneWeek: 'epScoreFinishTime',
      planWeek: 'epScorePlanTime'
    },
  },
  {
    week:3,
    key: 'MQPINGFEN',
    name: 'MQ评分',
    query: {
      taskStatus: 'mqScoreStatus',
      doneWeek: 'mqScoreFinishTime',
      planWeek: 'mqScorePlanTime'
    },
  },
  {
    week:3,
    key: 'LK_CAIWUMUBIAOJIA',
    name: '财务目标价',
    query: {
      taskStatus: 'financeStatus',
      doneWeek: 'financeFinishTime',
      planWeek: 'financePlanTime'
    },
  },
  {
    week:6,
    key: 'LK_BNKSHENGHE',
    name:'BNK审核',
    query: {
      taskStatus: 'bnkStatus',
      doneWeek: 'bnkFinishTime',
      planWeek: 'bnkPlanTime'
    },
  },
  {
    week:8,
    key: 'TIJIAOPRECSCTIJIAOLIUZHUAN',
    name:'提交Pre-CSC/提交流转',
    long: true,
    query: {
      taskStatus: 'preCscStatus',
      doneWeek: 'preCscFinishTime',
      planWeek: 'preCscPlanTime'
    },
  },
  {
    week:12,
    key: 'CSCTONGGUOLIUZHUANWANCHENG',
    name:'CSC通过/流转完成',
    long: true,
    query: {
      taskStatus: 'cscStatus',
      doneWeek: 'cscFinishTime',
      planWeek: 'cscPlanTime'
    },
  }
]


export const iconList_car = { //汽车图标
  'a2':{
    icon:'iconbaojiafenxi-zhengchejindu-cheng' //橙色
  },
  'a6':{
    icon:'icondingdianguanlijiedian-jinhangzhong' //蓝色
  },
  'a3':{
    icon:'iconbaojiafenxi-zhengchejindu-hong' //红色
  },
  'a1':{
    icon:'iconbaojiafenxi-zhengchejindu-huang1' //黄色浅黄
  },
  'a4':{
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
    icon:'iconbaojiapingfengenzong-jiedian-hui' //灰色
  },
  'a4':{
    icon:'iconbaojiapingfengenzong-jiedian-cheng' //橙色
  },
  'a5': {
    icon: 'iconzhuanxiangfenxigongju-landian' //蓝色
  },
  'a6': {
    icon: 'iconzhuanxiangfenxigongju-landian' //蓝色
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
      temlateData.name = items.rateTableHeadDetailVO.rateDepartName
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
