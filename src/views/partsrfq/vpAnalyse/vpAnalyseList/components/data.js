/*
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-06-22 14:43:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\components\data.js
 */
export const search=[
  {props: 'developerNumber', name: '材料组', type: 'input',key:''},
  {props: 'productionNumber', name: '零件号', type: 'input',key:''},
  {props: 'isSetTradeUnion', name: 'RFQ号/名称', type: 'input', key:''},
  {props: 'createBy', name: '创建人', type: 'input', key:''},
 ]


 export const tableTitle = [
  {props: 'name', name: '分析名称', key: ''},
  {props: 'materialGroup', name: '材料组', key: ''},
  {props: 'rfqId', name: 'RFQ', key: ''},
  {props: 'isDefault', name: '默认项', key: ''},
  {props: 'type', name: '文件类型', key: ''},
  {props: 'createByName', name: '创建人', key: ''},
  {props: 'updateDate', name: '上次修改日期', key: ''},
  {props: 'action', name: '', key: ''},
]