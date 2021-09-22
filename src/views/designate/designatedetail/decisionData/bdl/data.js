/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 17:06:56
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-22 15:46:55
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\data.js
 */

export const tableTitle = [
  {props:'supplierName',name:'供应商', enName: 'Supplier Name', key: "GONGYINGSHANG", tooltip: true, width: 300},
  {props:'sapCode',name:'供应商编号', enName: 'Supplier No.', key: "GONGYINGSHANGBIANHAO", tooltip: true},
  {props:'location',name:'所在地', enName: 'Location', key: "SUOZAIDI", tooltip: true},
  {props:'isMbdl',name:'是否MBDL', enName: 'MBDL', key: "MBDL", tooltip: true},
  {props:'isQuotation',name:'已报价', enName: 'Completely Quoted', key: "YIBAOJIA", tooltip: true, width: 150},
  {props:'isPartQuotation',name:'部分报价', enName: 'Partial Quoted', key: "BUFENBAOJIA", tooltip: true},
  {props:'isRefuse',name:'被拒绝', enName: 'Refused', key: "BEIJUJUE", tooltip: true},
  {props:'noQuotation',name:'没有报价', enName: 'No Quotation', key: "MEIYOUBAOJIA", tooltip: true},
  // {props:'departmentRate',name:'RATING', key: "", tooltip: true, children: [
  //   {props: 'MQ', name: 'MQ', key: ""},
  //   {props: 'PL', name: 'PL', key: ""},
  //   {props: 'EP', name: 'EP', key: ""}
  // ]}
]

export const mockData = [
  {supplier:'dds', sapCode: '432kjk23lej2', location: 'xx地', MQ: 'A', PL: 'B+', EP: 'C', withIcon: ['MQ']},
  {supplier:'ddfdsas', sapCode: '432k32jk23lej2', location: 'xx地', MQ: 'A', PL: 'B+', EP: 'C'}
]

export const partsRatingTableTitle = [
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'fsNum',name:'FS号', key: "FSNO", tooltip: true},
  {props:'purchasingFactory',name:'采购工厂', key: "CAIGOUGONGCHANG", tooltip: true},
  {props:'partNameZh',name:'零件名称(中)', key: "LINGJIANMINGCHEN_ZH", tooltip: true},
  {props:'partNameDe',name:'零件名称(德)', key: "LINGJIANMINGCHEN_DE", tooltip: true, width: 150},
  {props:'carProjectType',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'relatedModels',name:'相关车型', key: "XIANGGUANCHEXING", tooltip: true},
  {props:'h',name:'ER', key: "ER", tooltip: true, children: [
    {props: 'grade', name: '评分', key: "PINGFEN", require},
    {props: 'externaFee', name: '外部开发费(元)', key: "WAIBUKAIFAFEI_YUAN"},
    {props: 'addFee', name: '增加的认可费(元)', key: "ZENGJIARENKEFEI_YUAN"},
    {props: 'confirmCycle', name: '认可周期(周)', key: "RENKEZHOUQI_ZHOU"},
    // {props: 'beizhu', name: '备注', key: "BEIZHU"}
  ]}
]