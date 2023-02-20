/*
 * @Author: wentliao
 * @Date: 2021-05-24 14:16:51
 * @Description: 
 */
// timeline顶部的总步骤
export const stepList = [
    {title:'Parts Release',icon:'iconTimeLine-PartsRelease',key:'PR',isEdit:false},
    {title:'CSC meeting',icon:'iconTimeLine-CSCMeeting',key:'CM',isEdit:false},
    {title:'BF Confirm',icon:'iconTimeLine-BFConfirm',key:'BC',isEdit:false},
    {title:'VFF',icon:'icondingdianguanlijiedian-jinhangzhong',key:'VFF',isEdit:false},
    {title:'PVS',icon:'icondingdianguanlijiedian-jinhangzhong',key:'PVS',isEdit:false},
    {title:'0S',icon:'icondingdianguanlijiedian-jinhangzhong',key:'0S',isEdit:false},
    {title:'SOP',icon:'icondingdianguanlijiedian-jinhangzhong',key:'SOP',isEdit:false},
]

// timeline供应商步骤
export const supplierStepList = [
    {title:'1st Try Out',tips:'KW25',},
    {title:'OTS',tips:'KW29',},
    {title:'EM',tips:'KW35',},
    {title:'Part SOP',tips:'KW42'},
]

export const tableTitle = [
    {props:'partReleaseTime',name:'Part Release'},
    {props:'rfqTime',name:'RFQ'},
    {props:'cscTime',name:'CSC'},
    {props:'bfConfirmTime',name:'BF Confirm'},
    {props:'vffTbtTime',name:'VFF TBT'},
    {props:'pvsTbtTime',name:'PVS TBT'},
    {props:'osTbtTime',name:'OS TBT'},
    {props:'sopTbtTime',name:'SOP TBT'},
]

export const tableTitleSupplier = [
    {props:'supplierName',name:'Supplier'},
    {props:'oneStWeek',name:'1st'},
    {props:'emWeek',name:'EM'},
    {props:'otsWeek',name:'OTS'},
]