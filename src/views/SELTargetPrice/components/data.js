/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:32:07
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-29 16:00:07
 * @Description: 
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\components\data.js
 */

export const TAB = [
  // {
  //   value: 1,
  //   name: '寻源执行',
  //   key: 'LK_XUNYUANZHIHANG',
  //   url: '/sourceinquirypoint/sourcing/partsign',
  //   activePath: 'sourcing',
  //   message: 0
  // },
  // {
  //   value: 2,
  //   name: '进度监控',
  //   key: 'LK_JINDUJIANKONG',
  //   url: '/nomination',
  //   message: 0
  // },
  {
    value: 1,
    name: '财务目标价管理',
    key: 'CAIWUMUBIAOJIAGUANLI',
    url: '/targetpriceandscore/financialtargetprice',
    activePath: 'financialtargetprice',
    message: 0
  },
  {
    value: 2,
    name: '模具目标价管理',
    key: 'MUJUMUBIAOJIAGUANLI',
    url: '/targetpriceandscore/modeltargetprice',
    activePath: 'modeltargetprice',
    message: 0
  }
]

export const MENU = [
  {
    value: 1,
    name: '目标价签收',
    message: 0,
    url: '/targetpriceandscore/modeltargetprice/signin',
    activePath: 'signin',
    key: 'MUBIAOJIAQIANSHOU',
    permissionKey: 'MODELTARGETPRICE_SIGNIN_PAGE',
    permissionName: '模具目标价管理-目标价签收-页面'
  },
  {
    value: 2,
    name: '目标价维护',
    message: 0,
    url: '/targetpriceandscore/modeltargetprice/maintenance',
    activePath: 'maintenance',
    key: 'MUBIAOJIAWEIHU',
    permissionKey: 'MODELTARGETPRICE_MAINTENANCE_PAGE',
    permissionName: '模具目标价管理-目标价维护-页面'
  },
  {
    value: 3,
    name: '目标价审批',
    message: 0,
    url: '/targetpriceandscore/modeltargetprice/approval',
    activePath: 'approval',
    key: 'MUBIAOJIASHENPI',
    permissionKey: 'MODELTARGETPRICE_APPROVAL_PAGE',
    permissionName: '模具目标价管理-目标价审批-页面'
  },
  {
    value: 4,
    name: '目标价查询',
    message: 0,
    url: '/targetpriceandscore/modeltargetprice/query',
    activePath: 'query',
    key: 'MUBIAOJIACHAXUN',
    permissionKey: 'MODELTARGETPRICE_QUERY_PAGE',
    permissionName: '模具目标价管理-目标价查询-页面'
  },
]

// 待维护列表
export const toBeMaintainTableTitle = [
  { props: 'fsnrGsnrNum', name: '零件采购项目号', key: "LK_FSNR", tooltip: true, minWidth: 135,fixed: true,   },
  { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 120,fixed: true,   },
  { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGCHENGZHONG", tooltip: true, minWidth: 125,  },
  { props: 'rfqCode', name: 'RFQ编号', key: "RFQBIANHAO", tooltip: true, minWidth: 100,  },
  { props: 'categoryName', name: '材料组', key: "CAILIAOZU", tooltip: true, minWidth: 100,  },
  { props: 'businessType', name: '申请类型', key: "申请类型", tooltip: true, minWidth: 90,  },
  { props: 'expectedShareTargetPrice', name: '期望目标价·分摊', key: "期望目标价·分摊", tooltip: true, minWidth: 140,  },
  { props: 'expectedDisposableTargetPrice', name: '期望目标价·一次性', key: "期望目标价·一次性", tooltip: true, minWidth: 150,  },
  { props: 'releaseOutput', name: '分摊量', key: "分摊量", tooltip: true, minWidth: 110,  },
  { props: 'shareTargetPrice', name: '目标价-分摊', key: "目标价-分摊", tooltip: true, minWidth: 130, required:true  },
  { props: 'estimateShareAPrice', name: '预计A价分摊', key: "预计A价分摊", tooltip: true, minWidth: 130,  },
  { props: 'targetPrice', name: '目标价-一次性', key: "目标价-一次性", tooltip: true, minWidth: 130, required:true  },
]

// 申请记录
export const applyTableTitle = [
  { props: 'fsnrGsnrNum', name: '零件采购项目号', key: "LK_FSNR", tooltip: true, minWidth: 125,  },
  { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 120,  },
  { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGCHENGZHONG", tooltip: true, minWidth: 125,  },
  { props: 'rfqCode', name: 'RFQ编号', key: "RFQBIANHAO", tooltip: true, minWidth: 100,  },
  { props: 'categoryName', name: '材料组', key: "CAILIAOZU", tooltip: true, minWidth: 100,  },
  { props: 'businessType', name: '申请类型', key: "申请类型", tooltip: true, minWidth: 90,  },
  { props: 'expectedShareTargetPrice', name: '期望目标价·分摊', key: "期望目标价·分摊", tooltip: true, minWidth: 140,  },
  { props: 'expectedDisposableTargetPrice', name: '期望目标价·一次性', key: "期望目标价·一次性", tooltip: true, minWidth: 150,  },
  { props: 'releaseOutput', name: '分摊量', key: "分摊量", tooltip: true, minWidth: 90,  },
  { props: 'shareTargetPrice', name: '目标价-分摊', key: "目标价-分摊", tooltip: true, minWidth: 110,  },
  { props: 'estimateShareAPrice', name: '预计A价分摊', key: "预计A价分摊", tooltip: true, minWidth: 110,  },
  { props: 'targetPrice', name: '目标价-一次性', key: "目标价-一次性", tooltip: true, minWidth: 120,  },
  { props: 'applicationDate', name: '申请时间', key: "SHENQINGSHIJIAN", tooltip: true, minWidth: 180,  },

]