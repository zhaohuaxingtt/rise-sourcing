/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-18 10:46:09
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\data.js
 */

export const tableTitle = [
  {props:'sparePartCode',name:'编号', key: "BIANHAO", tooltip: true, width: 120},
  {props:'spnrNum',name:'SP号', key: "SPHAO", tooltip: true, width: 120},
  {props:'rfqNum',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 80},
  {props:'assemblyPartNum',name:'批量供货总成号', key: "PILIANGGONGHUOZONGCHENGHAO", tooltip: true, width: 140},
  {props:'partNum',name:'配件零件号', key: "PEIJIANLINGJIANHAO", tooltip: true, width: 140},
  {props:'partNameCh',name:'配件零件名称', key: "PEIJIANLINGJIANMINGCHENG", tooltip: true, width: 140},
  {props:'supplierSapCode',name:'供应商SAP号', key: "GONGYINGSHANGSAPHAO", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'供应商中文名', key: "GONGYINGSHANGMINGCHENG", tooltip: true, width: 240},
  {props:'respDeptName',name:'LINIE科室', key: "LINIEKESHI", tooltip: true, width: 140},
  {props:'respLinieName',name:'LINIE', key: "LINIE", tooltip: true, width: 100},
  {props:'csfuserDeptName',name:'询价科室', key: "XUNJIAKESHI", tooltip: true},
  {props:'csfuserName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, width: 100},
  {props:'deliveryWarehouse',name:'送货仓库', key: "SONGHUOCANGKU", tooltip: true},
  {props:'brand',name:'品牌', key: "PINPAI", tooltip: true},
  {props:'stateDesc',name:'配件状态', key: "PEIJIANZHUANGTAI", tooltip: true, width: 120},
  {props:'accessoryStatusDesc',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true, width: 120},
  {props:'signDate',name:'需求签收日期', key: "XUQIUQIANSHOURIQI", tooltip: true, width: 120},
  {props:'carType',name:'配件车型', key: "PEIJIANCHEXING", tooltip: true, width: 120},
  {props:'carProject',name:'配件车型项目', key: "PEIJIANCHEXINGXIANGMU", tooltip: true, width: 140},
  {props:'idStateDesc',name:'ID状态', key: "IDZHUANGTAI", tooltip: true},
  {props:'priceType',name:'价格类型', key: "JIAGELEIXING", tooltip: true},
  {props:'tcUnitName',name:'单位', key: "DANWEI", tooltip: true},
  {props:'sendDate',name:'需求发送日期', key: "XUQIUFASONGRIQI", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'partNum', label: '配件零件号', type: 'input', key: 'PEIJIANLINGJIANHAO',},
  {value: 'partNameCh', label: '配件零件中文名', type: 'input', key: 'PEIJIANLINGJIANZHONGWENMING',},
  {value: 'supplierSapCode', label: '供应商SAP号', type: 'input', key: 'GONGYINGSHANGSAPHAO',},
  {value: 'supplierNameZh', label: '供应商中文名', type: 'input', key: 'GONGYINGSHANGZHONGWENMING',},
  {value: 'assemblyPartNum', label: '批量供货总成号', type: 'input', key: 'PILIANGGONGHUOZONGCHENGHAO',},
  {value: 'spnrNum', label: 'SP号', type: 'input', key: 'SPHAO',},
  {value: 'sparePartCode', label: '编号', type: 'input', key: 'BIANHAO',},
  {value: 'carType', label: '配件车型', type: 'select', key: 'PEIJIANCHEXING', selectOption: 'carTypeOptions'},
  {value: 'carProject', label: '配件车型项目', type: 'select', key: 'PEIJIANCHEXINGXIANGMU', selectOption: 'cartypeProjectOptions', width: 150},
  {value: 'state', label: '配件状态', type: 'select', key: 'PEIJIANZHUANGTAI', selectOption: 'accessoryTypeOption'},
  {value: 'respDeptName', label: 'LINIE科室', type: 'input', key: 'LINIEKESHI',},
  {value: 'respLinieName', label: 'LINIE', type: 'input', key: 'LINIE',},
  {value: 'csfuserDeptName', label: '询价科室', type: 'input',key: 'XUNJIAKESHI'},
  {value: 'csfuserName', label: '询价采购员', type: 'input', key: 'XUNJIACAIGOUYUAN',},
  {value: 'accessoryStatus', label: '零件状态', type: 'select', key: 'LINGJIANZHUANGTAI', selectOption: 'partStateOption'},
  // {value: 'partState', label: '合同状态', type: 'select', key: 'HETONGZHUANGTAI', selectOption: 'contactStateOption'},
  // {value: 'cfTargetPrice', label: '是否有财务目标价', type: 'select', key: 'SHIFOUYOUCAIWUMUBIAOJIA', selectOption: 'yesOrNoOption'},
  // {value: 'nomiType', label: '定点状态', type: 'select', key: 'DINGDIANZHUANGTAI', selectOption: 'nominateStateOption'},
  {value: 'idState', label: 'ID状态', type: 'select', key: 'IDZHUANGTAI', selectOption: 'accessoryIdStateOption'}
]
export const TAB = [
  {
    value: 1,
    name: '寻源执行',
    message: 0,
    url: '/sourcing/partsign',
    activePath: 'partsign',
    key: 'XUANYUANCAIDAN'
  },
  // {
  //   value: 2,
  //   label: '进度监控',
  //   key: Vue.prototype.$t('partsignLanguage.JinDuJianKong'),
  //   url: '/nomination',
  //   message: 0
  // }
]