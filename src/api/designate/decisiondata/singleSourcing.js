/*
 * @Author: wentliao
 * @Date: 2021-06-03 19:34:39
 * @Description: 定点申请的tab ---- singleSourcing
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

// 获取详情
export function getSingleSourcing(params) {
    return requst({
        url: '/exclusiveSupplier/singleSourcingTabPage',
        method: "GET",
        params,
    })
  }