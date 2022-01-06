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
        url: "/rfq-rate-departs/getAllMqRules",
        method: "POST",
        data,
    })
}