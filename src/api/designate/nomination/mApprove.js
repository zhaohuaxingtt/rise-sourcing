import axios from "@/utils/axios"

const request = axios(process.env.VUE_APP_SOURCING)
const requestChip = axios(process.env.VUE_APP_MTZ + '/api')

// 获取M签字单待审批列表
export function getPendingApproval(data){
    return request({
        url: `/nominate/sign/signWaitApprovePage`,
        method: "post",
        data
    })
}

// 待审批-part列表
export function signAppPartPage(data){
    return request({
        url: `/nominate/sign/signAppPartPage`,
        method: "post",
        data
    })
}

// 待审批-mtz列表
export function signAppMtzPage(data){
    return request({
        url: `/nominate/sign/signAppMtzPage`,
        method: "post",
        data
    })
}

// 定点管理员-删除定点申请单-草稿状态、或者审批驳回
export function deleteSignDoc(data){
    return request({
        url: `/nominate/sign/deleteSignDoc`,
        method: "post",
        data
    })
}

// 定点管理员-移除签字单中的定点申请单-拒绝状态
export function removeSignApp(data){
    return request({
        url: `/nominate/sign/removeSignApp`,
        method: "post",
        data
    })
}

// 总经理-审批
export function signApprove(data){
    return request({
        url: `/nominate/sign/signApprove`,
        method: "post",
        data
    })
}

// 总经理-已审批列表分页
export function signAppApprovedPage(data){
    return request({
        url: `/nominate/sign/signAppApprovedPage`,
        method: "post",
        data
    })
}