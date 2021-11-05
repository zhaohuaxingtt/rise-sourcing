/*
 * @Author: moxuan
 * @Date: 2021-03-04 17:40:00
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 */
import {permissionTitle} from '@/utils'
export const partsProductionTableTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_PRODUCTIONLIST",[
    {props:'rfqPlanId',name:'FS号',key: 'LK_FSHAO', fixed: true,minWidth:100},
    {props:'procureFactory',name:'采购工厂',key: 'LK_CAIGOUGONGCHANG',fixed: true},
    {props:'ninePartNum',name:'零件号',key: 'LK_LINGJIANHAO',fixed: true,minWidth:120},
    {props:'partNameZh',name:'零件名称',key: 'LK_LINGJIANMINGCHENG',fixed: true,minWidth:140},
    {props:'unit',name:'价格单位',key: 'LK_DANWEI',fixed: true},
    /*{props:'year',name:'2020'},
    {props:'year1',name:'2021'},
    {props:'year2',name:'2022'},
    {props:'year3',name:'2023'},
    {props:'year4',name:'2024'},
    {props:'year5',name:'2025'},*/
    /*{props:'sum',name:'Sum'},
    {props:'versionNum',name:'版本号',key: 'LK_BANBENHAO'},*/
])

//permissionTitle("PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_TIMELIST",
export const timePlanableTitle = [
    {props:'fsnrGsnrNum',name:'FS号',key: 'LK_FSHAO'},
    {props:'procureFactoryName',name:'采购工厂',key: 'LK_CAIGOUGONGCHANG'},
    {props:'partNum',name:'零件号',key: 'LK_LINGJIANHAO'},
    {props:'partNameZh',name:'零件名（中）',key: 'LK_LINGJIANMINGZHONG'},
    {props:'cartypeProPvs',name:'车型项目PVS',key: 'LK_CHEXINGXIANGMUPVS'},
    {props:'cartypeProOs',name:'车型项目0S',key: 'LK_CHEXINGXIANGMU0S'},
    {props:'cartypeProSop',name:'车型项目SOP',key: 'LK_CHEXINGXIANGMUSOP'},
    {props:'productiveLife',name:'车型生产年限',key: 'LK_CHEXINGSHENGCHANNIANXIAN'},
    {props:'svwRequeseFirstTestMode',name:'SVW要求首次试模',key: 'LK_SVWYAOQIUSHOUCISHIMO'},
    {props:'svwRequestEm',name:'SVW要求EM（周）',key: 'LK_SVWYAOQIUEMZHOU'},
    {props:'svwRequestOts',name:'SVW要求OTS(周)',key: 'LK_SVWYAOQIUOTSZHOU'}
]
