/*
 * @Author: wentliao
 * @Date: 2021-07-28 17:08:36
 * @Description: 
 */

export const previewBaicFrom = [
    {label:'是否TOP',labelKey:'LK_AEKO_SHIFOUTOP',props:'isTop',type:'select',selectOption:'isTop',required:true,editable:true,isObj:true,},
    {label:'是否相关',labelKey:'LK_AEKO_SHIFOUXIANGGUAN',props:'isReference',type:'select',selectOption:'isReference',required:true,editable:true,isObj:true,},
    {label:'更改零件名称',labelKey:'LK_AEKO_GENGGAILINGJIANMINGCHENG',props:'partName',type:'input',required:true,editable:true},
    {label:'主要供应商',labelKey:'LK_AEKO_ZHUYAOGONGYINGSHANG',props:'mainSupplier',type:'input',required:true,editable:true},
    {label:'新⾸批送样周期(周数)',labelKey:'LK_AEKO_XINSHOUPISONGYANGZHOUQI',props:'sendCycle',type:'input',required:true,editable:true},
    {label:'影响进度',labelKey:'LK_AEKO_YINGXIANGJINDU',props:'isEffectpro',type:'select',selectOption:'isEffectpro',required:true,editable:true,isObj:true,},
    {label:'指定前期采购',labelKey:'LK_AEKO_ZHIDINGQIANQICAIGOU',props:'fsName',type:'select',selectOption:'fsList',required:true,editable:true},
    {label:'封⾯状态',labelKey:'LK_AEKOFENGMIANZHUANGTAI',props:'coverStatus',isObj:true,},
]

export const coverTableTitleCost=[
    { props: "cartypeCode", name: "⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true },
    { props: "materialIncrease", name: "增加材料成本(RMB/⻋)", key: "LK_AEKO_ZENGJIACAILIAOCHENGBEN", tooltip: true },
    { props: "investmentIncrease", name: "增加投资费⽤(不含税)", key: "LK_AEKO_ZENGJIATOUZIFEIYONG", tooltip: true },
    { props: "otherCost", name: "其他费⽤(不含税)", key: "LK_AEKO_QITAFEIYONG", tooltip: true },
]


export const coverTableTitleDepart=[
    { props: "linieDeptNum", name: "科室", key: "LK_KESHI", tooltip: true },
    { props: "linieName", name: "Linie", key: "LK_LINIE", tooltip: true },
    { props: "materialIncrease", name: "增加材料成本(RMB/⻋)", key: "LK_AEKO_ZENGJIACAILIAOCHENGBEN", tooltip: true },
    { props: "investmentIncrease", name: "增加投资费⽤(不含税)", key: "LK_AEKO_ZENGJIATOUZIFEIYONG", tooltip: true },
    { props: "otherCost", name: "其他费⽤(不含税)", key: "LK_AEKO_QITAFEIYONG", tooltip: true },
    { props: "coverStatus", name: "封面状态", key: "LK_AEKOFENGMIANZHUANGTAI", tooltip: true },
    { props: "submitTime", name: "提交时间", key: "LK_AEKO_TIJIAOSHIJIAN", tooltip: true },

]