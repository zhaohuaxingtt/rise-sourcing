/*
 * @Author: your name
 * @Date: 2021-05-28 14:32:26
 * @LastEditTime: 2021-07-07 18:35:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\data.js
 */
import {_getMathNumber} from '@/utils'
//表格全集。
export const fstitle = [
  {type:'selection',props:'groupName',label:'Group',i18n:'',width:'80',tooltip:false},
  {type:'',props:'partNo',label:'Part No.',i18n:'',width:'100',tooltip:false},
  {type:'',props:'partName',label:'Part Name',i18n:'',width:'100',tooltip:false},
  {type:'',props:'partPrjCode',label:'FS/GS/SP No.',i18n:'',width:'100',tooltip:false},
  {type:'',props:'factory',label:'Factory',i18n:'',width:'100',tooltip:false},
  {type:'',props:'cfPartAPrice',label:'CF Part A Price',i18n:'',width:'130',tooltip:false},
  {type:'',props:'cfPartBPrice',label:'CF Part B Price',i18n:'',width:'100',tooltip:false},
  {type:'',props:'pca',label:'PCA',i18n:'',width:'100',tooltip:false},
  {type:'',props:'tia',label:'TIA',i18n:'',width:'100',tooltip:false},
  {type:'',props:'ebr',label:'EBR',i18n:'',width:'100',tooltip:false}
]

//表格循环部分
export const fstableTileXh = function(index){
  return [
    {type:'',props:`${index?index:''}lcAPrice`,label:'LC A Price',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}skdAPrice`,label:'SKD A Price',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index?index:''}lcBPrice`,label:'LC B Price ',i18n:'',width:'100',tooltip:false},
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
    {type:'',props:`Quotationdetails`,label:'Quo.details',i18n:'',width:'100',tooltip:false},
  ]
}
//cache list
export const whiteList = ['groupName','partNo','partName','cfPartAPrice','cfPartBPrice','pca','tia','ebr','lcAPrice','lcBPrice','tooling','ltc','ltcStaringDate','tto'] //默认需要显示的数据
/**
 * @description：通过需要循环的表格和基础表格，在通过白名单将需要所有的百名单删选出来
 * @param {*} whiteList
 * @param {*} tableTileXh
 * @param {*} title
 * @return {*}
 */
export const needSubTotal = ['cfPartAPrice','cfPartBPrice','lcAPrice','lcBPrice','tooling','tto']
/**
 * @description:根据不通type获取options列表 
 * @param {*} type
 * @return {*}
 */
export function backChooseList(type) {
  let whiteLists = []
  let allTablelist = []
  if(type == 1){ //fs as list
     whiteLists = whiteList
     allTablelist = [...fstitle,...fstableTileXh(0)]
  }else{ //supplier as list
    whiteLists = supplierWhiteList
    allTablelist = [...supplierTile,...centerSupplierList(0),...lastSupplier,...leftSideData]
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
      if(!whiteLists.find(itemss=> itemss == items.props) && items.props != 'rating'){
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
  const lastChildProps = {name:relTableListXh[relTableListXh.length -1].label,props:relTableListXh[relTableListXh.length -1].props}
  for(let i = 0; i<supplierLength;i++){
    if(i>0){
      relTableListXh = [...relTableListXh,...addtitle(templateListxh,i)]
    }
  }
  return {title:[...relTabelListDefault,...relTableListXh],xhLastChildProps:lastChildProps}
}
/**
 * @description: 获取表格真实表头。请求完白名单和数据之后，拿到供应商的个数反推表头数 供应商横轴
 * @param {*} whiteListService
 * @param {*} supplierLength
 * @return {*}
 */
 export function getRenderTableTileSupplier(whiteListService=[],supplierDataList){
   try {
    const relWhiteList = [...supplierWhiteList,...whiteListService] //
    const xuhTable =  JSON.parse(JSON.stringify(centerSupplierList(0,supplierDataList[0].partInfoList)))
    const relTabelListDefault = []
    let relTableListXh = []
    let templateListxh = []
    JSON.parse(JSON.stringify(supplierTile)).forEach(items=>{ //评分表头数据组装。
      if(items.props == 'supplierName'){
        relTabelListDefault.push(items)
      }else{
        supplierDataList[0].bdlRateInfoList.filter(i=>i.supplierId ==supplierDataList[0].bdlRateInfoList[0].supplierId).forEach((itemss,index)=>{
          const ratess = JSON.parse(JSON.stringify(rateTitelList))
          ratess.props = (index == 0?'':index) + 'rate';
          ratess.label = itemss.rateDepart
          items.list.push(ratess)
        })
        relTabelListDefault.push(items)
      }
    })
    for(let i = 0;i < xuhTable.length;i++){ //通过白名单过滤一次表头
      if(relWhiteList.find(ii=>ii == xuhTable[i].props)){
        if(xuhTable[i].list){
          xuhTable[i].list.forEach((items,index)=>{
            if(!relWhiteList.find(ii=>ii == items.props)){
              xuhTable[i].list.splice(index,1)
            }
          })
          relTableListXh.push(xuhTable[i])
          templateListxh.push(xuhTable[i])
        }
        else{
          relTableListXh.push(xuhTable[i])
          templateListxh.push(xuhTable[i])
        }
      }
    }
    for(let i = 0; i<supplierDataList[0].partInfoList.length;i++){
      if(i>0){
        relTableListXh = [...relTableListXh,...addtitle(JSON.parse(JSON.stringify(templateListxh)),i,supplierDataList[0].partInfoList)]
      }
    }
    return [...relTabelListDefault,...relTableListXh,...lastSupplier]
   } catch (error) {
     console.log(error)
     return []
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
        titleList.push(itemsq.rateDepart)
      })
     }
     maps.push({rate:c[0].supplierName,isAllPartRateConsistent:c[0].rfmRate,isRateRisk:c[0].isRateRisk})
     //拿到评分部门list 为每个部门设置评分
     titleList.forEach(itemsbb=>{
       const map = c.find(it=>it.rateDepart == itemsbb)
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
    console.log(err)
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
      if(items.props == 'groupName'){
        total["groupId"] = '-'
      }
      if(items.props == 'partNo'){
        total[items.props] = 'Subtotal'
      }else{
        if(needSubTotal.find(s => s == removeKeysNumber(items.props))){
          dataList.forEach(element => {
            for(let key in element){
                if(items.props == key){
                  //需要 Lc Aprice . Lc Bprice TTo 
                  if(removeKeysNumber(key) == "lcAPrice" || removeKeysNumber(key) == "lcBPrice" || removeKeysNumber(key) == "tto"){
                    total[key] = parseFloat(_getMathNumber(`${total[key] || 0}+${element[key] || 0}*${element['ebr'] || 1}`)).toFixed(2)
                  }else{
                    total[key] = parseFloat(_getMathNumber(`${total[key] || 0}+${element[key] || 0}`)).toFixed(2)
                  }
                }
              }
          });
        }
      }
      
    })
    return [getLowNumber(total),kmOrbukeage('KM',priceInfo,dataList[0]),kmOrbukeage('Budget',priceInfo,dataList[0])]
  } catch (error) {
    console.warn(error)
    return {partNo:'Subtotal'}
  }
}

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
  temLits.sort((a,b)=>{a.tto - b.tto})
  templateData[temLits[0].number+'ttoStatus'] = 1
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

export function defaultSort(list,key){
  return [...list.filter(i=>i[key]).sort((a,b)=> a[key] == b[key]),...list.filter(i=>!i[key])]
}

//------------------------------------------fs数据构造供应商------------------------------------------------------
export const rateTitelList = {type:'',props:'',label:'',i18n:'',width:'50',tooltip:false}

export const supplierTile = [
  {type:'',props:'supplierName',label:'Supplier',i18n:'',width:'100',tooltip:false},
  {type:'',props:'rating',label:'Ratings',i18n:'',width:'',tooltip:false,list:[]},
]
/**
 * @description: 动态拿到表头factory，在供应商横轴中，从第一条到最后一条里面包含的factoryList实际上是一样的。
 *                所以只需要拿到第一条供应商的factoryList 拿出每个factory 对应起来  
 * @param {*}
 * @return {*}
 */
function factoryListFn(factoryList,index){
  try {
    if(index == ''){
      index = 0
    }
    return factoryList[index].factory
  } catch (error) {
    return '暂无'
  }
}
export const centerSupplierList = function(index,factoryList=[]){
  index = index?index:''
  return [
    {type:'',props:`${index}lcAPrice`,label:'LC A Price',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index}skdAPrice`,label:'SKD A Price',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index}factory`,label:`${factoryListFn(factoryList,index)}`,i18n:'',width:'',tooltip:false,list:[
      {type:'',props:`${index}lcBPrice`,label:'LC B Price',i18n:'',width:'100',tooltip:false},
      {type:'',props:`${index}skdBPrice`,label:'SKD B Price',i18n:'',width:'100',tooltip:false},
      {type:'',props:`${index}productionLocation`,label:'Prod.Loc.',i18n:'',width:'100',tooltip:false},
    ]},
    {type:'',props:`${index}lcAPriceWithoutAllocation`,label:'LC A Price without allocation',i18n:'',width:'120',tooltip:false},
    {type:'',props:`${index}skdAPriceWithoutAllocation`,label:'SKD A Price without allocation',i18n:'',width:'120',tooltip:false},
    {type:'',props:`${index}lcBPriceWithoutAllocation`,label:'LC B Price without allocation',i18n:'',width:'120',tooltip:false},
    {type:'',props:`${index}skdBPriceWithoutAllocation`,label:'SKD B Price without allocation',i18n:'',width:'120',tooltip:false}, 
    {type:'',props:`${index}bnk`,label:'BNK',i18n:'',width:'120',tooltip:false},
    {type:'',props:`${index}bnkApprovalStatus`,label:'BNK approval status',i18n:'',width:'120',tooltip:false},
    {type:'',props:`${index}tooling`,label:'Tooling',i18n:'',width:'',tooltip:false},
    {type:'',props:`${index}developmentCost`,label:'Development cost',i18n:'',width:'',tooltip:false},
    {type:'',props:`${index}supplierSopDate`,label:'Supplier SOP date',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index}ltc`,label:'LTC',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index}ltcStaringDate`,label:'LTC starting date',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index}prototypePrice`,label:'Prototype price',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index}tto`,label:'TTO',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index}externalDevelopmentCost`,label:'External Development cost',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index}releaseCost`,label:'release cost',i18n:'',width:'100',tooltip:false},
    {type:'',props:`${index}Quotationdetails`,label:'Quo.details',i18n:'',width:'100',tooltip:false},
  ]
}

export const lastSupplier = [
  {type:'',props:'mixPrice',label:'Mix Price',i18n:'',width:'100',tooltip:false},
  {type:'',props:'totalInvest',label:'Total Invest',i18n:'',width:'100',tooltip:false},
  {type:'',props:'totalTto',label:'Total Turnover',i18n:'',width:'100',tooltip:false},
]

export function concactTitlle(supplier){
  return [...supplierTile,...supplier,...lastSupplier]
}
export const supplierWhiteList = ['supplierName','lcAPrice','bnkApprovalStatus','lcBPrice','productionLocation','tooling','ltc','ltcStaringDate','tto','mixPrice','totalInvest','totalTurnover','partNo','partName','project','tia','fTarget','factory']
export const supplierTableTop = []
/**
 * @description: 转换供应商数据
 * @param {*} supplierlist
 * @return {*}
 */
export const translateDataListSupplier = function(supplierlist) {
  const relData = []
  let topData = []
  try {
    supplierlist.forEach((items,wcIndex)=>{
      if(wcIndex == 0) topData = items.partInfoList //每个供应商对应的零件数据都可以是一样的
      const map = items
      items.bdlRateInfoList.filter(filterRate=>filterRate.supplierId == items.supplierId).forEach((items,index)=>{
        for(let key in items){
          if(key != 'supplierName' || key != 'supplierId'){
           map[(index==0?'':index)+key] = items[key]
          }
       }
      })
      for(let ii = 0; ii<items.partInfoList.length;ii++){  
        for(let keys in items.partInfoList[ii]){
          map[(ii==0?'':ii) + keys] = items.partInfoList[ii][keys]
        }
      }
      relData.push(map) 
    })
    return {dataList:relData,topList:topData}
  } catch (error) {
    console.log(error)
  }
}

export const leftSideData = [
  {props:'partNo',name:'Part'},
  {props:'partName',name:'Part Name'},
  {props:'partPrjCode',name:'FS/GS/SP No.'},
  {props:'ebr',name:'EBR'},
  {props:'project',name:'Project'},
  {props:'volume',name:'Volume'},
  {props:'europeanLevel',name:'European level(RMB)'},
  {props:'plannedInvest',name:'Planned Invest'},
  {props:'ckdLanded',name:'CKD Landed'},
  {props:'tia',name:'KM'},
  {props:'fTarget',name:'F-Target'},
]

export function getleftTittleList(whiteList){ 
  const relWhiteList = [...supplierWhiteList,...whiteList]
  const list = []
  leftSideData.forEach(items=>{
    if(relWhiteList.find(itemss=>items.props == itemss)){
      list.push(items)
    }
  })
  return list
}