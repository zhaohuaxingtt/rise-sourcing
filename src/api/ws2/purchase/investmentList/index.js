import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMCONFIRMTASK = axios(process.env.VUE_APP_BMCONFIRMTASK)
const VUE_APP_BMAPPROVE = axios(process.env.VUE_APP_BMAPPROVE)
const INVESTMENTFile = axiosFile(process.env.VUE_APP_INVESTMENT)
//获取科室下拉信息
export function getDepartmentsCombo(parmars) {
    return VUE_APP_BMCONFIRMTASK({
        url: '/getDepartmentsCombo',
        method: 'GET',
        params: parmars
    })
}

//获取车型项目下拉框
export function carCombo(data) {
    return VUE_APP_BMCONFIRMTASK({
        url: '/carCombo',
        method: 'POST',
        data: data
    })
}

//模具投资清单状态下拉框
export function moldInvestmentStatusCombo(data) {
    return VUE_APP_BMCONFIRMTASK({
        url: '/moldInvestmentStatusCombo',
        method: 'POST',
        data: data
    })
}

//条件查询确认任务列表
export function conditionConfirmTskList(data) {
    return VUE_APP_BMCONFIRMTASK({
        url: '/conditionConfirmTskList',
        method: 'POST',
        data: data
    })
}

//获取LINIE下拉信息；如deptId不为空，则为条件查询
export function liniePullDownByDept(data) {
    return VUE_APP_BMCONFIRMTASK({
        url: '/liniePullDownByDept',
        method: 'POST',
        params: data
    })
}

//转派
export function assign(data) {
    return VUE_APP_BMCONFIRMTASK({
        url: '/assign',
        method: 'POST',
        data: data
    })
}

//指派给自己
export function assignOneself(data) {
    return VUE_APP_BMCONFIRMTASK({
        url: '/assignOneself',
        method: 'POST',
        data: data
    })
}

//发送供应商
export function sendSupplier(data) {
    return VUE_APP_BMCONFIRMTASK({
        url: '/sendSupplier',
        method: 'POST',
        data: data
    })
}

//发送供应商
export function verifyLine(parmars) {
    return VUE_APP_BMAPPROVE({
        url: '/verifyLine',
        method: 'GET',
        params: parmars
    })
}

//发送供应商
export function verifyIsSelfOrders(data) {
    return VUE_APP_BMAPPROVE({
        url: '/verifyIsSelfOrders',
        method: 'POST',
        data: data
    })
}


