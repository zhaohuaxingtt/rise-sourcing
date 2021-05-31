/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 17:06:56
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-25 21:27:26
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\data.js
 */

export const tableTitle = [
  {props:'supplier',name:'供应商', enName: 'Supplier Name', key: "", tooltip: true},
  {props:'supplierNo',name:'供应商编号', enName: 'Supplier No.', key: "", tooltip: true},
  {props:'location',name:'所在地', enName: 'Location', key: "", tooltip: true},
  {props:'c',name:'是否MBDL', enName: 'MBDL', key: "", tooltip: true},
  {props:'d',name:'已报价', enName: 'Completely Quoted', key: "", tooltip: true, width: 150},
  {props:'e',name:'部分报价', enName: 'Partial Quoted', key: "", tooltip: true},
  {props:'f',name:'被拒绝', enName: 'Refused', key: "", tooltip: true},
  {props:'g',name:'没有报价', enName: 'No Quotation', key: "", tooltip: true},
  {props:'h',name:'RATING', key: "", tooltip: true, children: [
    {props: 'MQ', name: 'MQ', key: ""},
    {props: 'PL', name: 'PL', key: ""},
    {props: 'EP', name: 'EP', key: ""}
  ]}
]

export const mockData = [
  {supplier:'dds', supplierNo: '432kjk23lej2', location: 'xx地', MQ: 'A', PL: 'B+', EP: 'C', withIcon: ['MQ']},
  {supplier:'ddfdsas', supplierNo: '432k32jk23lej2', location: 'xx地', MQ: 'A', PL: 'B+', EP: 'C'}
]

export const partsRatingTableTitle = [
  {props:'supplier',name:'零件号', key: "", tooltip: true},
  {props:'supplierNo',name:'FS号', key: "", tooltip: true},
  {props:'location',name:'采购工厂', key: "", tooltip: true},
  {props:'c',name:'零件名称(中)', key: "", tooltip: true},
  {props:'d',name:'零件名称(德)', key: "", tooltip: true, width: 150},
  {props:'e',name:'车型项目', key: "", tooltip: true},
  {props:'f',name:'相关车型', key: "", tooltip: true},
  {props:'h',name:'ER', key: "", tooltip: true, children: [
    {props: 'i', name: '评分', key: "", require},
    {props: 'j', name: '外部开发票(元)', key: ""},
    {props: 'k', name: '增加的认可费(元)', key: ""},
    {props: 'l', name: '认可周期(周)', key: ""},
    {props: 'beizhu', name: '备注', key: ""}
  ]}
]