/*
 * @Author: wentliao
 * @Date: 2021-08-04 14:50:32
 * @Description: AEKO详情页-封面表态相关接口
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PARTS)

// 获取封面表态详情
export function getCoverDetail(params) {
    return requst({
        url: '/aeko/cover-detail',
        method: 'GET',
        params,
    })
}

// linie分页查询
export function getLiniePage(params) {
    return requst({
        url: '/aeko/cover-detail-cost-linie-dimension-page',
        method: 'GET',
        params,
    })
}


// 封面表态详情 linie视角
export function getLinieCoverDetail(params) {
    return requst({
        url: '/aeko/linie_cover-detail',
        method: 'GET',
        params,
    })
}

// 查询本部门下的前期采购员
export function getFsUser(params) {
    return requst({
        url: '/aeko/fs-user',
        method: 'GET',
        params,
    })
}

// 保存封面表态数据
export function coverSave(data) {
    return requst({
        url: '/aeko/cover/save',
        method: 'POST',
        data,
    })
}

// 提交封面表态数据
export function coverSubmit(data) {
    return requst({
        url: '/aeko/cover/submit',
        method: 'POST',
        data,
    })
}

// 解冻弹窗获取需要冻结的LINIE
export function frozenLinies(params) {
    return requst({
        url: `/aeko/cover/frozenLinies/${params.aekoManageId}`,
        method: 'GET',
        params,
    })
}

// 封面表态-解冻  
export function thawConvers(data) {
    return requst({
        url: '/aeko/cover/thawConvers',
        method: 'POST',
        data,
    })
}

// 封面表态--撤回
export function coverCancel(data) {
    return requst({
        url: `/aeko/cover/cancel/${data.aekoCoverId}`,
        method: 'POST',
        data,
    })
}

//封面表态---检测
// requirementAekoId  AEKO --
export function checkAekoContentSubmitState(requirementAekoId) {
    let data = {requirementAekoId: requirementAekoId}
    return requst({
        url: `/aeko/cover/submitWithContent`,
        method: 'POST',
        data,
    })
}

// 封面表态--取消通过
export function cancelPass(aekoManageId) {
    return requst({
        url: `/aeko/cancelMeetingApproval/${aekoManageId}`,
        method: 'POST',
    })
}