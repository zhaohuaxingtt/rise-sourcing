/*
 * @Author: yuszhou
 * @Date: 2021-02-25 10:14:46
 * @LastEditTime: 2021-10-25 21:18:38
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\home\component\data.js
 */
import {permissionTitle} from '@/utils'
import {partProjTypes} from '@/config'
export const tableTitle = [{
		//export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
		props: 'fsnrGsnrNum',
		name: 'FSNF/GSNF/SPNR',
		key: 'partsprocure.PARTSPROCUREFSNFGSNFSPNR',
		tooltip: true,
		width:120,
		isAekoShow:true,
	},
	{
		props: 'partNum',
		name: '零件号',
		key: 'partsprocure.PARTSPROCUREPARTNUMBER',
		tooltip: true,
		width:130,
		isAekoShow:true,
	},
	{
		props: 'code',
		name: '采购申请编号',
		key: 'partsprocure.PARTSPROCUREPUECHASEAPPLYNUMBER',
		tooltip: true,
		width:150,
		isAekoShow:true,
	},
	{
		props: 'item',
		name: '项次号',
		key: 'partsprocure.PARTSPROCUREPITEM',
		tooltip: true,
		width:130,
		isAekoShow:true,
	},
	{
		props: 'partNameZh',
		name: '零件名（中）',
		key: 'partsprocure.PARTSPROCUREPARTNAMEZH',
		tooltip: true,
		width:100,
		isAekoShow:true,
	},
	{
		props: 'partNameDe',
		name: '零件名（德）',
		key: 'partsprocure.PARTSPROCUREPARTNAMEDE',
		tooltip: true,
		width:100,
		isAekoShow:true,
	},
	{
		props: 'mtz',
		name: 'MTZ',
		key: 'partsprocure.mtz',
		tooltip: true,
		width:100,
		isAekoShow:true,
	},
	// {
	// 	props: 'statusName',
	// 	name: '项目状态',
	// 	key: 'partsprocure.PARTSPROCURESTATUS',
	// 	tooltip:false
	// },
	{
		props: 'linieName',
		name: 'LINIE',
		key: 'partsprocure.PARTSPROCURELINIE',
		tooltip: true,
		width:60,
		isAekoShow:false,
	},
	
	{
		props: 'cfControllerName',
		name: 'CF',
		key: 'partsprocure.CF',
		tooltip: true,
		width:70,
		isAekoShow:false,
	},
	// {
	// 	props: 'cfControllerZh',
	// 	name: 'CF',
	// 	key: 'partsprocure.CF',
	// 	tooltip: true,
	// 	width:60
	// },
	{
		props: 'procureFactoryName',
		name: '采购工厂',
		key: 'partsprocure.PARTSPROCUREPURCHASINGFACTORY',
		tooltip: true,
		width:80,
		isAekoShow:true,
	},
	{
		props: 'partProjectTypeDesc',
		name: '零件项目类型',
		key: 'partsprocure.PARTSPROCUREPARTITEMTYPE',
		tooltip: true,
		width:110,
		isAekoShow:true,
	},
	{
		props: 'modelNameZh',
		name: '车型大类',
		key: 'partsprocure.PARTSPROCUREVEHICLECATEGORIES',
		tooltip: true,
		width:100,
		isAekoShow:true,
	},
	{
		props: 'carTypeProjectZh',
		name: '车型项目',
		key: 'partsprocure.PARTSPROCUREMODELPROJECT',
		tooltip: true,
		minWidth:120,
		isAekoShow:true,
	},
	{
		props: 'statusDesc',
		name: '零件状态',
		key: 'partsprocure.PARTSPROCUREPARTSTATUS',
		tooltip: true,
		minWidth:75,
		isAekoShow:true,
	},
	{
		props: 'buyerName',
		name: '询价采购员',
		key: 'partsprocure.PARTSPROCUREINQUIRYBUYER',
		tooltip: true,
		width:90,
		isAekoShow:false,
	},
]

//零件采购列表入参
export const form = {
	'buyerName': '', //询价采购员
	'carTypeCategory': '', //车型大类
	'carTypeProjectNum': '', //车型项目编号	
	'carTypeProjectZh': '', //车型项目
	'categoryCode': '', //材料组编号
	'fsnrGsnrNum': "", //FSNR/GSNR/SPNR
	'linieName': '', //LINIE
	'partNameZh': '', //零件名称(中)
	'partNum': '', //零件号
	'partProjectType': '', //零件项目类型
	'partStatus': '', //零件状态
	'procureFactory': '', //采购工厂
	'status': '', //采购项目状态
	'rfqId': '', //rfq编号
	'size': '',
	'current': ""
}



//特殊零件采购项目validate
export const validateProjectConfig = [
	{
		key:partProjTypes.JINLINGJIANHAOGENGGAI,
		message:'抱歉！当前零件中包含仅零件号变更零件，此零件不能与其他类型的采购项目一起维护。'
	}
]

//批量维护产量计划

export const batchMaintainTableTitle = [
	{props: 'startyear', name: '开始年份',Key: 'LK_KAISHINIANFEN' },
]

// 
export function getPlanyear(defaultNumberMax=15){
	for(let i = 0;i < defaultNumberMax;i++){
		const maps= {}
		maps.props = i;
		maps.name = '+'+i;
		batchMaintainTableTitle.push(maps)
	}
	return batchMaintainTableTitle
}


