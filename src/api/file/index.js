import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_FILE)

export function downloadFile(parmars) {
    return requst({
        url: '/download',
        method: 'POST',
        data: parmars
    })
}
