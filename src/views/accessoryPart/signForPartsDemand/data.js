/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 14:41:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-16 22:35:41
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\signForPartsDemand\data.js
 */
export const tableTitle = [
  {props:'sparePartCode',name:'编号', key: "BIANHAO", tooltip: true, width: 120},
  {props:'spnrNum',name:'SP号', key: "SPHAO", tooltip: true, width: 120},
  {props:'assemblyPartNum',name:'批量供货总成号', key: "PILIANGGONGHUOZONGCHENGHAO", tooltip: true, width: 180},
  {props:'partNum',name:'配件零件号', key: "PEIJIANLINGJIANHAO", tooltip: true, width: 140},
  {props:'partNameCh',name:'配件零件中文名', key: "PEIJIANLINGJIANZHONGWENMING", tooltip: true, width: 240},
  {props:'carType',name:'配件车型', key: "PEIJIANCHEXING", tooltip: true, width: 140},
  {props:'deliveryWarehouse',name:'送货仓库', key: "SONGHUOCANGKU", tooltip: true,width:80},
  {props:'supplierSapCode',name:'供应商SAP号', key: "GONGYINGSHANGSAPHAO", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'供应商中文名', key: "GONGYINGSHANGZHONGWENMING", tooltip: true, width: 200},
  {props:'sendDate',name:'需求发送日期', key: "XUQIUFASONGRIQI", tooltip: true, width: 120},
  {props:'state',name:'配件状态', key: "PEIJIANZHUANGTAI", tooltip: true, width: 160},
  {props:'annualQuantity',name:'年需求量', key: "NIANXUQIULIANG", tooltip: true,width:80},
  {props:'csfuserDeptName',name:'询价科室', key: "XUJIAKESHI", tooltip: true},
  {props:'csfuserName',name:'询价采购员', key: "XUJIACAIGOUYUAN", tooltip: true, width: 100},
  {props:'respDeptName',name:'LINIE科室', key: "LINIEKESHI", tooltip: true, width: 100},
  {props:'respLinieName',name:'LINIE', key: "LINIE", tooltip:true, width: 180},
  {props:'partNameDe',name:'配件零件德文名', key: "PEIJIANLINGJIANDEWENMING", tooltip: true, width: 220},
  {props:'supplierSvwTempCode',name:'供应商临时号', key: "GONGYINGSHANGLINGSHIHAO", tooltip: true, width: 120},
  {props:'carProject',name:'配件车型项目', key: "PEIJIANCHEXINGXIANGMU", tooltip: true, width: 160},
  {props:'technicianStaffName',name:'售后技术人员名称', key: "SHOUHOUJISHURENYUANMINGCHENG", tooltip: true, width: 140},
  {props:'brand',name:'品牌', key: "PINPAI", tooltip: true},
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
  {value: 'carType', label: '配件车型', type: 'select', key: 'PEIJIANCHEXING',selectOption: 'cartTypeOptions'},
  {value: 'carProject', label: '配件车型项目', type: 'select', key: 'PEIJIANCHEXINGXIANGMU',selectOption: 'cartypeProjectOptions'},
  {value: 'state', label: '配件状态', type: 'select', key: 'PEIJIANZHUANGTAI', selectOption: 'accessoryTypeOption'},
  {value: 'csfUserDept', label: '是否有询价科室', type: 'select', key: 'SHIFOUYOUXUNJIAKESHI', selectOption: 'yesOrNoOption'},
  {value: 'csfUserId', label: '是否有询价采购员', type: 'select', key: 'SHIFOUYOUXUNJIACAIGOUYUAN', selectOption: 'yesOrNoOption'},
  {value: 'sendDate', label: '需求发送起止日期', type: 'date', key: 'XUQIUFASONGQIZHIRIQI',}
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