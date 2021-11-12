/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 14:37:05
 * @LastEditors: YoHo
 * @LastEditTime: 2021-11-12 14:38:59
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
    key: 'LK_AEKOCAOZUO'
  },
  {
    value: 2,
    name: 'AEKO报表',
    message: 0,
    url: '/aeko/report',
    activePath: '/report',
    key: 'LK_AEKOBAOBIAO'
  },
]


export const SUBMENU = [
  {
    value: 1,
    name: '状态跟踪报表',
    message: 0,
    url: '/aeko/report/item',
    activePath: '/item',
    key: 'ZHUANGTAIGENZONGBAOBIAO'
  // },{
  //   value: 2,
  //   name: '状态跟踪报表',
  //   message: 0,
  //   url: '/aeko/report/item2',
  //   activePath: '/item2',
  //   key: 'ZHUANGTAIGENZONGBAOBIAO'
  },
]
