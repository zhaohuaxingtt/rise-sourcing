/*
 * @Author: wentliao
 * @Date: 2021-12-31 11:07:07
 * @Description: 质量评分预设规则
 */
import axios from "@/utils/axios"
const requst = axios(process.env.VUE_APP_SOURCING)

// 获取所有质量评分预设规则
export function getAllMqRules(data) {
    return requst({
        url: "/rfq-rate-departs/listMqRules",
        method: "POST",
        data,
    })
}

// 获取划定的评分部门信息
export function getListSysRateDepart(data) {
    return requst({
      url: "/rfq-rate-departs/listSysRateDepart",
      method: "POST",
      data,
    })
}

// 设置质量评分预设规则
export function setMqRules(data) {
    return requst({
        url: "/rfq-rate-departs/setMqRule",
        method: "POST",
        data,
    })
}

// 删除质量评分预设规则 
export function deleteMqRulesByIdList(data) {
    return requst({
        url: "/rfq-rate-departs/deleteMqRulesByIdList",
        method: "POST",
        data,
    })
}