/*
 * @Author: youyuan
 * @Date: 2021-06-21 11:33:07
 * @LastEditTime: 2021-07-28 16:09:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\customPart\components\data.js
 */
export const search=[
  {props: 'categoryCode', name: '材料组', type: 'input', key: 'LK_CAILIAOZU'},
  {props: 'rfqId', name: 'RFQ号', type: 'input', key: 'TPZS.RFQHMC'},
  {props: 'fsId', name: 'FS号', type: 'input', key: ''},
  {props: 'partId', name: '零件号', type: 'input', key: ''},
 ]

export const tableTitle = [
  {props: 'partsId', name: '零件号', key: 'TPZS.LJH'},
  {props: 'fsId', name: 'FS号', key: ''},
  {props: 'carTypeProj', name: '车型项目', key: 'LK_CHEXINGXIANGMU'},
  {props: 'carType', name: '车型', key: 'LK_CHEXING'},
  {props: 'procureFactory', name: '工厂', key: 'TPZS.GC'},
  {props: 'supplierName', name: '供应商', key: 'TPZS.GYS'},
  {props: 'isShow', name: '显示/隐藏', key: 'TPZS.SHOWORHIDE'},
  {props: 'sort', name: '排序', key: 'TPZS.SORT'},
]

export const addTableTitle = [
  {props: 'partsId', name: '零件号', key: ''},
  {props: 'fsId', name: 'FS号', key: ''},
  {props: 'rfqId', name: 'RFQ号', key: ''},
  {props: 'carTypeProj', name: '车型项目名称', key: ''},
  {props: 'procureFactory', name: '工厂', key: ''},
  {props: 'isNominate', name: '状态', key: ''},
  {props: 'categoryCode', name: '材料组', key: ''},
  {props: 'supplierName', name: '供应商名称', key: ''},
]

