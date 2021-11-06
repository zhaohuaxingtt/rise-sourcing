import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const INVESTMENTHISTORYPARTS = axios(process.env.VUE_APP_TOOLING  + '/investmentHistoryParts')
const VUE_APP_MODELCAR = axios(process.env.VUE_APP_MODELCAR)
const MODELCARFile = axiosFile(process.env.VUE_APP_MODELCAR)

//获取专业科室下拉列表
export function getInvestmentHistoryParts(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/getInvestmentHistoryParts',
        method: 'POST',
        data: parmars
    })
}
export function getInvestmentHistoryMaterial(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/getInvestmentHistoryMaterial',
        method: 'POST',
        data: parmars
    })
}
export function applyAmountDetail(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/applyAmountDetail',
        method: 'POST',
        data: parmars
    })
}
export function nomiAmountDetail(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/nomiAmountDetail',
        method: 'POST',
        data: parmars
    })
}
export function baAmountDetail(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/baAmountDetail',
        method: 'POST',
        data: parmars
    })
}
export function bmAmountDetail(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/bmAmountDetail',
        method: 'POST',
        data: parmars
    })
}
export function findByPage(parmars) {
    return VUE_APP_MODELCAR({
        url: '/findByPage',
        method: 'POST',
        data: parmars
    })
}
export function save(parmars) {
    return VUE_APP_MODELCAR({
        url: '/save',
        method: 'POST',
        data: parmars
    })
}
export function upload(parmars) {
    return VUE_APP_MODELCAR({
        url: '/upload',
        method: 'POST',
        data: parmars
    })
}
//下载
export function download(parmars) {
    return MODELCARFile({
        url: '/download',
        method: 'POST',
        data: parmars
    })
}
//下载
export function modelBagExport(parmars) {
    return MODELCARFile({
        url: '/export',
        method: 'POST',
        data: parmars
    })
}
export function getCardDetailPulldown(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/getCardDetailPulldown',
        method: 'GET',
        params: parmars
    })
}
export function packageFindByCarType(parmars) {
    return VUE_APP_MODELCAR({
        url: '/findByCarType',
        method: 'GET',
        params: parmars
    })
}
export function packageFindByPart(parmars) {
    return VUE_APP_MODELCAR({
        url: '/findByPart',
        method: 'GET',
        params: parmars
    })
}
