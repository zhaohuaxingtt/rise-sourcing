import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_RFQ)
const nego = axios(process.env.VUE_APP_NEGO)
const quotation = axios(process.env.VUE_APP_SUPPLIER_CBHUIZ)

import { serialize } from "@/utils"
/*零件清单*/

//获取零件采购列表。
// export function getPartSrcPrjs(parmars) {
//     return requst({
//         url: '/part-src-prjs',
//         method: 'GET',
//         params: parmars
//     })
// }

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
        // url: '/supplier/getAllAnnex',
        url: '/supplier/getAnnexPage', // 之前接口没分页 换个分页接口
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
// export function getModelBudgetList(parmars) {
//     return requst({
//         url: '/modelbudget/getModelBudgetList',
//         method: 'POST',
//         data: parmars
//     })
// }
// 模具预算申请
export function getModelBudgetList(params, rfqIds) {
    return requst({
        url: `/mould-budget/${ params.currPage }/${ params.pageSize }?${ serialize(rfqIds, Array) }`,
        method: 'GET'
    })
}

export function submitMoldBudget(parmars) {
    return requst({
        url: '/modelbudget/submitMoldBudget',
        method: 'POST',
        data: parmars
    })
}

// 提交/撤回 模具预算
export function patchMouldBudget(params) {
    return requst({
        url: "/mould-budget",
        method: "PATCH",
        data: params
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
export function getAllRfqParts(rfqid) {
    return requst({
        url: `/purchasing-project-parts/${rfqid}/list`,
        method: 'POST'
    })
}


export function getAllRfqSupplier(parmars) {
    return requst({
        url: `/bdl/listSupplierByRfqId/${parmars}`,
        method: 'get'
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
        url: '/technology/listPic',
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
        url: `/rfq-round/notifySuppliers/${rfqId}`,
        method: 'GET',
    })
}

// 获取评分部门列表
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
        url: '/supplier/setRaterAndCoordinatorByDepartmentId',
        method: 'POST',
        data: params
    })
}

// 获取评分部门
// export function getRaterAndCoordinatorByDepartmentId(params) {
//     return requst({
//         url: '/supplier/getRaterAndCoordinatorByDepartmentId',
//         method: 'POST',
//         data: params
//     })
// }

// 推送评分任务
export function sendTaskForRating(params) {
    return requst({
        url: '/supplier/sendTaskForRating',
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

//报价分析-获取时间节点
export function getTimeLine(quotationId=1,rfqId){
    return requst({
        url: `/rfq-time-axis/${rfqId}`,
        method: 'GET'
    })
}

//报价分析-轮次下拉结果
export function negoAnalysisSummaryRound(rfqId){
    return nego({
        url: `/nego-assistant/nego-analysis-summary-round/${rfqId}`,
        method: 'GET'
    })
}

//报价分析-获取场景布局
export function negoAnalysisSummaryLayout(layoutType,scenarioType){
    return nego({
        url: `/nego-assistant/nego-analysis-summary-layout/${scenarioType}/${layoutType}`,
        method: 'GET'
    })
}
// 获取供应商生产地
export function getSupplierProducePlace(params) {
    return requst({
        url: `/supplier/getSupplierProducePlace/${ params.supplierId }`,
        method: 'GET'
    })
}

//报价分析-保存场景布局
export function negoAnalysisSummaryLayoutSave(layout,layoutType){
    return nego({
        url: `/nego-assistant/nego-analysis-summary-layout`,
        method: 'POST',
        data:{
            layout:layout,
            layoutType:layoutType,
            scenarioType:1
        }
    })
}

//报价分析-fs横轴
export function fsPartsAsRow(rfqId,round){
    return nego({
        url: `/nego-assistant/nego-analysis-summary/fs-parts-as-row/${rfqId}/${round}`,
        method: 'GET'
    })
}
export function gsPartsAsRow(rfqId,round){
    return nego({
        url: `/nego-assistant/nego-analysis-summary/gs-parts-as-row/${rfqId}/${round}`,
        method: 'GET'
    })
}

//报价分析-供应商轴
export function fsSupplierAsRow(rfqId,round){
    return nego({
        url: `/nego-assistant/nego-analysis-summary/fs-supplier-as-row/${rfqId}/${round}`,
        method: 'GET'
    })
}
//分析报价-组合
export function negoAnalysisSummaryGroup(data){
    return nego({
        url: `/nego-assistant/nego-analysis-summary-group`,
        method: 'POST',
        data:data
    })
}

//分析报价-组合
export function negoAnalysisSummaryGroupDelete(data){
    return nego({
        url: `/nego-assistant/nego-analysis-summary-group`,
        method: 'DELETE',
        data:data
    })
}


// 获取对应供应商的零件清单
export function getPartsBySupplier(params) {
    return requst({
        url: `/km/page/suppliers`,
        method: 'POST',
        data: params
    })
}

// 发送KM
export function sendKm(params) {
    return requst({
        url: `/km/send`,
        method: 'POST',
        data: params
    })
}

// 撤回发送KM
export function cancelKm(params) {
    return requst({
        url: `/cancelKm`,
        method: 'POST',
        data: params
    })
}
// 撤回发送KM
export function negoScoreReport(reqId) {
    return quotation({
        url: `/nego-assistant/nego-score-report/${reqId}`,
        method: 'GET'
    })
}


// 批量更新供应商生产地
export function updateBatchSupplierProducePlace(params) {
    return requst({
        url: '/supplier/updateBatchSupplierProducePlace',
        method: 'PUT',
        data: params
    })
}


//根据供应商查询其中报价单的状态

// 撤回发送KM
export function hasShowDelegate(params) {
    return quotation({
        url: `/quotation/hasShowDelegate/${params.rfqId}/${params.round}/${params.supplierId || 1}`,
        method: 'GET'
    })
}

// 根据部门类型获取评分部门、评分人、协调人
export function findRateDeptInfo(params) {
    return requst({
        url: `/rfq-bdl-ratings/findRateDeptInfo/${ params.rateTag }`,
        method: 'GET'
    })
}

// 获取目标价
export function getCfPrice(params) {
    return requst({
        url: `/cf-price/${ params.rfqId }/${ params.pageSize }/${ params.currPage }`,
        method: 'GET'
    })
}

// 移除RFQ下的零件采购项目
export function deleteRfqPart(params) {
    return requst({
        url: `/rfq-part/delete`,
        method: 'POST',
        data: params
    })
}

// 零件评分
export function getAllParts(params) {
    return requst({
        url: `/supplier/${ params.rfqId }/${ params.supplierId }/getAllParts`,
        method: 'GET'
    })
}

// 获取未选择的BDL列表
export function unselectRfqBdlPage(params) {
    return requst({
        url: `/bdl/pageUnSelectRfqBdl`,
        method: 'POST',
        data: params
    })
}

// 添加BDL
export function addRfqBdl(params) {
    return requst({
        url: `/bdl/addRfqBdl`,
        method: 'POST',
        data: params
    })
}

// 获取已选择的BDL列表
export function rfqBdlPage(params) {
    return requst({
        url: `/bdl/pageRfqBdl`,
        method: 'POST',
        data: params
    })
}

// 删除BDL
export function deleteRfqBdl(params) {
    return requst({
        url: `/bdl/deleteRfqBdl`,
        method: 'POST',
        data: params
    })
}

// 引用询价轮次报价
export function quoteInquiryPrice(params) {
    return requst({
        url: `/part/quoteInquiryPrice/${ params.rfqId }`,
        method: 'GET',
    })
}