/*
 * @Author: YoHo
 * @Date: 2021-10-11 17:18:47
 * @LastEditTime: 2021-10-11 19:00:57
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
    label: '制造成本', labelKey: 'LK_AEKOHAO_MANAGE', children: [
      { prop: 'col1', label: '#', width: '80', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { isNew: true, width: '40', minWidth: '40', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col2', label: '制造工序', width: '120', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
    ]
  },
  { prop: 'col3', label: '对应原材料/散件（Ref.-ID）', width: '140', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col4', label: '设备名称/型号（Ref.-Name）', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col5', label: '上汽大众专用设备费（RMB）', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col6', label: '生产节拍（Sec.）', width: '160', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col7', label: '件数/生产节拍（1..n）', width: '120', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  {
    label: '人工成本', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [
      { prop: 'col8', label: '直接人工费率（RMB/Hour）', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col9', label: '直接人工数量（0..n）', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
    ]
  },
  {
    label: '设备费', width: '160', labelKey: 'LK_AEKOHAO_MANAGE', children: [
      { prop: 'col10', label: '直接人工费率（RMB/Hour）', width: '160', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
    ]
  },
  {
    label: '间接制造成本', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [
      { prop: 'col11', label: '（%）', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
      { prop: 'col12', label: '（RMB/Pc.）', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
    ]
  },
  { prop: 'col13', label: '人工成本（RMB/Pc.）', width: '100', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
  { prop: 'col14', label: '设备成本（RMB/Pc.）', width: 'auto', labelKey: 'LK_AEKOHAO_MANAGE', children: [] },
]