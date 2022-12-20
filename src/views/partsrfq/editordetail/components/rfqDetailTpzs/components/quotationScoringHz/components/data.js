/*
 * @Author: your name
 * @Date: 2021-05-28 14:32:26
 * @LastEditTime: 2022-12-20 17:52:40
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\data.js
 */
import {_getMathNumber} from '@/utils'
import {partProjTypes} from '@/config'
import { clone, cloneDeep } from 'lodash'
//表格全集。
export const depNumData = {
  'PL':'L',
  'EP':'TE',
  'MQ':'Q'
}
export const fstitle = [
  {type:'selection',props:'groupName',label:'Group',i18n:'',width:'60',tooltip:false,fixed:true},
  {type:'',props:'partNo',label:'Part No.',i18n:'',width:'90',tooltip:false,fixed:true},
  {type:'',props:'partName',label:'Part Name',i18n:'',width:'90',tooltip:false,fixed:true},
  {type:'',props:'partPrjCode',label:'FS/GS/SP No.',i18n:'',width:'80',tooltip:false,fixed:true,renderHeader: '<p>FS/GS/SP</p><p>No.</p>'},
  {type:'',props:'factory',label:'Factory',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'cfPartAPrice',label:'F-T(A) \n (LC)',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'cfPartBPrice',label:'F-T(B) \n (LC)',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'ftSkdAPrice',label:'F-T(A) \n (SKD)',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'ftSkdBPrice',label:'F-T(B) \n (SKD)',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'mouldPrice',label:'Tooling \n Target',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'pca',label:'PCA',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'tia',label:'TIA',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'ebrCalculatedValue',label:'EBR',i18n:'',width:'60',tooltip:false,fixed:true},
  {type:'',props:'headerEbr',label:'',i18n:'',width:'1',tooltip:false}
]
export const gstitle = [
  {type:'selection',props:'groupName',label:'Group',i18n:'',width:'60',tooltip:false,fixed:true},
  {type:'',props:'partNo',label:'Part No.',i18n:'',width:'90',tooltip:false,fixed:true},
  {type:'',props:'partName',label:'Part Name',i18n:'',width:'90',tooltip:false,fixed:true},
  {type:'',props:'partPrjCode',label:'FS/GS/SP No.',i18n:'',width:'80',tooltip:false,fixed:true,renderHeader: '<p>FS/GS/SP</p><p>No.</p>'},
  {type:'',props:'factory',label:'Factory',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'cfPartAPrice',label:'F-T(A) \n (LC)',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'cfPartBPrice',label:'F-T(B) \n (LC)',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'ftSkdAPrice',label:'F-T(A) \n (SKD)',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'ftSkdBPrice',label:'F-T(B) \n (SKD)',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'mouldPrice',label:'Tooling \n Target',i18n:'',width:'80',tooltip:false,fixed:true,renderHeader: '<p>Tooling</p><p>Target</p>'},
  {type:'',props:'pca',label:'PCA',i18n:'',width:'80',tooltip:false,fixed:true},
  {type:'',props:'tia',label:'TIA',i18n:'',width:'80',tooltip:false,fixed:true},
  // {type:'',props:'mouldPrice',label:'T-Target Price',i18n:'',width:'100',tooltip:false,fixed:true},

  {type:'',props:'currentSupplier',label:'Current \n Supplier',i18n:'',width:'60',tooltip:false,fixed:true,renderHeader: '<p>Cur.</p><p>Supplier</p>'},
  {type:'',props:'currentShare',label:'Share',i18n:'',width:'50',tooltip:false,fixed:true},
  {type:'',props:'currentAPrice',label:'Cur. \n A Price',i18n:'',width:'80',tooltip:false,fixed:true,renderHeader: '<p>Cur.</p><p>A Price</p>'},
  {type:'',props:'currentBPrice',label:'Cur. \n B Price',i18n:'',width:'80',tooltip:false,fixed:true,renderHeader: '<p>Cur.</p><p>B Price</p>'},
  {type:'',props:'currentLtc',label:'LTC',i18n:'',width:'50',tooltip:false,fixed:true},
  {type:'',props:'currentTto',label:'Cur. TTO',i18n:'',width:'90',tooltip:false,fixed:true,renderHeader: '<p>Cur.</p><p>TTO</p>'},
 // {type:'',props:'currentSupplierSaving',label:'Cur.\n Sup.Saving',i18n:'',width:'90',tooltip:false,fixed:true,renderHeader: '<p>Cur.</p><p>Sup.Saving</p>'},
  {type:'',props:'ebrCalculatedValue',label:'EBR',i18n:'',width:'60',tooltip:false,fixed:true},
  {type:'',props:'headerEbr',label:'',i18n:'',width:'1',tooltip:false}
]
//表格循环部分
export const fstableTileXh = function(index){
  return [
    {type:'',props:`${index?index:''}lcAPrice`,label:'A Price(LC)',i18n:'',width:'80',tooltip:false, renderHeader: '<p>A Price</p><p>(LC)</p>'},
    {type:'',props:`${index?index:''}skdAPrice`,label:'A Price(SKD)',i18n:'',width:'80',tooltip:false, renderHeader: '<p>A Price</p><p>(SKD)</p>'},
    {type:'',props:`${index?index:''}lcBPrice`,label:'B Price(LC)',i18n:'',width:'80',tooltip:false, renderHeader: '<p>B Price</p><p>(LC)</p>'},
    {type:'',props:`${index?index:''}skdBPrice`,label:'B Price(SKD)',i18n:'',width:'80',tooltip:false, renderHeader: '<p>B Price</p><p>(SKD)</p>'},
    {type:'',props:`${index?index:''}productionLocation`,label:'Prod. \n Location',i18n:'',width:'70',tooltip:false},
    {type:'',props:`${index?index:''}lcAPriceWithoutAllocation`,label:"A Price(LC) \n w/o Alloc.",i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}skdAPriceWithoutAllocation`,label:"A Price(SKD) \n w/o Alloc.",i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}lcBPriceWithoutAllocation`,label:"B Price(LC) \n w/o Alloc.",i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}skdBPriceWithoutAllocation`,label:"B Price(SKD) \n w/o Alloc.",i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}bnk`,label:'BNK',i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}bnkApprovalStatus`,label:'BNK \n Status',i18n:'',width:'62',tooltip:false, renderHeader: '<p>BNK</p><p>Status</p>'},
    {type:'',props:`${index?index:''}tooling`,label:'Tooling',i18n:'',width:'74',tooltip:false},
    {type:'',props:`${index?index:''}developmentCost`,label:'Dev. \n Cost',i18n:'',width:'80',tooltip:false, renderHeader: '<p>Dev.</p><p>Cost</p>'},
    {type:'',props:`${index?index:''}supplierSopDate`,label:'Supplier \n SOP Date',i18n:'',width:'95',tooltip:true},
    {type:'',props:`${index?index:''}ltc`,label:'LTC',i18n:'',width:'50',tooltip:false},
    {type:'',props:`${index?index:''}ltcStaringDate`,label:'LTC \n Start Date',i18n:'',width:'95',tooltip:true},
    {type:'',props:`${index?index:''}prototypePrice`,label:'Prototype \n Price',i18n:'',width:'80',tooltip:false, renderHeader: '<p>Prototype</p><p>Price</p>'},
    {type:'',props:`${index?index:''}tto`,label:'TTO',i18n:'',width:'90',tooltip:false},
    {type:'',props:`${index?index:''}externalDevelopmentCost`,label:'External \n Dev. Cost',i18n:'',width:'90',tooltip:false, renderHeader: '<p>External</p><p>Dev. Cost</p>'},
    {type:'',props:`${index?index:''}releaseCost`,label:'Release Cost',i18n:'',width:'82',tooltip:false, renderHeader: '<p>Release</p><p>Cost</p>'},
    {type:'',props:`Quotationdetails`,label:'Quo. \n Details',i18n:'',width:'60',tooltip:false},
  ]
}
export const gstableTileXh = function(index){
  return [
    {type:'',props:`${index?index:''}lcAPrice`,label:'A Price(LC)',i18n:'',width:'80',tooltip:false, renderHeader: '<p>A Price</p><p>(LC)</p>'},
    {type:'',props:`${index?index:''}skdAPrice`,label:'A Price(SKD)',i18n:'',width:'80',tooltip:false, renderHeader: '<p>A Price</p><p>(SKD)</p>'},
    {type:'',props:`${index?index:''}lcBPrice`,label:'B Price(LC)',i18n:'',width:'80',tooltip:false, renderHeader: '<p>B Price</p><p>(LC)</p>'},
    {type:'',props:`${index?index:''}skdBPrice`,label:'B Price(SKD)',i18n:'',width:'80',tooltip:false, renderHeader: '<p>B Price</p><p>(SKD)</p>'},
    {type:'',props:`${index?index:''}productionLocation`,label:'Prod. \n Location',i18n:'',width:'70',tooltip:false},
    {type:'',props:`${index?index:''}lcAPriceWithoutAllocation`,label:'A Price(LC) \n w/o Alloc.',i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}skdAPriceWithoutAllocation`,label:'A Price(SKD) \n w/o Alloc.',i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}lcBPriceWithoutAllocation`,label:'B Price(LC) \n w/o Alloc.',i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}skdBPriceWithoutAllocation`,label:'B Price(SKD) \n w/o Alloc.',i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}bnk`,label:'BNK',i18n:'',width:'80',tooltip:false},
    {type:'',props:`${index?index:''}bnkApprovalStatus`,label:'BNK \n Status',i18n:'',width:'70',tooltip:false, renderHeader: '<p>BNK</p><p>Status</p>'},
    {type:'',props:`${index?index:''}tooling`,label:'Tooling',i18n:'',width:'74',tooltip:false},
    {type:'',props:`${index?index:''}developmentCost`,label:'Dev. \n Cost',i18n:'',width:'80',tooltip:false, renderHeader: '<p>Dev.</p><p>Cost</p>'},
    {type:'',props:`${index?index:''}supplierSopDate`,label:'Supplier \n SOP Date',i18n:'',width:'95',tooltip:true},
    {type:'',props:`${index?index:''}ltc`,label:'LTC',i18n:'',width:'50',tooltip:false},
    {type:'',props:`${index?index:''}ltcStaringDate`,label:'LTC \n Start Date',i18n:'',width:'95',tooltip:true},
    {type:'',props:`${index?index:''}prototypePrice`,label:'Prototype \n Price',i18n:'',width:'80',tooltip:false, renderHeader: '<p>Prototype</p><p>Price</p>'},
    {type:'',props:`${index?index:''}tto`,label:'TTO',i18n:'',width:'90',tooltip:false},
    {type:'',props:`${index?index:''}externalDevelopmentCost`,label:'External \n Dev. Cost',i18n:'',width:'90',tooltip:false},
    {type:'',props:`${index?index:''}releaseCost`,label:'Release \n Cost',i18n:'',width:'80',tooltip:false, renderHeader: '<p>Release</p><p>Cost</p>'},
    {type:'',props:`${index?index:''}saving`,label:'Saving',i18n:'',width:'70',tooltip:false},
    {type:'',props:`Quotationdetails`,label:'Quo. \n Details',i18n:'',width:'60',tooltip:false},
  ]
}
/**
 * @description: 静态数据在线报价结果表头字段
 * @param {*}
 * @return {*}
 */
 export const suplierTableDataTitel = [
  {type:'',props:'currentSort',name:'排名',key:'PAIMINGKEY',width:'100',tooltip:false},
  {type:'',props:'supplierCode',name:'供应商编号',key:'GONGYINGSMINGC',width:'',tooltip:false},
  {type:'',props:'supplierName',name:'供应商名称',key:'',width:'GONGYSBIANHAO',width:'220',tooltip:false},
  {type:'',props:'offerPrice',name:'TTO',key:'',width:'100',tooltip:false},
  // {type:'',props:'mixPrice',name:'报价进度',key:'BAOJIAJINGDU',width:'100',tooltip:false}
]
/**
 * @description: fs 横纵默认展示项的配置项
 * @param {*}
 * @return {*}
 */
export const whiteList = ['headerEbr','groupName','partNo','partName','cfPartAPrice','cfPartBPrice','mouldPrice','ebrCalculatedValue','lcAPrice','lcBPrice','tooling','ltc','ltcStaringDate','tto'] //默认需要显示的数据
/**
 * @description: gs横轴默认配置项
 * @param {*}
 * @return {*}
 */
export const whiteListGs = ['currentSupplier','headerEbr','groupName','partNo','partName','currentAPrice','currentBPrice','mouldPrice','ebrCalculatedValue','lcAPrice','lcBPrice','tooling','ltc','ltcStaringDate','tto','saving','cfPartAPrice','cfPartBPrice','releaseCost'] //默认需要显示的数据
/**
 * @description：通过需要循环的表格和基础表格，在通过白名单将需要所有的百名单删选出来
 * @param {*} whiteList
 * @param {*} tableTileXh
 * @param {*} title
 * @return {*}
 */
export const needSubTotal = ['cfPartAPrice','cfPartBPrice','ftSkdAPrice','ftSkdBPrice','lcAPrice','skdAPrice','lcBPrice','skdBPrice','tooling','tto','developmentCost','releaseCost','toolingShare','developmentCostShare']
/**
 * @description:根据不同type获取options列表，这个方法适用于所有模板
 * @param {*} type 想要获取的type类型
 * @return {*}
 */
export function backChooseList(type) {
  let whiteLists = []
  let allTablelist = []
  if(type == 1){ //fs as list
     whiteLists = whiteList
     allTablelist = [...fstitle,...fstableTileXh(0)]
  }else if(type == 2){ //supplier as list
    // whiteLists = supplierWhiteList
    // allTablelist = [...supplierTile,...centerSupplierList(0),...lastSupplier,...leftSideData]
  }else{
    whiteLists = whiteListGs
    allTablelist = [...gstitle,...gstableTileXh(0)]
  }
  const arrayList = []
  allTablelist.forEach(items=>{
    if(items.list && items.props != 'rating'){
      items.list.forEach(itemsss=>{
        if(!whiteLists.find(itemss=> itemss == itemsss.props)){
          arrayList.push(itemsss)
        }
      })
    }else{
      if(!whiteLists.find(itemss=> itemss == items.props) && items.props != 'rating' && items.props != "headerEbr"){
        arrayList.push(items)
      }
    }
  })
  return arrayList
}
/**
 * @description: 获取表格真实表头。请求完白名单和数据之后，拿到供应商的个数反推表头数 fs横轴
 * @param {*} whiteListService
 * @param {*} supplierLength
 * @param {*} layout
 * @return {*}
 */
export function getRenderTableTile(whiteListService,supplierLength,layout){
  try {
    const relWhiteList = layout==1?[...whiteList,...whiteListService]:[...whiteListGs,...whiteListService]
    const xuhTable = layout==1?fstableTileXh(0):gstableTileXh(0)
    const fstitleFn = layout==1?fstitle:gstitle
    const relTabelListDefault = []
    let relTableListXh = []
    let templateListxh = []
    let allxunhuanTableList = xuhTable
    //为导出做数据准备。
    let relTabelListDefaultExport = []
    fstitleFn.forEach((items,index)=>{
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
    const lastChildProps = {name:relTableListXh[relTableListXh.length -1].label,props:relTableListXh[relTableListXh.length -1].props}
    for(let i = 0; i<supplierLength;i++){
      if(i>0){
        relTableListXh = [...relTableListXh,...addtitle(templateListxh,i)]
        allxunhuanTableList = [...allxunhuanTableList,...addtitle(xuhTable,i)]
      }
    }
    ([...fstitleFn.filter(items=>items.props != 'headerEbr'),...allxunhuanTableList]).forEach((items,index)=>{
      if([...relTabelListDefault,...relTableListXh].find(items1=>items1.props == items.props)){
        relTabelListDefaultExport.push({...items,...{hidden:false,index:index,name:items.label}})
      }else{
        relTabelListDefaultExport.push({...items,...{hidden:true,index:index,name:items.label}})
      }
    })
    return {title:[...relTabelListDefault,...relTableListXh],xhLastChildProps:lastChildProps,allExportHiddenOrShow:relTabelListDefaultExport}
  } catch (error) {
    console.log(error)
    return {title:[],xhLastChildProps:[],allExportHiddenOrShow:[]}
  }

}
/**
 * @description:将title将表头追加一个动态数字 
 * @param {*} list
 * @param {*} index
 * @return {*}
 */
export function addtitle(list,index,factoryList=[]){
  let factory = ''
  if(factoryList.length > 0){
    factory = factoryList[index].factory
  }
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
    if(removeKeysNumber(newMap.props) == 'factory'){
      newMap.label = factory
    }
    if(newMap.list && newMap.list.length >0){
      newMap.list.forEach(itemss=>{
        for (let keys in itemss) {
          if(keys == 'props'){
            itemss.props = index+itemss[keys]
          }
        }
      })
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
        titleList.push(itemsq.rateType)
      })
     }
     maps.push({rate:c[0].supplierName,rateEn:c[0].supplierNameEn,isAllPartRateConsistent:c[0].rfmRate,isRateRisk:c[0].isRateRisk})
     //拿到评分部门list 为每个部门设置评分
     titleList.forEach(itemsbb=>{
       const map = c.find(it=>it.rateType == itemsbb)
       if(map){
        maps.push({rate:map.rate,isAllPartRateConsistent:map.isAllPartRateConsistent} || '') 
       }
     })
     ratingListPrivate.push(maps)
   })
   return {
     'firstTile':titleList,
     'ratingList':ratingListPrivate
   }
  }catch(err){
    return {
      'firstTile':[],
      'ratingList':[]
    }
  }
}

export function translateData(list){
  list.forEach(items=>{
    items['active'] = false;
    items.bdlInfoList.forEach((bdl,index)=>{
      for(let keys in bdl){
        items[index>0?(index+keys):keys] = bdl[keys]
      }
    })
  })
  return list
}
function keepTwoDecimalFull(num) {
  var result = parseFloat(num);
  if (isNaN(result)) {
    return num
  }
  result = Math.round(num * 100) / 100;
  var s_x = result.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
  pos_decimal = s_x.length;
  s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
  s_x += '0';
  }
  return s_x;
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
export function subtotal(tableHeader,dataList,priceInfo,fsTemplate){
  try {
    // eslint-disable-next-line no-undef
    let groupArr = _.uniqBy(dataList.reduce((accu, item) => {return item.groupId ? [...accu, {groupName: item.groupName, groupId: item.groupId,toolingHasShare:1,developmentCostHasShare:1}] : accu}, []), 'groupId')
    const total = {
      toolingHasShare:1,
      developmentCostHasShare:1
    }
    tableHeader = [...tableHeader,...[{props:'toolingShare'},{props:'developmentCostShare'}]]

    tableHeader.forEach(items => {
      if (/^\d+tooling$/.test(items.props) || /^\d+developmentCost$/.test(items.props)) {
        tableHeader.push({ props: `${ items.props }Share` })
      }
    })

    tableHeader.forEach(items=>{
      if(items.props == 'groupName'){
        total["groupId"] = '-'
        groupArr = groupArr.map(item => {
          return {
            ...item,
            groupIdTemp: item.groupId,
            groupId: '-'
          }
        })
      }
      if(items.props == 'partNo'){
        total[items.props] = 'Total'
        groupArr = groupArr.map(item => {
          return {
            ...item,
            [items.props]: 'Group total: ' + item.groupName
          }
        })
      }else{
        if(needSubTotal.find(s => s == removeKeysNumber(items.props))){
          dataList.forEach(element => {
            for(let key in element){
                if(items.props == key){
                  //需要 Lc Aprice . Lc Bprice TTo 
                  if(['lcAPrice','lcBPrice','skdAPrice','skdBPrice','cfPartAPrice','ftSkdAPrice','cfPartBPrice','ftSkdBPrice'].includes(removeKeysNumber(key))){
                    groupArr = groupArr.map(item => {
                      return {
                        ...item,
                        [key]: fsTemplate ? (asSameCartypeInGroupList(item.groupIdTemp,dataList) ? (element.groupId === item.groupIdTemp ? (!element[key] || item[key] == "/")?'/': math.bignumber(_getMathNumber(`${item[key] || 0}+${element[key] || 0}*${element['ebrCalculatedValue'] || 1}`)).toString()  : item[key] || 0):'/'):''
                      }
                    })

                    total[key] = fsTemplate ? ((!element[key] || total[key] == "/")?"/": math.bignumber(_getMathNumber(`${total[key] || 0}+${element[key] || 0}*${element['ebrCalculatedValue'] || 1}`)).toString()):''
                  }else{
                    //mathjs版本问题，带精度参数的floor函数不可用
                    groupArr = groupArr.map(item => {
                      return {
                        ...item,
                        [key]: 
                          (/^\d*toolingShare$/.test(key) || /^\d*developmentCostShare$/.test(key)) ? 
                          (element.groupId === item.groupIdTemp ? math.add(math.bignumber(translateNumber(total[key]) || 0), math.bignumber(translateNumber(element[key]) || 0)).toString() : item[key]):
                          (element.groupId === item.groupIdTemp ? parseInt(_getMathNumber(`${total[key] || 0}+${translateNumber(element[key])}`)) : item[key])
                      }
                    })

                    if (/^\d*toolingShare$/.test(key) || /^\d*developmentCostShare$/.test(key)) {
                      total[key] = math.add(math.bignumber(translateNumber(total[key]) || 0), math.bignumber(translateNumber(element[key]) || 0)).toString()
                    } else {
                      total[key] = parseInt(_getMathNumber(`${total[key] || 0}+${translateNumber(element[key])}`))
                    }
                  }
                }
              }
          });
        }
      }
    })

    // 合计处理
    const columnKeys = tableHeader.map(item => item.props)
    groupArr.forEach(item => {
      columnKeys.forEach(key => {
        if (needSubTotal.find(s => s == removeKeysNumber(key))) {
          if (['lcAPrice','lcBPrice','skdAPrice','skdBPrice','cfPartAPrice','ftSkdAPrice','cfPartBPrice','ftSkdBPrice'].includes(removeKeysNumber(key))) {
            item[key] = fsTemplate ? (item[key] == "/" ? "/" : math.chain(math.bignumber(item[key] || 0)).multiply(100).floor().divide(100).done().toFixed(2)) : ""
          } else {
            item[key] = (/^\d*toolingShare$/.test(key) || /^\d*developmentCostShare$/.test(key)) ? 
            math.chain(math.bignumber(item[key] || 0)).multiply(100).floor().divide(100).done().toFixed(2) :
            item[key]
          }
        }
      })
    })

    columnKeys.forEach(key => {
      if (needSubTotal.find(s => s == removeKeysNumber(key))) {
        if (['lcAPrice','lcBPrice','skdAPrice','skdBPrice','cfPartAPrice','ftSkdAPrice','cfPartBPrice','ftSkdBPrice'].includes(removeKeysNumber(key))) {
          total[key] = fsTemplate ? (total[key] == "/" ? "/" : math.chain(math.bignumber(total[key] || 0)).multiply(100).floor().divide(100).done().toFixed(2)) : ""
        } else {
          total[key] = (/^\d*toolingShare$/.test(key) || /^\d*developmentCostShare$/.test(key)) ? 
          math.chain(math.bignumber(total[key] || 0)).multiply(100).floor().divide(100).done().toFixed(2) :
          total[key]
        }
      }
    })
    

    let result = [...groupArr, getLowNumber(total)]
    result.forEach(group => {
      Object.keys(group).forEach(key => {
        if (/^\d+tooling$/.test(key) || /^\d+developmentCost$/.test(key)) {
          group[`${ key }HasShare`] = 1
        }
      })
    })

    result = [...result, kmOrbukeage('KM',priceInfo,dataList[0]),kmOrbukeage('Invest \n Budget',priceInfo,dataList[0])]

    return result
  } catch (error) {
    console.log(error)
    return [{partNo:'Subtotal'}]
  }
}
function translateNumber(number){
  if(number) {
    return typeof number === "string" ? number.replace(/,/g,'') : number
  }else{
    return 0
  }
}
//查看某个groupId里面的车型项目是否相同
function asSameCartypeInGroupList(groupId='',dataList=[]){
  try {
    return dataList.filter(i=>i.groupId == groupId).every(items=>items.carProType == dataList.filter(i=>i.groupId == groupId)[0].carProType)
  } catch (error) {
    console.log(error)
    return true
  }
}
/**
 * @description: 在tto的合并计算中。需要将最低的tto计算出来，将他的颜色表示为绿色。
 * @param {*} totalList
 * @return {*}
 */
export function getLowNumber(totalList){
  const templateData = JSON.parse(JSON.stringify(totalList))
  const temLits = []
  for(let i in templateData){
    if(removeKeysNumber(i) == "tto"){
      temLits.push({
        tto:templateData[i],
        number:getPorpsNumber(i)
      })
    }
  }
  const newtemLits = temLits.sort((a,b)=>a.tto - b.tto)
  let minData = ''
  for(let i=0;i<newtemLits.length-1;i++){
    if(parseFloat(newtemLits[i].tto) > 0){
      minData = newtemLits[i]
      break;
    }
  }
  templateData[minData.number+'ttoStatus'] = 1
  return templateData
}

/**
 * @description:追加一个km数据和bukege 
 * @param {*} type exampleDatas 某一列的数据
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
      if(key == 'groupId'){
        exampleData[key] = '-'
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
          exampleData[number+'tooling'] = value.budget
        }
      }
      if(key == 'ebrCalculatedValue'){
        exampleData[key] = type
      }
    }
    return exampleData
  } catch (error) {
    return {}
  }
}

/**
 * @description: 获取表头上的循环后的titleNumber，获得当前字段是在那一列
 * @param {*} key
 * @return {*}
 */
export function getPorpsNumber(key){
  return parseInt(key)?parseInt(key):''
}

/**
 * @description: 排序方法，默认为当前数据进行一次排序。
 * @param {*} list 后台数据
 * @param {*} key  需要排序的特殊字符串
 * @return {*}
 */
export function defaultSort(list,key){
  try {
    return [...list.filter(i=>i[key]).sort((a,b)=> a[key] == b[key]),...list.filter(i=>!i[key])]
  } catch (error) {
    return []
  }
  
}

//------------------------------------------fs数据构造供应商评分部门表头-------------------
export const rateTitelList = {type:'',props:'',label:'',i18n:'',width:'50',tooltip:true}

export function concactTitlle(supplier){
  return [...supplierTile,...supplier,...lastSupplier]
}
export const defaultLayoutTemplate = {}
defaultLayoutTemplate[partProjTypes.GSLINGJIAN] = '3'
defaultLayoutTemplate[partProjTypes.GSLINGJIANIP] = '3'
defaultLayoutTemplate[partProjTypes.GSCOMMONSOURCING] = '3'


//////////////////////////////供应商横轴////////////////////////////////////////////////
export function showOrHide(data){
  return data
}

export function getRowAndcolSpanArray(data){
  try {
    console.log('=============================此备注为了查看数据正确性，dev切勿删除=========')
    console.log('==每个元素第一位：向下合并个数，第二位：向右合并个数，第三位：是否需要合并======')
    data.data.forEach((w,wi)=>{
      const arrays = []
      w.forEach((l,li)=>{
        if(l.isMerge) {
          l['mergeArray'] = [getcol(data.data,l.data,wi,li),getRow(data.data,l.data,wi,li)] 
          arrays.push(l['mergeArray'][0]+ ',' + l['mergeArray'][1]+',T')
        }else{
          l['mergeArray'] = [1,1]
          arrays.push(l['mergeArray'][0]+ ',' + l['mergeArray'][1]+',F')
        }
      })
      console.log(arrays)
    })
    console.log('=============================ending====================================')
    return data
  } catch (error) {
    console.log(error)
    return {}
  }
}

function getcol(allData,currentKey,wi,li){
  try {
    let number = 0
    if(wi > 0 && ((allData[wi-1].find((items,index)=> index == li).data) == currentKey) && allData[wi-1].find((items,index)=> index == li).isMerge) {
        return number
    }
    for (let index = wi; index < allData.length; index++){
      if(allData[index].find((items,index)=> index == li).data == currentKey && allData[index].find((items,index)=> index == li).isMerge){
        number ++
      }else {
        break;
      }   
    }
    return number
  } catch (error) {
    console.log(error)
    return 1
  }
}

function getRow(allData,currentKey,wi,li){
  try {
    let number = 0
    if(li>0 && (allData[wi].find((items,i)=>i == li-1).data == currentKey) && (allData[wi].find((items,i)=>i == li-1).isMerge)) {
        return number
    }
    for (let index = li; index < allData[wi].length; index++){
      if(allData[wi].find((items,i)=>i == index).data == currentKey && allData[wi].find((items,i)=>i == index).isMerge){
        number ++
      }else{
        break;
      }
    }
    return number
  } catch (error) {
    console.log(error)
    return 1
  }
}