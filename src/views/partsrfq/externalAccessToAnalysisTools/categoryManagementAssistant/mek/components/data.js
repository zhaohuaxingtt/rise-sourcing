/*
 * @Author: your name
 * @Date: 2021-08-06 15:49:37
 * @LastEditTime: 2021-10-09 19:30:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\data.js
 */
export const confirmTableHead = [
  // export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
  { props: 'index', name: '#', key: '#', tooltip: false, width: 40 },
  {
    props: 'engine',
    name: '动力',
    key: 'DONGLI',
    tooltip: false,
  },
  // {
  //   props: 'fsNum',
  //   name: '引擎-功率',
  //   key: 'YINQINGGONGLV',
  //   tooltip: false,
  // },
  {
    props: 'transmission',
    name: '变速箱',
    key: 'BIANSUXIANG',
    tooltip: false,
  },
  {
    props: 'position',
    name: '配置',
    key: 'PEIZHI',
    tooltip: false,
  },
  {
    props: 'isCalculate',
    name: '计算车型',
    key: 'JISUANCHEXING',
    tooltip: false,
  },
]
