// MTZ-规则清单
export const ruleTableTitle = [//决策资料规则清单暂用
  {
    props: 'yearCw',
    key: 'Year CW'
  },
  {
    props: 'ttMtzAppId',
    key: 'Nomination No.',
    minWidth: '100'
  },
  {
    props: 'ruleNo',
    key: 'Rule No.'
  },
  {
    props: 'materialGroupName',
    key: 'MTZ Materiral Group',
    renderHeader: h => h('div', [
      h('p', 'MTZ Materiral'),
      h('p', 'Group')
    ])
  },
  {
    props: 'carline',
    key: 'Carline'
  },
  {
    props: 'supplierName',
    key: 'Supplier'
  },
  {
    props: 'materialName',
    key: 'Material'
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
    key: 'Price'
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
    key: 'Currency'
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
    key: 'Period'
  },
  {
    props: 'startDate',
    key: 'Valid From'
  },
  {
    props: 'endDate',
    key: 'Valid To'
  },
]

// MTZ-零件清单
export const partTableTitle = [
  {
    props: 'yearCw',
    key: 'Year CW',
  },
  {
    props: 'ttMtzAppId',
    key: 'Nomination No.',
    minWidth: '100'
  },
  {
    props: 'ruleNo',
    key: 'Part_No.'
  },
  {
    props: 'partName',
    key: 'Part_Name'
  },
  {
    props: 'supplierName',
    key: 'Supplier'
  },
  {
    props: 'materialName',
    key: 'Material'
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
    key: 'Usage'
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
    key: 'Currency'
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
    key: 'Period'
  },
  {
    props: 'startDate',
    key: 'Valid From'
  },
  {
    props: 'endDate',
    key: 'Valid To'
  },
]