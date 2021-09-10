/*
 * @Author: your name
 * @Date: 2021-06-17 16:49:20
 * @LastEditTime: 2021-09-09 16:29:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\components\data.js
 */

export const confirmTableHead = [
  // export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
  { props: 'index', name: '#', key: '#', tooltip: false, width: 60 },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', tooltip: true },
  {
    props: 'fsNum',
    name: '零件采购项目号',
    key: 'partsprocure.PARTSPROCUREFSNFGSNFSPNR',
    tooltip: false,
  },
  { props: 'rfqId', name: 'RFQ号', key: 'LK_RFQHAO', tooltip: true },
  {
    props: 'cartypeProjectZh',
    name: '车型项目名称',
    key: 'LK_CHEXINGXIANGMUMINGCHENG',
    tooltip: false,
  },
  {
    props: 'procureFactory',
    name: '工厂',
    key: 'TPZS.GONGCHANG',
    tooltip: false,
  },
  { props: 'statusName', name: '状态', key: 'LK_ZHUANGTAI', tooltip: false },
  {
    props: 'category',
    name: '材料组',
    key: 'LK_CAILIAOZU',
    tooltip: true,
  },
  {
    props: 'supplier',
    name: '供应商名称',
    key: 'LK_GONGYINGSHANGMINGCHENG',
    tooltip: false,
  },
]
