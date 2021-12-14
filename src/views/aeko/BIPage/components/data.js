/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 14:37:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-14 10:49:08
 * @Description: 
 */

// 主菜单
export const TAB = [
  {
    value: 1,
    name: 'AEKO操作',
    message: 0,
    url: '/aeko/approve',
    activePath: '/approve',
    key: 'LK_AEKOCAOZUO',
    permissionKey:'LK_AEKOCAOZUO',
    permissionName:'AEKO操作',
  },
  {
    value: 2,
    name: 'AEKO报表',
    message: 0,
    url: '/aeko/report',
    activePath: '/report',
    key: 'LK_AEKOBAOBIAO',
    permissionKey:'LK_AEKOBAOBIAO',
    permissionName:'AEKO报表',
  },
]


export const SUBMENU = [
  {
    value: 1,
    name: 'AEKO逾期报表',
    message: 0,
    url: '/aeko/report/overdue',
    activePath: '/overdue',
    key: 'AEKOYUQIBAOBIAO',
    permissionKey:'AEKOYUQIBAOBIAO',
    permissionName:'AEKO逾期报表',    

  },{
    value: 2,
    name: '状态跟踪报表',
    message: 0,
    url: '/aeko/report/statetrack',
    activePath: '/statetrack',
    key: 'ZHUANGTAIGENZONGBAOBIAO',
    permissionKey:'ZHUANGTAIGENZONGBAOBIAO',
    permissionName:'状态跟踪报表',  
  },
]
