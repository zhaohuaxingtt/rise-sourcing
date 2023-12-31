/*
 * @Author: your name
 * @Date: 2021-06-30 13:56:01
 * @LastEditTime: 2022-03-25 14:58:09
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\steelDemandCreation\home\components\data.js
 */
import { OutSouring } from '@/config'
export const searchForm = [
	{
		i18nName: 'RiSE编号',
		i18nKey: 'MODEL-ORDER.LK_RISEBIANHAO',
		permissionKey: 'SOURCING_SHENGQINGDANHAO',
		type: 'input',
		List: [],
		moduleKey: 'riseCode',
	},
	{
		i18nName: '零件号',
		i18nKey: 'LINGJIANHAO',
		permissionKey: 'SOURCING_LINGJIANHAO',
		type: 'partNum',
		List: [],
		moduleKey: 'partNumStr',
	},
	{
		i18nName: '零件名称（中）',
		i18nKey: 'LINGJIANMINGCZH',
		permissionKey: 'SOURCING_LINGJIANMINGCZH',
		type: 'input',
		List: [],
		moduleKey: 'partNameZh',
	},
	{
		i18nName: '采购申请类型',
		i18nKey: 'MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING',
		permissionKey: 'SOURCING_LINGJIANCAIGOUXIANGMULEIX',
		type: 'select',
		selectOptions: 'subTypeOption',
		List: [
			{ name: '全部', code: '' },
			{ name: '工序委外一次性', code: OutSouring.subType1 },
			{ name: '工序委外框架', code: OutSouring.subType2 },
		],
		moduleKey: 'subType',
	},
	{
		i18nName: '状态',
		i18nKey: 'LK_ZHUANGTAI',
		permissionKey: 'SOURCING_DAYINGZHUANGTAI',
		type: 'select',
		selectOptions: 'statusOption',
		moduleKey: 'status',
	},
	{
		i18nName: '采购工厂',
		i18nKey: 'LK_CAIGOUGONGCHANG',
		permissionKey: 'SOURCING_LINGJIANHAO',
		type: 'select',
		selectOptions: 'procureFactoryOption',
		moduleKey: 'procureFactory',
		format: { value: 'code', label: 'name' },
	},
	{
		i18nName: '采购员',
		i18nKey: '采购员',
		permissionKey: 'SOURCING_LINGJIANMINGCZH',
		type: 'input',
		moduleKey: 'buyerName',
	},
	{
		i18nName: '科室',
		i18nKey: '科室',
		permissionKey: 'SOURCING_FSNRGSNR',
		type: 'input',
		moduleKey: 'deptNum',
	},
	{
		i18nName: '申请人',
		i18nKey: 'SHENQINGREN',
		permissionKey: 'SOURCING_XUNJIACAIGOUYUAN',
		type: 'input',
		moduleKey: 'applyBy',
	},
	{
		i18nName: '申请部门',
		i18nKey: 'SHENQINGBUMEN',
		permissionKey: 'SOURCING_ZHUANYECAIGOUYUAN',
		type: 'input',
		moduleKey: 'applyDeptNo',
		// format: { value: 'deptId', label: 'commodity' },
	},
	{
		i18nName: '申请日期起',
		i18nKey: 'SHENQINGRIQIQI',
		permissionKey: 'SOURCING_LIUCHENGLEIX',
		type: 'datepicker',
		moduleKey: 'startDate',
	},
	{
		i18nName: '申请日期止',
		i18nKey: 'SHENQINGRIQIZHI',
		permissionKey: 'SOURCING_HUIYILEIXING',
		type: 'datepicker',
		List: [],
		moduleKey: 'endDate',
	},
	{
		i18nName: '备注',
		i18nKey: '备注',
		permissionKey: 'SOURCING_CHEXINGXIANGMU',
		type: 'input',
		List: [],
		moduleKey: 'remark',
	},
]

export const form = {
	applyBy: '',
	applyDeptNo: '',
	createDate: '',
	currency: '',
	currentPage: 1,
	deptNum: '',
	pageSize: 10,
	partNameZh: '',
	partNumStr: '',
	procureFactory: '',
	procureGroup: '',
	requestTraceNo: '',
	riseCode: '',
	sapCode: '',
	status: '',
	subType: '',
	supplierNameZh: '',
	supplierSapCode: '',
	isOwn: false,
	type: 'GPR',
}

export const tableTitle = [
	{
		props: 'riseCode',
		name: 'RiSE编号',
		key: 'MODEL-ORDER.LK_RISEBIANHAO',
		tooltip: true,
		minWidth: 215,
		sortable: true,
		fixed: true
	},
	{
		props: 'partNum',
		name: '零件号',
		key: 'LINGJIANHAO',
		tooltip: true,
		minWidth: 150,
		sortable: true,
	},
	{
		props: 'partNameZh',
		name: '零件名称（中）',
		key: 'LINGJIANMINGCZH',
		tooltip: true,
		minWidth: 160,
		sortable: true,
	}, {
		props: 'sapItem',
		name: '项次',
		key: 'MODEL-ORDER.LK_XIANGCI',
		tooltip: true,
		width: 85,
		sortable: true,
	},
	{
		props: 'subType',
		name: '采购申请类型',
		key: 'MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING',
		tooltip: true,
		width: 140,
		sortable: true,
	},
	{
		props: 'applyBy',
		name: '申请人',
		key: 'LK_SHENQINGREN',
		width: 100,
		tooltip: true,
		sortable: true,
	},
	{
		props: 'applyDeptNo',
		name: '申请部门',
		key: 'SHENQINGBUMEN',
		width: 110,
		tooltip: true,
		sortable: true,
	},
	{
		props: 'status',
		name: '状态',
		key: 'STATUS',
		tooltip: true,
		width: 80,
		sortable: true,
	},
	{
		props: 'nominationStatus',
		name: '一次性定点状态',
		key: 'MODEL-ORDER.LK_YICIXINGDINGDIANZHUANGTAI',
		tooltip: true,
		width: 160,
		sortable: true,
	},
	{
		props: 'createDate',
		name: '申请时间',
		key: 'SHENQINGSHIJIAN',
		width: 110,
		tooltip: true,
		sortable: true,
	},
	{
		props: 'buyerCode',
		name: '推荐采购员',
		key: 'TUIJIANCAIGOUYUAN',
		tooltip: true,
		width: 120,
		sortable: true,
	},
	{
		props: 'remark',
		name: '备注',
		key: 'remarks',
		tooltip: true,
		width: 120,
		sortable: true,
	},
]

export const newTableTitle = [
	{
		props: 'sapItem',
		name: '项次',
		key: 'MODEL-ORDER.LK_XIANGCI',
		tooltip: true,
		align: 'center',
		width: 60,
	},
	{
		props: 'partType',
		name: '零件类型',
		key: 'LK_LINGJIANLEIXING',
		tooltip: true,
		align: 'center',
		width: 120,
	},
	{
		props: 'partNum',
		name: '零件号',
		key: 'LK_SPAREPARTSNUMBER',
		tooltip: true,
		align: 'center',
		width: 150,
	},
	{
		props: 'partNameZh',
		name: '零件名称(中)',
		key: 'LINGJIANMINGCHEN_ZH',
		tooltip: true,
		align: 'center',
		width: 160,
	},
	{
		props: 'partNameDe',
		name: '零件名称(德)',
		key: 'LINGJIANMINGCHEN_DE',
		tooltip: true,
		align: 'center',
		width: 160,
	},
	{
		props: 'quantity',
		name: '数量',
		key: 'LK_SHULIANG',
		tooltip: true,
		align: 'center',
		width: 80,
	},
	{
		props: 'unitCode',
		name: '计量单位',
		key: 'LK_JILIANGDANWEI',
		tooltip: true,
		align: 'center',
		width: 110,
	},
	{
		props: 'factoryName',
		name: '采购工厂',
		key: 'LK_CAIGOUGONGCHANG',
		tooltip: true,
		align: 'center',
		width: 160,
	},
	{
		props: 'deliveryDate',
		name: '交货日期',
		key: 'LK_JIAOHUORIQI',
		tooltip: true,
		align: 'center',
		width: 120,
	},
	{
		props: 'storageLocationCode',
		name: '库存地点',
		key: 'MODEL-ORDER.LK_KUCUNDIDIAN',
		tooltip: true,
		align: 'center',
		minWidth: 120,
	},
	{
		props: 'requestTraceNo',
		name: '需求跟踪号',
		key: 'MODEL-ORDER.LK_XUQIUGENZONGHAO',
		tooltip: true,
		align: 'center',
		width: 120,
	},
	{
		props: 'status',
		name: '状态',
		key: 'STATUS',
		tooltip: true,
		align: 'center',
		width: 110,
	},
	{
		props: 'contractRiseCode',
		name: 'RiSE协议号',
		key: 'MODEL-ORDER.LK_RISEXIEYIHAO',
		tooltip: true,
		align: 'center',
		width: 120,
	},
	// {
	//   props: 'detail',
	//   name: '',
	//   key: '',
	//   tooltip: true,
	//   align: 'center',
	//   width: 60
	// },
]

export const addType = [
	{ code: 'ZN_ONE', name: '工序委外一次性', nameEn: 'ZN_ONE' },
	{ code: 'ZN_AGT', name: '工序委外框架', nameEn: 'ZN_AGT' },
]

export const statusList = [
	{
		"name": "草稿",
		"nameEn": "Draft",
		"nameDe": null,
		"code": "-2",
	},
	{
		"name": "已退回",
		"nameEn": "Returned",
		"nameDe": null,
		"code": "-1",
	},
	{
		"name": "待签收",
		"nameEn": "Receiving",
		"nameDe": null,
		"code": "0",
	},
	{
		"name": "已签收",
		"nameEn": "Received",
		"nameDe": null,
		"code": "1",
	},
	{
		"name": "已创建订单",
		"nameEn": "Created Order",
		"nameDe": null,
		"code": "2",
	},
	{
		"name": "已关闭",
		"nameEn": "Closed",
		"nameDe": null,
		"code": "4",
	},
	{
		"name": "已定点",
		"nameEn": "Nominated",
		"nameDe": null,
		"code": "5",
	},
]
