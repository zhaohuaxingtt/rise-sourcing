// 搜索
export const search=[
	{props: 'name', name: '报告名称', type: 'input',key:'TPZS.BGMC',placeholder:'TPZS.QSRBGMC'},
	{props: 'toolType', name: '分析工具类型', type: 'select',select:'REPORT_TOOL_TYPE',key:'TPZS.FXGJLX'},
	{props: 'materialGroup', name: '材料组', type: 'input',key:'LK_CAILIAOZU',placeholder:'TPZS.QSRCLZ'},
	{props: 'partsNo', name: '零件号', type: 'input',key:'LK_LINGJIANHAO',placeholder:'TPZS.QSRLJH'},
	{props: 'rfq', name: 'RFQ号/名称', type: 'input', key:'TPZS.RFQHMC',placeholder:'TPZS.QSRRFQMC'},
]

// 专项分析工具
export const specialToolsTitle = [
   { props: 'name', name: '报告名称', key: 'TPZS.BGMC', tooltip: true },
   { props: 'toolType', name: '分析工具类型', key: 'TPZS.FXGJLX', tooltip: true },
   { props: 'materialGroup', name: '材料组', key: 'LK_CAILIAOZU', tooltip: true },
   { props: 'rfq', name: 'RFQ', key: 'TPZS.RFQ', tooltip: true },
   { props: 'isDefault', name: '默认项', key: 'TPZS.MRX', tooltip: true },
   { props: 'type', name: '文件类型', key: 'TPZS.WJLX', tooltip: true },
   { props: 'createByName', name: '创建人', key: 'TPZS.CJR', tooltip: true },
   { props: 'createDate', name: '创建日期', key: 'LK_CHUANGJIANRIQI', tooltip: true },
   { props: 'updateDate', name: '上次修改日期', key: 'TPZS.SCXGRQ', tooltip: true },
]

// 报价分析
export const quotationAnalysisTitle = [
   { props: 'version', name: '报告名称', key: 'TPZS.BGMC', tooltip: true },
   { props: 'tpId', name: 'RFQ', key: 'TPZS.RFQ', tooltip: true },
]

// 谈判基本信息
export const negotiationBasicTitle = [
   { props: 'version', name: '报告名称', key: 'TPZS.BGMC', tooltip: true },
   { props: 'tpId', name: 'RFQ', key: 'TPZS.RFQ', tooltip: true },
]