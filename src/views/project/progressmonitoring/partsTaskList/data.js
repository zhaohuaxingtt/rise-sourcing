/*
 * @Author: Luoshuang
 * @Date: 2021-10-11 10:31:41
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-25 11:13:50
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressmonitoring\partsTaskList\data.js
 */

export const searchList = [
  {value: 'partNum', name: '零件号', key: 'LINGJIAHAO', type: 'input', permission: "PROJECTMGT_PARTSTASK_PARTNUM|项目管理-零件任务清单-零件号"  },
  {value: 'partSort', name: '零件分类', key: 'LINGJIANFENLEI', type: 'select', selectOption: 'partTaskPartSortQuery', permission: "PROJECTMGT_PARTSTASK_PARTSORT|项目管理-零件任务清单-零件分类"},
  {value: 'status', name: '处理状态', key: 'CHULIZHUANGTAI', type: 'select', filterable: true, selectOption: 'partTaskStatus', permission: "PROJECTMGT_PARTSTASK_STATUS|项目管理-零件任务清单-处理状态"},
  {value: 'risePartDesc', name: '异常原因', key: 'YICHANGYUANYING', type: 'select', filterable: true, selectOption: 'partTaskRisePartDesc', permission: "PROJECTMGT_PARTSTASK_RISEPARTDESC|项目管理-零件任务清单-异常原因"},
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
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true},
  {props:'linieName',name:'专业采购员', key: "ZHUANYECAIGOUYUAN", tooltip: true},
  {props:'epEngineer',name:'EP工程师',key:'EPGONCHENGSHI',tooltip: true},
]

export const partSortStatus = {
 PART_TASK_NEED_EP_CONFIEMED:"1", //需EP确认
 PART_TASK_NEED_MQ_CONFIEMED:"2",//需MQ确认
 PART_TASK_WAIT_RELEASE:"3",//等待释放
 PART_TASK_WAIT_DELETE:"4",//等待删除
 PART_TASK_NORMAL_PARTS:"5",//正常零件
}