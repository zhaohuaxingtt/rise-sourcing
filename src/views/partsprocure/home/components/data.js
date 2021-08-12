/*
 * @Author: yuszhou
 * @Date: 2021-02-25 10:14:46
 * @LastEditTime: 2021-08-04 11:44:58
 * @LastEditors: Please set LastEditors
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
		width:120
	},
	{
		props: 'partNum',
		name: '零件号',
		key: 'partsprocure.PARTSPROCUREPARTNUMBER',
		tooltip: true,
		width:130
	},
	{
		props: 'partNameZh',
		name: '零件名（中）',
		key: 'partsprocure.PARTSPROCUREPARTNAMEZH',
		tooltip: true,
		width:120
	},
	{
		props: 'partNameDe',
		name: '零件名（德）',
		key: 'partsprocure.PARTSPROCUREPARTNAMEDE',
		tooltip: true,
		width:140
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
		width:60
	},
	{
		props: 'cfControllerZh',
		name: 'CF',
		key: 'partsprocure.CF',
		tooltip: true,
		width:60
	},
	{
		props: 'procureFactoryName',
		name: '采购工厂',
		key: 'partsprocure.PARTSPROCUREPURCHASINGFACTORY',
		tooltip: true,
		width:80
	},
	{
		props: 'partProjectTypeName',
		name: '零件项目类型',
		key: 'partsprocure.PARTSPROCUREPARTITEMTYPE',
		tooltip: true,
		width:140
	},
	{
		props: 'cartypeCategory',
		name: '车型大类',
		key: 'partsprocure.PARTSPROCUREVEHICLECATEGORIES',
		tooltip: true,
		width:120
	},
	{
		props: 'cartypeProjectZh',
		name: '车型项目',
		key: 'partsprocure.PARTSPROCUREMODELPROJECT',
		tooltip: true,
		width:130
	},
	{
		props: 'statusName',
		name: '零件状态',
		key: 'partsprocure.PARTSPROCUREPARTSTATUS',
		tooltip: true,
		width:90
	},
	{
		props: 'buyerName',
		name: '询价采购员',
		key: 'partsprocure.PARTSPROCUREINQUIRYBUYER',
		tooltip: true,
		width:80
	}
]
//)

//零件采购列表入参
export const form = {
	'search.buyerName': '', //询价采购员
	'search.cartypeCategory': '', //车型大类
	'search.cartypeProjectNum': '', //车型项目编号	
	'search.cartypeProjectZh': '', //车型项目
	'search.categoryCode': '', //材料组编号
	'search.fsnrGsnrNum': "", //FSNR/GSNR/SPNR
	'search.linieName': '', //LINIE
	'search.partNameZh': '', //零件名称(中)
	'search.partNum': '', //零件号
	'search.partPrejectType': '', //零件项目类型
	'search.partStatus': '', //零件状态
	'search.procureFactory': '', //采购工厂
	'search.projectStatus': '', //采购项目状态
	'search.rfqId': '', //rfq编号
	'search.size': '',
	'search.current': ""
}

// addRfq
export const addRfqTitle =[
	{props:'id',name:'RFQ#',key: 'RFQ#'},
	{props:'rfqName',name:'RFQ名称',key: 'LK_RFQMINGCHENG',},
	{props:'currentStatus',name:'RFQ状态',key: 'LK_RFQZHUANGTAI'},
	{props:'updateDate',name:'操作时间',key: 'LK_UpdateDate'},

]

//特殊零件采购项目validate
export const validateProjectConfig = [
	{
		key:partProjTypes.JINLINGJIANHAOGENGGAI,
		message:'抱歉！当前零件中包含仅零件号变更零件，此零件不能与其他类型的采购项目一起维护。'
	}
]

