/*
 * @Author: wentliao
 * @Date: 2021-05-20 16:20:37
 * @Description: 
 */
// 定点申请类型
export const applyType = [
    {id:'1',name:'上会1'},
    {id:'2',name:'上会2'},
    {id:'3',name:'上会3'},
]
// 定点申请步骤栏
export const applyStep = [
    {id:'1',name:'RFQ & 零件清单'},
    {id:'2',name:'供应商 & 单⼀供应商'},
    {id:'3',name:'定点建议'},
    {id:'4',name:'审批⼈ & 审批记录'},
    {id:'5',name:'决策资料'},
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