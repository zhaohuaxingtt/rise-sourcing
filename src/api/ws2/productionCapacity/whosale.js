import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'
const pushOrderRequestExcel = axiosFile(process.env.VUE_APP_PRICELEDGER)
const request = axios(process.env.VUE_APP_PRICELEDGER )
//导出模板
export function exportTemp(data) {
    return pushOrderRequestExcel({
        url: `/wholesale/exportTemp`,
        method: 'POST',
        data
    })
}
//查询列表经销价
export function findPriceList(data) {
    return request({
        url: `/wholesale/findPriceList`,
        method: 'POST',
        data
    })
}
//导入
export function importFile(data) {
    return request({
        url: `/wholesale/import`,
        method: 'POST',
        data
    })
}
//查询
export function pageWhosalePrice(data) {
    return request({
        url: `/wholesale/pageWhosalePrice`,
        method: 'POST',
        data
    })
}