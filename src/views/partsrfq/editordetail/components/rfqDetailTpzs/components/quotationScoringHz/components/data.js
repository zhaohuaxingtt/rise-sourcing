/*
 * @Author: your name
 * @Date: 2021-05-28 14:32:26
 * @LastEditTime: 2021-06-04 10:17:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\data.js
 */
import {_getMathNumber} from '@/utils'
//表格全集。
export const fstitle = [
  {type:'selection',props:'groupProps',label:'Group',i18n:'',width:'50',tooltip:false},
  {type:'',props:'partNo',label:'Part No.',i18n:'',width:'100',tooltip:false},
  {type:'',props:'partName',label:'Part Name',i18n:'',width:'100',tooltip:false},
  {type:'',props:'partPrjCode',label:'FS/GS/SP No.',i18n:'',width:'120',tooltip:false},
  {type:'',props:'factory',label:'Factory',i18n:'',width:'120',tooltip:false},
  {type:'',props:'cfPartAPrice',label:'CF Part A Price',i18n:'',width:'120',tooltip:false},
  {type:'',props:'cfPartBPrice',label:'CF Part B Price',i18n:'',width:'120',tooltip:false},
  {type:'',props:'pca',label:'PCA',i18n:'',width:'100',tooltip:false},
  {type:'',props:'tia',label:'TIA',i18n:'',width:'100',tooltip:false},
  {type:'',props:'ebr',label:'EBR',i18n:'',width:'100',tooltip:false}
]

//表格循环部分
export const fstableTileXh = function(index){
  return [
    {type:'',props:`${index?index:''}lcAPrice`,label:'LC A Price',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}lcBPrice`,label:'LC B Price ',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}skdAPrice`,label:'SKD A Price',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}skdBPrice`,label:'SKD B Price',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}lcAPriceWithoutAllocation`,label:'LC A Price without allocation',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}skdAPriceWithoutAllocation`,label:'SKD A Price without allocation',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}lcBPriceWithoutAllocation`,label:'LC B Price without allocation',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}skdBPriceWithoutAllocation`,label:'SKD B Price without allocation',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}bnk`,label:'BNK',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}bnkApprovalStatus`,label:'BNK approcval status',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}tooling`,label:'Tooling',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}developmentCost`,label:'Development cost',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}supplierSopDate`,label:'Supplier SOP date',i18n:'',width:'100',tooltip:true},
    {type:'',props:`${index?index:''}ltc`,label:'LTC',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}ltcStaringDate`,label:'LTC Star.Date',i18n:'',width:'100',tooltip:true},
    {type:'',props:`${index?index:''}prototypePrice`,label:'Prototype price',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}tto`,label:'TTO',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}externalDevelopmentCost`,label:'External Development cost',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}releaseCost`,label:'release cost',i18n:'',width:'100',tooltip:false},
    // {type:'',props:`a${index?index:''}quo.de`,label:'Quotation details',i18n:'',width:'',tooltip:false},
  ]
}
//cache list
export const whiteList = ['groupProps','partNo','partName','cfPartAPrice','cfPartBPrice','pca','tia','ebr','lcAPrice','lcBPrice','tooling','ltc','ltcStaringDate','tto'] //默认需要显示的数据
/**
 * @description：通过需要循环的表格和基础表格，在通过白名单将需要所有的百名单删选出来
 * @param {*} whiteList
 * @param {*} tableTileXh
 * @param {*} title
 * @return {*}
 */
export const needSubTotal = ['cfPartAPrice','cfPartBPrice','lcAPrice','lcBPrice','tooling','tto']
export function backChooseList() {
  const allTablelist = [...fstitle,...fstableTileXh(0)]
  const arrayList = []
  allTablelist.forEach(items=>{
    if(!whiteList.find(itemss=> itemss == items.props)){
      arrayList.push(items)
    }
  })
  return arrayList
}
/**
 * @description: 获取表格真实表头。请求完白名单和数据之后，拿到供应商的个数反推表头数
 * @param {*} whiteListService
 * @param {*} supplierLength
 * @return {*}
 */
export function getRenderTableTile(whiteListService,supplierLength){
  const relWhiteList = [...whiteList,...whiteListService]
  const xuhTable = fstableTileXh(0)
  const relTabelListDefault = []
  let relTableListXh = []
  let templateListxh = []
  fstitle.forEach(items=>{
    if(relWhiteList.find(i=>i == items.props)){
      relTabelListDefault.push(items)
    }
  })
  for(let i = 0;i < xuhTable.length;i++){
    if(relWhiteList.find(ii=>ii == xuhTable[i].props)){
      relTableListXh.push(xuhTable[i])
      templateListxh.push(xuhTable[i])
    }
  }
  for(let i = 0; i<supplierLength;i++){
    if(i>0){
      relTableListXh = [...relTableListXh,...addtitle(templateListxh,i)]
    }
  }
  return [...relTabelListDefault,...relTableListXh]
}

/**
 * @description:将title将表头追加一个动态数字 
 * @param {*} list
 * @param {*} index
 * @return {*}
 */
export function addtitle(list,index){
  const templateMap = []
  list.forEach(items=>{
    const newMap = {}
    for (let keys in items) {
      if(keys == 'props'){
        newMap[keys] = index+items[keys]
      }else{
        newMap[keys] = items[keys]
      }
    }
    templateMap.push(newMap)
  })
  return templateMap
}

/**
 * @description: 转换数据评分
 * @param {*} params
 * @return {*}
 */
export function translateRating(supplierList,ratingList) {
  try{
   const supplierlist = []
   const ratingListPrivate = []
   const titleList = []
   supplierList[0].bdlInfoList.forEach(ss=>{
    supplierlist.push(ss.supplierId)
   })
   //拿到固定供应商list。
   supplierlist.forEach((items,index)=>{
     const maps = []
     //通过每一个供应商 去评分list找出相同的数据
     const c = ratingList.filter(ii=>ii.supplierId == items)
     //如果是第一个供应商的时候，需要构造一个评分部门list
     if(index == 0){
      c.forEach(itemsq=>{
        titleList.push(itemsq.rateDepart)
      })
     }
     maps.push(c[0].supplierName)
     //拿到评分部门list 为每个部门设置评分
     titleList.forEach(itemsbb=>{
       const map = c.find(it=>it.rateDepart == itemsbb)
       if(map){
        maps.push(map.rate || '') 
       }
     })
     ratingListPrivate.push(maps)
   })
   return {
     'firstTile':titleList,
     'ratingList':ratingListPrivate
   }
  }catch(err){
    console.log(err)
  }
}

export function translateData(list){
  list.forEach(items=>{
    items.bdlInfoList.forEach((bdl,index)=>{
      for(let keys in bdl){
        items[index>0?(index+keys):keys] = bdl[keys]
      }
    })
  })
  return list
}
/**
 * @description: 将props上的数字去掉
 * @param {*} keys
 * @return {*}
 */
export function removeKeysNumber(keys){
  return keys.replace(/[0-9]/g,'')
}
/**
 * @description: 在表为新增一条total
 * @param {*} tableHeader
 * @param {*} dataList
 * @return {*}
 */
export function subtotal(tableHeader,dataList,priceInfo){
  try {
    const total = {}
    tableHeader.forEach(items=>{
      if(items.props == 'partNo'){
        total[items.props] = 'Subtotal'
      }else{
        if(needSubTotal.find(s => s == removeKeysNumber(items.props))){
          dataList.forEach(element => {
            for(let key in element){
                if(items.props == key){
                  total[key] = _getMathNumber(`${total[key] || 0}+${element[key] || 0}`)
                }
              }
          });
        }
      }
      
    })
    return [total,kmOrbukeage('KM',priceInfo,dataList[0]),kmOrbukeage('Budget',priceInfo,dataList[0])]
  } catch (error) {
    console.warn(error)
    return {partNo:'Subtotal'}
  }
}

/**
 * @description:追加一个km数据和bukege 
 * @param {*} type
 * @return {*}
 */
export function kmOrbukeage(type,priceInfo,exampleDatas){
  try {
    const exampleData = JSON.parse(JSON.stringify(exampleDatas)) //
    let value = {}
    for(let key in exampleData){
      if(removeKeysNumber(key) != 'supplierId'){
        exampleData[key] = ''
      }
    }
    for(let key in exampleData){
      if(removeKeysNumber(key) == 'supplierId'){
        value = priceInfo.find(items=> items.supplierId == exampleData[key])
        const number = getPorpsNumber(key)
        if(type == 'KM'){
          exampleData[number+'lcAPrice'] = value.kmAPrice
          exampleData[number+'tooling'] = value.kmTooling
        }else{
          exampleData[number+'lcAPrice'] = value.budget
        }
      }
      if(key == 'ebr'){
        exampleData[key] = type
      }
    }
    return exampleData
  } catch (error) {
    console.log(error)
    return {}
  }
}

/**
 * @description: 获取表头上的循环后的titleNumber
 * @param {*} key
 * @return {*}
 */
export function getPorpsNumber(key){
  return parseInt(key)?parseInt(key):''
}
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
