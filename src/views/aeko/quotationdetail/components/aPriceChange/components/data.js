export const cbdSummaryTableTitle = [
  { props: "a", seq: "2.1", key: "YUANCAILIAOSANJIANCHENGBENBIANDONG", name: "原材料/散件成本变动" },
  { props: "b", seq: "2.2", key: "ZHIZAOCHENGBENBIANDONG", name: "制造成本变动" },
  { props: "c", seq: "2.3", key: "BAOFEICHENGBENBIANDONG", name: "报废成本变动" },
  { props: "d", seq: "2.4", key: "GUANLIFEIBIANDONG", name: "管理费变动" },
  { props: "e", seq: "2.5", key: "QITAFEIYONG", name: "其他费⽤" },
  { props: "f", seq: "2.6", key: "LIRUNBIANDONG", name: "利润变动" },
  { props: "g", key: "AJIABIANDONG", name: "A价变动" },
]

export const scrapCostTableTitle = [
  { props: "index", name: "#", width: "60" },
  { props: "a", key: "BAOFEICHENGBEN", name: "报废成本", width: "190" },
  { props: "b", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('YUANBAOFEILV', '原报废率') }(%)` }}) }, width: "110" },
  { props: "c", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('XIANBAOFEILV', '现报废率') }(%)` }}) }, width: "110" },
  { props: "d", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('BIANDONGJINE', '变动金额') }(RMB/Pc.)` }}) } },
]

export const manageCostTableTitle = [
  { props: "index", name: "#", width: "60" },
  { props: "a", key: "GUANLIFEI", name: "管理费", width: "190" },
  { props: "b", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('YUANBILI', '原比例') }(%)` }}) }, width: "110" },
  { props: "c", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('XIANBILI', '现比例') }(%)` }}) }, width: "110" },
  { props: "d", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('BIANDONGJINE', '变动金额') }(RMB/Pc.)` }}) } },
]

export const otherCostTableTitle = [
  { props: "index", name: "#", width: "60" },
  { props: "a", key: "QITAFEIYONG", name: "其他费用", width: "190" },
  { props: "b", key: "JINE", name: "金额", width: "110" },
  { props: "c", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('FENTANSHULIANG', '分摊数量') }(1..n)` }}) }, width: "110" },
  { props: "d", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('FENTANJINE', '分摊金额') }(RMB/Pc.)` }}) } },
]

export const profitTableTitle = [
  { props: "index", name: "#", width: "60" },
  { props: "a", key: "LIRUN", name: "利润", width: "190" },
  { props: "b", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('YUANBILI', '原比例') }(%)` }}) }, width: "110" },
  { props: "c", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('XIANBILI', '现比例') }(%)` }}) }, width: "110" },
  { props: "d", renderHeader(h) { return h('span', { domProps: { innerHTML: `${ this.language('BIANDONGJINE', '变动金额') }(RMB/Pc.)` }}) } },
]