/*
 * @Author: YoHo
 * @Date: 2021-10-11 17:18:47
 * @LastEditTime: 2021-10-19 18:20:08
 * @LastEditors: YoHo
 * @Description: 
 */
// CBD-汇总表
export const SummaryTableTitle = [
  { prop: 'index', label: '#', labelKey: '#', width: '70', children: [] },
  { prop: 'partNum', label: 'AEKO零件号', width: '140', labelKey: 'AEKOLINGJIANHAO', children: [] },
  { prop: 'typeName', label: '类别', width: '140', labelKey: 'LEIBIE', children: [] },
  { prop: 'newContent', label: '内容', width: '140', labelKey: 'NEIRONG', children: [] },
  {
    label: '原零件', labelKey: 'YUANLINGJIAN', children: [
      { prop: 'originPartNum', label: '原零件号', width: '120', labelKey: 'YUANLINGJIANHAO', children: [] },
      { prop: 'originUnitPrice', label: '单价', width: '100', labelKey: 'DANJIA', children: [] },
      { prop: 'originUnit', label: '单位', width: '100', labelKey: 'DANWEI', children: [] },
      { prop: 'originUseage', label: '用量', width: '100', labelKey: 'YONGLIANG', children: [] },
      { prop: 'originTotalPrice', label: '小计', width: '100', labelKey: 'XIAOJI', children: [] },
    ]
  },
  {
    label: '新零件', labelKey: 'XINLINGJIAN', children: [
      { prop: 'newPartNum', label: '新零件号', width: '120', labelKey: 'XINLINGJIANHAO', children: [] },
      { prop: 'newUnitPrice', label: '单价', width: '100', labelKey: 'DANJIA', children: [] },
      { prop: 'newUnit', label: '单位', width: '100', labelKey: 'DANWEI', children: [] },
      { prop: 'newUseage', label: '用量', width: '100', labelKey: 'YONGLIANG', children: [] },
      { prop: 'newTotalPrice', label: '小计', width: '100', labelKey: 'XIAOJI', children: [] },
    ]
  },
  { prop: 'alteration', label: '变动值', width: '100', labelKey: 'BIANDONGZHI', children: [] },
]
// 切换零件
export const switchPartsTableTitle = [
  { props: "originAPrice", key: "YUANAJIA", name: "原A价", tooltip: true },
  { props: "apriceChange", key: "AJIABIANDONGHANFENTAN", name: "A价变动(含分摊)", tooltip: true },
  { props: "aprice", key: "XINAJIA", name: "新A价", tooltip: true },
  { props: "originBnkFee", key: "YUANBNKJIA", name: "原BNK价", tooltip: true },
  { props: "bnkFee", key: "XINBNKJIA", name: "新BNK价", tooltip: true },
  { props: "tooling", key: "MUJUTOUZIBIANDONG", name: "模具投资变动", tooltip: true },
  { props: "developmentCost", key: "KAIFAFEI", name: "开发费", tooltip: true },
  { props: "terminationPrice", key: "ZHONGZHIFEI", name: "终止费", tooltip: true },
  { props: "sampleCost", key: "YANGJIANFEI", name: "样件费", tooltip: true },
  { props: "currency", key: "HUOBI", name: "货币", tooltip: true },
  { props: "measureUnit", key: "JILIANGDANWEI", name: "计量单位", tooltip: true }
]
// 变动值-CBD
export const cbdSummaryTableTitle = [
  { props: "materialChange", seq: "2.1", key: "YUANCAILIAOSANJIANCHENGBENBIANDONG", name: "原材料/散件成本变动" },
  { props: "makeCostChange", seq: "2.2", key: "ZHIZAOCHENGBENBIANDONG", name: "制造成本变动" },
  { props: "discardCostChange", seq: "2.3", key: "BAOFEICHENGBENBIANDONG", name: "报废成本变动" },
  { props: "manageFeeChange", seq: "2.4", key: "GUANLIFEIBIANDONG", name: "管理费变动" },
  { props: "otherFee", seq: "2.5", key: "QITAFEIYONG", name: "其他费⽤" },
  { props: "profitChange", seq: "2.6", key: "LIRUNBIANDONG", name: "利润变动" },
  { props: "apriceChange", key: "AJIABIANDONG", name: "A价变动" },
]
// 原材料/散件成本
export const partsCostTableTitle = [
  {
    label: '原材料/散件成本', labelKey: 'YUANCAILIAOSANJIANCHENGBEN', children: [
      { prop: 'serialNum', label: '#', labelKey: '#', width: '85', children: [] },
      { isNew: true, prop: 'partName', label: '类型', width: '160', labelKey: 'LEIXING', children: [] },
    ]
  },
  { prop: 'partNumber', label: '原材料/散件描述', width: '150', labelKey: 'YUANCAILIAOSANJIANMIAOSHU', children: [] },
  { prop: 'supplierName', label: '供应商名称', width: '110', labelKey: 'GONGYINGSHANGMINGCHENG', children: [] },
  { prop: 'productionCountry', label: '原产国', width: '110', labelKey: 'YUANCHANGUO', children: [] },
  { prop: 'isSvwAssignPriceParts', label: '', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('是否', '是否')}SVW<br/>${this.language('指定价格散件', '指定价格散件')}` } }) }, type: 'Boolean', width: '140', labelKey: 'SHIFOUSVWZHIDINGJIAGESANJIAN', children: [] },
  { prop: 'quantityUnit', width: '100', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHULIANGDANWEI', '数量单位')}<br/>（UoM）` } }) }, children: [] },
  { prop: 'unitPrice', width: '145', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('DANJIARMBUOM', '单价')}(RMB/UoM)` } }) }, children: [] },
  { prop: 'quantity', width: '100', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHULIANG', '数量')}(1..n)` } }) }, children: [] },
  { prop: 'directMaterialCost', width: '175', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('ZHIJIEYUANCAILIAOSANJIANCHENGBEN', '直接原材料/散件成本')}<br/>（RMB/Pc.）` } }) }, children: [] },
  {
    label: '物料管理费', labelKey: 'WULIAOGUANLIFEI', children: [
      { prop: 'materialManageCostRate', label: '(%)', labelKey: '(%)', width: '110', children: [] },
      { prop: 'materialManageCost', label: '(RMB/Pc.)', labelKey: '(RMB/Pc.)', width: '115', children: [] },
    ]
  },
  { prop: 'materialCost', width: '147', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('YUANCAILIAOSANJIANCHENGBEN', '原材料/散件成本')}<br/>（RMB/Pc.）` } }) }, children: [] },
]
// 制造成本
export const manufacturingCostTableTitle = [
  {
    label: '制造成本', labelKey: 'ZHIZAOCHENGBEN', children: [
      { prop: 'serialNum', label: '#', labelKey: '#', width: '80', children: [] },
      { isNew: true, prop: 'manufacturingMethod', label: '制造工序', labelKey: 'ZHIZAOGONGXU', width: '170', children: [] },
    ]
  },
  { prop: 'material', width: '135', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('DUIYINGYUANCAILIAOSANJIAN', '对应原材料/散件')}<br/>(Ref.-ID)` } }) }, children: [] },
  { prop: 'machineName', width: '120', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHEBEIMINGCHENGXINGHAO', '设备名称/型号')}<br/>(Ref.-Name)` } }) }, children: [] },
  { prop: 'specialDeviceCost', width: '160', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHANGQIDAZHONGZHUANYONGSHEBEIFEI', '上汽大众专用设备费')}<br/>(RMB)` } }) }, children: [] },
  { prop: 'taktTime', width: '85', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHENGCHANJIEPAI', '生产节拍')}<br/>(Sec.)` } }) }, children: [] },
  { prop: 'taktTimeNumber', width: '120', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('JIANSHUSHENGCHANJIEPAI', '件数/生产节拍')}<br/>(1..n)` } }) }, children: [] },
  {
    label: '人工成本', labelKey: 'RENGONGCHENGBEN', children: [
      { prop: 'directLaborRate', width: '115', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('ZHIJIERENGONGFEILV', '直接人工费率')}<br/>(RMB/Hour)` } }) }, children: [] },
      { prop: 'directLaborQuantity', width: '115', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('ZHIJIERENGONGSHULIANG', '直接人工数量')}<br/>(0..n)` } }) }, children: [] },
    ]
  },
  {
    label: '设备费', labelKey: 'SHEBEIFEI', children: [
      { prop: 'deviceRate', width: '115', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHEBEIFEILV', '设备费率')}<br/>(RMB/Hour)` } }) }, children: [] },
    ]
  },
  {
    label: '间接制造成本', labelKey: 'JIANJIEZHIZAOCHENGBEN', children: [
      { prop: 'indirectManufacturingRate', label: '(%)', labelKey: '(%)', width: '85', children: [] },
      { prop: 'indirectManufacturingAmount', label: '(RMB/Pc.)', labelKey: '(RMB/Pc.)', width: '100', children: [] },
    ]
  },
  { prop: 'laborCost', width: '110', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('RENGONGCHENGBEN', '人工成本')}<br/>(RMB/Pc.)` } }) }, children: [] },
  { prop: 'deviceCost', width: '110', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHEBEICHENGBEN', '设备成本')}<br/>(RMB/Pc.)` } }) }, children: [] },
]
// 报废成本
export const scrapCostTableTitle = [
  { props: "index", name: "#", width: "80" },
  // { props: "amount", key: "BAOFEICHENGBEN", name: "报废成本", width: "210" },
  { props: "typeNameByLang", key: "BAOFEICHENGBEN", name: "报废成本", width: "210" },
  { props: "originRatio", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('YUANBAOFEILV', '原报废率')}(%)` } }) }, width: "140" },
  { props: "ratio", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('XIANBAOFEILV', '现报废率')}(%)` } }) }, width: "140" },
  { props: "changeAmount", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('BIANDONGJINE', '变动金额')}(RMB/Pc.)` } }) }, width: "auto" },
]
// 管理费
export const manageCostTableTitle = [
  { props: "index", name: "#", width: "80" },
  { props: "typeNameByLang", key: "GUANLIFEI", name: "管理费", width: "300" },
  { props: "originRatio", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('YUANBILI', '原比例')}(%)` } }) }, width: "110" },
  { props: "ratio", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('XIANBILI', '现比例')}(%)` } }) }, width: "100" },
  { props: "changeAmount", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('BIANDONGJINE', '变动金额')}(RMB/Pc.)` } }) }, width: "auto" },
]

// 其它费用
export const otherCostTableTitle = [
  { props: "index", name: "#", width: "80" },
  { props: "itemTypeNameByLang", key: "QITAFEIYONG", name: "其他费用", width: "210" },
  { props: "shareTotal", key: "JINE", name: "金额", width: "140" },
  { props: "shareQuantity", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('FENTANSHULIANG', '分摊数量')}(1..n)` } }) }, width: "140" },
  { props: "shareAmount", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('FENTANJINE', '分摊金额')}(RMB/Pc.)` } }) }, width: "auto" },
]
// 利润
export const profitTableTitle = [
  { props: "index", name: "#", width: "80" },
  { props: "typeNameByLang", key: "LIRUN", name: "利润", width: "310" },
  { props: "originRatio", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('YUANBILI', '原比例')}(%)` } }) }, width: "110" },
  { props: "ratio", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('XIANBILI', '现比例')}(%)` } }) }, width: "100" },
  { props: "changeAmount", renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('BIANDONGJINE', '变动金额')}(RMB/Pc.)` } }) }, width: "auto" },
]
// 是否为“新”数据
export const originRowClass = function ({ row }) {
  return row.partCbdType!=1 ? "isNewRow" : "originRow"
}
// 是否为“TOTAL”数据
export const totalRowClass = function ({ row }) {
  return row.total ? "totalRow" : ""
}

// 模具投资变动
export const moduleTableTitle = [
  { props: "mouldId", key: "MUJUID", name: "模具ID", width: 120 },
  { props: "isShared", key: "SHIFOUFENTAN", name: "是否分摊", width: 120 },
  { props: "changeType", key: "BIANGENGLEIXING", name: "变更类型", width: 120 },
  { props: "fixedAssetsName", key: "GUDINGZICHANMINGCHENG", name: "固定资产名称", tipsLang: true, tipsKey: "GUDINGZICHANMINGCHENGTIPS", tips: "由“零件总成名称”、“零部件名称”、 “工模具种类”组成", width: 150 },
  { props: "stuffType", key: "GONGYILEIXING", name: "工艺类型", tipsLang: true, tipsKey: "GONGYILEIXINGTIPS", tips: "如注塑，冲压，电镀等", width: 120 },
  { props: "mouldType", key: "GONGMUJUZHONGLEI", name: "工模具种类", tipsLang: true, tipsKey: "GONGMUJUZHONGLEITIPS", tips: "如：热流道注塑模", width: 135 },
  { props: "assetTypeCode", key: "ZICHANFENLEIBIANHAO", name: "资产分类编号", tipsLang: true, tipsKey: "ZICHANFENLEIBIANHAOTIPS", tips: "13：模具<br/>14：夹具<br/>15：检具<br/>16：其他工装", width: 150 },
  { props: "assembledPartPrjCode", key: "FSHAO", name: "FS号", width: 120 },
  { props: "supplierPartNameList", key: "SANJIANMINGCHENG", name: "散件名称", tipsLang: true, tipsKey: "SANJIANMINGCHENGTIPS", tips: "<p style='text-align: center'>零部件名称</p>", width: 120 },
  { props: "supplierPartCodeList", key: "SANJIANLINGJIANHAO", name: "散件零件号", tipsLang: true, tipsKey: "SANJIANLINGJIANHAOTIPS", tips: "<p style='text-align: center'>散件零件号<br/>(若无，则用总成号)</p>", width: 135 },
  { props: "quantity", key: "SHULIANG", name: "数量", tipsLang: true, tipsKey: "SHULIANGTIPS", tips: "<p style='text-align: center'>必须为整数</p>", width: 100 },
  { props: "changeUnitPrice", key: "ZICHANBIANDONGDANJIA", name: "资产变动单价", tipsLang: true, tipsKey: "ZICHANBIANDONGDANJIATIPS", tips: "<p style='text-align: center'>不含税价格，<br/>并且保留两位小数</p>", width: 150 },
  { props: "changeTotalPrice", key: "ZICHANBIANDONGZONGE", name: "资产变动总额", width: 150 },
  { props: "originTotalPrice", key: "YUANLINGJIANZICHANZONGE", name: "原零件资产总额", width: 165 },
  { props: "totalPrice", key: "XINLINGJIANZICHANZONGE", name: "新零件资产总额", width: 165 }
]
// 模具投资数据
export const mouldCostInfos = [
  { props: "totalPrice", name: "总投资变动成本", key: "ZONGTOUZIBIANDONGCHENGBEN" },
  { props: "shareTotal", name: "分摊投资变动成本", key: "FENTANTOUZIBIANDONGCHENGBEN" },
  { props: "shareQuantity", name: "分摊数量", key: "LK_FENTANSHULIANG" },
  { props: "shareAmount", name: "单件投资变动成本", key: "DANJIANTOUZICHENGBENBIANDONG" }
]