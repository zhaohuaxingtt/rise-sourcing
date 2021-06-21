/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 13:53:08
 * @LastEditors: zbin
 * @Descripttion: your project
 */
export const tableTitle = [
  { props: 'dataCategory', name: '零件号', key: 'TPZS.LJH', },
  {
    props: 'dataValue', name: '零件名', key: 'TPZS.LJM', width: 120,
  },
  { props: 'calculateValue', name: '工厂', key: 'TPZS.GC', },
  { props: 'description', name: 'SOP', key: 'TPZS.XMMC', },
  { props: 'description', name: 'EBR%', key: 'TPZS.SOP', },
  { props: 'description', name: '项目名称', key: 'TPZS.EBR', },
  { props: 'description', name: '全生命周期产量', key: 'TPZS.QSMZQCL', },
  { props: 'description', name: '峰值年产量', key: 'TPZS.FZNCL', },
]
export const supplierTableTitle = [
  { props: 'dataCategory', name: '供应商', key: 'costanalysismanage.GongYingShang', },
  {
    props: 'dataValue', name: 'SAP号', key: 'nominationSupplier.SAPHao', width: 120,
  },
  { props: 'calculateValue', name: '所在地', key: 'TPZS.SZD', },
  { props: 'description', name: '是否MBDL', key: 'TPZS.SFMBDL', },
  { props: 'description', name: '报价状态', key: 'TPZS.BJZT', },
  { props: 'description', name: 'MQ打分', key: 'TPZS.MQDF', },
  { props: 'description', name: 'PL打分', key: 'TPZS.PLDF', },
  { props: 'description', name: 'EP打分', key: 'TPZS.EPDF', },
]
export const fixedRecordTableTitle = [
  { props: 'dataCategory', name: '零件号', key: 'TPZS.LJH', },
  {
    props: 'dataValue', name: 'RFQ编号', key: 'costanalysismanage.RfqBianHao', width: 120,
  },
  { props: 'calculateValue', name: 'RFQ名称', key: 'costanalysismanage.RfqMingCheng', },
  { props: 'description', name: '材料组名称', key: 'TPZS.CLZMC', },
  { props: 'description', name: '工艺组名称', key: 'TPZS.GYZMC', },
  { props: 'description', name: '零件采购项目', key: 'partsignLanguage.CaiGouXiangMuJianLi', },
  { props: 'description', name: '车型项目名称', key: 'LK_CHEXINGXIANGMUMINGCHENG', },
  { props: 'description', name: '定点供应商', key: 'LK_FIXEDPOINTSUPPLIER', },
  { props: 'description', name: '定点金额', key: 'TPZS.DDJE', },
  { props: 'description', name: '定点时间', key: 'TPZS.DDSJ', },
]