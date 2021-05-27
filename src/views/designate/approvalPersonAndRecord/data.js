/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 21:08:59
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-27 09:06:34
 * @Description: 
 * @FilePath: \front-web\src\views\designate\approvalPersonAndRecord\data.js
 */

export const tableTitle = [
  {props:'a',name:'审批部门', key: "", tooltip: true, type: 'select', editable: false},
  {props:'a1',name:'审批科室', key: "", tooltip: true, type: 'select', editable: false},
  {props:'b',name:'审批人', key: "", tooltip: true},
  {props:'c',name:'生成时间', key: "", tooltip: true},
  {props:'d',name:'截止时间', key: "", tooltip: true},
]

export const mockData = [
  [{a: 'CS', a1: 'CSE', b: 'xx'}, {a: 'CS', a1: 'CSE(外方)', b: 'yyy'}]
]

export const flowData = [
  {step: 0, status: '已提交', approval: '刘博', title: 'CF雇员', approvalTime: '2021-01-01 09:00'},
  {step: 1, status: '已审批', approval: '王三', title: 'CF雇员', approvalTime: '2021-01-01 09:00'},
  {step: 2, status: '审批中', active: true},
  {step: 3, status: '未审批', approvalList: [{name: '赵四', title: 'xx科长'}, {name: '王五', title: 'xx科长'}]},
  {step: 4, status: '以拒绝', approval: '李二', title: 'CF雇员', approvalTime: '2021-01-01 09:00', refuseReason: '拒绝原因描述', explain: ''},
  {step: 5, status: '审批结束'}
]