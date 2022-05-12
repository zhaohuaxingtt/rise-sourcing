/*
 * @Author: your name
 * @Date: 2021-06-29 14:06:17
 * @LastEditTime: 2021-06-30 14:42:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\createparts\components\factoryrelocate\components\data.js
 */
export const tableTitle = [
  { props: 'id', name: '导入批次', key: 'DAORUPICI', tooltip: true, minWidth: '320px', align: 'left' },
  { props: 'createByName', name: '导入用户', key: 'DAORUYONGHU', tooltip: true },
  { props: 'status', name: '状态', key: 'ZHUANGTAI' },
  { props: 'createDate', name: '导入时间', key: 'DAORUSHIJIAN', tooltip: true }
]

export const detailTableTitle = [
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO', tooltip: true, fixed: 'left', minWidth: 100 },
  { props: 'sourcingPurchasingFactory', name: '迁移前工厂', key: 'QIANYIQIANGONGCHANG', tooltip: true, fixed: 'left', minWidth: 100 },
  { props: 'status', name: '状态', key: 'ZHUANGTAI', width: 90 },
  { props: 'oldFsnrGsnrNum', name: '原FS号', key: 'YUANFSHAO', tooltip: true, minWidth: 120 },
  { props: 'targetPurchasingFactory', name: '迁移后工厂', key: 'QIANYIHOUGONGCHANG', tooltip: true, minWidth: 100 },
  { props: 'buyerName', name: 'CSF/CSS采购员', key: 'CSFCSSCAIGOUYUAN', tooltip: true, minWidth: 110 },
  { props: 'linieName', name: 'LINIE采购员', key: 'LINIECAIGOUYUAN', tooltip: true, minWidth: 100 },
  { props: 'fsnrGsnrNum', name: 'FS号', key: 'FSHAO', tooltip: true, showTips: true, tips: () => `<span>${ localStorage.getItem('lang') === 'zh' ? '执行后生成' : 'Generated after execution' }</span>`, minWidth: 120 },
  { props: 'rfqId', name: 'RFQ编号', key: 'RFQBIANHAO', tooltip: true, showTips: true, tips: () => `<span>${ localStorage.getItem('lang') === 'zh' ? '执行后生成' : 'Generated after execution' }</span>`, minWidth: 110 },
  { props: 'carType', name: '车型', key: 'CHEXING', tooltip: true },
  { props: 'carTypeProj', name: '车型项目', key: 'CHEXINGXIANGMU', tooltip: true },
  { props: 'sopDate', name: '起步生产时间', key: 'QIBUSHENGCHANSHIJIAN', tooltip: true, minWidth: 110 },
  { props: 'supplierNameCn', name: '定点供应商', key: 'DINGDIANGONGYINGSHANG', tooltip: true, minWidth: 100 },
  { props: 'aprice', name: 'A价', key: 'AJIA', tooltip: true, minWidth: 90 },
  { props: 'packageCost', name: '包装', key: 'BAOZHUANG', tooltip: true, minWidth: 90 },
  { props: 'transportCost', name: '运输', key: 'YUNSHU', tooltip: true, minWidth: 90 },
  { props: 'operateCost', name: '操作', key: 'CAOZUO', tooltip: true, minWidth: 90 },
  { props: 'bprice', name: 'B价', key: 'BJIA', tooltip: true, minWidth: 90 },
  { props: 'ltc', name: '年降', key: 'NIANJIANG', tooltip: true },
]