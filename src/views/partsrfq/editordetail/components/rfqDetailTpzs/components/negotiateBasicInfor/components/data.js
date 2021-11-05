/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 13:53:08
 * @LastEditors: zbin
 * @Descripttion: your project
 */
export const tableTitle = [
  { props: 'fsNum', name: 'FS号', key: 'LK_FSHAO', tooltip: true },
  { props: 'partNum', name: '零件号', key: 'TPZS.LJH', tooltip: true },
  { props: 'partNameZh', name: '零件名', key: 'TPZS.LJM', tooltip: true },
  { props: 'procureFactoryName', name: '工厂', key: 'TPZS.GC', tooltip: true },
  { props: 'ebrValue', name: 'EBR%', key: 'TPZS.EBR', tooltip: true },
  { props: 'cycleOutput', name: '全生命周期产量', key: 'TPZS.QSMZQCL', tooltip: true },
  { props: 'maxOutput', name: '峰值年产量', key: 'TPZS.FZNCL', tooltip: true },
  { props: 'cartypeProjectZh', name: '项目名称', key: 'TPZS.XMMC', tooltip: true },
  { props: 'sopLocalDate', name: 'SOP日期', key: 'LK_SOPRIQI', tooltip: true },
]
export const supplierTableTitle = [
  { props: 'supplierNameZh', name: '供应商', key: 'costanalysismanage.GongYingShang', tooltip: true },
  { props: 'sapNum', name: 'SAP号', key: 'nominationSupplier.SAPHao', width: 120, tooltip: true },
  { props: 'supplierProductionPlace', name: '所在地', key: 'TPZS.SZD', tooltip: true },
  { props: 'isSelectMbdl', name: '是否MBDL', key: 'TPZS.SFMBDL', tooltip: true },
  { props: 'quotationStatusName', name: '报价状态', key: 'TPZS.BJZT', tooltip: true },
  { props: 'mqRate', name: 'MQ打分', key: 'TPZS.MQDF', tooltip: true },
  { props: 'plRate', name: 'PL打分', key: 'TPZS.PLDF', tooltip: true },
  { props: 'epRate', name: 'EP打分', key: 'TPZS.EPDF', tooltip: true },
]
export const fixedRecordTableTitle = [
  { props: 'fsnrGsnrNum', name: 'FS号', key: 'LK_FSHAO', tooltip: true },
  { props: 'partNum', name: '零件号', key: 'TPZS.LJH', tooltip: true },
  { props: 'rfqId', name: 'RFQ编号', key: 'costanalysismanage.RfqBianHao', width: 120, tooltip: true },
  { props: 'rfqName', name: 'RFQ名称', key: 'costanalysismanage.RfqMingCheng', tooltip: true },
  { props: 'categoryName', name: '材料组名称', key: 'TPZS.CLZMC', tooltip: true },
  { props: 'stuffName', name: '工艺组名称', key: 'TPZS.GYZMC', tooltip: true },
  { props: 'carTypeProj', name: '车型项目名称', key: 'LK_CHEXINGXIANGMUMINGCHENG', tooltip: true },
  { props: 'supplierNameCn', name: '定点供应商', key: 'LK_FIXEDPOINTSUPPLIER', tooltip: true },
  { props: 'apriceModel', name: '定点金额', key: 'TPZS.DDJE', tooltip: true },
  { props: 'nominateDate', name: '定点时间', key: 'TPZS.DDSJ', tooltip: true },
]