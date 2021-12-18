/*
 * @Date: 2021-11-16 11:06:01
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-10 17:42:22
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
const requstApi = axios(process.env.VUE_APP_POWEBI_KPI + '/api/aon')
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
// 下载下载列表了
export function udDownWithName(parmars) {
    return requstFile({
        url: `/udDownWithName?fileName=${parmars.fileName }&fileIds=${[parmars.fileIds ]}`,
        method: 'GET',
     
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
// 加入报告清单
export function reportUserDownload(parmars) {
    return requstApi({
        url: '/reportUserDownload',
        method: 'POST',
        data: parmars
    })
}

// 删除报告清单
export function reportDelete(parmars) {
    return requstApi({
        url: 'report/delete',
        method: 'POST',
        data: parmars
    })
}

// 移出报告清单
export function reportRemove(parmars) {
    return requstApi({
        url: '/reportUserDownload',
        method: 'DELETE',
        data: parmars
    })
}
// 查看报告清单下载列表
export function reportDownList(parmars) {
    return requstApi({
        url: '/reportUserDownload/'+store.state.permission.userInfo.id,
        method: 'GET',
    })
}



