/*
 * @Author: yuszhou
 * @Date: 2021-02-25 10:14:46
 * @LastEditTime: 2022-01-07 16:52:21
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\home\component\data.js
 */
import {permissionTitle} from '@/utils'
import {partProjTypes} from '@/config'

// rfq 页面调整 
// isAekoShow
// ispartsAdd
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
		ispartsList: true,
		isAekoShow:true,
	},
	{
		props: 'sourcingNumber',
		name: 'SourcingNumber',
		key: 'SOURCINGNUMBER',
		tooltip: true,
		isAekoShow:false,
		isCommonSourcingShow:true,
		width:160
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
	{
		props: 'linieName',
		name: 'LINIE',
		key: 'partsprocure.PARTSPROCURELINIE',
		tooltip: true,
		width:60,
		isAekoShow:false,
	},
	{
		props: 'quotationStatus',
		name: '当前轮次报价状态',
		key: 'DANGQIANLUNCIBAOJIAZHUANGTAI',
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
	'current': "",
	'showSelf': true
}



//特殊零件采购项目validate
export const validateProjectConfig = [
	{
		key:partProjTypes.JINLINGJIANHAOGENGGAI,
		message:'抱歉！当前零件中包含仅零件号变更零件，此零件不能与其他类型的采购项目一起维护。'
	}
]

//批量维护产量计划



// 
export function getPlanyear(defaultNumberMax=15){
	const batchMaintainTableTitle = [
		{props: 'startyear', name: '开始年份',Key: 'LK_KAISHINIANFEN' },
	]
	for(let i = 0;i < defaultNumberMax;i++){
		const maps= {}
		maps.props = i;
		maps.name = '+'+i;
		batchMaintainTableTitle.push(maps)

	}
	return batchMaintainTableTitle
}




