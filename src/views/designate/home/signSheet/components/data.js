/*
 * @Author: Haojiang
 * @Date: 2021-06-28 09:26:28
 * @LastEditTime: 2021-06-29 14:04:09
 * @LastEditors: Please set LastEditors
 * @Description: 签字单
 * @FilePath: /front-web/src/views/designate/home/signSheet/components/data.js
 */

// 搜索参数
export const form = {}
// M签字单
export const tableTitle = [
  {
    props: 'signId',
    name: '签字单号',
    key: 'QIANZIDANHAO',
    tooltip: false
  },
  {
    props: 'description',
    name: '申请单名',
    key: 'nominationLanguage_ShenQingDanMing',
    tooltip: false
  },
  {
    props: 'meetingName',
    name: '会议名称',
    key: 'HUIYIMINGCHENG',
    tooltip: false
  },
  {
    props: 'partTermType',
    name: '零件项目类型',
    key: 'LK_LINGJIANXIANGMULEIXING',
    tooltip: false
  },
  {
    props: 'buyerName',
    name: 'CSF',
    key: 'CSF',
    tooltip: false
  },
  {
    props: 'linieName',
    name: 'LINIE',
    key: 'LINIE',
    tooltip: false
  },
  {
    props: 'submitDate',
    name: '生成时间',
    key: 'TIJIAORIQI',
    tooltip: false
  },
  {
    props: 'dueDate',
    name: '截止日期',
    key: 'JIEZHIRIQI',
    tooltip: false
  },
  {
    props: 'signStatus',
    name: '签字单状态',
    key: 'QIANZIDANZHUANGTAI',
    tooltip: false
  },
]

export const mokeData = [
  {
    signId: '76688762',
    description: '3GA81273878',
    meetingName: 'CSC_2888983',
    partTermType: 'FS',
    buyerName: '刘彤',
    linieName: '王文刚',
    submitDate: '2021-06-22',
    dueDate: '2021-06-30',
    signStatus: '待复核'
  }
]

// 详情- 签字单列表
export const detailsTableTitle = [
  {
    props: 'signId',
    name: '签字单号',
    key: 'QIANZIDANHAO',
    tooltip: false
  },
  {
    props: 'description',
    name: '申请单名',
    key: 'nominationLanguage_ShenQingDanMing',
    tooltip: false
  },
  {
    props: 'project',
    name: 'PROJECT',
    key: 'PROJECT',
    tooltip: false
  },
  {
    props: 'partTermType',
    name: '零件项目类型',
    key: 'LK_LINGJIANXIANGMULEIXING',
    tooltip: false
  },
  {
    props: 'meetingName',
    name: '会议',
    key: 'nominationLanguage.HuiYi',
    tooltip: true
  },
  {
    props: 'buyerName',
    name: 'CSF',
    key: 'CSF',
    tooltip: false
  },
  {
    props: 'linieName',
    name: 'LINIE',
    key: 'LINIE',
    tooltip: false
  },
  {
    props: 'freezeDate',
    name: '冻结日期',
    key: 'nominationLanguage_DongJieRiQi',
    tooltip: false
  }
]