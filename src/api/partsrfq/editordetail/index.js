import axios from '@/utils/axios'
import download from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SOURCING)
const nego = axios(process.env.VUE_APP_SOURCING)
const quotation = axios(process.env.VUE_APP_SOURCING)
const downLoad = download(process.env.VUE_APP_SOURCING)

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
// export function getModelBudgetList(params, rfqIds) {
//     return requst({
//         url: `/mould-budget/${ params.currPage }/${ params.pageSize }?${ serialize(rfqIds, Array) }`,
//         method: 'GET'
//     })
// }
export function getModelBudgetList(rfqId) {
    return requst({
        url: `/mould-budget/list/${rfqId}`,
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
//提交 模具预算
export function patchMouldBudgetSubmit(params) {
    return requst({
        url: "/mould-budget/submit",
        method: "PATCH",
        data: params
    })
}
//撤回 模具预算
export function patchMouldBudgetWithdrawal(params) {
    return requst({
        url: "mould-budget/withdrawal",
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
        url: '/supplier/sendRfqRatingTask',
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
        url: `/overview/timeAxis`,
        method: 'GET',
        params:{
            rfqId:rfqId
        }
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
export function negoAnalysisSummaryLayout(layoutType,scenarioType, hostId){
    return nego({
        url: `/nego-assistant/nego-analysis-summary-layout/${hostId}/${scenarioType}/${layoutType}`,
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

// 获取供应商工厂名称
export function getSupplierPlantBySupplierId(supplierId, options) {
    return requst({
        url: `/supplier/getSupplierPlantBySupplierId/${ supplierId }`,
        method: 'GET',
        ...options
    })
}

//报价分析-保存场景布局
export function negoAnalysisSummaryLayoutSave(layout,layoutType, hostId, scenarioType){
    return nego({
        url: `/nego-assistant/nego-analysis-summary-layout`,
        method: 'POST',
        data:{
            layout:layout,
            layoutType:layoutType,
            scenarioType,
            hostId: hostId
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
export function fsSupplierAsRow(rfqId='',round='',hideList=[]){
    return nego({
        url: `/nego-assistant/nego-analysis-summary/analysisSummaryArray`,
        //url: `https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/nego-assistant/nego-analysis-summary/fs-supplier-as-row`,
        method: 'post',
        data:{
            hideList:hideList,
            rfqId:rfqId,
            round:round
        }
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
        url: `/search-cf-price/${ params.rfqId }/${ params.pageSize }/${ params.currPage }`,
        method: 'GET'
    })
}

// 获取零件目标价
export function getCfPriceEffective(params) {
    return requst({
        url:`/cf-price-effective/${params.rfqId}/${params.pageSize}/${params.currPage}`,
        method: 'GET'
    })
}

// 获取模具目标价
export function getMJPriceEffective(params) {
    return requst({
        url:`/tooling-target-price-task/search-valid-target-price-page/${params.rfqId}`,
        method: 'POST',
        data:{
            current:params.currPage,
            size:params.pageSize,
        },
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

//当前rfq下 最新轮次供应商的排名情况
export function getPriceRank(params) {
    return requst({
        url: `/online-bidding/getPriceRank`,
        method: 'POST',
        data:params
    })
}

// 获取汇率
export function searchABPageExchangeRate(mimoId) {
    return requst({
      url: `/nominate/search-a-b-page-exchange-rate/${mimoId}`,
      method: 'POST'
    })
}
//导出excel
export function exportFSPartsAsRowTWO(rfqId,round,dataList) {
    return requst({
        url:`/nego-assistant/export-fs-parts-as-row/${rfqId}/${round}`,
        method:'POST',
        data:dataList
    })
}

//导出excel
export function exportFsSupplierAsRowTWO(rfqId,round,dataList) {
    return requst({
        url:`/nego-assistant/export-fs-supplier-as-row/${rfqId}/${round}`,
        method:'POST',
        data:dataList,
        responseType:'blob'
    })
}

//导出excel
export function exportGsPartsAsRowTWO(rfqId,round,dataList) {
    return requst({
        url:`/nego-assistant/export-gs-parts-as-row/${rfqId}/${round}`,
        method:'POST',
        data:dataList,
        responseType:'blob'
    })
}
//导出excel
export function exportFSPartsAsRow(rfqId,round,dataList) {
    return downLoad({
        url:`/nego-assistant/export-fs-parts-as-row/${rfqId}/${round}`,
        method:'POST',
        data:dataList,
        responseType:'blob'
    })
}

//导出excel
export function exportFsSupplierAsRow(rfqId,round,dataList) {
    return downLoad({
        // url:`/nego-assistant/export-fs-supplier-as-row/${rfqId}/${round}`,
        url: `/nego-assistant/exportAnalysisSummaryArray`,
        method:'POST',
        // data:dataList
        data:{
            hideList:dataList,
            rfqId:rfqId,
            round:round
        }
    })
}

//导出excel
export function exportGsPartsAsRow(rfqId,round,dataList) {
    return downLoad({
        url:`/nego-assistant/export-gs-parts-as-row/${rfqId}/${round}`,
        method:'POST',
        data:dataList
    })
}

// 导出定点FS横轴零件
export function exportFSPartsAsRowByNomiId(nomiId, data) {
    return downLoad({
        url:`/nego-assistant/export/nomi-fs-parts-as-row/${ nomiId }`,
        method: 'POST',
        data
    })
}

// 导出定点SUPPLIER横轴零件接口
export function exportFsSupplierAsRowByNomiId(nomiId, data) {
    return downLoad({
        url:`/nego-assistant/export/nomi-fs-supplier-as-row`,
        method: 'POST',
        data:{
            hideList:data,
            nomiId:nomiId
        }
    })
}

// 导出定点GS横轴零件接口
export function exportGsPartsAsRowByNomiId(nomiId, data) {
    return downLoad({
        url:`/nego-assistant/export/nomi-gs-parts-as-row/${ nomiId }`,
        method: 'POST',
        data
    })
}

//关联StarMonitor记录
export function starMonitorList(data) {
    return requst({
        url:'/star-monitor/list',
        method:'POST',
        data
    })
}

//应用关联记录校验
export function checkInfo(data) {
    return requst({
        url:'star-monitor/check',
        method:'POST',
        data
    })
}

//取消关联StarMonitor
export function cancelRef(data) {
    return requst({
        url:'/star-monitor/cancel',
        method:'POST',
        data
    })
}

//取消等待StarMonitor定点更新
export function cancelWaitStarMonitorUpdate(rfqId) {
    return requst({
        url:`star-monitor/cancel-wait/${rfqId}`,
        method:'GET',
    })
}

//等待StarMonitor定点更新
export function waitStarMonitorUpdate(rfqId) {
    return requst({
        url:`star-monitor/wait-update/${rfqId}`,
        method:'GET'
    })

}