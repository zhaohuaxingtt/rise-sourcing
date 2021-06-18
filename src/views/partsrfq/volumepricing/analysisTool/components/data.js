/*
 * @Author: your name
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-06-17 11:01:24
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

export const tableTitles = [
  { props: 'name', name: '分析名称',  tooltip: true },
  { props: 'materials', name: '材料组',  tooltip: true },
  { props: 'rfq', name: 'RFQ',  tooltip: true },
  { props: 'default', name: '默认项',  tooltip: true },
  { props: 'fileType', name: '文件类型',  tooltip: true },
  { props: 'createBy', name: '创建人',  tooltip: true },
  { props: 'createDate', name: '创建日期',  tooltip: true },
  { props: 'listTimeEditDate', name: '上次修改日期',  tooltip: true },
]
