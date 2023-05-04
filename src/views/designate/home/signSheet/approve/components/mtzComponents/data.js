/*
 * @Author: youyuan
 * @Date: 2021-10-28 16:31:29
 * @LastEditTime: 2023-04-28 15:13:55
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\home\signSheet\approve\components\mtzComponents\data.js
 */
// 导航
export const methodList = [
  { code: '1', name: '一次性补差' },
  { code: '2', name: '变价单补差' }
]
export const partBalanceCountTypeList = [
  { code: 'SYSTEM', name: '系统预读' },
  { code: 'HANDWORK', name: '手工上传' }
]
export const materialDoseSourceList = [
  { code: 'BLUEPRINT', name: '图纸' },
  { code: 'WEIGH', name: '称重' },
  { code: 'CONVENTION', name: '约定' }
]
export const avgPeriodList = [
  { code: 1, name: '一月',  },
  { code: 2, name: '二月',  },
  { code: 3, name: '三月',  },
  { code: 4, name: '四月',  },
  { code: 6, name: '六月',  },
  { code: 12, name: '十二月',  },
  { code: 0, name: '补差时间段内均值',  },
]
export const offsetList = [
  { code: 1, name: '1个月',  },
  { code: 2, name: '2个月',  },
  { code: 3, name: '3个月',  },
  { code: 4, name: '4个月',  },
  { code: 5, name: '5个月',  },
  { code: 6, name: '6个月',  },
  { code: 7, name: '7个月',  },
  { code: 8, name: '8个月',  },
  { code: 9, name: '9个月',  },
  { code: 10, name: '10个月',  },
  { code: 11, name: '11个月',  },
  { code: 12, name: '12个月',  },
  { code: 0, name: '0个月',  },
  { code: -1, name: '-1个月',  },
  { code: -2, name: '-2个月',  },
  { code: -3, name: '-3个月',  },
  { code: -4, name: '-4个月',  },
  { code: -5, name: '-5个月',  },
  { code: -6, name: '-6个月',  },
  { code:-7, name: '-7个月',  },
  { code: -8, name: '-8个月',  },
  { code: -9, name: '-9个月',  },
  { code: -10, name: '-10个月',  },
  { code: -11, name: '-11个月',  },
  { code: -12, name: '-12个月',  },
]
export const tipList = [
  '<div>一般供应商：SAP系统读取</div><div>特殊供应商（VWPT等）：手工上传</div>',
  '<div>贵金属：点价单</div><div>非贵金属：上海有色金属网</div>',
  '与供应商约定的原材料基准价格',
  '当市场价>（1+阈值）*基价或市场价<(1-阈值)*基价时，自动计算出补差结果<div>超额补差：只补超出阈值部分</div><div>全额补差：补市场价超出基价的部分</div>',
  '<div>全额补差，阈值系数为0</div><div>超额补差，阈值系数为1</div>',
  '原材料在单位零件中的重量',
  '补差计算中的比例系数',
  '全年原材料市场价按均值计算周期等分。例：均值计算周期为3个月时，1-3月市场价均为1-3月的市场价均值',
  '市场价取值与本月的偏移量，例：均值偏移量为-1，计算3月补差金额时取2月市场价'
]
export const tabRouterList = [
  {
    value: 1,
    name: 'MTZ',
    url: '',
    activePath: '',
    key: 'MTZ'
  },
  {
    value: 2,
    name: '附件上传',
    url: '',
    activePath: '',
    key: 'FUJIANSHANGCHUAN'
  }
]

// mtz-表单
export const formList = [
  {
    key: 'SHENQINGDANHAO',
    label: '申请单号',
    // prop: 'ttNominateAppId',
    prop: 'mtzAppId'
  },
  {
    key: 'SHENQINGDANMING',
    label: '申请单名',
    prop: 'appName'
  },
  {
    key: 'LINIE',
    label: 'Linie',
    prop: 'linieName'
  },
  {
    key: 'KESHI',
    label: '科室',
    prop: 'linieDeptName'
  },
  {
    key: 'SHENQINGDANLEIXING',
    label: '申请单类型',
    prop: 'flowTypeName'
  },
  {
    key: 'HUIYIMINGCHENG',
    label: '会议名称',
    prop: 'meetingName'
  },
  {
    key: 'SHENQINGZHUANGTAI',
    label: '申请状态',
    prop: 'appStatus'
  }
]
export const ruleTableTitle1_2 = [
  {
    props: 'platinumPrice',
    name: '铂基价',
    overlapbottom: 'Pt Base Price',
    overlap: true
  },
  {
    props: 'platinumDosage',
    name: '铂用量',
    overlapbottom: 'Pt Consumption',
    overlap: true
  },

  {
    props: 'palladiumPrice',
    name: '钯基价',
    overlapbottom: 'Pt Base Price',
    overlap: true
  },
  {
    props: 'palladiumDosage',
    name: '钯用量',
    overlapbottom: 'Pt Consumption',
    overlap: true
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价',
    overlapbottom: 'Kr Base Price',
    overlap: true
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量',
    overlapbottom: 'Kr Consumption',
    overlap: true
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位',
    width: 200,
    overlapbottom: 'Precious Metal Consumption & Base Price Unit',
    overlap: true
  },
  {
    props: 'substrateExw',
    name: '载体费用',
    overlapbottom: 'Substrate Exw',
    overlap: true
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)',
    width: 150,
    overlapbottom: 'Substrate ImpDuty',
    overlap: true
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)',
    width: 150,
    overlapbottom: 'Substrate Handling',
    overlap: true
  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)',
    width: 150,
    overlapbottom: 'Pgm Handling',
    overlap: true
  },
  {
    props: 'manufacture',
    name: '制造费用',
    overlapbottom: 'Manufacture Exw',
    overlap: true
  },
  {
    props: 'transport',
    name: '运输费用',
    overlapbottom: 'Transport Exw',
    overlap: true
  }
]

export const ruleTableTitle1_all = [
  //决策资料规则清单暂用
  {
    props: 'ruleNo',
    name: '规则编号',
    width: 80,
    overlap: true,
    overlapbottom: 'Rule No.'
  },
  // {
  //   props: 'method',
  //   name: '补差方式',
  //   width: 70,
  //   overlap: true,
  //   overlapbottom: 'Rule Type'
  // },
  {
    props: 'sapCode',
    name: '供应商',
    minWidth: 100,
    overlap: true,
    overlapbottom: 'Supplier'
  },
  {
    props: 'materialCode',
    name: '原材料',
    width: 100,
    overlap: true,
    overlapbottom: 'Material'
  },
  {
    props: 'formalFlag',
    name: '是否新规则',
    width: 80,
    overlap: true,
    overlapbottom: 'New Rule'
  },

  {
    props: 'startDate',
    name: '有效期起',
    width: 80,
    overlap: true,
    overlapbottom: 'Valid From'
  },
  {
    props: 'endDate',
    name: '有效期止',
    width: 80,
    overlap: true,
    overlapbottom: 'Valid To'
  },
  {
    width: 110,
    props: 'partBalanceCountType',
    name: '结算数据来源',
    iconTextKey: '一般供应商：SAP系统读取；特殊供应商（VWPT等）：手工上传',
    typeIcon: 'num',
    num: '1',
    overlapbottom: 'Settle Accounts Quantity'
  },
  {
    width: 90,
    props: 'source',
    name: '市场价来源',
    iconTextKey: '贵金属：点价单非；贵金属：上海有色金属网',
    typeIcon: 'num',
    num: '2',
    overlapbottom: 'source Market'
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    width: 100,
    icon: 'iconxinxitishi',
    iconTextKey:
      '全年原材料市场价按均值计算周期等分。例：均值计算周期为3个月时，1-3月市场价均为1-3月的市场价均值',
    overlapbottom: 'Avg. Period'
  },
  {
    props: 'offsetMonth',
    name: '均值偏移量',
    width: 90,
    overlap: false,
    icon: 'iconxinxitishi',
    iconTextKey:
      '市场价取值与本月的偏移量，例：均值偏移量为-1，计算3月补差金额时取2月市场价',
    overlapbottom: 'Avg. Offset'
  },

  {
    props: 'price',
    name: '基价',
    width: 60,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3',
    overlapbottom: 'Base price'
  },
  {
    props: 'tcCurrence',
    name: '货币',
    width: 60,
    overlapbottom: 'Currency',
    overlap: true
  },
  {
    props: 'tcExchangeRate',
    name: '汇率',
    width: 70,
    overlap: true,
    overlapbottom: 'Exch. Rate'
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    width: 100,
    overlapbottom: 'Base price Unit',
    overlap: true
  },

  {
    props: 'threshold',
    name: '阈值',
    width: 70,
    iconTextKey:
      '当市场价>（1+阈值）*基价或市场价<(1-阈值)*基价时，自动计算出补差结果；超额补差：只补超出阈值部分；全额补差：补市场价超出基价的部分',
    typeIcon: 'num',
    num: '4',
    overlapbottom: 'Threshold'
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值系数',
    iconTextKey:
    '全额补差，阈值系数为0;超额补差，阈值系数为1',
    typeIcon: 'num',
    num: '5',
    width: 90,
    overlapbottom: 'Coefficient',
  },

  {
    props: 'compensationRatio',
    name: '补差%',
    width: 80,
    overlap: false,
    iconTextKey: '补差计算中的比例系数',
    typeIcon: 'num',
    num: '7',
    overlapbottom: 'Compensation%'
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    width: 90,
    overlapbottom: 'Compensation Cycle',
    overlap: true
  },
  {
    props: 'ruleVersion',
    name: '版本',
    width: 60,
    overlapbottom: 'version',
    overlap: true
  },
  {
    props: 'platinumPrice',
    name: '铂基价',
    overlapbottom: 'Pt Base Price',
    overlap: true
  },
  {
    props: 'platinumDosage',
    name: '铂用量',
    overlapbottom: 'Pt Consumption',
    overlap: true
  },

  {
    props: 'palladiumPrice',
    name: '钯基价',
    overlapbottom: 'Pt Base Price',
    overlap: true
  },
  {
    props: 'palladiumDosage',
    name: '钯用量',
    overlapbottom: 'Pt Consumption',
    overlap: true
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价',
    overlapbottom: 'Kr Base Price',
    overlap: true
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量',
    overlapbottom: 'Kr Consumption',
    overlap: true
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位',
    width: 200,
    overlapbottom: 'Precious Metal Consumption & Base Price Unit',
    overlap: true
  },
  {
    props: 'substrateExw',
    name: '载体费用',
    overlapbottom: 'Substrate Exw',
    overlap: true
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)',
    width: 150,
    overlapbottom: 'Substrate ImpDuty',
    overlap: true
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)',
    width: 150,
    overlapbottom: 'Substrate Handling',
    overlap: true
  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)',
    width: 150,
    overlapbottom: 'Pgm Handling',
    overlap: true
  },
  {
    props: 'manufacture',
    name: '制造费用',
    overlapbottom: 'Manufacture Exw',
    overlap: true
  },
  {
    props: 'transport',
    name: '运输费用',
    overlapbottom: 'Transport Exw',
    overlap: true
  }
]
// MTZ-规则清单
export const ruleTableTitle1_1 = [
  //决策资料规则清单暂用
  {
    props: 'ruleNo',
    name: '规则编号',
    width: 80,
    overlap: true,
    overlapbottom: 'Rule No.'
  },
  // {
  //   props: 'method',
  //   name: '补差方式',
  //   width: 70,
  //   overlap: true,
  //   overlapbottom: 'Rule Type'
  // },
  {
    props: 'sapCode',
    name: '供应商',
    minWidth: 100,
    overlap: true,
    overlapbottom: 'Supplier'
  },
  {
    props: 'materialCode',
    name: '原材料',
    width: 100,
    overlap: true,
    overlapbottom: 'Material'
  },
  {
    props: 'formalFlag',
    name: '是否新规则',
    width: 80,
    overlap: true,
    overlapbottom: 'New Rule'
  },

  {
    props: 'startDate',
    name: '有效期起',
    width: 80,
    overlap: true,
    overlapbottom: 'Valid From'
  },
  {
    props: 'endDate',
    name: '有效期止',
    width: 80,
    overlap: true,
    overlapbottom: 'Valid To'
  },
  {
    width: 110,
    props: 'partBalanceCountType',
    name: '结算数据来源',
    iconTextKey: '一般供应商：SAP系统读取；特殊供应商（VWPT等）：手工上传',
    typeIcon: 'num',
    num: '1',
    overlapbottom: 'Settle Accounts Quantity'
  },
  {
    width: 90,
    props: 'source',
    name: '市场价来源',
    iconTextKey: '贵金属：点价单非；贵金属：上海有色金属网',
    typeIcon: 'num',
    num: '2',
    overlapbottom: 'source Market'
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    width: 100,
    icon: 'iconxinxitishi',
    iconTextKey:
      '全年原材料市场价按均值计算周期等分。例：均值计算周期为3个月时，1-3月市场价均为1-3月的市场价均值',
    overlapbottom: 'Avg. Period'
  },
  {
    props: 'offsetMonth',
    name: '均值偏移量',
    width: 90,
    overlap: false,
    icon: 'iconxinxitishi',
    iconTextKey:
      '市场价取值与本月的偏移量，例：均值偏移量为-1，计算3月补差金额时取2月市场价',
    overlapbottom: 'Avg. Offset'
  },

  {
    props: 'price',
    name: '基价',
    width: 60,
    iconTextKey: '与供应商约定的原材料基准价格',
    typeIcon: 'num',
    num: '3',
    overlapbottom: 'Base price'
  },
  {
    props: 'tcCurrence',
    name: '货币',
    width: 60,
    overlapbottom: 'Currency',
    overlap: true
  },
  {
    props: 'tcExchangeRate',
    name: '汇率',
    width: 70,
    overlap: true,
    overlapbottom: 'Exch. Rate'
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    width: 100,
    overlapbottom: 'Base price Unit',
    overlap: true
  },

  {
    props: 'threshold',
    name: '阈值',
    width: 70,
    iconTextKey:
      '当市场价>（1+阈值）*基价或市场价<(1-阈值)*基价时，自动计算出补差结果；超额补差：只补超出阈值部分；全额补差：补市场价超出基价的部分',
    typeIcon: 'num',
    num: '4',
    overlapbottom: 'Threshold'
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值系数',
    iconTextKey:
    '全额补差，阈值系数为0;超额补差，阈值系数为1',
    typeIcon: 'num',
    num: '5',
    width: 90,
    overlapbottom: 'Coefficient',
  },

  {
    props: 'compensationRatio',
    name: '补差%',
    width: 80,
    overlap: false,
    iconTextKey: '补差计算中的比例系数',
    typeIcon: 'num',
    num: '7',
    overlapbottom: 'Compensation%'
  },
  {
    props: 'compensationPeriod',
    name: '补差周期',
    width: 90,
    overlapbottom: 'Compensation Cycle',
    overlap: true
  },
  {
    props: 'ruleVersion',
    name: '版本',
    width: 60,
    overlapbottom: 'version',
    overlap: true
  }
]
export const partTableTitle1_2 = [
  {
    props: 'tcExchangeRate',
    name: '汇率',
    overlapbottom: 'Exch. Rate',
    overlap: true
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    overlapbottom: 'Base price Unit',
    overlap: true
  },
  {
    props: 'threshold',
    name: '阈值',
    overlapbottom: 'Threshold',
    overlap: true
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值系数',
    overlapbottom: 'Coefficient',
    overlap: true
  },

  {
    props: 'compensationRatio',
    name: '补差%',
    overlapbottom: 'Compensation%',
    overlap: true
  },
  {
    props: 'partBalanceCountType',
    name: '结算数量来源类型',
    width: 150,
    overlapbottom: 'part Balance Count Type',
    overlap: true
  },
  {
    props: 'priceSource',
    name: '市场价来源Market',
    overlapbottom: 'Market',
    overlap: true
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    overlapbottom: 'Avg. Period',
    overlap: true
    // overlapbottom: 'Market'
  },
  {
    props: 'offsetMonth',
    name: '均值偏移量',
    overlapbottom: 'Avg. Offset',
    overlap: true
    // overlapbottom: 'Market'
  },

  {
    props: 'compensationPeriod',
    name: '补差周期',
    overlapbottom: 'Period',
    overlap: true
  },
  {
    props: 'mark',
    name: '备注',
    overlapbottom: 'remark',
    overlap: true
  },
  {
    props: 'ruleVersion',
    name: '版本',
    overlapbottom: 'version',
    overlap: true
  },
]
export const partTableTitle1_3 = [
  {
    props: 'platinumPrice',
    name: '铂基价',
    overlapbottom: 'Pt Base Price',
    overlap: true,
    width:150
  },
  {
    props: 'platinumDosage',
    name: '铂用量',
    overlapbottom: 'Pt Consumption',
    overlap: true
  },

  {
    props: 'palladiumPrice',
    name: '钯基价',
    overlapbottom: 'Pt Base Price',
    overlap: true
  },
  {
    props: 'palladiumDosage',
    name: '钯用量',
    overlapbottom: 'Pt Consumption',
    overlap: true
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价',
    overlapbottom: 'Kr Base Price',
    overlap: true
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量',
    overlapbottom: 'Kr Consumption',
    overlap: true
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位',
    width: 200,
    overlapbottom: 'Precious Metal Consumption & Base Price Unit',
    overlap: true
  },
  {
    props: 'substrateExw',
    name: '载体费用',
    overlapbottom: 'Substrate Exw',
    overlap: true
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)',
    width: 150,
    overlapbottom: 'Substrate ImpDuty',
    overlap: true
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)',
    width: 150,
    overlapbottom: 'Substrate Handling',
    overlap: true
  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)',
    width: 150,
    overlapbottom: 'Pgm Handling',
    overlap: true
  },
  {
    props: 'manufacture',
    name: '制造费用',
    overlapbottom: 'Manufacture Exw',
    overlap: true
  },
  {
    props: 'transport',
    name: '运输费用',
    overlapbottom: 'Transport Exw',
    overlap: true
  }
]
export const partTableTitle1_all = [
  {
    props: 'assemblyPartnum',
    name: '零件号',
    width: 110,
    overlapbottom: 'Part No.',
    overlap: true
  },
  {
    props: 'partName',
    name: '零件名称',
    overlapbottom: 'Part Name.',
    overlap: true
  },

  {
    props: 'partUnit',
    name: '零件数量单位',
    minWidth: 95,
    overlapbottom: 'Part Unit.',
    overlap: true
  },
  {
    props: 'priceUnit',
    name: '每',
    minWidth: 50,
    overlapbottom: 'Per',
    overlap: true
  },

  {
    props: 'dosage',
    name: '用量',
    minWidth: 60,
    iconTextKey: '原材料在单位零件中的重量',
    typeIcon: 'num',
    num: '6',
    overlapbottom: 'Dosage',

  },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    minWidth: 90,
    overlapbottom: 'Dosage Unit',
    overlap: true
  },
  {
    props: 'materialDoseSource',
    name: '原材料用量来源',
    width: 150,
    overlapbottom: 'Raw Material Weight Source',
    overlap: true
  },
  {
    props: 'startDate',
    name: '有效期起',
    width: 80,
    overlapbottom: 'Valid From',
    overlap: true
  },
  {
    props: 'endDate',
    name: '有效期止',
    width: 80,
    overlapbottom: 'Valid To',
    overlap: true
  },
  {
    props: 'ruleNo',
    name: '规则编号',
    minWidth: 90,
    overlapbottom: 'Rule No.',
    overlap: true
  },
  // {
  //   props: 'method',
  //   name: '补差方式',
  //   minWidth: 90,
  //   overlapbottom: 'Rule Type',
  //   overlap: true
  // },
  {
    props: 'sapCode',
    name: '供应商',
    minWidth: 80,
    overlapbottom: 'Part No.',
    overlap: true
  },
  {
    props: 'materialCode',
    name: '原材料',
    minWidth: 95,
    overlapbottom: 'Material',
    overlap: true
  },

  {
    props: 'price',
    name: '基价',
    width: 70,
    overlapbottom: 'Base price',
    overlap: true
  },
  {
    props: 'tcCurrence',
    name: '货币',
    width: 60,
    overlapbottom: 'Currency',
    overlap: true
  },

  {
    props: 'tcExchangeRate',
    name: '汇率',
    overlapbottom: 'Exch. Rate',
    overlap: true
  },
  {
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    overlapbottom: 'Base price Unit',
    overlap: true,
    width: 120,

  },
  {
    props: 'threshold',
    name: '阈值',
    overlapbottom: 'Threshold',
    overlap: true
  },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值系数',
    overlapbottom: 'Coefficient',
    overlap: true
  },

  {
    props: 'compensationRatio',
    name: '补差%',
    overlapbottom: 'Compensation%',
    overlap: true
  },
  {
    props: 'partBalanceCountType',
    name: '结算数量来源类型',
    width: 150,
    overlapbottom: 'part Balance Count Type',
    overlap: true
  },
  {
    props: 'priceSource',
    name: '市场价来源Market',
    overlapbottom: 'Market',
    overlap: true
  },
  {
    props: 'avgPeriod',
    name: '均值计算周期',
    overlapbottom: 'Avg. Period',
    overlap: true
    // overlapbottom: 'Market'
  },
  {
    props: 'offsetMonth',
    name: '均值偏移量',
    overlapbottom: 'Avg. Offset',
    overlap: true
    // overlapbottom: 'Market'
  },

  {
    props: 'compensationPeriod',
    name: '补差周期',
    overlapbottom: 'Period',
    overlap: true
  },
  {
    props: 'mark',
    name: '备注',
    overlapbottom: 'remark',
    overlap: true
  },
  {
    props: 'ruleVersion',
    name: '版本',
    overlapbottom: 'version',
    overlap: true
  },
  {
    props: 'platinumPrice',
    name: '铂基价',
    overlapbottom: 'Pt Base Price',
    overlap: true,
  },
  {
    props: 'platinumDosage',
    name: '铂用量',
    overlapbottom: 'Pt Consumption',
    overlap: true
  },

  {
    props: 'palladiumPrice',
    name: '钯基价',
    overlapbottom: 'Pt Base Price',
    overlap: true
  },
  {
    props: 'palladiumDosage',
    name: '钯用量',
    overlapbottom: 'Pt Consumption',
    overlap: true
  },
  {
    props: 'rhodiumPrice',
    name: '铑基价',
    overlapbottom: 'Kr Base Price',
    overlap: true,
  },
  {
    props: 'rhodiumDosage',
    name: '铑用量',
    overlapbottom: 'Kr Consumption',
    overlap: true
  },
  {
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位',
    width: 200,
    overlapbottom: 'Precious Metal Consumption & Base Price Unit',
    overlap: true
  },
  {
    props: 'substrateExw',
    name: '载体费用',
    overlapbottom: 'Substrate Exw',
    overlap: true
  },
  {
    props: 'substrateImpDuty',
    name: '载体税率(%)',
    width: 150,
    overlapbottom: 'Substrate ImpDuty',
    overlap: true
  },
  {
    props: 'substrateHandling',
    name: '载体管理费率(%)',
    width: 150,
    overlapbottom: 'Substrate Handling',
    overlap: true
  },
  {
    props: 'pgmHandling',
    name: '贵金属管理费率(%)',
    width: 150,
    overlapbottom: 'Pgm Handling',
    overlap: true
  },
  {
    props: 'manufacture',
    name: '制造费用',
    overlapbottom: 'Manufacture Exw',
    overlap: true
  },
  {
    props: 'transport',
    name: '运输费用',
    overlapbottom: 'Transport Exw',
    overlap: true
  }
]
// MTZ-零件清单
export const partTableTitle1_1 = [
  {
    props: 'assemblyPartnum',
    name: '零件号',
    width: 110,
    overlapbottom: 'Part No.',
    overlap: true
  },
  {
    props: 'partName',
    name: '零件名称',
    overlapbottom: 'Part Name.',
    overlap: true
  },

  {
    props: 'partUnit',
    name: '零件数量单位',
    minWidth: 95,
    overlapbottom: 'Part Unit.',
    overlap: true
  },
  {
    props: 'priceUnit',
    name: '每',
    minWidth: 30,
    overlapbottom: 'Per',
    overlap: true
  },

  {
    props: 'dosage',
    name: '用量',
    minWidth: 50,
    iconTextKey: '原材料在单位零件中的重量',
    typeIcon: 'num',
    num: '6',
    overlapbottom: 'Dosage',

  },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    minWidth: 90,
    overlapbottom: 'Dosage Unit',
    overlap: true
  },
  {
    props: 'materialDoseSource',
    name: '原材料用量来源',
    width: 150,
    overlapbottom: 'Raw Material Weight Source',
    overlap: true
  },
  {
    props: 'startDate',
    name: '有效期起',
    width: 80,
    overlapbottom: 'Valid From',
    overlap: true
  },
  {
    props: 'endDate',
    name: '有效期止',
    width: 80,
    overlapbottom: 'Valid To',
    overlap: true
  },
  {
    props: 'ruleNo',
    name: '规则编号',
    minWidth: 90,
    overlapbottom: 'Rule No.',
    overlap: true
  },
  // {
  //   props: 'method',
  //   name: '补差方式',
  //   minWidth: 90,
  //   overlapbottom: 'Rule Type',
  //   overlap: true
  // },
  {
    props: 'sapCode',
    name: '供应商',
    minWidth: 80,
    overlapbottom: 'Part No.',
    overlap: true
  },
  {
    props: 'materialCode',
    name: '原材料',
    minWidth: 95,
    overlapbottom: 'Material',
    overlap: true
  },

  {
    props: 'price',
    name: '基价',
    width: 70,
    overlapbottom: 'Base price',
    overlap: true
  },
  {
    props: 'tcCurrence',
    name: '货币',
    width: 60,
    overlapbottom: 'Currency',
    overlap: true
  }


]

// 附件上传
export const uploadTableTitle = [
  { props: 'fileName', name: '文件名', key: 'WENJIANMING', width: 600 },
  { props: 'createDate', name: '上传日期', key: 'SHANGCHUANRIQI' },
  { props: 'createByName', name: '上传人', key: 'SHANGCHUANREN' }
]

export const dateFilter = (
  val,
  format = 'YYYY-MM-DD HH:mm:ss',
  sourceFormat
) => {
  return typeof val === 'string' || typeof val === 'number'
    ? val
      ? window.moment(val, sourceFormat).format(format)
      : ''
    : val
}