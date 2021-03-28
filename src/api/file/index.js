import axios from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_FILE)

export function downloadFile(parmars) {
    return requst({
        url: `/download?applicationName=${parmars.applicationName}&fileList=${parmars.fileList}`,
        method: 'GET'
    })
}
