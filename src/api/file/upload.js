import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_COMMON)
const fileRequst = axios(process.env.VUE_APP_NEW_COMMON)

export function uploadFile(parmars) {
    return requst({
        url: '/upload',
        method: 'POST',
        data: parmars
    })
}

// 批量下载
export function downloadFiles(params) {
    return requst({
        url: `/download`,
        method: 'GET',
        params
    })
}

export function uploadUdFile(params) {
    return fileRequst({
        url: `/fileud/udMutilfilesController`,
        method: 'POST',
        data: params
    })
}