/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-10-27 17:22:19
 * @LastEditors: Hao,Jiang
 * @Description: 定点申请头部
 *
 */
export const heaederSubMenu = [
  {
    key:'nomination',
    name:'定点申请综合管理',
    path:'/sourcing/partsnomination',
    permissionKey: 'SOURCING_NOMINATION_PAGE|定点管理页面'
  },
  {
    key:'rsReview',
    name:'上会RS单复核',
    path:'/sourcing/partsnomination/rsReview',
    permissionKey: 'SOURCING_NOMINATION_RSREVIEW_PAGE|上会复核页面'
  },
  {
    key:'record',
    name:'定点记录',
    path:'/sourcing/partsnomination/record',
    permissionKey: 'SOURCING_NOMINATION_NOMINATIONRECORD_PAGE|定点记录页面'
  },
]