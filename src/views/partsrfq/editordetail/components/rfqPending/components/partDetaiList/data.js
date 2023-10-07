/*
 * @Author: your name
 * @Date: 2021-03-04 15:18:55
 * @LastEditTime: 2022-12-05 17:37:18
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqPending\components\partDetaiList\data.js
 */

export const tableTitle = [
  { props: 'a', name: 'F SNR/G SNR/SPNR', key: 'F SNR/G SNR/SPNR' },
  { props: 'b', name: '零件号', key: 'LK_LINGJIANHAO' },
  { props: 'c', name: '零件名（中）', key: 'PARTSPROCUREPARTNAMEZH' },
  { props: 'd', name: '零件名（德）', key: 'LK_LINGJIANMINGDE' },
  { props: 'e', name: '采购工厂', key: 'LK_CAIGOUGONGCHANG' },
  { props: 'f', name: '零件项目类型', key: 'LK_LINGJIANXIANGMULEIXING' },
  { props: 'g', name: '车型大类', key: 'LK_CHEXINGDALEI' },
  { props: 'h', name: '车型项目', key: 'LK_CHEXINGXIANGMU' },
  { props: 'i', name: '零件状态', key: 'LK_LINGJIANZHUANGTAI' },
  { props: 'j', name: '询价采购员', key: 'LK_XUNJIACAIGOUYUAN' },
  { props: 'k', name: 'LINIE', key: 'LK_LINIE' },
  { props: 'l', name: 'CF', key: 'partsprocure.PARTSPROCURECF' }

]

export const kmDialogTableTitle = [
  { props: "partNum", name: "零件号", tooltip: true, key: "LINGJIANHAO" },
  { props: "fsnrGsnrNum", name: "FSNR/GSNR", tooltip: true, key: "FSNRGSNR" },
  { props: "supplierName", name: "供应商名称", tooltip: true, key: "GONGYINGSHANGMINGCHENG" },
  { props: "cbdLevel", name: "CBD层级", tooltip: true, key: "CBDCENGJI" },
  { props: "isQuotationCbd", name: "是否已报CBD", tooltip: true, key: "SHIFOUYIBAOCBD" },
  { props: "sendKmFlag", name: "发送状态", tooltip: true, key: "FASONGZHUANGTAI" },
]

export const startMonitorTitle = [
  { props: "sourcingNo", name: "SourcingNumber", tooltip: true, key: "SOURCINGNUMBER", width: 160 },
  { props: "partNum", name: "PartNumber", tooltip: true, key: "PARTNUMBER" },
  { props: "svwPlantId", name: "SvwPlant", tooltip: true, key: "SVWPLANT" },
  { props: "supplierName", name: "Supplier", tooltip: true, key: "SUPPLIER" },
  { props: "supplierDunsCode", name: "DunsCode", tooltip: true, key: "DUNSCODE" },
  { props: "share", name: "Share", tooltip: true, key: "SHARE" },
  { props: "aprice", name: "A Price", tooltip: true, key: "APRICE" },
  { props: "bprice", name: "B Price", tooltip: true, key: "BPRICE" },
  { props: "ltc", name: "Ltc", tooltip: true, key: "LTC" },
  { props: "tooling", name: "Tooling", tooltip: true, key: "TOOLING" },
]

export const dunsTipsTitle = [
  { props: "sourcingNo", name: "SourcingNumber", tooltip: true, key: "SOURCINGNUMBER", width: 160 },
  { props: "supplierName", name: "供应商", tooltip: true, key: "SUPPLIER", width: 160 },
  { props: "supplierDunsCode", name: "DUNS Code", tooltip: true, key: "DUNSCODE" },
  { props: "failReason", name: "失败原因", tooltip: true, key: "SHIBAIYUANYIN" }
]

export const applyTableTitle = [
  { props: 'fsnrGsnrNum', name: '零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true },
  { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true },
  { props: 'procureFactoryName', name: '采购工厂', key: "CAIGOUGONGCHANG", tooltip: true },
  { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGZHONG", tooltip: true },
  { props: 'partNameDe', name: '零件名(德)', key: "LINGJIANMINGDE", tooltip: true },
  { props: 'cartypeProjectZh', name: '车型/车型项目', key: "CHEXINGHUOCHEXINGXIANGMU", tooltip: true },
  { props: 'originalTargetPrice', name: '原目标价', key: "YUANMUBIAOJIA", tooltip: true },
  { props: 'businessTypeDesc', name: '类型', key: "LEIXING", tooltip: true },
  { props: 'expectedTargetPrice', name: '期望目标价', key: "QIWANGMUBIAOJIA", tooltip: true },
  { props: 'targetPrice', name: '目标价', key: "MUBIAOJIA", tooltip: true },
  { props: 'operation', name: '', key: "", tooltip: true }
]

export const iconName = {
  '已完成': 'iconrs-wancheng',
  '未完成': 'icontishi-cheng',
  '未申请': 'iconzhongyaoxinxitishi',
}

// 零件清单
export const partDetaiListTitle = [
  {
    props: "fsnrGsnrNum",
    name: "FSNF/GSNF/SPNR",
    key: "partsprocure.PARTSPROCUREFSNFGSNFSPNR",
    tooltip: true,
    minWidth: 140,
  },
  {
    props: "partNum",
    name: "零件号",
    key: "partsprocure.PARTSPROCUREPARTNUMBER",
    tooltip: true,
    minWidth: 130,
  },
  {
		props: 'sourcingNumber',
		name: 'SourcingNumber',
		key: 'SOURCINGNUMBER',
		tooltip: true,
		isCommonSourcingShow:true,
		minWidth:160
	},
  {
    props: "partNameZh",
    name: "零件名（中）",
    key: "partsprocure.PARTSPROCUREPARTNAMEZH",
    tooltip: true,
    minWidth: 140,
  },
  {
    props: "partNameDe",
    name: "零件名（德）",
    key: "partsprocure.PARTSPROCUREPARTNAMEDE",
    tooltip: true,
    minWidth: 140,
  },
  {
    props: "procureFactoryName",
    name: "采购工厂",
    key: "partsprocure.PARTSPROCUREPURCHASINGFACTORY",
    tooltip: true,
    minWidth: 100,
  },
  {
    props: "modelNameZh",
    name: "车型",
    key: "LK_CHEXING",
    tooltip: true,
    minWidth: 120,
  },
  {
    props: "carTypeProjectZh",
    name: "车型项目",
    key: "partsprocure.PARTSPROCUREMODELPROJECT",
    tooltip: true,
    minWidth: 140,
  },
  {
    props: "statusDesc",
    name: "零件状态",
    key: "partsprocure.PARTSPROCUREPARTSTATUS",
    tooltip: true,
    minWidth: 75,
  },
  {
    props: "quotationStatus",
    name: "当前轮次报价状态",
    key: "DANGQIANLUNCIBAOJIAZHUANGTAI",
    tooltip: true,
    minWidth: 90,
  },
]

// 零件添加
export const partsTableTitle = [
  {
    props: "fsnrGsnrNum",
    name: "FSNF/GSNF/SPNR",
    key: "partsprocure.PARTSPROCUREFSNFGSNFSPNR",
    tooltip: true,
    width: 120,
  },
  {
    props: "partNum",
    name: "零件号",
    key: "partsprocure.PARTSPROCUREPARTNUMBER",
    tooltip: true,
    width: 130,
  },
  {
    props: "partNameZh",
    name: "零件名（中）",
    key: "partsprocure.PARTSPROCUREPARTNAMEZH",
    tooltip: true,
    width: 140,
  },
  {
    props: "partNameDe",
    name: "零件名（德）",
    key: "partsprocure.PARTSPROCUREPARTNAMEDE",
    tooltip: true,
    width: 140,
  },
  {
    props: "procureFactoryName",
    name: "采购工厂",
    key: "partsprocure.PARTSPROCUREPURCHASINGFACTORY",
    tooltip: true,
    width: 80,
  },
  {
    props: "carTypeProjectZh",
    name: "车型项目",
    key: "partsprocure.PARTSPROCUREMODELPROJECT",
    tooltip: true,
    minWidth: 120,
  },
  {
    props: "statusDesc",
    name: "零件状态",
    key: "partsprocure.PARTSPROCUREPARTSTATUS",
    tooltip: true,
    minWidth: 75,
    isAekoShow: true,
  },
  {
    props: "buyerName",
    name: "询价采购员",
    key: "partsprocure.PARTSPROCUREINQUIRYBUYER",
    tooltip: true,
    width: 100,
  },
  {
    props: "linieName",
    name: "LINIE",
    key: "partsprocure.PARTSPROCURELINIE",
    tooltip: true,
    width: 100,
  },
]

// 零件目标价
export const partsTargetPriceTitle = [
  {
    props: "fsnrGsnrNum",
    name: "零件采购项目号",
    key: "LK_LINGJIANCAIGOUXIANGMUHAO",
  },
  { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO" },
  {
    props: "partNameZh",
    name: "零件名（中）",
    key: "LK_LINGJIANMINGZHONG",
  },
  { props: "applyType", name: "申请类型", key: "LK_SHENQINGLEIXING" },
  { props: 'cfControllerName', name: 'CF负责人', key: 'LK_CFFUZEREN', width: '180' },
  {
    props: "expTargetpri",
    name: "期望目标价",
    key: "LK_QIWANGMUBIAOJIA",
  },
  { props: "APrice", name: "A Price", key: "APrice" },
  { props: "BPrice", name: "B Price", key: "BPrice" },
  {
    props: "applyStatusDesc",
    name: "申请状态",
    key: "SHENQINGZHUANGTAI",
  },
  {
    props: "approveStatusDesc",
    name: "审批状态",
    key: "SHENPIZHUANGTAI",
  },
]

// 申请零件目标价
export const partsDialogTitle = [
  { props: 'fsnrGsnrNum', name: '零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true },
  { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true },
  { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGZHONG", tooltip: true },
  { props: 'cfControllerName', name: '财务控制员', key: "CAIWUKONGZHIYUAN", tooltip: true },
  // {props:'cfController',name:'财务控制员', key: "CAIWUKONGZHIYUAN", tooltip: true},
  { props: 'applyType', name: '申请类别', key: "LK_SHENQINGLEIBIE", tooltip: true },
  { props: 'expectedTargetPrice', name: '期望目标价', key: "QIWANGMUBIAOJIA", tooltip: true },
  { props: 'applyReason', name: '申请原因', key: "LK_SHENQINGYUANYIN", tooltip: true },
  { props: 'memo', name: '申请备注', key: "LK_SHENQINGBEIZHU", tooltip: true },
]

// 零件目标价修改记录
export const toolingTargetPriceTitle = [
  {
    props: "fsnrGsnrNum",
    name: "零件采购项目号",
    key: "LK_LINGJIANCAIGOUXIANGMUHAO",
    width: 200
  },{
    props: 'applyDate',
    name: '申请日期',
    key: 'LK_SHENQINGRIQI',
    width: 200
  },
  {
    props: 'applyType',
    name: '申请类型',
    key: 'LK_SHENQINGLEIXING'
  },
  {
    props: 'priceAnaName',
    name: 'CF负责人',
    key: 'LK_CFFUZEREN'
  },
  {
    props: 'applyCategoryDesc',
    name: '申请类别',
    key: 'LK_SHENQINGLEIBIE'
  },
  {
    props: 'expTargetpri',
    name: '期望目标价',
    key: 'LK_QIWANGMUBIAOJIA'
  },
  {
    props: 'applyStatusDesc',
    name: '申请状态',
    key: 'LK_SHENQINGZHUANGTAI'
  },
  {
    props: 'approveStatusDesc',
    name: '审批状态',
    key: 'SHENPIZHUANGTAI'
  },
]

// 模具目标价
export const moldTargetPriceTitle = [
  { props: 'fsNum', name: '零件采购项目号', key: 'LINGJIANCAIGOUXIANGMUHAO' },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO' },
  { props: 'partName', name: '零件名（中）', key: 'LK_LINGJIANMINGZHONG' },
  { props: 'applyType', name: '申请类型', key: 'LK_SHENQINGLEIXING' },
  { props: 'cfName', name: 'CF负责人', key: 'LK_CFFUZEREN', width: '180' },
  { props: 'expectedTargetPrice', name: '期望目标价', key: 'LK_QIWANGMUBIAOJIA' },
  { props: 'targetPrice', name: '目标价', key: 'LK_MUBIAOJIA' },
  { props: 'applyStatus', name: '申请状态', key: 'LK_SHENQINGZHUANGTAI' },
  { props: 'approvalStatus', name: '审批状态', key: 'LK_SHENPIZHUANGTAI' },
]

// 申请模具目标价
export const moduleDialogTitle = [
  { props: 'fsnrGsnrNum', name: '零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true, width: 140 },
  { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true },
  { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGZHONG", tooltip: true },
  { props: 'procureFactoryName', name: '采购工厂', key: "CAIGOUGONGCHANG", tooltip: true, todoHiddel: true },
  { props: 'carTypeProjectZh', name: '车型项目', key: "LK_CARPROJECT", tooltip: true, minWidth: 140, todoHiddel: true },
  { props: 'originalTargetPrice', name: '原目标价', key: "YUANMUBIAOJIA", tooltip: true },
  { props: 'businessTypeDesc', name: '类型', key: "LEIXING", tooltip: true },
  { props: 'expectedTargetPrice', name: '期望目标价', key: "QIWANGMUBIAOJIA", tooltip: true },
]

// 模具目标价修改记录
export const moldChangeRecordTitle = [
  {props:'fsNum',name:'零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'targetPrice',name:'投资目标价', key: "TOUZIMUBIAOJIA", tooltip: true},
  {props:'isValidDesc',name:'状态', key: "ZHUANGTAI", tooltip: true},
  {props:'updateUserName',name:'修改人', key: "XIUGAIREN", tooltip: true},
  {props:'updateDate',name:'修改日期', key: "XIUGAIRIQI", tooltip: true},
]