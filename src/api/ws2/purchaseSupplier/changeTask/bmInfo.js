/*
 * @Author: your name
 * @Date: 2021-09-22 15:53:20
 * @LastEditTime: 2021-11-06 13:27:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\api\ws2\purchaseSupplier\changeTask\bmInfo.js
 */
import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMCHANGE = axios(process.env.VUE_APP_TOOLING + '/bmChange')
const VUE_APP_BMAPPROVE = axios(process.env.VUE_APP_TOOLING + '/bm')
const BMMOLDFile = axiosFile(process.env.VUE_APP_TOOLING + '/bmMold')
const common = axios(process.env.VUE_APP_BASE_UPLOAD_API);

//变更单详情-基础信息【供应商】
export function basicsInfoSupplier(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/basicsInfoSupplier',
        method: 'GET',
        params: parmars
    })
}

//工艺类型
export function craftTypes(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/craftTypes',
        method: 'GET',
        params: parmars
    })
}

//资产分类
export function assetTypes(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/assetTypes',
        method: 'GET',
        params: parmars
    })
}

//变更单详情-模具列表【专业采购员】
    export function mouldListSupplier(data) {
    return VUE_APP_BMCHANGE({
        url: '/mouldListSupplier',
        method: 'POST',
        data: data
    })
}

//供应商变更确认
    export function supplierToConfirm(bmId, bmChangeId) {
    return VUE_APP_BMCHANGE({
        url: `/supplierToConfirm/${bmId}/${bmChangeId}`,
        method: 'POST',
        data: ''
    })
}

// 保存模具变更任务
export function saveChange(data) {
    return VUE_APP_BMCHANGE({
        url: '/supplierSaveChange',
        method: "POST",
        data: data
    })
}

// 变更单重置
export function reset(data) {
    return VUE_APP_BMCHANGE({
        url: '/supplierReset',
        method: "POST",
        params: data
    })
}