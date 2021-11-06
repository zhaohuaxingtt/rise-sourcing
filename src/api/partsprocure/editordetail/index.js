import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)
const requstPartResource = axios(process.env.VUE_APP_DIC)
// VUE_APP_PARTSPROCURE
// VUE_APP_PARTS

const requstPartsProcure = axios(process.env.VUE_APP_PARTSPROCURE)
const sourcing = axios(process.env.VUE_APP_SOURCING)
const sourcingDL = axios(process.env.VUE_APP_SOURCING)
const quotation = axios(process.env.VUE_APP_SOURCING)
const requestOutputPart = axios(process.env.VUE_APP_SOURCING)
const requestPriceRecord = axios(process.env.VUE_APP_SOURCING)
const requestPurchase= axios(process.env.VUE_APP_PURCHASE)
//自动定点-创建接口
export function autonomi(params) {
	return sourcing({
		url: '/auto-nomi/change/auto',
		method: 'POST',
		data: params
	})
}
// 采购项目-获取材料组信息
export function getMaterialGroup(params) {
	return requstPartsProcure({
		url: '/materialGroup',
		method: 'GET',
		params: params
	})
}

//根据linie查询材料组信息
export function materialGroupByLinie(params) {
	return requstPartsProcure({
		url: "/materialGroupByLinie",
		method: "GET",
		params: params
	})
}

//根据材料组编号查询工艺组
export function getStuffByCategory(params) {
	return requstPartsProcure({
		url: "/getStuffByCategory",
		method: "GET",
		params: params
	})
}
// 采购项目-获取材料组信息
export function getMeterialStuff(params) {
	return requstPartsProcure({
		url: '/meterialStuff',
		method: 'GET',
		params: params
	})
}
// 设置工艺组
export function putMaterialGroup(params) {
	return requstPartsProcure({
		url: '/materialGroup',
		method: 'PUT',
		params: params
	})
}

// 获取tp单数据
export function getTpInfo(params) {
	return requst({
		url: '/tp-records/tpInfo',
		method: 'POST',
		data: {
			tpRecordsScenes: params
		}
	})
}

// 关联附件用
export function patchTpInfoByAttachment(params) {
	return requst({
		url: '/tp-records/tpInfo',
		method: 'PATCH',
		data: {
			uploadAttachmentDTO: params
		}
	})
}


// 关联附件用
// export function patchTpRecords(params) {
// 	return requst({
// 		url: '/api/tp-records',
// 		method: 'PATCH',
// 		data: params
// 	})
// }

// 获取附件
export function getInfoAnnexPage(params) {
	return requst({
		url: '/tp-records/tpInfo/getInfoAnnexPage',
		method: 'GET',
		params: params
	})
}

// 删除附件
export function deleteFile(params) {
	return requst({
		url: '/tp-records/tpInfo/file',
		method: 'DELETE',
		data: params
	})
}

const requstPartProcure = axios(process.env.VUE_APP_SOURCING)
// 获取产量计划
export function getOutputPlan(params) {
	return requstPartProcure({
		url: '/part-output/output-plan',
		method: 'POST',
		data: params
	})
}
export function getOutputPlanMarks(params) {
	return requstPartProcure({
		url: '/part-output/output-record',
		method: 'POST',
		data: params
	})
}
// 更新产量计划
export function updateOutputPlan(params) {
	return requstPartProcure({
		url: '/part-output/update',
		method: 'POST',
		data: params
	})
}

// 获取零件详情-每车用量
export function getPerCarDosageInfo(params) {
	return requst({
		url: '/tp-records/perCarDosage/info',
		method: 'POST',
		data: params
	})
}

// 获取零件详情-获取所有版本
export function getPerCarDosageVersion(params) {
	return requst({
		url: '/tp-records/perCarDosage/version',
		method: 'POST',
		data: params
	})
}

//拆分采购工厂
export function purchaseFactory(params) {
	return requstPartResource({
		url: '/purchaseFactory',
		method: 'GET',
		params: params
	})
}
// 数据字典
export function dictkey(params) {
	return requstPartResource({
		url: '/selectDictKey',
		method: 'GET',
		params: params
	})
}
// 检测当前值是不是在范围里面。
export function checkFactory(params) {
	return sourcing({
		url: '/purchasing-project-parts/is-exist-cartype-project-factory',
		method: 'POST',
		data: params
	})
}

// 获取采购项目列表
export function getParts(params) {
	return requstPartsProcure({
		url: "/partInfoPaged",
    method: "POST",
    data: params
	})
}
// 手工创建采购项目
export function createParts(params){
  return sourcing({
    url: "/purchasing-project-parts/manual",
    method: "POST",
    data: params
  })
}
// 搜索原零件号
export function getPageData(params){
  return sourcing({
    url: "/nominate/fs-record/list",
    method: "POST",
    data: params
  })
}
//批量修改零件采购项目特殊零件仅零件号变更
export function getDataListBatchList(data){
	return sourcing({
		url:'/purchasing-project-parts/list',
		method:'POST',
		data:data
	})
}
// 获取定点信息
export function findNominateInfo(fsNum) {
	return sourcingDL({
		url: `/nominate/list/${fsNum}`,
		method: 'GET'
	})
}

// 获取定点信息相关文件
// fileType： 103：纸质RS单,  ， 105：SEL分摊单
export function getNominateFileInfo({nomiAppId, sortColumn, isAsc, fileType, pageNo, pageSize }) {
	return sourcingDL({
		url: `/file-histories/page/${nomiAppId}/${sortColumn}/${isAsc}/${fileType}/${pageNo}/${pageSize}`,
		method: 'GET'
	})
}

// 创建采购项目
export function supplierCurentTop(params){
  return sourcing({
    url: "/effecting-supplier/queryCurrentSupplierPage",
    method: "POST",
    data: params
  })
}
// 创建采购项目
export function updateCurrentSupplierPage(params){
  return sourcing({
    url: "/effecting-supplier/updateCurrentSupplierPage",
    method: "POST",
    data: params
  })
}
// 创建采购项目
export function supplierCurentBottom(params){
  return sourcing({
    url: "/rs/findCurrentSupplierPage",
    method: "POST",
    data: params
  })
}

// 创建采购项目
export function factoryTranslate(params){
  return sourcing({
    url: "https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/factoryTranslate",
    method: "get",
    data: params
  })
}

//检查当前零件采购项目总成件是否满足定点申请要求
export function nomiAutoPartsAssemblyCheck({partNum,factoryId,carTypeProjectZh}){
  return sourcing({
    url: `/partsAssembly/nomiAutoPartsAssemblyCheck/${partNum}/${factoryId}/${carTypeProjectZh}`,
    method: "GET"
  })
}

//自动创建零件采购项目
export function nomiAutoPartsAssembly(data){
  return sourcing({
    url: `/partsAssembly/nomiAutoPartsAssembly`,
    method: "POST",
		data:data
  })
}
export function partsAssemblyOutPlan(purchaseProjectId){
	return sourcing({
    url: `/partsAssembly/partsAssemblyOutPlan/${purchaseProjectId}`,
    method: "GET"
  })
}

//获取line部门
export function purchasingDept(){
	return sourcing({
    url: `/purchasing-project-parts/dept`,
    method: "GET"
  })
}
export function purchasingLiline(dptId){
	return sourcing({
    url: `/purchasing-project-parts/linie/${dptId}`,
    method: "GET"
  })
}

export function batchMaintainOutPutPlan(data) {
	return  requestOutputPart ({
		url: `/part-output/batchMaintainOutPutPlan`,
		method:"post",
		data
	}) 
}

//供应商价格记录查询
export function getSupplierPriceRecord(data) {
	return requestPriceRecord({
		url:'/effecting-supplier/getSupplierPriceRecord',
		method:'POST',
		data
	})
}

//供应商同步价格记录

export function syncPriceRecords(data) {
	return requestPriceRecord({
		url:'/effecting-supplier/getSupplierPriceRecord',
		method:'POST',
		data
	})
} 

//采购申请详情查询接口
export function getPurchaseDetail(data) {
	return requestPurchase({
		url:'/pr/normalPr/findById?riseCode='+data.riseCode+'&sapItem='+data.sapItem,
		method:'GET'
	})
}
