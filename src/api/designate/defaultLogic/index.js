/*
 * @Author: Luoshuang
 * @Date: 2021-06-03 17:38:33
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-04 19:26:06
 * @Description: 
 * @FilePath: \front-web\src\api\designate\defaultLogic\index.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SUPPLIER_TYP)

// 获取预设规则列表数据
export function getNominateRulesList(params) {
  return requst({
    url: '/typeRules/findNominateTypeRulesPage',
    method: "GET",
    params: params
  })
}

// 删除预设规则
export function deleteNominateRules(params) {
  return requst({
    url: '/typeRules/delNominateTypeRules',
    method: 'POST',
    data: params
  })
}

// 添加或更新预设规则
export function addNominateRules(params) {
  return requst({
    url: '/typeRules/addNominateTypeRules',
    method: 'POST',
    data: params
  })
}

// 获取预设规则详情
export function findNominateRule(nomiRulesId) {
  return requst({
    url: `/typeRules/findNominateTypeRulesInfo?nomiRulesId=${nomiRulesId}`,
    method: 'GET'
  })
}

// 获取燃料类型列表
export function findFuelTypeList(partTermType) {
  return requst({
    url: '/typeRules/findFuelTypeList?partTermType='+partTermType,
    method: 'GET'
  })
}