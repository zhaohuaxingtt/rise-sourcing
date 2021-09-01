import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMCHANGE = axios(process.env.VUE_APP_BMCHANGE)
const VUE_APP_BMMOLD = axios(process.env.VUE_APP_BMMOLD)
const BMMOLDFile = axiosFile(process.env.VUE_APP_BMMOLD)
const common = axios(process.env.VUE_APP_BASE_UPLOAD_API);

//变更单详情-基础信息【专业采购员】
export function basicsInfo(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/basicsInfo',
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

//变更单详情-附件【专业采购员】
export function attachment(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/attachment',
        method: 'GET',
        params: parmars
    })
}

//获取模具ID
export function getMoldId(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/getMoldId',
        method: 'GET',
        params: parmars
    })
}

//总成零件号集合
export function assemblyParts(parmars) {
    return VUE_APP_BMMOLD({
        url: '/assemblyParts',
        method: 'GET',
        params: parmars
    })
}

//共享零件号集合
export function shareParts(parmars) {
    return VUE_APP_BMMOLD({
        url: '/shareParts',
        method: 'GET',
        params: parmars
    })
}

//变更单详情-模具列表【专业采购员】
export function mouldList(data) {
    return VUE_APP_BMCHANGE({
        url: '/mouldList',
        method: 'POST',
        data: data
    })
}

//删除附件
export function removeAttachment(data) {
    return VUE_APP_BMCHANGE({
        url: '/removeAttachment',
        method: 'POST',
        data: data
    })
}

// 公共上传
export function upLoadFileByIds(data) {
    return common({
        url: '/udMutilfiles',
        method: "POST",
        data: data
    })
}

// 后端上传
export function attachmentUpload(data) {
    return VUE_APP_BMCHANGE({
        url: '/attachmentUpload',
        method: "POST",
        data: data
    })
}

// 保存模具变更任务
export function saveChange(data) {
    return VUE_APP_BMCHANGE({
        url: '/saveChange',
        method: "POST",
        data: data
    })
}

// 变更单重置
export function reset(data) {
    return VUE_APP_BMCHANGE({
        url: '/reset',
        method: "POST",
        params: data
    })
}