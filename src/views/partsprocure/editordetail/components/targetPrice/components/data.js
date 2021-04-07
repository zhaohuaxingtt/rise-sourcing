/*
 * @author:shujie
 * @Date: 2021-3-3 17:19:13
 * @LastEditors: shujie
 * @Description: In User Settings Edit
 */
export const targeTitle = [{
	props: 'applyDate',
	name: '申请日期',
	key:'LK_SHENQINGRIQI'
},
{
	props: 'applyType',
	name: '申请类型',
	key:'LK_SHENQINGLEIXING'
},
{
	props: 'buyerName',
	name: 'CF负责人',
	key:'LK_CFFUZEREN'
},
{
	props: 'applyCategory',
	name: '申请类别',
	key:'LK_SHENQINGLEIBIE'
},
{
	props: 'expTargetpri',
	name: '期望目标价',
	key:'LK_QIWANGMUBIAOJIA'
},
{
	props: 'applyStatus',
	name: '申请状态',
	key:'LK_SHENQINGZHUANGTAI'
},
]
export const rwTitle = [{
	props: 'applyDate',
	name: '申请日期',
	key:'LK_SHENQINGRIQI'
},
{
	props: 'applyType',
	name: '申请类型',
	key:'LK_SHENQINGLEIXING'
},
{
	props: 'price',
	name: 'RW价',
	key:'LK_RWJIA'
},
{
	props: 'applyStatus',
	name: '申请状态',
	key:'LK_SHENQINGZHUANGTAI'
}
]

// 申请目标价信息
export const targetPriceDetail = {
	cfTargetPriceDetail: {
		lcBPrice: "",
		skdBPrice: "",
		lcAPrice: "",
		skdAPrice: "",
		ckdDuty: "",
		ckdExwork: "",
		ckdLanded: "",
		applyType: "",
		applyReason: "",
		applyMemo: "",
	},
	purchasePrjectId: "", //采购项目ID
	rwApplication: {
		applyDate: "", //申请时间
		applyNum: "", //RW价申请编号
		applyStatus: "", //申请状态
		applyType: "", //	申请类型
		currencyId: "", //货币类型ID
		currencyName: "", //货币名
		employeeId: "", //申请人ID)
		exchangeRate: "", //货币汇率
		fsnrGsnrNum: "", //采购申请号
		id: "", //RW价申请表ID
		isResponsed: "", //是否回应
		memo: "", //备注
		price: "", //欧洲参考价格
		priority: "", //	紧急程度
		purchaseTargetId: "", //采购对象id
		responseDate: "", //回复时间
		tmPartInfoId: "", //零件信息ID
		unitName: "", //单位名
	}
}
