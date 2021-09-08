import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMNEWCHANGE = axios(process.env.VUE_APP_BMNEWCHANGE)
const VUE_APP_BMCHANGE = axios(process.env.VUE_APP_BMCHANGE)
const VUE_APP_BMCHANGESUMMARY = axios(process.env.VUE_APP_BMCHANGESUMMARY)
const VUE_APP_BMCHANGESUMMARYFile = axiosFile(process.env.VUE_APP_BMCHANGESUMMARY)
//BM新增单变更车型下拉列表
export function bmNewChangeCarTypePullDown(parmars) {
    return VUE_APP_BMNEWCHANGE({
        url: '/bmNewChangeCarTypePullDown',
        method: 'GET',
        params: parmars
    })
}

//BM新增单变更科室下拉列表
export function bmViewDeptPullDown(parmars) {
    return VUE_APP_BMNEWCHANGE({
        url: '/bmViewDeptPullDown',
        method: 'GET',
        params: parmars
    })
}

//BM新增单变更linie下拉
export function bmViewLiniePullDown(parmars) {
    return VUE_APP_BMNEWCHANGE({
        url: '/bmViewLiniePullDown',
        method: 'GET',
        params: parmars
    })
}

//BM新增单变更模具投资清单状态下拉列表
export function bmViewMoldInvestmentListStatusPullDown(parmars) {
    return VUE_APP_BMNEWCHANGE({
        url: '/bmViewMoldInvestmentListStatusPullDown',
        method: 'GET',
        params: parmars
    })
}

//变更任务列表模具投资清单状态下拉
export function bmChangeMoldInvestmentListStatusPullDown(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/bmChangeMoldInvestmentListStatusPullDown',
        method: 'GET',
        params: parmars
    })
}

//变更任务列表车型下拉
export function bmChangeCarTypePullDown(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/bmChangeCarTypePullDown',
        method: 'GET',
        params: parmars
    })
}

//变更任务—科室下拉
export function bmChangeDeptPullDown(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/bmChangeDeptPullDown',
        method: 'GET',
        params: parmars
    })
}

//变更任务-变更单状态下拉
export function bmChangeStatusPullDown(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/bmChangeStatusPullDown',
        method: 'GET',
        params: parmars
    })
}

//变更任务—获取LINIE下拉信息；如deptId不为空，则为条件查询
export function bmChangeLiniePullDownByDept(data) {
    return VUE_APP_BMCHANGE({
        url: '/bmChangeLiniePullDownByDept',
        method: 'POST',
        data: data
    })
}

//获取变更任务列表
export function findBmChangePageList(data) {
    return VUE_APP_BMCHANGE({
        url: '/findBmChangePageList',
        method: 'POST',
        data: data
    })
}


//新增变更
export function addBmChangeList(data) {
    return VUE_APP_BMCHANGE({
        url: '/addBmChangeList',
        method: 'POST',
        data: data
    })
}

//变更任务-指派给自己
export function bmChangeAssignOneself(data) {
    return VUE_APP_BMCHANGE({
        url: '/bmChangeAssignOneself',
        method: 'POST',
        data: data
    })
}

//转派确认按钮
export function bmChangeAssign(data) {
    return VUE_APP_BMCHANGE({
        url: '/bmChangeAssign',
        method: 'POST',
        data: data
    })
}

//BM新增单变更分页列表
export function findBmNewChangePageList(data) {
    return VUE_APP_BMNEWCHANGE({
        url: '/findBmNewChangePageList',
        method: 'POST',
        data: data
    })
}

//查看变更单
export function show(params) {
    return VUE_APP_BMCHANGESUMMARY({
        url: '/show',
        method: 'GET',
        params: params,
    })
}

//预览变更单
export function preview(data) {
    return VUE_APP_BMCHANGESUMMARY({
        url: '/preview',
        method: 'POST',
        data: data,
    })
}

//供应商查看变更单
export function supplierShow(params) {
    return VUE_APP_BMCHANGESUMMARY({
        url: '/supplier/show',
        method: 'GET',
        params: params,
    })
}

//下载PDF文件
export function downPdf(data) {
    return VUE_APP_BMCHANGESUMMARYFile({
        url: '/downPdf',
        method: 'POST',
        data: data,
    })
}

//供应商预览变更单
export function supplierPreview(data) {
    return VUE_APP_BMCHANGESUMMARY({
        url: '/supplier/preview',
        method: 'POST',
        data: data,
    })
}


