/*
 * @Date: 2021-11-16 11:06:01
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-10 15:08:46
 * @FilePath: \德勤项目\front-sourcing-new\src\api\partsrfq\reportList\index.js
 */
/**
 * @Author: shujie
 * @createTime: 2021-6-28 10:43:43 
 * @Description:报告清单
 */

import axios from '@/utils/axios'
import store from "@/store";

const requst = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')
const requstFile = axios(process.env.VUE_APP_BASE_UPLOAD_API )
// const chrequst = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')
// 查询-报告清单
export function reportList(parmars) {
    return requst({
        url: '/report/list',
        method: 'POST',
        data: parmars
    })
}
// 上传pdf
export function udMutilfiles(parmars) {
    return requstFile({
        url: '/udMutilfiles',
        method: 'POST',
        data: parmars
    })
}
// 保存报告清单
export function reportAdd(parmars) {
    return requst({
        url: '/report/add',
        method: 'POST',
        data: parmars
    })
}


