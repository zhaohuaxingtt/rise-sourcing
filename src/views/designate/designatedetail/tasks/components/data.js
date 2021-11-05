/*
 * @Author: your name
 * @Date: 2021-05-29 09:21:13
 * @LastEditTime: 2021-07-13 10:54:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/designate/designatedetail/tasks/components/data.js
 */
// 单一供应商表头
export const tasksTitle = [
  {
    props: 'taskTime',
    name: 'Time',
    key: 'Time',
    tooltip: false
  },
  {
    props: 'taskRemark',
    name: 'Task',
    key: 'Task',
    tooltip: false
  },
  {
    props: 'taskResult',
    name: 'Result',
    key: 'Result',
    tooltip: false
  },
  {
    props: 'isFinishFlag',
    name: 'STATUS',
    key: 'STATUS',
    tooltip: false
  },
  // {
  //   props: 'edit',
  //   name: 'HIDE/UNHIDE',
  //   key: 'HIDE/UNHIDE',
  //   tooltip: false
  // }
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

// 单一供应商列表moke数据
export const MoketasksData = [
  {
    "time": "2021-05-12",
    "task": "Optimize the Cost Walk",
    "result": "In Discussion",
    "status": "Ongoing"
  },
  {
    "time": "2021-05-22",
    "task": "Futher negotiation",
    "result": "Done",
    "status": "Finished"
  },
]