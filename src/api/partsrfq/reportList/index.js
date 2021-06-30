/**
 * @Author: shujie
 * @createTime: 2021-6-28 10:43:43 
 * @Description:报告清单
 */

import axios from '@/utils/axios'
import store from "@/store";

const requst = axios(process.env.VUE_APP_AON)

// 查询-报告清单
export function reportList(parmars) {
    return requst({
        url: '/report/list',
        method: 'POST',
        data: parmars
    })
}
