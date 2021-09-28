
export const searchList = [
  {value: 'partNum', name: '零件号', key: 'LINGJIAHAO', type: 'input'  },
  {value: 'partSort', name: '零件分类', key: 'LINGJIANFENLEI', type: 'select', selectOption: 'partTaskPartSortQuery'},
  {value: 'status', name: '处理状态', key: 'CHULIZHUANGTAI', type: 'select', filterable: true, selectOption: 'partTaskStatus'},
  {value: 'risePartDesc', name: '异常原因', key: 'YICHANGYUANYING', type: 'select', filterable: true, selectOption: 'partTaskRisePartDesc'},
]

export const tableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'partNum',name:'TIPS零件号', key: "TIPSLINGJIANHAO", tooltip: true},
  {props:'partNameCn',name:'零件名称-CN', key: "LINGJIANMINGCHENG-CN", tooltip: true},
  {props:'partNameEn',name:'零件名称-DE', key: "LINGJIANMINGCHENG-DE", tooltip: true},
  {props:'risePartCode',name:'异常代码', key: "YICHANGDAIMA", tooltip: true},
  {props:'risePartDesc',name:'异常原因', key: "YICHANGYUANYING", tooltip: true},
  {props:'partSort',name:'零件分类', key: "LINGJIANFENLEI", tooltip: true,editable:true,type:"select",selectOption: 'partTaskPartSort'},
  {props:'statusDesc',name:'处理状态', key: "CHULIZHUANGTAI", tooltip: true},
  {props:'buyerName',name:'询价采购员', key: "QUERENJIEZHIRIQI", tooltip: true},
  {props:'linieName',name:'专业采购员', key: "ZHUANYECAIGOUYUAN", tooltip: true},
  {props:'epEngineer',name:'EP工程师',key:'QUERENSHIJIAN',tooltip: true},
]

export const partSortStatus = {
 PART_TASK_NEED_EP_CONFIEMED:"1", //需EP确认
 PART_TASK_NEED_MQ_CONFIEMED:"2",//需MQ确认
 PART_TASK_WAIT_RELEASE:"3",//等待释放
 PART_TASK_WAIT_DELETE:"4",//等待删除
 PART_TASK_NORMAL_PARTS:"5",//正常零件
}