/*
 * @Author: your name
 * @Date: 2021-08-06 15:49:37
 * @LastEditTime: 2021-08-11 16:16:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\data.js
 */
export const confirmTableHead = [
  // export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
  { props: 'index', name: '#', key: '#', tooltip: false, width: 40 },
  {
    props: 'partNum',
    name: '引擎-升数',
    key: 'MEK_YINQINGSHENGSHU',
    tooltip: true,
  },
  {
    props: 'fsNum',
    name: '引擎-功率',
    key: 'YINQINGGONGLV',
    tooltip: false,
  },
  {
    props: 'cartypeProjectZh',
    name: '变速箱',
    key: 'BIANSUXIANG',
    tooltip: false,
  },
  {
    props: '配置',
    name: '配置',
    key: 'PEIZHI',
    tooltip: false,
  },
  {
    props: 'statusName',
    name: '计算车型',
    key: 'JISUANCHEXING',
    tooltip: false,
  },
]
