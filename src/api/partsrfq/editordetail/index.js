import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_RFQ)

/*零件清单*/

//获取零件采购列表。
export function getPartSrcPrjs(parmars) {
    return requst({
        url: '/part-src-prjs',
        method: 'GET',
        params: parmars
    })
}

/*供应商评分*/
export function getAllSupplier(parmars) {
    return requst({
        url: '/supplier/getAllSupplier',
        method: 'POST',
        data: parmars
    })
}

export function getAllAnnex(parmars) {
    return requst({
        url: '/supplier/getAllAnnex',
        method: 'POST',
        data: parmars
    })
}

export function deleteAnnex(parmars) {
    return requst({
        url: '/supplier/deleteAnnex',
        method: 'POST',
        data: parmars
    })
}

export function setTpbMemo(parmars) {
    return requst({
        url: '/supplier/setTpbMemo',
        method: 'POST',
        data: parmars
    })
}

export function uploadRfqAnnex(parmars) {
    return requst({
        url: '/supplier/uploadRfqAnnex',
        method: 'POST',
        data: parmars
    })
}


/*模具预算申请*/
export function getModelBudgetList(parmars) {
    return requst({
        url: '/modelbudget/getModelBudgetList',
        method: 'POST',
        data: parmars
    })
}

export function submitMoldBudget(parmars) {
    return requst({
        url: '/modelbudget/submitMoldBudget',
        method: 'POST',
        data: parmars
    })
}

export function cancelMoldBudget(parmars) {
    return requst({
        url: '/modelbudget/cancelMoldBudget',
        method: 'POST',
        data: parmars
    })
}

export function getSupplierAllParts(parmars) {
    return requst({
        url: '/supplier/getAllParts',
        method: 'POST',
        data: parmars
    })
}

/*技术交底会*/
export function getAllRfqParts(parmars) {
    return requst({
        url: '/technology/getAllRfqParts',
        method: 'POST',
        data: parmars
    })
}


export function getAllRfqSupplier(parmars) {
    return requst({
        url: '/technology/getAllRfqSupplier',
        method: 'POST',
        data: parmars
    })
}

export function addTechnology(parmars) {
    return requst({
        url: '/technology/addTechnology',
        method: 'POST',
        data: parmars
    })
}

export function getPic(parmars) {
    return requst({
        url: '/technology/getPic',
        method: 'POST',
        data: parmars
    })
}

//getBdl
export function getBdlList(parmars) {
    return requst({
        url: '/rfqs/findByRfqs',
        method: 'POST',
        data: {
            otherInfoPackage: parmars
        }
    })
}

// 更新rfq相关bdl
export function updateRfq(params) {
    return requst({
        url: '/rfqs/updateRfq',
        method: 'PATCH',
        data: params
    })
}

// 询价附件
export function notifySuppliers(rfqId) {
    return requst({
        url: `/rfqs/notifySuppliers/${rfqId}`,
        method: 'GET',
    })
}

// 获取评分部门
export function getAllScoringDepartmentInfo(params) {
    return requst({
        url: '/supplier/getAllScoringDepartmentInfo',
        method: 'POST',
        data: params
    })
}

// 设置评分部门
export function setRaterAndCoordinatorByDepartmentId(params) {
    return requst({
        url: '/supplier/getAllScoringDepartmentInfo',
        method: 'POST',
        data: params
    })
}

//获取供应商接口，tpb模块。
export function getRaterAndCoordinatorByDepartmentId(data){
    return requst({
        url: '/supplier/getRaterAndCoordinatorByDepartmentId',
        method: 'POST',
        data: data
    })
}