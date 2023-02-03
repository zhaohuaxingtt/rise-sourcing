/*
 * @Author: your name
 * @Date: 2021-05-29 09:21:13
 * @LastEditTime: 2023-02-01 17:02:54
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/designate/designatedetail/tasks/components/data.js
 */
// 单一供应商表头
export const tasksTitle = [
  { props: 'taskTime',isHeaderSetting:true, HeaderSettingList:[{name:'时间'},{name:'Time'},] },
  { props: 'taskRemark',isHeaderSetting:true, HeaderSettingList:[{name:'任务'},{name:'Task'},], minWidth: 200 },
  { props: 'taskResult',isHeaderSetting:true, HeaderSettingList:[{name:'结果'},{name:'Result'},] },
  { props: 'isFinishFlag',isHeaderSetting:true, HeaderSettingList:[{name:'状态'},{name:'Status'},] },
  // {
  //   props: 'taskTime',
  //   name: 'Time',
  //   key: 'Time',
  //   tooltip: false
  // },
  // {
  //   props: 'taskRemark',
  //   name: 'Task',
  //   key: 'Task',
  //   tooltip: false
  // },
  // {
  //   props: 'taskResult',
  //   name: 'Result',
  //   key: 'Result',
  //   tooltip: false
  // },
  // {
  //   props: 'isFinishFlag',
  //   name: 'Status',
  //   key: 'STATUS_EN',
  //   tooltip: false
  // },
]

export const taskStatus = [
  {
    value: 'Ongoing',
    key: true
  },
  {
    value: 'Finished',
    key: false
  },
]

// 取任务状态
export const getTaskStatusDesc = function (key) {
  const task = taskStatus.find(o => o.key === key)
  return (task && task.value) || ''
}