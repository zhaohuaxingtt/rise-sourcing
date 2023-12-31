/*
 * @Author: 舒杰
 * @Date: 2021-08-02 10:42:01
 * @LastEditTime: 2022-12-30 18:43:29
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\historyPoint\data.js
 */

// 专项分析工具
export const tableTitle = [
  {
    props: 'partsId',
    name: '零件号',
    key: 'LINGJIANHAO',
    name2: '零件名称',
    key2: 'LJMC',
    tooltip: true,
    minWidth: 140,
  },
  {
    props: 'categoryName',
    name: '材料组名称',
    key: 'CLZMC',
    name2: '工艺组名称',
    key2: 'GYZMC',
    tooltip: true,
    width: 160,
  },
  {
    props: 'fsnrGsnrNum',
    name: 'FSNR/GSNR',
    key: 'FSNRGSNRCODE',
    tooltip: true,
    width: 130,
  },
  { props: 'rfqId', name: 'RFQ编号', key: 'RFQBH', tooltip: true },
  {
    props: 'partProjectName',
    name: '零件采购项目类型',
    key: 'LJCGXMLX',
    tooltip: true,
    minWidth: 120,
  },
  { props: 'carTypeProj', name: '车型项目名称', key: 'CXXMMC', tooltip: true,
  minWidth: 100 },
  { props: 'supplierNameCn', name: '定点供应商', key: 'DDGYS', tooltip: true,
  minWidth: 100 },
  { props: 'nominatePrice', name: '定点金额', key: 'DDJE', tooltip: true,
  minWidth: 100 },
  { props: 'nominateTime', name: '定点时间', key: 'DDSJ', tooltip: true,
  minWidth: 90 },
]

export const tableTitleExport = [
  { props: 'partsId', name: '零件号', key: 'LINGJIANHAO', tooltip: true },
  { props: 'partsNameZh', name: '零件名称', key: 'LJMC', tooltip: true },
  { props: 'fsnrGsnrNum', name: 'FSNR/GSNR', key: 'FSCODE', tooltip: true },
  {
    props: 'partProjectType',
    name: '零件采购项目类型',
    key: 'LJCGXMLX',
    tooltip: true,
  },
  { props: 'categoryName', name: '材料组名称', key: 'CLZMC', tooltip: true },
  { props: 'stuffName', name: '工艺组名称', key: 'GYZMC', tooltip: true },
  { props: 'rfqId', name: 'RFQ编号', key: 'RFQBH', tooltip: true },
  {
    props: 'partProjectName',
    name: '零件采购项目',
    key: 'LJCGXM',
    tooltip: true,
  },
  { props: 'carTypeProj', name: '车型项目名称', key: 'CXXMMC', tooltip: true },
  { props: 'supplierNameCn', name: '定点供应商', key: 'DDGYS', tooltip: true },
  { props: 'nominatePrice', name: '定点金额', key: 'DDJE', tooltip: true },
  { props: 'nominateTime', name: '定点时间', key: 'DDSJ', tooltip: true },
]

export const tabList = [
  {
    value: 1,
    name: '按定点记录查看',
    key: 'ADDJLCK',
    permissionKey: 'CATEGORY_ASSISTANT_DDLSJL_ADDJLCK',
  },
  {
    value: 2,
    name: '按供应商查看',
    key: 'AGYSCK',
    permissionKey: 'CATEGORY_ASSISTANT_DDLSJL_AGYSCK',
  },
]
