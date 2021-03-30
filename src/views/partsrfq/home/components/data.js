/*
 * @Author: moxuan
 * @Date: 2021-03-03 09:52:00
 * @LastEditTime: 2021-03-03 16:52:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsrfq\home\components\data.js
 */
import {permissionTitle} from '@/utils'
export const tableTitle = [
//export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST",[
    {props:'id',name:'RFQ编号', key: 'rfq.RFQRFQNUMBER'},
    {props:'rfqName',name:'RFQ名称', key: 'rfq.RFQRFQNAME'},
    {props:'rfqType',name:'RFQ类型', key: 'rfq.RFQRFQTYPE'},
    {props:'carType',name:'车型项目', key: 'rfq.RFQMODELPROJECT'},
    {props:'createDate',name:'创建日期', key: 'rfq.RFQCREATIONDATE'},
    {props:'currentRounds',name:'当前轮次', key: 'rfq.RFQCURRENTROUND'},
    {props:'suppliers',name:'已询价供应商', key: 'rfq.RFQSUPPLIERSHAVEBEENINQUIRED'},
    {props:'quotations',name:'已报价供应商', key: 'rfq.RFQQUOTEDSUPPLIER'},
    {props:'currentStatus',name:'RFQ状态', key: 'rfq.RFQRFQSTATUS'},
    {props:'currentRoundsEndTime',name:'报价截至日期', key: 'rfq.RFQQUOTATIONDEADLINE'},
    {props:'buyerName',name:'询价采购员', key: 'rfq.RFQINQUIRYBUYER'},
    {props:'linieNameZh',name:'LINIE', key: 'rfq.RFQLINIE'},
    {props:'tpGradeStatus',name:'TP评分状态', key: 'rfq.RFQTPSCORESTATUS'},
    {props:'mqGradeStatus',name:'MQ评分状态', key: 'rfq.RFQMQSCORESTATUS'},
    {props:'targetGradeStatus',name:'目标价状态', key: 'rfq.RFQTARGETPRICESTATUS'},
    {props:'recordId',name:''},
]

export const assignmentOfScroingTasksTableTitle = [
    {props:'deptType',name:'部门评分类型'},
    {props:'deptNum',name:'部门编号'},
    {props:'graderId',name:'评分人'},
]