/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-12-23 15:34:44
 * @LastEditors: Please set LastEditors
 * @Description: 定点申请头部
 *
 */
export const heaederSubMenu = [
  {
    value:1,
    // key:'nomination',
    name:'定点申请综合管理',
    path:'/sourcing/partsnomination',
    // permissionKey: 'SOURCING_NOMINATION_PAGE|定点管理页面',
    
    message: 0,
    key:'SOURCING_NOMINATION_PAGE',
    url: "/sourcing/partsnomination",
    activePath: "/partsnomination",
    permissionKey: 'SOURCING_NOMINATION_PAGE',
    permissionName: '定点管理页面'
  },
  {
    value:2,
    // key:'rsReview',
    name:'上会RS单复核',
    path:'/sourcing/partsnomination/rsReview',
    // permissionKey: 'SOURCING_NOMINATION_RSREVIEW_PAGE|上会复核页面',

    
    message: 0,
    key:'SOURCING_NOMINATION_RSREVIEW_PAGE',
    url: "/sourcing/partsnomination/rsReview",
    activePath: "rsReview",
    permissionKey: 'SOURCING_NOMINATION_RSREVIEW_PAGE',
    permissionName: '上会复核页面'
  },
  {
    value:3,
    // key:'signSheet',
    name:'M签字单',
    path:'/sourcing/partsnomination/signSheetBox',
    // permissionKey: 'SOURCING_NOMINATION_SIGNSHEET_SIGNSHEETPAGE|签字单列表',

    message: 0,
    key:'SOURCING_NOMINATION_SIGNSHEET_SIGNSHEETPAGE_1',
    url: "/sourcing/partsnomination/signSheetBox",
    activePath: "signSheetBox",
    permissionKey: 'SOURCING_NOMINATION_SIGNSHEET_SIGNSHEETPAGE',
    permissionName: '签字单列表'
  },
  {
    value:4,
    // key:'record',
    name:'定点记录',
    path:'/sourcing/partsnomination/record',
    // permissionKey: 'SOURCING_NOMINATION_NOMINATIONRECORD_PAGE|定点记录页面',

    message: 0,
    key:'SOURCING_NOMINATION_SIGNSHEET_SIGNSHEETPAGE',
    url: "/sourcing/partsnomination/record",
    activePath: "record",
    permissionKey: 'SOURCING_NOMINATION_NOMINATIONRECORD_PAGE',
    permissionName: '定点记录页面'
  }
]