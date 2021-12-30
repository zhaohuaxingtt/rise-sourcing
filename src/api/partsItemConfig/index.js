/*
 * @Author: wentliao
 * @Date: 2021-12-30 16:16:29
 * @Description: 零件采购项目类型配置
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SOURCING)

// 获取配置数据
export function getPartCheck(params) {
    return requst({
        url: '/part-check',
        method: 'GET',
        params,
    })
}

// 保存配置
export function savePartCheck(data) {
    return requst({
        url: '/part-check',
        method: 'POST',
        data,
    })
}

