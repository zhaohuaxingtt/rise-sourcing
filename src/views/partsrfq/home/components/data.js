/*
 * @Author: moxuan
 * @Date: 2021-03-03 09:52:00
 * @LastEditTime: 2021-03-03 16:52:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsrfq\home\components\data.js
 */
import {permissionTitle} from '@/utils'
// export const tableTitle = [
export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST",[
    {props:'id',name:'RFQ编号', key: 'LK_RFQBIANHAO'},
    {props:'rfqName',name:'RFQ名称', key: 'LK_RFQMINGCHENG'},
    {props:'rfqType',name:'RFQ类型', key: 'LK_RFQLEIXING'},
    {props:'carType',name:'车型项目', key: 'LK_CHEXINGXIANGMU'},
    {props:'createDate',name:'创建日期', key: 'LK_CHUANGJIANRIQI'},
    {props:'currentRounds',name:'当前轮次', key: 'LK_DANGQIANLUNCI'},
    {props:'suppliers',name:'已询价供应商', key: 'LK_YIXUNJIAGONGYINGSHANG'},
    {props:'quotations',name:'已报价供应商', key: 'LK_YIBAOJIAGONGYINGSHANG'},
    {props:'currentStatus',name:'RFQ状态', key: 'LK_RFQZHUANGTAI'},
    {props:'currentRoundsEndTime',name:'报价截至日期', key: 'rfq.RFQQUOTATIONDEADLINE'},
    {props:'buyerName',name:'询价采购员', key: 'LK_XUNJIACAIGOUYUAN'},
    {props:'linieNameZh',name:'LINIE', key: 'rfq.RFQLINIE'},
    {props:'tpGradeStatus',name:'TP评分状态', key: 'LK_TPPINGFENZHUANGTAI'},
    {props:'mqGradeStatus',name:'MQ评分状态', key: 'LK_MQPINGFENZHUANGTAI'},
    {props:'targetGradeStatus',name:'CF目标价状态', key: 'LK_MUBIAOJIAZHUANGTAI'},
    {props:'recordId',name:'',key: ''},
])

export const assignmentOfScroingTasksTableTitle = [
    {props:'deptType',name:'部门评分类型', key: 'LK_BUMENPINGFENLEIXING'},
    {props:'deptNum',name:'部门编号', key: 'LK_BUMENBIANHAO'},
    {props:'graderId',name:'评分人', key: 'LK_PINGFENREN'},
]