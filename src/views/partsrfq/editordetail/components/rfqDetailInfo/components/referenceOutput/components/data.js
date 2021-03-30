/*
 * @Author: moxuan
 * @Date: 2021-03-04 17:40:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import {permissionTitle} from '@/utils'
// export const partsProductionTableTitle = [
export const partsProductionTableTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_PRODUCTIONLIST",[
    {props:'rfqPlanId',name:'FS号'},
    {props:'procureFactory',name:'采购工厂'},
    {props:'ninePartNum',name:'零件号'},
    {props:'partNameZh',name:'零件名称'},
    {props:'unit',name:'单位'},
    {props:'year',name:'2020'},
    {props:'year1',name:'2021'},
    {props:'year2',name:'2022'},
    {props:'year3',name:'2023'},
    {props:'year4',name:'2024'},
    {props:'year5',name:'2025'},
    {props:'sum',name:'Sum'},
    {props:'versionNum',name:'版本号'},
])

// export const timePlanableTitle = [
export const timePlanableTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_TIMELIST",[
    {props:'fsNum',name:'FS号'},
    {props:'procureFactoryId',name:'采购工厂'},
    {props:'partNum',name:'零件号'},
    {props:'partZh',name:'零件名（中）'},
    {props:'cartypeProPvs',name:'车型项目PVS'},
    {props:'cartypePro0s',name:'车型项目0S'},
    {props:'cartypeProSop',name:'车型项目SOP'},
    {props:'productiveLife',name:'车型生产年限'},
    {props:'svwFirst',name:'SVW要求首次试模'},
    {props:'svwRequestEm',name:'SVW要求EM（周）'},
    {props:'svwRequestOts',name:'SVW要求OTS(周)'}
])
