import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMCONFIRMTASK = axios(process.env.VUE_APP_BMCONFIRMTASK)
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


