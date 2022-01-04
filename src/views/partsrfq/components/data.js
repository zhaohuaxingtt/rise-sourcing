/*
 * @Author: your name
 * @Date: 2021-06-17 16:49:20
 * @LastEditTime: 2022-01-04 14:08:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\components\data.js
 */

export const confirmTableHead = [
  // export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
  { props: 'index', name: '#', key: '#', tooltip: false, width: 60 },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', tooltip: true },
  {
    props: 'fsNum',
    name: '零件采购项目号',
    key: 'partsprocure.PARTSPROCUREFSNFGSNFSPNR',
    tooltip: false,
  },
  { props: 'rfqId', name: 'RFQ号', key: 'LK_RFQHAO', tooltip: true },
  {
    props: 'cartypeProjectZh',
    name: '车型项目名称',
    key: 'LK_CHEXINGXIANGMUMINGCHENG',
    tooltip: false,
  },
  {
    props: 'procureFactory',
    name: '工厂',
    key: 'TPZS.GONGCHANG',
    tooltip: false,
  },
  { props: 'statusName', name: '状态', key: 'LK_ZHUANGTAI', tooltip: false },
  {
    props: 'category',
    name: '材料组',
    key: 'LK_CAILIAOZU',
    tooltip: true,
  },
  {
    props: 'supplier',
    name: '供应商名称',
    key: 'LK_GONGYINGSHANGMINGCHENG',
    tooltip: false,
  },
]

export const errTipsTableTitle={
  'RFQ':[
    { props: "stuffName", name: "工艺组", key: "LK_GONGYIZU" },
    { props: "supplierName", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG" },
  ],
  'SUGGESTIONSAVE':[
    { props: "fsNum", name: "零件采购项目号", key: "partsprocure.PARTSPROCUREFSNFGSNFSPNR"},
    { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO"},
    { props: "stuffName", name: "工艺组", key: "LK_GONGYIZU"},
    { props: "supplierName", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG"},
  ],
  'SUGGESTIONSUBMIT':[
    { props: "fsNum", name: "零件采购项目号", key: "partsprocure.PARTSPROCUREFSNFGSNFSPNR"},
    { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO"},
    { props: "stuffName", name: "工艺组", key: "LK_GONGYIZU"},
    { props: "supplierName", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG" },
  ],
  'SUGGESTIONFROZEN':[
    { props: "fsNum", name: "零件采购项目号", key: "partsprocure.PARTSPROCUREFSNFGSNFSPNR"},
    { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO"},
    { props: "stuffName", name: "工艺组", key: "LK_GONGYIZU"},
    { props: "supplierName", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG"},
  ]
}

export const errDialogTips ={
  'RFQ':{languageKey:'LK_TIPS_YIXIAGONGYINGSHANGXUNJIASHOUKONGWUFAFASONGXUNJIA',languageTips:'以下供应商询价受控，无法发送询价，请取消选择后重新发送'},
  'SUGGESTIONSAVE':{languageKey:'LK_TIPS_YIXIALINGJIANCAIGOUXIANGMUDETUIJIANGONGYINGSHANGSHOUKONG',languageTips:'以下零件采购项目的推荐供应商受控，无法保存，请重新选择供应商'},
  'SUGGESTIONSUBMIT':{languageKey:'LK_TIPS_YIXIALINGJIANCAIGOUXIANGMUDETUIJIANGONGYINGSHANGSHOUKONGWUFATIJIAO',languageTips:'以下零件采购项目的推荐供应商受控，无法提交，请重新选择供应商'},
  'SUGGESTIONFROZEN':{languageKey:'LK_TIPS_YIXIALINGJIANCAIGOUXIANGMUWUFADONGJIE',languageTips:'以下零件采购项目的推荐供应商受控，无法冻结，请重新选择供应商'},
}