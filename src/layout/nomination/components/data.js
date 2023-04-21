/*
 * @Author: wentliao
 * @Date: 2021-05-20 16:20:37
 * @Description: 
 */
// 定点申请类型
//  MEETING("MEETING","上会"),
//  CIRCULATE("CIRCULATE","流转"),
//  RECORD("RECORD","备案");
import { getNominateDisabled } from "rise/web/common"

export const applyType = [
    {id:'MEETING',name:'上会',key:'LK_SHANGHUI'},
    {id:'TRANFORM',name:'流转',key:'LK_LIUZHUAN'},
    {id:'RECORD',name:'备案',key:'LK_BEIAN'},
]
// 定点申请步骤栏
export const applyStep = [
    {id:0,name:'定点申请详情',key:'DINGDIANSHENGQINGXINAGQING',path:'/designate/details'},
    {id:1,name:'RFQ & 零件清单',key:'nominationLanguage_RFQANDLINGJIANQINGDAN',path:'/designate/rfqdetail'},
    {id:2,name:'供应商 & 单⼀供应商',key:'nominationLanguage_GONGYINGSHANGANDDANYIGONGYINGSHANG',path:'/designate/supplier',hasInfo:true},
    {id:3,name:'定点建议',key:'nominationLanguage_DINGDIANJIANYI',path:'/designate/suggestion'},
    {id:4,name:'审批人 & 审批记录',key:'nominationLanguage_SHENPIRENANDSHENPIJILU',path:'/designate/approvalpersonrecord'},
    {id:5,name:'决策资料',key:'nominationLanguage_JUECEZILIAO',path:'/designate/decisiondata/title'},
]
// 决策资料--tab栏
export const decisionType = [
    {key:'Title',name:'Title',path:'/designate/decisiondata/title', permissionKey: 'SOURCING_NOMINATION_ATTATCH_TITLE'},
    {key:'PartList',name:'Part List',path:'/designate/decisiondata/partlist', permissionKey: 'SOURCING_NOMINATION_ATTATCH_PARTLIST'},
    {key:'Tasks',name:'Tasks',path:'/designate/decisiondata/tasks', permissionKey: 'SOURCING_NOMINATION_ATTATCH_TASKS'},
    {key:'Drawing',name:'Drawing',path:'/designate/decisiondata/drawing', permissionKey: 'SOURCING_NOMINATION_ATTATCH_DRAWING'},
    {key:'BDL',name:'BDL',path:'/designate/decisiondata/bdl', permissionKey: 'SOURCING_NOMINATION_ATTATCH_BDL'},
    {key:'SingleSourcing',name:'Single Sourcing',path:'/designate/decisiondata/singlesourcing', permissionKey: 'SOURCING_NOMINATION_ATTATCH_SINGLESOURCING'},
    {key:'ABPrice',name:'A-B Price',path:'/designate/decisiondata/abprice', permissionKey: 'SOURCING_NOMINATION_ATTATCH_ABPRICE'},
    {key:'CostAnalysis',name:'Cost Analysis',path:'/designate/decisiondata/costanalysis', permissionKey: 'SOURCING_NOMINATION_ATTATCH_COSTANALYSIS'},
    {key:'TimeLine',name:'Timeline',path:'/designate/decisiondata/timeline', permissionKey: 'SOURCING_NOMINATION_ATTATCH_TIMELINE'},
    // {key:'Strategy',name:'Strategy',path:'/designate/decisiondata/strategy', permissionKey: 'SOURCING_NOMINATION_ATTATCH_STRATEGY'},
    // {key:'BNKReference',name:'BNK Reference',path:'/designate/decisiondata/bnkreference'},
    // {key:'AwardingScenario',name:'Awarding Scenario',path:'/designate/decisiondata/awardingscenario', permissionKey: 'SOURCING_NOMINATION_ATTATCH_AWARDSCENARIO'},
    {key:'RS',name:'RS',path:'/designate/decisiondata/rs', permissionKey: 'SOURCING_NOMINATION_ATTATCH_RS'},
    {key:'MTZ',name:'MTZ',path:'/designate/decisiondata/mtz',isMtz:true, permissionKey: 'SOURCING_NOMINATION_ATTATCH_MTZ'},
    {key:'Attachment',name:'Attachment',path:'/designate/decisiondata/attachment', permissionKey: 'SOURCING_NOMINATION_ATTATCH_ATTACHMENT'},
]

// 整体三级菜单排序 表头
export const sortTableTitle=[
    {props:'tabName',name:'主题',key:'strategicdoc.ZhuTi',tooltip:false},
    {props:'flag',name:'显示/隐藏',key:'strategicdoc.XianShiYinCang',tooltip:false},
    {props:'sort',name:'',key:'strategicdoc.PaiXu',tooltip:false}
]
// 三级表头表格数据
export const sortTableData = [
    {key:'Title',name:'Title',visible: true, sort: 0},
    {key:'PartList',name:'Part List',visible: false, sort: 1},
    {key:'Tasks',name:'Tasks',visible: false, sort: 2},
    {key:'Drawing',name:'Drawing',visible: false, sort: 3},
    {key:'BDL',name:'BDL',visible: false, sort: 4},
    {key:'SingleSourcing',name:'Single Sourcing',visible: false, sort: 5},
    {key:'ABPrice',name:'A-B Price',visible: false, sort: 6},
    {key:'CostAnalysis',name:'Cost Analysis',visible: false, sort: 7},
    {key:'TimeLine',name:'Timeline',visible: true, sort: 8},
    {key:'Strategy',name:'Strategy',visible: true, sort: 9},
    // {key:'BNKReference',name:'BNK Reference',visible: true, sort: 10},
    {key:'AwardingScenario',name:'Awarding Scenario',visible: true, sort: 11},
    {key:'RS',name:'RS',visible: true, sort: 12},
    {key:'MTZ',name:'MTZ',visible: true, sort: 13},
    {key:'Attachment',name:'Attachment',visible: true, sort: 14},
]

// 上会选择弹窗
export const mettingTableTitle = [
    {props:'name',name:'会议名称',key: 'HUIYIMINGCHENG',tooltip:false},
    {props:'meetingTypeName',name:'会议类型',key: 'HUIYILEIXING',tooltip:false},
    {props:'startDate',name:'开始日期',key: 'LK_KAISHISHIJIAN',tooltip:false},
    {props:'startTime',name:'开始时间',key: 'NOMI_KAISHISHIJIAN',tooltip:false},
    {props:'meetingPlace',name:'会议地点',key: 'NOMI_METTINGADDRESS',tooltip:false},
  ]
// 选择会议类型
export const meetingTypes = [
    {id:'20',name:'PRECSC',key:'PRECSC'},
    {id:'30',name:'CSC',key:'CSC'},
]
// 会议类型
export const meetingResult = [
    {id:'07',name:'关闭',key:'LK_GUANBI'},
    {id:'01',name:'等待',key:'LK_DENGDAI'},
    {id:'05',name:'下次Pre CSC',key:'XIACIPRECSC'},
    {id:'04',name:'转TER/TO-TER',key:'TERORTOTER'},
    {id:'03',name:'发LOI',key:'SENDLOI'},
    {id:'02',name:'会议通过',key:'HUIYITONGGUO'},
]

// SVG数据
export const svgList = {
    // 正在进行中
    'icondingdianguanlizhou-zhengzaijinhang':'<svg t="1631701390087" class="icon" viewBox="0 0 42667 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="59333" width="100%" height="100"><path d="M41806.131291 988.352234a229.237311 229.237311 0 0 1-62.76736-164.593755V682.702485h-290.981289a170.563476 170.563476 0 1 1 0-341.126952h290.981289v-141.055994a229.066748 229.066748 0 0 1 62.76736-164.423191 113.765838 113.765838 0 0 1 134.404018-22.855505l605.500339 311.61947A208.08744 208.08744 0 0 1 42640.868941 512.139009a208.08744 208.08744 0 0 1-94.833293 187.619824l-605.500339 311.448906a111.548513 111.548513 0 0 1-51.169042 12.792261 120.758941 120.758941 0 0 1-83.234976-35.647766zM39923.451645 682.702485a170.563476 170.563476 0 0 1 0-341.126952h848.212165a170.563476 170.563476 0 0 1 0 341.126952zM38393.838394 682.702485a170.563476 170.563476 0 0 1 0-341.126952h848.212165a170.563476 170.563476 0 1 1 0 341.126952z m-1528.248742 0a170.563476 170.563476 0 1 1 0-341.126952h848.041601a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041601a170.563476 170.563476 0 0 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041602a170.563476 170.563476 0 0 1 0 341.126952z m-1529.10156 0a170.563476 170.563476 0 0 1 0-341.126952h848.212165a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.212165a170.563476 170.563476 0 0 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 0 1 0-341.126952h848.212165a170.563476 170.563476 0 0 1 0 341.126952z m-1528.930996 0a170.563476 170.563476 0 0 1 0-341.126952h848.041601a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041601a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.212165a170.563476 170.563476 0 0 1 0 341.126952z m-1529.10156 0a170.563476 170.563476 0 0 1 0-341.126952h848.212165a170.563476 170.563476 0 0 1 0 341.126952zM21576.279684 682.702485a170.563476 170.563476 0 1 1 0-341.126952h848.041602a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041602a170.563476 170.563476 0 1 1 0 341.126952z m-1529.272123 0a170.563476 170.563476 0 1 1 0-341.126952h848.212165a170.563476 170.563476 0 0 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041601a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041602a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041602a170.563476 170.563476 0 1 1 0 341.126952z m-1529.10156 0a170.563476 170.563476 0 1 1 0-341.126952h848.212165a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041602a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930996 0a170.563476 170.563476 0 1 1 0-341.126952h848.041601a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041601a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041602a170.563476 170.563476 0 1 1 0 341.126952z m-1528.930997 0a170.563476 170.563476 0 1 1 0-341.126952h848.041602a170.563476 170.563476 0 1 1 0 341.126952z m-1529.10156 0a170.563476 170.563476 0 1 1 0-341.126952H4076.467071a170.563476 170.563476 0 1 1 0 341.126952zM1699.494473 682.702485a170.563476 170.563476 0 1 1 0-341.126952h848.041601a170.563476 170.563476 0 0 1 0 341.126952zM170.563476 682.702485a170.563476 170.563476 0 1 1 0-341.126952h848.041601a170.563476 170.563476 0 0 1 0 341.126952z" fill="#1660F1" p-id="59334"></path></svg>',
    // 已完成
    'iconliuchengjiedianyiwancheng1':'<svg t="1631701995066" class="icon" viewBox="0 0 128000 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="68959" width="100%" height="100"><path d="M1212.928 1024C543.232 1024 0 794.624 0 512s543.232-512 1212.928-512h126150.656c669.696 0 641.024 519.68 634.368 512-8.192-15.36 35.84 512-634.368 512z" fill="#1660F1" p-id="68960"></path></svg>',
    // 未完成
    'icondingdianguanlizhou-weiwancheng':'<svg t="1631702090376" class="icon" viewBox="0 0 128000 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="78717" width="100%" height="100"><path d="M124426.24 1024a512 512 0 0 1 0-1024H127488a512 512 0 1 1 0 1024z m-4589.056 0a512 512 0 0 1 0-1024h2545.664a512 512 0 0 1 0 1024z m-4589.568 0a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.568 0a512 512 0 1 1 0-1024h2545.152a512 512 0 0 1 0 1024z m-4589.056 0a512 512 0 0 1 0-1024h2545.664a512 512 0 0 1 0 1024zM101478.4 1024a512 512 0 0 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.568 0a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.056 0a512 512 0 1 1 0-1024h2545.664a512 512 0 0 1 0 1024z m-4589.568 0a512 512 0 0 1 0-1024h2545.664a512 512 0 0 1 0 1024z m-4589.568 0a512 512 0 0 1 0-1024h2546.176a512 512 0 1 1 0 1024z m-4589.056 0a512 512 0 1 1 0-1024h2545.664a512 512 0 0 1 0 1024z m-4589.568 0a512 512 0 0 1 0-1024h2545.664a512 512 0 0 1 0 1024z m-4589.568 0a512 512 0 0 1 0-1024h2546.176a512 512 0 1 1 0 1024z m-4589.056 0a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.568 0a512 512 0 1 1 0-1024h2546.176a512 512 0 1 1 0 1024z m-4589.568 0a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024zM50995.2 1024a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.056 0a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.568 0a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024zM37227.52 1024a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.568 0a512 512 0 1 1 0-1024h2545.664a512 512 0 0 1 0 1024z m-4589.568 0a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.056 0a512 512 0 1 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.568 0a512 512 0 0 1 0-1024h2545.664a512 512 0 1 1 0 1024z m-4589.568 0a512 512 0 1 1 0-1024h2545.664a512 512 0 0 1 0 1024z m-4589.568 0a512 512 0 0 1 0-1024H12236.8a512 512 0 1 1 0 1024zM5101.568 1024a512 512 0 1 1 0-1024h2545.664a512 512 0 0 1 0 1024zM512 1024a512 512 0 1 1 0-1024h2545.152a512 512 0 1 1 0 1024z" fill="#CED4E1" p-id="78718"></path></svg>'
}

export const setDisabled = getNominateDisabled