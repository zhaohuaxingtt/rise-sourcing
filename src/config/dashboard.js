/*
 * @Author: your name
 * @Date: 2021-08-16 14:41:48
 * @LastEditTime: 2021-11-17 14:46:14
 * @LastEditors: Hao,Jiang
 * @Description: 寻源概览允许各版块接收的参数
 * @FilePath: /front-web/src/config/dashboard.js
 */

// 允许接收的参数
const acceptKeyArray = [
  // 零件签收
  ['currentUser', 'showSelf'],
  // 采购项目建立
  ['status','buyerName','linieName','currentUser','isDelay', 'showSelf'],
  // RFQ管理 未转谈判、待上会流转
  ['type','currentUser','isDelay'],
  // RFQ管理 时间轴
  ['type','currentUser','isDelay'],
  // 定点管理
  ['nominateProcessType', 'applicationStatus', 'currentUser', 'isDelay'],
  // 定点信
  ['status','linieName','csfCssName', 'currentUser', 'isDelay'],
  // LOI
  ['loiStatus','cardType','linieName','csfName','currentUser', 'isDelay']
]

export const acceptKeys = Array.from(new Set(acceptKeyArray.flat(Infinity)))
export const BooleanKeys = ['currentUser', 'isDelay', 'showSelf']