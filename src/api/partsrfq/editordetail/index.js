import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_RFQ)

/*供应商评分*/
export function getAllSupplier(parmars) {
    return requst({
        url: '/api/supplier/getAllSupplier',
        method: 'POST',
        data: parmars
    })
}

export function getAllAnnex(parmars) {
    return requst({
        url: '/api/supplier/getAllAnnex',
        method: 'POST',
        data: parmars
    })
}

export function deleteAnnex(parmars) {
    return requst({
        url: '/api/supplier/deleteAnnex',
        method: 'POST',
        data: parmars
    })
}

export function setTpbMemo(parmars) {
    return requst({
        url: '/api/supplier/setTpbMemo',
        method: 'POST',
        data: parmars
    })
}

export function uploadRfqAnnex(parmars) {
    return requst({
        url: '/api/supplier/uploadRfqAnnex',
        method: 'POST',
        data: parmars
    })
}


/*模具预算申请*/
export function getModelBudgetList(parmars) {
    return requst({
        url: '/api/modelbudget/getModelBudgetList',
        method: 'POST',
        data: parmars
    })
}

export function submitMoldBudget(parmars) {
    return requst({
        url: '/api/modelbudget/submitMoldBudget',
        method: 'POST',
        data: parmars
    })
}

export function cancelMoldBudget(parmars) {
    return requst({
        url: '/api/modelbudget/cancelMoldBudget',
        method: 'POST',
        data: parmars
    })
}

export function getSupplierAllParts(parmars) {
    return requst({
        url: '/api/supplier/getAllParts',
        method: 'POST',
        data: parmars
    })
}

/*技术交底会*/
export function getAllRfqParts(parmars) {
    return requst({
        url: '/api/technology/getAllRfqParts',
        method: 'POST',
        data: parmars
    })
}


export function getAllRfqSupplier(parmars) {
    return requst({
        url: '/api/technology/getAllRfqSupplier',
        method: 'POST',
        data: parmars
    })
}

export function addTechnology(parmars) {
    return requst({
        url: '/api/technology/addTechnology',
        method: 'POST',
        data: parmars
    })
}

export function getPic(parmars) {
    return requst({
        url: '/api/technology/getPic',
        method: 'POST',
        data: parmars
    })
}

//getBdl
export function getBdlList(parmars){
    return requst({
        url: '/api/rfqs/findByRfqs',
        method: 'POST',
        data: {
            otherInfoPackage:parmars
        }
    })
}