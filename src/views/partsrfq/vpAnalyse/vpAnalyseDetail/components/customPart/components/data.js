/*
 * @Author: youyuan
 * @Date: 2021-06-21 11:33:07
 * @LastEditTime: 2021-07-29 15:37:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\customPart\components\data.js
 */
export const search=[
  {props: 'categoryCode', name: '材料组', type: 'input', key: 'MATERIALGROUP'},
  {props: 'rfqId', name: 'RFQ号', type: 'input', key: 'RFQNO'},
  {props: 'fsId', name: 'FS号', type: 'input', key: 'FSNO'},
  {props: 'partId', name: '零件号', type: 'input', key: 'PARTNO'},
 ]

export const tableTitle = [
  {props: 'partsId', name: '零件号', key: 'PARTNO'},
  {props: 'fsId', name: 'FS号', key: 'FSNO'},
  {props: 'carTypeProj', name: '车型项目', key: 'CARPROJECTNAME'},
  {props: 'carType', name: '车型', key: 'CARTYPE'},
  {props: 'procureFactory', name: '工厂', key: 'FACTORY'},
  {props: 'supplierName', name: '供应商', key: 'SUPPLIER'},
  {props: 'isShow', name: '显示/隐藏', key: 'SHOWORHIDDEN'},
  {props: 'sort', name: '排序', key: 'SORT'},
]

export const addTableTitle = [
  {props: 'partsId', name: '零件号', key: 'PARTNO'},
  {props: 'fsId', name: 'FS号', key: 'FSNO'},
  {props: 'rfqId', name: 'RFQ号', key: 'RFQNO'},
  {props: 'carTypeProj', name: '车型项目名称', key: 'CARPROJECTNAME'},
  {props: 'procureFactory', name: '工厂', key: 'FACTORY'},
  {props: 'isNominate', name: '状态', key: 'STATUS'},
  {props: 'categoryCode', name: '材料组', key: 'MATERIALGROUP'},
  {props: 'supplierName', name: '供应商名称', key: 'SUPPLIERNAME'},
]

