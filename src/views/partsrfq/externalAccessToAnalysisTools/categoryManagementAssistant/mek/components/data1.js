/*
 * @Author: your name
 * @Date: 2021-08-25 16:07:05
 * @LastEditTime: 2021-08-25 16:19:01
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
    props: 'fsNum',
    name: '每车用量',
    key: 'MEICHEYONGLIANG',
    tooltip: false,
  },
  {
    props: 'cartypeProjectZh',
    name: '价格(A价)',
    key: 'JIAGEAJIA',
    tooltip: false,
  },
  {
    props: '配置',
    name: 'EBR%',
    key: 'EBR%',
    tooltip: false,
  },
]
