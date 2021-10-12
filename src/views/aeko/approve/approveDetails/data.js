/*
 * @Author: YoHo
 * @Date: 2021-10-11 17:18:47
 * @LastEditTime: 2021-10-12 11:08:08
 * @LastEditors: YoHo
 * @Description: 
 */
// CBD-汇总表
export const SummaryTableTitle = [
  { prop: 'col1', label: '#', width: '70', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col2', label: 'AEKO零件号', width: '140', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col3', label: '类别', width: '140', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col4', label: '内容', width: '140', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  {
    label: '原零件', labelKey: 'LK_AEKOHAO_MANAGE', children: [
      { prop: 'col5', label: '原零件号', width: '120', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col6', label: '单价', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col7', label: '单位', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col8', label: '用量', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col9', label: '小计', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
    ]
  },
  {
    label: '新零件', labelKey: 'LK_AEKOHAO_MANAGE', children: [
      { prop: 'col10', label: '新零件号', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col11', label: '单价', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col12', label: '单位', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col13', label: '用量', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col14', label: '小计', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
    ]
  },
  { prop: 'col15', label: '变动值', width: 'auto', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
]
// 切换零件
export const switchPartsTableTitle = [
  {
    prop: "col1",
    label: "原A价",
    i18n: "原A价",
    customRender: (h, scope) => {
      return (
        <el-tooltip
          content="台账库"
          placement="top"
          effect="light"
          popper-class="custom-card-tooltip"
        >
          <span>{scope.row.col1}</span>
        </el-tooltip>
      );
    },
  },
  {
    prop: "col2",
    label: "A价变动(含分摊)",
    i18n: "A价变动(含分摊)",
  },
  {
    prop: "col3",
    label: "新A价",
    i18n: "新A价",
  },
  {
    prop: "col4",
    label: "原BNK价",
    i18n: "原BNK价",
  },
  {
    prop: "col5",
    label: "新BNK价",
    i18n: "新BNK价",
  },
  {
    prop: "col6",
    label: "模具投资变动",
    i18n: "模具投资变动",
  },
  {
    prop: "col7",
    label: "开发费",
    i18n: "开发费",
  },
  {
    prop: "col8",
    label: "终止费",
    i18n: "终止费",
  },
  {
    prop: "col9",
    label: "样件费",
    i18n: "样件费",
  },
  {
    prop: "col10",
    label: "货币",
    i18n: "货币",
  },
  {
    prop: "col11",
    label: "计量单位",
    i18n: "计量单位",
  },
]
// 变动值-CBD
export const changesValueCBD = [
  {
    prop: "col1",
    label: "原A价",
    i18n: "原A价",
    customRender: (h, scope) => {
      return (
        <el-tooltip
          content="台账库"
          placement="top"
          effect="light"
          popper-class="custom-card-tooltip"
        >
          <span>{scope.row.col1}</span>
        </el-tooltip>
      );
    },
  },
  {
    prop: "col2",
    label: "A价变动(含分摊)",
    i18n: "A价变动(含分摊)",
  },
  {
    prop: "col3",
    label: "新A价",
    i18n: "新A价",
  },
  {
    prop: "col4",
    label: "原BNK价",
    i18n: "原BNK价",
  },
  {
    prop: "col5",
    label: "新BNK价",
    i18n: "新BNK价",
  },
  {
    prop: "col6",
    label: "模具投资变动",
    i18n: "模具投资变动",
  },
  {
    prop: "col7",
    label: "开发费",
    i18n: "开发费",
  },
  {
    prop: "col8",
    label: "终止费",
    i18n: "终止费",
  },
  {
    prop: "col9",
    label: "样件费",
    i18n: "样件费",
  },
  {
    prop: "col10",
    label: "货币",
    i18n: "货币",
  },
  {
    prop: "col11",
    label: "计量单位",
    i18n: "计量单位",
  },
]
// 原材料/散件成本
export const partsCostTableTitle = [
  {
    label: '原材料/散件成本', labelKey: 'LK_AEKOHAO_MANAGE', children: [
      { prop: 'col1', label: '#', width: '80', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { isNew: true, width: '40', minWidth: '40', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col2', label: '类型', width: '120', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
    ]
  },
  { prop: 'col3', label: '原材料/散件描述', width: '140', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col4', label: '供应商名称', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col5', label: '原产国', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col6', label: '是否SVW指定价格散件', width: '160', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col7', label: '数量单位（UoM）', width: '120', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col8', label: '单价(RMB/UoM)', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col9', label: '数量(1..n)', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col10', label: '直接原材料/散件成本 （RMB/Pc.）', width: '160', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  {
    label: '物料管理费', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [
      { prop: 'col11', label: '（%）', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col12', label: '（RMB/Pc.）', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
    ]
  },
  { prop: 'col13', label: '原材料/散件成本（RMB/Pc.）', width: 'auto', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
]
// 制造成本
export const manufacturingCostTableTitle = [
  {
    label: '制造成本', labelKey: 'ZHIZAOCHENGBEN', children: [
      { prop: 'col1', label: '#', width: '80', children: [] },
      { prop: 'col2', label: '制造工序', labelKey: 'ZHIZAOGONGXU', width: '160', children: [] },
    ]
  },
  { prop: 'col3', width: '140', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('DUIYINGYUANCAILIAOSANJIAN', '对应原材料/散件')}<br/>（Ref.-ID）` } }) }, children: [] },
  { prop: 'col4', width: '100', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHEBEIMINGCHENGXINGHAO', '设备名称/型号')}<br/>（Ref.-Name）` } }) }, children: [] },
  { prop: 'col5', width: '100', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHANGQIDAZHONGZHUANYONGSHEBEIFEI', '上汽大众专用设备费')}<br/>（RMB）` } }) }, children: [] },
  { prop: 'col6', width: '160', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHENGCHANJIEPAI', '生产节拍')}<br/>（Sec.）` } }) }, children: [] },
  { prop: 'col7', width: '120', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('JIANSHUSHENGCHANJIEPAI', '件数/生产节拍')}<br/>（1..n）` } }) }, children: [] },
  {
    label: '人工成本', labelKey: 'RENGONGCHENGBEN', width: '100', children: [
      { prop: 'col8', width: '100', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('ZHIJIERENGONGFEILV', '直接人工费率')}<br/>（RMB/Hour）` } }) }, children: [] },
      { prop: 'col9', width: '100', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('ZHIJIERENGONGSHULIANG', '直接人工数量')}<br/>（0..n）` } }) }, children: [] },
    ]
  },
  {
    label: '设备费', labelKey: 'SHEBEIFEI', width: '160', children: [
      { prop: 'col10', width: '160', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHEBEIFEILV', '设备费率')}<br/>（RMB/Hour）` } }) }, children: [] },
    ]
  },
  {
    label: '间接制造成本', labelKey: 'JIANJIEZHIZAOCHENGBEN', width: '100', children: [
      { prop: 'col11', label: '(%)', width: '100', children: [] },
      { prop: 'col12', label: '(RMB/Pc.)', width: '100', children: [] },
    ]
  },
  { prop: 'col13', width: '100', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('RENGONGCHENGBEN', '人工成本')}<br/>（RMB/Pc.）` } }) }, children: [] },
  { prop: 'col14', width: 'auto', renderHeader(h) { return h('span', { domProps: { innerHTML: `${this.language('SHEBEICHENGBEN', '设备成本')}<br/>（RMB/Pc.）` } }) }, children: [] },
]

export const originRowClass = function ({ row }) {
  return row.partCbdType == 0 || row.partCbdType == 1 ? "originRow" : ""
}