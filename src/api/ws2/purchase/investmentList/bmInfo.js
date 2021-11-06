/*
 * @Author: your name
 * @Date: 2021-09-22 15:53:20
 * @LastEditTime: 2021-11-06 13:07:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\api\ws2\purchase\investmentList\bmInfo.js
 */
import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMMOLD = axios(process.env.VUE_APP_TOOLING + '/bmMold')
const VUE_APP_BMAPPROVE = axios(process.env.VUE_APP_TOOLING + '/bm')
const BMMOLDFile = axiosFile(process.env.VUE_APP_TOOLING + '/bmMold')
//bm单流水号查看详情
export function moldHeaderByBmSerial(parmars) {
    return VUE_APP_BMMOLD({
        url: '/moldHeaderByBmSerial',
        method: 'GET',
        params: parmars
    })
}

//资产分类编号集合
export function assetTypes(parmars) {
    return VUE_APP_BMMOLD({
        url: '/assetTypes',
        method: 'GET',
        params: parmars
    })
}

//工艺类型集合
export function craftTypes(parmars) {
    return VUE_APP_BMMOLD({
        url: '/craftTypes',
        method: 'GET',
        params: parmars
    })
}

//模具投资清单视图列表
export function findMoldViewList(data) {
    return VUE_APP_BMMOLD({
        url: '/findMoldViewList',
        method: 'POST',
        data: data
    })
}

//导出模具投资清单视图列表
export function bmMoldExport(data) {
    return BMMOLDFile({
        url: '/export4buyer',
        method: 'POST',
        data: data
    })
}
//模具投资清单采购员确认
export function bmBuberConfirm(data) {
    return VUE_APP_BMAPPROVE({
        url: '/bmBuberConfirm',
        method: 'POST',
        data: data
    })
}

