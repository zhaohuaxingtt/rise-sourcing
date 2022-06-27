/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:11:17
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-29 11:22:51
 * @Description: 
 * @FilePath: \front-sourcing\src\views\project\components\data.js
 */

export const TAB = [
  {
    value: 1,
    name: '总览',
    message: 0,
    url: '/deliver/overview',
    activePath: 'overview',
    key: '总览',
    // permissionKey: 'PROJECTMGT_OVERVIEW_TAB',
    // permissionName: '送样管理-送样过程监控Tab'
  },
  {
    value: 2,
    name: '延误清单',
    message: 0,
    url: '/deliver/delayanalysis',
    activePath: 'delayanalysis',
    key: '延误清单',
    // permissionKey: 'PROJECTMGT_SCHEASSISTANT_TAB',
    // permissionName: '送样管理-项目送样管理Tab'
  },
  {
    value: 2,
    name: '送样过程监控',
    message: 0,
    url: '/deliver/progressdetail',
    activePath: 'progressdetail',
    key: '送样过程监控',
    // permissionKey: 'PROJECTMGT_SCHEASSISTANT_TAB',
    // permissionName: '送样管理-项目送样管理Tab'
  },
]

export const COMFIRMTAB = [
  {
    value: 1,
    name: '排程助手1',
    message: 0,
    url: '/deliver/projectscheassistant/proconfirm',
    activePath: 'projectscheassistant',
    // key: '排程助手1'
  },
  {
    value: 2,
    name: '项目进度监控',
    message: 0,
    url: '/deliver/projectprogressmonitoring/delayconfirm',
    activePath: 'projectprogressmonitoring',
    key: 'XIANGMUJINDUJIANKONG'
  }
]

export const searchList = [
  {prop:'dept',label:'材料组',key:'CAILIAOZU',type:'select', selectOption:'deptOptions'},
  {prop:'buyer',label:'采购员',key:'CAIGOUYUAN',type:'input'},
  {prop:'pro',label:'车型项目',key:'CHEXINGXIANGMU',type:'select', selectOption:'carProjectOptions'},
]

export const delayAnalysisSearchList = [
  {prop:'prop1',label:'车型项目',key:'CHEXINGXIANGMU',type:'select', selectOption:'deptOptions'},
  {prop:'prop2',label:'RFQ',key:'RFQ',type:'input' },
  {prop:'prop3',label:'材料组',key:'CAILIAOZU',type:'input' },
  {prop:'prop4',label:'零件编号/零件名称',key:'LINGJIANBIANHAO/LINGJIANMINGCHENG',type:'input' },
  {prop:'prop5',label:'零件类型',key:'LINGJIANLEIXING',type:'select', selectOption:'deptOptions'},
  {prop:'prop6',label:'车型项目状态',key:'CHEXINGXIANGMUZHUANGTAI',type:'select', selectOption:'deptOptions'},
  {prop:'prop7',label:'延迟级别',key:'YANCHIJIBIE',type:'select', selectOption:'deptOptions'},
  {prop:'prop8',label:'延迟原因',key:'YANCHIYUANYIN',type:'input' },
  {prop:'prop9',label:'完成状况',key:'WANCHENGZHUANGKUANG',type:'select', selectOption:'deptOptions'},
  {prop:'prop10',label:'供应商',key:'GONGYINGSHANG',type:'input' },

]
export const progressDetailSearchList = [
  {prop:'dept',label:'材料组',key:'CAILIAOZU',type:'select', selectOption:'deptOptions' },
  {prop:'part',label:'零件',key:'LINGJIAN',type:'select', selectOption:'partList' },
  {prop:'supplier',label:'供应商',key:'GONGYINGSHANG',type:'select', selectOption:'supplierList' },


]