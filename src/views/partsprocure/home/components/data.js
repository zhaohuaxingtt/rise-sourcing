/*
 * @Author: yuszhou
 * @Date: 2021-02-25 10:14:46
 * @LastEditTime: 2021-04-02 17:17:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\home\component\data.js
 */
import {permissionTitle} from '@/utils'
// export const tableTitle = [{
export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
		props: 'fsnrGsnrNum',
		name: 'FSNF/GSNF/SPNR',
		key: 'partsprocure.PARTSPROCUREFSNFGSNFSPNR',
		tooltip:false
	},
	{
		props: 'partNum',
		name: '零件号',
		key: 'partsprocure.PARTSPROCUREPARTNUMBER',
		tooltip:false
	},
	{
		props: 'partNameZh',
		name: '零件名（中）',
		key: 'partsprocure.PARTSPROCUREPARTNAMEZH',
		tooltip:false
	},
	{
		props: 'partNameDe',
		name: '零件名（德）',
		key: 'partsprocure.PARTSPROCUREPARTNAMEDE',
		tooltip:false
	},
	{
		props: 'statusName',
		name: '项目状态',
		key: 'partsprocure.PARTSPROCURESTATUS',
		tooltip:false
	},
	{
		props: 'procureFactoryName',
		name: '采购工厂',
		key: 'partsprocure.PARTSPROCUREPURCHASINGFACTORY',
		tooltip:false
	},
	{
		props: 'partPrejectType',
		name: '零件项目类型',
		key: 'partsprocure.PARTSPROCUREPARTITEMTYPE',
		tooltip:false
	},
	{
		props: 'cartypeCategory',
		name: '车型大类',
		key: 'partsprocure.PARTSPROCUREVEHICLECATEGORIES',
		tooltip:false
	},
	{
		props: 'cartypeProjectZh',
		name: '车型项目',
		key: 'partsprocure.PARTSPROCUREMODELPROJECT',
		tooltip:false
	},
	{
		props: 'partStatusName',
		name: '零件状态',
		key: 'partsprocure.PARTSPROCUREPARTSTATUS',
		tooltip:false
	},
	{
		props: 'buyerName',
		name: '询价采购员',
		key: 'partsprocure.PARTSPROCUREINQUIRYBUYER',
		tooltip:false
	},
	{
		props: 'linieName',
		name: 'LINIE',
		key: 'partsprocure.PARTSPROCURELINIE',
		tooltip:false
	},
	{
		props: 'cfControllerZh',
		name: 'CF',
		key: 'partsprocure.CF',
		tooltip:false
	}
])

//零件采购列表入参
export const form = {
	'search.buyerName': '', //询价采购员
	'search.cartypeCategory': '', //车型大类
	'search.cartypeProjectNum':'',//车型项目编号	
	'search.cartypeProjectZh': '', //车型项目
	'search.categoryCode':'',//材料组编号
	'search.fsnrGsnrNum': "", //FSNR/GSNR/SPNR
	'search.linieName': '', //LINIE
	'search.partNameZh': '', //零件名称(中)
	'search.partNum': '', //零件号
	'search.partPrejectType': '', //零件项目类型
	'search.partStatus': '', //零件状态
	'search.procureFactory': '', //采购工厂
	'search.projectStatus':'',//采购项目状态
	'search.rfqId':'',//rfq编号
	'search.size':'',
	'search.current':""
}