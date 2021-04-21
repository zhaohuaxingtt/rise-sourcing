import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_WS2)

/*零件清单*/

export function getCartypePulldown(parmars) {
    return requst({
        url: '/web/buildInvestment/getCartypePulldown',
        method: 'GET',
        params: parmars
    })
}
export function findProjectTypeDetailPulldown(parmars) {
    return requst({
        url: '/web/buildInvestment/findProjectTypeDetailPulldown',
        method: 'GET',
        params: parmars
    })
}
export function findInvestmentBuild(parmars) {
    return requst({
        url: '/web/buildInvestment/findInvestmentBuild',
        method: 'POST',
        data: parmars
    })
}
