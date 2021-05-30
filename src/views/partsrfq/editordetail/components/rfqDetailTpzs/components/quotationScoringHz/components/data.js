/*
 * @Author: your name
 * @Date: 2021-05-28 14:32:26
 * @LastEditTime: 2021-05-29 23:08:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\data.js
 */

//表格全集。
export const title = [
  {type:'selection',props:'',label:'Group',i18n:'',width:'',tooltip:false},
  {type:'',props:'b',label:'Part No.',i18n:'',width:'100',tooltip:false},
  {type:'',props:'c',label:'Part Name',i18n:'',width:'100',tooltip:false},
  {type:'',props:'d',label:'CF Part A Price',i18n:'',width:'120',tooltip:false},
  {type:'',props:'e',label:'CF Part B Price',i18n:'',width:'120',tooltip:false},
  {type:'',props:'f',label:'BUC',i18n:'',width:'100',tooltip:false},
  {type:'',props:'g',label:'TIA',i18n:'',width:'100',tooltip:false},
  {type:'',props:'h',label:'EBR',i18n:'',width:'100',tooltip:false},
  {type:'',props:'i',label:'Group',i18n:'',width:'100',tooltip:false},
  {type:'',props:'j',label:'Group',i18n:'',width:'100',tooltip:false},
  {type:'',props:'k',label:'Group',i18n:'',width:'100',tooltip:false},
  {type:'',props:'x',label:'Group',i18n:'',width:'100',tooltip:false},
  {type:'',props:'z',label:'Group',i18n:'',width:'100',tooltip:false},
  {type:'',props:'l',label:'Group',i18n:'',width:'100',tooltip:false},
  {type:'',props:'m',label:'Group',i18n:'',width:'100',tooltip:false},
  {type:'',props:'n',label:'Group',i18n:'',width:'100',tooltip:false},
  {type:'',props:'o',label:'1',i18n:'',width:'100',tooltip:false},
]

//optionsList 数据，需要作为显示的全集数据
export const optionsList = [
  {label:'a',value:'b'}
]

export const whiteList = [] //默认需要显示的数据

/**
 * @description: 
 * @param {*} defaultWihteList //默认显示的白名单
 * @param {*} list //选择需要新增的白名单
 * @return {*}
 */
export function getRenderTableTile(defaultWihteList,list){
  
}

export const exampelData = [
  {b:'2',c:'3',d:'4',e:'5',f:'6',g:'7',h:'8',i:'9',j:'10',k:'11', z:'12',l:'13',m:'14',n:'15',o:'16',x:'22'},
  {b:'2',c:'3',d:'4',e:'5',f:'6',g:'7',h:'8',i:'9',j:'10',k:'11', z:'12',l:'13',m:'14',n:'15',o:'16',x:'22'},
  {b:'2',c:'3',d:'4',e:'5',f:'6',g:'7',h:'8',i:'9',j:'10',k:'11', z:'12',l:'13',m:'14',n:'15',o:'16',x:'22'},
  {b:'2',c:'3',d:'4',e:'5',f:'6',g:'7',h:'8',i:'9',j:'10',k:'11', z:'12',l:'13',m:'14',n:'15',o:'16',x:'22'},
  {b:'2',c:'3',d:'4',e:'5',f:'6',g:'7',h:'8',i:'9',j:'10',k:'11', z:'12',l:'13',m:'14',n:'15',o:'16',x:'22'},
  {b:'Subtotal',c:'',d:'43333',e:'52223',f:'6',g:'7',h:'8',i:'9',j:'10',k:'11', z:'12',l:'13',m:'14',n:'15',o:'16',x:'22'},
  {b:'',c:'',d:'',e:'',f:'',g:'',h:'KM',i:'9',j:'10',k:'11', z:'12',l:'13',m:'14',n:'15',o:'16',x:'22'},
  {b:'',c:'',d:'',e:'',f:'',g:'',h:'Budget',i:'9',j:'10',k:'11', z:'12',l:'13',m:'14',n:'15',o:'16',x:'22'}
]


//------------------------------------------fs数据构造------------------------------------------------------

export const supplierTile = [
  {type:'',props:'b',label:'Supplier',i18n:'',width:'100',tooltip:false},
  {type:'',props:'',label:'Ratings',i18n:'',width:'',tooltip:false,list:[
    {type:'',props:'c',label:'MQ',i18n:'',width:'50',tooltip:false},
    {type:'',props:'d',label:'PL',i18n:'',width:'50',tooltip:false},
    {type:'',props:'f',label:'EN',i18n:'',width:'50',tooltip:false},
  ]},
]

export const centerSupplierList = [
  {type:'',props:'g',label:'A Price',i18n:'',width:'100',tooltip:false},
  {type:'',props:'',label:'SH',i18n:'',width:'',tooltip:false,list:[
    {type:'',props:'g',label:'B Price',i18n:'',width:'100',tooltip:false},
    {type:'',props:'g',label:'Prod.Loc.',i18n:'',width:'100',tooltip:false},
  ]},
  {type:'',props:'g',label:'Invest (excl.VAT)',i18n:'',width:'120',tooltip:false},
  {type:'',props:'g',label:'Dev Cost(incl.VAT)',i18n:'',width:'',tooltip:false,list:[
    {type:'',props:'g',label:'External',i18n:'',width:'150',tooltip:false},
  ]},
  {type:'',props:'g',label:'LTC',i18n:'',width:'100',tooltip:false},
  {type:'',props:'g',label:'TTO',i18n:'',width:'100',tooltip:false},
]

export const lastSupplier = [
  {type:'',props:'c',label:'Mix Price',i18n:'',width:'100',tooltip:false},
  {type:'',props:'d',label:'Total Invest',i18n:'',width:'100',tooltip:false},
  {type:'',props:'f',label:'Total Turnover',i18n:'',width:'100',tooltip:false},
]

export function concactTitlle(supplier){
  return [...supplierTile,...supplier,...lastSupplier]
}


export const supplierTableTop = ['Part','Project','Volnme','EBR','European level(RMB)','KM','Planned Invest','CKD Landed']
export const supplierData = [
  {b:'supplier',c:'MQ',d:'pl',f:'en'},
  {b:'supplier',c:'MQ',d:'pl',f:'en'},
  {b:'supplier',c:'MQ',d:'pl',f:'en'},
  {b:'supplier',c:'MQ',d:'pl',f:'en'}
]
