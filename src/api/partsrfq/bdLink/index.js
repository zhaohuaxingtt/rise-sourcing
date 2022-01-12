import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')
const dictRequst = axios(process.env.VUE_APP_DIC)

export function queryBdLink(parmars) {
    return requst({
        url: '/bidLink/bidLinkPage',
        method: 'POST',
        data: parmars,
    })
}

export function getDictByCode(code) {
    return dictRequst({
        url: `/dict?code=${code}`,
        method: 'GET'
    })
}