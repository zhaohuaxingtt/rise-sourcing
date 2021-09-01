
export const searchList = [
  {value: 'cartypeProId', name: '车型项目', key: 'CHEXINGXIANGMU', type: 'select', filterable: true, selectOption: 'carProjectOptions'},
  {value: 'partNum', name: '零件号', key: 'LINGJIAHAO', type: 'input'},
  {value: 'partSort', name: '零件分类', key: 'BF1STTRYOUTZHOU', type: 'select', selectOption: 'partTaskPartSort'},
  {value: 'status', name: '处理状态', key: 'CHULIZHUANGTAI', type: 'select', filterable: true, selectOption: 'partTaskStatus'},
]

export const tableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'partNum',name:'TIPS零件号', key: "TIPSLINGJIANHAO", tooltip: true},
  {props:'partNameCn',name:'零件名称-CN', key: "LINGJIANMINGCHENG-CN", tooltip: true},
  {props:'partNameEn',name:'零件名称-DE', key: "LINGJIANMINGCHENG-DE", tooltip: true},
  {props:'partSort',name:'零件分类', key: "BF1STTRYOUTZHOU", tooltip: true,editable:true,type:"select",selectOption: 'partTaskPartSort'},
  {props:'risePartDesc',name:'RISE零件匹配描述', key: "1STTRYOUTOTSZHOU", tooltip: true},
  {props:'statusDesc',name:'处理状态', key: "CHULIZHUANGTAI", tooltip: true},
  {props:'fs',name:'询价采购员', key: "QUERENJIEZHIRIQI", tooltip: true},
  {props:'projectPurchaser',name:'专业采购员', key: "SELDANJUQUERENZHUANGTAI", tooltip: true},
  {props:'epEngineer',name:'EP工程师',key:'QUERENSHIJIAN',tooltip: true},
]