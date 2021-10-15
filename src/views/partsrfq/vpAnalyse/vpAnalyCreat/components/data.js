/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 17:29:30
 * @LastEditors: zbin
 * @Descripttion: your project
 */

export const tableTitle = [
  { props: 'carTypeName', name: '单位：辆', key: 'TPZS.DWL', width: 100, tooltip: true },
  { props: 'actualProEndLastMonth', name: '', key: '' },
  { props: 'increaseRate', name: '涨幅', key: 'TPZS.ZF', width: 100, tooltip: true },
  { props: 'lifeCycle', name: '生命周期', key: 'TPZS.SMZQ', width: 120, tooltip: true },
]
export const partsTableTitle = [
  { props: 'partsId', name: '零件号', key: 'LINGJIANHAO', width: 100, tooltip: true },
  { props: 'supplierName', name: '供应商', key: 'TPZS.GYS', tooltip: true },
  { props: 'currentPlannedPro', name: '当前计划产量', key: 'TPZS.DQJHCL', width: 100, tooltip: true },
  { props: 'currentActualPro', name: '当前实际产量', key: 'TPZS.DQSJCL', width: 100, tooltip: true },
  { props: 'increaseRate', name: '涨幅', key: 'TPZS.ZF', width: 100, tooltip: true },
  { props: 'carTypeProj', name: '车型项目', key: 'TPZS.CHEXINGXIANGMU', width: 100, tooltip: true },
  { props: 'supplyBeginTime', name: 'SOP时间', key: 'TPZS.SOPSH', width: 100, tooltip: true },
]
export const partsDialogTableTitle = [
  { props: 'partsId', name: '零件号', key: 'LINGJIANHAO', tooltip: true },
  { props: 'fsId', name: 'FS号', key: 'LK_FSHAO', tooltip: true },
  { props: 'rfqId', name: 'RFQ号', key: 'RFQHAO', tooltip: true },
  { props: 'carTypeProj', name: '车型项目名称', key: 'LK_CHEXINGXIANGMUMINGCHENG', tooltip: true },
  { props: 'factory', name: '工厂', key: 'TPZS.GC', tooltip: true },
  { props: 'fixedPointStatus', name: '状态', key: 'LK_ZHUANGTAI', tooltip: true },
  { props: 'materialGroup', name: '材料组', key: 'TPZS.CLZ', tooltip: true },
  { props: 'supplierName', name: '供应商名称', key: 'LK_GONGYINGSHANGMINGCHENG', tooltip: true },
]
