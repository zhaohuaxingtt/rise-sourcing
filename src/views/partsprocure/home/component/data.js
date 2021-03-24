/*
 * @Author: yuszhou
 * @Date: 2021-02-25 10:14:46
 * @LastEditTime: 2021-02-25 11:04:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\home\component\data.js
 */

export const tableTitle = [{
		props: 'fsnrGsnrNum',
		name: 'FSNF/GSNF/SPNR'
	},
	{
		props: 'partNum',
		name: '零件号'
	},
	{
		props: 'partNameZh',
		name: '零件名（中）'
	},
	{
		props: 'partNameDe',
		name: '零件名（德）'
	},
	{
		props: 'procureFactory',
		name: '采购工厂'
	},
	{
		props: 'partPrejectType',
		name: '零件项目类型'
	},
	{
		props: 'cartypeCategory',
		name: '车型大类'
	},
	{
		props: 'cartypeProjectZh',
		name: '车型项目'
	},
	{
		props: 'partStatus',
		name: '零件状态'
	},
	{
		props: 'preLinieName',
		name: '询价采购员'
	},
	{
		props: 'linieName',
		name: 'LINIE'
	},
	{
		props: 'cfController',
		name: 'CF'
	}
]

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
export const fromGroup = {
	
	
}
