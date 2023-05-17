import axios from "@/utils/axios"

const request = axios(process.env.VUE_APP_SOURCING)

const requestMTZ = axios(process.env.VUE_APP_MTZ + '/web/mtz')

// 获取M签字单待审批列表
export function getPendingApproval(data) {
    return request({
        url: `/nominate/sign/signWaitApprovePage`,
        method: "post",
        data
    })
}

// 待审批-part列表
export function signAppPartPage(data) {
    return request({
        url: `/nominate/sign/signAppPartPage`,
        method: "post",
        data
    })
}

// 待审批-mtz列表
export function signAppMtzPage(data) {
    return request({
        url: `/nominate/sign/signAppMtzPage`,
        method: "post",
        data
    })
}

// 定点管理员-删除定点申请单-草稿状态、或者审批驳回
export function deleteSignDoc(data) {
    return request({
        url: `/nominate/sign/deleteSignDoc`,
        method: "post",
        data
    })
}

// 定点管理员-移除签字单中的定点申请单-拒绝状态
export function removeSignApp(data) {
    return request({
        url: `/nominate/sign/removeSignApp`,
        method: "post",
        data
    })
}

// 总经理-审批
export function signApprove(data) {
    return request({
        url: `/nominate/sign/signApprove`,
        method: "post",
        data
    })
}

// 总经理-已审批列表分页
export function signAppApprovedPage(data) {
    return request({
        url: `/nominate/sign/signAppApprovedPage`,
        method: "post",
        data
    })
}

// 总经理-审批-签字单-导出定点申请单详情
export function signDocExport(data) {
    return request({
        url: `/nominate/sign/signDocExport`,
        method: "post",
        data
    })
}


// ==================== MTZ 
export function getAppFormInfo(parmars) {
    //获取审批流id
    return requestMTZ({
        url: '/mtzAppNomi/getAppFormInfo',
        method: 'POST',
        data: parmars
    })
}

export function pageAppRule(parmars) {
    //维护MTZ原材料规则-分页查询
    return requestMTZ({
        url: '/mtzAppNomi/pageAppRule',
        method: 'POST',
        data: parmars
    })
}

export function pagePartMasterData(parmars) {
    //维护MTZ零件主数据-分页查询
    return requestMTZ({
        url: '/mtzAppNomi/pagePartMasterData',
        method: 'POST',
        data: parmars
    })
}

export function approvalList(params) {
    //用量单位下拉
    return requestMTZ({
        url: '/mtzAppNomiDecisionData/approvalList',
        method: 'POST',
        data: params
    })
}