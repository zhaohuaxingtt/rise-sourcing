/*
 * @Author: your name
 * @Date: 2021-07-19 13:57:20
 * @LastEditTime: 2023-04-07 18:12:00
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\editordetail\abprice.js
 */
import axios from '@/utils/axios'
const nego = axios(process.env.VUE_APP_SOURCING)
//ab价-fs横轴
export function fsPartsAsRow(mimoId){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/nomi-fs-parts-as-row/${mimoId}`,
      method: 'GET'
  })
}
//ab价-fs横轴
export function gsPartsAsRow(mimoId){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/nomi-gs-parts-as-row/${mimoId}`,
      method: 'GET'
  })
}
//报价分析-供应商轴
export function fsSupplierAsRow(nomiId='',round='',hideList=[]){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/analysisSummaryArrayNomi`,
      method: 'post',
      data:{
          hideList:hideList,
          rfqId:'',
          nomiId:nomiId,
          round:round
      }
  })
}

//supplier-横向
export function analysisSummaryNomi(data){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/supplier/analysisSummaryNomi`,
      method: 'post',
      data
  })
}
//Bar获取车型项目
export function analysisNomiCarProject(data){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/supplier/analysisNomiCarProject`,
      method: 'post',
      data
  })
}

// Line 获取rfq
export function getListRfq(nominateId){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/list-rfq/${nominateId}`,
      method: 'GET',
  })
}

// Line 根据rfqId获取折线图数据
export function getLine(nominateId, rfqId){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/quotation-line-chart/${nominateId}/${rfqId}`,
      method: 'GET',
  })
}

//Recommendation
export function getAnalysisRecommendationNomi(data){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/getAnalysisRecommendationNomi`,
      method: 'post',
      data
  })
}
// BestBall
export function getAnalysisBestBallNomi(data){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/getAnalysisBestBallNomi`,
      method: 'post',
      data
  })
}
// findNomiProject
export function findNomiProject(data){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/findNomiProject`,
      method: 'post',
      data
  })
}
// updateNomiProject
export function updateNomiProject(data){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/updateNomiProject`,
      method: 'post',
      data
  })
}

// 查询定点备注信息
export function getNomiRemark(nominateId){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/getNomiRemark/${nominateId}`,
      method: 'get',
  })
}

// 更新定点备注信息
export function updateNomiRemark(data){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/updateNomiRemark`,
      method: 'POST',
      data
  })
}

// 获取ab价表格配置
export function getList(data){
  return nego({
      url: `/business-operate/list`,
      method: 'post',
      data
  })
}
// 更新ab价表格配置
export function update(data){
  return nego({
      url: `/business-operate/update`,
      method: 'post',
      data
  })
}

// 获取GS横轴供应商场景
export function analysisSummaryNomiGS(data){
  return nego({
      url: `nego-assistant/nego-analysis-summary/gs-supplier/analysisSummaryNomi`,
      method: 'post',
      data
  })
}
// 获取定点GS横轴零件场景
export function gsParts(nomiId){
  return nego({
      url: `nego-assistant/nego-analysis-summary/gs-parts/${nomiId}`,
      method: 'get',
  })
}

// 获取定点申请有效报价
export function getNomiEffectiveQuotation(nomiId){
  return nego({
      url: `nego-assistant/nego-analysis-summary/getNomiEffectiveQuotation/${nomiId}`,
      method: 'get',
  })
}