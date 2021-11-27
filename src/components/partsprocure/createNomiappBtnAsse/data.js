/*
 * @Author: your name
 * @Date: 2021-09-03 16:27:49
 * @LastEditTime: 2021-11-24 15:53:47
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\components\partsprocure\createNomiappBtnAsse\data.js
 */
export const tableTitle = [
  {props:'supplierName',name:'',key: '',tooltip:false,width:''},
  {props:'fsnrGsnrNum',name:'FS号',key: 'FSNRGSNRNUMBER',tooltip:false,width:''},
  {props:'sapNum',name:'供应商SAP号',key: 'LK_SAPNUMBER',tooltip:false,width:''},
  {props:'procureFactoryName',name:'采购工厂',key: 'LK_CAIGOUGONGC',tooltip:false,width:''},
  {props:'partNum',name:'零件号',key: 'LK_LINGJIANHAO',tooltip:false,width:''},
  {props:'partTypeDesc',name:'零件类型',key: 'LK_LINGJIANLEIX',tooltip:false,width:''},
  {props:'aprice',name:'A价',key: 'LK_AJIA',tooltip:false,width:''},
  {props:'bprice',name:'B价',key: 'LK_BJIA',tooltip:false,width:''},
  {props:'rate',name:'份额',key: 'LK_FENE',tooltip:false,width:''}
]

export const sampleTableTitle = (isDb)=> [
	{ props: "sampleType", name: "样件", tooltip: true, key: "LK_YANGJIAN",isAeko:true },
	{ props: "requiredTime", name: "需要日期(周)", tooltip: true, key: "LK_XUYAORIQIZHOU" },
	{ props: "quantity", name: "需要数量(件)", tooltip: true, key: "LK_XUYAOSHULIANGJIAN" },
	{ props: "sampleUnitPrice", name: `${isDb?'工装样件单件费用(RMB)':"工装样件单件费用"}`, key: `${isDb?'LK_GONGZHUANGYANGJIANDANJIANFEIYONGRMB':'LK_GONGZHUANGYANGJIANDANJIANFEIYONG'}` ,isAeko:true},
	{ props: "addionalMouldCost", name: `${isDb?'附加工装样件模具价格(RMB)':'附加工装样件模具价格'}`, key: `${isDb?'LK_FUJIAGONGZHUANGYANGJIANMUJUJIAGERMB':'LK_FUJIAGONGZHUANGYANGJIANMUJUJIAGE'}` ,isAeko:true},
	{ props: "addionalMouldLife", name: "附加工装样件模具寿命(个数)", key: "LK_FUJIAGONGZHUANGYANGJIANMUJUSHOUMINGGESHU" ,isAeko:true},
	{ props: "remark", name: "备注", tooltip: true, key: "LK_BEIZHU" ,isAeko:true},
]
