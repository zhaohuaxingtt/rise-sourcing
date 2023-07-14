import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
import { serialize } from '@/utils'

const requst = axios(process.env.VUE_APP_PARTS)
const requstPartResource = axios(process.env.VUE_APP_DIC)
// VUE_APP_PARTSPROCURE
// VUE_APP_PARTS
const requstBasinfo = axios(process.env.VUE_APP_BASE_INFO)

const requstPartsProcure = axios(process.env.VUE_APP_PART)
const requstParts = axios(process.env.VUE_APP_PART)
const sourcing = axios(process.env.VUE_APP_SOURCING)
const sourcingDL = axios(process.env.VUE_APP_SOURCING)
const quotation = axios(process.env.VUE_APP_SOURCING)
const requestOutputPart = axios(process.env.VUE_APP_SOURCING)
const requestPriceRecord = axios(process.env.VUE_APP_SOURCING)
const requestPurchase = axios(process.env.VUE_APP_PURCHASE)
const carApi = axios(process.env.VUE_APP_PARTSPROCURE_API)
const sourcingDownload = axiosDownload(process.env.VUE_APP_SOURCING)

//自动定点-创建接口
export function queryProductionFactoryByCondition(params) {
	return requstBasinfo({
		url: '/web/queryProductionFactoryByCondition',
		method: 'POST',
		data: params
	})
}
//自动定点-创建接口
export function autonomi(params) {
	return sourcing({
		url: '/auto-nomi/change/auto',
		method: 'POST',
		data: params
	})
}

// 采购项目-根据零件六位号查询categoryCode
export function queryCategoryInfo(params) {
	return requstParts({
		url: '/queryCategoryInfo',
		method: 'GET',
		params
	})
}

// 采购项目-获取材料组信息
export function getMaterialGroup(params) {
	return requstPartsProcure({
		url: '/materialGroupByPartNum',
		method: 'GET',
		params: params
	})
}
// 采购项目-根据材料组code获取材料组信息
export function getMaterialGroupByCategoryCode(params) {
	return requstParts({
		url: '/materialGroupByCategoryCode',
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
// 采购项目-根据材料组code获取工艺组信息
export function meterialStuffByCid(params) {
	return requstPartsProcure({
		url: '/meterialStuffByCid',
		method: 'GET',
		params: params
	})
}
// 采购项目-获取材料组信息 - 附件类型
export function getAttachMeterialStuff(params) {
	return sourcing({
		url: '/purchasing-project-parts/materialGroupStuff',
		method: 'GET',
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
export function checkFactory(data) {
	return sourcing({
		url: '/purchasing-project-parts/is-exist-cartype-project-factory',
		method: 'POST',
		data
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
export function createParts(params) {
	return sourcing({
		url: "/purchasing-project-parts/manual",
		method: "POST",
		data: params
	})
}
// 搜索原零件号
export function getPageData(params) {
	return sourcing({
		url: "/nominate/fs-record/list",
		method: "POST",
		data: params
	})
}
//批量修改零件采购项目特殊零件仅零件号变更
export function getDataListBatchList(data) {
	return sourcing({
		url: '/purchasing-project-parts/list',
		method: 'POST',
		data: data
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
export function getNominateFileInfo({ nomiAppId, sortColumn, isAsc, fileType, pageNo, pageSize }) {
	return sourcingDL({
		url: `/file-histories/page/${nomiAppId}/${sortColumn}/${isAsc}/${fileType}/${pageNo}/${pageSize}`,
		method: 'GET'
	})
}

// 创建采购项目
export function supplierCurentTop(params) {
	return sourcing({
		url: "/effecting-supplier/queryCurrentSupplierPage",
		method: "POST",
		data: params
	})
}
// 创建采购项目
export function updateCurrentSupplierPage(params) {
	return sourcing({
		url: "/effecting-supplier/updateCurrentSupplierPage",
		method: "POST",
		data: params
	})
}
// 创建采购项目
export function supplierCurentBottom(params) {
	return sourcing({
		url: "/rs/findCurrentSupplierPage",
		method: "POST",
		data: params
	})
}

// 创建采购项目
export function factoryTranslate(params) {
	return sourcing({
		url: "https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/factoryTranslate",
		method: "get",
		data: params
	})
}

//检查当前零件采购项目总成件是否满足定点申请要求
export function nomiAutoPartsAssemblyCheck(
	// {partNum,factoryId,carTypeProjectZh}
	data
) {
	return sourcing({
		// url: `/partsAssembly/nomiAutoPartsAssemblyCheck/${partNum}/${factoryId}/${carTypeProjectZh}`,
		// method: "GET"
		url: '/partsAssembly/nomiAutoPartsAssemblyCheck',
		method: "POST",
		data,
	})
}

//自动创建零件采购项目
export function nomiAutoPartsAssembly(data) {
	return sourcing({
		url: `/partsAssembly/nomiAutoPartsAssembly`,
		method: "POST",
		data: data
	})
}
export function partsAssemblyOutPlan(purchaseProjectId) {
	return sourcing({
		url: `/partsAssembly/partsAssemblyOutPlan/${purchaseProjectId}`,
		method: "GET"
	})
}

//获取line部门
export function purchasingDept() {
	return sourcing({
		url: `/purchasing-project-parts/dept`,
		method: "GET"
	})
}

export function purchasingLiline(dptId) {
	return sourcing({
		url: `/purchasing-project-parts/linie/${dptId}`,
		method: "GET"
	})
}

export function listLines(params) {
	return sourcing({
		url: `/purchasing-project-parts/listLines`,
		method: "GET",
		params
	})
}


export function batchMaintainOutPutPlan(data) {
	return requestOutputPart({
		url: `/part-output/batchMaintainOutPutPlan`,
		method: "post",
		data
	})
}

//供应商价格记录查询
export function getSupplierPriceRecord(data) {
	return requestPriceRecord({
		url: '/effecting-supplier/getSupplierPriceRecord',
		method: 'POST',
		data
	})
}

//供应商同步价格记录

export function syncPriceRecords(data) {
	return requestPriceRecord({
		url: '/effecting-supplier/syncPriceRecords',
		method: 'POST',
		data
	})
}

//采购申请详情查询接口
export function getPurchaseDetail(data) {
	return requestPurchase({
		url: '/pr/normalPr/findById?riseCode=' + data.riseCode + '&sapItem=' + data.sapItem,
		method: 'GET'
	})
}
//保存每车用量
export function savearDosage(data) {
	return requst({
		url: '/tp-records/perCarDosage/save-car-dosage',
		method: 'POST',
		data
	})
}

//获取每车用量1
export function getCarDosage(data) {
	return requst({
		url: '/tp-records/perCarDosage/info1',
		method: 'POST',
		data
	})
}

//删除每车用量
export function delCarDosage(data) {
	return requst({
		url: '/tp-records/perCarDosage/del-car-dosage',
		method: 'DELETE',
		data
	})
}

//GS 零件-刷新BKM产量预测
export function bkmOutputForecast(data) {
	return sourcing({
		url: `/part-output/gs-part-bkm-output-forecast/${data}`,
		method: "GET"
	})
}

//GS 零件-计算产量
export function gscalculateOutput(data) {
	return sourcing({
		url: `/part-output/gs-part-calculate-output/${data}`,
		method: "GET"
	})
}
//FS 零件-计算产量
export function fscalculateOutput(data) {
	return sourcing({
		url: `/part-output/fs-part-calculate-output/${data}`,
		method: "GET"
	})
}

//获取每车用量-手动创建
export function manualInfoTable(data) {
	return requst({
		url: '/tp-records/perCarDosage/manual-info',
		method: 'POST',
		data
	})
}


//根据车型項目配置信息查詢
export function cartypeProConfigByCondition(data) {
	return carApi({
		url: '/api/cartypeProConfigByCondition',
		method: 'POST',
		data
	})
}

// 获取车型项目SOP时间
export function getCarTypeSop(params) {
	return sourcing({
		url: '/purchasing-project-parts/carProSimpleInfoList',
		method: 'GET',
		params
	})
}

// 下载工厂迁移模板
export function downloadFactoryMoveTemplate() {
	return sourcingDownload({
		url: '/factory-import-records/download',
		method: 'POST'
	})
}

// 删除工厂迁移记录
export function deleteFactoryImportRecordsList(data) {
	return sourcing({
		url: `/factory-import-records/delete/${data.id}`,
		method: 'DELETE',
	})
}

// 执行工厂迁移
export function executeFactoryRelocation(params) {
	return sourcing({
		url: `/auto-special/special/auto?itemId=${params.id}`,
		method: 'GET'
	})
}

// 导入批次
export function factoryImportRecords(formData, data) {
	return sourcing({
		url: `/factory-import-records/import/${data.id}`,
		method: 'POST',
		data: formData
	})
}

// 获取工厂迁移记录
export function getFactoryImportRecordsList(data) {
	return sourcing({
		url: '/factory-import-records/list',
		method: 'POST',
		data
	})
}

// 获取工厂迁移记录
export function getFactoryImportRecordsImport(data) {
	return sourcing({
		url: `/factory-import-records/import/${data.id}`,
		method: 'POST',
		data
	})
}

// 导出批次详情
export function exportFactoryBatchDetail(data) {
	return sourcingDownload({
		url: `/factory-batch-detail/export/${data.id}`,
		method: 'POST'
	})
}

// 删除批次详情
export function deleteFactoryBatchDetailList(data) {
	return sourcing({
		url: `/factory-batch-detail/delete?${serialize(data, Array)}`,
		method: 'DELETE'
	})
}

// 获取批次详情列表
export function getFactoryBatchDetail(data) {
	return sourcing({
		url: `/factory-batch-detail/list`,
		method: 'POST',
		data
	})
}