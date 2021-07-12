/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 13:53:08
 * @LastEditors: zbin
 * @Descripttion: your project
 */
export const tableTitle = [
  { props: 'fsNum', name: 'FS号', key: 'LK_FSHAO', },
  { props: 'partNum', name: '零件号', key: 'TPZS.LJH', },
  {
    props: 'partNameZh', name: '零件名', key: 'TPZS.LJM', 
  },
  { props: 'procureFactory', name: '工厂', key: 'TPZS.GC', },
  { props: 'ebrCalculatedValue', name: 'EBR%', key: 'TPZS.EBR', },
  { props: 'cycleOutput', name: '全生命周期产量', key: 'TPZS.QSMZQCL', },
  { props: 'maxOutput', name: '峰值年产量', key: 'TPZS.FZNCL', },
  { props: 'cartypeProjectZh', name: '项目名称', key: 'TPZS.XMMC', },
  { props: 'sopDate', name: 'SOP日期', key: 'LK_SOPRIQI', },
]
export const supplierTableTitle = [
  { props: 'supplierNameZh', name: '供应商', key: 'costanalysismanage.GongYingShang', },
  {
    props: 'sapNum', name: 'SAP号', key: 'nominationSupplier.SAPHao', width: 120,
  },
  { props: 'pupplierProductionPlace', name: '所在地', key: 'TPZS.SZD', },
  { props: 'isSelectMbdl', name: '是否MBDL', key: 'TPZS.SFMBDL', },
  { props: 'quotationStatusCode', name: '报价状态', key: 'TPZS.BJZT', },
  { props: 'mqRate', name: 'MQ打分', key: 'TPZS.MQDF', },
  { props: 'plRate', name: 'PL打分', key: 'TPZS.PLDF', },
  { props: 'epRate', name: 'EP打分', key: 'TPZS.EPDF', },
]
export const fixedRecordTableTitle = [
  { props: 'partNum', name: '零件号', key: 'TPZS.LJH', },
  {
    props: 'rfqId', name: 'RFQ编号', key: 'costanalysismanage.RfqBianHao', width: 120,
  },
  { props: 'rfqName', name: 'RFQ名称', key: 'costanalysismanage.RfqMingCheng', },
  { props: 'categoryName', name: '材料组名称', key: 'TPZS.CLZMC', },
  { props: 'stuffName', name: '工艺组名称', key: 'TPZS.GYZMC', },
  { props: 'partProjectType', name: '零件采购项目', key: 'partsignLanguage.CaiGouXiangMuJianLi', },
  { props: 'carTypeProj', name: '车型项目名称', key: 'LK_CHEXINGXIANGMUMINGCHENG', },
  { props: 'supplierNameCn', name: '定点供应商', key: 'LK_FIXEDPOINTSUPPLIER', },
  { props: 'apriceModel', name: '定点金额', key: 'TPZS.DDJE', },
  { props: 'nominateTime', name: '定点时间', key: 'TPZS.DDSJ', },
]