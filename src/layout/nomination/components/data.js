/*
 * @Author: wentliao
 * @Date: 2021-05-20 16:20:37
 * @Description: 
 */
// 定点申请类型
//  MEETING("MEETING","上会"),
//  CIRCULATE("CIRCULATE","流转"),
//  RECORD("RECORD","备案");
export const applyType = [
    {id:'MEETING',name:'上会',key:'LK_SHANGHUI'},
    {id:'CIRCULATE',name:'流转',key:'LK_LIUZHUAN'},
    {id:'RECORD',name:'备案',key:'LK_BEIAN'},
]
// 定点申请步骤栏
export const applyStep = [
    {id:1,name:'RFQ & 零件清单',key:'nominationLanguage.RFQANDLINGJIANQINGDAN',path:'/designate/rfqdetail'},
    {id:2,name:'供应商 & 单⼀供应商',key:'nominationLanguage.GONGYINGSHANGANDDANYIGONGYINGSHANG',path:'/designate/supplier'},
    {id:3,name:'定点建议',key:'nominationLanguage.DINGDIANJIANYI',path:'/designate/suggestion'},
    {id:4,name:'审批⼈ & 审批记录',key:'nominationLanguage.SHENPIRENANDSHENPIJILU',path:'/designate/approvalpersonrecord'},
    {id:5,name:'决策资料',key:'nominationLanguage.JUECEZILIAO',path:'/designate/decisiondata/title'},
]
// 决策资料--tab栏
export const decisionType = [
    {key:'Title',name:'Title',path:'/designate/decisiondata/title'},
    {key:'PartList',name:'Part List',path:'/designate/decisiondata/partlist'},
    {key:'Tasks',name:'Tasks',path:'/designate/decisiondata/tasks'},
    {key:'Drawing',name:'Drawing',path:'/designate/decisiondata/drawing'},
    {key:'BDL',name:'BDL',path:'/designate/decisiondata/bdl'},
    {key:'SingleSourcing',name:'Single Sourcing',path:'/designate/decisiondata/singlesourcing'},
    {key:'ABPrice',name:'A-B Price',path:'/designate/decisiondata/abprice'},
    {key:'CostAnalysis',name:'Cost Analysis',path:'/designate/decisiondata/costanalysis'},
    {key:'TimeLine',name:'Time Line',path:'/designate/decisiondata/timeline'},
    {key:'Strategy',name:'Strategy',path:'/designate/decisiondata/strategy'},
    {key:'BNKReference',name:'BNK Reference',path:'/designate/decisiondata/bnkreference'},
    {key:'AwardingScenario',name:'Awarding Scenario',path:'/designate/decisiondata/awardingscenario'},
    {key:'RS',name:'RS',path:'/designate/decisiondata/rs'},
    {key:'MTZ',name:'MTZ',path:'/designate/decisiondata/mtz'},
    {key:'Attachment',name:'Attachment',path:'/designate/decisiondata/attachment'},
]

// 整体三级菜单排序 表头
export const sortTableTitle=[
    {props:'key',name:'主题',key:'strategicdoc.ZhuTi',tooltip:false},
    {props:'visible',name:'显示/隐藏',key:'strategicdoc.XianShiYinCang',tooltip:false},
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
    {key:'TimeLine',name:'Time Line',visible: true, sort: 8},
    {key:'Strategy',name:'Strategy',visible: true, sort: 9},
    {key:'BNKReference',name:'BNK Reference',visible: true, sort: 10},
    {key:'AwardingScenario',name:'Awarding Scenario',visible: true, sort: 11},
    {key:'RS',name:'RS',visible: true, sort: 12},
    {key:'MTZ',name:'MTZ',visible: true, sort: 13},
    {key:'Attachment',name:'Attachment',visible: true, sort: 14},
]