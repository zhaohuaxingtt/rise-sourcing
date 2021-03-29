import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_FILE)

export function uploadFile(parmars) {
    return requst({
        url: '/upload',
        method: 'POST',
        data: parmars
    })
}