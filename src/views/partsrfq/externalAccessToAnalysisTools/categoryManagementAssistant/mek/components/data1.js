/*
 * @Author: your name
 * @Date: 2021-08-25 16:07:05
 * @LastEditTime: 2021-09-29 22:37:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\data1.js
 */
export const confirmTableHead = [
  // export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
  {
    props: 'partNum',
    name: '零件号',
    key: 'LINGJIANHAO',
    tooltip: true,
  },
  {
    props: 'num',
    name: '每车用量',
    key: 'MEICHEYONGLIANG',
    tooltip: false,
  },
  {
    props: 'price',
    name: '价格(A价)',
    key: 'JIAGEAJIA',
    tooltip: false,
  },
  {
    props: 'ebr',
    name: 'EBR%',
    key: 'EBR%',
    tooltip: false,
  },
  {
    props: 'position',
    name: '车型等级',
    key: 'CHEXINGDENGJI',
    tooltip: false,
  },
]
