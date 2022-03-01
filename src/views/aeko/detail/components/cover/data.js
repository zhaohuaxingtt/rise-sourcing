/*
 * @Author: wentliao
 * @Date: 2021-07-28 17:08:36
 * @Description: 
 */

export const previewBaicFrom = [
    {label:'是否TOP',labelWidth:'13rem',labelKey:'LK_AEKO_SHIFOUTOP',props:'isTop',type:'select',permissionKey:'AEKO_DETAIL_TAB_FENGMIAN_TEXT_ISTOP|是否TOP',editPermissionKey:'AEKO_DETAIL_TAB_FENGMIAN_SELECT_ISTOP|是否TOP-编辑',selectOption:'isTop',required:true,editable:true,isObj:true,},
    {label:'是否相关',labelKey:'LK_AEKO_SHIFOUXIANGGUAN',props:'isReference',type:'select',permissionKey:'AEKO_DETAIL_TAB_FENGMIAN_TEXT_ISREFERENCE|是否相关',editPermissionKey:'AEKO_DETAIL_TAB_FENGMIAN_SELECT_ISREFERENCE|是否相关-编辑',selectOption:'isReference',required:true,editable:true,isObj:true,},
    {label:'更改零件名称',labelKey:'LK_AEKO_GENGGAILINGJIANMINGCHENG',props:'partName',type:'input',permissionKey:'AEKO_DETAIL_TAB_FENGMIAN_TEXT_PARTNAME|更改零件名称',editPermissionKey:'AEKO_DETAIL_TAB_FENGMIAN_INPUT_PARTNAME|更改零件名称-编辑',required:true,editable:true},
    {label:'主要供应商',labelKey:'LK_AEKO_ZHUYAOGONGYINGSHANG',props:'mainSupplier',type:'input',required:true,editable:true,permissionKey:'AEKO_DETAIL_TAB_FENGMIAN_TEXT_MAINSUPPLIER|主要供应商',editPermissionKey:'AEKO_DETAIL_TAB_FENGMIAN_INPUT_MAINSUPPLIER|主要供应商-编辑',},
    {label:'新⾸批送样周期(周数)',labelWidth:'13rem',labelKey:'LK_AEKO_XINSHOUPISONGYANGZHOUQI',props:'sendCycle',type:'input',required:true,editable:true,permissionKey:'AEKO_DETAIL_TAB_FENGMIAN_TEXT_SENDCYCLE|新⾸批送样周期',editPermissionKey:'AEKO_DETAIL_TAB_FENGMIAN_INPUT_SENDCYCLE|新⾸批送样周期-编辑',},
    {label:'影响进度',labelKey:'LK_AEKO_YINGXIANGJINDU',props:'isEffectpro',type:'select',selectOption:'isEffectpro',required:true,editable:true,isObj:true,permissionKey:'AEKO_DETAIL_TAB_FENGMIAN_TEXT_ISEFFECTPRO|影响进度',editPermissionKey:'AEKO_DETAIL_TAB_FENGMIAN_SELECT_ISEFFECTPRO|影响进度-编辑',},
    {label:'指定前期采购',labelKey:'LK_AEKO_ZHIDINGQIANQICAIGOU',props:'fsName',type:'select',selectOption:'fsList',clearable:true,required:true,editable:true,filterable:true,permissionKey:'AEKO_DETAIL_TAB_FENGMIAN_TEXT_FSNAME|指定前期采购',editPermissionKey:'AEKO_DETAIL_TAB_FENGMIAN_SELECT_FSNAME|指定前期采购-编辑',},
    {label:'封⾯状态',labelKey:'LK_AEKOFENGMIANZHUANGTAI',props:'coverStatusDesc',permissionKey:'AEKO_DETAIL_TAB_FENGMIAN_TEXT_FENGMIANZHUANGTAI|封⾯状态',editPermissionKey:'AEKO_DETAIL_TAB_FENGMIAN_TEXT_FENGMIANZHUANGTAI_LINIE|封⾯状态—LINIE'},
]

export const coverTableTitleCost=[
    { props: "cartypeNameZh", name: "⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true },
    { props: "materialIncrease", name: "增加材料成本(RMB/⻋)", key: "LK_AEKO_ZENGJIACAILIAOCHENGBEN", tooltip: true,
    showTips: true, require:true,
        tips:()=>{
            return `<div>
            <p><b>一对一</b>：（新零件A价*份额*装车率*新每车用量*汇率）-（原零件A价* 份额*装车率*原每车用量*汇率）</p>
            <p><b>多变一组合</b>：MAX（新零件A价*份额*装车率*新每车用量*汇率）-SUM（原零件A价*份额*装车率*原每车用量*汇率）</p>
            <p><b>一变多组合</b>：SUM（新零件A价*份额*装车率*新每车用量*汇率）-MAX（原零件A价* 份额*装车率*原每车用量*汇率）</p>
            <p><b>多变多组合</b>：SUM（新零件A价*份额*装车率*新每车用量*汇率）-SUM（原零件A价* 份额*装车率*原每车用量*汇率）</p>
            </div>`
        } 
    },
    { props: "investmentIncrease", name: "增加投资费⽤(不含税)", key: "LK_AEKO_ZENGJIATOUZIFEIYONG", tooltip: true,require:true,
        
     },
    { props: "otherCost", name: "其他费⽤(不含税)", key: "LK_AEKO_QITAFEIYONG", tooltip: true,require:true, },
]


export const coverTableTitleDepart=[
    { props: "linieDeptNum", name: "科室", key: "LK_KESHI", tooltip: true,width:100 },
    { props: "linieName", name: "Linie", key: "LK_LINIE", tooltip: true,width:100 },
    { props: "materialIncrease", name: "增加材料成本(RMB/⻋)", key: "LK_AEKO_ZENGJIACAILIAOCHENGBEN", tooltip: true },
    { props: "investmentIncrease", name: "增加投资费⽤(不含税)", key: "LK_AEKO_ZENGJIATOUZIFEIYONG", tooltip: true },
    { props: "otherCost", name: "其他费⽤(不含税)", key: "LK_AEKO_QITAFEIYONG", tooltip: true,width:100 },
    { props: "coverStatusDesc", name: "封面状态", key: "LK_AEKOFENGMIANZHUANGTAI", tooltip: true },
    { props: "submitTime", name: "提交时间", key: "LK_AEKO_TIJIAOSHIJIAN", tooltip: true },

]