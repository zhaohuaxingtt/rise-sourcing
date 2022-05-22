// MTZ-规则清单
export const ruleTableTitle = [//决策资料规则清单暂用
  {
    props: 'yearCw',
    key: 'YEARCW',
    name: 'Year CW'
  },
  {
    props: 'ttMtzAppId',
    key: 'NOMINATIONNO.',
    name: 'Nomination No.',
    minWidth: '100'
  },
  {
    props: 'ruleNo',
    key: 'RULENO.',
    name: 'Rule No.',
  },
  {
    props: 'materialGroup',
    key: 'MTZ Materiral Group',
    renderHeader: h => h('div', [
      h('p', 'MTZ Materiral'),
      h('p', 'Group')
    ])
  },
  {
    props: 'carline',
    key: 'CARLINE',
    name: 'Carline',
  },
  {
    props: 'supplierName',
    key: 'SUPPLIEREN',
    name: 'Supplier',
  },
  {
    props: 'materialName',
    key: 'MATERIAL',
    name: 'Material',
  },
  {
    props: 'materialCode',
    key: 'Material Code',
    renderHeader: h => h('div', [
      h('p', 'Material'),
      h('p', 'Code')
    ])
  },
  {
    props: 'price',
    key: 'PRICE',
    name: 'Price',
  },
  {
    props: 'priceMeasureUnit',
    key: 'Price Unit',
    renderHeader: h => h('div', [
      h('p', 'Price'),
      h('p', 'Unit')
    ])
  },
  {
    props: 'tcCurrence',
    key: 'CURRENCY',
    name: 'Currency',
  },
  {
    props: 'tcExchangeRate',
    key: 'Exchange Rate',
    renderHeader: h => h('div', [
      h('p', 'Exchange'),
      h('p', 'Rate')
    ])
  },
  {
    props: 'sourceType',
    key: 'Price Market',
    renderHeader: h => h('div', [
      h('p', 'Price'),
      h('p', 'Market')
    ])
  },
  {
    props: 'compensationPeriod',
    key: 'PERIOD',
    name: 'Period',
  },
  {
    props: 'startDate',
    key: 'VALIDFROM',
    name: 'Valid From',
  },
  {
    props: 'endDate',
    key: 'VALIDTO',
    name: 'Valid To',
  },
]

// MTZ-零件清单
export const partTableTitle = [
  {
    props: 'yearCw',
    key: 'YEARCW',
    name: 'Year CW'
  },
  {
    props: 'ttMtzAppId',
    key: 'NOMINATIONNO.',
    name: 'Nomination No.',
    minWidth: '100'
  },
  {
    props: 'assemblyPartnum',
    key: 'PARTNO.',
    name: 'Part No.',
  },
  {
    props: 'partName',
    key: 'PARTNAME',
    name: 'Part Name',
  },
  {
    props: 'supplierName',
    key: 'SUPPLIEREN',
    name: 'Supplier',
  },
  {
    props: 'materialName',
    key: 'MATERIAL',
    name: 'Material',
  },
  {
    props: 'materialCode',
    key: 'Material Code',
    renderHeader: h => h('div', [
      h('p', 'Material'),
      h('p', 'Code')
    ])
  },
  {
    props: 'dosage',
    key: 'USAGE',
    name: 'Usage'
  },
  {
    props: 'dosageMeasureUnit',
    key: 'Usage Unit',
    renderHeader: h => h('div', [
      h('p', 'Usage'),
      h('p', 'Unit')
    ])
  },
  {
    props: 'tcCurrence',
    key: 'CURRENCY',
    name: 'Currency'
  },
  {
    props: 'tcExchangeRate',
    key: 'Exchange Rate',
    renderHeader: h => h('div', [
      h('p', 'Exchange'),
      h('p', 'Rate')
    ])
  },
  {
    props: 'priceSource',
    key: 'Price Market',
    renderHeader: h => h('div', [
      h('p', 'Price'),
      h('p', 'Market')
    ])
  },
  {
    props: 'compensationPeriod',
    key: 'PERIOD',
    name: 'Period'
  },
  {
    props: 'startDate',
    key: 'VALIDFROM',
    name: 'Valid From',
  },
  {
    props: 'endDate',
    key: 'VALIDTO',
    name: 'Valid To',
  },
]