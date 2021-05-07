import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_WS2)

/*零件清单*/

//获取车型列表
export function findCartypePro(parmars) {
    return requst({
        url: '/web/cartype/findCartypePro',
        method: 'GET',
        params: parmars
    })
}
