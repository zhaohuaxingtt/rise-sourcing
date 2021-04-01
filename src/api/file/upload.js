import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_COMMON)

export function uploadFile(parmars) {
    return requst({
        url: '/upload',
        method: 'POST',
        data: parmars
    })
}