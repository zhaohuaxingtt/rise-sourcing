/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-15 15:04:41
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\data.js
 */

export const tableTitle = [
  {props:'sparePartCode',name:'编号', key: "BIANHAO", tooltip: true, width: 120},
  {props:'spnrNum',name:'SP号', key: "SPHAO", tooltip: true, width: 120},
  {props:'rfqNum',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 120},
  {props:'assemblyPartNum',name:'批量供货总成号', key: "PILIANGGONGHUOZONGCHENGHAO", tooltip: true, width: 120},
  {props:'partNum',name:'配件零件号', key: "PEIJIANLINGJIANHAO", tooltip: true, width: 100},
  {props:'partNameCh',name:'配件零件名称', key: "PEIJIANLINGJIANMINGCHENG", tooltip: true, width: 120},
  {props:'supplierSapCode',name:'供应商SAP号', key: "GONGYINGSHANGSAPHAO", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'供应商中文名', key: "GONGYINGSHANGMINGCHENG", tooltip: true, width: 120},
  {props:'respDeptName',name:'LINIE科室', key: "LINIEKESHI", tooltip: true, width: 100},
  {props:'respLinieName',name:'LINIE', key: "LINIE", tooltip: true, width: 100},
  {props:'csfUserDeptName',name:'询价科室', key: "XUNJIAKESHI", tooltip: true},
  {props:'csfUserIdName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, width: 100},
  {props:'deliveryWarehouse',name:'送货仓库', key: "SONGHUOCANGKU", tooltip: true},
  {props:'brand',name:'品牌', key: "PINPAI", tooltip: true},
  {props:'state',name:'配件状态', key: "PEIJIANZHUANGTAI", tooltip: true, width: 120},
  {props:'accessoryStatus',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true, width: 120},
  {props:'signDate',name:'需求签收日期', key: "XUQIUQIANSHOURIQI", tooltip: true, width: 120},
  {props:'carType',name:'配件车型', key: "PEIJIANCHEXING", tooltip: true},
  {props:'carProject',name:'配件车型项目', key: "PEIJIANCHEXINGXIANGMU", tooltip: true},
  {props:'idState',name:'ID状态', key: "IDZHUANGTAI", tooltip: true},
  {props:'e',name:'价格类型', key: "JIAGELEIXING", tooltip: true},
  {props:'tcUnitId',name:'单位', key: "DANWEI", tooltip: true},
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
  {value: 'carProject', label: '配件车型项目', type: 'select', key: 'PEIJIANCHEXINGXIANGMU', selectOption: 'carTypeProjectOptions', width: 150},
  {value: 'state', label: '配件状态', type: 'select', key: 'PEIJIANZHUANGTAI', selectOption: 'accessoryTypeOption'},
  {value: 'respDept', label: 'LINIE科室', type: 'input', key: 'LINIEKESHI',},
  {value: 'respLINIE', label: 'LINIE', type: 'input', key: 'LINIE',},
  {value: 'csfUserDept', label: '询价科室', type: 'input',key: 'XUNJIAKESHI'},
  {value: 'csfUserId', label: '询价采购员', type: 'input', key: 'XUNJIACAIGOUYUAN',},
  {value: 'accessoryStatus', label: '零件状态', type: 'select', key: 'LINGJIANZHUANGTAI', selectOption: 'partStateOption'},
  // {value: 'partState', label: '合同状态', type: 'select', key: 'HETONGZHUANGTAI', selectOption: 'contactStateOption'},
  // {value: 'cfTargetPrice', label: '是否有财务目标价', type: 'select', key: 'SHIFOUYOUCAIWUMUBIAOJIA', selectOption: 'yesOrNoOption'},
  // {value: 'nomiType', label: '定点状态', type: 'select', key: 'DINGDIANZHUANGTAI', selectOption: 'nominateStateOption'},
  {value: 'idState', label: 'ID状态', type: 'select', key: 'IDZHUANGTAI', selectOption: 'accessoryIdStateOption'}
]