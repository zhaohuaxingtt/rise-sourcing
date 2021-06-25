/*
 * @Author: youyuan
 * @Date: 2021-06-21 11:33:07
 * @LastEditTime: 2021-06-23 15:21:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\customPart\components\data.js
 */
export const tableTitle = [
  {props: 'partsId', name: '零件号', key: 'LK_PART_NO'},
  {props: 'partsDetail.carProject', name: '车型项目', key: 'LK_CHEXINGXIANGMU'},
  {props: 'partsDetail.carType', name: '车型', key: 'LK_CHEXING'},
  {props: 'partsDetail.factory', name: '工厂'},
  {props: 'partsDetail.supplier', name: '供应商', key: 'LK_SUPPLIER'},
  {props: 'isShow', name: '显示/隐藏', key: 'LK_SHOWORHIDE'},
  {props: 'sort', name: '排序', key: 'LK_SORT'},
]