import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)
const requstPartResource = axios(process.env.VUE_APP_DIC)
// VUE_APP_PARTSPROCURE
// VUE_APP_PARTS

const requstPartsProcure = axios(process.env.VUE_APP_PARTSPROCURE)
const sourcing = axios(process.env.VUE_APP_PART_PROCURE)
const sourcingDL = axios(process.env.VUE_APP_SOURCING_WDL)
const quotation = axios(process.env.VUE_APP_QUOTATION)
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

const requstPartProcure = axios(process.env.VUE_APP_PART_PROCURE)
// 获取产量计划
export function getOutputPlan(params) {
	return requstPartProcure({
		url: '/part-src-prjs',
		method: 'GET',
		params: params
	})
}

// 更新产量计划
export function updateOutputPlan(params) {
	return requstPartProcure({
		url: '/part-src-prjs',
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
		url: '/part-src-prjs/is-exist-cartype-project-factory',
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

// 创建采购项目
export function createParts(params){
  return sourcing({
    url: "/part-src-prjs",
    method: "POST",
    data: params
  })
}
// 创建采购项目
export function getPageData(params){
  return sourcing({
    url: "/nominate/fs-record/list",
    method: "GET",
    params: params
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
		url: `/file-history/${nomiAppId}/${sortColumn}/${isAsc}/${fileType}/${pageNo}/${pageSize}`,
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