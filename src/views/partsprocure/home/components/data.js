/*
 * @Author: yuszhou
 * @Date: 2021-02-25 10:14:46
 * @LastEditTime: 2021-03-31 16:29:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\home\component\data.js
 */
import {permissionTitle} from '@/utils'
// export const tableTitle = [{
export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
		props: 'fsnrGsnrNum',
		name: 'FSNF/GSNF/SPNR',
		key: 'partsprocure.PARTSPROCURENEWPROCUREMENTPROJECT',
	},
	{
		props: 'partNum',
		name: '零件号',
		key: 'partsprocure.PARTSPROCUREPARTNUMBER',
	},
	{
		props: 'partNameZh',
		name: '零件名（中）',
		key: 'partsprocure.PARTSPROCUREPARTNAMEZH',
	},
	{
		props: 'partNameDe',
		name: '零件名（德）',
		key: 'partsprocure.PARTSPROCUREPARTNAMEDE',
	},
	{
		props: 'statusName',
		name: '项目状态',
		key: 'partsprocure.PARTSPROCURESTATUS',
	},
	{
		props: 'procureFactory',
		name: '采购工厂',
		key: 'partsprocure.PARTSPROCUREPURCHASINGFACTORY',
	},
	{
		props: 'partPrejectType',
		name: '零件项目类型',
		key: 'partsprocure.PARTSPROCUREPARTITEMTYPE',
	},
	{
		props: 'cartypeCategory',
		name: '车型大类',
		key: 'partsprocure.PARTSPROCUREVEHICLECATEGORIES',
	},
	{
		props: 'cartypeProjectZh',
		name: '车型项目',
		key: 'partsprocure.PARTSPROCUREMODELPROJECT',
	},
	{
		props: 'partStatusName',
		name: '零件状态',
		key: 'partsprocure.PARTSPROCUREPARTSTATUS',
	},
	{
		props: 'buyerName',
		name: '询价采购员',
		key: 'partsprocure.PARTSPROCUREINQUIRYBUYER',
	},
	{
		props: 'linieName',
		name: 'LINIE',
		key: 'partsprocure.PARTSPROCURELINIE',
	},
	{
		props: 'cfControllerZh',
		name: 'CF',
		key: 'partsprocure.CF',
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