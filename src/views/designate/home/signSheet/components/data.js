/*
 * @Author: Haojiang
 * @Date: 2021-06-28 09:26:28
 * @LastEditTime: 2021-11-02 20:34:59
 * @LastEditors:  
 * @Description: 签字单
 * @FilePath: /front-web/src/views/designate/home/signSheet/components/data.js
 */

// 搜索参数
export const form = {
 
}
// M签字单
export const tableTitle = [
  {
    props: 'signCode',
    name: '签字单号',
    key: 'QIANZIDANHAO',
    tooltip: false
  },
  {
    props: 'statusDesc',
    name: '签字单状态',
    width: 150,
    key: 'QIANZIDANZHUANGTAI',
    tooltip: false
  },
  {
    props: 'csf',
    name: '创建人',
    key: 'CJR',
    tooltip: false
  },
  {
    props: 'createDate',
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
    props: 'description',
    name: '描述',
    key: 'LK_MIAOSHU',
    tooltip: false
  },
//   {
//     props: 'meetingName',
//     name: '会议名称',
//     key: 'HUIYIMINGCHENG',
//     tooltip: false
//   },
// 
//   {
//     props: 'projectType',
//     name: '零件项目类型',
//     key: 'LK_LINGJIANXIANGMULEIXING',
//     tooltip: false
//   },
// 
//   {
//     props: 'linieName',
//     name: 'LINIE',
//     key: 'LINIE',
//     tooltip: false
//   },


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
    props: 'id',
    name: '申请单号',
    key: 'nominationLanguage_ShenQingDanHao',
    tooltip: false
  },
  {
    props: 'nominateName',
    name: '申请单名',
    key: 'nominationLanguage_ShenQingDanMing',
    tooltip: false
  },
  {
    props: 'partProjType',
    name: 'PROJECT',
    key: 'PROJECT',
    tooltip: false
  },
  {
    props: 'applicationStatus',
    name: '状态',
    key: 'LK_ZHUANGTAI',
    tooltip:false
  },
  {
    props: 'carType',
    name: '项目类型',
    key: 'nominationLanguage_XingMuLeiXing',
    tooltip: false
  },
  {
    props: 'meetingPresentId',
    name: '会议',
    key: 'nominationLanguage_HuiYi',
    tooltip: true
  },
  {
    props: 'nominateUserName',
    name: 'CSF',
    key: 'CSF',
    tooltip: true
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

// 签字单列表预览导出
export const signsheetViewTableTitle = [
  {
    props: 'yearCw',
    name: 'Year CW',
    key: 'Year CW',
    tooltip: false
  },
  {
    props: 'nominateId',
    name: 'Nomination No.',
    key: 'Nomination No.',
    width: 150,
    tooltip: false
  },
  {
    props: 'partNameCn',
    name: 'Part Name(CN)',
    key: 'Part Name(CN)',
    width: 150,
    tooltip: false
  },
  {
    props: 'partNameDe',
    name: 'Part Name(DE)',
    key: 'Part Name(DE)',
    width: 150,
    tooltip: false
  },
  {
    props: 'carTypeProj',
    name: 'Carline',
    key: 'Carline',
    tooltip: false
  },
  {
    props: 'partNum',
    name: 'SVW Part No',
    key: 'SVW Part No',
    tooltip: false
  },
  {
    props: 'supplierNameCn',
    name: 'Supplier',
    key: 'Supplier',
    tooltip: false
  },
  {
    props: 'share',
    name: 'Share',
    key: 'Share',
    tooltip: false
  },
  {
    props: 'tto',
    name: 'TTO',
    key: 'TTO',
    tooltip: false
  },
  {
    props: 'rsRemark',
    name: 'Remark',
    key: 'Remark',
    width: 200,
    tooltip: false
  },
]