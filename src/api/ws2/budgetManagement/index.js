import axios from '@/utils/axios'

const CARTYPE = axios(process.env.VUE_APP_TOOLING  + '/cartype')

/*零件清单*/

//获取车型列表
export function findCartypePro(parmars) {
    return CARTYPE({
        url: '/findCartypePro',
        method: 'POST',
        data: parmars
    })
}
